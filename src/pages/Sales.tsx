import { Plus, Search, Filter, Eye, Edit, Printer, FileText, TrendingDown, Receipt, DollarSign, TrendingUp } from 'lucide-react';
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
          <h1 className="text-2xl font-black text-gray-800">فروش</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت فاکتورها و عملیات فروش</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm rounded-2xl hover:shadow-lg hover:shadow-rose-500/30 transition-all active:scale-95">
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
            className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-sm font-medium transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-rose-500 to-pink-600 text-white shadow-lg shadow-rose-500/20'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-rose-50 hover:border-rose-200'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-4 border border-gray-100/80 shadow-sm card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-400 to-rose-600 flex items-center justify-center">
              <TrendingUp size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">فروش این ماه</p>
              <p className="text-lg font-black text-gray-700">۶۷,۰۰۰,۰۰۰</p>
              <p className="text-[10px] text-gray-400">ریال</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-4 border border-gray-100/80 shadow-sm card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              <DollarSign size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">سود خالص</p>
              <p className="text-lg font-black text-green-600">۱۹,۲۰۰,۰۰۰</p>
              <p className="text-[10px] text-gray-400">ریال</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-4 border border-gray-100/80 shadow-sm card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
              <Receipt size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">مطالبات</p>
              <p className="text-lg font-black text-amber-600">۱۲۵,۰۰۰,۰۰۰</p>
              <p className="text-[10px] text-gray-400">ریال</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-4 border border-gray-100/80 shadow-sm card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-violet-600 flex items-center justify-center">
              <FileText size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">تعداد فاکتور</p>
              <p className="text-lg font-black text-violet-600">۲۸</p>
              <p className="text-[10px] text-gray-400">فاکتور</p>
            </div>
          </div>
        </div>
      </div>

      {/* Profit Chart */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6 card-hover">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-gray-800">سود ماهانه</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">عملکرد سودآوری</p>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={profitData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={11} />
            <YAxis fontSize={11} />
            <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }} />
            <Bar dataKey="profit" fill="#f43f5e" radius={[6, 6, 0, 0]} name="سود (هزار ریال)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جست‌وجوی فاکتور..."
              className="w-full pr-9 pl-3 py-2.5 text-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-100 focus:border-rose-400 outline-none"
            />
          </div>
          <select className="px-4 py-2.5 text-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-rose-100 outline-none">
            <option>همه وضعیت‌ها</option>
            <option>قطعی</option>
            <option>پیش‌نویس</option>
            <option>تأییدشده</option>
          </select>
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 text-gray-600 text-sm rounded-2xl hover:bg-gray-200 transition-all">
            <Filter size={14} /> فیلتر
          </button>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50/80 border-b border-gray-100">
              <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">شماره</th>
              <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">تاریخ</th>
              <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">مشتری</th>
              <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">انبار</th>
              <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">مبلغ</th>
              <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">سود</th>
              <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">وضعیت</th>
              <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {salesInvoices.map((invoice, idx) => (
              <tr key={invoice.id} className={`border-b border-gray-50 hover:bg-rose-50/30 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                <td className="py-3.5 px-5">
                  <span className="text-xs font-mono bg-rose-50 text-rose-600 px-2 py-1 rounded-lg">{invoice.number}</span>
                </td>
                <td className="py-3.5 px-5 text-gray-500 text-xs">{invoice.date}</td>
                <td className="py-3.5 px-5 font-medium text-gray-700 text-xs">{invoice.customer}</td>
                <td className="py-3.5 px-5 text-gray-500 text-xs">{invoice.warehouse}</td>
                <td className="py-3.5 px-5 font-bold text-gray-700 text-xs">{invoice.amount} <span className="text-gray-400 font-normal">ریال</span></td>
                <td className="py-3.5 px-5 font-bold text-green-600 text-xs">{invoice.profit}</td>
                <td className="py-3.5 px-5">
                  <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium border ${
                    invoice.status === 'قطعی' ? 'bg-green-50 text-green-600 border-green-200' :
                    invoice.status === 'پیش‌نویس' ? 'bg-amber-50 text-amber-600 border-amber-200' :
                    'bg-blue-50 text-blue-600 border-blue-200'
                  }`}>{invoice.status}</span>
                </td>
                <td className="py-3.5 px-5">
                  <div className="flex items-center gap-1">
                    <button className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors">
                      <Eye size={13} className="text-blue-500" />
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-100 flex items-center justify-center transition-colors">
                      <Edit size={13} className="text-amber-500" />
                    </button>
                    <button className="w-7 h-7 rounded-lg bg-purple-50 hover:bg-purple-100 flex items-center justify-center transition-colors">
                      <Printer size={13} className="text-purple-500" />
                    </button>
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
