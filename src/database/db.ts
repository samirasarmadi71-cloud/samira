// Database abstraction layer with SQLite and localStorage fallback
// این لایه از sql.js برای SQLite استفاده می‌کند و در صورت عدم دسترسی، از localStorage استفاده می‌کند

interface DBInterface {
  init(): Promise<void>;
  exec(sql: string): any[];
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

  exec(sql: string): any[] {
    if (!this.db) throw new Error('Database not initialized');
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

  exec(sql: string): any[] {
    // Simple SQL parser for basic SELECT queries
    const match = sql.match(/SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?/i);
    if (!match) return [];

    const tableName = match[2];
    const tableData = this.data.get(tableName) || [];

    // Return all data for now (simplified)
    return tableData;
  }

  run(sql: string, params: any[] = []): void {
    // Simple SQL parser for basic INSERT/UPDATE/DELETE
    const insertMatch = sql.match(/INSERT\s+INTO\s+(\w+)/i);
    if (insertMatch) {
      const tableName = insertMatch[1];
      if (!this.data.has(tableName)) {
        this.data.set(tableName, []);
      }
      // Simplified insert - in real implementation, parse values
      console.log('Insert into', tableName, params);
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
  } catch (error) {
    console.error('❌ Both database methods failed');
    throw error;
  }
}

export function getDatabaseType(): string {
  return dbType;
}

export function execQuery(sql: string): any[] {
  if (!dbInstance) throw new Error('Database not initialized');
  return dbInstance.exec(sql);
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
