// Database abstraction layer with SQLite and localStorage fallback
// این لایه از sql.js برای SQLite استفاده می‌کند و در صورت عدم دسترسی، از localStorage استفاده می‌کند

interface DBInterface {
  init(): Promise<void>;
  exec(sql: string, params?: any[]): any[];
  run(sql: string, params?: any[]): void;
  save(): void;
  close(): void;
}

// ============ SQLite Implementation ============
class SQLiteDatabase implements DBInterface {
  private db: any = null;
  private SQL: any = null;

  async init(): Promise<void> {
    try {
      // Try to load sql.js from CDN
      const initSqlJs = (await import('sql.js')).default;
      
      this.SQL = await initSqlJs({
        locateFile: (file: string) => `https://sql.js.org/dist/${file}`
      });

      // Try to load existing database
      const savedDb = localStorage.getItem('sarmad_sqlite_db');
      if (savedDb) {
        try {
          const buf = Uint8Array.from(atob(savedDb), c => c.charCodeAt(0));
          this.db = new this.SQL.Database(buf);
        } catch (e) {
          console.warn('Failed to load saved database, creating new one');
          this.db = new this.SQL.Database();
        }
      } else {
        this.db = new this.SQL.Database();
      }

      console.log('✅ SQLite database initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize SQLite:', error);
      throw error;
    }
  }

  exec(sql: string, params: any[] = []): any[] {
    if (!this.db) throw new Error('Database not initialized');
    
    // If params are provided, use run() and then exec() to get results
    if (params.length > 0) {
      // For SELECT queries with parameters, we need to use db.exec with params
      // sql.js doesn't support params in exec(), so we need a workaround
      const stmt = this.db.prepare(sql);
      if (params.length > 0) {
        stmt.bind(params);
      }
      
      const results: any[] = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        results.push(row);
      }
      stmt.free();
      return results;
    }
    
    // No params, use regular exec
    const result = this.db.exec(sql);
    if (result.length === 0) return [];
    return result[0].values.map((row: any) => {
      const obj: any = {};
      result[0].columns.forEach((col: string, idx: number) => {
        obj[col] = row[idx];
      });
      return obj;
    });
  }

  run(sql: string, params: any[] = []): void {
    if (!this.db) throw new Error('Database not initialized');
    this.db.run(sql, params);
  }

  save(): void {
    if (!this.db) return;
    try {
      const data = this.db.export();
      const buffer = Array.from(data) as number[];
      const base64 = btoa(String.fromCharCode(...buffer));
      localStorage.setItem('sarmad_sqlite_db', base64);
    } catch (e) {
      console.error('Failed to save database:', e);
    }
  }

  close(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}

// ============ LocalStorage Fallback Implementation ============
class LocalStorageDB implements DBInterface {
  private data: Map<string, any[]> = new Map();
  private storageKey = 'sarmad_localstorage_db';

  async init(): Promise<void> {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.data = new Map(Object.entries(parsed));
      }
      console.log('✅ LocalStorage database initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize LocalStorage DB:', error);
      throw error;
    }
  }

  exec(sql: string, params: any[] = []): any[] {
    // Simple SQL parser for basic SELECT queries
    const match = sql.match(/SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?/i);
    if (!match) return [];

    const tableName = match[2];
    let tableData = this.data.get(tableName) || [];

    // Apply WHERE clause filtering if present
    if (match[3]) {
      const whereClause = match[3];
      
      // Handle simple equality checks like "username = ?"
      const equalityMatch = whereClause.match(/(\w+)\s*=\s*\?/);
      if (equalityMatch && params.length > 0) {
        const field = equalityMatch[1];
        const value = params[0];
        tableData = tableData.filter((row: any) => row[field] === value);
      }
      
      // Handle "is_active = 1"
      const activeMatch = whereClause.match(/is_active\s*=\s*1/);
      if (activeMatch) {
        tableData = tableData.filter((row: any) => row.is_active === 1 || row.is_active === '1');
      }
    }

    return tableData;
  }

  run(sql: string, params: any[] = []): void {
    // Handle CREATE TABLE
    const createMatch = sql.match(/CREATE\s+TABLE\s+(?:IF\s+NOT\s+EXISTS\s+)?(\w+)/i);
    if (createMatch) {
      const tableName = createMatch[1];
      if (!this.data.has(tableName)) {
        this.data.set(tableName, []);
      }
      return;
    }
    
    // Handle INSERT
    const insertMatch = sql.match(/INSERT\s+INTO\s+(\w+)\s*\(([^)]+)\)\s*VALUES\s*\(([^)]+)\)/i);
    if (insertMatch) {
      const tableName = insertMatch[1];
      const columns = insertMatch[2].split(',').map((c: string) => c.trim());
      const valuesStr = insertMatch[3];
      
      // Parse values - handle both ? placeholders and literal values
      let values: any[] = [];
      const valueParts = valuesStr.split(',').map((v: string) => v.trim());
      
      let paramIndex = 0;
      for (const part of valueParts) {
        if (part === '?') {
          values.push(params[paramIndex++]);
        } else if (part.startsWith("'") && part.endsWith("'")) {
          // String literal
          values.push(part.slice(1, -1));
        } else if (!isNaN(Number(part))) {
          // Number
          values.push(Number(part));
        } else if (part.toUpperCase() === 'CURRENT_TIMESTAMP') {
          values.push(new Date().toISOString());
        } else {
          values.push(part);
        }
      }
      
      // Create row object
      const row: any = { id: Date.now() }; // Auto-increment ID
      columns.forEach((col: string, idx: number) => {
        row[col] = values[idx];
      });
      
      // Add to table
      if (!this.data.has(tableName)) {
        this.data.set(tableName, []);
      }
      const tableData = this.data.get(tableName)!;
      tableData.push(row);
      
      console.log(`✅ Inserted into ${tableName}:`, row);
    }
    
    this.save();
  }

  save(): void {
    try {
      const obj = Object.fromEntries(this.data);
      localStorage.setItem(this.storageKey, JSON.stringify(obj));
    } catch (e) {
      console.error('Failed to save LocalStorage DB:', e);
    }
  }

  close(): void {
    this.data.clear();
  }
}

// ============ Database Factory ============
let dbInstance: DBInterface | null = null;
let dbType: 'sqlite' | 'localStorage' = 'sqlite';

export async function initDatabase(): Promise<void> {
  if (dbInstance) return;

  // Try SQLite first
  try {
    dbInstance = new SQLiteDatabase();
    await dbInstance.init();
    dbType = 'sqlite';
    console.log('🎯 Using SQLite database');
    
    // Seed initial data
    seedInitialData();
    return;
  } catch (error) {
    console.warn('⚠️ SQLite failed, falling back to LocalStorage');
  }

  // Fallback to LocalStorage
  try {
    dbInstance = new LocalStorageDB();
    await dbInstance.init();
    dbType = 'localStorage';
    console.log('🎯 Using LocalStorage database');
    
    // Seed initial data for localStorage
    seedInitialDataLocalStorage();
  } catch (error) {
    console.error('❌ Both database methods failed');
    throw error;
  }
}

// Seed initial data for SQLite
function seedInitialData(): void {
  if (!dbInstance) return;
  
  try {
    // Create tables
    dbInstance.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password_hash TEXT NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT,
        role TEXT NOT NULL DEFAULT 'user',
        is_active INTEGER DEFAULT 1,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        last_login TEXT
      )
    `);
    
    // Check if admin user exists
    const users = dbInstance.exec('SELECT COUNT(*) as count FROM users');
    const count = users[0]?.values?.[0]?.[0] || 0;
    
    if (Number(count) === 0) {
      console.log('📝 Seeding initial data...');
      
      // Insert admin user
      dbInstance.run(`
        INSERT INTO users (username, password_hash, full_name, email, role, is_active)
        VALUES ('admin', 'admin123', 'مدیر سیستم', 'admin@sarmad.ir', 'admin', 1)
      `);
      
      console.log('✅ Admin user created: admin / admin123');
      
      // Save to localStorage
      dbInstance.save();
    } else {
      console.log('✅ Database already has data');
    }
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

// Seed initial data for LocalStorage
function seedInitialDataLocalStorage(): void {
  if (!dbInstance) return;
  
  try {
    // Check if users table exists and has data
    const users = dbInstance.exec('SELECT * FROM users');
    
    if (!users || users.length === 0) {
      console.log('📝 Seeding initial data for LocalStorage...');
      
      // Insert admin user
      dbInstance.run(`
        INSERT INTO users (username, password_hash, full_name, email, role, is_active)
        VALUES ('admin', 'admin123', 'مدیر سیستم', 'admin@sarmad.ir', 'admin', 1)
      `);
      
      console.log('✅ Admin user created: admin / admin123');
      
      // Save to localStorage
      dbInstance.save();
    } else {
      console.log('✅ LocalStorage database already has data');
    }
  } catch (error) {
    console.error('❌ Error seeding LocalStorage data:', error);
  }
}

export function getDatabaseType(): string {
  return dbType;
}

export function execQuery(sql: string, params: any[] = []): any[] {
  if (!dbInstance) throw new Error('Database not initialized');
  return dbInstance.exec(sql, params);
}

export function runQuery(sql: string, params: any[] = []): void {
  if (!dbInstance) throw new Error('Database not initialized');
  dbInstance.run(sql, params);
  dbInstance.save();
}

export function saveDatabase(): void {
  if (!dbInstance) return;
  dbInstance.save();
}

export function closeDatabase(): void {
  if (!dbInstance) return;
  dbInstance.close();
  dbInstance = null;
}

export function getDatabase(): any {
  return dbInstance;
}

// Helper functions for backward compatibility
export function getNextNumber(sequenceName: string): string {
  // Simplified implementation - in real app, query from number_sequences table
  const sequences: Record<string, number> = {
    'sales': 2006,
    'purchase': 1006,
    'accounting': 1007
  };
  const current = sequences[sequenceName] || 1;
  sequences[sequenceName] = current + 1;
  const prefixes: Record<string, string> = {
    'sales': 'فروش',
    'purchase': 'خرید',
    'accounting': 'سند'
  };
  return `${prefixes[sequenceName]}-${String(current).padStart(4, '0')}`;
}

export function backupDatabase(): string {
  const savedDb = localStorage.getItem('sarmad_sqlite_db');
  return savedDb || '';
}

export function restoreDatabase(base64Data: string): boolean {
  try {
    localStorage.setItem('sarmad_sqlite_db', base64Data);
    return true;
  } catch (e) {
    console.error('Restore failed:', e);
    return false;
  }
}
