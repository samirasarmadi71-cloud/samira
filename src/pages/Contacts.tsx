import { useState } from 'react';
import { Users, UserPlus, Search, Filter, Edit, Trash2, Eye, Phone, MapPin, Mail, MoreVertical, Building } from 'lucide-react';

const contacts = [
  { id: 1, code: 'C-001', name: 'شرکت آلفا', type: 'مشتری', phone: '۰۲۱-۸۸۷۷۶۶۵۵', city: 'تهران', balance: '۱۲,۵۰۰,۰۰۰', status: 'فعال', color: 'from-blue-400 to-blue-600' },
  { id: 2, code: 'C-002', name: 'تأمین‌کننده بتا', type: 'تأمین‌کننده', phone: '۰۳۱-۳۳۴۴۵۵۶۶', city: 'اصفهان', balance: '۸,۲۰۰,۰۰۰', status: 'فعال', color: 'from-emerald-400 to-emerald-600' },
  { id: 3, code: 'C-003', name: 'شرکت گاما', type: 'مشتری', phone: '۰۷۱-۳۲۱۱۲۲۳۳', city: 'شیراز', balance: '۵,۰۰۰,۰۰۰', status: 'فعال', color: 'from-violet-400 to-violet-600' },
  { id: 4, code: 'C-004', name: 'فروشگاه دلتا', type: 'مشتری، تأمین‌کننده', phone: '۰۴۱-۳۳۲۲۱۱۰۰', city: 'تبریز', balance: '۳,۸۰۰,۰۰۰', status: 'فعال', color: 'from-amber-400 to-amber-600' },
  { id: 5, code: 'C-005', name: 'شرکت اپسیلون', type: 'تأمین‌کننده', phone: '۰۶۱-۳۳۸۸۷۷۶۶', city: 'اهواز', balance: '۱۵,۰۰۰,۰۰۰', status: 'غیرفعال', color: 'from-gray-400 to-gray-600' },
  { id: 6, code: 'C-006', name: 'بازار زتا', type: 'مشتری', phone: '۰۵۱-۳۸۴۴۵۵۶۶', city: 'مشهد', balance: '۷,۳۰۰,۰۰۰', status: 'فعال', color: 'from-rose-400 to-rose-600' },
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
          <h1 className="text-2xl font-black text-gray-800">معرفی اشخاص</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت مشتریان و تأمین‌کنندگان</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm rounded-2xl hover:shadow-lg hover:shadow-violet-500/30 transition-all active:scale-95">
          <UserPlus size={16} />
          شخص جدید
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جست‌وجوی شخص..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pr-9 pl-3 py-2.5 text-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-violet-100 focus:border-violet-400 outline-none transition-all"
            />
          </div>
          <select className="px-4 py-2.5 text-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-violet-100 outline-none">
            <option>همه انواع</option>
            <option>مشتری</option>
            <option>تأمین‌کننده</option>
          </select>
          <select className="px-4 py-2.5 text-sm border border-gray-200 rounded-2xl focus:ring-2 focus:ring-violet-100 outline-none">
            <option>همه شهرها</option>
            <option>تهران</option>
            <option>اصفهان</option>
            <option>شیراز</option>
          </select>
          <button className="flex items-center gap-1.5 px-4 py-2.5 bg-gray-100 text-gray-600 text-sm rounded-2xl hover:bg-gray-200 transition-all">
            <Filter size={14} /> فیلتر بیشتر
          </button>
          <div className="flex border border-gray-200 rounded-2xl overflow-hidden">
            <button onClick={() => setView('list')} className={`px-4 py-2.5 text-xs font-medium transition-all ${view === 'list' ? 'bg-violet-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>لیست</button>
            <button onClick={() => setView('cards')} className={`px-4 py-2.5 text-xs font-medium transition-all ${view === 'cards' ? 'bg-violet-500 text-white' : 'bg-white text-gray-500 hover:bg-gray-50'}`}>کارت</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-3xl p-4 border border-gray-100/80 shadow-sm card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
              <Users size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">کل اشخاص</p>
              <p className="text-lg font-black text-gray-700">۶</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-4 border border-gray-100/80 shadow-sm card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-green-600 flex items-center justify-center">
              <Building size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">مشتریان</p>
              <p className="text-lg font-black text-emerald-600">۴</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-4 border border-gray-100/80 shadow-sm card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center">
              <Users size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">تأمین‌کنندگان</p>
              <p className="text-lg font-black text-amber-600">۳</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-4 border border-gray-100/80 shadow-sm card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center">
              <Mail size={18} className="text-white" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">کل مطالبات</p>
              <p className="text-lg font-black text-violet-600">۵۱.۸M</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Table */}
      {view === 'list' ? (
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">کد</th>
                <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">نام</th>
                <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">نوع</th>
                <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">تلفن</th>
                <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">شهر</th>
                <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">مانده</th>
                <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">وضعیت</th>
                <th className="text-right py-4 px-5 text-gray-500 font-medium text-xs">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {filteredContacts.map((contact, idx) => (
                <tr key={contact.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${idx % 2 === 0 ? '' : 'bg-gray-50/30'}`}>
                  <td className="py-3.5 px-5">
                    <span className="text-xs font-mono bg-gray-100 px-2 py-1 rounded-lg text-gray-600">{contact.code}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${contact.color} flex items-center justify-center text-white text-xs font-bold`}>
                        {contact.name[0]}
                      </div>
                      <span className="font-medium text-gray-700">{contact.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                      contact.type === 'مشتری' ? 'bg-blue-50 text-blue-600' :
                      contact.type === 'تأمین‌کننده' ? 'bg-emerald-50 text-emerald-600' :
                      'bg-violet-50 text-violet-600'
                    }`}>{contact.type}</span>
                  </td>
                  <td className="py-3.5 px-5 text-gray-500 text-xs">{contact.phone}</td>
                  <td className="py-3.5 px-5 text-gray-500 text-xs">{contact.city}</td>
                  <td className="py-3.5 px-5 font-bold text-gray-700 text-xs">{contact.balance} <span className="text-gray-400 font-normal">ریال</span></td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${
                      contact.status === 'فعال' ? 'bg-green-50 text-green-600 border border-green-200' : 'bg-red-50 text-red-600 border border-red-200'
                    }`}>{contact.status}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1">
                      <button className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors">
                        <Eye size={13} className="text-blue-500" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-amber-50 hover:bg-amber-100 flex items-center justify-center transition-colors">
                        <Edit size={13} className="text-amber-500" />
                      </button>
                      <button className="w-7 h-7 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors">
                        <Trash2 size={13} className="text-red-500" />
                      </button>
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
            <div key={contact.id} className="bg-white rounded-3xl border border-gray-100/80 shadow-sm p-5 card-hover">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${contact.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                    {contact.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-gray-800">{contact.name}</h3>
                    <p className="text-[10px] text-gray-400">{contact.code}</p>
                  </div>
                </div>
                <span className={`text-[10px] px-2 py-1 rounded-full font-medium ${
                  contact.status === 'فعال' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                }`}>{contact.status}</span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Phone size={12} /> {contact.phone}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <MapPin size={12} /> {contact.city}
                </div>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div>
                  <p className="text-[10px] text-gray-400">مانده حساب</p>
                  <p className="text-sm font-bold text-gray-700">{contact.balance} <span className="text-[10px] text-gray-400">ریال</span></p>
                </div>
                <div className="flex gap-1">
                  <button className="w-8 h-8 rounded-xl bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors">
                    <Eye size={14} className="text-blue-500" />
                  </button>
                  <button className="w-8 h-8 rounded-xl bg-amber-50 hover:bg-amber-100 flex items-center justify-center transition-colors">
                    <Edit size={14} className="text-amber-500" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
