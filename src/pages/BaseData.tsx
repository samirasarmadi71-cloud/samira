import { Building2, Calendar, Tags, Ruler, Warehouse, Landmark, FileText, CreditCard, Hash, Plus, Edit, Search, Filter } from 'lucide-react';

const baseDataItems = [
  { title: 'اطلاعات شرکت', desc: 'نام، نشانی، تلفن و لوگو', icon: <Building2 size={20} />, color: 'from-blue-400 to-blue-600', count: '۱ مورد' },
  { title: 'سال مالی و دوره‌ها', desc: 'تعریف و مدیریت سال مالی', icon: <Calendar size={20} />, color: 'from-emerald-400 to-emerald-600', count: '۲ دوره' },
  { title: 'گروه کالا و خدمات', desc: 'دسته‌بندی محصولات', icon: <Tags size={20} />, color: 'from-violet-400 to-violet-600', count: '۱۲ گروه' },
  { title: 'واحدها', desc: 'واحدهای اندازه‌گیری', icon: <Ruler size={20} />, color: 'from-amber-400 to-amber-600', count: '۸ واحد' },
  { title: 'انبارها', desc: 'محل نگهداری کالا', icon: <Warehouse size={20} />, color: 'from-cyan-400 to-cyan-600', count: '۳ انبار' },
  { title: 'صندوق و بانک', desc: 'حساب‌های مالی', icon: <Landmark size={20} />, color: 'from-indigo-400 to-indigo-600', count: '۵ حساب' },
  { title: 'کدینگ حساب‌ها', desc: 'ساختار حساب‌های حسابداری', icon: <FileText size={20} />, color: 'from-rose-400 to-rose-600', count: '۴۵ حساب' },
  { title: 'روش‌های پرداخت', desc: 'نقد، چک، کارت و...', icon: <CreditCard size={20} />, color: 'from-teal-400 to-teal-600', count: '۶ روش' },
  { title: 'شماره‌گذاری اسناد', desc: 'تنظیم پیش‌شماره‌ها', icon: <Hash size={20} />, color: 'from-fuchsia-400 to-fuchsia-600', count: '۱۰ سری' },
];

const chartOfAccounts = [
  { code: '۱۰۰۰', title: 'دارایی‌ها', type: 'کل', status: 'فعال', children: 12 },
  { code: '۱۱۰۰', title: 'موجودی نقد و بانک', type: 'معین', status: 'فعال', children: 5 },
  { code: '۱۲۰۰', title: 'حساب‌های دریافتنی', type: 'معین', status: 'فعال', children: 8 },
  { code: '۱۳۰۰', title: 'موجودی کالا', type: 'معین', status: 'فعال', children: 3 },
  { code: '۲۰۰۰', title: 'بدهی‌ها', type: 'کل', status: 'فعال', children: 8 },
  { code: '۳۰۰۰', title: 'حقوق صاحبان سهام', type: 'کل', status: 'فعال', children: 4 },
  { code: '۴۰۰۰', title: 'درآمدها', type: 'کل', status: 'فعال', children: 6 },
  { code: '۵۰۰۰', title: 'هزینه‌ها', type: 'کل', status: 'فعال', children: 10 },
];

export default function BaseData() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-gray-800">اطلاعات پایه</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت تنظیمات و داده‌های پایه سیستم</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white text-sm rounded-2xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all">
          <Plus size={16} />
          افزودن مورد جدید
        </button>
      </div>

      {/* Quick Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {baseDataItems.map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100/80 p-5 card-hover cursor-pointer group">
            <div className="flex items-start gap-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-bold text-gray-800">{item.title}</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">{item.desc}</p>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-[10px] text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">{item.count}</span>
                  <button className="text-[10px] text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    مدیریت <Edit size={10} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Chart of Accounts Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-sm font-bold text-gray-800">کدینگ حساب‌ها</h3>
            <p className="text-[10px] text-gray-400 mt-0.5">ساختار حساب‌های حسابداری</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50">
              <Search size={14} className="text-gray-400" />
              <input type="text" placeholder="جست‌وجو..." className="bg-transparent text-xs outline-none w-32" />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-50 border border-gray-200/50 text-xs text-gray-600 hover:bg-gray-100 transition-colors">
              <Filter size={14} />
              فیلتر
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-right py-3 px-4 text-[11px] font-bold text-gray-500">کد</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-gray-500">عنوان حساب</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-gray-500">نوع</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-gray-500">وضعیت</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-gray-500">زیرمجموعه</th>
                <th className="text-right py-3 px-4 text-[11px] font-bold text-gray-500">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {chartOfAccounts.map((account, idx) => (
                <tr key={idx} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
                  <td className="py-3 px-4 text-xs font-mono font-bold text-gray-700">{account.code}</td>
                  <td className="py-3 px-4 text-xs font-medium text-gray-800">{account.title}</td>
                  <td className="py-3 px-4">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${
                      account.type === 'کل' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                    }`}>{account.type}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-green-50 text-green-600 font-medium">{account.status}</span>
                  </td>
                  <td className="py-3 px-4 text-xs text-gray-500">{account.children} حساب</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500 transition-colors"><Edit size={12} /></button>
                      <button className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 transition-colors"><Search size={12} /></button>
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
