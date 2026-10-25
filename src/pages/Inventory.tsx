import { Plus, Search, Filter, Package, ArrowRightLeft, AlertTriangle, BarChart3, ClipboardList } from 'lucide-react';
import { useState } from 'react';

const items = [
  { id: 1, code: 'ITM-001', name: 'لپ‌تاپ ایسوس VivoBook', group: 'لپ‌تاپ', unit: 'عدد', stock: 2, minStock: 5, price: '۴۵,۰۰۰,۰۰۰', warehouse: 'انبار مرکزی' },
  { id: 2, code: 'ITM-002', name: 'ماوس بی‌سیم لاجیتک', group: 'لوازم جانبی', unit: 'عدد', stock: 45, minStock: 10, price: '۸۵۰,۰۰۰', warehouse: 'انبار مرکزی' },
  { id: 3, code: 'ITM-003', name: 'کیبورد مکانیکال', group: 'لوازم جانبی', unit: 'عدد', stock: 18, minStock: 8, price: '۲,۵۰۰,۰۰۰', warehouse: 'انبار شعبه ۱' },
  { id: 4, code: 'ITM-004', name: 'مانیتور ۲۷ اینچ', group: 'مانیتور', unit: 'عدد', stock: 7, minStock: 5, price: '۱۸,۰۰۰,۰۰۰', warehouse: 'انبار مرکزی' },
  { id: 5, code: 'ITM-005', name: 'کابل HDMI 2m', group: 'کابل', unit: 'عدد', stock: 5, minStock: 20, price: '۱۵۰,۰۰۰', warehouse: 'انبار شعبه ۲' },
  { id: 6, code: 'ITM-006', name: 'هارد اکسترنال ۱TB', group: 'ذخیره‌سازی', unit: 'عدد', stock: 12, minStock: 5, price: '۳,۲۰۰,۰۰۰', warehouse: 'انبار مرکزی' },
  { id: 7, code: 'ITM-007', name: 'فلش مموری ۶۴GB', group: 'ذخیره‌سازی', unit: 'عدد', stock: 3, minStock: 15, price: '۴۵۰,۰۰۰', warehouse: 'انبار شعبه ۱' },
];

const movements = [
  { id: 1, date: '۱۴۰۴/۰۴/۱۴', item: 'لپ‌تاپ ایسوس', type: 'ورود', qty: 5, warehouse: 'انبار مرکزی', ref: 'INV-P-567' },
  { id: 2, date: '۱۴۰۴/۰۴/۱۳', item: 'ماوس بی‌سیم', type: 'خروج', qty: 10, warehouse: 'انبار مرکزی', ref: 'INV-S-1237' },
  { id: 3, date: '۱۴۰۴/۰۴/۱۲', item: 'کابل HDMI', type: 'انتقال', qty: 20, warehouse: 'انبار مرکزی → شعبه ۲', ref: 'TRF-003' },
  { id: 4, date: '۱۴۰۴/۰۴/۱۱', item: 'مانیتور ۲۷', type: 'ورود', qty: 3, warehouse: 'انبار مرکزی', ref: 'INV-P-568' },
];

export default function Inventory() {
  const [activeTab, setActiveTab] = useState('items');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">انبار و کالا</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت موجودی و عملیات انبار</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white text-sm rounded-xl hover:shadow-lg transition-all">
          <Plus size={16} />
          کالای جدید
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 flex-wrap">
        {[
          { id: 'items', label: 'فهرست کالا', icon: <Package size={14} /> },
          { id: 'movements', label: 'گردش انبار', icon: <ArrowRightLeft size={14} /> },
          { id: 'receipt', label: 'رسید ورود', icon: <Plus size={14} /> },
          { id: 'issue', label: 'حواله خروج', icon: <ArrowRightLeft size={14} /> },
          { id: 'stocktake', label: 'انبارگردانی', icon: <ClipboardList size={14} /> },
          { id: 'lowstock', label: 'کم‌موجود', icon: <AlertTriangle size={14} /> },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm transition-all ${
              activeTab === tab.id
                ? 'bg-cyan-500 text-white shadow-md'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-cyan-50'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">تعداد کالا</p>
          <p className="text-lg font-bold text-gray-700">۱,۲۵۰</p>
          <p className="text-[10px] text-gray-400">قلم</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">ارزش موجودی</p>
          <p className="text-lg font-bold text-cyan-600">۸۵۰M</p>
          <p className="text-[10px] text-gray-400">ریال</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">کم‌موجود</p>
          <p className="text-lg font-bold text-amber-600">۸</p>
          <p className="text-[10px] text-gray-400">قلم</p>
        </div>
        <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
          <p className="text-[10px] text-gray-400">گردش امروز</p>
          <p className="text-lg font-bold text-blue-600">۱۲</p>
          <p className="text-[10px] text-gray-400">عملیات</p>
        </div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex-1 min-w-[200px] relative">
            <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="جست‌وجوی کالا..."
              className="w-full pr-9 pl-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-100 focus:border-cyan-400 outline-none"
            />
          </div>
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none">
            <option>همه انبارها</option>
            <option>انبار مرکزی</option>
            <option>انبار شعبه ۱</option>
            <option>انبار شعبه ۲</option>
          </select>
          <select className="px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none">
            <option>همه گروه‌ها</option>
            <option>لپ‌تاپ</option>
            <option>لوازم جانبی</option>
          </select>
        </div>
      </div>

      {/* Items Table */}
      {activeTab === 'items' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-right py-3 px-4 text-gray-500 font-medium">کد</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">نام کالا</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">گروه</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">موجودی</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">حداقل</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">قیمت</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">انبار</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">وضعیت</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 font-mono text-xs text-cyan-600">{item.code}</td>
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4 text-gray-500">{item.group}</td>
                  <td className="py-3 px-4 font-medium">{item.stock} {item.unit}</td>
                  <td className="py-3 px-4 text-gray-500">{item.minStock}</td>
                  <td className="py-3 px-4">{item.price} <span className="text-[10px] text-gray-400">ریال</span></td>
                  <td className="py-3 px-4 text-gray-500">{item.warehouse}</td>
                  <td className="py-3 px-4">
                    {item.stock <= item.minStock ? (
                      <span className="flex items-center gap-1 text-red-500 text-xs">
                        <AlertTriangle size={12} /> کم‌موجود
                      </span>
                    ) : (
                      <span className="text-green-500 text-xs">موجود</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Movements */}
      {activeTab === 'movements' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="text-right py-3 px-4 text-gray-500 font-medium">تاریخ</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">کالا</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">نوع</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">تعداد</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">انبار</th>
                <th className="text-right py-3 px-4 text-gray-500 font-medium">سند مرجع</th>
              </tr>
            </thead>
            <tbody>
              {movements.map((m) => (
                <tr key={m.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 text-gray-500">{m.date}</td>
                  <td className="py-3 px-4 font-medium">{m.item}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${
                      m.type === 'ورود' ? 'bg-green-100 text-green-600' :
                      m.type === 'خروج' ? 'bg-red-100 text-red-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>{m.type}</span>
                  </td>
                  <td className="py-3 px-4">{m.qty}</td>
                  <td className="py-3 px-4 text-gray-500">{m.warehouse}</td>
                  <td className="py-3 px-4 font-mono text-xs text-cyan-600">{m.ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab !== 'items' && activeTab !== 'movements' && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <Package size={48} className="mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">این بخش آماده پیاده‌سازی است</p>
          <p className="text-xs text-gray-400 mt-2">عملیات مربوط به این بخش در نسخه نهایی فعال خواهد شد</p>
        </div>
      )}
    </div>
  );
}
