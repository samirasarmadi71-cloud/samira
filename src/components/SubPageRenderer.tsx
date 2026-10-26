import { useState, useEffect } from 'react';
import { 
  Save, X, Plus, Edit, Trash2, Eye, AlertCircle, 
  Search, Filter, Printer, Download, Upload, ChevronDown,
  ArrowRightLeft, Calendar, CreditCard, Hash, Building2,
  Tags, Ruler, Warehouse, Landmark, FileText, Banknote,
  DollarSign, Receipt, ClipboardList, TrendingDown,
  CheckCircle2, Lock, PenTool, Users, Palette, Globe,
  HardDrive, History, Info, Scale, BookOpen, TrendingUp,
  PieChart, FileSpreadsheet, Package, BarChart3
} from 'lucide-react';
import { execQuery, runQuery, saveDatabase, getDatabase } from '../database/db';
import { exportToCSV, importCSV } from '../utils/exportImport';

interface SubPageProps {
  module: string;
  subPage: string;
}

// Generic data table component
function DataTable({ 
  title, subtitle, columns, data, onAdd, onEdit, onDelete, onExport, onImport, searchFields = ['name', 'code']
}: any) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});

  const filteredData = data.filter((item: any) => 
    searchFields.some((field: string) => 
      String(item[field] || '').toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleAdd = () => {
    setEditingItem(null);
    const initial: any = {};
    columns.forEach((col: any) => { initial[col.key] = col.default || ''; });
    setFormData(initial);
    setShowForm(true);
  };

  const handleEdit = (item: any) => {
    setEditingItem(item);
    setFormData({ ...item });
    setShowForm(true);
  };

  const handleSave = () => {
    if (onAdd) onAdd(formData, editingItem);
    setShowForm(false);
  };

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-800">{title}</h1>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
        {onAdd && (
          <button onClick={handleAdd} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-2xl hover:shadow-lg transition-all">
            <Plus size={16} /> افزودن
          </button>
        )}
      </div>

      {/* Search & Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-3">
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex-1 min-w-[200px] flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50">
            <Search size={15} className="text-gray-400" />
            <input type="text" placeholder="جست‌وجو..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="bg-transparent text-xs outline-none w-full" />
          </div>
          <button onClick={() => onExport && onExport(filteredData)} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-50 border border-green-200/50 text-xs text-green-600 hover:bg-green-100">
            <Download size={14} /> Excel
          </button>
          <button onClick={() => window.print()} className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50 text-xs text-gray-600 hover:bg-gray-100">
            <Printer size={14} /> چاپ
          </button>
          <span className="text-[10px] text-gray-400 mr-auto">{filteredData.length} مورد</span>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                {columns.map((col: any) => (
                  <th key={col.key} className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">{col.label}</th>
                ))}
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item: any, idx: number) => (
                <tr key={item.id || idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  {columns.map((col: any) => (
                    <td key={col.key} className="py-3 px-5 text-xs text-gray-700">
                      {col.render ? col.render(item) : (item[col.key] ?? '-')}
                    </td>
                  ))}
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-1">
                      {onEdit && <button onClick={() => handleEdit(item)} className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Edit size={13} /></button>}
                      {onDelete && <button onClick={() => onDelete(item)} className="p-1.5 rounded-lg hover:bg-red-50 text-red-400"><Trash2 size={13} /></button>}
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400"><Eye size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredData.length === 0 && (
          <div className="text-center py-12 text-sm text-gray-400">موردی یافت نشد</div>
        )}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-5 border-b border-gray-100 sticky top-0 bg-white z-10">
              <h3 className="text-base font-bold text-gray-800">{editingItem ? 'ویرایش' : 'افزودن جدید'}</h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <X size={16} className="text-gray-500" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              {columns.filter((c: any) => c.editable !== false).map((col: any) => (
                <div key={col.key}>
                  <label className="block text-xs font-medium text-gray-600 mb-1.5">{col.label}</label>
                  {col.type === 'select' ? (
                    <select value={formData[col.key] || ''} onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400">
                      <option value="">انتخاب...</option>
                      {col.options?.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                    </select>
                  ) : col.type === 'textarea' ? (
                    <textarea value={formData[col.key] || ''} onChange={(e) => setFormData({ ...formData, [col.key]: e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400 resize-none h-20" />
                  ) : (
                    <input type={col.type || 'text'} value={formData[col.key] || ''} onChange={(e) => setFormData({ ...formData, [col.key]: col.type === 'number' ? Number(e.target.value) : e.target.value })} className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm outline-none focus:border-blue-400" />
                  )}
                </div>
              ))}
            </div>
            <div className="flex items-center justify-end gap-2 p-5 border-t border-gray-100 bg-gray-50/50 sticky bottom-0">
              <button onClick={() => setShowForm(false)} className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-100">انصراف</button>
              <button onClick={handleSave} className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold shadow-md">
                <Save size={14} /> ذخیره
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ============ SUB PAGES ============

export default function SubPageRenderer({ module, subPage }: SubPageProps) {
  const [data, setData] = useState<any[]>([]);

  // ============ اطلاعات پایه ============
  if (module === 'base-data') {
    if (subPage === 'company') {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-black text-gray-800">اطلاعات شرکت</h1>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-xs font-medium text-gray-600 mb-1.5">نام شرکت</label><input type="text" defaultValue="شرکت نمونه سرمد" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1.5">نام تجاری</label><input type="text" defaultValue="سَرمد" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1.5">تلفن</label><input type="text" defaultValue="۰۲۱-۸۸۷۷۶۶۵۵" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-600 mb-1.5">کد اقتصادی</label><input type="text" defaultValue="۱۲۳۴۵۶۷۸۹" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" /></div>
            </div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1.5">نشانی</label><textarea defaultValue="تهران، خیابان ولیعصر، پلاک ۱۲۳" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm resize-none h-20" /></div>
            <div className="flex justify-end"><button className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm font-bold"><Save size={14} /> ذخیره</button></div>
          </div>
        </div>
      );
    }

    if (subPage === 'fiscal-years') {
      return <DataTable title="سال مالی و دوره‌ها" subtitle="مدیریت سال‌های مالی"
        columns={[
          { key: 'year', label: 'سال', render: (i: any) => <span className="font-mono font-bold">{i.year}</span> },
          { key: 'start', label: 'تاریخ شروع' },
          { key: 'end', label: 'تاریخ پایان' },
          { key: 'status', label: 'وضعیت', render: (i: any) => <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.status === 'فعال' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{i.status}</span> }
        ]}
        data={[
          { id: 1, year: '۱۴۰۵', start: '۱۴۰۵/۰۱/۰۱', end: '۱۴۰۵/۱۲/۲۹', status: 'فعال' },
          { id: 2, year: '۱۴۰۴', start: '۱۴۰۴/۰۱/۰۱', end: '۱۴۰۴/۱۲/۲۹', status: 'بسته' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'item-groups') {
      return <DataTable title="گروه کالا و خدمات" subtitle="دسته‌بندی محصولات"
        columns={[
          { key: 'code', label: 'کد', render: (i: any) => <span className="font-mono font-bold">{i.code}</span> },
          { key: 'name', label: 'نام گروه' },
          { key: 'items', label: 'تعداد کالا' }
        ]}
        data={[
          { id: 1, code: 'G-01', name: 'کالای دیجیتال', items: '۲۵' },
          { id: 2, code: 'G-02', name: 'لوازم جانبی', items: '۴۸' },
          { id: 3, code: 'G-03', name: 'ذخیره‌سازی', items: '۱۵' },
          { id: 4, code: 'G-04', name: 'لوازم خانگی', items: '۳۲' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'units') {
      return <DataTable title="واحدهای اندازه‌گیری" subtitle="تعریف واحدها"
        columns={[
          { key: 'name', label: 'نام واحد' },
          { key: 'short', label: 'مخفف' }
        ]}
        data={[
          { id: 1, name: 'عدد', short: 'عد' },
          { id: 2, name: 'کیلوگرم', short: 'کگ' },
          { id: 3, name: 'متر', short: 'م' },
          { id: 4, name: 'لیتر', short: 'ل' },
          { id: 5, name: 'بسته', short: 'بست' },
          { id: 6, name: 'کارتن', short: 'کرت' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'warehouses') {
      return <DataTable title="انبارها" subtitle="مدیریت انبارها"
        columns={[
          { key: 'code', label: 'کد', render: (i: any) => <span className="font-mono font-bold">{i.code}</span> },
          { key: 'name', label: 'نام انبار' },
          { key: 'address', label: 'نشانی' },
          { key: 'status', label: 'وضعیت', render: (i: any) => <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-600">{i.status}</span> }
        ]}
        data={[
          { id: 1, code: 'WH-001', name: 'انبار مرکزی', address: 'تهران، خیابان صنعتی', status: 'فعال' },
          { id: 2, code: 'WH-002', name: 'انبار شرق', address: 'تهران، خیابان دماوند', status: 'فعال' },
          { id: 3, code: 'WH-003', name: 'انبار غرب', address: 'تهران، خیابان آزادی', status: 'فعال' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'cash-bank') {
      return <DataTable title="صندوق و بانک" subtitle="حساب‌های مالی"
        columns={[
          { key: 'code', label: 'کد', render: (i: any) => <span className="font-mono font-bold">{i.code}</span> },
          { key: 'name', label: 'نام حساب' },
          { key: 'type', label: 'نوع', render: (i: any) => <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.type === 'صندوق' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'}`}>{i.type}</span> },
          { key: 'balance', label: 'موجودی (ریال)', render: (i: any) => <span className="font-bold">{Number(i.balance).toLocaleString()}</span> }
        ]}
        data={[
          { id: 1, code: 'CA-001', name: 'صندوق نقدی', type: 'صندوق', balance: 15200000 },
          { id: 2, code: 'CA-002', name: 'بانک ملت - جاری', type: 'بانک', balance: 85000000 },
          { id: 3, code: 'CA-003', name: 'بانک ملی - پس‌انداز', type: 'بانک', balance: 120000000 },
          { id: 4, code: 'CA-004', name: 'بانک صادرات - جاری', type: 'بانک', balance: 45500000 },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'payment-methods') {
      return <DataTable title="روش‌های پرداخت" subtitle="تعریف روش‌های پرداخت"
        columns={[
          { key: 'name', label: 'نام روش' },
          { key: 'type', label: 'نوع' }
        ]}
        data={[
          { id: 1, name: 'نقدی', type: 'نقد' },
          { id: 2, name: 'کارت بانکی', type: 'کارت' },
          { id: 3, name: 'چک', type: 'چک' },
          { id: 4, name: 'حواله بانکی', type: 'حواله' },
          { id: 5, name: 'اقساطی', type: 'اقساط' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'numbering') {
      return <DataTable title="شماره‌گذاری اسناد" subtitle="تنظیم پیش‌شماره‌ها"
        columns={[
          { key: 'type', label: 'نوع سند' },
          { key: 'prefix', label: 'پیش‌شماره' },
          { key: 'current', label: 'شماره جاری', render: (i: any) => <span className="font-mono font-bold">{i.current}</span> }
        ]}
        data={[
          { id: 1, type: 'فاکتور فروش', prefix: 'فروش', current: '۲۰۰۵' },
          { id: 2, type: 'فاکتور خرید', prefix: 'خرید', current: '۱۰۰۵' },
          { id: 3, type: 'سند حسابداری', prefix: 'سند', current: '۱۰۰۶' },
          { id: 4, type: 'رسید انبار', prefix: 'رسید', current: '۵۰۰' },
          { id: 5, type: 'حواله انبار', prefix: 'حواله', current: '۳۲۰' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }
  }

  // ============ خرید ============
  if (module === 'purchases') {
    if (subPage === 'new' || subPage === 'list') {
      return <DataTable title="فاکتورهای خرید" subtitle="مدیریت فاکتورهای خرید"
        columns={[
          { key: 'number', label: 'شماره', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'date', label: 'تاریخ' },
          { key: 'supplier', label: 'تأمین‌کننده' },
          { key: 'amount', label: 'مبلغ (ریال)', render: (i: any) => <span className="font-bold">{i.amount}</span> },
          { key: 'status', label: 'وضعیت', render: (i: any) => <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.status === 'قطعی' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{i.status}</span> }
        ]}
        data={[
          { id: 1, number: 'خرید-۱۰۰۱', date: '۱۴۰۵/۰۸/۰۱', supplier: 'تأمین‌کننده بتا', amount: '۸,۲۰۰,۰۰۰', status: 'قطعی' },
          { id: 2, number: 'خرید-۱۰۰۲', date: '۱۴۰۵/۰۷/۲۸', supplier: 'بازرگانی زتا', amount: '۱۵,۰۰۰,۰۰۰', status: 'قطعی' },
          { id: 3, number: 'خرید-۱۰۰۳', date: '۱۴۰۵/۰۷/۲۵', supplier: 'شرکت پارس', amount: '۴,۵۰۰,۰۰۰', status: 'پیش‌نویس' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'proforma') {
      return <DataTable title="پیش‌فاکتور و سفارش خرید" subtitle="مدیریت پیش‌فاکتورها"
        columns={[
          { key: 'number', label: 'شماره', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'date', label: 'تاریخ' },
          { key: 'supplier', label: 'تأمین‌کننده' },
          { key: 'amount', label: 'مبلغ (ریال)' },
          { key: 'status', label: 'وضعیت' }
        ]}
        data={[
          { id: 1, number: 'پیش-۵۰۱', date: '۱۴۰۵/۰۸/۰۲', supplier: 'تأمین‌کننده بتا', amount: '۲۵,۰۰۰,۰۰۰', status: 'در انتظار تأیید' },
          { id: 2, number: 'پیش-۵۰۲', date: '۱۴۰۵/۰۸/۰۱', supplier: 'بازرگانی زتا', amount: '۱۸,۵۰۰,۰۰۰', status: 'تأیید شده' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'returns') {
      return <DataTable title="برگشت از خرید" subtitle="مدیریت برگشتی‌ها"
        columns={[
          { key: 'number', label: 'شماره', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'date', label: 'تاریخ' },
          { key: 'refInvoice', label: 'فاکتور مرجع' },
          { key: 'supplier', label: 'تأمین‌کننده' },
          { key: 'amount', label: 'مبلغ (ریال)' }
        ]}
        data={[
          { id: 1, number: 'برگشت-۳۰۱', date: '۱۴۰۵/۰۷/۲۰', refInvoice: 'خرید-۱۰۰۱', supplier: 'تأمین‌کننده بتا', amount: '۱,۲۰۰,۰۰۰' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'expenses') {
      return <DataTable title="هزینه‌های خرید" subtitle="ثبت هزینه‌های جانبی"
        columns={[
          { key: 'date', label: 'تاریخ' },
          { key: 'description', label: 'شرح' },
          { key: 'amount', label: 'مبلغ (ریال)' },
          { key: 'type', label: 'نوع' }
        ]}
        data={[
          { id: 1, date: '۱۴۰۵/۰۸/۰۱', description: 'هزینه حمل', amount: '۵۰۰,۰۰۰', type: 'حمل' },
          { id: 2, date: '۱۴۰۵/۰۷/۲۸', description: 'بیمه کالا', amount: '۳۰۰,۰۰۰', type: 'بیمه' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }
  }

  // ============ فروش ============
  if (module === 'sales') {
    if (subPage === 'new' || subPage === 'list') {
      return <DataTable title="فاکتورهای فروش" subtitle="مدیریت فاکتورهای فروش"
        columns={[
          { key: 'number', label: 'شماره', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'date', label: 'تاریخ' },
          { key: 'customer', label: 'مشتری' },
          { key: 'amount', label: 'مبلغ (ریال)', render: (i: any) => <span className="font-bold">{i.amount}</span> },
          { key: 'profit', label: 'سود (ریال)', render: (i: any) => <span className="font-bold text-green-600">{i.profit}</span> },
          { key: 'status', label: 'وضعیت', render: (i: any) => <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.status === 'قطعی' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{i.status}</span> }
        ]}
        data={[
          { id: 1, number: 'فروش-۲۰۰۱', date: '۱۴۰۵/۰۸/۰۲', customer: 'شرکت آلفا', amount: '۱۲,۵۰۰,۰۰۰', profit: '۳,۲۰۰,۰۰۰', status: 'قطعی' },
          { id: 2, number: 'فروش-۲۰۰۲', date: '۱۴۰۵/۰۸/۰۱', customer: 'فروشگاه دلتا', amount: '۸,۷۰۰,۰۰۰', profit: '۲,۱۰۰,۰۰۰', status: 'قطعی' },
          { id: 3, number: 'فروش-۲۰۰۳', date: '۱۴۰۵/۰۷/۲۸', customer: 'شرکت گاما', amount: '۵,۳۰۰,۰۰۰', profit: '۱,۴۰۰,۰۰۰', status: 'پیش‌نویس' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'proforma') {
      return <DataTable title="پیش‌فاکتور و سفارش فروش" subtitle="مدیریت پیش‌فاکتورها"
        columns={[
          { key: 'number', label: 'شماره', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'date', label: 'تاریخ' },
          { key: 'customer', label: 'مشتری' },
          { key: 'amount', label: 'مبلغ (ریال)' },
          { key: 'status', label: 'وضعیت' }
        ]}
        data={[
          { id: 1, number: 'پیش-۶۰۱', date: '۱۴۰۵/۰۸/۰۳', customer: 'شرکت آلفا', amount: '۳۵,۰۰۰,۰۰۰', status: 'در انتظار' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'returns') {
      return <DataTable title="برگشت از فروش" subtitle="مدیریت برگشتی‌ها"
        columns={[
          { key: 'number', label: 'شماره', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'date', label: 'تاریخ' },
          { key: 'customer', label: 'مشتری' },
          { key: 'amount', label: 'مبلغ (ریال)' }
        ]}
        data={[
          { id: 1, number: 'برگشت-۴۰۱', date: '۱۴۰۵/۰۷/۲۵', customer: 'شرکت آلفا', amount: '۲,۵۰۰,۰۰۰' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'receivables') {
      return <DataTable title="دریافت‌های مرتبط" subtitle="دریافت‌های مرتبط با فروش"
        columns={[
          { key: 'date', label: 'تاریخ' },
          { key: 'customer', label: 'مشتری' },
          { key: 'amount', label: 'مبلغ (ریال)' },
          { key: 'method', label: 'روش' }
        ]}
        data={[
          { id: 1, date: '۱۴۰۵/۰۸/۰۲', customer: 'شرکت آلفا', amount: '۱۰,۰۰۰,۰۰۰', method: 'نقدی' },
          { id: 2, date: '۱۴۰۵/۰۸/۰۱', customer: 'فروشگاه دلتا', amount: '۸,۷۰۰,۰۰۰', method: 'کارت' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }
  }

  // ============ انبار ============
  if (module === 'inventory') {
    if (subPage === 'receipt') {
      return <DataTable title="رسید ورود کالا" subtitle="ثبت ورود کالا به انبار"
        columns={[
          { key: 'number', label: 'شماره', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'date', label: 'تاریخ' },
          { key: 'item', label: 'کالا' },
          { key: 'qty', label: 'تعداد' },
          { key: 'warehouse', label: 'انبار مقصد' }
        ]}
        data={[
          { id: 1, number: 'رسید-۵۰۱', date: '۱۴۰۵/۰۸/۰۲', item: 'لپ‌تاپ ایسوس', qty: '۱۰ عدد', warehouse: 'انبار مرکزی' },
          { id: 2, number: 'رسید-۵۰۲', date: '۱۴۰۵/۰۸/۰۱', item: 'ماوس بی‌سیم', qty: '۵۰ عدد', warehouse: 'انبار شرق' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'issue') {
      return <DataTable title="حواله خروج کالا" subtitle="ثبت خروج کالا از انبار"
        columns={[
          { key: 'number', label: 'شماره', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'date', label: 'تاریخ' },
          { key: 'item', label: 'کالا' },
          { key: 'qty', label: 'تعداد' },
          { key: 'warehouse', label: 'انبار مبدأ' }
        ]}
        data={[
          { id: 1, number: 'حواله-۳۲۱', date: '۱۴۰۵/۰۸/۰۲', item: 'لپ‌تاپ ایسوس', qty: '۲ عدد', warehouse: 'انبار مرکزی' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'transfer') {
      return <DataTable title="انتقال بین انبارها" subtitle="جابجایی کالا بین انبارها"
        columns={[
          { key: 'number', label: 'شماره', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'date', label: 'تاریخ' },
          { key: 'item', label: 'کالا' },
          { key: 'qty', label: 'تعداد' },
          { key: 'from', label: 'از انبار' },
          { key: 'to', label: 'به انبار' }
        ]}
        data={[
          { id: 1, number: 'انتقال-۱۰۱', date: '۱۴۰۵/۰۸/۰۱', item: 'کیبورد مکانیکی', qty: '۵ عدد', from: 'انبار مرکزی', to: 'انبار غرب' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'stocktake') {
      return <DataTable title="انبارگردانی" subtitle="شمارش موجودی"
        columns={[
          { key: 'number', label: 'شماره', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'date', label: 'تاریخ' },
          { key: 'warehouse', label: 'انبار' },
          { key: 'items', label: 'تعداد اقلام' },
          { key: 'status', label: 'وضعیت' }
        ]}
        data={[
          { id: 1, number: 'انبار-۰۰۱', date: '۱۴۰۵/۰۷/۳۰', warehouse: 'انبار مرکزی', items: '۱۲۵', status: 'تکمیل شده' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'cardex') {
      return <DataTable title="کارتکس کالا" subtitle="گردش کالا"
        columns={[
          { key: 'date', label: 'تاریخ' },
          { key: 'docNumber', label: 'شماره سند' },
          { key: 'type', label: 'نوع عملیات', render: (i: any) => <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.type === 'ورود' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{i.type}</span> },
          { key: 'qty', label: 'تعداد' },
          { key: 'balance', label: 'مانده' }
        ]}
        data={[
          { id: 1, date: '۱۴۰۵/۰۸/۰۲', docNumber: 'رسید-۵۰۱', type: 'ورود', qty: '+۱۰', balance: '۲۲' },
          { id: 2, date: '۱۴۰۵/۰۸/۰۱', docNumber: 'حواله-۳۲۱', type: 'خروج', qty: '-۲', balance: '۱۲' },
          { id: 3, date: '۱۴۰۵/۰۷/۲۸', docNumber: 'رسید-۵۰۰', type: 'ورود', qty: '+۵', balance: '۱۴' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'low-stock') {
      return <DataTable title="کالاهای کم‌موجود" subtitle="کالاهای زیر حداقل موجودی"
        columns={[
          { key: 'code', label: 'کد', render: (i: any) => <span className="font-mono font-bold">{i.code}</span> },
          { key: 'name', label: 'نام کالا' },
          { key: 'current', label: 'موجودی فعلی', render: (i: any) => <span className="font-bold text-red-600">{i.current}</span> },
          { key: 'min', label: 'حداقل' },
          { key: 'diff', label: 'اختلاف', render: (i: any) => <span className="text-red-600 font-bold">{i.diff}</span> }
        ]}
        data={[
          { id: 1, code: 'K-002', name: 'ماوس بی‌سیم', current: '۳', min: '۱۰', diff: '-۷' },
          { id: 2, code: 'K-003', name: 'کابل HDMI', current: '۵', min: '۲۰', diff: '-۱۵' },
          { id: 3, code: 'K-008', name: 'هدفون بلوتوثی', current: '۲', min: '۱۲', diff: '-۱۰' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }
  }

  // ============ خزانه ============
  if (module === 'treasury') {
    if (subPage === 'receive') {
      return <DataTable title="دریافت وجه" subtitle="ثبت دریافت‌ها"
        columns={[
          { key: 'date', label: 'تاریخ' },
          { key: 'party', label: 'از طرف' },
          { key: 'amount', label: 'مبلغ (ریال)', render: (i: any) => <span className="font-bold text-green-600">{i.amount}</span> },
          { key: 'method', label: 'روش' },
          { key: 'account', label: 'حساب' }
        ]}
        data={[
          { id: 1, date: '۱۴۰۵/۰۸/۰۲', party: 'شرکت آلفا', amount: '۱۰,۰۰۰,۰۰۰', method: 'نقدی', account: 'صندوق' },
          { id: 2, date: '۱۴۰۵/۰۸/۰۱', party: 'فروشگاه دلتا', amount: '۸,۷۰۰,۰۰۰', method: 'کارت', account: 'بانک ملت' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'pay') {
      return <DataTable title="پرداخت وجه" subtitle="ثبت پرداخت‌ها"
        columns={[
          { key: 'date', label: 'تاریخ' },
          { key: 'party', label: 'به طرف' },
          { key: 'amount', label: 'مبلغ (ریال)', render: (i: any) => <span className="font-bold text-red-600">{i.amount}</span> },
          { key: 'method', label: 'روش' },
          { key: 'account', label: 'حساب' }
        ]}
        data={[
          { id: 1, date: '۱۴۰۵/۰۸/۰۲', party: 'تأمین‌کننده بتا', amount: '۵,۰۰۰,۰۰۰', method: 'چک', account: 'بانک ملت' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'transfer') {
      return <DataTable title="انتقال وجه" subtitle="جابجایی بین حساب‌ها"
        columns={[
          { key: 'date', label: 'تاریخ' },
          { key: 'amount', label: 'مبلغ (ریال)' },
          { key: 'from', label: 'از حساب' },
          { key: 'to', label: 'به حساب' }
        ]}
        data={[
          { id: 1, date: '۱۴۰۵/۰۸/۰۱', amount: '۲۰,۰۰۰,۰۰۰', from: 'بانک ملت', to: 'بانک ملی' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'received-checks') {
      return <DataTable title="چک‌های دریافتی" subtitle="مدیریت چک‌های دریافتی"
        columns={[
          { key: 'number', label: 'شماره چک', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'party', label: 'از طرف' },
          { key: 'amount', label: 'مبلغ (ریال)' },
          { key: 'bank', label: 'بانک' },
          { key: 'dueDate', label: 'سررسید' },
          { key: 'status', label: 'وضعیت', render: (i: any) => <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.status === 'وصول شده' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{i.status}</span> }
        ]}
        data={[
          { id: 1, number: '۱۲۳۴۵۶', party: 'شرکت آلفا', amount: '۵,۰۰۰,۰۰۰', bank: 'بانک ملت', dueDate: '۱۴۰۵/۰۸/۱۰', status: 'در انتظار' },
          { id: 2, number: '۷۸۹۰۱۲', party: 'شرکت گاما', amount: '۸,۵۰۰,۰۰۰', bank: 'بانک صادرات', dueDate: '۱۴۰۵/۰۸/۱۵', status: 'در انتظار' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'paid-checks') {
      return <DataTable title="چک‌های پرداختی" subtitle="مدیریت چک‌های پرداختی"
        columns={[
          { key: 'number', label: 'شماره چک', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'party', label: 'در وجه' },
          { key: 'amount', label: 'مبلغ (ریال)' },
          { key: 'bank', label: 'بانک' },
          { key: 'dueDate', label: 'سررسید' },
          { key: 'status', label: 'وضعیت' }
        ]}
        data={[
          { id: 1, number: '۳۴۵۶۷۸', party: 'تأمین‌کننده بتا', amount: '۳,۲۰۰,۰۰۰', bank: 'بانک ملی', dueDate: '۱۴۰۵/۰۸/۱۷', status: 'در انتظار' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'due-dates') {
      return <DataTable title="سررسید چک‌ها" subtitle="چک‌های نزدیک به سررسید"
        columns={[
          { key: 'number', label: 'شماره چک', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'type', label: 'نوع', render: (i: any) => <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.type === 'دریافتی' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{i.type}</span> },
          { key: 'party', label: 'طرف حساب' },
          { key: 'amount', label: 'مبلغ (ریال)' },
          { key: 'dueDate', label: 'سررسید', render: (i: any) => <span className="font-bold text-amber-600">{i.dueDate}</span> },
          { key: 'daysLeft', label: 'روز مانده', render: (i: any) => <span className={`font-bold ${i.daysLeft <= 3 ? 'text-red-600' : 'text-amber-600'}`}>{i.daysLeft} روز</span> }
        ]}
        data={[
          { id: 1, number: '۱۲۳۴۵۶', type: 'دریافتی', party: 'شرکت آلفا', amount: '۵,۰۰۰,۰۰۰', dueDate: '۱۴۰۵/۰۸/۰۵', daysLeft: 2 },
          { id: 2, number: '۳۴۵۶۷۸', type: 'پرداختی', party: 'تأمین‌کننده بتا', amount: '۳,۲۰۰,۰۰۰', dueDate: '۱۴۰۵/۰۸/۰۷', daysLeft: 4 },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'reconciliation') {
      return <DataTable title="مغایرت بانکی" subtitle="تطبیق با صورت‌حساب بانک"
        columns={[
          { key: 'date', label: 'تاریخ' },
          { key: 'bank', label: 'بانک' },
          { key: 'bookBalance', label: 'مانده دفتری' },
          { key: 'bankBalance', label: 'مانده بانک' },
          { key: 'difference', label: 'مغایرت', render: (i: any) => <span className="font-bold text-red-600">{i.difference}</span> }
        ]}
        data={[
          { id: 1, date: '۱۴۰۵/۰۷/۳۰', bank: 'بانک ملت', bookBalance: '۸۵,۰۰۰,۰۰۰', bankBalance: '۸۴,۵۰۰,۰۰۰', difference: '۵۰۰,۰۰۰' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }
  }

  // ============ اسناد حسابداری ============
  if (module === 'accounting') {
    if (subPage === 'new') {
      return <DataTable title="ثبت سند حسابداری" subtitle="ثبت سند دستی"
        columns={[
          { key: 'date', label: 'تاریخ' },
          { key: 'account', label: 'حساب' },
          { key: 'description', label: 'شرح' },
          { key: 'debit', label: 'بدهکار' },
          { key: 'credit', label: 'بستانکار' }
        ]}
        data={[]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'list' || subPage === 'finalized') {
      return <DataTable title="فهرست اسناد حسابداری" subtitle="اسناد ثبت شده"
        columns={[
          { key: 'number', label: 'شماره', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'date', label: 'تاریخ' },
          { key: 'description', label: 'شرح' },
          { key: 'debit', label: 'بدهکار' },
          { key: 'credit', label: 'بستانکار' },
          { key: 'status', label: 'وضعیت', render: (i: any) => <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.status === 'قطعی' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'}`}>{i.status}</span> }
        ]}
        data={[
          { id: 1, number: 'سند-۱۰۰۱', date: '۱۴۰۵/۰۸/۰۲', description: 'ثبت فاکتور فروش', debit: '۱۲,۵۰۰,۰۰۰', credit: '۱۲,۵۰۰,۰۰۰', status: 'قطعی' },
          { id: 2, number: 'سند-۱۰۰۲', date: '۱۴۰۵/۰۸/۰۱', description: 'ثبت فاکتور خرید', debit: '۸,۲۰۰,۰۰۰', credit: '۸,۲۰۰,۰۰۰', status: 'قطعی' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'drafts') {
      return <DataTable title="اسناد پیش‌نویس" subtitle="اسناد تأیید نشده"
        columns={[
          { key: 'number', label: 'شماره', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'date', label: 'تاریخ' },
          { key: 'description', label: 'شرح' },
          { key: 'debit', label: 'بدهکار' },
          { key: 'credit', label: 'بستانکار' }
        ]}
        data={[
          { id: 1, number: 'سند-۱۰۰۴', date: '۱۴۰۵/۰۸/۰۱', description: 'هزینه اجاره', debit: '۵,۰۰۰,۰۰۰', credit: '۵,۰۰۰,۰۰۰' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'corrections') {
      return <DataTable title="اسناد اصلاحی و برگشتی" subtitle="اصلاحات اسناد"
        columns={[
          { key: 'number', label: 'شماره', render: (i: any) => <span className="font-mono font-bold">{i.number}</span> },
          { key: 'date', label: 'تاریخ' },
          { key: 'refDoc', label: 'سند مرجع' },
          { key: 'description', label: 'شرح' }
        ]}
        data={[
          { id: 1, number: 'سند-اصلاحی-۱۰۱', date: '۱۴۰۵/۰۷/۲۵', refDoc: 'سند-۹۹۸', description: 'اصلاح مبلغ' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'close-period') {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-black text-gray-800">بستن دوره مالی</h1>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6">
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <h3 className="text-sm font-bold text-blue-800 mb-2">دوره مالی فعلی</h3>
                <p className="text-xs text-blue-700">سال مالی ۱۴۰۵ - از ۱۴۰۵/۰۱/۰۱ تا ۱۴۰۵/۱۲/۲۹</p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
                  <p className="text-[10px] text-gray-500">اسناد ثبت شده</p>
                  <p className="text-2xl font-black text-gray-800">۲۶۵</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
                  <p className="text-[10px] text-gray-500">اسناد قطعی</p>
                  <p className="text-2xl font-black text-green-600">۲۴۵</p>
                </div>
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 text-center">
                  <p className="text-[10px] text-gray-500">اسناد پیش‌نویس</p>
                  <p className="text-2xl font-black text-amber-600">۲۰</p>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-100">
                <p className="text-xs text-amber-800">⚠️ قبل از بستن دوره، تمام اسناد پیش‌نویس باید تعیین تکلیف شوند.</p>
              </div>
              <button className="w-full py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-bold">بستن دوره مالی</button>
            </div>
          </div>
        </div>
      );
    }
  }

  // ============ تنظیمات ============
  if (module === 'settings') {
    if (subPage === 'users') {
      return <DataTable title="کاربران و مجوزها" subtitle="مدیریت کاربران سیستم"
        columns={[
          { key: 'username', label: 'نام کاربری', render: (i: any) => <span className="font-mono font-bold">{i.username}</span> },
          { key: 'fullName', label: 'نام کامل' },
          { key: 'role', label: 'نقش', render: (i: any) => <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600">{i.role}</span> },
          { key: 'status', label: 'وضعیت', render: (i: any) => <span className={`text-[10px] px-2 py-0.5 rounded-full ${i.status === 'فعال' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>{i.status}</span> }
        ]}
        data={[
          { id: 1, username: 'admin', fullName: 'مدیر سیستم', role: 'مدیر', status: 'فعال' },
          { id: 2, username: 'ali', fullName: 'علی احمدی', role: 'مدیر مالی', status: 'فعال' },
          { id: 3, username: 'maryam', fullName: 'مریم رضایی', role: 'حسابدار', status: 'فعال' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'appearance') {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-black text-gray-800">تنظیمات ظاهر</h1>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6 space-y-4">
            <div><label className="block text-xs font-medium text-gray-600 mb-1.5">تم رنگی</label><select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm"><option>پیش‌فرض</option><option>تاریک</option></select></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1.5">اندازه فونت</label><select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm"><option>متوسط</option><option>کوچک</option><option>بزرگ</option></select></div>
          </div>
        </div>
      );
    }

    if (subPage === 'datetime') {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-black text-gray-800">تاریخ، ارقام و واحد پول</h1>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6 space-y-4">
            <div><label className="block text-xs font-medium text-gray-600 mb-1.5">نوع تقویم</label><select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm"><option>شمسی</option><option>میلادی</option></select></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1.5">واحد پول</label><select className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm"><option>ریال</option><option>تومان</option></select></div>
            <div><label className="block text-xs font-medium text-gray-600 mb-1.5">تعداد اعشار</label><input type="number" defaultValue="0" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" /></div>
          </div>
        </div>
      );
    }

    if (subPage === 'print') {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-black text-gray-800">قالب چاپ</h1>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6">
            <p className="text-sm text-gray-600">مدیریت قالب‌های چاپ فاکتور و گزارش‌ها</p>
          </div>
        </div>
      );
    }

    if (subPage === 'excel') {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-black text-gray-800">ورود و خروج Excel</h1>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6">
            <p className="text-sm text-gray-600">تنظیمات واردسازی و خروجی Excel</p>
          </div>
        </div>
      );
    }

    if (subPage === 'backup') {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-black text-gray-800">پشتیبان‌گیری و بازیابی</h1>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6 space-y-4">
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-bold">پشتیبان‌گیری از داده‌ها</button>
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm font-bold">بازیابی از فایل پشتیبان</button>
          </div>
        </div>
      );
    }

    if (subPage === 'audit') {
      return <DataTable title="سوابق عملیات" subtitle="ردپای حسابرسی"
        columns={[
          { key: 'date', label: 'تاریخ' },
          { key: 'user', label: 'کاربر' },
          { key: 'action', label: 'عملیات' },
          { key: 'table', label: 'جدول' },
          { key: 'record', label: 'رکورد' }
        ]}
        data={[
          { id: 1, date: '۱۴۰۵/۰۸/۰۳ ۱۰:۳۰', user: 'admin', action: 'login', table: 'users', record: '1' },
          { id: 2, date: '۱۴۰۵/۰۸/۰۲ ۱۵:۲۰', user: 'admin', action: 'insert', table: 'sales_documents', record: '2001' },
        ]}
        onAdd={() => {}} onEdit={() => {}}
      />;
    }

    if (subPage === 'version') {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-black text-gray-800">اطلاعات نسخه</h1>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                <Info size={28} className="text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800">سیستم حسابداری سرمد</h3>
                <p className="text-sm text-gray-500">نسخه 1.0.0</p>
                <p className="text-xs text-gray-400 mt-1">پایگاه داده: SQLite | Node.js</p>
              </div>
            </div>
          </div>
        </div>
      );
    }
  }

  // Default
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-black text-gray-800">در حال توسعه</h1>
      <p className="text-sm text-gray-500">این بخش در نسخه‌های بعدی فعال خواهد شد.</p>
    </div>
  );
}
