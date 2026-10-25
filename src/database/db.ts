import initSqlJs, { Database } from 'sql.js';

let db: Database | null = null;
let isInitialized = false;

const DB_STORAGE_KEY = 'sarmad_sqlite_db';

// Initialize SQLite database
export async function initDatabase(): Promise<Database> {
  if (isInitialized && db) return db;

  const SQL = await initSqlJs({
    locateFile: (file: string) => `https://sql.js.org/dist/${file}`
  });

  // Try to load existing database from localStorage
  const savedDb = localStorage.getItem(DB_STORAGE_KEY);
  if (savedDb) {
    try {
      const buf = Uint8Array.from(atob(savedDb), c => c.charCodeAt(0));
      db = new SQL.Database(buf);
    } catch (e) {
      console.warn('Failed to load saved database, creating new one');
      db = new SQL.Database();
    }
  } else {
    db = new SQL.Database();
  }

  // Create tables
  createTables(db);
  
  // Seed initial data if empty
  seedData(db);
  
  isInitialized = true;
  saveDatabase();
  
  return db;
}

// Save database to localStorage
export function saveDatabase(): void {
  if (!db) return;
  try {
    const data = db.export();
    const buffer = Array.from(data);
    const base64 = btoa(String.fromCharCode(...buffer));
    localStorage.setItem(DB_STORAGE_KEY, base64);
  } catch (e) {
    console.error('Failed to save database:', e);
  }
}

// Get database instance
export function getDatabase(): Database | null {
  return db;
}

// Create all tables
function createTables(database: Database): void {
  database.run(`
    -- Users table
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      full_name TEXT NOT NULL,
      email TEXT,
      role TEXT NOT NULL DEFAULT 'user',
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      last_login TEXT
    );

    -- Company settings
    CREATE TABLE IF NOT EXISTS company_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      company_name TEXT,
      brand_name TEXT,
      address TEXT,
      phone TEXT,
      economic_code TEXT,
      national_id TEXT,
      logo TEXT,
      fiscal_year_start TEXT,
      currency TEXT DEFAULT 'ریال',
      decimal_places INTEGER DEFAULT 0
    );

    -- Contacts (customers & suppliers)
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL, -- customer, supplier, both
      phone TEXT,
      mobile TEXT,
      email TEXT,
      address TEXT,
      city TEXT,
      postal_code TEXT,
      credit_limit REAL DEFAULT 0,
      opening_balance REAL DEFAULT 0,
      status TEXT DEFAULT 'active',
      description TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    -- Item groups
    CREATE TABLE IF NOT EXISTS item_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      parent_id INTEGER,
      description TEXT,
      FOREIGN KEY (parent_id) REFERENCES item_groups(id)
    );

    -- Units
    CREATE TABLE IF NOT EXISTS units (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      short_name TEXT,
      description TEXT
    );

    -- Warehouses
    CREATE TABLE IF NOT EXISTS warehouses (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      address TEXT,
      is_active INTEGER DEFAULT 1
    );

    -- Items (products & services)
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      group_id INTEGER,
      unit_id INTEGER,
      buy_price REAL DEFAULT 0,
      sell_price REAL DEFAULT 0,
      min_stock REAL DEFAULT 0,
      description TEXT,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (group_id) REFERENCES item_groups(id),
      FOREIGN KEY (unit_id) REFERENCES units(id)
    );

    -- Cash accounts
    CREATE TABLE IF NOT EXISTS cash_accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      type TEXT NOT NULL, -- cash, bank
      bank_name TEXT,
      account_number TEXT,
      balance REAL DEFAULT 0,
      is_active INTEGER DEFAULT 1
    );

    -- Chart of accounts
    CREATE TABLE IF NOT EXISTS accounts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      code TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      type TEXT NOT NULL, -- total, subsidiary, detail
      parent_id INTEGER,
      nature TEXT, -- debit, credit
      is_active INTEGER DEFAULT 1,
      FOREIGN KEY (parent_id) REFERENCES accounts(id)
    );

    -- Purchase documents
    CREATE TABLE IF NOT EXISTS purchase_documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doc_number TEXT UNIQUE NOT NULL,
      doc_date TEXT NOT NULL,
      contact_id INTEGER NOT NULL,
      warehouse_id INTEGER NOT NULL,
      subtotal REAL DEFAULT 0,
      discount REAL DEFAULT 0,
      tax REAL DEFAULT 0,
      total REAL DEFAULT 0,
      paid_amount REAL DEFAULT 0,
      status TEXT DEFAULT 'draft', -- draft, confirmed, returned
      description TEXT,
      created_by INTEGER,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (contact_id) REFERENCES contacts(id),
      FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
    );

    -- Purchase lines
    CREATE TABLE IF NOT EXISTS purchase_lines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doc_id INTEGER NOT NULL,
      item_id INTEGER NOT NULL,
      quantity REAL NOT NULL,
      unit_price REAL NOT NULL,
      discount REAL DEFAULT 0,
      total REAL NOT NULL,
      FOREIGN KEY (doc_id) REFERENCES purchase_documents(id),
      FOREIGN KEY (item_id) REFERENCES items(id)
    );

    -- Sales documents
    CREATE TABLE IF NOT EXISTS sales_documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doc_number TEXT UNIQUE NOT NULL,
      doc_date TEXT NOT NULL,
      contact_id INTEGER NOT NULL,
      warehouse_id INTEGER NOT NULL,
      subtotal REAL DEFAULT 0,
      discount REAL DEFAULT 0,
      tax REAL DEFAULT 0,
      total REAL DEFAULT 0,
      paid_amount REAL DEFAULT 0,
      cost_total REAL DEFAULT 0,
      profit REAL DEFAULT 0,
      status TEXT DEFAULT 'draft',
      description TEXT,
      created_by INTEGER,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (contact_id) REFERENCES contacts(id),
      FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
    );

    -- Sales lines
    CREATE TABLE IF NOT EXISTS sales_lines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doc_id INTEGER NOT NULL,
      item_id INTEGER NOT NULL,
      quantity REAL NOT NULL,
      unit_price REAL NOT NULL,
      cost_price REAL DEFAULT 0,
      discount REAL DEFAULT 0,
      total REAL NOT NULL,
      FOREIGN KEY (doc_id) REFERENCES sales_documents(id),
      FOREIGN KEY (item_id) REFERENCES items(id)
    );

    -- Inventory movements
    CREATE TABLE IF NOT EXISTS inventory_movements (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item_id INTEGER NOT NULL,
      warehouse_id INTEGER NOT NULL,
      movement_type TEXT NOT NULL, -- in, out, transfer
      quantity REAL NOT NULL,
      reference_type TEXT,
      reference_id INTEGER,
      description TEXT,
      created_by INTEGER,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (item_id) REFERENCES items(id),
      FOREIGN KEY (warehouse_id) REFERENCES warehouses(id)
    );

    -- Cash transactions
    CREATE TABLE IF NOT EXISTS cash_transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_id INTEGER NOT NULL,
      transaction_type TEXT NOT NULL, -- receive, pay, transfer
      amount REAL NOT NULL,
      reference_type TEXT,
      reference_id INTEGER,
      contact_id INTEGER,
      description TEXT,
      transaction_date TEXT NOT NULL,
      created_by INTEGER,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (account_id) REFERENCES cash_accounts(id)
    );

    -- Checks
    CREATE TABLE IF NOT EXISTS checks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      check_number TEXT NOT NULL,
      check_type TEXT NOT NULL, -- received, paid
      amount REAL NOT NULL,
      bank_name TEXT,
      issue_date TEXT,
      due_date TEXT NOT NULL,
      contact_id INTEGER,
      account_id INTEGER,
      status TEXT DEFAULT 'pending', -- pending, cleared, bounced, transferred
      description TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (contact_id) REFERENCES contacts(id)
    );

    -- Check events (history)
    CREATE TABLE IF NOT EXISTS check_events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      check_id INTEGER NOT NULL,
      event_type TEXT NOT NULL,
      event_date TEXT DEFAULT (datetime('now')),
      description TEXT,
      created_by INTEGER,
      FOREIGN KEY (check_id) REFERENCES checks(id)
    );

    -- Accounting documents
    CREATE TABLE IF NOT EXISTS accounting_documents (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doc_number TEXT UNIQUE NOT NULL,
      doc_date TEXT NOT NULL,
      description TEXT,
      fiscal_period TEXT,
      total_debit REAL DEFAULT 0,
      total_credit REAL DEFAULT 0,
      status TEXT DEFAULT 'draft', -- draft, confirmed, finalized
      source_type TEXT,
      source_id INTEGER,
      created_by INTEGER,
      created_at TEXT DEFAULT (datetime('now'))
    );

    -- Accounting document lines
    CREATE TABLE IF NOT EXISTS accounting_document_lines (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      doc_id INTEGER NOT NULL,
      account_id INTEGER NOT NULL,
      debit REAL DEFAULT 0,
      credit REAL DEFAULT 0,
      description TEXT,
      FOREIGN KEY (doc_id) REFERENCES accounting_documents(id),
      FOREIGN KEY (account_id) REFERENCES accounts(id)
    );

    -- Audit logs
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      action TEXT NOT NULL,
      table_name TEXT,
      record_id INTEGER,
      old_value TEXT,
      new_value TEXT,
      ip_address TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    -- Number sequences
    CREATE TABLE IF NOT EXISTS number_sequences (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      sequence_name TEXT UNIQUE NOT NULL,
      prefix TEXT,
      current_number INTEGER DEFAULT 0,
      fiscal_year TEXT
    );

    -- App settings
    CREATE TABLE IF NOT EXISTS app_settings (
      key TEXT PRIMARY KEY,
      value TEXT
    );
  `);
}

// Seed initial data
function seedData(database: Database): void {
  // Check if already seeded
  const result = database.exec("SELECT COUNT(*) as count FROM users");
  if (result[0] && result[0].values[0] && Number(result[0].values[0][0]) > 0) return;

  // Insert default admin user (password: admin123)
  database.run(`
    INSERT INTO users (username, password_hash, full_name, email, role, is_active)
    VALUES ('admin', 'admin123', 'مدیر سیستم', 'admin@sarmad.ir', 'admin', 1)
  `);

  // Insert company settings
  database.run(`
    INSERT INTO company_settings (company_name, brand_name, address, phone, economic_code, national_id, fiscal_year_start, currency)
    VALUES ('شرکت نمونه سرمد', 'سَرمد', 'تهران، خیابان ولیعصر، پلاک ۱۲۳', '۰۲۱-۸۸۷۷۶۶۵۵', '۱۲۳۴۵۶۷۸۹', '۱۰۱۰۰۱۲۳۴۵۶', '1404', 'ریال')
  `);

  // Insert units
  const units = ['عدد', 'کیلوگرم', 'متر', 'لیتر', 'بسته', 'کارتن', 'جعبه', 'دستگاه'];
  units.forEach(u => {
    database.run(`INSERT INTO units (name, short_name) VALUES (?, ?)`, [u, u.substring(0, 3)]);
  });

  // Insert warehouses
  database.run(`INSERT INTO warehouses (code, name, address) VALUES ('WH-001', 'انبار مرکزی', 'تهران، خیابان صنعتی')`);
  database.run(`INSERT INTO warehouses (code, name, address) VALUES ('WH-002', 'انبار شرق', 'تهران، خیابان دماوند')`);
  database.run(`INSERT INTO warehouses (code, name, address) VALUES ('WH-003', 'انبار غرب', 'تهران، خیابان آزادی')`);

  // Insert item groups
  database.run(`INSERT INTO item_groups (code, name) VALUES ('G-01', 'کالای دیجیتال')`);
  database.run(`INSERT INTO item_groups (code, name) VALUES ('G-02', 'لوازم جانبی')`);
  database.run(`INSERT INTO item_groups (code, name) VALUES ('G-03', 'ذخیره‌سازی')`);
  database.run(`INSERT INTO item_groups (code, name) VALUES ('G-04', 'لوازم خانگی')`);

  // Insert items
  const items = [
    ['K-001', 'لپ‌تاپ ایسوس VivoBook', 1, 1, 28000000, 35000000, 5],
    ['K-002', 'ماوس بی‌سیم لاجیتک', 2, 1, 500000, 850000, 10],
    ['K-003', 'کابل HDMI 2 متر', 2, 1, 80000, 120000, 20],
    ['K-004', 'مانیتور سامسونگ ۲۴ اینچ', 1, 1, 9500000, 12000000, 5],
    ['K-005', 'کیبورد مکانیکی', 2, 1, 1800000, 2500000, 10],
    ['K-006', 'هارد اکسترنال ۱ ترابایت', 3, 1, 2800000, 3800000, 15],
    ['K-007', 'فلش مموری ۶۴ گیگ', 3, 1, 280000, 450000, 30],
    ['K-008', 'هدفون بلوتوثی', 2, 1, 350000, 650000, 12],
    ['K-009', 'شارژر سریع تایپ سی', 2, 1, 150000, 280000, 25],
    ['K-010', 'وب‌کم اچ‌دی', 1, 1, 800000, 1200000, 8],
  ];
  items.forEach(item => {
    database.run(`INSERT INTO items (code, name, group_id, unit_id, buy_price, sell_price, min_stock) VALUES (?, ?, ?, ?, ?, ?, ?)`, item);
  });

  // Insert contacts
  const contacts = [
    ['SH-001', 'شرکت آلفا تکنولوژی', 'customer', '۰۲۱-۸۸۷۷۶۶۵۵', 'تهران', 50000000],
    ['SH-002', 'تأمین‌کننده بتا', 'supplier', '۰۳۱-۳۳۴۴۵۵۶۶', 'اصفهان', 30000000],
    ['SH-003', 'شرکت گاما تجارت', 'customer', '۰۴۱-۴۴۵۵۶۶۷۷', 'تبریز', 20000000],
    ['SH-004', 'فروشگاه دلتا', 'both', '۰۵۱-۵۵۶۶۷۷۸۸', 'مشهد', 40000000],
    ['SH-005', 'شرکت اپسیلون', 'customer', '۰۲۶-۶۶۷۷۸۸۹۹', 'کرج', 15000000],
    ['SH-006', 'بازرگانی زتا', 'supplier', '۰۲۱-۷۷۸۸۹۹۰۰', 'تهران', 60000000],
  ];
  contacts.forEach(c => {
    database.run(`INSERT INTO contacts (code, name, type, phone, city, credit_limit) VALUES (?, ?, ?, ?, ?, ?)`, c);
  });

  // Insert cash accounts
  database.run(`INSERT INTO cash_accounts (code, name, type, balance) VALUES ('CA-001', 'صندوق نقدی', 'cash', 15200000)`);
  database.run(`INSERT INTO cash_accounts (code, name, type, bank_name, account_number, balance) VALUES ('CA-002', 'بانک ملت - جاری', 'bank', 'بانک ملت', '۶۱۰۴-۳۳۷۸-۱۲۳۴-۵۶۷۸', 85000000)`);
  database.run(`INSERT INTO cash_accounts (code, name, type, bank_name, account_number, balance) VALUES ('CA-003', 'بانک ملی - پس‌انداز', 'bank', 'بانک ملی', '۰۱۰۸-۵۵۶۶-۷۸۹۰-۱۲۳۴', 120000000)`);
  database.run(`INSERT INTO cash_accounts (code, name, type, bank_name, account_number, balance) VALUES ('CA-004', 'بانک صادرات - جاری', 'bank', 'بانک صادرات', '۲۳۴۵-۶۷۸۹-۰۱۲۳-۴۵۶۷', 45500000)`);

  // Insert chart of accounts
  const accounts = [
    ['1000', 'دارایی‌ها', 'total', null, 'debit'],
    ['1100', 'موجودی نقد و بانک', 'subsidiary', '1000', 'debit'],
    ['1101', 'صندوق', 'detail', '1100', 'debit'],
    ['1102', 'بانک ملت', 'detail', '1100', 'debit'],
    ['1103', 'بانک ملی', 'detail', '1100', 'debit'],
    ['1200', 'حساب‌های دریافتنی', 'subsidiary', '1000', 'debit'],
    ['1300', 'موجودی کالا', 'subsidiary', '1000', 'debit'],
    ['2000', 'بدهی‌ها', 'total', null, 'credit'],
    ['2100', 'حساب‌های پرداختنی', 'subsidiary', '2000', 'credit'],
    ['3000', 'حقوق صاحبان سهام', 'total', null, 'credit'],
    ['3100', 'سرمایه', 'subsidiary', '3000', 'credit'],
    ['4000', 'درآمدها', 'total', null, 'credit'],
    ['4100', 'فروش', 'subsidiary', '4000', 'credit'],
    ['5000', 'هزینه‌ها', 'total', null, 'debit'],
    ['5100', 'بهای تمام‌شده کالا', 'subsidiary', '5000', 'debit'],
    ['5200', 'هزینه‌های اداری', 'subsidiary', '5000', 'debit'],
  ];
  accounts.forEach(a => {
    database.run(`INSERT INTO accounts (code, title, type, parent_id, nature) VALUES (?, ?, ?, ?, ?)`, a);
  });

  // Insert number sequences
  database.run(`INSERT INTO number_sequences (sequence_name, prefix, current_number, fiscal_year) VALUES ('purchase', 'خرید', 1005, '1404')`);
  database.run(`INSERT INTO number_sequences (sequence_name, prefix, current_number, fiscal_year) VALUES ('sales', 'فروش', 2005, '1404')`);
  database.run(`INSERT INTO number_sequences (sequence_name, prefix, current_number, fiscal_year) VALUES ('accounting', 'سند', 1006, '1404')`);

  // Insert sample purchase documents
  database.run(`INSERT INTO purchase_documents (doc_number, doc_date, contact_id, warehouse_id, subtotal, total, paid_amount, status, description) VALUES ('خرید-۱۰۰۱', '1404/04/12', 2, 1, 8200000, 8200000, 4920000, 'confirmed', 'خرید لوازم جانبی')`);
  database.run(`INSERT INTO purchase_documents (doc_number, doc_date, contact_id, warehouse_id, subtotal, total, paid_amount, status, description) VALUES ('خرید-۱۰۰۲', '1404/04/10', 6, 2, 15000000, 15000000, 15000000, 'confirmed', 'خرید کالای دیجیتال')`);

  // Insert sample sales documents
  database.run(`INSERT INTO sales_documents (doc_number, doc_date, contact_id, warehouse_id, subtotal, total, paid_amount, cost_total, profit, status, description) VALUES ('فروش-۲۰۰۱', '1404/04/14', 1, 1, 12500000, 12500000, 10000000, 9300000, 3200000, 'confirmed', 'فروش به شرکت آلفا')`);
  database.run(`INSERT INTO sales_documents (doc_number, doc_date, contact_id, warehouse_id, subtotal, total, paid_amount, cost_total, profit, status, description) VALUES ('فروش-۲۰۰۲', '1404/04/13', 4, 2, 8700000, 8700000, 8700000, 6600000, 2100000, 'confirmed', 'فروش به فروشگاه دلتا')`);

  // Insert sample checks
  database.run(`INSERT INTO checks (check_number, check_type, amount, bank_name, issue_date, due_date, contact_id, status) VALUES ('۱۲۳۴۵۶', 'received', 5000000, 'بانک ملت', '1404/04/10', '1404/04/16', 1, 'pending')`);
  database.run(`INSERT INTO checks (check_number, check_type, amount, bank_name, issue_date, due_date, contact_id, status) VALUES ('۷۸۹۰۱۲', 'paid', 3200000, 'بانک ملی', '1404/04/08', '1404/04/17', 2, 'pending')`);

  // Insert sample accounting documents
  database.run(`INSERT INTO accounting_documents (doc_number, doc_date, description, total_debit, total_credit, status, source_type) VALUES ('سند-۱۰۰۱', '1404/04/14', 'ثبت فاکتور فروش شماره ۲۰۰۱', 12500000, 12500000, 'finalized', 'sales')`);
  database.run(`INSERT INTO accounting_documents (doc_number, doc_date, description, total_debit, total_credit, status, source_type) VALUES ('سند-۱۰۰۲', '1404/04/13', 'ثبت فاکتور خرید شماره ۱۰۰۱', 8200000, 8200000, 'finalized', 'purchase')`);

  // Insert app settings
  database.run(`INSERT INTO app_settings (key, value) VALUES ('dark_mode', 'false')`);
  database.run(`INSERT INTO app_settings (key, value) VALUES ('language', 'fa')`);
  database.run(`INSERT INTO app_settings (key, value) VALUES ('date_format', 'jalali')`);
  database.run(`INSERT INTO app_settings (key, value) VALUES ('session_timeout', '30')`);

  saveDatabase();
}

// Helper functions for common queries
export function runQuery(sql: string, params: any[] = []): void {
  if (!db) throw new Error('Database not initialized');
  db.run(sql, params);
  saveDatabase();
}

export function execQuery(sql: string): any[] {
  if (!db) throw new Error('Database not initialized');
  const result = db.exec(sql);
  if (result.length === 0) return [];
  return result[0].values.map(row => {
    const obj: any = {};
    result[0].columns.forEach((col, idx) => {
      obj[col] = row[idx];
    });
    return obj;
  });
}

export function getNextNumber(sequenceName: string): string {
  if (!db) throw new Error('Database not initialized');
  const result = db.exec(`SELECT current_number, prefix FROM number_sequences WHERE sequence_name = ?`, [sequenceName]);
  if (result.length === 0 || result[0].values.length === 0) return '0001';
  const currentNum = result[0].values[0][0] as number;
  const prefix = result[0].values[0][1] as string;
  db.run(`UPDATE number_sequences SET current_number = current_number + 1 WHERE sequence_name = ?`, [sequenceName]);
  saveDatabase();
  return `${prefix}-${String(currentNum + 1).padStart(4, '0')}`;
}

export function backupDatabase(): string {
  if (!db) throw new Error('Database not initialized');
  const data = db.export();
  const buffer = Array.from(data);
  return btoa(String.fromCharCode(...buffer));
}

export function restoreDatabase(base64Data: string): boolean {
  try {
    const SQL = initSqlJs;
    const buf = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
    if (db) db.close();
    // Re-init with restored data
    localStorage.setItem(DB_STORAGE_KEY, base64Data);
    isInitialized = false;
    return true;
  } catch (e) {
    console.error('Restore failed:', e);
    return false;
  }
}
