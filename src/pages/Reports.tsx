import { useState } from 'react';
import { BarChart3, FileText, Users, Landmark, BookOpen, Scale, TrendingUp, FileSpreadsheet, Package, Download, Printer, Calendar, Filter } from 'lucide-react';
import PageToolbar from '../components/PageToolbar';
import { exportToCSV } from '../utils/exportImport';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const monthlyData = [
  { name: 'فروردین', sales: 45000, purchases: 32000, profit: 13000 },
  { name: 'اردیبهشت', sales: 52000, purchases: 38000, profit: 14000 },
  { name: 'خرداد', sales: 48000, purchases: 35000, profit: 13000 },
  { name: 'تیر', sales: 61000, purchases: 42000, profit: 19000 },
  { name: 'مرداد', sales: 55000, purchases: 40000, profit: 15000 },
  { name: 'شهریور', sales: 67000, purchases: 45000, profit: 22000 },
];

const reportTypes = [
  { title: 'فروش و خرید', desc: 'گزارش جامع فروش و خرید', icon: <BarChart3 size={20} />, color: 'from-blue-400 to-blue-600' },
  { title: 'موجودی و گردش کالا', desc: 'وضعیت موجودی انبار', icon: <Package size={20} />, color: 'from-cyan-400 to-cyan-600' },
  { title: 'حساب اشخاص', desc: 'گردش حساب طرف‌حساب‌ها', icon: <Users size={20} />, color: 'from-violet-400 to-violet-600' },
  { title: 'صندوق و بانک', desc: 'گردش حساب‌های مالی', icon: <Landmark size={20} />, color: 'from-indigo-400 to-indigo-600' },
  { title: 'دفتر روزنامه', desc: 'ثبت روزانه عملیات', icon: <BookOpen size={20} />, color: 'from-emerald-400 to-emerald-600' },
  { title: 'دفتر کل و معین', desc: 'خلاصه حساب‌ها', icon: <BookOpen size={20} />, color: 'from-teal-400 to-teal-600' },
  { title: 'تراز آزمایشی', desc: 'بررسی تراز حساب‌ها', icon: <Scale size={20} />, color: 'from-amber-400 to-amber-600' },
  { title: 'سود و زیان', desc: 'صورت سود و زیان', icon: <TrendingUp size={20} />, color: 'from-rose-400 to-rose-600' },
  { title: 'ترازنامه', desc: 'صورت وضعیت مالی', icon: <FileSpreadsheet size={20} />, color: 'from-fuchsia-400 to-fuchsia-600' },
];

export default function Reports() {
  const [searchQuery, setSearchQuery] = useState('');
  const [dateFrom, setDateFrom] = useState('۱۴۰۴/۰۱/۰۱');
  const [dateTo, setDateTo] = useState('۱۴۰۴/۰۶/۳۱');

  const handleExport = () => {
    exportToCSV(
      monthlyData.map(m => ({
        'ماه': m.name,
        'فروش': m.sales,
        'خرید': m.purchases,
        'سود': m.profit,
        'حاشیه سود': `${(m.profit / m.sales * 100).toFixed(0)}%`
      })),
      'financial_report'
    );
  };

  return (
    <div className="space-y-6">
      <PageToolbar
        title="گزارشات"
        subtitle="گزارش‌های مالی، حسابداری و تحلیلی"
        searchPlaceholder="جست‌وجو در گزارش‌ها..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        showDateRange
        dateFrom={dateFrom}
        dateTo={dateTo}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
        onPrint={() => window.print()}
        onExportExcel={handleExport}
      />

      {/* Report Types */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {reportTypes.map((report, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                {report.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-xs font-bold text-gray-800">{report.title}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">{report.desc}</p>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-gray-50 hover:bg-gray-100">
                <FileText size={14} className="text-gray-500" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Main Report Chart */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-gray-800">گزارش فروش، خرید و سود ماهانه</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">نیمه اول سال ۱۴۰۴</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span className="text-[10px] text-gray-500">فروش</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
              <span className="text-[10px] text-gray-500">خرید</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-amber-500"></div>
              <span className="text-[10px] text-gray-500">سود</span>
            </div>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><Printer size={14} /></button>
              <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><Download size={14} /></button>
            </div>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="name" fontSize={11} />
            <YAxis fontSize={11} />
            <Tooltip
              contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', padding: '12px', direction: 'rtl' }}
              formatter={(value: number) => [`${value.toLocaleString()} هزار ریال`]}
            />
            <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} name="فروش" />
            <Bar dataKey="purchases" fill="#10b981" radius={[4, 4, 0, 0]} name="خرید" />
            <Bar dataKey="profit" fill="#f59e0b" radius={[4, 4, 0, 0]} name="سود" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Summary Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h3 className="text-sm font-bold text-gray-800">خلاصه گزارش مالی</h3>
          <p className="text-[10px] text-gray-400 mt-0.5">جمع‌بندی عملکرد ۶ ماهه</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">ماه</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">فروش (ریال)</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">خرید (ریال)</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">سود (ریال)</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">حاشیه سود</th>
              </tr>
            </thead>
            <tbody>
              {monthlyData.map((row, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-5 text-xs font-medium text-gray-800">{row.name}</td>
                  <td className="py-3 px-5 text-xs text-blue-600 font-bold">{row.sales.toLocaleString()},۰۰۰</td>
                  <td className="py-3 px-5 text-xs text-emerald-600 font-bold">{row.purchases.toLocaleString()},۰۰۰</td>
                  <td className="py-3 px-5 text-xs text-amber-600 font-bold">{row.profit.toLocaleString()},۰۰۰</td>
                  <td className="py-3 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-green-600" style={{ width: `${(row.profit / row.sales * 100)}%` }}></div>
                      </div>
                      <span className="text-[10px] text-gray-500">{(row.profit / row.sales * 100).toFixed(0)}٪</span>
                    </div>
                  </td>
                </tr>
              ))}
              <tr className="bg-gray-50 font-bold">
                <td className="py-3 px-5 text-xs text-gray-800">جمع کل</td>
                <td className="py-3 px-5 text-xs text-blue-700">{monthlyData.reduce((a, b) => a + b.sales, 0).toLocaleString()},۰۰۰</td>
                <td className="py-3 px-5 text-xs text-emerald-700">{monthlyData.reduce((a, b) => a + b.purchases, 0).toLocaleString()},۰۰۰</td>
                <td className="py-3 px-5 text-xs text-amber-700">{monthlyData.reduce((a, b) => a + b.profit, 0).toLocaleString()},۰۰۰</td>
                <td className="py-3 px-5 text-xs text-gray-600">
                  {(monthlyData.reduce((a, b) => a + b.profit, 0) / monthlyData.reduce((a, b) => a + b.sales, 0) * 100).toFixed(0)}٪
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
