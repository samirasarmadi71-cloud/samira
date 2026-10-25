import { BookOpen, Plus, Search, Filter, PenTool, ClipboardList, FileText, Lock, ArrowRightLeft, Calendar, Eye, Edit, CheckCircle2, XCircle } from 'lucide-react';

const documents = [
  { id: 1, number: 'سند-۱۰۰۱', date: '۱۴۰۴/۰۴/۱۴', description: 'ثبت فاکتور فروش #۲۰۰۱', debit: '۱۲,۵۰۰,۰۰۰', credit: '۱۲,۵۰۰,۰۰۰', status: 'قطعی', type: 'خودکار', creator: 'سیستم' },
  { id: 2, number: 'سند-۱۰۰۲', date: '۱۴۰۴/۰۴/۱۳', description: 'ثبت فاکتور خرید #۱۰۰۱', debit: '۸,۲۰۰,۰۰۰', credit: '۸,۲۰۰,۰۰۰', status: 'قطعی', type: 'خودکار', creator: 'سیستم' },
  { id: 3, number: 'سند-۱۰۰۳', date: '۱۴۰۴/۰۴/۱۲', description: 'هزینه اجاره دفتر', debit: '۵,۰۰۰,۰۰۰', credit: '۵,۰۰۰,۰۰۰', status: 'تأییدشده', type: 'دستی', creator: 'حسابدار' },
  { id: 4, number: 'سند-۱۰۰۴', date: '۱۴۰۴/۰۴/۱۱', description: 'اصلاح سند شماره ۹۹۸', debit: '۲,۳۰۰,۰۰۰', credit: '۲,۳۰۰,۰۰۰', status: 'پیش‌نویس', type: 'دستی', creator: 'مدیر مالی' },
  { id: 5, number: 'سند-۱۰۰۵', date: '۱۴۰۴/۰۴/۱۰', description: 'دریافت وجه نقدی', debit: '۳,۵۰۰,۰۰۰', credit: '۳,۵۰۰,۰۰۰', status: 'قطعی', type: 'خودکار', creator: 'سیستم' },
  { id: 6, number: 'سند-۱۰۰۶', date: '۱۴۰۴/۰۴/۰۹', description: 'برگشت از فروش مشتری', debit: '۱,۸۰۰,۰۰۰', credit: '۱,۸۰۰,۰۰۰', status: 'قطعی', type: 'خودکار', creator: 'سیستم' },
];

const quickActions = [
  { title: 'ثبت سند جدید', icon: <PenTool size={18} />, color: 'from-fuchsia-400 to-fuchsia-600', desc: 'ایجاد سند دستی' },
  { title: 'فهرست اسناد', icon: <ClipboardList size={18} />, color: 'from-blue-400 to-blue-600', desc: 'مشاهده همه اسناد' },
  { title: 'اسناد پیش‌نویس', icon: <FileText size={18} />, color: 'from-amber-400 to-amber-600', desc: 'اسناد تأیید نشده' },
  { title: 'بستن دوره مالی', icon: <Calendar size={18} />, color: 'from-red-400 to-red-600', desc: 'بستن دوره جاری' },
];

export default function Accounting() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">اسناد حسابداری</h1>
          <p className="text-sm text-gray-500 mt-1">ثبت، مدیریت و پیگیری اسناد حسابداری</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-fuchsia-500 to-purple-600 text-white text-sm rounded-2xl hover:shadow-lg hover:shadow-fuchsia-500/30 transition-all">
          <Plus size={16} />
          ثبت سند جدید
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
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <CheckCircle2 size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">اسناد قطعی</p>
              <p className="text-lg font-black text-gray-800">۲۴۵</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Lock size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">تأییدشده</p>
              <p className="text-lg font-black text-gray-800">۱۲</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <FileText size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">پیش‌نویس</p>
              <p className="text-lg font-black text-gray-800">۸</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <BookOpen size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">کل اسناد</p>
              <p className="text-lg font-black text-gray-800">۲۶۵</p>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800">فهرست اسناد حسابداری</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">لیست تمام اسناد ثبت شده</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50">
              <Search size={14} className="text-gray-400" />
              <input type="text" placeholder="جست‌وجو..." className="bg-transparent text-xs outline-none w-32" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50 text-xs text-gray-600 hover:bg-gray-100 transition-colors">
              <Filter size={14} />
              فیلتر
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">شماره</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">تاریخ</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">شرح</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">بدهکار</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">بستانکار</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">نوع</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">ثبت‌کننده</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">وضعیت</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-5 text-xs font-mono font-bold text-gray-700">{doc.number}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-600">{doc.date}</td>
                  <td className="py-3.5 px-5 text-xs font-medium text-gray-800">{doc.description}</td>
                  <td className="py-3.5 px-5 text-xs font-bold text-blue-600">{doc.debit}</td>
                  <td className="py-3.5 px-5 text-xs font-bold text-emerald-600">{doc.credit}</td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      doc.type === 'خودکار' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}>{doc.type}</span>
                  </td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{doc.creator}</td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      doc.status === 'قطعی' ? 'bg-green-50 text-green-600' :
                      doc.status === 'تأییدشده' ? 'bg-blue-50 text-blue-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>{doc.status}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Eye size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"><Edit size={13} /></button>
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
