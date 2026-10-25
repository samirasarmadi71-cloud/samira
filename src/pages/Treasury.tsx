import { Landmark, Plus, Search, Filter, Banknote, DollarSign, CreditCard, ArrowRightLeft, Calendar, Scale, Eye, Edit } from 'lucide-react';

const checks = [
  { id: 1, number: 'چک-۰۰۱', type: 'دریافتی', party: 'شرکت آلفا', amount: '۵,۰۰۰,۰۰۰', bank: 'بانک ملت', issueDate: '۱۴۰۴/۰۴/۱۰', dueDate: '۱۴۰۴/۰۴/۱۶', status: 'در انتظار وصول' },
  { id: 2, number: 'چک-۰۰۲', type: 'پرداختی', party: 'تأمین‌کننده بتا', amount: '۳,۲۰۰,۰۰۰', bank: 'بانک ملی', issueDate: '۱۴۰۴/۰۴/۰۸', dueDate: '۱۴۰۴/۰۴/۱۷', status: 'در انتظار سررسید' },
  { id: 3, number: 'چک-۰۰۳', type: 'دریافتی', party: 'شرکت گاما', amount: '۸,۵۰۰,۰۰۰', bank: 'بانک صادرات', issueDate: '۱۴۰۴/۰۴/۰۵', dueDate: '۱۴۰۴/۰۴/۱۸', status: 'در انتظار وصول' },
  { id: 4, number: 'چک-۰۰۴', type: 'پرداختی', party: 'بازرگانی زتا', amount: '۱۲,۰۰۰,۰۰۰', bank: 'بانک پاسارگاد', issueDate: '۱۴۰۴/۰۳/۲۵', dueDate: '۱۴۰۴/۰۴/۱۵', status: 'وصول شده' },
  { id: 5, number: 'چک-۰۰۵', type: 'دریافتی', party: 'فروشگاه دلتا', amount: '۴,۸۰۰,۰۰۰', bank: 'بانک تجارت', issueDate: '۱۴۰۴/۰۴/۰۱', dueDate: '۱۴۰۴/۰۴/۲۰', status: 'در انتظار وصول' },
];

const cashAccounts = [
  { name: 'صندوق نقدی', balance: '۱۵,۲۰۰,۰۰۰', type: 'صندوق', icon: '💰' },
  { name: 'بانک ملت - جاری', balance: '۸۵,۰۰۰,۰۰۰', type: 'بانک', icon: '🏦' },
  { name: 'بانک ملی - پس‌انداز', balance: '۱۲۰,۰۰۰,۰۰۰', type: 'بانک', icon: '🏦' },
  { name: 'بانک صادرات - جاری', balance: '۴۵,۵۰۰,۰۰۰', type: 'بانک', icon: '🏦' },
];

const quickActions = [
  { title: 'دریافت وجه', icon: <Banknote size={18} />, color: 'from-green-400 to-green-600', desc: 'ثبت دریافت' },
  { title: 'پرداخت وجه', icon: <DollarSign size={18} />, color: 'from-red-400 to-red-600', desc: 'ثبت پرداخت' },
  { title: 'انتقال وجه', icon: <ArrowRightLeft size={18} />, color: 'from-blue-400 to-blue-600', desc: 'جابجایی بین حساب‌ها' },
  { title: 'مغایرت بانکی', icon: <Scale size={18} />, color: 'from-amber-400 to-amber-600', desc: 'بررسی مغایرت' },
];

export default function Treasury() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">چک و خزانه‌داری</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت صندوق، بانک، چک‌ها و تراکنش‌های مالی</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-blue-600 text-white text-sm rounded-2xl hover:shadow-lg hover:shadow-indigo-500/30 transition-all">
          <Plus size={16} />
          ثبت تراکنش
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

      {/* Cash Accounts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cashAccounts.map((account, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">{account.icon}</span>
              <div>
                <p className="text-xs font-bold text-gray-800">{account.name}</p>
                <p className="text-[10px] text-gray-400">{account.type}</p>
              </div>
            </div>
            <p className="text-lg font-black text-gray-800">{account.balance} <span className="text-[10px] text-gray-400">ریال</span></p>
          </div>
        ))}
      </div>

      {/* Checks Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800">چک‌های دریافتی و پرداختی</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">مدیریت و پیگیری چک‌ها</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50">
              <Search size={14} className="text-gray-400" />
              <input type="text" placeholder="جست‌وجو..." className="bg-transparent text-xs outline-none w-32" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-50 border border-amber-200/50 text-xs text-amber-600 hover:bg-amber-100 transition-colors">
              <Calendar size={14} />
              نزدیک سررسید
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">شماره</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">نوع</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">طرف حساب</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">مبلغ (ریال)</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">بانک</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">سررسید</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">وضعیت</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {checks.map((check) => (
                <tr key={check.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-5 text-xs font-mono font-bold text-gray-700">{check.number}</td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      check.type === 'دریافتی' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>{check.type}</span>
                  </td>
                  <td className="py-3.5 px-5 text-xs font-medium text-gray-800">{check.party}</td>
                  <td className="py-3.5 px-5 text-xs font-bold text-gray-700">{check.amount}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{check.bank}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-600">{check.dueDate}</td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      check.status === 'وصول شده' ? 'bg-green-50 text-green-600' :
                      check.status === 'در انتظار وصول' ? 'bg-blue-50 text-blue-600' :
                      'bg-amber-50 text-amber-600'
                    }`}>{check.status}</span>
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
