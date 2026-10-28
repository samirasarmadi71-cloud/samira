// ============ Real SQLite database (sql.js) with localStorage persistence ============
import initSqlJs from 'sql.js';
export class SqliteDatabase {
    constructor() {
        this.db = null;
        this.storageKey = 'sarmad_sqlite_db';
    }
    async init() {
        if (this.db)
            return;
        const SQL = await initSqlJs();
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            try {
                this.db = new SQL.Database(Uint8Array.from(atob(saved), c => c.charCodeAt(0)));
            }
            catch {
                this.db = new SQL.Database();
            }
        }
        else {
            this.db = new SQL.Database();
        }
        this.db.run('PRAGMA foreign_keys = ON;');
    }
    getDb() {
        if (!this.db)
            throw new Error('پایگاه داده آماده نیست');
        return this.db;
    }
    /** Run a query and return rows as objects */
    all(sql, params = []) {
        const res = this.getDb().exec(sql, params);
        if (res.length === 0)
            return [];
        return this.toObjects(res[0]);
    }
    get(sql, params = []) {
        return this.all(sql, params)[0];
    }
    /** Raw exec result */
    rawExec(sql, params = []) {
        return this.getDb().exec(sql, params);
    }
    run(sql, params = []) {
        this.getDb().run(sql, params);
    }
    /** Insert helper — returns last insert rowid */
    insert(table, row) {
        const cols = Object.keys(row);
        const sql = `INSERT INTO ${table} (${cols.join(',')}) VALUES (${cols.map(() => '?').join(',')})`;
        this.getDb().run(sql, cols.map(c => row[c] ?? null));
        const r = this.getDb().exec('SELECT last_insert_rowid() as id');
        return Number(r[0].values[0][0]);
    }
    update(table, id, changes) {
        const cols = Object.keys(changes);
        if (cols.length === 0)
            return;
        const sql = `UPDATE ${table} SET ${cols.map(c => `${c}=?`).join(',')} WHERE id=?`;
        this.getDb().run(sql, [...cols.map(c => changes[c] ?? null), id]);
    }
    remove(table, id) {
        this.getDb().run(`DELETE FROM ${table} WHERE id=?`, [id]);
    }
    count(table, where = '', params = []) {
        const r = this.get(`SELECT COUNT(*) AS c FROM ${table} ${where}`, params);
        return Number(r?.c ?? 0);
    }
    sum(column, table, where = '', params = []) {
        const r = this.get(`SELECT COALESCE(SUM(${column}),0) AS s FROM ${table} ${where}`, params);
        return Number(r?.s ?? 0);
    }
    transaction(fn) {
        const db = this.getDb();
        db.run('BEGIN TRANSACTION');
        try {
            fn();
            db.run('COMMIT');
        }
        catch (e) {
            db.run('ROLLBACK');
            throw e;
        }
    }
    save() {
        try {
            const data = this.getDb().export();
            let binary = '';
            data.forEach(b => (binary += String.fromCharCode(b)));
            localStorage.setItem(this.storageKey, btoa(binary));
        }
        catch (e) {
            console.error('DB persist failed:', e);
        }
    }
    integrityCheck() {
        try {
            const r = this.rawExec('PRAGMA integrity_check');
            return r[0]?.values?.[0]?.[0] === 'ok';
        }
        catch {
            return false;
        }
    }
    backupBase64() {
        const data = this.getDb().export();
        let binary = '';
        data.forEach(b => (binary += String.fromCharCode(b)));
        return btoa(binary);
    }
    restoreBase64(b64) {
        try {
            const bytes = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
            // validate by opening
            const test = new this.constructor;
            void test;
            const SQL = this.SQL || null;
            void SQL;
            // Re-open using stored SQL module reference
            const sql = this._SQL;
            if (!sql)
                return false;
            const newDb = new sql.Database(bytes);
            newDb.run('PRAGMA integrity_check;');
            this.db = newDb;
            this.save();
            return true;
        }
        catch {
            return false;
        }
    }
    toObjects(res) {
        return res.values.map((row) => {
            const obj = {};
            res.columns.forEach((c, i) => (obj[c] = row[i]));
            return obj;
        });
    }
}
let instance = null;
export async function getSqlite() {
    if (!instance) {
        instance = new SqliteDatabase();
        // keep SQL module ref for restore
        const SQL = await initSqlJs();
        instance._SQL = SQL;
        await instance.init();
    }
    return instance;
}
/** force-drop the singleton so a fresh engine can be built after wiping storage */
export function resetSqliteInstance() {
    instance = null;
}
