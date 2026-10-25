import { ReactNode, useState } from 'react';
import { PageType } from '../App';
import {
  LayoutDashboard, Database, Users, ShoppingCart, TrendingUp,
  Package, Landmark, BarChart3, BookOpen, Settings, ChevronDown,
  ChevronLeft, Menu, Bell, Search, User, LogOut, Moon, Sun,
  FileText, Calendar, Tags, Ruler, Warehouse, Building2,
  CreditCard, Hash, Receipt, UserPlus, FolderOpen, TrendingDown,
  ArrowRightLeft, ClipboardList, DollarSign, Banknote,
  PieChart, FileSpreadsheet, Scale, PenTool, Lock, Palette,
  Globe, Printer, Upload, HardDrive, History, Info, Zap,
  Shield, RefreshCw, Wifi, X, Home
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface SubMenuItem {
  label: string;
  icon: ReactNode;
}

interface MenuItem {
  id: PageType;
  label: string;
  icon: ReactNode;
  color: string;
  bgColor: string;
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string;
  subItems: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'داشبورد',
    icon: <LayoutDashboard size={22} />,
    color: 'text-blue-600',
    bgColor: 'bg-blue-500',
    gradientFrom: '#3b82f6',
    gradientTo: '#1d4ed8',
    shadowColor: 'shadow-blue-500/40',
    subItems: [
      { label: 'نمای کلی', icon: <Home size={15} /> },
      { label: 'وضعیت مالی', icon: <DollarSign size={15} /> },
      { label: 'خلاصه فروش و خرید', icon: <BarChart3 size={15} /> },
      { label: 'موجودی و هشدارها', icon: <Package size={15} /> },
      { label: 'چک‌های نزدیک سررسید', icon: <Calendar size={15} /> },
      { label: 'آخرین عملیات', icon: <History size={15} /> },
    ]
  },
  {
    id: 'base-data',
    label: 'اطلاعات پایه',
    icon: <Database size={22} />,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-500',
    gradientFrom: '#10b981',
    gradientTo: '#047857',
    shadowColor: 'shadow-emerald-500/40',
    subItems: [
      { label: 'اطلاعات شرکت', icon: <Building2 size={15} /> },
      { label: 'سال مالی و دوره‌ها', icon: <Calendar size={15} /> },
      { label: 'گروه کالا و خدمات', icon: <Tags size={15} /> },
      { label: 'واحدها', icon: <Ruler size={15} /> },
      { label: 'انبارها', icon: <Warehouse size={15} /> },
      { label: 'صندوق و بانک', icon: <Landmark size={15} /> },
      { label: 'کدینگ حساب‌ها', icon: <FileText size={15} /> },
      { label: 'روش‌های پرداخت', icon: <CreditCard size={15} /> },
      { label: 'شماره‌گذاری اسناد', icon: <Hash size={15} /> },
    ]
  },
  {
    id: 'contacts',
    label: 'معرفی اشخاص',
    icon: <Users size={22} />,
    color: 'text-violet-600',
    bgColor: 'bg-violet-500',
    gradientFrom: '#8b5cf6',
    gradientTo: '#6d28d9',
    shadowColor: 'shadow-violet-500/40',
    subItems: [
      { label: 'فهرست اشخاص', icon: <Users size={15} /> },
      { label: 'شخص جدید', icon: <UserPlus size={15} /> },
      { label: 'مشتریان', icon: <User size={15} /> },
      { label: 'تأمین‌کنندگان', icon: <ShoppingCart size={15} /> },
      { label: 'پرونده شخص', icon: <FolderOpen size={15} /> },
      { label: 'گردش حساب', icon: <BarChart3 size={15} /> },
      { label: 'مانده حساب', icon: <DollarSign size={15} /> },
    ]
  },
  {
    id: 'purchases',
    label: 'خرید',
    icon: <ShoppingCart size={22} />,
    color: 'text-amber-600',
    bgColor: 'bg-amber-500',
    gradientFrom: '#f59e0b',
    gradientTo: '#d97706',
    shadowColor: 'shadow-amber-500/40',
    subItems: [
      { label: 'فاکتور خرید جدید', icon: <Receipt size={15} /> },
      { label: 'فهرست فاکتورها', icon: <ClipboardList size={15} /> },
      { label: 'پیش‌فاکتور و سفارش', icon: <FileText size={15} /> },
      { label: 'برگشت از خرید', icon: <TrendingDown size={15} /> },
      { label: 'هزینه‌های خرید', icon: <DollarSign size={15} /> },
      { label: 'گزارش خرید', icon: <BarChart3 size={15} /> },
    ]
  },
  {
    id: 'sales',
    label: 'فروش',
    icon: <TrendingUp size={22} />,
    color: 'text-rose-600',
    bgColor: 'bg-rose-500',
    gradientFrom: '#f43f5e',
    gradientTo: '#e11d48',
    shadowColor: 'shadow-rose-500/40',
    subItems: [
      { label: 'فاکتور فروش جدید', icon: <Receipt size={15} /> },
      { label: 'فهرست فاکتورها', icon: <ClipboardList size={15} /> },
      { label: 'پیش‌فاکتور و سفارش', icon: <FileText size={15} /> },
      { label: 'برگشت از فروش', icon: <TrendingDown size={15} /> },
      { label: 'دریافت‌های مرتبط', icon: <Banknote size={15} /> },
      { label: 'گزارش فروش و سود', icon: <PieChart size={15} /> },
    ]
  },
  {
    id: 'inventory',
    label: 'انبار و کالا',
    icon: <Package size={22} />,
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-500',
    gradientFrom: '#06b6d4',
    gradientTo: '#0891b2',
    shadowColor: 'shadow-cyan-500/40',
    subItems: [
      { label: 'فهرست کالا و خدمات', icon: <Package size={15} /> },
      { label: 'رسید ورود', icon: <ArrowRightLeft size={15} /> },
      { label: 'حواله خروج', icon: <ArrowRightLeft size={15} /> },
      { label: 'انتقال بین انبارها', icon: <ArrowRightLeft size={15} /> },
      { label: 'انبارگردانی', icon: <ClipboardList size={15} /> },
      { label: 'کارتکس', icon: <FileText size={15} /> },
      { label: 'گزارش موجودی', icon: <BarChart3 size={15} /> },
      { label: 'کالاهای کم‌موجود', icon: <Package size={15} /> },
    ]
  },
  {
    id: 'treasury',
    label: 'چک و خزانه',
    icon: <Landmark size={22} />,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-500',
    gradientFrom: '#6366f1',
    gradientTo: '#4338ca',
    shadowColor: 'shadow-indigo-500/40',
    subItems: [
      { label: 'دریافت وجه', icon: <Banknote size={15} /> },
      { label: 'پرداخت وجه', icon: <DollarSign size={15} /> },
      { label: 'صندوق و بانک', icon: <Landmark size={15} /> },
      { label: 'انتقال وجه', icon: <ArrowRightLeft size={15} /> },
      { label: 'چک‌های دریافتی', icon: <CreditCard size={15} /> },
      { label: 'چک‌های پرداختی', icon: <CreditCard size={15} /> },
      { label: 'سررسید چک‌ها', icon: <Calendar size={15} /> },
      { label: 'مغایرت بانکی', icon: <Scale size={15} /> },
    ]
  },
  {
    id: 'reports',
    label: 'گزارشات',
    icon: <BarChart3 size={22} />,
    color: 'text-teal-600',
    bgColor: 'bg-teal-500',
    gradientFrom: '#14b8a6',
    gradientTo: '#0d9488',
    shadowColor: 'shadow-teal-500/40',
    subItems: [
      { label: 'فروش و خرید', icon: <BarChart3 size={15} /> },
      { label: 'موجودی و گردش کالا', icon: <Package size={15} /> },
      { label: 'حساب اشخاص', icon: <Users size={15} /> },
      { label: 'صندوق و بانک', icon: <Landmark size={15} /> },
      { label: 'دفتر روزنامه', icon: <BookOpen size={15} /> },
      { label: 'دفتر کل و معین', icon: <BookOpen size={15} /> },
      { label: 'تراز آزمایشی', icon: <Scale size={15} /> },
      { label: 'سود و زیان', icon: <TrendingUp size={15} /> },
      { label: 'ترازنامه', icon: <FileSpreadsheet size={15} /> },
    ]
  },
  {
    id: 'accounting',
    label: 'اسناد حسابداری',
    icon: <BookOpen size={22} />,
    color: 'text-fuchsia-600',
    bgColor: 'bg-fuchsia-500',
    gradientFrom: '#d946ef',
    gradientTo: '#c026d3',
    shadowColor: 'shadow-fuchsia-500/40',
    subItems: [
      { label: 'ثبت سند', icon: <PenTool size={15} /> },
      { label: 'فهرست اسناد', icon: <ClipboardList size={15} /> },
      { label: 'اسناد پیش‌نویس', icon: <FileText size={15} /> },
      { label: 'اسناد تأییدشده و قطعی', icon: <Lock size={15} /> },
      { label: 'اسناد اصلاحی و برگشتی', icon: <ArrowRightLeft size={15} /> },
      { label: 'بستن دوره مالی', icon: <Calendar size={15} /> },
    ]
  },
  {
    id: 'settings',
    label: 'تنظیمات',
    icon: <Settings size={22} />,
    color: 'text-slate-600',
    bgColor: 'bg-slate-500',
    gradientFrom: '#64748b',
    gradientTo: '#475569',
    shadowColor: 'shadow-slate-500/40',
    subItems: [
      { label: 'کاربران و مجوزها', icon: <Users size={15} /> },
      { label: 'ظاهر', icon: <Palette size={15} /> },
      { label: 'تاریخ، ارقام و واحد پول', icon: <Globe size={15} /> },
      { label: 'قالب چاپ', icon: <Printer size={15} /> },
      { label: 'ورود و خروج Excel', icon: <Upload size={15} /> },
      { label: 'پشتیبان‌گیری و بازیابی', icon: <HardDrive size={15} /> },
      { label: 'سوابق عملیات', icon: <History size={15} /> },
      { label: 'اطلاعات نسخه', icon: <Info size={15} /> },
    ]
  },
];

export default function Layout({ children, currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }: LayoutProps) {
  const [expandedMenu, setExpandedMenu] = useState<PageType | null>(currentPage);
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showTopMenu, setShowTopMenu] = useState(true);

  const toggleMenu = (id: PageType) => {
    if (expandedMenu === id) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(id);
      setCurrentPage(id);
    }
  };

  const currentItem = menuItems.find(m => m.id === currentPage);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f4f8]">
      {/* Slim Sidebar - Different Design */}
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-white border-l border-gray-100 flex flex-col overflow-hidden shadow-sm z-20 relative`}>
        {/* Sidebar Logo */}
        <div className="h-16 flex items-center justify-center border-b border-gray-100 px-4">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <BookOpen size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-black text-gray-800">سَرمد</h1>
              <p className="text-[9px] text-gray-400 font-medium -mt-0.5">حسابداری هوشمند</p>
            </div>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 overflow-y-auto py-3 px-2.5">
          {/* Section Title */}
          <div className="px-3 mb-2">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">منوی اصلی</span>
          </div>
          
          {menuItems.map((item) => (
            <div key={item.id} className="mb-0.5">
              <button
                onClick={() => toggleMenu(item.id)}
                className={`sidebar-item w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl transition-all duration-200 group relative
                  ${expandedMenu === item.id
                    ? 'bg-gray-50 shadow-sm'
                    : 'hover:bg-gray-50/80'
                  }
                `}
              >
                {/* Active dot */}
                {currentPage === item.id && (
                  <div className={`absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-6 rounded-full`} style={{ background: `linear-gradient(to bottom, ${item.gradientFrom}, ${item.gradientTo})` }}></div>
                )}
                
                <div 
                  className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${
                    expandedMenu === item.id 
                      ? 'text-white shadow-md' 
                      : 'text-gray-400 group-hover:text-gray-600 bg-gray-100 group-hover:bg-gray-200'
                  }`}
                  style={expandedMenu === item.id ? { background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})` } : {}}
                >
                  {item.icon}
                </div>
                
                <span className={`flex-1 text-right text-xs font-semibold transition-colors ${
                  expandedMenu === item.id ? 'text-gray-800' : 'text-gray-500 group-hover:text-gray-700'
                }`}>
                  {item.label}
                </span>
                
                {expandedMenu === item.id && (
                  <ChevronDown size={12} className="text-gray-400 rotate-180 transition-transform" />
                )}
              </button>

              {/* Sub Menu */}
              {expandedMenu === item.id && (
                <div className="mt-1 mr-4 border-r border-gray-100 pr-2.5 animate-fade-in">
                  {item.subItems.map((sub, idx) => (
                    <button
                      key={idx}
                      className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-50 transition-all text-[11px] group/sub"
                    >
                      <span className={`${item.color} opacity-50 group-hover/sub:opacity-100 transition-opacity`}>{sub.icon}</span>
                      <span className="group-hover/sub:translate-x-[-2px] transition-transform">{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-2.5 border-t border-gray-100">
          <div className="flex items-center gap-2 px-2.5 py-2 rounded-xl bg-gray-50 border border-gray-100">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-sm">
              <User size={14} className="text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[11px] font-bold text-gray-700 truncate">مدیر سیستم</p>
              <p className="text-[9px] text-green-500 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block animate-pulse"></span>
                آفلاین فعال
              </p>
            </div>
            <button className="text-gray-400 hover:text-red-400 transition-colors p-1 rounded-lg hover:bg-red-50">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Circular Menu Bar - DOCK STYLE */}
        <header className="glass-effect border-b border-gray-200/50 z-10 relative">
          {/* Top utility bar */}
          <div className="flex items-center justify-between px-5 py-2 border-b border-gray-100/50">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all active:scale-95"
              >
                <Menu size={18} className="text-gray-600" />
              </button>
              
              {/* Breadcrumb */}
              <div className="hidden md:flex items-center gap-1.5 text-xs">
                <span className="text-gray-400">سیستم حسابداری سرمد</span>
                <ChevronLeft size={12} className="text-gray-300" />
                <span className={`font-bold ${currentItem?.color || 'text-blue-600'}`}>
                  {currentItem?.label}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-50 border border-gray-200/50 w-56">
                <Search size={14} className="text-gray-400" />
                <input 
                  type="text" 
                  placeholder="جست‌وجو..." 
                  className="bg-transparent text-xs text-gray-600 outline-none w-full placeholder:text-gray-400"
                />
              </div>

              {/* Date */}
              <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-100/50">
                <Calendar size={12} className="text-indigo-500" />
                <span className="text-[11px] text-indigo-700 font-bold">۱۴۰۴/۰۴/۱۵</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="w-9 h-9 rounded-xl bg-amber-50 hover:bg-amber-100 flex items-center justify-center transition-all relative border border-amber-100/50"
                >
                  <Bell size={16} className="text-amber-600" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[8px] text-white flex items-center justify-center font-bold shadow-sm">۳</span>
                </button>
                {showNotifications && (
                  <div className="absolute left-0 top-12 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-scale-in z-50">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-xs font-bold text-gray-800">اعلان‌ها</h3>
                      <button onClick={() => setShowNotifications(false)}><X size={14} className="text-gray-400" /></button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2 p-2 rounded-xl bg-red-50/80 border border-red-100/50">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center flex-shrink-0">
                          <CreditCard size={12} className="text-white" />
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-700 font-medium">چک سررسید امروز</p>
                          <p className="text-[9px] text-gray-400">۵,۰۰۰,۰۰۰ ریال - بانک ملت</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2 p-2 rounded-xl bg-amber-50/80 border border-amber-100/50">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
                          <Package size={12} className="text-white" />
                        </div>
                        <div>
                          <p className="text-[11px] text-gray-700 font-medium">کالای کم‌موجود</p>
                          <p className="text-[9px] text-gray-400">۳ قلم زیر حداقل</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Dark Mode */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="w-9 h-9 rounded-xl bg-purple-50 hover:bg-purple-100 flex items-center justify-center transition-all border border-purple-100/50"
              >
                {darkMode ? <Sun size={16} className="text-purple-600" /> : <Moon size={16} className="text-purple-600" />}
              </button>

              {/* Refresh */}
              <button className="w-9 h-9 rounded-xl bg-green-50 hover:bg-green-100 flex items-center justify-center transition-all border border-green-100/50">
                <RefreshCw size={16} className="text-green-600" />
              </button>

              {/* User */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-50 transition-all"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center shadow-sm">
                    <User size={14} className="text-white" />
                  </div>
                  <div className="hidden xl:block text-right">
                    <p className="text-[11px] font-bold text-gray-700">مدیر سیستم</p>
                    <p className="text-[9px] text-gray-400">admin@sarmad.ir</p>
                  </div>
                </button>
                {showUserMenu && (
                  <div className="absolute left-0 top-12 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 p-1.5 animate-scale-in z-50">
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                      <User size={14} /> پروفایل
                    </button>
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-gray-600 hover:bg-gray-50 transition-colors">
                      <Settings size={14} /> تنظیمات
                    </button>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-500 hover:bg-red-50 transition-colors">
                      <LogOut size={14} /> خروج
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Circular Dock Menu */}
          <div className="flex items-center justify-center py-3 px-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-2xl glass-effect dock-shadow border border-white/50">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentPage(item.id);
                    setExpandedMenu(item.id);
                  }}
                  className={`circle-icon group relative flex flex-col items-center ${currentPage === item.id ? 'active' : ''}`}
                  title={item.label}
                >
                  <div 
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-white transition-all duration-300 ${
                      currentPage === item.id 
                        ? `shadow-xl ${item.shadowColor} scale-110` 
                        : 'shadow-md hover:shadow-lg opacity-80 hover:opacity-100'
                    }`}
                    style={{ 
                      background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                    }}
                  >
                    {item.icon}
                  </div>
                  {/* Tooltip */}
                  <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    <span className="text-[9px] font-bold text-gray-600 bg-white px-2 py-0.5 rounded-md shadow-sm border border-gray-100">
                      {item.label}
                    </span>
                  </div>
                  {/* Active indicator dot */}
                  {currentPage === item.id && (
                    <div className="absolute -bottom-1.5 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.gradientFrom }}></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="animate-fade-in">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
