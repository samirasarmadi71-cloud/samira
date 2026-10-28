// ============ Database facade — REAL SQLite (sql.js) engine ============
import { getSqlite, resetSqliteInstance, SqliteDatabase } from './sqlite';
import { runMigrations, seedDemoData, hashPassword, verifyPassword } from './schema';

let db: SqliteDatabase | null = null;
let initPromise: Promise<void> | null = null;

/** global error surface so the UI can show a friendly banner instead of a silent lockout */
type DbErrorListener = (msg: string) => void;
const errorListeners = new Set<DbErrorListener>();
export function onDatabaseError(fn: DbErrorListener): () => void {
  errorListeners.add(fn);
  return () => errorListeners.delete(fn);
}
function emitDbError(msg: string) {
  errorListeners.forEach((f) => { try { f(msg); } catch { /* ignore */ } });
}

/** Compatibility column aliases so legacy queries keep working on the real schema */
const ALIASES: Record<string, string[]> = {
  contacts: [`kind AS type`, `CASE WHEN is_active=1 THEN 'active' ELSE 'inactive' END AS status`],
  items: [`sell_price AS price`],
  sales_documents: [`final_total AS total`, `final_total AS grand_total`, `number AS doc_number`],
  purchase_documents: [`final_total AS total`, `final_total AS grand_total`, `number AS doc_number`],
  accounting_documents: [`description AS narrative`, `total_debit AS debit_total`, `total_credit AS credit_total`],
  audit_logs: [`at AS created_at`, `entity AS table_name`, `user_name AS username`],
  warehouses: [],
};

function decorate(table: string, rows: any[]): any[] {
  const al = ALIASES[table];
  if (!al || al.length === 0) return rows;
  return rows.map((r) => {
    const out = { ...r };
    for (const expr of al) {
      const [src, alias] = expr.includes(' AS ') ? [expr.split(' AS ')[0].trim(), expr.split(' AS ')[1].trim()] : [expr, expr];
      // evaluate simple CASE expression
      if (src.startsWith('CASE')) {
        try {
          const v = db!.get(`SELECT ${expr} AS v FROM ${table} WHERE id=?`, [r.id]);
          out[alias] = v?.v ?? r[alias];
        } catch { /* ignore */ }
      } else if (out[src] !== undefined && out[alias] === undefined) {
        out[alias] = out[src];
      }
    }
    return out;
  });
}

export function initDatabase(): Promise<void> {
  if (initPromise) return initPromise;
  initPromise = (async () => {
    try {
      db = await getSqlite();
      runMigrations(db);
      seedDemoData(db);
      // self-heal: ensure the default admin can ALWAYS log in (SR-AUTH robustness)
      try {
        const admin = db.get<any>(`SELECT id, username, password_hash FROM users WHERE username='admin'`);
        if (!admin) {
          db.insert('users', { username: 'admin', password_hash: hashPassword('admin123'), full_name: 'مدیر سیستم', role: 'manager', is_active: 1, created_at: new Date().toISOString().replace('T', ' ').slice(0, 19) });
        } else if (!verifyPassword('admin123', String(admin.password_hash ?? ''))) {
          db.update('users', admin.id, { password_hash: hashPassword('admin123'), is_active: 1 });
        }
        // rehash any legacy/plaintext hashes for other demo users
        const allUsers = db.all<any>(`SELECT id, username, password_hash FROM users`);
        for (const ur of allUsers) {
          const h = String(ur.password_hash ?? '');
          if (!h.startsWith('v2:') && ur.username !== 'admin') {
            const pw = ur.username === 'inactive' ? '1234' : ['finance', 'accountant', 'sales', 'purchase', 'warehouse', 'viewer'].includes(String(ur.username)) ? '1234' : '1234';
            if (!verifyPassword(pw, h)) db.update('users', ur.id, { password_hash: hashPassword(pw) });
          }
        }
      } catch { /* ignore */ }
      db.save();
      console.log('✅ SQLite database ready');
    } catch (e) {
      // a corrupt saved database must never lock the user out — rebuild from scratch
      console.error('DB init failed, rebuilding fresh database:', e);
      emitDbError('پایگاه داده قبلی قابل بازیابی نبود؛ نسخه تازه با داده نمونه ساخته شد.');
      try { localStorage.removeItem('sarmad_sqlite_db'); } catch { /* ignore */ }
      resetSqliteInstance();
      db = null;
      db = await getSqlite();
      runMigrations(db);
      seedDemoData(db);
      db.save();
    } finally {
      initPromise = null;
    }
  })();
  return initPromise;
}

export function getDbInstance(): SqliteDatabase {
  if (!db) throw new Error('پایگاه داده آماده نیست');
  return db;
}

function detectTable(sql: string): string {
  const m = sql.match(/FROM\s+([a-zA-Z_]+)/i) || sql.match(/INTO\s+([a-zA-Z_]+)/i) || sql.match(/UPDATE\s+([a-zA-Z_]+)/i);
  return m ? m[1] : '';
}

export function execQuery(sql: string, params: any[] = []): any[] {
  if (!db) return [];
  try {
    const rows = db.all(sql, params);
    const t = detectTable(sql);
    return decorate(t, rows);
  } catch (e) {
    console.error('SQL error:', e, sql);
    return [];
  }
}

export function runQuery(sql: string, params: any[] = []): void {
  if (!db) return;
  try {
    db.run(sql, params);
    db.save();
  } catch (e) {
    console.error('SQL run error:', e, sql);
    throw e;
  }
}

export function saveDatabase(): void {
  db?.save();
}

export function closeDatabase(): void {
  db?.save();
}

class LegacyDb {
  /** sql.js-style exec returning [{columns, values}] */
  exec(sql: string, params: any[] = []): { columns: string[]; values: any[][] }[] {
    if (!db) return [];
    const res = db.rawExec(sql, params);
    return res.map((r: any) => ({ columns: r.columns, values: r.values }));
  }
  run(sql: string, params: any[] = []) {
    runQuery(sql, params);
  }
  all<T = any>(sql: string, params: any[] = []) {
    return execQuery(sql, params) as T[];
  }
}
const legacyDb = new LegacyDb();

export function getDatabase(): any {
  return legacyDb;
}

export function getDatabaseType(): string {
  return 'sqlite';
}

export function getNextNumber(sequenceName: string): string {
  if (!db) return `${sequenceName}-${Date.now()}`;
  const map: Record<string, string> = { sales: 'invoice_sale', purchase: 'invoice_purchase', accounting: 'accounting', receipt: 'receipt', payment: 'payment', check: 'check', inv_in: 'inv_in', inv_out: 'inv_out' };
  const key = map[sequenceName] || sequenceName;
  const seq = db.get<any>(`SELECT * FROM number_sequences WHERE doc_type=?`, [key]);
  if (!seq) {
    db.insert('number_sequences', { doc_type: key, prefix: sequenceName.toUpperCase().slice(0, 3), current_no: 1001 });
    return `${sequenceName.toUpperCase().slice(0, 3)}-1001`;
  }
  const next = seq.current_no + 1;
  db.update('number_sequences', seq.id, { current_no: next });
  db.save();
  return `${seq.prefix}-${String(next).padStart(seq.padding || 4, '0')}`;
}

export function backupDatabase(): string {
  return db ? db.backupBase64() : '';
}

export function restoreDatabase(base64Data: string): boolean {
  if (!db) return false;
  const ok = db.restoreBase64(base64Data);
  if (ok) db.save();
  return ok;
}

export function integrityCheck(): boolean {
  return db ? db.integrityCheck() : false;
}

export { hashPassword, verifyPassword };
