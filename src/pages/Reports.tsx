import { useState } from 'react';
import { ArrowRight, BookOpen, Scale, TrendingUp, FileSpreadsheet, Users, Landmark, Package, BarChart3 } from 'lucide-react';
import PageToolbar from '../components/PageToolbar';
import { exportToCSV } from '../utils/exportImport';

interface ReportsProps {
  subPage?: string;
}

export default function Reports({ subPage }: ReportsProps) {
  const [activeReport, setActiveReport] = useState(subPage || 'sales-purchase');

  const reports = [
    { id: 'sales-purchase', title: 'فروش و خرید', icon: <BarChart3 size={20} />, color: 'from-blue-400 to-blue-600' },
    { id: 'inventory', title: 'موجودی و گردش کالا', icon: <Package size={20} />, color: 'from-cyan-400 to-cyan-600' },
    { id: 'contacts', title: 'حساب اشخاص', icon: <Users size={20} />, color: 'from-violet-400 to-violet-600' },
    { id: 'cash-bank', title: 'صندوق و بانک', icon: <Landmark size={20} />, color: 'from-indigo-400 to-indigo-600' },
    { id: 'journal', title: 'دفتر روزنامه', icon: <BookOpen size={20} />, color: 'from-emerald-400 to-emerald-600' },
    { id: 'ledger', title: 'دفتر کل و معین', icon: <BookOpen size={20} />, color: 'from-teal-400 to-teal-600' },
    { id: 'trial-balance', title: 'تراز آزمایشی', icon: <Scale size={20} />, color: 'from-amber-400 to-amber-600' },
    { id: 'profit-loss', title: 'سود و زیان', icon: <TrendingUp size={20} />, color: 'from-rose-400 to-rose-600' },
    { id: 'balance-sheet', title: 'ترازنامه', icon: <FileSpreadsheet size={20} />, color: 'from-fuchsia-400 to-fuchsia-600' },
  ];

  const handleExport = () => {
    exportToCSV([], `report_${activeReport}`);
  };

  // Journal Report
  if (activeReport === 'journal') {
    return (
      <div className="space-y-6">
        <PageToolbar
          title="دفتر روزنامه"
          subtitle="ثبت روزانه عملیات حسابداری"
          searchPlaceholder="جست‌وجو در دفتر روزنامه..."
          onPrint={() => window.print()}
          onExportExcel={handleExport}
          showDateRange
        />

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
          <div className="p-5 border-b border-gray-100">
            <h3 className="text-sm font-bold text-gray-800">دفتر روزنامه - سال مالی ۱۴۰۵</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-100">
                  <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">تاریخ</th>
                  <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">شماره سند</th>
                  <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">شرح</th>
                  <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">کد حساب</th>
                  <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">نام حساب</th>
                  <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">بدهکار</th>
                  <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">بستانکار</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-50">
                  <td className="py-3 px-5 text-xs">۱۴۰۵/۰۸/۰۱</td>
                  <td className="py-3 px-5 text-xs font-mono">۱۰۰۱</td>
                  <td className="py-3 px-5 text-xs">فروش کالا به شرکت آلفا</td>
                  <td className="py-3 px-5 text-xs font-mono">۱۲۰۰</td>
                  <td className="py-3 px-5 text-xs">حساب‌های دریافتنی</td>
                  <td className="py-3 px-5 text-xs font-bold text-blue-600">۱۲,۵۰۰,۰۰۰</td>
                  <td className="py-3 px-5 text-xs"></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-3 px-5 text-xs">۱۴۰۵/۰۸/۰۱</td>
                  <td className="py-3 px-5 text-xs font-mono">۱۰۰۱</td>
                  <td className="py-3 px-5 text-xs">فروش کالا به شرکت آلفا</td>
                  <td className="py-3 px-5 text-xs font-mono">۴۱۰۰</td>
                  <td className="py-3 px-5 text-xs">فروش</td>
                  <td className="py-3 px-5 text-xs"></td>
                  <td className="py-3 px-5 text-xs font-bold text-green-600">۱۲,۵۰۰,۰۰۰</td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-3 px-5 text-xs">۱۴۰۵/۰۸/۰۲</td>
                  <td className="py-3 px-5 text-xs font-mono">۱۰۰۲</td>
                  <td className="py-3 px-5 text-xs">خرید کالا از تأمین‌کننده بتا</td>
                  <td className="py-3 px-5 text-xs font-mono">۱۳۰۰</td>
                  <td className="py-3 px-5 text-xs">موجودی کالا</td>
                  <td className="py-3 px-5 text-xs font-bold text-blue-600">۸,۲۰۰,۰۰۰</td>
                  <td className="py-3 px-5 text-xs"></td>
                </tr>
                <tr className="border-b border-gray-50">
                  <td className="py-3 px-5 text-xs">۱۴۰۵/۰۸/۰۲</td>
                  <td className="py-3 px-5 text-xs font-mono">۱۰۰۲</td>
                  <td className="py-3 px-5 text-xs">خرید کالا از تأمین‌کننده بتا</td>
                  <td className="py-3 px-5 text-xs font-mono">۲۱۰۰</td>
                  <td className="py-3 px-5 text-xs">حساب‌های پرداختنی</td>
                  <td className="py-3 px-5 text-xs"></td>
                  <td className="py-3 px-5 text-xs font-bold text-green-600">۸,۲۰۰,۰۰۰</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }

  // Profit & Loss Report
  if (activeReport === 'profit-loss') {
    return (
      <div className="space-y-6">
        <PageToolbar
          title="صورت سود و زیان"
          subtitle="گزارش عملکرد مالی"
          searchPlaceholder="جست‌وجو..."
          onPrint={() => window.print()}
          onExportExcel={handleExport}
          showDateRange
        />

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6">
          <h3 className="text-base font-bold text-gray-800 mb-6">صورت سود و زیان - سال مالی ۱۴۰۵</h3>
          
          <div className="space-y-4">
            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-sm font-bold text-gray-700 mb-3">درآمدها</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">فروش کالا</span>
                  <span className="font-bold">۳۲۸,۰۰۰,۰۰۰ ریال</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">درآمد خدمات</span>
                  <span className="font-bold">۴۵,۰۰۰,۰۰۰ ریال</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 mt-2">
                  <span>جمع درآمدها</span>
                  <span className="text-green-600">۳۷۳,۰۰۰,۰۰۰ ریال</span>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-sm font-bold text-gray-700 mb-3">بهای تمام‌شده</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">بهای تمام‌شده کالای فروش رفته</span>
                  <span className="font-bold">۲۳۲,۰۰۰,۰۰۰ ریال</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 mt-2">
                  <span>سود ناخالص</span>
                  <span className="text-blue-600">۱۴۱,۰۰۰,۰۰۰ ریال</span>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 pb-4">
              <h4 className="text-sm font-bold text-gray-700 mb-3">هزینه‌های عملیاتی</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">هزینه حقوق و دستمزد</span>
                  <span className="font-bold">۳۵,۰۰۰,۰۰۰ ریال</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">هزینه اجاره</span>
                  <span className="font-bold">۱۲,۰۰۰,۰۰۰ ریال</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-600">هزینه Utilities</span>
                  <span className="font-bold">۵,۰۰۰,۰۰۰ ریال</span>
                </div>
                <div className="flex justify-between text-sm font-bold border-t border-gray-200 pt-2 mt-2">
                  <span>جمع هزینه‌ها</span>
                  <span className="text-red-600">۵۲,۰۰۰,۰۰۰ ریال</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
              <div className="flex justify-between items-center">
                <span className="text-base font-bold text-gray-800">سود خالص</span>
                <span className="text-2xl font-black text-green-600">۸۹,۰۰۰,۰۰۰ ریال</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default: Report Selection
  return (
    <div className="space-y-6">
      <PageToolbar
        title="گزارشات"
        subtitle="انتخاب و مشاهده گزارش‌های مالی"
        searchPlaceholder="جست‌وجو در گزارش‌ها..."
        onPrint={() => window.print()}
        onExportExcel={handleExport}
        showDateRange
      />

      {/* Report Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {reports.map((report) => (
          <button
            key={report.id}
            onClick={() => setActiveReport(report.id)}
            className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-5 card-hover cursor-pointer group text-right"
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${report.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                {report.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800">{report.title}</h3>
                <p className="text-[10px] text-gray-400 mt-1">مشاهده گزارش</p>
              </div>
              <ArrowRight size={16} className="text-gray-400 group-hover:text-gray-600 transition-colors" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
