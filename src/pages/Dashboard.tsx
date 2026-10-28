import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Package, AlertTriangle, CreditCard, Calendar, ArrowUpRight, ArrowDownRight, Database } from 'lucide-react';
import { execQuery } from '../database/db';

const salesData = [
  { name: 'فروردین', sales: 45, purchases: 32 },
  { name: 'اردیبهشت', sales: 52, purchases: 38 },
  { name: 'خرداد', sales: 48, purchases: 35 },
  { name: 'تیر', sales: 61, purchases: 42 },
  { name: 'مرداد', sales: 55, purchases: 40 },
  { name: 'شهریور', sales: 67, purchases: 45 },
];

const cashFlowData = [
  { name: 'هفته ۱', income: 120, expense: 80 },
  { name: 'هفته ۲', income: 150, expense: 95 },
  { name: 'هفته ۳', income: 110, expense: 70 },
  { name: 'هفته ۴', income: 180, expense: 120 },
];

const categoryData = [
  { name: 'کالای دیجیتال', value: 35, color: '#1e40af' },
  { name: 'لوازم خانگی', value: 25, color: '#047857' },
  { name: 'مواد غذایی', value: 20, color: '#b45309' },
  { name: 'پوشاک', value: 12, color: '#7e22ce' },
  { name: 'سایر', value: 8, color: '#be123c' },
];

const recentActivities = [
  { id: 1, type: 'sale', desc: 'فاکتور فروش #۱۲۳۴ - شرکت آلفا', amount: '۱۲,۵۰۰,۰۰۰', time: '۵ دقیقه پیش', color: '#047857' },
  { id: 2, type: 'purchase', desc: 'فاکتور خرید #۵۶۷ - تأمین‌کننده بتا', amount: '۸,۲۰۰,۰۰۰', time: '۲۰ دقیقه پیش', color: '#1e40af' },
  { id: 3, type: 'receive', desc: 'دریافت وجه از مشتری گاما', amount: '۵,۰۰۰,۰۰۰', time: '۱ ساعت پیش', color: '#047857' },
  { id: 4, type: 'check', desc: 'چک سررسید امروز - بانک ملت', amount: '۳,۸۰۰,۰۰۰', time: '۲ ساعت پیش', color: '#b45309' },
];

const lowStockItems = [
  { name: 'لپ‌تاپ ایسوس', current: 2, min: 5 },
  { name: 'ماوس بی‌سیم', current: 3, min: 10 },
  { name: 'کابل HDMI', current: 5, min: 20 },
];

const upcomingChecks = [
  { party: 'شرکت آلفا', amount: '۵,۰۰۰,۰۰۰', date: '۱۴۰۵/۰۸/۱۰', type: 'دریافتی', isPositive: true },
  { party: 'تأمین‌کننده بتا', amount: '۳,۲۰۰,۰۰۰', date: '۱۴۰۵/۰۸/۱۲', type: 'پرداختی', isPositive: false },
  { party: 'شرکت گاما', amount: '۸,۵۰۰,۰۰۰', date: '۱۴۰۵/۰۸/۱۵', type: 'دریافتی', isPositive: true },
];

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalSales: 67000000,
    totalPurchases: 45000000,
    totalItems: 1250,
    receivables: 125000000
  });

  useEffect(() => {
    try {
      const sales = execQuery(`SELECT COALESCE(SUM(total), 0) as total FROM sales_documents`);
      const purchases = execQuery(`SELECT COALESCE(SUM(total), 0) as total FROM purchase_documents`);
      if (sales[0]?.total) setStats(s => ({ ...s, totalSales: Number(sales[0].total) }));
      if (purchases[0]?.total) setStats(s => ({ ...s, totalPurchases: Number(purchases[0].total) }));
    } catch (e) {
      console.log('Using default stats');
    }
  }, []);

  return (
    <div style={{ padding: '0', fontFamily: 'Vazirmatn, Tahoma, sans-serif' }}>
      {/* Page Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '22px', fontWeight: '800', color: '#111827', margin: 0 }}>داشبورد</h1>
        <p style={{ fontSize: '13px', color: '#6b7280', margin: '4px 0 0 0' }}>نمای کلی از وضعیت سیستم حسابداری سرمد</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        <StatCard
          title="فروش این ماه"
          value={stats.totalSales.toLocaleString('fa-IR')}
          unit="ریال"
          change="+۱۲٪"
          trend="up"
          icon={<TrendingUp size={20} />}
          color="#1e40af"
          bgColor="#eff6ff"
        />
        <StatCard
          title="خرید این ماه"
          value={stats.totalPurchases.toLocaleString('fa-IR')}
          unit="ریال"
          change="+۸٪"
          trend="up"
          icon={<ShoppingCart size={20} />}
          color="#047857"
          bgColor="#ecfdf5"
        />
        <StatCard
          title="موجودی انبار"
          value={stats.totalItems.toLocaleString('fa-IR')}
          unit="قلم کالا"
          change="-۳٪"
          trend="down"
          icon={<Package size={20} />}
          color="#b45309"
          bgColor="#fffbeb"
        />
        <StatCard
          title="مطالبات"
          value={stats.receivables.toLocaleString('fa-IR')}
          unit="ریال"
          change="+۵٪"
          trend="up"
          icon={<DollarSign size={20} />}
          color="#7e22ce"
          bgColor="#faf5ff"
        />
      </div>

      {/* Charts Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {/* Sales vs Purchases */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: 0 }}>فروش و خرید ماهانه</h3>
              <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>مقایسه ۶ ماه اخیر (میلیون ریال)</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#1e40af' }}></div>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>فروش</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '2px', background: '#047857' }}></div>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>خرید</span>
              </div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" fontSize={11} tick={{ fill: '#6b7280' }} />
              <YAxis fontSize={11} tick={{ fill: '#6b7280' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', direction: 'rtl' }} />
              <Bar dataKey="sales" fill="#1e40af" radius={[4, 4, 0, 0]} name="فروش" />
              <Bar dataKey="purchases" fill="#047857" radius={[4, 4, 0, 0]} name="خرید" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cash Flow */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: 0 }}>جریان نقدینگی</h3>
              <p style={{ fontSize: '11px', color: '#6b7280', margin: '2px 0 0 0' }}>دریافت و پرداخت هفتگی (میلیون ریال)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={cashFlowData}>
              <defs>
                <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#047857" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#047857" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#be123c" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#be123c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="name" fontSize={11} tick={{ fill: '#6b7280' }} />
              <YAxis fontSize={11} tick={{ fill: '#6b7280' }} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', direction: 'rtl' }} />
              <Area type="monotone" dataKey="income" stroke="#047857" fill="url(#incomeGrad)" name="دریافت" strokeWidth={2} />
              <Area type="monotone" dataKey="expense" stroke="#be123c" fill="url(#expenseGrad)" name="پرداخت" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '16px' }}>
        {/* Category Pie Chart */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>ترکیب فروش بر اساس گروه کالا</h3>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={categoryData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', direction: 'rtl' }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '12px' }}>
            {categoryData.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '2px', background: item.color }}></div>
                <span style={{ fontSize: '11px', color: '#6b7280' }}>{item.name} ({item.value}٪)</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px' }}>
          <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: '0 0 16px 0' }}>آخرین عملیات</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentActivities.map((activity) => (
              <div key={activity.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px', borderRadius: '8px', background: '#f9fafb' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: activity.color, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '14px', fontWeight: 'bold' }}>
                  {activity.type === 'sale' ? 'ف' : activity.type === 'purchase' ? 'خ' : activity.type === 'receive' ? 'د' : 'چ'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: '12px', color: '#111827', margin: 0, fontWeight: '500', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{activity.desc}</p>
                  <p style={{ fontSize: '10px', color: '#6b7280', margin: '2px 0 0 0' }}>{activity.time}</p>
                </div>
                <span style={{ fontSize: '12px', color: '#111827', fontWeight: '700' }}>{activity.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Alerts */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Low Stock */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fef2f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <AlertTriangle size={14} color="#be123c" />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: 0 }}>کالاهای کم‌موجود</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {lowStockItems.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderRadius: '6px', background: '#fef2f2' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#111827', margin: 0, fontWeight: '500' }}>{item.name}</p>
                    <p style={{ fontSize: '10px', color: '#6b7280', margin: '2px 0 0 0' }}>حداقل: {item.min}</p>
                  </div>
                  <span style={{ fontSize: '12px', color: '#be123c', fontWeight: '700' }}>{item.current}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Checks */}
          <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #e5e7eb', padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CreditCard size={14} color="#b45309" />
              </div>
              <h3 style={{ fontSize: '14px', fontWeight: '700', color: '#111827', margin: 0 }}>چک‌های نزدیک سررسید</h3>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {upcomingChecks.map((check, idx) => (
                <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px', borderRadius: '6px', background: check.isPositive ? '#ecfdf5' : '#fef2f2' }}>
                  <div>
                    <p style={{ fontSize: '12px', color: '#111827', margin: 0, fontWeight: '500' }}>{check.party}</p>
                    <p style={{ fontSize: '10px', color: '#6b7280', margin: '2px 0 0 0' }}>{check.date} • {check.type}</p>
                  </div>
                  <span style={{ fontSize: '12px', color: check.isPositive ? '#047857' : '#be123c', fontWeight: '700' }}>{check.amount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, unit, change, trend, icon, color, bgColor }: any) {
  return (
    <div style={{
      background: 'white',
      borderRadius: '12px',
      border: '1px solid #e5e7eb',
      padding: '20px',
      transition: 'all 0.2s',
      cursor: 'pointer'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
      e.currentTarget.style.transform = 'translateY(-2px)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.transform = 'translateY(0)';
    }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '12px', color: '#6b7280', margin: 0, fontWeight: '500' }}>{title}</p>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', marginTop: '8px' }}>
            <span style={{ fontSize: '20px', fontWeight: '800', color: '#111827' }}>{value}</span>
            <span style={{ fontSize: '11px', color: '#6b7280' }}>{unit}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '8px' }}>
            {trend === 'up' ? <ArrowUpRight size={12} color="#047857" /> : <ArrowDownRight size={12} color="#be123c" />}
            <span style={{ fontSize: '11px', fontWeight: '600', color: trend === 'up' ? '#047857' : '#be123c' }}>
              {change} نسبت به ماه قبل
            </span>
          </div>
        </div>
        <div style={{
          width: '44px', height: '44px', borderRadius: '10px',
          background: bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: color
        }}>
          {icon}
        </div>
      </div>
    </div>
  );
}
