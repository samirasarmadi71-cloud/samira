import { Users, Palette, Globe, Printer, Upload, HardDrive, History, Info, Save, Plus, Edit, Trash2, Key, Download as DownloadIcon } from 'lucide-react';
import { useState } from 'react';

const settingsSections = [
  { id: 'users', title: 'کاربران و مجوزها', icon: <Users size={20} />, color: 'from-blue-500 to-blue-600' },
  { id: 'appearance', title: 'ظاهر', icon: <Palette size={20} />, color: 'from-purple-500 to-purple-600' },
  { id: 'locale', title: 'تاریخ، ارقام و واحد پول', icon: <Globe size={20} />, color: 'from-teal-500 to-teal-600' },
  { id: 'print', title: 'قالب چاپ', icon: <Printer size={20} />, color: 'from-rose-500 to-rose-600' },
  { id: 'import', title: 'ورود و خروج Excel', icon: <Upload size={20} />, color: 'from-amber-500 to-amber-600' },
  { id: 'backup', title: 'پشتیبان‌گیری و بازیابی', icon: <HardDrive size={20} />, color: 'from-emerald-500 to-emerald-600' },
  { id: 'logs', title: 'سوابق عملیات', icon: <History size={20} />, color: 'from-indigo-500 to-indigo-600' },
  { id: 'about', title: 'اطلاعات نسخه', icon: <Info size={20} />, color: 'from-slate-500 to-slate-600' },
];

const users = [
  { id: 1, name: 'مدیر سیستم', username: 'admin', role: 'مدیر سیستم', status: 'فعال', lastLogin: '۱۴۰۴/۰۴/۱۵ - ۱۰:۳۰' },
  { id: 2, name: 'علی محمدی', username: 'ali.m', role: 'مدیر مالی', status: 'فعال', lastLogin: '۱۴۰۴/۰۴/۱۵ - ۰۹:۱۵' },
  { id: 3, name: 'مریم حسینی', username: 'maryam.h', role: 'حسابدار', status: 'فعال', lastLogin: '۱۴۰۴/۰۴/۱۴ - ۱۶:۴۵' },
  { id: 4, name: 'رضا کریمی', username: 'reza.k', role: 'انباردار', status: 'فعال', lastLogin: '۱۴۰۴/۰۴/۱۴ - ۱۴:۲۰' },
  { id: 5, name: 'سارا احمدی', username: 'sara.a', role: 'کاربر فروش', status: 'غیرفعال', lastLogin: '۱۴۰۴/۰۳/۲۸ - ۱۱:۰۰' },
];

const auditLogs = [
  { id: 1, user: 'مدیر سیستم', action: 'ورود به سیستم', target: '-', time: '۱۴۰۴/۰۴/۱۵ ۱۰:۳۰', result: 'موفق' },
  { id: 2, user: 'علی محمدی', action: 'ثبت فاکتور فروش', target: 'INV-S-1234', time: '۱۴۰۴/۰۴/۱۵ ۰۹:۲۰', result: 'موفق' },
  { id: 3, user: 'مریم حسینی', action: 'ثبت سند حسابداری', target: 'ACC-891', time: '۱۴۰۴/۰۴/۱۴ ۱۶:۵۰', result: 'موفق' },
  { id: 4, user: 'سارا احمدی', action: 'تلاش ورود', target: '-', time: '۱۴۰۴/۰۴/۱۴ ۱۵:۰۰', result: 'ناموفق' },
  { id: 5, user: 'رضا کریمی', action: 'رسید انبار', target: 'RCV-045', time: '۱۴۰۴/۰۴/۱۴ ۱۴:۲۵', result: 'موفق' },
  { id: 6, user: 'مدیر سیستم', action: 'پشتیبان‌گیری', target: 'backup_14040415', time: '۱۴۰۴/۰۴/۱۵ ۰۸:۰۰', result: 'موفق' },
];

const backupHistory = [
  { id: 1, date: '۱۴۰۴/۰۴/۱۵', time: '۰۸:۰۰', size: '۲۵.۳ MB', status: 'موفق', path: '/storage/backups/' },
  { id: 2, date: '۱۴۰۴/۰۴/۱۴', time: '۰۸:۰۰', size: '۲۴.۸ MB', status: 'موفق', path: '/storage/backups/' },
  { id: 3, date: '۱۴۰۴/۰۴/۱۳', time: '۰۸:۰۰', size: '۲۴.۵ MB', status: 'موفق', path: '/storage/backups/' },
];

export default function Settings() {
  const [activeSection, setActiveSection] = useState('users');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">تنظیمات</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت تنظیمات سیستم</p>
        </div>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {settingsSections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`p-4 rounded-xl border text-center transition-all ${
              activeSection === section.id
                ? 'bg-white shadow-lg border-blue-200 ring-2 ring-blue-100'
                : 'bg-white shadow-sm border-gray-100 hover:shadow-md'
            }`}
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white mx-auto mb-2 shadow-md`}>
              {section.icon}
            </div>
            <p className="text-xs font-bold text-gray-700">{section.title}</p>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fade-in">
        {activeSection === 'users' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-700">کاربران و مجوزها</h2>
              <button className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white text-xs rounded-xl hover:bg-blue-600">
                <Plus size={14} /> کاربر جدید
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">نام</th>
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">نام کاربری</th>
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">نقش</th>
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">وضعیت</th>
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">آخرین ورود</th>
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-3 font-medium">{user.name}</td>
                    <td className="py-3 px-3 text-gray-500 font-mono text-xs">{user.username}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-1 rounded-full text-[10px] bg-blue-100 text-blue-600">{user.role}</span>
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-1 rounded-full text-[10px] ${user.status === 'فعال' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{user.status}</span>
                    </td>
                    <td className="py-3 px-3 text-gray-500 text-xs">{user.lastLogin}</td>
                    <td className="py-3 px-3">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Edit size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500"><Key size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'appearance' && (
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">تنظیمات ظاهری</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">تم رنگی</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none">
                  <option>روشن</option>
                  <option>تیره</option>
                  <option>خودکار</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">اندازه فونت</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none">
                  <option>کوچک</option>
                  <option>متوسط</option>
                  <option>بزرگ</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">رنگ اصلی</label>
                <div className="flex gap-2">
                  {['bg-blue-500', 'bg-emerald-500', 'bg-violet-500', 'bg-rose-500', 'bg-amber-500'].map((color, idx) => (
                    <button key={idx} className={`w-8 h-8 rounded-full ${color} ${idx === 0 ? 'ring-2 ring-offset-2 ring-blue-300' : ''}`} />
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">تراکم رابط</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none">
                  <option>فشرده</option>
                  <option>معمولی</option>
                  <option>باز</option>
                </select>
              </div>
            </div>
            <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-blue-500 text-white text-sm rounded-xl hover:bg-blue-600">
              <Save size={14} /> ذخیره تنظیمات
            </button>
          </div>
        )}

        {activeSection === 'locale' && (
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">تاریخ، ارقام و واحد پول</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">نوع تقویم</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none">
                  <option>شمسی</option>
                  <option>میلادی</option>
                  <option>قمری</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">واحد پول</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none">
                  <option>ریال</option>
                  <option>تومان</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">تعداد اعشار</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none">
                  <option>۰</option>
                  <option>۲</option>
                  <option>۳</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">جداکننده هزارگان</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none">
                  <option>,</option>
                  <option>.</option>
                  <option>بدون جداکننده</option>
                </select>
              </div>
            </div>
            <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-teal-500 text-white text-sm rounded-xl hover:bg-teal-600">
              <Save size={14} /> ذخیره تنظیمات
            </button>
          </div>
        )}

        {activeSection === 'backup' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-700">پشتیبان‌گیری و بازیابی</h2>
              <div className="flex gap-2">
                <button className="flex items-center gap-1 px-3 py-2 bg-emerald-500 text-white text-xs rounded-xl hover:bg-emerald-600">
                  <HardDrive size={14} /> پشتیبان‌گیری الان
                </button>
                <button className="flex items-center gap-1 px-3 py-2 bg-blue-500 text-white text-xs rounded-xl hover:bg-blue-600">
                  <Upload size={14} /> بازیابی
                </button>
              </div>
            </div>
            <div className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-4">
              <p className="text-sm text-emerald-700 font-medium">آخرین پشتیبان: ۱۴۰۴/۰۴/۱۵ ساعت ۰۸:۰۰ - حجم: ۲۵.۳ MB</p>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">تاریخ</th>
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">ساعت</th>
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">حجم</th>
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">وضعیت</th>
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">مسیر</th>
                </tr>
              </thead>
              <tbody>
                {backupHistory.map((b) => (
                  <tr key={b.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-3">{b.date}</td>
                    <td className="py-3 px-3 text-gray-500">{b.time}</td>
                    <td className="py-3 px-3">{b.size}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-1 rounded-full text-[10px] bg-green-100 text-green-600">{b.status}</span>
                    </td>
                    <td className="py-3 px-3 font-mono text-xs text-gray-400">{b.path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'logs' && (
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">سوابق عملیات</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">کاربر</th>
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">عملیات</th>
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">هدف</th>
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">زمان</th>
                  <th className="text-right py-3 px-3 text-gray-500 font-medium">نتیجه</th>
                </tr>
              </thead>
              <tbody>
                {auditLogs.map((log) => (
                  <tr key={log.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-3 font-medium">{log.user}</td>
                    <td className="py-3 px-3">{log.action}</td>
                    <td className="py-3 px-3 font-mono text-xs text-gray-500">{log.target}</td>
                    <td className="py-3 px-3 text-gray-500 text-xs">{log.time}</td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-1 rounded-full text-[10px] ${log.result === 'موفق' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>{log.result}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'about' && (
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">اطلاعات نسخه</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <span className="text-sm text-gray-600">نام نرم‌افزار</span>
                <span className="text-sm font-bold text-gray-700">سیستم حسابداری سرمد</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <span className="text-sm text-gray-600">نسخه</span>
                <span className="text-sm font-bold text-gray-700">۱.۰.۰</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <span className="text-sm text-gray-600">تاریخ انتشار</span>
                <span className="text-sm font-bold text-gray-700">۱۴۰۴/۰۴/۱۵</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <span className="text-sm text-gray-600">پایگاه داده</span>
                <span className="text-sm font-bold text-gray-700">SQLite 3.x</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <span className="text-sm text-gray-600">سرور</span>
                <span className="text-sm font-bold text-gray-700">Node.js 20.x</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50">
                <span className="text-sm text-gray-600">وضعیت</span>
                <span className="px-2 py-1 rounded-full text-xs bg-green-100 text-green-600">فعال و آنلاین</span>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'print' && (
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">قالب چاپ</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-500 mb-1 block">قالب پیش‌فرض فاکتور</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none">
                  <option>قالب استاندارد</option>
                  <option>قالب سربرگ‌دار</option>
                  <option>قالب ساده</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-gray-500 mb-1 block">اندازه کاغذ</label>
                <select className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none">
                  <option>A4</option>
                  <option>A5</option>
                  <option>حرارتی ۸۰mm</option>
                </select>
              </div>
            </div>
            <button className="mt-4 flex items-center gap-2 px-4 py-2 bg-rose-500 text-white text-sm rounded-xl hover:bg-rose-600">
              <Save size={14} /> ذخیره تنظیمات
            </button>
          </div>
        )}

        {activeSection === 'import' && (
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">ورود و خروج Excel</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl border-2 border-dashed border-gray-200 text-center">
                <Upload size={32} className="mx-auto text-gray-300 mb-2" />
                <p className="text-sm text-gray-500">فایل Excel را اینجا بکشید</p>
                <p className="text-[10px] text-gray-400 mt-1">یا کلیک کنید</p>
                <button className="mt-2 px-3 py-1.5 bg-amber-500 text-white text-xs rounded-lg">انتخاب فایل</button>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600 font-medium">قالب‌های آماده:</p>
                {['قالب اشخاص', 'قالب کالاها', 'قالب حساب‌ها'].map((t, idx) => (
                  <button key={idx} className="w-full flex items-center justify-between p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
                    <span className="text-xs text-gray-600">{t}</span>
                    <DownloadIcon size={14} className="text-gray-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


