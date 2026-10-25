// Export data to CSV (compatible with Excel)
export function exportToCSV(data: any[], filename: string, headers?: Record<string, string>) {
  if (data.length === 0) {
    alert('داده‌ای برای خروجی وجود ندارد');
    return;
  }

  // Use provided headers or get keys from first object
  const keys = headers ? Object.keys(headers) : Object.keys(data[0]);
  const displayHeaders = headers 
    ? Object.values(headers) 
    : keys.map(k => k);

  // Build CSV content with BOM for UTF-8 support in Excel
  const BOM = '\uFEFF';
  const csvContent = BOM + [
    displayHeaders.join(','),
    ...data.map(row => 
      keys.map(key => {
        const value = row[key];
        // Escape quotes and wrap in quotes if contains comma
        const strValue = String(value ?? '');
        if (strValue.includes(',') || strValue.includes('"') || strValue.includes('\n')) {
          return `"${strValue.replace(/"/g, '""')}"`;
        }
        return strValue;
      }).join(',')
    )
  ].join('\n');

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Import CSV file and parse
export function importCSV(file: File): Promise<{ headers: string[]; rows: any[] }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        // Remove BOM if present
        const cleanText = text.replace(/^\uFEFF/, '');
        const lines = cleanText.split('\n').filter(line => line.trim());
        
        if (lines.length < 2) {
          reject(new Error('فایل خالی یا نامعتبر است'));
          return;
        }

        const headers = parseCSVLine(lines[0]);
        const rows = lines.slice(1).map(line => {
          const values = parseCSVLine(line);
          const row: any = {};
          headers.forEach((header, idx) => {
            row[header] = values[idx] || '';
          });
          return row;
        });

        resolve({ headers, rows });
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = () => reject(new Error('خطا در خواندن فایل'));
    reader.readAsText(file, 'UTF-8');
  });
}

function parseCSVLine(line: string): string[] {
  const result: string[] = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

// Print current page
export function printPage() {
  window.print();
}

// Format number with Persian digits
export function formatNumber(num: number): string {
  return num.toLocaleString('fa-IR');
}

// Format currency
export function formatCurrency(amount: number, currency: string = 'ریال'): string {
  return `${amount.toLocaleString('fa-IR')} ${currency}`;
}
