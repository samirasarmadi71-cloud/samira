// ============ Real SQLite database (sql.js) with localStorage persistence ============
import initSqlJs, { Database as SqlJsDatabase } from 'sql.js';

export interface QueryResult<T = any> {
  columns: string[];
  values: T[][];
}

export class SqliteDatabase {
  private db: SqlJsDatabase | null = null;
  readonly storageKey = 'sarmad_sqlite_db';

  async init(): Promise<void> {
    if (this.db) return;
    const SQL = await initSqlJs();
    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      try {
        this.db = new SQL.Database(Uint8Array.from(atob(saved), c => c.charCodeAt(0)));
      } catch {
        this.db = new SQL.Database();
      }
    } else {
      this.db = new SQL.Database();
    }
    this.db.run('PRAGMA foreign_keys = ON;');
  }

  private getDb(): SqlJsDatabase {
    if (!this.db) throw new Error('پایگاه داده آماده نیست');
    return this.db;
  }

  /** Run a query and return rows as objects */
  all<T = any>(sql: string, params: any[] = []): T[] {
    const res = this.getDb().exec(sql, params);
    if (res.length === 0) return [];
    return this.toObjects(res[0]);
  }

  get<T = any>(sql: string, params: any[] = []): T | undefined {
    return this.all<T>(sql, params)[0];
  }

  /** Raw exec result */
  rawExec(sql: string, params: any[] = []): QueryResult[] {
    return this.getDb().exec(sql, params) as QueryResult[];
  }

  run(sql: string, params: any[] = []): void {
    this.getDb().run(sql, params);
  }

  /** Insert helper — returns last insert rowid */
  insert(table: string, row: Record<string, any>): number {
    const cols = Object.keys(row);
    const sql = `INSERT INTO ${table} (${cols.join(',')}) VALUES (${cols.map(() => '?').join(',')})`;
    this.getDb().run(sql, cols.map(c => row[c] ?? null));
    const r = this.getDb().exec('SELECT last_insert_rowid() as id');
    return Number(r[0].values[0][0]);
  }

  update(table: string, id: number | string, changes: Record<string, any>): void {
    const cols = Object.keys(changes);
    if (cols.length === 0) return;
    const sql = `UPDATE ${table} SET ${cols.map(c => `${c}=?`).join(',')} WHERE id=?`;
    this.getDb().run(sql, [...cols.map(c => changes[c] ?? null), id]);
  }

  remove(table: string, id: number | string): void {
    this.getDb().run(`DELETE FROM ${table} WHERE id=?`, [id]);
  }

  count(table: string, where = '', params: any[] = []): number {
    const r = this.get(`SELECT COUNT(*) AS c FROM ${table} ${where}`, params);
    return Number((r as any)?.c ?? 0);
  }

  sum(column: string, table: string, where = '', params: any[] = []): number {
    const r = this.get(`SELECT COALESCE(SUM(${column}),0) AS s FROM ${table} ${where}`, params);
    return Number((r as any)?.s ?? 0);
  }

  transaction(fn: () => void): void {
    const db = this.getDb();
    db.run('BEGIN TRANSACTION');
    try {
      fn();
      db.run('COMMIT');
    } catch (e) {
      db.run('ROLLBACK');
      throw e;
    }
  }

  save(): void {
    try {
      const data = this.getDb().export();
      let binary = '';
      data.forEach(b => (binary += String.fromCharCode(b)));
      localStorage.setItem(this.storageKey, btoa(binary));
    } catch (e) {
      console.error('DB persist failed:', e);
    }
  }

  integrityCheck(): boolean {
    try {
      const r = this.rawExec('PRAGMA integrity_check');
      return r[0]?.values?.[0]?.[0] === 'ok';
    } catch {
      return false;
    }
  }

  backupBase64(): string {
    const data = this.getDb().export();
    let binary = '';
    data.forEach(b => (binary += String.fromCharCode(b)));
    return btoa(binary);
  }

  restoreBase64(b64: string): boolean {
    try {
      const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
      // validate by opening
      const test = new (this.constructor as any);
      void test;
      const SQL = (this as any).SQL || null;
      void SQL;
      // Re-open using stored SQL module reference
      const sql = (this as any)._SQL;
      if (!sql) return false;
      const newDb = new sql.Database(bytes);
      newDb.run('PRAGMA integrity_check;');
      this.db = newDb;
      this.save();
      return true;
    } catch {
      return false;
    }
  }

  private toObjects<T>(res: { columns: string[]; values: any[][] }): T[] {
    return res.values.map(
      (row) => {
        const obj: any = {};
        res.columns.forEach((c, i) => (obj[c] = row[i]));
        return obj as T;
      }
    );
  }
}

let instance: SqliteDatabase | null = null;

export async function getSqlite(): Promise<SqliteDatabase> {
  if (!instance) {
    instance = new SqliteDatabase();
    // keep SQL module ref for restore
    const SQL = await initSqlJs();
    (instance as any)._SQL = SQL;
    await instance.init();
  }
  return instance;
}
