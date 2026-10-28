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
    <div style={{ padding: '24px', fontFamily: 'Vazirmatn, Tahoma, sans-serif' }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: '800', margin: 0, color: '#111827' }}>{title}</h1>
          <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>مدیریت و ویرایش اطلاعات</p>
        </div>
        {onAdd && (
          <button
            onClick={() => {
              console.log('Add button clicked');
              onAdd();
            }}
            style={{
              background: 'linear-gradient(135deg, #1e40af, #1e3a8a)',
              color: 'white',
              border: 'none',
              padding: '10px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(30, 64, 175, 0.2)',
              transition: 'all 0.2s'
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
            borderRadius: '8px',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
            outline: 'none',
            background: 'white',
            transition: 'all 0.2s',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = '#1e40af';
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(30, 64, 175, 0.1)';
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = '#e5e7eb';
            e.currentTarget.style.boxShadow = 'none';
          }}
        />
      </div>

      {/* Table */}
      <div style={{ background: 'white', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
              {columns.map(col => (
                <th key={col.key} style={{ padding: '14px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  {col.label}
                </th>
              ))}
              <th style={{ padding: '14px 16px', textAlign: 'right', fontSize: '12px', fontWeight: '600', color: '#374151', textTransform: 'uppercase', letterSpacing: '0.05em' }}>عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item, idx) => (
              <tr key={item.id || idx} style={{ borderBottom: '1px solid #f3f4f6', transition: 'background 0.2s' }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'white'}
              >
                {columns.map(col => (
                  <td key={col.key} style={{ padding: '14px 16px', fontSize: '14px', color: '#374151' }}>
                    {col.render ? col.render(item) : (item[col.key] || '-')}
                  </td>
                ))}
                <td style={{ padding: '14px 16px' }}>
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {onView && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('View clicked:', item);
                          onView(item);
                          showMessage('✓ رکورد با موفقیت مشاهده شد');
                        }}
                        style={{
                          background: '#eff6ff',
                          border: '1px solid #dbeafe',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: '#1e40af',
                          fontWeight: '500',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#dbeafe';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#eff6ff';
                        }}
                      >
                        👁️ مشاهده
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Edit clicked:', item);
                          onEdit(item);
                          showMessage('✓ حالت ویرایش فعال شد');
                        }}
                        style={{
                          background: '#fffbeb',
                          border: '1px solid #fde68a',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: '#b45309',
                          fontWeight: '500',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#fde68a';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fffbeb';
                        }}
                      >
                        ✏️ ویرایش
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          console.log('Delete clicked:', item);
                          if (confirm('آیا از حذف این رکورد مطمئن هستید؟')) {
                            onDelete(item);
                            showMessage('✓ رکورد با موفقیت حذف شد');
                          }
                        }}
                        style={{
                          background: '#fef2f2',
                          border: '1px solid #fecaca',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          color: '#be123c',
                          fontWeight: '500',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#fecaca';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#fef2f2';
                        }}
                      >
                        🗑️ حذف
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredData.length === 0 && (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: '#9ca3af' }}>
            {data.length === 0 ? (
              <div>
                <p style={{ fontSize: '16px', fontWeight: '500', marginBottom: '8px' }}>هنوز رکوردی ثبت نشده است</p>
                <p style={{ fontSize: '14px' }}>برای شروع، روی دکمه "افزودن" کلیک کنید</p>
              </div>
            ) : 'موردی یافت نشد'}
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
