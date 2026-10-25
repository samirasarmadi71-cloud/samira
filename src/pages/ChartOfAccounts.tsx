import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, Filter, Save, X, ChevronDown, ChevronLeft, AlertCircle } from 'lucide-react';
import { execQuery, runQuery, saveDatabase, getDatabase } from '../database/db';
import PageToolbar from '../components/PageToolbar';
import { exportToCSV } from '../utils/exportImport';
import { useSearchFilter } from '../hooks/useSearchFilter';

interface Account {
  id: number;
  code: string;
  title: string;
  type: string;
  parent_id: number | null;
  nature: string | null;
  is_active: number;
  parent_title?: string;
}

export default function ChartOfAccounts() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAccount, setEditingAccount] = useState<Account | null>(null);
  const [formData, setFormData] = useState({
    code: '',
    title: '',
    type: 'detail',
    parent_id: '',
    nature: 'debit'
  });
  const [expandedParents, setExpandedParents] = useState<Set<number>>(new Set());
  const [error, setError] = useState('');

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = () => {
    try {
      const data = execQuery(`
        SELECT a.*, p.title as parent_title 
        FROM accounts a 
        LEFT JOIN accounts p ON a.parent_id = p.id 
        ORDER BY a.code
      `);
      setAccounts(data);
    } catch (e) {
      console.error('Error loading accounts:', e);
    }
  };

  const { searchQuery, setSearchQuery, filteredData, resultCount, totalCount } = useSearchFilter({
    data: accounts,
    searchFields: ['code', 'title']
  });

  const handleAdd = () => {
    setEditingAccount(null);
    setFormData({ code: '', title: '', type: 'detail', parent_id: '', nature: 'debit' });
    setShowForm(true);
    setError('');
  };

  const handleEdit = (account: Account) => {
    setEditingAccount(account);
    setFormData({
      code: account.code,
      title: account.title,
      type: account.type,
      parent_id: account.parent_id ? String(account.parent_id) : '',
      nature: account.nature || 'debit'
    });
    setShowForm(true);
    setError('');
  };

  const handleSave = () => {
    if (!formData.code || !formData.title) {
      setError('کد و عنوان حساب الزامی است');
      return;
    }

    try {
      const db = getDatabase();
      if (!db) throw new Error('Database not available');

      // Check for duplicate code
      const existing = db.exec(`SELECT id FROM accounts WHERE code = ? AND id != ?`, [
        formData.code,
        editingAccount?.id || 0
      ]);
      
      if (existing.length > 0 && existing[0].values.length > 0) {
        setError('کد حساب تکراری است');
        return;
      }

      if (editingAccount) {
        // Update
        db.run(`
          UPDATE accounts 
          SET code = ?, title = ?, type = ?, parent_id = ?, nature = ?
          WHERE id = ?
        `, [
          formData.code,
          formData.title,
          formData.type,
          formData.parent_id || null,
          formData.nature,
          editingAccount.id
        ]);
      } else {
        // Insert
        db.run(`
          INSERT INTO accounts (code, title, type, parent_id, nature, is_active)
          VALUES (?, ?, ?, ?, ?, 1)
        `, [
          formData.code,
          formData.title,
          formData.type,
          formData.parent_id || null,
          formData.nature
        ]);
      }

      saveDatabase();
      loadAccounts();
      setShowForm(false);
    } catch (e) {
      console.error('Error saving account:', e);
      setError('خطا در ذخیره حساب');
    }
  };

  const handleDelete = (account: Account) => {
    if (!confirm(`آیا از حذف حساب "${account.title}" مطمئن هستید؟`)) return;

    try {
      const db = getDatabase();
      if (!db) throw new Error('Database not available');

      // Check if account has children
      const children = db.exec(`SELECT COUNT(*) FROM accounts WHERE parent_id = ?`, [account.id]);
      if (children.length > 0 && Number(children[0].values[0][0]) > 0) {
        alert('این حساب دارای زیرمجموعه است و قابل حذف نیست');
        return;
      }

      // Check if account has transactions
      const transactions = db.exec(`SELECT COUNT(*) FROM accounting_document_lines WHERE account_id = ?`, [account.id]);
      if (transactions.length > 0 && Number(transactions[0].values[0][0]) > 0) {
        alert('این حساب دارای گردش مالی است و قابل حذف نیست');
        return;
      }

      db.run(`DELETE FROM accounts WHERE id = ?`, [account.id]);
      saveDatabase();
      loadAccounts();
    } catch (e) {
      console.error('Error deleting account:', e);
      alert('خطا در حذف حساب');
    }
  };

  const handleExport = () => {
    exportToCSV(
      filteredData.map(a => ({
        'کد': a.code,
        'عنوان': a.title,
        'نوع': a.type === 'total' ? 'کل' : a.type === 'subsidiary' ? 'معین' : 'تفصیلی',
        'ماهیت': a.nature === 'debit' ? 'بدهکار' : 'بستانکار',
        'وضعیت': a.is_active ? 'فعال' : 'غیرفعال',
        'حساب والد': a.parent_title || '-'
      })),
      'chart_of_accounts'
    );
  };

  const toggleExpand = (accountId: number) => {
    const newExpanded = new Set(expandedParents);
    if (newExpanded.has(accountId)) {
      newExpanded.delete(accountId);
    } else {
      newExpanded.add(accountId);
    }
    setExpandedParents(newExpanded);
  };

  // Build tree structure
  const rootAccounts = filteredData.filter(a => !a.parent_id);
  
  const getChildren = (parentId: number): Account[] => {
    return filteredData.filter(a => a.parent_id === parentId);
  };

  const renderAccountRow = (account: Account, level: number = 0): React.ReactNode => {
    const children = getChildren(account.id);
    const hasChildren = children.length > 0;
    const isExpanded = expandedParents.has(account.id);

    return (
      <>
        <tr key={account.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
          <td className="py-3 px-4" style={{ paddingRight: `${level * 20 + 16}px` }}>
            <div className="flex items-center gap-2">
              {hasChildren && (
                <button
                  onClick={() => toggleExpand(account.id)}
                  className="w-5 h-5 rounded flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  {isExpanded ? <ChevronDown size={14} /> : <ChevronLeft size={14} />}
                </button>
              )}
              {!hasChildren && <div className="w-5"></div>}
              <span className="text-xs font-mono font-bold text-gray-700">{account.code}</span>
            </div>
          </td>
          <td className="py-3 px-4">
            <span className="text-xs font-medium text-gray-800">{account.title}</span>
          </td>
          <td className="py-3 px-4">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              account.type === 'total' ? 'bg-blue-50 text-blue-600' :
              account.type === 'subsidiary' ? 'bg-purple-50 text-purple-600' :
              'bg-gray-50 text-gray-600'
            }`}>
              {account.type === 'total' ? 'کل' : account.type === 'subsidiary' ? 'معین' : 'تفصیلی'}
            </span>
          </td>
          <td className="py-3 px-4">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              account.nature === 'debit' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
            }`}>
              {account.nature === 'debit' ? 'بدهکار' : 'بستانکار'}
            </span>
          </td>
          <td className="py-3 px-4">
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
              account.is_active ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
            }`}>
              {account.is_active ? 'فعال' : 'غیرفعال'}
            </span>
          </td>
          <td className="py-3 px-4">
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleEdit(account)}
                className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"
                title="ویرایش"
              >
                <Edit size={13} />
              </button>
              <button
                onClick={() => handleDelete(account)}
                className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"
                title="حذف"
              >
                <Trash2 size={13} />
              </button>
            </div>
          </td>
        </tr>
        {hasChildren && isExpanded && children.map(child => renderAccountRow(child, level + 1))}
      </>
    );
  };

  return (
    <div className="space-y-6">
      <PageToolbar
        title="کدینگ حساب‌ها"
        subtitle="مدیریت ساختار حساب‌های حسابداری (کل، معین، تفصیلی)"
        searchPlaceholder="جست‌وجوی کد یا عنوان حساب..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        onAdd={handleAdd}
        addLabel="حساب جدید"
        addColor="from-emerald-500 to-green-600"
        onExportExcel={handleExport}
        resultCount={resultCount}
        totalCount={totalCount}
      />

      {/* Accounts Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-right py-3 px-4 text-[11px] font-bold text-gray-500">کد حساب</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-gray-500">عنوان</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-gray-500">نوع</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-gray-500">ماهیت</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-gray-500">وضعیت</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {rootAccounts.map(account => renderAccountRow(account))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-sm text-gray-400">حسابی یافت نشد</p>
          </div>
        )}
      </div>

      {/* Add/Edit Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <h3 className="text-base font-bold text-gray-800">
                {editingAccount ? 'ویرایش حساب' : 'حساب جدید'}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
              >
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
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">کد حساب *</label>
                  <input
                    type="text"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                    placeholder="مثال: 1100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">نوع حساب *</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  >
                    <option value="total">کل</option>
                    <option value="subsidiary">معین</option>
                    <option value="detail">تفصیلی</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">عنوان حساب *</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  placeholder="عنوان حساب"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">حساب والد</label>
                  <select
                    value={formData.parent_id}
                    onChange={(e) => setFormData({ ...formData, parent_id: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  >
                    <option value="">ندارد (حساب ریشه)</option>
                    {accounts.filter(a => a.type !== 'detail').map(acc => (
                      <option key={acc.id} value={acc.id}>{acc.code} - {acc.title}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">ماهیت *</label>
                  <select
                    value={formData.nature}
                    onChange={(e) => setFormData({ ...formData, nature: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400"
                  >
                    <option value="debit">بدهکار</option>
                    <option value="credit">بستانکار</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-5 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-100"
              >
                انصراف
              </button>
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
              >
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
