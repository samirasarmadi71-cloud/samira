import { Plus, Search, CreditCard, Banknote, ArrowRightLeft, Calendar, AlertTriangle, Landmark } from 'lucide-react';
import { useState } from 'react';

const checks = [
  { id: 1, number: 'CH-001', type: 'دریافتی', party: 'شرکت آلفا', bank: 'بانک ملت', amount: '۵,۰۰۰,۰۰۰', issueDate: '۱۴۰۴/۰۴/۱۰', dueDate: '۱۴۰۴/۰۴/۱۶', status: 'در انتظار وصول' },
  { id: 2, number: 'CH-002', type: 'پرداختی', party: 'تأمین‌کننده بتا', bank: 'بانک ملی', amount: '۳,۲۰۰,۰۰۰', issueDate: '۱۴۰۴/۰۴/۰۸', dueDate: '۱۴۰۴/۰۴/۱۷', status: 'در انتظار سررسید' },
  { id: 3, number: 'CH-003', type: 'دریافتی', party: 'شرکت گاما', bank: 'بانک صادرات', amount: '۸,۵۰۰,۰۰۰', issueDate: '۱۴۰۴/۰۴/۰۵', dueDate: '۱۴۰۴/۰۴/۱۸', status: 'در انتظار وصول' },
  { id: 4, number: 'CH-004', type: 'پرداختی', party: 'فروشگاه دلتا', bank: 'بانک ملت', amount: '۲,۸۰۰,۰۰۰', issueDate: '۱۴۰۴/۰۴/۰۱', dueDate: '۱۴۰۴/۰۴/۱۵', status: 'وصول شده' },
  { id: 5, number: 'CH-005', type: 'دریافتی', party: 'بازار زتا', bank: 'بانک ملی', amount: '۱۲,۰۰۰,۰۰۰', issueDate: '۱۴۰۴/۰۳/۲۵', dueDate: '۱۴۰۴/۰۴/۲۰', status: 'در انتظار وصول' },
];

const cashTransactions = [
  { id: 1, date: '۱۴۰۴/۰۴/۱۴', type: 'دریافت', account: 'صندوق اصلی', amount: '۵,۰۰۰,۰۰۰', desc: 'دریافت از مشتری آلفا', balance: '۱۵,۰۰۰,۰۰۰' },
  { id: 2, date: '۱۴۰۴/۰۴/۱۳', type: 'پرداخت', account: 'بانک ملت', amount: '۸,۲۰۰,۰۰۰', desc: 'پرداخت فاکتور خرید', balance: '۲۴۱,۸۰۰,۰۰۰' },
  { id: 3, date: '۱۴۰۴/۰۴/۱۲', type: 'دریافت', account: 'بانک ملی', amount: '۱۲,۵۰۰,۰۰۰', desc: 'واریز فاکتور فروش', balance: '۱۹۲,۵۰۰,۰۰۰' },
  { id: 4, date: '۱۴۰۴/۰۴/۱۱', type: 'انتقال', account: 'بانک ملت → بانک ملی', amount: '۲۰,۰۰۰,۰۰۰', desc: 'انتقال بین حساب‌ها', balance: '-' },
];

export default function Treasury() {
  const [activeTab, setActiveTab] = useState('transactions');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">چک و خزانه‌داری</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت دریافت، پرداخت و چک‌ها</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm rounded-xl hover:shadow-lg transition-all">
            <Plus size={16} />
            دریافت وجه
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-sm rounded-xl hover:shadow-lg transition-all">
            <Plus size={16} />
            پرداخت وجه
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'transactions', label: 'تراکنش‌ها', icon: <Banknote size={14} /> },
          { id: 'checks', label: 'چک‌ها', icon: <CreditCard size={14} /> },
          { id: 'transfer', label: 'انتقال وجه', icon: <ArrowRightLeft size={14} /> },
          { id: 'due', label: 'سررسیدها', icon: <Calendar size={14} /> },
          { id: 'reconciliation', label: 'مغایرت بانکی', icon: <Landmark size={14} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-indigo-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-indigo-50'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Account Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Landmark size={18} />
            <span className="text-sm font-medium">صندوق اصلی</span>
          </div>
          <p className="text-2xl font-bold">۱۵,۰۰۰,۰۰۰</p>
          <p className="text-xs opacity-80 mt-1">ریال</p>
        </div>
        <div className="bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Landmark size={18} />
            <span className="text-sm font-medium">بانک ملت - ۰۱۲۳</span>
          </div>
          <p className="text-2xl font-bold">۲۵۰,۰۰۰,۰۰۰</p>
          <p className="text-xs opacity-80 mt-1">ریال</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-5 text-white shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <Landmark size={18} />
            <span className="text-sm font-medium">بانک ملی - ۴۵۶۷</span>
          </div>
          <p className="text-2xl font-bold">۱۸۰,۰۰۰,۰۰۰</p>
          <p className="text-xs opacity-80 mt-1">ریال</p>
        </div>
      </div>

      {/* Checks Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">چک‌های دریافتی</p>
          <p className="text-lg font-bold text-green-600">۲۵,۵۰۰,۰۰۰</p>
          <p className="text-[10px] text-gray-400">ریال</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">چک‌های پرداختی</p>
          <p className="text-lg font-bold text-red-600">۶,۰۰۰,۰۰۰</p>
          <p className="text-[10px] text-gray-400">ریال</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">نزدیک سررسید</p>
          <p className="text-lg font-bold text-amber-600">۳</p>
          <p className="text-[10px] text-gray-400">چک</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">سررسید گذشته</p>
          <p className="text-lg font-bold text-red-600">۰</p>
          <p className="text-[10px] text-gray-400">چک</p>
        </div>
      </div>

      {/* Content */}
      {activeTab === 'transactions' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="flex-1 relative">
                <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" placeholder="جست‌وجو..." className="w-full pr-9 pl-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-100" />
              </div>
            </div>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-right py-3 px-4 text-gray-500 font-medium">تاریخ</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">نوع</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">حساب</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">مبلغ</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">شرح</th>
              </tr>
            </thead>
            <tbody>
              {cashTransactions.map((t) => (
                <tr key={t.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-500">{t.date}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                      t.type === 'دریافت' ? 'bg-green-100 text-green-600' :
                      t.type === 'پرداخت' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>{t.type}</span>
                  </td>
                  <td className="py-3 px-4 font-medium">{t.account}</td>
                  <td className="py-3 px-4 font-medium">{t.amount} <span className="text-[10px] text-gray-400">ریال</span></td>
                  <td className="py-3 px-4 text-gray-500">{t.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'checks' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-right py-3 px-4 text-gray-500 font-medium">شماره</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">نوع</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">طرف</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">بانک</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">مبلغ</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">سررسید</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {checks.map((c) => (
                <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 font-mono text-xs text-indigo-600">{c.number}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] ${c.type === 'دریافتی' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{c.type}</span>
                  </td>
                  <td className="py-3 px-4 font-medium">{c.party}</td>
                  <td className="py-3 px-4 text-gray-500">{c.bank}</td>
                  <td className="py-3 px-4 font-medium">{c.amount}</td>
                  <td className="py-3 px-4 text-gray-500">{c.dueDate}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                      c.status === 'وصول شده' ? 'bg-green-100 text-green-600' :
                      c.status === 'در انتظار وصول' ? 'bg-amber-100 text-amber-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>{c.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab !== 'transactions' && activeTab !== 'checks' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <CreditCard size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">این بخش آماده پیاده‌سازی است</p>
          <p className="text-xs text-gray-400 mt-2">عملیات مربوط به این بخش در نسخه نهایی فعال خواهد شد</p>
        </div>
      )}
    </div>
  );
}
