import { TrendingUp, Plus, Search, Filter, Eye, Edit, Printer, FileText, Receipt, TrendingDown, DollarSign, BarChart3, PieChart, Banknote } from 'lucide-react';

const salesInvoices = [
  { id: 1, number: 'فروش-۲۰۰۱', date: '۱۴۰۴/۰۴/۱۴', customer: 'شرکت آلفا تکنولوژی', amount: '۱۲,۵۰۰,۰۰۰', profit: '۳,۲۰۰,۰۰۰', status: 'قطعی', warehouse: 'انبار مرکزی', payment: '۸۰٪' },
  { id: 2, number: 'فروش-۲۰۰۲', date: '۱۴۰۴/۰۴/۱۳', customer: 'فروشگاه دلتا', amount: '۸,۷۰۰,۰۰۰', profit: '۲,۱۰۰,۰۰۰', status: 'قطعی', warehouse: 'انبار شرق', payment: '۱۰۰٪' },
  { id: 3, number: 'فروش-۲۰۰۳', date: '۱۴۰۴/۰۴/۱۱', customer: 'شرکت گاما تجارت', amount: '۵,۳۰۰,۰۰۰', profit: '۱,۴۰۰,۰۰۰', status: 'پیش‌نویس', warehouse: 'انبار مرکزی', payment: '۰٪' },
  { id: 4, number: 'فروش-۲۰۰۴', date: '۱۴۰۴/۰۴/۰۹', customer: 'شرکت آلفا تکنولوژی', amount: '۱۸,۹۰۰,۰۰۰', profit: '۴,۸۰۰,۰۰۰', status: 'قطعی', warehouse: 'انبار غرب', payment: '۵۰٪' },
  { id: 5, number: 'فروش-۲۰۰۵', date: '۱۴۰۴/۰۴/۰۷', customer: 'بازرگانی زتا', amount: '۷,۲۰۰,۰۰۰', profit: '۱,۹۰۰,۰۰۰', status: 'برگشتی', warehouse: 'انبار مرکزی', payment: 'برگشت' },
];

const quickActions = [
  { title: 'فاکتور فروش جدید', icon: <Receipt size={18} />, color: 'from-rose-400 to-rose-600', desc: 'ثبت فاکتور فروش' },
  { title: 'پیش‌فاکتور', icon: <FileText size={18} />, color: 'from-blue-400 to-blue-600', desc: 'ایجاد پیش‌فاکتور' },
  { title: 'برگشت از فروش', icon: <TrendingDown size={18} />, color: 'from-amber-400 to-amber-600', desc: 'ثبت برگشت' },
  { title: 'دریافت وجه', icon: <Banknote size={18} />, color: 'from-green-400 to-green-600', desc: 'ثبت دریافت' },
];

export default function Sales() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">فروش</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت فاکتورها، سفارشات و گزارش‌های فروش</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-500 to-pink-600 text-white text-sm rounded-2xl hover:shadow-lg hover:shadow-rose-500/30 transition-all">
          <Plus size={16} />
          فاکتور فروش جدید
        </button>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {quickActions.map((action, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                {action.icon}
              </div>
              <div>
                <h3 className="text-xs font-bold text-gray-800">{action.title}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">{action.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center">
              <TrendingUp size={18} className="text-rose-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">فروش این ماه</p>
              <p className="text-lg font-black text-gray-800">۶۷,۰۰۰,۰۰۰ <span className="text-[10px] text-gray-400">ریال</span></p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <PieChart size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">سود خالص</p>
              <p className="text-lg font-black text-gray-800">۱۷,۲۰۰,۰۰۰ <span className="text-[10px] text-gray-400">ریال</span></p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <BarChart3 size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">تعداد فاکتورها</p>
              <p className="text-lg font-black text-gray-800">۳۸ <span className="text-[10px] text-gray-400">فاکتور</span></p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <DollarSign size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">مطالبات باز</p>
              <p className="text-lg font-black text-gray-800">۲۲,۵۰۰,۰۰۰ <span className="text-[10px] text-gray-400">ریال</span></p>
            </div>
          </div>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800">فهرست فاکتورهای فروش</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">لیست تمام فاکتورهای فروش</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50">
              <Search size={14} className="text-gray-400" />
              <input type="text" placeholder="جست‌وجو..." className="bg-transparent text-xs outline-none w-32" />
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">شماره</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">تاریخ</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">مشتری</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">مبلغ (ریال)</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">سود</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">پرداخت</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">وضعیت</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {salesInvoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-5 text-xs font-mono font-bold text-gray-700">{invoice.number}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-600">{invoice.date}</td>
                  <td className="py-3.5 px-5 text-xs font-medium text-gray-800">{invoice.customer}</td>
                  <td className="py-3.5 px-5 text-xs font-bold text-gray-700">{invoice.amount}</td>
                  <td className="py-3.5 px-5 text-xs font-bold text-green-600">{invoice.profit}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-gray-100 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-rose-400 to-rose-600" style={{ width: invoice.payment === '۱۰۰٪' ? '100%' : invoice.payment === '۸۰٪' ? '80%' : invoice.payment === '۵۰٪' ? '50%' : '0%' }}></div>
                      </div>
                      <span className="text-[10px] text-gray-500">{invoice.payment}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      invoice.status === 'قطعی' ? 'bg-green-50 text-green-600' :
                      invoice.status === 'پیش‌نویس' ? 'bg-amber-50 text-amber-600' :
                      'bg-red-50 text-red-600'
                    }`}>{invoice.status}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Eye size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"><Edit size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><Printer size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
