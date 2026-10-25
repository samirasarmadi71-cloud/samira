import { BarChart3, FileSpreadsheet, BookOpen, Scale, TrendingUp, Users, Package, Landmark, Download, Printer, Calendar } from 'lucide-react';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

const reportTypes = [
  { id: 'sales-purchase', title: 'فروش و خرید', icon: <BarChart3 size={20} />, color: 'from-blue-500 to-blue-600', desc: 'گزارش مقایسه‌ای فروش و خرید' },
  { id: 'inventory', title: 'موجودی و گردش کالا', icon: <Package size={20} />, color: 'from-cyan-500 to-cyan-600', desc: 'گزارش موجودی انبار' },
  { id: 'contacts', title: 'حساب اشخاص', icon: <Users size={20} />, color: 'from-violet-500 to-violet-600', desc: 'گردش و مانده حساب اشخاص' },
  { id: 'cash-bank', title: 'صندوق و بانک', icon: <Landmark size={20} />, color: 'from-indigo-500 to-indigo-600', desc: 'گردش حساب‌های نقدی و بانکی' },
  { id: 'journal', title: 'دفتر روزنامه', icon: <BookOpen size={20} />, color: 'from-rose-500 to-rose-600', desc: 'ثبت روزانه عملیات' },
  { id: 'ledger', title: 'دفتر کل و معین', icon: <BookOpen size={20} />, color: 'from-fuchsia-500 to-fuchsia-600', desc: 'گزارش حساب‌های کل و معین' },
  { id: 'trial', title: 'تراز آزمایشی', icon: <Scale size={20} />, color: 'from-teal-500 to-teal-600', desc: 'تراز آزمایشی حساب‌ها' },
  { id: 'profit', title: 'سود و زیان', icon: <TrendingUp size={20} />, color: 'from-emerald-500 to-emerald-600', desc: 'صورت سود و زیان' },
  { id: 'balance', title: 'ترازنامه', icon: <FileSpreadsheet size={20} />, color: 'from-amber-500 to-amber-600', desc: 'ترازنامه شرکت' },
];

const salesPurchaseData = [
  { name: 'فروردین', sales: 45000, purchases: 32000 },
  { name: 'اردیبهشت', sales: 52000, purchases: 38000 },
  { name: 'خرداد', sales: 48000, purchases: 35000 },
  { name: 'تیر', sales: 61000, purchases: 42000 },
  { name: 'مرداد', sales: 55000, purchases: 40000 },
  { name: 'شهریور', sales: 67000, purchases: 45000 },
];

const trialBalance = [
  { code: '۱۱۰', name: 'موجودی نقد و بانک', debit: '۴۴۵,۰۰۰,۰۰۰', credit: '-' },
  { code: '۱۲۰', name: 'حساب‌های دریافتنی', debit: '۱۲۵,۰۰۰,۰۰۰', credit: '-' },
  { code: '۱۳۰', name: 'موجودی کالا', debit: '۸۵۰,۰۰۰,۰۰۰', credit: '-' },
  { code: '۲۱۰', name: 'حساب‌های پرداختنی', debit: '-', credit: '۲۸,۵۰۰,۰۰۰' },
  { code: '۳۱۰', name: 'سرمایه', debit: '-', credit: '۱,۲۰۰,۰۰۰,۰۰۰' },
  { code: '۴۱۰', name: 'درآمد فروش', debit: '-', credit: '۳۲۸,۰۰۰,۰۰۰' },
  { code: '۵۱۰', name: 'بهای تمام‌شده', debit: '۲۳۲,۰۰۰,۰۰۰', credit: '-' },
  { code: '۵۲۰', name: 'هزینه‌های عملیاتی', debit: '۵۴,۵۰۰,۰۰۰', credit: '-' },
];

export default function Reports() {
  const [activeReport, setActiveReport] = useState('sales-purchase');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">گزارشات</h1>
          <p className="text-sm text-gray-500 mt-1">گزارش‌های مالی و عملیاتی</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-xl hover:bg-gray-50">
            <Download size={14} /> خروجی Excel
          </button>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 text-gray-600 text-sm rounded-xl hover:bg-gray-50">
            <Printer size={14} /> چاپ
          </button>
        </div>
      </div>

      {/* Report Type Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {reportTypes.map((report) => (
          <button
            key={report.id}
            onClick={() => setActiveReport(report.id)}
            className={`p-3 rounded-xl border text-center transition-all ${
              activeReport === report.id
                ? 'bg-white shadow-lg border-blue-200 ring-2 ring-blue-100'
                : 'bg-white shadow-sm border-gray-100 hover:shadow-md'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center text-white mx-auto mb-2 shadow-md`}>
              {report.icon}
            </div>
            <p className="text-xs font-bold text-gray-700">{report.title}</p>
            <p className="text-[9px] text-gray-400 mt-0.5">{report.desc}</p>
          </button>
        ))}
      </div>

      {/* Date Filter */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <Calendar size={16} className="text-gray-400" />
            <span className="text-sm text-gray-500">از:</span>
            <input type="text" defaultValue="۱۴۰۴/۰۱/۰۱" className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg w-28 outline-none focus:ring-2 focus:ring-teal-100" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">تا:</span>
            <input type="text" defaultValue="۱۴۰۴/۰۴/۱۵" className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg w-28 outline-none focus:ring-2 focus:ring-teal-100" />
          </div>
          <select className="px-3 py-1.5 text-sm border border-gray-200 rounded-lg outline-none">
            <option>همه اشخاص</option>
            <option>شرکت آلفا</option>
            <option>شرکت گاما</option>
          </select>
          <button className="px-4 py-1.5 bg-teal-500 text-white text-sm rounded-lg hover:bg-teal-600">اعمال فیلتر</button>
        </div>
      </div>

      {/* Report Content */}
      {activeReport === 'sales-purchase' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-700 mb-4">گزارش مقایسه‌ای فروش و خرید</h3>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={salesPurchaseData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="name" fontSize={11} />
                <YAxis fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} name="فروش" />
                <Bar dataKey="purchases" fill="#10b981" radius={[4, 4, 0, 0]} name="خرید" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h3 className="text-sm font-bold text-gray-700 mb-3">خلاصه ارقام</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 rounded-xl bg-blue-50">
                <p className="text-[10px] text-gray-400">جمع فروش</p>
                <p className="text-lg font-bold text-blue-600">۳۲۸,۰۰۰,۰۰۰</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-green-50">
                <p className="text-[10px] text-gray-400">جمع خرید</p>
                <p className="text-lg font-bold text-green-600">۲۳۲,۰۰۰,۰۰۰</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-emerald-50">
                <p className="text-[10px] text-gray-400">سود ناخالص</p>
                <p className="text-lg font-bold text-emerald-600">۹۶,۰۰۰,۰۰۰</p>
              </div>
              <div className="text-center p-3 rounded-xl bg-purple-50">
                <p className="text-[10px] text-gray-400">حاشیه سود</p>
                <p className="text-lg font-bold text-purple-600">۲۹.۳٪</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeReport === 'trial' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-700">تراز آزمایشی</h3>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-right py-3 px-4 text-gray-500 font-medium">کد</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">نام حساب</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">بدهکار</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">بستانکار</th>
              </tr>
            </thead>
            <tbody>
              {trialBalance.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-xs text-teal-600">{row.code}</td>
                  <td className="py-3 px-4 font-medium">{row.name}</td>
                  <td className="py-3 px-4 font-medium text-blue-600">{row.debit}</td>
                  <td className="py-3 px-4 font-medium text-red-600">{row.credit}</td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td className="py-3 px-4" colSpan={2}>جمع کل</td>
                <td className="py-3 px-4 text-blue-600">۱,۷۰۶,۵۰۰,۰۰۰</td>
                <td className="py-3 px-4 text-red-600">۱,۷۰۶,۵۰۰,۰۰۰</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {!['sales-purchase', 'trial'].includes(activeReport) && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <BarChart3 size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">گزارش «{reportTypes.find(r => r.id === activeReport)?.title}» آماده نمایش است</p>
          <p className="text-xs text-gray-400 mt-2">برای مشاهده جزئیات، فیلترهای مورد نظر را اعمال کنید</p>
        </div>
      )}
    </div>
  );
}
