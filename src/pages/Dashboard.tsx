import { useEffect, useState } from 'react';
import {
  TrendingUp, TrendingDown, DollarSign, ShoppingCart,
  Package, Users, AlertTriangle, CreditCard,
  Calendar, ArrowUpRight, ArrowDownRight, Zap,
  Wallet, Receipt, Clock, CheckCircle2, XCircle,
  ArrowLeft, Eye, Database
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { execQuery } from '../database/db';

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
  { id: 1, type: 'sale', desc: 'فاکتور فروش #۱۲۳۴ - شرکت آلفا', amount: '۱۲,۵۰۰,۰۰۰', time: '۵ دقیقه پیش', icon: <Receipt size={14} />, gradient: 'from-green-400 to-emerald-600' },
  { id: 2, type: 'purchase', desc: 'فاکتور خرید #۵۶۷ - تأمین‌کننده بتا', amount: '۸,۲۰۰,۰۰۰', time: '۲۰ دقیقه پیش', icon: <ShoppingCart size={14} />, gradient: 'from-blue-400 to-blue-600' },
  { id: 3, type: 'receive', desc: 'دریافت وجه از مشتری گاما', amount: '۵,۰۰۰,۰۰۰', time: '۱ ساعت پیش', icon: <Wallet size={14} />, gradient: 'from-emerald-400 to-green-600' },
  { id: 4, type: 'check', desc: 'چک سررسید امروز - بانک ملت', amount: '۳,۸۰۰,۰۰۰', time: '۲ ساعت پیش', icon: <CreditCard size={14} />, gradient: 'from-amber-400 to-amber-600' },
  { id: 5, type: 'inventory', desc: 'رسید انبار - کالای دیجیتال', amount: '۱۵ قلم', time: '۳ ساعت پیش', icon: <Package size={14} />, gradient: 'from-purple-400 to-purple-600' },
];

const lowStockItems = [
  { name: 'لپ‌تاپ ایسوس', current: 2, min: 5, unit: 'عدد', color: 'from-red-400 to-red-600' },
  { name: 'ماوس بی‌سیم', current: 3, min: 10, unit: 'عدد', color: 'from-amber-400 to-amber-600' },
  { name: 'کابل HDMI', current: 5, min: 20, unit: 'عدد', color: 'from-orange-400 to-orange-600' },
];

const upcomingChecks = [
  { party: 'شرکت آلفا', amount: '۵,۰۰۰,۰۰۰', date: '۱۴۰۴/۰۴/۱۶', type: 'دریافتی', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
  { party: 'تأمین‌کننده بتا', amount: '۳,۲۰۰,۰۰۰', date: '۱۴۰۴/۰۴/۱۷', type: 'پرداختی', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700' },
  { party: 'شرکت گاما', amount: '۸,۵۰۰,۰۰۰', date: '۱۴۰۴/۰۴/۱۸', type: 'دریافتی', bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-700' },
];

export default function Dashboard() {
  const [dbStats, setDbStats] = useState({
    totalSales: 0,
    totalPurchases: 0,
    totalContacts: 0,
    totalItems: 0,
    lowStockCount: 0,
    pendingChecks: 0
  });

  useEffect(() => {
    try {
      const sales = execQuery(`SELECT COALESCE(SUM(total), 0) as total FROM sales_documents WHERE status = 'confirmed'`);
      const purchases = execQuery(`SELECT COALESCE(SUM(total), 0) as total FROM purchase_documents WHERE status = 'confirmed'`);
      const contacts = execQuery(`SELECT COUNT(*) as count FROM contacts WHERE status = 'active'`);
      const items = execQuery(`SELECT COUNT(*) as count FROM items WHERE is_active = 1`);
      const checks = execQuery(`SELECT COUNT(*) as count FROM checks WHERE status = 'pending'`);
      
      setDbStats({
        totalSales: Number(sales[0]?.total || 0),
        totalPurchases: Number(purchases[0]?.total || 0),
        totalContacts: Number(contacts[0]?.count || 0),
        totalItems: Number(items[0]?.count || 0),
        lowStockCount: 3, // Will calculate from inventory
        pendingChecks: Number(checks[0]?.count || 0)
      });
    } catch (e) {
      console.error('Error loading dashboard stats:', e);
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-black text-gray-800">داشبورد</h1>
          <p className="text-sm text-gray-500 mt-1">نمای کلی از وضعیت سیستم حسابداری</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-2 bg-green-50 rounded-xl border border-green-200/50">
            <Database size={14} className="text-green-600" />
            <span className="text-[10px] text-green-700 font-bold">SQLite فعال</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-2.5 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Calendar size={16} className="text-indigo-500" />
            <span className="text-sm text-gray-600 font-medium">سال مالی ۱۴۰۴</span>
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm rounded-2xl hover:shadow-lg hover:shadow-blue-500/30 transition-all">
            <Zap size={16} />
            عملیات سریع
          </button>
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
          gradient="from-blue-500 to-indigo-600"
          shadowColor="shadow-blue-500/20"
        />
        <StatCard
          title="خرید این ماه"
          value="۴۵,۰۰۰,۰۰۰"
          unit="ریال"
          change="+۸٪"
          trend="up"
          icon={<ShoppingCart size={22} />}
          gradient="from-emerald-500 to-green-600"
          shadowColor="shadow-emerald-500/20"
        />
        <StatCard
          title="موجودی انبار"
          value="۱,۲۵۰"
          unit="قلم کالا"
          change="-۳٪"
          trend="down"
          icon={<Package size={22} />}
          gradient="from-amber-500 to-orange-600"
          shadowColor="shadow-amber-500/20"
        />
        <StatCard
          title="مطالبات"
          value="۱۲۵,۰۰۰,۰۰۰"
          unit="ریال"
          change="+۵٪"
          trend="up"
          icon={<DollarSign size={22} />}
          gradient="from-violet-500 to-purple-600"
          shadowColor="shadow-violet-500/20"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales vs Purchases Chart */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6 card-hover">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-gray-800">فروش و خرید ماهانه</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">مقایسه ۶ ماه اخیر</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="text-[10px] text-gray-500">فروش</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] text-gray-500">خرید</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', padding: '12px', direction: 'rtl' }}
                formatter={(value: number) => [`${value.toLocaleString()} هزار ریال`]}
              />
              <Bar dataKey="sales" fill="#3b82f6" radius={[6, 6, 0, 0]} name="فروش" />
              <Bar dataKey="purchases" fill="#10b981" radius={[6, 6, 0, 0]} name="خرید" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cash Flow */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6 card-hover">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-bold text-gray-800">جریان نقدینگی</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">دریافت و پرداخت هفتگی</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-[10px] text-gray-500">دریافت</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <span className="text-[10px] text-gray-500">پرداخت</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={cashFlowData}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f87171" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#f87171" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" fontSize={11} />
              <YAxis fontSize={11} />
              <Tooltip
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', padding: '12px', direction: 'rtl' }}
                formatter={(value: number) => [`${value.toLocaleString()} هزار ریال`]}
              />
              <Area type="monotone" dataKey="income" stroke="#10b981" fill="url(#incomeGrad)" name="دریافت" strokeWidth={2} />
              <Area type="monotone" dataKey="expense" stroke="#f87171" fill="url(#expenseGrad)" name="پرداخت" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Category Pie Chart */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-800">ترکیب فروش</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">بر اساس گروه کالا</p>
            </div>
          </div>
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
              <Tooltip
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', direction: 'rtl' }}
                formatter={(value: number) => [`${value}٪`]}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {categoryData.map((item, idx) => (
              <div key={idx} className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                <span className="text-[10px] text-gray-500">{item.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-6 card-hover">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-gray-800">آخرین عملیات</h3>
              <p className="text-[10px] text-gray-400 mt-0.5">فعالیت‌های اخیر سیستم</p>
            </div>
            <button className="text-[10px] text-blue-500 hover:text-blue-700 font-medium flex items-center gap-1">
              مشاهده همه <ArrowLeft size={10} />
            </button>
          </div>
          <div className="space-y-2.5">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 transition-colors group">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${activity.gradient} flex items-center justify-center text-white shadow-sm flex-shrink-0`}>
                  {activity.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[11px] text-gray-700 font-medium truncate">{activity.desc}</p>
                  <p className="text-[9px] text-gray-400">{activity.time}</p>
                </div>
                <span className="text-[11px] text-gray-600 font-bold">{activity.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts & Warnings */}
        <div className="space-y-4">
          {/* Low Stock */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-5 card-hover">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                  <AlertTriangle size={14} className="text-red-500" />
                </div>
                <h3 className="text-xs font-bold text-gray-800">کالاهای کم‌موجود</h3>
              </div>
              <span className="text-[9px] bg-red-50 text-red-600 px-2 py-0.5 rounded-full font-bold">۳ قلم</span>
            </div>
            <div className="space-y-2">
              {lowStockItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-2 rounded-xl bg-gray-50/80">
                  <div>
                    <p className="text-[11px] text-gray-700 font-medium">{item.name}</p>
                    <p className="text-[9px] text-gray-400">حداقل: {item.min} {item.unit}</p>
                  </div>
                  <div className={`text-[11px] font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                    {item.current} {item.unit}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Checks */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-5 card-hover">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center">
                  <CreditCard size={14} className="text-amber-500" />
                </div>
                <h3 className="text-xs font-bold text-gray-800">چک‌های نزدیک سررسید</h3>
              </div>
              <span className="text-[9px] bg-amber-50 text-amber-600 px-2 py-0.5 rounded-full font-bold">۳ فقره</span>
            </div>
            <div className="space-y-2">
              {upcomingChecks.map((check, idx) => (
                <div key={idx} className={`flex items-center justify-between p-2.5 rounded-xl ${check.bg} border ${check.border}`}>
                  <div>
                    <p className="text-[11px] text-gray-700 font-medium">{check.party}</p>
                    <p className="text-[9px] text-gray-400">{check.date}</p>
                  </div>
                  <div className="text-left">
                    <p className={`text-[11px] font-bold ${check.text}`}>{check.amount} ریال</p>
                    <p className="text-[9px] text-gray-400">{check.type}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, unit, change, trend, icon, gradient, shadowColor }: {
  title: string;
  value: string;
  unit: string;
  change: string;
  trend: 'up' | 'down';
  icon: React.ReactNode;
  gradient: string;
  shadowColor: string;
}) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100/80 p-5 card-hover relative overflow-hidden">
      {/* Background decoration */}
      <div className={`absolute top-0 left-0 w-20 h-20 bg-gradient-to-br ${gradient} opacity-5 rounded-full -translate-x-6 -translate-y-6`}></div>
      
      <div className="flex items-start justify-between relative">
        <div>
          <p className="text-[11px] text-gray-500 font-medium">{title}</p>
          <div className="flex items-baseline gap-1 mt-2">
            <span className="text-xl font-black text-gray-800">{value}</span>
            <span className="text-[10px] text-gray-400">{unit}</span>
          </div>
          <div className={`flex items-center gap-1 mt-2 text-[10px] font-bold ${trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
            {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
            {change} نسبت به ماه قبل
          </div>
        </div>
        <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg ${shadowColor}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
