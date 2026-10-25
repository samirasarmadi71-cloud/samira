import { useState } from 'react';
import { Users, UserPlus, Search, Filter, Edit, Trash2, Eye, Phone, MapPin, Mail, MoreVertical } from 'lucide-react';

const contacts = [
  { id: 1, code: 'C-001', name: 'شرکت آلفا', type: 'مشتری', phone: '۰۲۱-۸۸۷۷۶۶۵۵', city: 'تهران', balance: '۱۲,۵۰۰,۰۰۰', status: 'فعال' },
  { id: 2, code: 'C-002', name: 'تأمین‌کننده بتا', type: 'تأمین‌کننده', phone: '۰۳۱-۳۳۴۴۵۵۶۶', city: 'اصفهان', balance: '۸,۲۰۰,۰۰۰', status: 'فعال' },
  { id: 3, code: 'C-003', name: 'شرکت گاما', type: 'مشتری', phone: '۰۷۱-۳۲۱۱۲۲۳۳', city: 'شیراز', balance: '۵,۰۰۰,۰۰۰', status: 'فعال' },
  { id: 4, code: 'C-004', name: 'فروشگاه دلتا', type: 'مشتری، تأمین‌کننده', phone: '۰۴۱-۳۳۲۲۱۱۰۰', city: 'تبریز', balance: '۳,۸۰۰,۰۰۰', status: 'فعال' },
  { id: 5, code: 'C-005', name: 'شرکت اپسیلون', type: 'تأمین‌کننده', phone: '۰۶۱-۳۳۸۸۷۷۶۶', city: 'اهواز', balance: '۱۵,۰۰۰,۰۰۰', status: 'غیرفعال' },
  { id: 6, code: 'C-006', name: 'بازار زتا', type: 'مشتری', phone: '۰۵۱-۳۸۴۴۵۵۶۶', city: 'مشهد', balance: '۷,۳۰۰,۰۰۰', status: 'فعال' },
];

export default function Contacts() {
  const [view, setView] = useState<'list' | 'cards'>('list');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredContacts = contacts.filter(c =>
    c.name.includes(searchTerm) || c.code.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">معرفی اشخاص</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت مشتریان و تأمین‌کنندگان</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-violet-600 text-white text-sm rounded-xl hover:shadow-lg transition-all">
          <UserPlus size={16} />
          شخص جدید
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جست‌وجوی شخص..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-9 pl-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-100 focus:border-violet-400 outline-none"
            />
          </div>
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-100 outline-none">
            <option>همه انواع</option>
            <option>مشتری</option>
            <option>تأمین‌کننده</option>
          </select>
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-violet-100 outline-none">
            <option>همه شهرها</option>
            <option>تهران</option>
            <option>اصفهان</option>
            <option>شیراز</option>
          </select>
          <button className="flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-600 text-sm rounded-xl hover:bg-gray-200">
            <Filter size={14} /> فیلتر بیشتر
          </button>
          <div className="flex border border-gray-200 rounded-xl overflow-hidden">
            <button onClick={() => setView('list')} className={`px-3 py-2 text-xs ${view === 'list' ? 'bg-violet-500 text-white' : 'bg-white text-gray-500'}`}>لیست</button>
            <button onClick={() => setView('cards')} className={`px-3 py-2 text-xs ${view === 'cards' ? 'bg-violet-500 text-white' : 'bg-white text-gray-500'}`}>کارت</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">کل اشخاص</p>
          <p className="text-lg font-bold text-gray-700">۶</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">مشتریان</p>
          <p className="text-lg font-bold text-blue-600">۴</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">تأمین‌کنندگان</p>
          <p className="text-lg font-bold text-emerald-600">۳</p>
        </div>
        <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">کل مطالبات</p>
          <p className="text-lg font-bold text-violet-600">۵۱.۸M</p>
        </div>
      </div>

      {/* Contacts Table */}
      {view === 'list' ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-right py-3 px-4 text-gray-500 font-medium">کد</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">نام</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">نوع</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">تلفن</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">شهر</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">مانده</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">وضعیت</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact) => (
                <tr key={contact.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-gray-500">{contact.code}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                        {contact.name.charAt(0)}
                      </div>
                      <span className="font-medium">{contact.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                      contact.type === 'مشتری' ? 'bg-blue-100 text-blue-600' :
                      contact.type === 'تأمین‌کننده' ? 'bg-emerald-100 text-emerald-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>{contact.type}</span>
                  </td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{contact.phone}</td>
                  <td className="py-3 px-4 text-gray-500">{contact.city}</td>
                  <td className="py-3 px-4 font-medium">{contact.balance} <span className="text-[10px] text-gray-400">ریال</span></td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] ${contact.status === 'فعال' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {contact.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Eye size={14} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500"><Edit size={14} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContacts.map((contact) => (
            <div key={contact.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-purple-500 flex items-center justify-center text-white font-bold">
                    {contact.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-700">{contact.name}</h3>
                    <p className="text-[10px] text-gray-400">{contact.code}</p>
                  </div>
                </div>
                <button className="p-1 rounded-lg hover:bg-gray-100"><MoreVertical size={16} className="text-gray-400" /></button>
              </div>
              <div className="space-y-2 text-xs text-gray-500">
                <div className="flex items-center gap-2"><Phone size={12} /> {contact.phone}</div>
                <div className="flex items-center gap-2"><MapPin size={12} /> {contact.city}</div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-400">مانده حساب</span>
                <span className="text-sm font-bold text-violet-600">{contact.balance} ریال</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
