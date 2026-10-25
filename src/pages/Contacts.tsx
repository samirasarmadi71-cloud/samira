import { useState, useEffect } from 'react';
import { Users, UserPlus, Phone, Mail, MapPin, Eye, Edit, Trash2, Building, Save, X, AlertCircle } from 'lucide-react';
import { execQuery, runQuery, saveDatabase, getDatabase } from '../database/db';
import PageToolbar from '../components/PageToolbar';
import { exportToCSV, importCSV } from '../utils/exportImport';
import { useSearchFilter } from '../hooks/useSearchFilter';

interface Contact {
  id: number;
  code: string;
  name: string;
  type: string;
  phone: string;
  city: string;
  status: string;
  credit_limit: number;
  opening_balance: number;
  email?: string;
  address?: string;
}

export default function Contacts() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    name: '',
    type: 'customer',
    phone: '',
    city: '',
    email: '',
    address: '',
    credit_limit: 0,
    opening_balance: 0
  });
  const [error, setError] = useState('');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = () => {
    try {
      const data = execQuery(`SELECT * FROM contacts ORDER BY name`);
      setContacts(data);
    } catch (e) {
      console.error('Error loading contacts:', e);
    }
  };

  const { searchQuery, setSearchQuery, filters, handleFilterChange, clearFilters, filteredData, resultCount, totalCount } = useSearchFilter({
    data: contacts,
    searchFields: ['name', 'code', 'phone', 'city']
  });

  const handleAdd = () => {
    setEditingContact(null);
    setFormData({
      code: `SH-${String(contacts.length + 1).padStart(3, '0')}`,
      name: '',
      type: 'customer',
      phone: '',
      city: '',
      email: '',
      address: '',
      credit_limit: 0,
      opening_balance: 0
    });
    setShowForm(true);
    setError('');
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setFormData({
      code: contact.code,
      name: contact.name,
      type: contact.type,
      phone: contact.phone || '',
      city: contact.city || '',
      email: contact.email || '',
      address: contact.address || '',
      credit_limit: contact.credit_limit || 0,
      opening_balance: contact.opening_balance || 0
    });
    setShowForm(true);
    setError('');
  };

  const handleSave = () => {
    if (!formData.code || !formData.name) {
      setError('کد و نام شخص الزامی است');
      return;
    }

    try {
      const db = getDatabase();
      if (!db) throw new Error('Database not available');

      if (editingContact) {
        db.run(`
          UPDATE contacts 
          SET code = ?, name = ?, type = ?, phone = ?, city = ?, email = ?, address = ?, credit_limit = ?, opening_balance = ?
          WHERE id = ?
        `, [
          formData.code, formData.name, formData.type, formData.phone, formData.city,
          formData.email, formData.address, formData.credit_limit, formData.opening_balance,
          editingContact.id
        ]);
      } else {
        db.run(`
          INSERT INTO contacts (code, name, type, phone, city, email, address, credit_limit, opening_balance, status)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'active')
        `, [
          formData.code, formData.name, formData.type, formData.phone, formData.city,
          formData.email, formData.address, formData.credit_limit, formData.opening_balance
        ]);
      }

      saveDatabase();
      loadContacts();
      setShowForm(false);
    } catch (e) {
      console.error('Error saving contact:', e);
      setError('خطا در ذخیره');
    }
  };

  const handleDelete = (contact: Contact) => {
    if (!confirm(`آیا از حذف "${contact.name}" مطمئن هستید؟`)) return;

    try {
      const db = getDatabase();
      if (!db) return;

      const sales = db.exec(`SELECT COUNT(*) FROM sales_documents WHERE contact_id = ?`, [contact.id]);
      const purchases = db.exec(`SELECT COUNT(*) FROM purchase_documents WHERE contact_id = ?`, [contact.id]);
      
      if (Number(sales[0]?.values[0]?.[0] || 0) > 0 || Number(purchases[0]?.values[0]?.[0] || 0) > 0) {
        alert('این شخص دارای تراکنش مالی است و قابل حذف نیست');
        return;
      }

      db.run(`DELETE FROM contacts WHERE id = ?`, [contact.id]);
      saveDatabase();
      loadContacts();
    } catch (e) {
      alert('خطا در حذف');
    }
  };

  const handleExport = () => {
    exportToCSV(
      filteredData.map(c => ({
        'کد': c.code,
        'نام': c.name,
        'نوع': c.type === 'customer' ? 'مشتری' : c.type === 'supplier' ? 'تأمین‌کننده' : 'هر دو',
        'تلفن': c.phone,
        'شهر': c.city,
        'سقف اعتبار': c.credit_limit,
        'مانده افتتاحیه': c.opening_balance,
        'وضعیت': c.status === 'active' ? 'فعال' : 'غیرفعال'
      })),
      'contacts'
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
            INSERT INTO contacts (code, name, type, phone, city, status)
            VALUES (?, ?, ?, ?, ?, 'active')
          `, [
            row['کد'] || `SH-${Date.now()}`,
            row['نام'],
            row['نوع'] === 'مشتری' ? 'customer' : row['نوع'] === 'تأمین‌کننده' ? 'supplier' : 'both',
            row['تلفن'] || '',
            row['شهر'] || ''
          ]);
          imported++;
        } catch (e) {
          console.error('Error importing row:', row, e);
        }
      }

      saveDatabase();
      loadContacts();
      alert(`${imported} مورد با موفقیت وارد شد`);
    } catch (e) {
      alert('خطا در وارد کردن فایل');
    }
  };

  const stats = {
    total: contacts.length,
    customers: contacts.filter(c => c.type === 'customer' || c.type === 'both').length,
    suppliers: contacts.filter(c => c.type === 'supplier' || c.type === 'both').length,
    active: contacts.filter(c => c.status === 'active').length
  };

  return (
    <div className="space-y-6">
      <PageToolbar
        title="معرفی اشخاص"
        subtitle="مدیریت مشتریان، تأمین‌کنندگان و طرف‌حساب‌ها"
        searchPlaceholder="جست‌وجوی نام، کد، تلفن یا شهر..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        filters={[
          {
            key: 'type',
            label: 'نوع شخص',
            options: [
              { value: 'customer', label: 'مشتری' },
              { value: 'supplier', label: 'تأمین‌کننده' },
              { value: 'both', label: 'هر دو' }
            ]
          },
          {
            key: 'status',
            label: 'وضعیت',
            options: [
              { value: 'active', label: 'فعال' },
              { value: 'inactive', label: 'غیرفعال' }
            ]
          }
        ]}
        activeFilters={filters}
        onFilterChange={handleFilterChange}
        onClearFilters={clearFilters}
        onAdd={handleAdd}
        addLabel="شخص جدید"
        addColor="from-violet-500 to-purple-600"
        onPrint={() => window.print()}
        onExportExcel={handleExport}
        onImportExcel={handleImport}
        resultCount={resultCount}
        totalCount={totalCount}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">کل اشخاص</p>
              <p className="text-lg font-black text-gray-800">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Users size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">مشتریان</p>
              <p className="text-lg font-black text-gray-800">{stats.customers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Building size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">تأمین‌کنندگان</p>
              <p className="text-lg font-black text-gray-800">{stats.suppliers}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <Users size={18} className="text-violet-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">فعال</p>
              <p className="text-lg font-black text-gray-800">{stats.active}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">کد</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">نام</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">نوع</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">تلفن</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">شهر</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">سقف اعتبار</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">وضعیت</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((contact) => (
                <tr key={contact.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-5 text-xs font-mono font-bold text-gray-600">{contact.code}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                        {contact.name.charAt(0)}
                      </div>
                      <span className="text-xs font-medium text-gray-800">{contact.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      contact.type === 'customer' ? 'bg-blue-50 text-blue-600' :
                      contact.type === 'supplier' ? 'bg-amber-50 text-amber-600' :
                      'bg-purple-50 text-purple-600'
                    }`}>
                      {contact.type === 'customer' ? 'مشتری' : contact.type === 'supplier' ? 'تأمین‌کننده' : 'هر دو'}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-xs text-gray-600">{contact.phone}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{contact.city}</td>
                  <td className="py-3.5 px-5 text-xs font-bold text-gray-700">{contact.credit_limit?.toLocaleString()}</td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      contact.status === 'active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>{contact.status === 'active' ? 'فعال' : 'غیرفعال'}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1">
                      <button onClick={() => handleEdit(contact)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Edit size={13} /></button>
                      <button onClick={() => handleDelete(contact)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">شخصی یافت نشد</p>
          </div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-gray-800">
                {editingContact ? 'ویرایش شخص' : 'شخص جدید'}
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
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">کد *</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">نوع *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  >
                    <option value="customer">مشتری</option>
                    <option value="supplier">تأمین‌کننده</option>
                    <option value="both">هر دو</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">نام *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">تلفن</label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">شهر</label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">ایمیل</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">سقف اعتبار (ریال)</label>
                  <input
                    type="number"
                    value={formData.credit_limit}
                    onChange={(e) => setFormData({ ...formData, credit_limit: Number(e.target.value) })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">نشانی</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 resize-none h-20"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-5 border-t border-gray-100 bg-gray-50/50 sticky bottom-0">
              <button onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-100">
                انصراف
              </button>
              <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all">
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
