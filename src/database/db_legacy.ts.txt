// Database abstraction layer - LocalStorage only
// Simple and reliable database using localStorage

interface DBInterface {
  init(): Promise<void>;
  exec(sql: string, params?: any[]): any[];
  run(sql: string, params?: any[]): void;
  save(): void;
  close(): void;
}

// ============ LocalStorage Database Implementation ============
class LocalStorageDB implements DBInterface {
  private data: Map<string, any[]> = new Map();
  private storageKey = 'sarmad_db';

  async init(): Promise<void> {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (saved) {
        const parsed = JSON.parse(saved);
        this.data = new Map(Object.entries(parsed));
      }
      console.log('✅ LocalStorage database initialized');
    } catch (error) {
      console.error('❌ Failed to initialize DB:', error);
      throw error;
    }
  }

  exec(sql: string, params: any[] = []): any[] {
    // Simple SQL parser for SELECT queries
    const match = sql.match(/SELECT\s+(.+?)\s+FROM\s+(\w+)(?:\s+WHERE\s+(.+))?/i);
    if (!match) return [];

    const tableName = match[2];
    let tableData = this.data.get(tableName) || [];

    // Apply WHERE clause filtering
    if (match[3]) {
      const whereClause = match[3];
      
      // Handle "username = ?"
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
      
      let values: any[] = [];
      const valueParts = valuesStr.split(',').map((v: string) => v.trim());
      
      let paramIndex = 0;
      for (const part of valueParts) {
        if (part === '?') {
          values.push(params[paramIndex++]);
        } else if (part.startsWith("'") && part.endsWith("'")) {
          values.push(part.slice(1, -1));
        } else if (!isNaN(Number(part))) {
          values.push(Number(part));
        } else if (part.toUpperCase() === 'CURRENT_TIMESTAMP') {
          values.push(new Date().toISOString());
        } else {
          values.push(part);
        }
      }
      
      const row: any = { id: Date.now() };
      columns.forEach((col: string, idx: number) => {
        row[col] = values[idx];
      });
      
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
      console.error('Failed to save DB:', e);
    }
  }

  close(): void {
    this.data.clear();
  }
}

// ============ Database Factory ============
let dbInstance: DBInterface | null = null;

export async function initDatabase(): Promise<void> {
  if (dbInstance) return;

  try {
    dbInstance = new LocalStorageDB();
    await dbInstance.init();
    console.log('🎯 Using LocalStorage database');
    
    // Seed initial data
    seedInitialData();
  } catch (error) {
    console.error('❌ Database initialization failed');
    throw error;
  }
}

// Seed initial data
function seedInitialData(): void {
  if (!dbInstance) return;
  
  try {
    // Create users table
    dbInstance.run(`CREATE TABLE IF NOT EXISTS users (
      id INTEGER, username TEXT, password_hash TEXT, 
      full_name TEXT, email TEXT, role TEXT, is_active INTEGER
    )`);
    
    // Check if admin exists
    const users = dbInstance.exec('SELECT * FROM users');
    
    if (!users || users.length === 0) {
      console.log('📝 Seeding initial data...');
      
      // Insert admin user
      dbInstance.run(`
        INSERT INTO users (username, password_hash, full_name, email, role, is_active)
        VALUES ('admin', 'admin123', 'مدیر سیستم', 'admin@sarmad.ir', 'admin', 1)
      `);
      
      console.log('✅ Admin user created: admin / admin123');
      dbInstance.save();
    } else {
      console.log('✅ Database already has data');
    }
  } catch (error) {
    console.error('❌ Error seeding data:', error);
  }
}

export function getDatabaseType(): string {
  return 'localStorage';
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

// Helper functions
export function getNextNumber(sequenceName: string): string {
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
  return localStorage.getItem('sarmad_db') || '';
}

export function restoreDatabase(base64Data: string): boolean {
  try {
    localStorage.setItem('sarmad_db', base64Data);
    return true;
  } catch (e) {
    console.error('Restore failed:', e);
    return false;
  }
}
