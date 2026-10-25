import { Building2, Calendar, Tags, Ruler, Warehouse, Landmark, FileText, CreditCard, Hash, Plus, Edit, Trash2, Search } from 'lucide-react';
import { useState } from 'react';

const sections = [
  { id: 'company', title: 'اطلاعات شرکت', icon: <Building2 size={20} />, color: 'from-blue-500 to-blue-600', desc: 'نام، نشانی، تلفن و لوگو' },
  { id: 'fiscal', title: 'سال مالی و دوره‌ها', icon: <Calendar size={20} />, color: 'from-emerald-500 to-emerald-600', desc: 'تعریف و مدیریت سال مالی' },
  { id: 'groups', title: 'گروه کالا و خدمات', icon: <Tags size={20} />, color: 'from-violet-500 to-violet-600', desc: 'دسته‌بندی کالاها و خدمات' },
  { id: 'units', title: 'واحدها', icon: <Ruler size={20} />, color: 'from-amber-500 to-amber-600', desc: 'واحدهای اندازه‌گیری' },
  { id: 'warehouses', title: 'انبارها', icon: <Warehouse size={20} />, color: 'from-cyan-500 to-cyan-600', desc: 'تعریف انبارهای شرکت' },
  { id: 'banks', title: 'صندوق و بانک', icon: <Landmark size={20} />, color: 'from-indigo-500 to-indigo-600', desc: 'حساب‌های بانکی و صندوق' },
  { id: 'accounts', title: 'کدینگ حساب‌ها', icon: <FileText size={20} />, color: 'from-rose-500 to-rose-600', desc: 'سرفصل حساب‌های کل، معین و تفصیلی' },
  { id: 'payments', title: 'روش‌های پرداخت', icon: <CreditCard size={20} />, color: 'from-teal-500 to-teal-600', desc: 'نقد، چک، کارت و...' },
  { id: 'numbering', title: 'شماره‌گذاری اسناد', icon: <Hash size={20} />, color: 'from-fuchsia-500 to-fuchsia-600', desc: 'تعریف الگو شماره‌گذاری' },
];

const companyInfo = {
  name: 'شرکت نمونه سرمد',
  brand: 'سرمد',
  address: 'تهران، خیابان ولیعصر، پلاک ۱۲۳',
  phone: '۰۲۱-۸۸۷۷۶۶۵۵',
  nationalId: '۱۰۱۰۲۰۳۰۴۰۵',
  economicCode: '۴۱۲۳۴۵۶۷۸۹',
};

const fiscalYears = [
  { id: 1, title: 'سال مالی ۱۴۰۴', start: '۱۴۰۴/۰۱/۰۱', end: '۱۴۰۴/۱۲/۲۹', status: 'فعال' },
  { id: 2, title: 'سال مالی ۱۴۰۳', start: '۱۴۰۳/۰۱/۰۱', end: '۱۴۰۳/۱۲/۲۹', status: 'بسته' },
];

const itemGroups = [
  { id: 1, code: '۱۰۰', name: 'کالای دیجیتال', parent: '-' },
  { id: 2, code: '۱۰۱', name: 'لپ‌تاپ', parent: 'کالای دیجیتال' },
  { id: 3, code: '۱۰۲', name: 'موبایل', parent: 'کالای دیجیتال' },
  { id: 4, code: '۲۰۰', name: 'لوازم خانگی', parent: '-' },
  { id: 5, code: '۲۰۱', name: 'یخچال و فریزر', parent: 'لوازم خانگی' },
];

const units = [
  { id: 1, name: 'عدد', abbr: 'عد', type: 'اصلی' },
  { id: 2, name: 'کیلوگرم', abbr: 'کگ', type: 'اصلی' },
  { id: 3, name: 'متر', abbr: 'م', type: 'اصلی' },
  { id: 4, name: 'لیتر', abbr: 'ل', type: 'اصلی' },
  { id: 5, name: 'بسته', abbr: 'بست', type: 'فرعی' },
  { id: 6, name: 'کارتن', abbr: 'کرت', type: 'فرعی' },
];

const warehouses = [
  { id: 1, code: 'WH-001', name: 'انبار مرکزی', location: 'تهران', status: 'فعال' },
  { id: 2, code: 'WH-002', name: 'انبار شعبه ۱', location: 'اصفهان', status: 'فعال' },
  { id: 3, code: 'WH-003', name: 'انبار شعبه ۲', location: 'شیراز', status: 'فعال' },
];

export default function BaseData() {
  const [activeSection, setActiveSection] = useState('company');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">اطلاعات پایه</h1>
          <p className="text-sm text-gray-500 mt-1">مدیریت اطلاعات بنیادی سیستم</p>
        </div>
      </div>

      {/* Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`p-4 rounded-2xl border transition-all text-right ${
              activeSection === section.id
                ? 'bg-white shadow-lg border-blue-200 ring-2 ring-blue-100'
                : 'bg-white shadow-sm border-gray-100 hover:shadow-md'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${section.color} flex items-center justify-center text-white shadow-md`}>
                {section.icon}
              </div>
              <div>
                <h3 className="text-sm font-bold text-gray-700">{section.title}</h3>
                <p className="text-[11px] text-gray-400 mt-0.5">{section.desc}</p>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Active Section Content */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 animate-fade-in">
        {activeSection === 'company' && (
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">اطلاعات شرکت</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField label="نام شرکت" value={companyInfo.name} />
              <InputField label="نام تجاری" value={companyInfo.brand} />
              <InputField label="نشانی" value={companyInfo.address} />
              <InputField label="تلفن" value={companyInfo.phone} />
              <InputField label="شناسه ملی" value={companyInfo.nationalId} />
              <InputField label="کد اقتصادی" value={companyInfo.economicCode} />
            </div>
            <div className="mt-4 flex gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white text-sm rounded-xl hover:bg-blue-600 transition-colors">ذخیره تغییرات</button>
              <button className="px-4 py-2 bg-gray-100 text-gray-600 text-sm rounded-xl hover:bg-gray-200 transition-colors">انصراف</button>
            </div>
          </div>
        )}

        {activeSection === 'fiscal' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-700">سال مالی و دوره‌ها</h2>
              <button className="flex items-center gap-1 px-3 py-2 bg-emerald-500 text-white text-xs rounded-xl hover:bg-emerald-600">
                <Plus size={14} /> سال مالی جدید
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">عنوان</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">تاریخ شروع</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">تاریخ پایان</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">وضعیت</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {fiscalYears.map((fy) => (
                  <tr key={fy.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{fy.title}</td>
                    <td className="py-3 px-2 text-gray-500">{fy.start}</td>
                    <td className="py-3 px-2 text-gray-500">{fy.end}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-[10px] font-medium ${fy.status === 'فعال' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                        {fy.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Edit size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'groups' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-700">گروه کالا و خدمات</h2>
              <button className="flex items-center gap-1 px-3 py-2 bg-violet-500 text-white text-xs rounded-xl hover:bg-violet-600">
                <Plus size={14} /> گروه جدید
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">کد</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">نام گروه</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">گروه والد</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {itemGroups.map((g) => (
                  <tr key={g.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs">{g.code}</td>
                    <td className="py-3 px-2 font-medium">{g.name}</td>
                    <td className="py-3 px-2 text-gray-500">{g.parent}</td>
                    <td className="py-3 px-2">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Edit size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'units' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-700">واحدهای اندازه‌گیری</h2>
              <button className="flex items-center gap-1 px-3 py-2 bg-amber-500 text-white text-xs rounded-xl hover:bg-amber-600">
                <Plus size={14} /> واحد جدید
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">نام</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">مخفف</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">نوع</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {units.map((u) => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-2 font-medium">{u.name}</td>
                    <td className="py-3 px-2 text-gray-500">{u.abbr}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-1 rounded-full text-[10px] ${u.type === 'اصلی' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>{u.type}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Edit size={14} /></button>
                        <button className="p-1.5 rounded-lg hover:bg-red-50 text-red-500"><Trash2 size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'warehouses' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-700">انبارها</h2>
              <button className="flex items-center gap-1 px-3 py-2 bg-cyan-500 text-white text-xs rounded-xl hover:bg-cyan-600">
                <Plus size={14} /> انبار جدید
              </button>
            </div>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">کد</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">نام</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">موقعیت</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">وضعیت</th>
                  <th className="text-right py-3 px-2 text-gray-500 font-medium">عملیات</th>
                </tr>
              </thead>
              <tbody>
                {warehouses.map((w) => (
                  <tr key={w.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="py-3 px-2 font-mono text-xs">{w.code}</td>
                    <td className="py-3 px-2 font-medium">{w.name}</td>
                    <td className="py-3 px-2 text-gray-500">{w.location}</td>
                    <td className="py-3 px-2">
                      <span className="px-2 py-1 rounded-full text-[10px] bg-green-100 text-green-600">{w.status}</span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-1">
                        <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Edit size={14} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeSection === 'banks' && (
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">صندوق و بانک</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-blue-50 border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <Landmark size={16} className="text-blue-500" />
                  <h3 className="text-sm font-bold text-gray-700">صندوق اصلی</h3>
                </div>
                <p className="text-xs text-gray-500">موجودی: ۱۵,۰۰۰,۰۰۰ ریال</p>
              </div>
              <div className="p-4 rounded-xl bg-indigo-50 border border-indigo-100">
                <div className="flex items-center gap-2 mb-2">
                  <Landmark size={16} className="text-indigo-500" />
                  <h3 className="text-sm font-bold text-gray-700">بانک ملت - ۰۱۲۳</h3>
                </div>
                <p className="text-xs text-gray-500">موجودی: ۲۵۰,۰۰۰,۰۰۰ ریال</p>
              </div>
              <div className="p-4 rounded-xl bg-purple-50 border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Landmark size={16} className="text-purple-500" />
                  <h3 className="text-sm font-bold text-gray-700">بانک ملی - ۴۵۶۷</h3>
                </div>
                <p className="text-xs text-gray-500">موجودی: ۱۸۰,۰۰۰,۰۰۰ ریال</p>
              </div>
            </div>
          </div>
        )}

        {activeSection === 'accounts' && (
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">کدینگ حساب‌ها</h2>
            <div className="space-y-2">
              {[
                { code: '۱', name: 'دارایی‌ها', level: 'کل', children: 12 },
                { code: '۲', name: 'بدهی‌ها', level: 'کل', children: 8 },
                { code: '۳', name: 'حقوق صاحبان سهام', level: 'کل', children: 5 },
                { code: '۴', name: 'درآمدها', level: 'کل', children: 10 },
                { code: '۵', name: 'هزینه‌ها', level: 'کل', children: 15 },
              ].map((acc, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-gray-100 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center text-xs font-bold">{acc.code}</span>
                    <div>
                      <p className="text-sm font-medium text-gray-700">{acc.name}</p>
                      <p className="text-[10px] text-gray-400">{acc.children} حساب زیرمجموعه</p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-full text-[10px] bg-blue-100 text-blue-600">{acc.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'payments' && (
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">روش‌های پرداخت</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['نقدی', 'چک', 'کارت‌خوان', 'انتقال بانکی', 'تهاتر', 'اقساطی'].map((method, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-teal-50 border border-teal-100 text-center">
                  <CreditCard size={20} className="text-teal-500 mx-auto mb-2" />
                  <p className="text-xs font-medium text-gray-700">{method}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === 'numbering' && (
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-4">شماره‌گذاری اسناد</h2>
            <div className="space-y-3">
              {[
                { type: 'فاکتور فروش', prefix: 'INV-S', current: 1234 },
                { type: 'فاکتور خرید', prefix: 'INV-P', current: 567 },
                { type: 'سند حسابداری', prefix: 'ACC', current: 890 },
                { type: 'رسید انبار', prefix: 'RCV', current: 345 },
              ].map((seq, idx) => (
                <div key={idx} className="flex items-center justify-between p-3 rounded-xl border border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-700">{seq.type}</p>
                    <p className="text-[10px] text-gray-400 font-mono">{seq.prefix}-{seq.current}</p>
                  </div>
                  <button className="p-1.5 rounded-lg hover:bg-blue-50 text-blue-500"><Edit size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function InputField({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <label className="text-xs text-gray-500 mb-1 block">{label}</label>
      <input
        type="text"
        defaultValue={value}
        className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-400 outline-none transition-all"
      />
    </div>
  );
}
