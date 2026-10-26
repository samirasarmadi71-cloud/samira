import { useState } from 'react';

interface Column {
  key: string;
  label: string;
  render?: (item: any) => any;
}

interface SimpleTableProps {
  title: string;
  columns: Column[];
  data: any[];
  onAdd?: () => void;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onView?: (item: any) => void;
}

export default function SimpleTable({ title, columns, data, onAdd, onEdit, onDelete, onView }: SimpleTableProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  const filteredData = data.filter(item => {
    if (!searchQuery) return true;
    return Object.values(item).some(val =>
      String(val).toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Vazirmatn, sans-serif' }}>
      {/* Success Message */}
      {message && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: '#10b981',
          color: 'white',
          padding: '12px 24px',
          borderRadius: '12px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          zIndex: 9999,
          fontSize: '14px'
        }}>
          {message}
        </div>
      )}

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>{title}</h1>
        {onAdd && (
          <button
            onClick={() => {
              console.log('Add button clicked');
              onAdd();
            }}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #6366f1)',
              color: 'white',
              border: 'none',
              padding: '10px 20px',
              borderRadius: '12px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
            }}
          >
            + افزودن
          </button>
        )}
      </div>

      {/* Search */}
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="جست‌وجو..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 16px',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            outline: 'none'
          }}
        />
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
              {columns.map(col => (
                <th key={col.key} style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold', color: '#6b7280' }}>
                  {col.label}
                </th>
              ))}
              <th style={{ padding: '12px 16px', textAlign: 'right', fontSize: '12px', fontWeight: 'bold', color: '#6b7280' }}>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={item.id || idx} style={{ borderBottom: '1px solid #f3f4f6' }}>
                {columns.map(col => (
                  <td key={col.key} style={{ padding: '12px 16px', fontSize: '14px' }}>
                    {col.render ? col.render(item) : (item[col.key] || '-')}
                  </td>
                ))}
                <td style={{ padding: '12px 16px' }}>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {onView && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('View clicked:', item);
                          onView(item);
                          showMessage('مشاهده رکورد');
                        }}
                        style={{
                          background: '#eff6ff',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: '#3b82f6'
                        }}
                      >
                        👁️
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Edit clicked:', item);
                          onEdit(item);
                          showMessage('ویرایش رکورد');
                        }}
                        style={{
                          background: '#fef3c7',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: '#f59e0b'
                        }}
                      >
                        ✏️
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Delete clicked:', item);
                          if (confirm('آیا از حذف مطمئن هستید؟')) {
                            onDelete(item);
                            showMessage('رکورد حذف شد');
                          }
                        }}
                        style={{
                          background: '#fee2e2',
                          border: 'none',
                          padding: '6px 10px',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: '#ef4444'
                        }}
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div style={{ padding: '40px', textAlign: 'center', color: '#9ca3af' }}>
            {data.length === 0 ? 'هنوز رکوردی ثبت نشده' : 'موردی یافت نشد'}
          </div>
        )}
      </div>

      {/* Info */}
      <div style={{ marginTop: '16px', fontSize: '12px', color: '#9ca3af' }}>
        {filteredData.length} مورد {data.length !== filteredData.length && `از ${data.length}`}
      </div>
    </div>
  );
}
