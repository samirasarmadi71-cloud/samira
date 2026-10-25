import { Plus, Search, Filter, Eye, Edit, Printer, FileText, TrendingDown, Receipt, DollarSign } from 'lucide-react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const salesInvoices = [
  { id: 1, number: 'INV-S-1234', date: '۱۴۰۴/۰۴/۱۰', customer: 'شرکت آلفا', warehouse: 'انبار مرکزی', amount: '۱۲,۵۰۰,۰۰۰', profit: '۳,۲۰۰,۰۰۰', status: 'قطعی', items: 4 },
  { id: 2, number: 'INV-S-1235', date: '۱۴۰۴/۰۴/۱۱', customer: 'شرکت گاما', warehouse: 'انبار شعبه ۱', amount: '۸,۷۰۰,۰۰۰', profit: '۲,۱۰۰,۰۰۰', status: 'قطعی', items: 3 },
  { id: 3, number: 'INV-S-1236', date: '۱۴۰۴/۰۴/۱۲', customer: 'بازار زتا', warehouse: 'انبار مرکزی', amount: '۵,۳۰۰,۰۰۰', profit: '۱,۵۰۰,۰۰۰', status: 'پیش‌نویس', items: 2 },
  { id: 4, number: 'INV-S-1237', date: '۱۴۰۴/۰۴/۱۳', customer: 'فروشگاه دلتا', warehouse: 'انبار شعبه ۲', amount: '۱۸,۹۰۰,۰۰۰', profit: '۵,۶۰۰,۰۰۰', status: 'قطعی', items: 7 },
  { id: 5, number: 'INV-S-1238', date: '۱۴۰۴/۰۴/۱۴', customer: 'شرکت آلفا', warehouse: 'انبار مرکزی', amount: '۲۲,۱۰۰,۰۰۰', profit: '۶,۸۰۰,۰۰۰', status: 'تأییدشده', items: 5 },
];

const profitData = [
  { name: 'فروردین', profit: 12000 },
  { name: 'اردیبهشت', profit: 15000 },
  { name: 'خرداد', profit: 13500 },
  { name: 'تیر', profit: 19200 },
];

export default function Sales() {
  const [activeTab, setActiveTab] = useState('invoices');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">فروش</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت فاکتورها و عملیات فروش</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-rose-600 text-white text-sm rounded-xl hover:shadow-lg transition-all">
          <Plus size={16} />
          فاکتور فروش جدید
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'invoices', label: 'فهرست فاکتورها', icon: <Receipt size={14} /> },
          { id: 'proforma', label: 'پیش‌فاکتور', icon: <FileText size={14} /> },
          { id: 'returns', label: 'برگشت از فروش', icon: <TrendingDown size={14} /> },
          { id: 'receivables', label: 'دریافت‌ها', icon: <DollarSign size={14} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-rose-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-rose-50'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">فروش این ماه</p>
          <p className="text-lg font-bold text-gray-700">۶۷,۰۰۰,۰۰۰</p>
          <p className="text-[10px] text-gray-400">ریال</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">سود خالص</p>
          <p className="text-lg font-bold text-green-600">۱۹,۲۰۰,۰۰۰</p>
          <p className="text-[10px] text-gray-400">ریال</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">مطالبات از مشتریان</p>
          <p className="text-lg font-bold text-rose-600">۱۲۵,۰۰۰,۰۰۰</p>
          <p className="text-[10px] text-gray-400">ریال</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">تعداد فاکتور</p>
          <p className="text-lg font-bold text-rose-600">۲۸</p>
          <p className="text-[10px] text-gray-400">فاکتور</p>
        </div>
      </div>

      {/* Profit Chart */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <h3 className="text-sm font-bold text-gray-700 mb-4">سود ماهانه</h3>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={profitData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={11} />
            <YAxis fontSize={11} />
            <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
            <Bar dataKey="profit" fill="#f43f5e" radius={[4, 4, 0, 0]} name="سود (هزار ریال)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جست‌وجوی فاکتور..."
              className="w-full pr-9 pl-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none"
            />
          </div>
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none">
            <option>همه وضعیت‌ها</option>
            <option>قطعی</option>
            <option>پیش‌نویس</option>
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
              <th className="text-right py-3 px-4 text-gray-500 font-medium">مشتری</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">انبار</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">مبلغ</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">سود</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">وضعیت</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {salesInvoices.map((inv) => (
              <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-mono text-xs text-rose-600 font-medium">{inv.number}</td>
                <td className="py-3 px-4 text-gray-500">{inv.date}</td>
                <td className="py-3 px-4 font-medium">{inv.customer}</td>
                <td className="py-3 px-4 text-gray-500">{inv.warehouse}</td>
                <td className="py-3 px-4 font-medium">{inv.amount} <span className="text-[10px] text-gray-400">ریال</span></td>
                <td className="py-3 px-4 text-green-600 font-medium">{inv.profit}</td>
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
                    <button className="p-1.5 rounded-lg hover:bg-rose-50 text-rose-500"><Edit size={14} /></button>
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
