import { useState, ReactNode } from 'react';
import { Save, X, Plus, Edit, Trash2, Eye, Search, Download, Printer, AlertCircle } from 'lucide-react';
import { exportToCSV } from '../utils/exportImport';

interface Column {
  key: string;
  label: string;
  type?: 'text' | 'number' | 'select' | 'textarea' | 'date';
  options?: { value: string; label: string }[];
  editable?: boolean;
  render?: (item: any) => ReactNode;
}

interface DataTableProps {
  title: string;
  subtitle?: string;
  columns: Column[];
  initialData?: any[];
  searchFields?: string[];
  addButtonLabel?: string;
  addColor?: string;
}

export default function DataTable({
  title,
  subtitle,
  columns,
  initialData = [],
  searchFields = [],
  addButtonLabel = 'افزودن',
  addColor = 'from-blue-500 to-indigo-600'
}: DataTableProps) {
  const [data, setData] = useState<any[]>(initialData);
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [viewItem, setViewItem] = useState<any>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Filter data based on search
  const filteredData = data.filter((item) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return searchFields.some((field) =>
      String(item[field] || '').toLowerCase().includes(query)
    ) || Object.values(item).some((val) =>
      String(val || '').toLowerCase().includes(query)
    );
  });

  // Open add form
  const handleAdd = () => {
    setEditingItem(null);
    const initial: any = {};
    columns.forEach((col) => {
      if (col.editable !== false) {
        initial[col.key] = col.type === 'number' ? 0 : '';
      }
    });
    setFormData(initial);
    setShowForm(true);
  };

  // Open edit form
  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ ...item });
    setShowForm(true);
  };

  // Save form data
  const handleSave = () => {
    if (editingItem) {
      // Update existing
      setData(data.map((item) =>
        item.id === editingItem.id ? { ...formData, id: editingItem.id } : item
      ));
      showSuccess('رکورد با موفقیت ویرایش شد');
    } else {
      // Add new
      const newItem = { ...formData, id: Date.now() };
      setData([...data, newItem]);
      showSuccess('رکورد جدید با موفقیت اضافه شد');
    }
    setShowForm(false);
    setEditingItem(null);
    setFormData({});
  };

  // Delete item
  const handleDelete = (item: any) => {
    setDeleteConfirm(item);
  };

  const confirmDelete = () => {
    setData(data.filter((item) => item.id !== deleteConfirm.id));
    setDeleteConfirm(null);
    showSuccess('رکورد با موفقیت حذف شد');
  };

  // View item
  const handleView = (item: any) => {
    setViewItem(item);
  };

  // Export to Excel
  const handleExport = () => {
    const exportData = filteredData.map((item) => {
      const row: any = {};
      columns.forEach((col) => {
        row[col.label] = item[col.key] ?? '';
      });
      return row;
    });
    exportToCSV(exportData, title.replace(/\s+/g, '_'));
    showSuccess('فایل Excel با موفقیت دانلود شد');
  };

  // Show success message
  const showSuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  // Update form field
  const updateField = (key: string, value: any) => {
    setFormData({ ...formData, [key]: value });
  };

  return (
    <div className="space-y-6">
      {/* Success Message */}
      {successMessage && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg animate-fade-in flex items-center gap-2">
          <span className="text-sm font-medium">{successMessage}</span>
          <button onClick={() => setSuccessMessage('')} className="text-white/80 hover:text-white">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-800">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        <button
          onClick={handleAdd}
          className={`flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r ${addColor} text-white text-sm rounded-2xl hover:shadow-lg transition-all active:scale-95`}
        >
          <Plus size={16} />
          {addButtonLabel}
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50 focus-within:border-blue-300 focus-within:bg-white transition-all">
            <Search size={15} className="text-gray-400" />
            <input
              type="text"
              placeholder="جست‌وجو..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent text-xs outline-none w-full placeholder:text-gray-400"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-50 border border-green-200/50 text-xs text-green-600 hover:bg-green-100 transition-colors"
          >
            <Download size={14} />
            <span className="hidden md:inline">Excel</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50 text-xs text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <Printer size={14} />
            <span className="hidden md:inline">چاپ</span>
          </button>
          <span className="text-[10px] text-gray-400 mr-auto">
            {filteredData.length} مورد {data.length !== filteredData.length && `از ${data.length}`}
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                {columns.map((col) => (
                  <th key={col.key} className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">
                    {col.label}
                  </th>
                ))}
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  {columns.map((col) => (
                    <td key={col.key} className="py-3 px-5 text-xs text-gray-700">
                      {col.render ? col.render(item) : (item[col.key] ?? '-')}
                    </td>
                  ))}
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleView(item)}
                        className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                        title="مشاهده"
                      >
                        <Eye size={13} />
                      </button>
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"
                        title="ویرایش"
                      >
                        <Edit size={13} />
                      </button>
                      <button
                        onClick={() => handleDelete(item)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                        title="حذف"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400 mb-3">
              {data.length === 0 ? 'هنوز رکوردی ثبت نشده است' : 'موردی یافت نشد'}
            </p>
            {data.length === 0 && (
              <button
                onClick={handleAdd}
                className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${addColor} text-white text-xs rounded-xl mx-auto`}
              >
                <Plus size={14} />
                اولین رکورد را اضافه کنید
              </button>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-gray-800">
                {editingItem ? 'ویرایش رکورد' : 'افزودن رکورد جدید'}
              </h3>
              <button
                onClick={() => { setShowForm(false); setEditingItem(null); }}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {columns.filter((c) => c.editable !== false).map((col) => (
                <div key={col.key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">
                    {col.label}
                  </label>
                  {col.type === 'select' ? (
                    <select
                      value={formData[col.key] || ''}
                      onChange={(e) => updateField(col.key, e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-colors"
                    >
                      <option value="">انتخاب کنید...</option>
                      {col.options?.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  ) : col.type === 'textarea' ? (
                    <textarea
                      value={formData[col.key] || ''}
                      onChange={(e) => updateField(col.key, e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-colors resize-none h-20"
                    />
                  ) : (
                    <input
                      type={col.type === 'number' ? 'number' : col.type === 'date' ? 'text' : 'text'}
                      value={formData[col.key] ?? ''}
                      onChange={(e) => updateField(col.key, col.type === 'number' ? Number(e.target.value) : e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 transition-colors"
                      placeholder={`وارد کنید...`}
                    />
                  )}
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-2 p-5 border-t border-gray-100 bg-gray-50/50 sticky bottom-0">
              <button
                onClick={() => { setShowForm(false); setEditingItem(null); }}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-100 transition-colors"
              >
                انصراف
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                <Save size={14} />
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}

      {/* View Modal */}
      {viewItem && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-800">جزئیات رکورد</h3>
              <button
                onClick={() => setViewItem(null)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="p-5 space-y-3">
              {columns.map((col) => (
                <div key={col.key} className="flex items-start gap-3 p-3 rounded-xl bg-gray-50">
                  <span className="text-xs font-medium text-gray-500 min-w-[100px]">{col.label}:</span>
                  <span className="text-sm text-gray-800 flex-1">
                    {viewItem[col.key] ?? '-'}
                  </span>
                </div>
              ))}
            </div>
            <div className="p-5 border-t border-gray-100 flex justify-end gap-2">
              <button
                onClick={() => { setViewItem(null); handleEdit(viewItem); }}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-50 text-amber-600 text-xs hover:bg-amber-100"
              >
                <Edit size={14} /> ویرایش
              </button>
              <button
                onClick={() => setViewItem(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-600 hover:bg-gray-100"
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <Trash2 size={20} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-800">حذف رکورد</h3>
                <p className="text-xs text-gray-500">این عملیات قابل بازگشت نیست</p>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-6">
              آیا از حذف این رکورد مطمئن هستید؟
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-100"
              >
                انصراف
              </button>
              <button
                onClick={confirmDelete}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-bold"
              >
                <Trash2 size={14} />
                حذف
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
