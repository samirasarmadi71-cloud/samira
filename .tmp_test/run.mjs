import initSqlJs from 'sql.js';
globalThis.localStorage = { store:{}, getItem(k){return this.store[k]??null}, setItem(k,v){this.store[k]=String(v)}, removeItem(k){delete this.store[k]} };
const { SqliteDatabase } = await import('./sqlite.js');
const { runMigrations, seedDemoData, hashPassword, verifyPassword } = await import('./schema.js');
const SQL = await initSqlJs();
const db = new SqliteDatabase();
db.db = new SQL.Database();
runMigrations(db);
seedDemoData(db);

const users = db.all(`SELECT * FROM users WHERE username = ?`, ['admin']);
console.log('1. user found:', users.length===1);
const u = users[0];
console.log('2. active ok:', Number(u.is_active)===1);
console.log('3. verifyPassword(admin123):', verifyPassword('admin123', String(u.password_hash)));
console.log('4. verifyPassword(wrong):', verifyPassword('wrong', String(u.password_hash)));
console.log('5. hashPassword matches stored:', hashPassword('admin123')===u.password_hash);

db.run(`INSERT INTO audit_logs (user_name, username, user_id, action, entity, table_name, record_id, details, result, at, created_at) VALUES (?, ?, ?, 'login', 'auth', 'users', ?, 'ok', 'success', datetime('now','localtime'), datetime('now','localtime'))`, [u.full_name, u.username, Number(u.id), String(u.id)]);
console.log('6. audit insert OK, rows:', db.count('audit_logs'));

const logs = db.all(`SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 5`);
console.log('7. ORDER BY created_at works, got', logs.length, 'rows');

const f = db.get(`SELECT * FROM users WHERE username='finance'`);
console.log('8. finance/1234 valid:', verifyPassword('1234', f.password_hash));

// OLD saved DB scenario: legacy djb2 hash + missing columns
const db2 = new SQL.Database();
db2.run(`CREATE TABLE users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT UNIQUE, password_hash TEXT, full_name TEXT, email TEXT, phone TEXT, role TEXT DEFAULT 'viewer', is_active INTEGER DEFAULT 1, last_login TEXT, created_at TEXT)`);
db2.run(`CREATE TABLE audit_logs (id INTEGER PRIMARY KEY AUTOINCREMENT, at TEXT, user_name TEXT, action TEXT, entity TEXT, record_id TEXT, details TEXT, result TEXT)`);
function legacyHash(pw){let h=5381;const s='sarmad$'+pw;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))>>>0;return 'h'+h.toString(16)+s.length.toString(16);}
db2.run(`INSERT INTO users (username,password_hash,full_name,is_active) VALUES ('admin',?,'A',1)`, [legacyHash('admin123')]);
db2.run(`INSERT INTO audit_logs (at,user_name,action,entity,record_id,details,result) VALUES ('2026-01-01','a','x','y','1','d','s')`);
const wrap = Object.create(SqliteDatabase.prototype);
wrap.db = db2; wrap.storageKey='x';
const rowOld = wrap.all(`SELECT * FROM users WHERE username='admin'`)[0];
console.log('9. old legacy hash verifies via verifyPassword:', verifyPassword('admin123', rowOld.password_hash));
runMigrations(wrap);
try {
  wrap.run(`INSERT INTO audit_logs (user_name, username, user_id, action, entity, table_name, record_id, details, result, at, created_at) VALUES (?,?,?,?,?,?,?,?,?,?,datetime('now','localtime'))`, ['a','a',1,'login','auth','users','1','d','success', null]);
  console.log('10. after-migration INSERT into OLD db: OK');
} catch(e){ console.log('10. after-migration INSERT FAILED:', e.message); }
const backfilled = wrap.all(`SELECT created_at FROM audit_logs WHERE at='2026-01-01'`)[0];
console.log('11. created_at backfilled from at:', backfilled?.created_at === '2026-01-01');
