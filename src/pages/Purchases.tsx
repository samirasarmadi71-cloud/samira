import { Plus, Search, Filter, Eye, Edit, Printer, FileText, ShoppingCart, TrendingDown, Receipt } from 'lucide-react';
import { useState } from 'react';

const purchaseInvoices = [
  { id: 1, number: 'INV-P-567', date: '۱۴۰۴/۰۴/۱۰', supplier: 'تأمین‌کننده بتا', warehouse: 'انبار مرکزی', amount: '۸,۲۰۰,۰۰۰', status: 'قطعی', items: 5 },
  { id: 2, number: 'INV-P-568', date: '۱۴۰۴/۰۴/۱۱', supplier: 'شرکت اپسیلون', warehouse: 'انبار شعبه ۱', amount: '۱۵,۰۰۰,۰۰۰', status: 'قطعی', items: 8 },
  { id: 3, number: 'INV-P-569', date: '۱۴۰۴/۰۴/۱۲', supplier: 'فروشگاه دلتا', warehouse: 'انبار مرکزی', amount: '۳,۵۰۰,۰۰۰', status: 'پیش‌نویس', items: 3 },
  { id: 4, number: 'INV-P-570', date: '۱۴۰۴/۰۴/۱۳', supplier: 'تأمین‌کننده بتا', warehouse: 'انبار شعبه ۲', amount: '۶,۸۰۰,۰۰۰', status: 'قطعی', items: 4 },
  { id: 5, number: 'INV-P-571', date: '۱۴۰۴/۰۴/۱۴', supplier: 'شرکت اپسیلون', warehouse: 'انبار مرکزی', amount: '۱۲,۳۰۰,۰۰۰', status: 'تأییدشده', items: 6 },
];

export default function Purchases() {
  const [activeTab, setActiveTab] = useState('invoices');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">خرید</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت فاکتورها و عملیات خرید</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm rounded-2xl hover:shadow-lg hover:shadow-amber-500/30 transition-all active:scale-95">
          <Plus size={16} />
          فاکتور خرید جدید
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'invoices', label: 'فهرست فاکتورها', icon: <Receipt size={14} /> },
          { id: 'proforma', label: 'پیش‌فاکتور', icon: <FileText size={14} /> },
          { id: 'returns', label: 'برگشت از خرید', icon: <TrendingDown size={14} /> },
          { id: 'expenses', label: 'هزینه‌های خرید', icon: <ShoppingCart size={14} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-amber-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-amber-50'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">خرید این ماه</p>
          <p className="text-lg font-bold text-gray-700">۴۵,۰۰۰,۰۰۰</p>
          <p className="text-[10px] text-gray-400">ریال</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">تعداد فاکتور</p>
          <p className="text-lg font-bold text-amber-600">۱۲</p>
          <p className="text-[10px] text-gray-400">فاکتور</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">بدهی به تأمین‌کنندگان</p>
          <p className="text-lg font-bold text-red-600">۲۸,۵۰۰,۰۰۰</p>
          <p className="text-[10px] text-gray-400">ریال</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">پیش‌نویس</p>
          <p className="text-lg font-bold text-blue-600">۳</p>
          <p className="text-[10px] text-gray-400">سند</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جست‌وجوی فاکتور..."
              className="w-full pr-9 pl-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-100 focus:border-amber-400 outline-none"
            />
          </div>
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-100 outline-none">
            <option>همه وضعیت‌ها</option>
            <option>قطعی</option>
            <option>پیش‌نویس</option>
            <option>تأییدشده</option>
          </select>
          <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-xl hover:bg-gray-200">
            <Filter size={14} /> فیلتر
          </button>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-right py-3 px-4 text-gray-500 font-medium">شماره</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">تاریخ</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">تأمین‌کننده</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">انبار</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">تعداد ردیف</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">مبلغ</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">وضعیت</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {purchaseInvoices.map((inv) => (
              <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-mono text-xs text-amber-600 font-medium">{inv.number}</td>
                <td className="py-3 px-4 text-gray-500">{inv.date}</td>
                <td className="py-3 px-4 font-medium">{inv.supplier}</td>
                <td className="py-3 px-4 text-gray-500">{inv.warehouse}</td>
                <td className="py-3 px-4 text-gray-500">{inv.items}</td>
                <td className="py-3 px-4 font-medium">{inv.amount} <span className="text-[10px] text-gray-400">ریال</span></td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                    inv.status === 'قطعی' ? 'bg-green-100 text-green-600' :
                    inv.status === 'پیش‌نویس' ? 'bg-blue-100 text-blue-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>{inv.status}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Eye size={14} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500"><Edit size={14} /></button>
                    <button className="p-1.5 rounded-lg hover:bg-green-50 text-green-500"><Printer size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
