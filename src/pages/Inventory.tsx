import { useState, useEffect } from 'react';
import { Package, Plus, ArrowRightLeft, ClipboardList, AlertTriangle, BarChart3, FileText, Edit, Eye, Save, X, AlertCircle } from 'lucide-react';
import { execQuery, runQuery, saveDatabase, getDatabase } from '../database/db';
import PageToolbar from '../components/PageToolbar';
import { exportToCSV, importCSV } from '../utils/exportImport';
import { useSearchFilter } from '../hooks/useSearchFilter';

interface InventoryItem {
  id: number;
  code: string;
  name: string;
  group_id: number;
  unit_id: number;
  buy_price: number;
  sell_price: number;
  min_stock: number;
  is_active: number;
  group_name?: string;
  unit_name?: string;
  warehouse?: string;
  stock?: number;
}

export default function Inventory() {
  const [items, setItems] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    group_id: '',
    unit_id: '',
    buy_price: 0,
    sell_price: 0,
    min_stock: 0
  });
  const [groups, setGroups] = useState<any[]>([]);
  const [units, setUnits] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    try {
      const itemsData = execQuery(`
        SELECT i.*, ig.name as group_name, u.name as unit_name
        FROM items i
        LEFT JOIN item_groups ig ON i.group_id = ig.id
        LEFT JOIN units u ON i.unit_id = u.id
        ORDER BY i.name
      `);
      setItems(itemsData);

      const groupsData = execQuery(`SELECT * FROM item_groups ORDER BY name`);
      setGroups(groupsData);

      const unitsData = execQuery(`SELECT * FROM units ORDER BY name`);
      setUnits(unitsData);
    } catch (e) {
      console.error('Error loading data:', e);
    }
  };

  const { searchQuery, setSearchQuery, filters, handleFilterChange, clearFilters, filteredData, resultCount, totalCount } = useSearchFilter({
    data: items,
    searchFields: ['code', 'name']
  });

  const handleAdd = () => {
    setEditingItem(null);
    setFormData({
      code: `K-${String(items.length + 1).padStart(3, '0')}`,
      name: '',
      group_id: '',
      unit_id: '',
      buy_price: 0,
      sell_price: 0,
      min_stock: 0
    });
    setShowForm(true);
    setError('');
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({
      code: item.code,
      name: item.name,
      group_id: String(item.group_id || ''),
      unit_id: String(item.unit_id || ''),
      buy_price: item.buy_price || 0,
      sell_price: item.sell_price || 0,
      min_stock: item.min_stock || 0
    });
    setShowForm(true);
    setError('');
  };

  const handleSave = () => {
    if (!formData.code || !formData.name) {
      setError('کد و نام کالا الزامی است');
      return;
    }

    try {
      const db = getDatabase();
      if (!db) throw new Error('Database not available');

      if (editingItem) {
        db.run(`
          UPDATE items 
          SET code = ?, name = ?, group_id = ?, unit_id = ?, buy_price = ?, sell_price = ?, min_stock = ?
          WHERE id = ?
        `, [
          formData.code, formData.name, formData.group_id || null, formData.unit_id || null,
          formData.buy_price, formData.sell_price, formData.min_stock, editingItem.id
        ]);
      } else {
        db.run(`
          INSERT INTO items (code, name, group_id, unit_id, buy_price, sell_price, min_stock, is_active)
          VALUES (?, ?, ?, ?, ?, ?, ?, 1)
        `, [
          formData.code, formData.name, formData.group_id || null, formData.unit_id || null,
          formData.buy_price, formData.sell_price, formData.min_stock
        ]);
      }

      saveDatabase();
      loadData();
      setShowForm(false);
    } catch (e) {
      console.error('Error saving item:', e);
      setError('خطا در ذخیره');
    }
  };

  const handleExport = () => {
    exportToCSV(
      filteredData.map(i => ({
        'کد': i.code,
        'نام': i.name,
        'گروه': i.group_name || '-',
        'واحد': i.unit_name || '-',
        'قیمت خرید': i.buy_price,
        'قیمت فروش': i.sell_price,
        'حداقل موجودی': i.min_stock,
        'وضعیت': i.is_active ? 'فعال' : 'غیرفعال'
      })),
      'inventory'
    );
  };

  const handleImport = async (file: File) => {
    try {
      const { rows } = await importCSV(file);
      const db = getDatabase();
      if (!db) return;

      let imported = 0;
      for (const row of rows) {
        try {
          db.run(`
            INSERT INTO items (code, name, buy_price, sell_price, min_stock, is_active)
            VALUES (?, ?, ?, ?, ?, 1)
          `, [
            row['کد'] || `K-${Date.now()}`,
            row['نام'],
            Number(row['قیمت خرید']) || 0,
            Number(row['قیمت فروش']) || 0,
            Number(row['حداقل موجودی']) || 0
          ]);
          imported++;
        } catch (e) {
          console.error('Error importing row:', e);
        }
      }

      saveDatabase();
      loadData();
      alert(`${imported} مورد با موفقیت وارد شد`);
    } catch (e) {
      alert('خطا در وارد کردن فایل');
    }
  };

  const stats = {
    total: items.length,
    lowStock: items.filter(i => (i.stock || 0) < i.min_stock).length,
    active: items.filter(i => i.is_active).length
  };

  return (
    <div className="space-y-6">
      <PageToolbar
        title="انبار و کالا"
        subtitle="مدیریت موجودی، کالاها و عملیات انبار"
        searchPlaceholder="جست‌وجوی کد یا نام کالا..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={[
          {
            key: 'group_id',
            label: 'گروه کالا',
            options: groups.map(g => ({ value: String(g.id), label: g.name }))
          },
          {
            key: 'is_active',
            label: 'وضعیت',
            options: [
              { value: '1', label: 'فعال' },
              { value: '0', label: 'غیرفعال' }
            ]
          }
        ]}
        activeFilters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        onAdd={handleAdd}
        addLabel="کالای جدید"
        addColor="from-cyan-500 to-teal-600"
        onPrint={() => window.print()}
        onExportExcel={handleExport}
        onImportExcel={handleImport}
        resultCount={resultCount}
        totalCount={totalCount}
      />

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
              <Package size={18} className="text-cyan-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">کل کالاها</p>
              <p className="text-lg font-black text-gray-800">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle size={18} className="text-red-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">کم‌موجود</p>
              <p className="text-lg font-black text-gray-800">{stats.lowStock}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <BarChart3 size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">ارزش موجودی</p>
              <p className="text-lg font-black text-gray-800">۸.۵ <span className="text-[10px] text-gray-400">میلیارد</span></p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Package size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">فعال</p>
              <p className="text-lg font-black text-gray-800">{stats.active}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">کد</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">نام کالا</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">گروه</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">واحد</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">قیمت خرید</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">قیمت فروش</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">حداقل</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">وضعیت</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-5 text-xs font-mono font-bold text-gray-600">{item.code}</td>
                  <td className="py-3.5 px-5 text-xs font-medium text-gray-800">{item.name}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{item.group_name || '-'}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{item.unit_name || '-'}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-700">{item.buy_price?.toLocaleString()}</td>
                  <td className="py-3.5 px-5 text-xs font-bold text-gray-700">{item.sell_price?.toLocaleString()}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{item.min_stock}</td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      item.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>{item.is_active ? 'فعال' : 'غیرفعال'}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Edit size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><FileText size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">کالایی یافت نشد</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-gray-800">
                {editingItem ? 'ویرایش کالا' : 'کالای جدید'}
              </h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <X size={16} className="text-gray-500" />
              </button>
            </div>

            <div className="p-5 space-y-4">
              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200">
                  <AlertCircle size={16} className="text-red-500" />
                  <span className="text-xs text-red-600">{error}</span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">کد کالا *</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">نام کالا *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">گروه کالا</label>
                  <select
                    value={formData.group_id}
                    onChange={(e) => setFormData({ ...formData, group_id: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  >
                    <option value="">انتخاب گروه...</option>
                    {groups.map(g => (
                      <option key={g.id} value={g.id}>{g.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">واحد</label>
                  <select
                    value={formData.unit_id}
                    onChange={(e) => setFormData({ ...formData, unit_id: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  >
                    <option value="">انتخاب واحد...</option>
                    {units.map(u => (
                      <option key={u.id} value={u.id}>{u.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">قیمت خرید</label>
                  <input
                    type="number"
                    value={formData.buy_price}
                    onChange={(e) => setFormData({ ...formData, buy_price: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">قیمت فروش</label>
                  <input
                    type="number"
                    value={formData.sell_price}
                    onChange={(e) => setFormData({ ...formData, sell_price: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">حداقل موجودی</label>
                  <input
                    type="number"
                    value={formData.min_stock}
                    onChange={(e) => setFormData({ ...formData, min_stock: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-5 border-t border-gray-100 bg-gray-50/50 sticky bottom-0">
              <button onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-100">
                انصراف
              </button>
              <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-teal-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all">
                <Save size={14} />
                ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
