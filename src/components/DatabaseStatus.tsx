import { useState, useEffect } from 'react';
import { Database, CheckCircle, AlertCircle, X } from 'lucide-react';
import { getDatabaseType } from '../database/db';

interface DatabaseStatusProps {
  onClose: () => void;
}

export default function DatabaseStatus({ onClose }: DatabaseStatusProps) {
  const [dbType, setDbType] = useState<string>('');

  useEffect(() => {
    setDbType(getDatabaseType());
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg">
              <Database size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-gray-800">وضعیت پایگاه داده</h2>
              <p className="text-xs text-gray-500">اطلاعات سیستم ذخیره‌سازی</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
          >
            <X size={16} className="text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Database Type */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                {dbType === 'sqlite' ? (
                  <CheckCircle size={20} className="text-green-600" />
                ) : (
                  <AlertCircle size={20} className="text-amber-600" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800 mb-1">
                  {dbType === 'sqlite' ? 'SQLite فعال است' : 'LocalStorage فعال است'}
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {dbType === 'sqlite' 
                    ? 'سیستم با موفقیت به پایگاه داده SQLite متصل شده است. تمام عملیات به صورت کامل پشتیبانی می‌شوند.'
                    : 'سیستم در حالت LocalStorage کار می‌کند. عملیات پایه پشتیبانی می‌شوند اما برخی ویژگی‌های پیشرفته ممکن است محدود باشند.'}
                </p>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-[10px] text-gray-500 mb-1">نوع پایگاه داده</p>
              <p className="text-sm font-bold text-gray-800">
                {dbType === 'sqlite' ? 'SQLite (WASM)' : 'LocalStorage'}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gray-50 border border-gray-100">
              <p className="text-[10px] text-gray-500 mb-1">وضعیت</p>
              <p className="text-sm font-bold text-green-600">فعال ✓</p>
            </div>
          </div>

          {/* Features */}
          <div className="p-4 rounded-2xl bg-gray-50 border border-gray-100">
            <h4 className="text-xs font-bold text-gray-700 mb-3">ویژگی‌های پشتیبانی شده:</h4>
            <div className="space-y-2">
              {[
                'ذخیره‌سازی محلی داده‌ها',
                'پشتیبان‌گیری و بازیابی',
                'جست‌وجو و فیلتر',
                'خروجی Excel',
                'چاپ فاکتور',
                'مدیریت کاربران'
              ].map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                  <span className="text-xs text-gray-600">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tips */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-100">
            <h4 className="text-xs font-bold text-amber-800 mb-2 flex items-center gap-2">
              <AlertCircle size={14} />
              نکات مهم
            </h4>
            <ul className="space-y-1.5 text-[11px] text-amber-700">
              <li>• به صورت دوره‌ای از داده‌ها پشتیبان بگیرید</li>
              <li>• فایل پشتیبان را در محل امن نگهداری کنید</li>
              <li>• از پاک کردن حافظه مرورگر خودداری کنید</li>
              <li>• برای انتقال داده‌ها، از قابلیت پشتیبان‌گیری استفاده کنید</li>
            </ul>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-100 bg-gray-50/50">
          <button
            onClick={onClose}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all"
          >
            متوجه شدم
          </button>
        </div>
      </div>
    </div>
  );
}
