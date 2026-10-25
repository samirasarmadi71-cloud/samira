import { Plus, Search, Filter, Eye, Edit, Lock, FileText, PenTool, Calendar, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

const documents = [
  { id: 1, number: 'ACC-890', date: '۱۴۰۴/۰۴/۱۴', description: 'ثبت فاکتور فروش #۱۲۳۴', debit: '۱۲,۵۰۰,۰۰۰', credit: '۱۲,۵۰۰,۰۰۰', lines: 3, status: 'قطعی', creator: 'مدیر مالی' },
  { id: 2, number: 'ACC-891', date: '۱۴۰۴/۰۴/۱۳', description: 'ثبت فاکتور خرید #۵۶۷', debit: '۸,۲۰۰,۰۰۰', credit: '۸,۲۰۰,۰۰۰', lines: 4, status: 'قطعی', creator: 'حسابدار' },
  { id: 3, number: 'ACC-892', date: '۱۴۰۴/۰۴/۱۲', description: 'دریافت وجه نقدی', debit: '۵,۰۰۰,۰۰۰', credit: '۵,۰۰۰,۰۰۰', lines: 2, status: 'تأییدشده', creator: 'حسابدار' },
  { id: 4, number: 'ACC-893', date: '۱۴۰۴/۰۴/۱۱', description: 'هزینه حمل و نقل', debit: '۱,۲۰۰,۰۰۰', credit: '۱,۲۰۰,۰۰۰', lines: 2, status: 'پیش‌نویس', creator: 'حسابدار' },
  { id: 5, number: 'ACC-894', date: '۱۴۰۴/۰۴/۱۰', description: 'سند اصلاحی فاکتور #۱۲۳۰', debit: '۳,۵۰۰,۰۰۰', credit: '۳,۵۰۰,۰۰۰', lines: 2, status: 'قطعی', creator: 'مدیر مالی' },
  { id: 6, number: 'ACC-895', date: '۱۴۰۴/۰۴/۰۹', description: 'ثبت حقوق و دستمزد', debit: '۴۵,۰۰۰,۰۰۰', credit: '۴۵,۰۰۰,۰۰۰', lines: 8, status: 'پیش‌نویس', creator: 'مدیر مالی' },
];

export default function Accounting() {
  const [activeTab, setActiveTab] = useState('all');
  const [showNewDoc, setShowNewDoc] = useState(false);

  const filteredDocs = activeTab === 'all' ? documents :
    activeTab === 'draft' ? documents.filter(d => d.status === 'پیش‌نویس') :
    activeTab === 'confirmed' ? documents.filter(d => d.status === 'تأییدشده') :
    activeTab === 'final' ? documents.filter(d => d.status === 'قطعی') :
    documents;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">اسناد حسابداری</h1>
          <p className="text-sm text-gray-500 mt-1">ثبت و مدیریت اسناد حسابداری</p>
        </div>
        <button
          onClick={() => setShowNewDoc(!showNewDoc)}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 text-white text-sm rounded-2xl hover:shadow-lg hover:shadow-fuchsia-500/30 transition-all active:scale-95"
        >
          <Plus size={16} />
          ثبت سند جدید
        </button>
      </div>

      {/* New Document Form */}
      {showNewDoc && (
        <div className="bg-white rounded-2xl shadow-sm border border-fuchsia-200 p-6 animate-fade-in">
          <h3 className="text-lg font-bold text-gray-700 mb-4">ثبت سند حسابداری جدید</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div>
              <label className="text-xs text-gray-500 mb-1 block">تاریخ</label>
              <input type="text" defaultValue="۱۴۰۴/۰۴/۱۵" className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-fuchsia-100" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">شماره سند</label>
              <input type="text" defaultValue="ACC-896" readOnly className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl bg-gray-50 outline-none" />
            </div>
            <div>
              <label className="text-xs text-gray-500 mb-1 block">دوره مالی</label>
              <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none">
                <option>سال مالی ۱۴۰۴</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-xs text-gray-500 mb-1 block">شرح سند</label>
            <input type="text" placeholder="شرح سند را وارد کنید..." className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-fuchsia-100" />
          </div>

          {/* Document Lines */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50">
                  <th className="text-right py-2 px-3 text-gray-500 font-medium text-xs">ردیف</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium text-xs">کد حساب</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium text-xs">نام حساب</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium text-xs">بدهکار</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium text-xs">بستانکار</th>
                  <th className="text-right py-2 px-3 text-gray-500 font-medium text-xs">شرح</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 text-gray-400">۱</td>
                  <td className="py-2 px-3"><input type="text" defaultValue="۱۱۰" className="w-16 px-2 py-1 border border-gray-200 rounded text-xs" /></td>
                  <td className="py-2 px-3"><input type="text" defaultValue="موجودی نقد" className="w-full px-2 py-1 border border-gray-200 rounded text-xs" /></td>
                  <td className="py-2 px-3"><input type="text" defaultValue="۱۰,۰۰۰,۰۰۰" className="w-28 px-2 py-1 border border-gray-200 rounded text-xs" /></td>
                  <td className="py-2 px-3"><input type="text" className="w-28 px-2 py-1 border border-gray-200 rounded text-xs" /></td>
                  <td className="py-2 px-3"><input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs" /></td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-2 px-3 text-gray-400">۲</td>
                  <td className="py-2 px-3"><input type="text" defaultValue="۴۱۰" className="w-16 px-2 py-1 border border-gray-200 rounded text-xs" /></td>
                  <td className="py-2 px-3"><input type="text" defaultValue="درآمد فروش" className="w-full px-2 py-1 border border-gray-200 rounded text-xs" /></td>
                  <td className="py-2 px-3"><input type="text" className="w-28 px-2 py-1 border border-gray-200 rounded text-xs" /></td>
                  <td className="py-2 px-3"><input type="text" defaultValue="۱۰,۰۰۰,۰۰۰" className="w-28 px-2 py-1 border border-gray-200 rounded text-xs" /></td>
                  <td className="py-2 px-3"><input type="text" className="w-full px-2 py-1 border border-gray-200 rounded text-xs" /></td>
                </tr>
              </tbody>
              <tfoot>
                <tr className="bg-gray-50 font-bold">
                  <td className="py-2 px-3" colSpan={3}>جمع</td>
                  <td className="py-2 px-3 text-blue-600">۱۰,۰۰۰,۰۰۰</td>
                  <td className="py-2 px-3 text-red-600">۱۰,۰۰۰,۰۰۰</td>
                  <td className="py-2 px-3">
                    <span className="text-green-500 text-xs flex items-center gap-1"><CheckCircle size={12} /> متوازن</span>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div className="flex gap-2">
            <button className="px-4 py-2 bg-fuchsia-500 text-white text-sm rounded-xl hover:bg-fuchsia-600">ذخیره پیش‌نویس</button>
            <button className="px-4 py-2 bg-green-500 text-white text-sm rounded-xl hover:bg-green-600">تأیید و ثبت</button>
            <button onClick={() => setShowNewDoc(false)} className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-xl hover:bg-gray-200">انصراف</button>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'all', label: 'همه اسناد', icon: <FileText size={14} />, count: documents.length },
          { id: 'draft', label: 'پیش‌نویس', icon: <PenTool size={14} />, count: documents.filter(d => d.status === 'پیش‌نویس').length },
          { id: 'confirmed', label: 'تأییدشده', icon: <CheckCircle size={14} />, count: documents.filter(d => d.status === 'تأییدشده').length },
          { id: 'final', label: 'قطعی', icon: <Lock size={14} />, count: documents.filter(d => d.status === 'قطعی').length },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-fuchsia-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-fuchsia-50'
            }`}
          >
            {tab.icon} {tab.label}
            <span className={`px-1.5 py-0.5 rounded-full text-[10px] ${activeTab === tab.id ? 'bg-white/20' : 'bg-gray-100'}`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">کل اسناد</p>
          <p className="text-lg font-bold text-gray-700">{documents.length}</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">جمع بدهکار</p>
          <p className="text-lg font-bold text-blue-600">۷۵.۴M</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">جمع بستانکار</p>
          <p className="text-lg font-bold text-red-600">۷۵.۴M</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">وضعیت تراز</p>
          <p className="text-lg font-bold text-green-600 flex items-center gap-1"><CheckCircle size={16} /> متوازن</p>
        </div>
      </div>

      {/* Documents Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="text-right py-3 px-4 text-gray-500 font-medium">شماره</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">تاریخ</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">شرح</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">بدهکار</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">بستانکار</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">ردیف</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">ثبت‌کننده</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">وضعیت</th>
              <th className="text-right py-3 px-4 text-gray-500 font-medium">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filteredDocs.map((doc) => (
              <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 font-mono text-xs text-fuchsia-600 font-medium">{doc.number}</td>
                <td className="py-3 px-4 text-gray-500">{doc.date}</td>
                <td className="py-3 px-4 font-medium">{doc.description}</td>
                <td className="py-3 px-4 text-blue-600">{doc.debit}</td>
                <td className="py-3 px-4 text-red-600">{doc.credit}</td>
                <td className="py-3 px-4 text-gray-500">{doc.lines}</td>
                <td className="py-3 px-4 text-gray-500">{doc.creator}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                    doc.status === 'قطعی' ? 'bg-green-100 text-green-600' :
                    doc.status === 'پیش‌نویس' ? 'bg-blue-100 text-blue-600' :
                    'bg-amber-100 text-amber-600'
                  }`}>{doc.status}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex gap-1">
                    <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Eye size={14} /></button>
                    {doc.status === 'پیش‌نویس' && (
                      <button className="p-1.5 rounded-lg hover:bg-fuchsia-50 text-fuchsia-500"><Edit size={14} /></button>
                    )}
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
