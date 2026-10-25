import { Package, Plus, Search, Filter, ArrowRightLeft, ClipboardList, AlertTriangle, BarChart3, FileText, Edit, Eye } from 'lucide-react';

const inventoryItems = [
  { id: 1, code: 'K-001', name: 'لپ‌تاپ ایسوس VivoBook', group: 'کالای دیجیتال', unit: 'عدد', stock: 2, min: 5, price: '۳۵,۰۰۰,۰۰۰', warehouse: 'انبار مرکزی', status: 'کم' },
  { id: 2, code: 'K-002', name: 'ماوس بی‌سیم لاجیتک', group: 'لوازم جانبی', unit: 'عدد', stock: 3, min: 10, price: '۸۵۰,۰۰۰', warehouse: 'انبار مرکزی', status: 'کم' },
  { id: 3, code: 'K-003', name: 'کابل HDMI 2 متر', group: 'لوازم جانبی', unit: 'عدد', stock: 5, min: 20, price: '۱۲۰,۰۰۰', warehouse: 'انبار شرق', status: 'کم' },
  { id: 4, code: 'K-004', name: 'مانیتور سامسونگ ۲۴ اینچ', group: 'کالای دیجیتال', unit: 'عدد', stock: 15, min: 5, price: '۱۲,۰۰۰,۰۰۰', warehouse: 'انبار مرکزی', status: 'نرمال' },
  { id: 5, code: 'K-005', name: 'کیبورد مکانیکی', group: 'لوازم جانبی', unit: 'عدد', stock: 28, min: 10, price: '۲,۵۰۰,۰۰۰', warehouse: 'انبار غرب', status: 'نرمال' },
  { id: 6, code: 'K-006', name: 'هارد اکسترنال ۱ ترابایت', group: 'ذخیره‌سازی', unit: 'عدد', stock: 42, min: 15, price: '۳,۸۰۰,۰۰۰', warehouse: 'انبار مرکزی', status: 'نرمال' },
  { id: 7, code: 'K-007', name: 'فلش مموری ۶۴ گیگ', group: 'ذخیره‌سازی', unit: 'عدد', stock: 85, min: 30, price: '۴۵۰,۰۰۰', warehouse: 'انبار شرق', status: 'نرمال' },
];

const quickActions = [
  { title: 'رسید ورود', icon: <ArrowRightLeft size={18} />, color: 'from-green-400 to-green-600', desc: 'ورود کالا به انبار' },
  { title: 'حواله خروج', icon: <ArrowRightLeft size={18} />, color: 'from-red-400 to-red-600', desc: 'خروج کالا از انبار' },
  { title: 'انتقال بین انبار', icon: <ArrowRightLeft size={18} />, color: 'from-blue-400 to-blue-600', desc: 'جابجایی بین انبارها' },
  { title: 'انبارگردانی', icon: <ClipboardList size={18} />, color: 'from-amber-400 to-amber-600', desc: 'شمارش موجودی' },
];

export default function Inventory() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">انبار و کالا</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت موجودی، کالاها و عملیات انبار</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-600 text-white text-sm rounded-2xl hover:shadow-lg hover:shadow-cyan-500/30 transition-all">
          <Plus size={16} />
          کالای جدید
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-100 flex items-center justify-center">
              <Package size={18} className="text-cyan-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">کل کالاها</p>
              <p className="text-lg font-black text-gray-800">۱,۲۵۰</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 flex items-center justify-center">
              <AlertTriangle size={18} className="text-red-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">کم‌موجود</p>
              <p className="text-lg font-black text-gray-800">۱۲</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-100 flex items-center justify-center">
              <BarChart3 size={18} className="text-green-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">ارزش موجودی</p>
              <p className="text-lg font-black text-gray-800">۸.۵ <span className="text-[10px] text-gray-400">میلیارد ریال</span></p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-4 card-hover">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center">
              <Package size={18} className="text-purple-600" />
            </div>
            <div>
              <p className="text-[10px] text-gray-400">تعداد انبارها</p>
              <p className="text-lg font-black text-gray-800">۳</p>
            </div>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 overflow-hidden">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h3 className="text-sm font-bold text-gray-800">فهرست کالا و موجودی</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">لیست کالاها و وضعیت موجودی</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50">
              <Search size={14} className="text-gray-400" />
              <input type="text" placeholder="جست‌وجوی کالا..." className="bg-transparent text-xs outline-none w-36" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-red-50 border border-red-200/50 text-xs text-red-600 hover:bg-red-100 transition-colors">
              <AlertTriangle size={14} />
              کم‌موجود (۳)
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">کد</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">نام کالا</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">گروه</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">موجودی</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">حداقل</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">قیمت (ریال)</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">انبار</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">وضعیت</th>
                <th className="text-right py-3 px-5 text-[11px] font-bold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.map((item) => (
                <tr key={item.id} className={`border-b border-gray-50 hover:bg-gray-50/50 transition-colors ${item.status === 'کم' ? 'bg-red-50/30' : ''}`}>
                  <td className="py-3 px-5 text-xs font-mono font-bold text-gray-600">{item.code}</td>
                  <td className="py-3.5 px-5 text-xs font-medium text-gray-800">{item.name}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{item.group}</td>
                  <td className="py-3.5 px-5">
                    <span className={`text-xs font-bold ${item.stock <= item.min ? 'text-red-600' : 'text-gray-700'}`}>
                      {item.stock} {item.unit}
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{item.min} {item.unit}</td>
                  <td className="py-3.5 px-5 text-xs font-bold text-gray-700">{item.price}</td>
                  <td className="py-3.5 px-5 text-xs text-gray-500">{item.warehouse}</td>
                  <td className="py-3.5 px-5">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      item.status === 'کم' ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'
                    }`}>{item.status}</span>
                  </td>
                  <td className="py-3.5 px-5">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Eye size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-amber-50 text-amber-500 transition-colors"><Edit size={13} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><FileText size={13} /></button>
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
