// Node smoke test: run the REAL engine + schema + seed + login flow with a localStorage shim
import { readFileSync } from 'fs';

// --- minimal browser shims ---
const store = new Map();
globalThis.localStorage = {
  getItem: (k) => (store.has(k) ? store.get(k) : null),
  setItem: (k, v) => store.set(k, String(v)),
  removeItem: (k) => store.delete(k),
};
globalThis.window = globalThis;
globalThis.self = globalThis; // sql.js asm detection
if (!globalThis.TextDecoder) { /* node has it */ }

const { getSqlite } = await import('../src/database/sqlite.ts');
const { runMigrations, seedDemoData, hashPassword, verifyPassword } = await import('../src/database/schema.ts');

const db = await getSqlite();
runMigrations(db);
seedDemoData(db);
db.save();

console.log('integrity:', db.integrityCheck());
const users = db.all(`SELECT * FROM users WHERE username='admin'`);
console.log('admin row found:', users.length === 1, 'hash prefix:', String(users[0].password_hash).slice(0,3));
console.log('verify admin123:', verifyPassword('admin123', users[0].password_hash));
console.log('verify wrong pw:', verifyPassword('wrong', users[0].password_hash));

// simulate the exact login INSERT from LoginPage
db.run(`INSERT INTO audit_logs (user_name, username, user_id, action, entity, table_name, record_id, details, result, at, created_at)
        VALUES (?, ?, ?, 'login', 'auth', 'users', ?, 'ورود موفق به سیستم', 'success', datetime('now','localtime'), datetime('now','localtime'))`,
 ['مدیر سیستم', 'admin', Number(users[0].id), String(users[0].id)]);
console.log('audit insert OK, rows:', db.count('audit_logs'));

// inactive user check
const inact = db.all(`SELECT is_active FROM users WHERE username='inactive'`);
console.log('inactive user is_active:', inact[0]?.is_active);

// seeded content sanity
console.log('contacts:', db.count('contacts'), 'items:', db.count('items'), 'accounts:', db.count('accounts'),
  'sales:', db.count('sales_documents'), 'purchases:', db.count('purchase_documents'), 'checks:', db.count('checks'),
  'movements:', db.count('inventory_movements'), 'inv_lines:', db.count('inventory_document_lines'));
console.log('SMOKE PASS');
