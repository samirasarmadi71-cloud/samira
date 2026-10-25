import { Users, UserPlus, Search, Filter, Phone, Mail, MapPin, MoreVertical, Eye, Edit, Trash2, Building } from 'lucide-react';

const contacts = [
  { id: 1, name: 'شرکت آلفا تکنولوژی', code: 'SH-001', type: 'مشتری', phone: '۰۲۱-۸۸۷۷۶۶۵۵', balance: '۱۲,۵۰۰,۰۰۰', status: 'فعال', city: 'تهران' },
  { id: 2, name: 'تأمین‌کننده بتا', code: 'SH-002', type: 'تأمین‌کننده', phone: '۰۳۱-۳۳۴۴۵۵۶۶', balance: '۸,۲۰۰,۰۰۰', status: 'فعال', city: 'اصفهان' },
  { id: 3, name: 'شرکت گاما تجارت', code: 'SH-003', type: 'مشتری', phone: '۰۴۱-۴۴۵۵۶۶۷۷', balance: '۵,۰۰۰,۰۰۰', status: 'فعال', city: 'تبریز' },
  { id: 4, name: 'فروشگاه دلتا', code: 'SH-004', type: 'مشتری و تأمین‌کننده', phone: '۰۵۱-۵۵۶۶۷۷۸۸', balance: '۳,۸۰۰,۰۰۰', status: 'فعال', city: 'مشهد' },
  { id: 5, name: 'شرکت اپسیلون', code: 'SH-005', type: 'مشتری', phone: '۰۲۶-۶۶۷۷۸۸۹۹', balance: '۰', status: 'غیرفعال', city: 'کرج' },
  { id: 6, name: 'بازرگانی زتا', code: 'SH-006', type: 'تأمین‌کننده', phone: '۰۲۱-۷۷۸۸۹۹۰۰', balance: '۱۵,۰۰۰,۰۰۰', status: 'فعال', city: 'تهران' },
];

export default function Contacts() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">معرفی اشخاص</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت مشتریان، تأمین‌کنندگان و طرف‌حساب‌ها</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white text-sm rounded-2xl hover:shadow-lg hover:shadow-violet-500/30 transition-all">
          <UserPlus size={16} />
          شخص جدید
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center">
              <Users size={18} className="text-blue-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">کل اشخاص</p>
              <p className="text-lg font-black text-gray-800">۱۲۸</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <Users size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">مشتریان</p>
              <p className="text-lg font-black text-gray-800">۸۵</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
              <Building size={18} className="text-amber-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">تأمین‌کنندگان</p>
              <p className="text-lg font-black text-gray-800">۴۳</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-violet-100 flex items-center justify-center">
              <Users size={18} className="text-violet-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">فعال</p>
              <p className="text-lg font-black text-gray-800">۱۲۰</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-3">
        <div className="flex-1 flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-gray-200/50 shadow-sm">
          <Search size={16} className="text-gray-400" />
          <input type="text" placeholder="جست‌وجوی نام، کد یا شماره تماس..." className="bg-transparent text-sm outline-none w-full" />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-white border border-gray-200/50 shadow-sm text-sm text-gray-600 hover:bg-gray-50 transition-colors">
          <Filter size={16} />
          فیلتر
        </button>
      </div>

      {/* Contacts Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">کد</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">نام</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">نوع</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">تلفن</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">شهر</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">مانده (ریال)</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">وضعیت</th>
                <th className="text-right py-3.5 px-5 text-[11px] font-bold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-5 text-xs font-mono font-bold text-gray-600">{contact.code}</td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-400 to-purple-600 flex items-center justify-center text-white text-[10px] font-bold">
                        {contact.name.charAt(0)}
                      </div>
                      <span className="text-xs font-medium text-gray-800">{contact.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      contact.type === 'مشتری' ? 'bg-blue-50 text-blue-600' :
                      contact.type === 'تأمین‌کننده' ? 'bg-amber-50 text-amber-600' :
                      'bg-purple-50 text-purple-600'
                    }`}>{contact.type}</span>
                  </td>
                  <td className="py-3.5 px-5 text-xs text-gray-600">{contact.phone}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{contact.city}</td>
                  <td className="py-3.5 px-5 text-xs font-bold text-gray-700">{contact.balance}</td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      contact.status === 'فعال' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>{contact.status}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors" title="مشاهده"><Eye size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors" title="ویرایش"><Edit size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors" title="حذف"><Trash2 size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-100">
          <span className="text-[11px] text-gray-400">نمایش ۱ تا ۶ از ۱۲۸ مورد</span>
          <div className="flex items-center gap-1">
            <button className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 text-xs hover:bg-gray-200 transition-colors">قبلی</button>
            <button className="w-8 h-8 rounded-lg bg-blue-500 text-white text-xs font-bold">۱</button>
            <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-600 text-xs hover:bg-gray-100 transition-colors">۲</button>
            <button className="w-8 h-8 rounded-lg bg-gray-50 text-gray-600 text-xs hover:bg-gray-100 transition-colors">۳</button>
            <button className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 text-xs hover:bg-gray-200 transition-colors">بعدی</button>
          </div>
        </div>
      </div>
    </div>
  );
}
