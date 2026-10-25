import {
  TrendingUp, TrendingDown, DollarSign, ShoppingCart,
  Package, Users, AlertTriangle, CreditCard,
  ArrowUpRight, ArrowDownRight, Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

const salesData = [
  { name: 'فروردین', sales: 45000, purchases: 32000 },
  { name: 'اردیبهشت', sales: 52000, purchases: 38000 },
  { name: 'خرداد', sales: 48000, purchases: 35000 },
  { name: 'تیر', sales: 61000, purchases: 42000 },
  { name: 'مرداد', sales: 55000, purchases: 40000 },
  { name: 'شهریور', sales: 67000, purchases: 45000 },
];

const cashFlowData = [
  { name: 'هفته ۱', income: 12000, expense: 8000 },
  { name: 'هفته ۲', income: 15000, expense: 9500 },
  { name: 'هفته ۳', income: 11000, expense: 7000 },
  { name: 'هفته ۴', income: 18000, expense: 12000 },
];

const categoryData = [
  { name: 'کالای دیجیتال', value: 35, color: '#3b82f6' },
  { name: 'لوازم خانگی', value: 25, color: '#10b981' },
  { name: 'مواد غذایی', value: 20, color: '#f59e0b' },
  { name: 'پوشاک', value: 12, color: '#8b5cf6' },
  { name: 'سایر', value: 8, color: '#ef4444' },
];

const recentActivities = [
  { id: 1, type: 'sale', desc: 'فاکتور فروش #۱۲۳۴ - شرکت آلفا', amount: '۱۲,۵۰۰,۰۰۰', time: '۵ دقیقه پیش', color: 'bg-green-100 text-green-600' },
  { id: 2, type: 'purchase', desc: 'فاکتور خرید #۵۶۷ - تأمین‌کننده بتا', amount: '۸,۲۰۰,۰۰۰', time: '۲۰ دقیقه پیش', color: 'bg-blue-100 text-blue-600' },
  { id: 3, type: 'receive', desc: 'دریافت وجه از مشتری گاما', amount: '۵,۰۰۰,۰۰۰', time: '۱ ساعت پیش', color: 'bg-emerald-100 text-emerald-600' },
  { id: 4, type: 'check', desc: 'چک سررسید امروز - بانک ملت', amount: '۳,۸۰۰,۰۰۰', time: '۲ ساعت پیش', color: 'bg-amber-100 text-amber-600' },
  { id: 5, type: 'inventory', desc: 'رسید انبار - کالای دیجیتال', amount: '۱۵ قلم', time: '۳ ساعت پیش', color: 'bg-purple-100 text-purple-600' },
];

const lowStockItems = [
  { name: 'لپ‌تاپ ایسوس', current: 2, min: 5, unit: 'عدد' },
  { name: 'ماوس بی‌سیم', current: 3, min: 10, unit: 'عدد' },
  { name: 'کابل HDMI', current: 5, min: 20, unit: 'عدد' },
];

const upcomingChecks = [
  { party: 'شرکت آلفا', amount: '۵,۰۰۰,۰۰۰', date: '۱۴۰۴/۰۴/۱۶', type: 'دریافتی' },
  { party: 'تأمین‌کننده بتا', amount: '۳,۲۰۰,۰۰۰', date: '۱۴۰۴/۰۴/۱۷', type: 'پرداختی' },
  { party: 'شرکت گاما', amount: '۸,۵۰۰,۰۰۰', date: '۱۴۰۴/۰۴/۱۸', type: 'دریافتی' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">داشبورد</h1>
          <p className="text-sm text-gray-500 mt-1">نمای کلی از وضعیت سیستم</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl shadow-sm border border-gray-100">
          <Calendar size={16} className="text-gray-400" />
          <span className="text-sm text-gray-600">سال مالی ۱۴۰۴</span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="فروش این ماه"
          value="۶۷,۰۰۰,۰۰۰"
          unit="ریال"
          change="+۱۲٪"
          trend="up"
          icon={<TrendingUp size={22} />}
          gradient="from-blue-500 to-blue-600"
        />
        <StatCard
          title="خرید این ماه"
          value="۴۵,۰۰۰,۰۰۰"
          unit="ریال"
          change="+۸٪"
          trend="up"
          icon={<ShoppingCart size={22} />}
          gradient="from-emerald-500 to-emerald-600"
        />
        <StatCard
          title="موجودی انبار"
          value="۱,۲۵۰"
          unit="قلم کالا"
          change="-۳٪"
          trend="down"
          icon={<Package size={22} />}
          gradient="from-amber-500 to-amber-600"
        />
        <StatCard
          title="مطالبات"
          value="۱۲۵,۰۰۰,۰۰۰"
          unit="ریال"
          change="+۵٪"
          trend="up"
          icon={<DollarSign size={22} />}
          gradient="from-violet-500 to-violet-600"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales vs Purchases Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-700">فروش و خرید ماهانه</h3>
            <span className="text-xs text-gray-400">۶ ماه اخیر</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(value: number) => [`${value.toLocaleString()} هزار ریال`]}
              />
              <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} name="فروش" />
              <Bar dataKey="purchases" fill="#10b981" radius={[4, 4, 0, 0]} name="خرید" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cash Flow Chart */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-700">جریان نقدینگی</h3>
            <span className="text-xs text-gray-400">هفته‌های اخیر</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={cashFlowData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                formatter={(value: number) => [`${value.toLocaleString()} هزار ریال`]}
              />
              <Line type="monotone" dataKey="income" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} name="دریافت" />
              <Line type="monotone" dataKey="expense" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444' }} name="پرداخت" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Distribution */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <h3 className="text-sm font-bold text-gray-700 mb-4">توزیع فروش بر اساس گروه</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}٪`]} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-wrap gap-2 mt-2">
            {categoryData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[10px] text-gray-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Low Stock Alerts */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle size={16} className="text-amber-500" />
            <h3 className="text-sm font-bold text-gray-700">کالاهای کم‌موجود</h3>
          </div>
          <div className="space-y-3">
            {lowStockItems.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-100">
                <div>
                  <p className="text-xs font-medium text-gray-700">{item.name}</p>
                  <p className="text-[10px] text-gray-400">حداقل: {item.min} {item.unit}</p>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-amber-600">{item.current}</p>
                  <p className="text-[10px] text-gray-400">{item.unit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Checks */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
          <div className="flex items-center gap-2 mb-4">
            <CreditCard size={16} className="text-indigo-500" />
            <h3 className="text-sm font-bold text-gray-700">چک‌های نزدیک سررسید</h3>
          </div>
          <div className="space-y-3">
            {upcomingChecks.map((check, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-indigo-50 border border-indigo-100">
                <div>
                  <p className="text-xs font-medium text-gray-700">{check.party}</p>
                  <p className="text-[10px] text-gray-400">{check.date} • {check.type}</p>
                </div>
                <p className="text-xs font-bold text-indigo-600">{check.amount}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activities */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-700">آخرین عملیات</h3>
          <button className="text-xs text-blue-500 hover:text-blue-700">مشاهده همه</button>
        </div>
        <div className="space-y-2">
          {recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-3 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${activity.color} flex items-center justify-center`}>
                  {activity.type === 'sale' && <TrendingUp size={14} />}
                  {activity.type === 'purchase' && <ShoppingCart size={14} />}
                  {activity.type === 'receive' && <DollarSign size={14} />}
                  {activity.type === 'check' && <CreditCard size={14} />}
                  {activity.type === 'inventory' && <Package size={14} />}
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-700">{activity.desc}</p>
                  <p className="text-[10px] text-gray-400">{activity.time}</p>
                </div>
              </div>
              <span className="text-xs font-bold text-gray-600">{activity.amount} ریال</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

interface StatCardProps {
  title: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  gradient: string;
}

function StatCard({ title, value, unit, change, trend, icon, gradient }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-1">{title}</p>
          <p className="text-xl font-bold text-gray-800">{value}</p>
          <p className="text-[10px] text-gray-400 mt-0.5">{unit}</p>
        </div>
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center gap-1 mt-3">
        {trend === 'up' ? (
          <ArrowUpRight size={14} className="text-green-500" />
        ) : (
          <ArrowDownRight size={14} className="text-red-500" />
        )}
        <span className={`text-xs font-medium ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
          {change}
        </span>
        <span className="text-[10px] text-gray-400 mr-1">نسبت به ماه قبل</span>
      </div>
    </div>
  );
}
