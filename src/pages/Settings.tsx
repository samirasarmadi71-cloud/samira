import { useState } from 'react';
import { Settings as SettingsIcon, Users, Palette, Globe, Printer, Upload, HardDrive, History, Info, Shield, Save, ChevronLeft, User, Lock, Bell, Database, Download, RefreshCw } from 'lucide-react';
import { backupDatabase, execQuery } from '../database/db';

const settingsSections = [
  { title: 'کاربران و مجوزها', desc: 'مدیریت کاربران، نقش‌ها و دسترسی‌ها', icon: <Users size={20} />, color: 'from-blue-400 to-blue-600', count: '۵ کاربر' },
  { title: 'ظاهر سیستم', desc: 'تنظیمات نمایشی و قالب', icon: <Palette size={20} />, color: 'from-purple-400 to-purple-600', count: '' },
  { title: 'تاریخ، ارقام و واحد پول', desc: 'فرمت تاریخ و نمایش اعداد', icon: <Globe size={20} />, color: 'from-emerald-400 to-emerald-600', count: '' },
  { title: 'قالب چاپ', desc: 'طراحی و تنظیم قالب‌های چاپی', icon: <Printer size={20} />, color: 'from-rose-400 to-rose-600', count: '۴ قالب' },
  { title: 'ورود و خروج Excel', desc: 'تنظیمات واردسازی و خروجی', icon: <Upload size={20} />, color: 'from-green-400 to-green-600', count: '' },
  { title: 'پشتیبان‌گیری و بازیابی', desc: 'مدیریت پشتیبان‌ها', icon: <HardDrive size={20} />, color: 'from-amber-400 to-amber-600', count: '۳ پشتیبان' },
  { title: 'سوابق عملیات', desc: 'ردپای حسابرسی', icon: <History size={20} />, color: 'from-indigo-400 to-indigo-600', count: '۱,۲۴۰ مورد' },
  { title: 'اطلاعات نسخه', desc: 'نسخه و مجوز نرم‌افزار', icon: <Info size={20} />, color: 'from-cyan-400 to-cyan-600', count: 'v1.0' },
];

const users = [
  { name: 'مدیر سیستم', role: 'مدیر', status: 'فعال', lastLogin: '۱۴۰۴/۰۴/۱۵ - ۱۰:۳۰', email: 'admin@sarmad.ir' },
  { name: 'علی احمدی', role: 'مدیر مالی', status: 'فعال', lastLogin: '۱۴۰۴/۰۴/۱۵ - ۰۹:۱۵', email: 'ali@sarmad.ir' },
  { name: 'مریم رضایی', role: 'حسابدار', status: 'فعال', lastLogin: '۱۴۰۴/۰۴/۱۴ - ۱۶:۴۵', email: 'maryam@sarmad.ir' },
  { name: 'حسن محمدی', role: 'انباردار', status: 'فعال', lastLogin: '۱۴۰۴/۰۴/۱۴ - ۱۴:۲۰', email: 'hasan@sarmad.ir' },
  { name: 'زهرا کریمی', role: 'کاربر فروش', status: 'غیرفعال', lastLogin: '۱۴۰۴/۰۳/۲۸ - ۱۱:۰۰', email: 'zahra@sarmad.ir' },
];

const backupHistory = [
  { date: '۱۴۰۴/۰۴/۱۵', time: '۰۸:۰۰', size: '۲۵ مگابایت', status: 'موفق', type: 'خودکار' },
  { date: '۱۴۰۴/۰۴/۱۴', time: '۲۰:۰۰', size: '۲۴.۸ مگابایت', status: 'موفق', type: 'خودکار' },
  { date: '۱۴۰۴/۰۴/۱۳', time: '۱۵:۳۰', size: '۲۴.۵ مگابایت', status: 'موفق', type: 'دستی' },
];

export default function Settings() {
  const [backupStatus, setBackupStatus] = useState('');

  const handleBackup = () => {
    try {
      const data = backupDatabase();
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `sarmad_backup_${new Date().toISOString().split('T')[0]}.sqlite`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setBackupStatus('پشتیبان‌گیری با موفقیت انجام شد');
      setTimeout(() => setBackupStatus(''), 3000);
    } catch (e) {
      setBackupStatus('خطا در پشتیبان‌گیری');
      setTimeout(() => setBackupStatus(''), 3000);
    }
  };

  const getDbSize = () => {
    try {
      const data = localStorage.getItem('sarmad_sqlite_db');
      if (data) {
        const size = (data.length * 2) / 1024 / 1024; // rough estimate in MB
        return `${size.toFixed(2)} مگابایت`;
      }
      return 'نامشخص';
    } catch {
      return 'نامشخص';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">تنظیمات</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت تنظیمات سیستم، کاربران و پشتیبان‌گیری</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-slate-500 to-gray-700 text-white text-sm rounded-2xl hover:shadow-lg hover:shadow-slate-500/30 transition-all">
          <Save size={16} />
          ذخیره تغییرات
        </button>
      </div>

      {/* Settings Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {settingsSections.map((section, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover cursor-pointer group">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                {section.icon}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xs font-bold text-gray-800">{section.title}</h3>
                <p className="text-[10px] text-gray-400 mt-0.5">{section.desc}</p>
                {section.count && <span className="text-[9px] text-blue-500 bg-blue-50 px-1.5 py-0.5 rounded-full mt-1 inline-block">{section.count}</span>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Users Management */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800">کاربران سیستم</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">مدیریت کاربران و نقش‌های دسترسی</p>
          </div>
          <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-50 border border-blue-200/50 text-xs text-blue-600 hover:bg-blue-100 transition-colors">
            <Users size={14} />
            کاربر جدید
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">نام</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">نقش</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">ایمیل</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">آخرین ورود</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">وضعیت</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-slate-400 to-slate-600 flex items-center justify-center text-white text-[10px] font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <span className="text-xs font-medium text-gray-800">{user.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 font-medium">{user.role}</span>
                  </td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{user.email}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{user.lastLogin}</td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      user.status === 'فعال' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                    }`}>{user.status}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><User size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"><Lock size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-400 transition-colors"><Shield size={13} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Backup History */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800">پشتیبان‌گیری و بازیابی</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">تاریخچه پشتیبان‌ها</p>
          </div>
          <div className="flex items-center gap-2">
            <button 
              onClick={handleBackup}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-green-50 border border-green-200/50 text-xs text-green-600 hover:bg-green-100 transition-colors">
              <Download size={14} />
              پشتیبان‌گیری SQLite
            </button>
            <div className="text-[10px] text-gray-400">حجم DB: {getDbSize()}</div>
            {backupStatus && (
              <span className="text-[10px] text-green-600 bg-green-50 px-2 py-1 rounded-full">{backupStatus}</span>
            )}
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">تاریخ</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">ساعت</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">حجم</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">نوع</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {backupHistory.map((backup, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-5 text-xs text-gray-700">{backup.date}</td>
                  <td className="py-3 px-5 text-xs text-gray-600">{backup.time}</td>
                  <td className="py-3 px-5 text-xs text-gray-600">{backup.size}</td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      backup.type === 'خودکار' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}>{backup.type}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">{backup.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Version Info */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Info size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800">سیستم حسابداری سرمد</h3>
            <p className="text-xs text-gray-500 mt-0.5">نسخه ۱.۰.۰ | پایگاه داده: SQLite | Node.js</p>
            <p className="text-[10px] text-gray-400 mt-1">حالت اجرا: آفلاین محلی | آخرین بروزرسانی: ۱۴۰۴/۰۴/۱۵</p>
          </div>
        </div>
      </div>
    </div>
  );
}
