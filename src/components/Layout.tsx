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
  Shield, RefreshCw, Wifi
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
  subItems: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'داشبورد',
    icon: <LayoutDashboard size={20} />,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500',
    subItems: [
      { label: 'نمای کلی', icon: <LayoutDashboard size={16} /> },
      { label: 'وضعیت مالی', icon: <DollarSign size={16} /> },
      { label: 'خلاصه فروش و خرید', icon: <BarChart3 size={16} /> },
      { label: 'موجودی و هشدارها', icon: <Package size={16} /> },
      { label: 'چک‌های نزدیک سررسید', icon: <Calendar size={16} /> },
      { label: 'آخرین عملیات', icon: <History size={16} /> },
    ]
  },
  {
    id: 'base-data',
    label: 'اطلاعات پایه',
    icon: <Database size={20} />,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500',
    subItems: [
      { label: 'اطلاعات شرکت', icon: <Building2 size={16} /> },
      { label: 'سال مالی و دوره‌ها', icon: <Calendar size={16} /> },
      { label: 'گروه کالا و خدمات', icon: <Tags size={16} /> },
      { label: 'واحدها', icon: <Ruler size={16} /> },
      { label: 'انبارها', icon: <Warehouse size={16} /> },
      { label: 'صندوق و بانک', icon: <Landmark size={16} /> },
      { label: 'کدینگ حساب‌ها', icon: <FileText size={16} /> },
      { label: 'روش‌های پرداخت', icon: <CreditCard size={16} /> },
      { label: 'شماره‌گذاری اسناد', icon: <Hash size={16} /> },
    ]
  },
  {
    id: 'contacts',
    label: 'معرفی اشخاص',
    icon: <Users size={20} />,
    color: 'text-violet-500',
    bgColor: 'bg-violet-500',
    subItems: [
      { label: 'فهرست اشخاص', icon: <Users size={16} /> },
      { label: 'شخص جدید', icon: <UserPlus size={16} /> },
      { label: 'مشتریان', icon: <User size={16} /> },
      { label: 'تأمین‌کنندگان', icon: <ShoppingCart size={16} /> },
      { label: 'پرونده شخص', icon: <FolderOpen size={16} /> },
      { label: 'گردش حساب', icon: <BarChart3 size={16} /> },
      { label: 'مانده حساب', icon: <DollarSign size={16} /> },
    ]
  },
  {
    id: 'purchases',
    label: 'خرید',
    icon: <ShoppingCart size={20} />,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500',
    subItems: [
      { label: 'فاکتور خرید جدید', icon: <Receipt size={16} /> },
      { label: 'فهرست فاکتورها', icon: <ClipboardList size={16} /> },
      { label: 'پیش‌فاکتور و سفارش', icon: <FileText size={16} /> },
      { label: 'برگشت از خرید', icon: <TrendingDown size={16} /> },
      { label: 'هزینه‌های خرید', icon: <DollarSign size={16} /> },
      { label: 'گزارش خرید', icon: <BarChart3 size={16} /> },
    ]
  },
  {
    id: 'sales',
    label: 'فروش',
    icon: <TrendingUp size={20} />,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500',
    subItems: [
      { label: 'فاکتور فروش جدید', icon: <Receipt size={16} /> },
      { label: 'فهرست فاکتورها', icon: <ClipboardList size={16} /> },
      { label: 'پیش‌فاکتور و سفارش', icon: <FileText size={16} /> },
      { label: 'برگشت از فروش', icon: <TrendingDown size={16} /> },
      { label: 'دریافت‌های مرتبط', icon: <Banknote size={16} /> },
      { label: 'گزارش فروش و سود', icon: <PieChart size={16} /> },
    ]
  },
  {
    id: 'inventory',
    label: 'انبار و کالا',
    icon: <Package size={20} />,
    color: 'text-cyan-500',
    bgColor: 'bg-cyan-500',
    subItems: [
      { label: 'فهرست کالا و خدمات', icon: <Package size={16} /> },
      { label: 'رسید ورود', icon: <ArrowRightLeft size={16} /> },
      { label: 'حواله خروج', icon: <ArrowRightLeft size={16} /> },
      { label: 'انتقال بین انبارها', icon: <ArrowRightLeft size={16} /> },
      { label: 'انبارگردانی', icon: <ClipboardList size={16} /> },
      { label: 'کارتکس', icon: <FileText size={16} /> },
      { label: 'گزارش موجودی', icon: <BarChart3 size={16} /> },
      { label: 'کالاهای کم‌موجود', icon: <Package size={16} /> },
    ]
  },
  {
    id: 'treasury',
    label: 'چک و خزانه‌داری',
    icon: <Landmark size={20} />,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500',
    subItems: [
      { label: 'دریافت وجه', icon: <Banknote size={16} /> },
      { label: 'پرداخت وجه', icon: <DollarSign size={16} /> },
      { label: 'صندوق و بانک', icon: <Landmark size={16} /> },
      { label: 'انتقال وجه', icon: <ArrowRightLeft size={16} /> },
      { label: 'چک‌های دریافتی', icon: <CreditCard size={16} /> },
      { label: 'چک‌های پرداختی', icon: <CreditCard size={16} /> },
      { label: 'سررسید چک‌ها', icon: <Calendar size={16} /> },
      { label: 'مغایرت بانکی', icon: <Scale size={16} /> },
    ]
  },
  {
    id: 'reports',
    label: 'گزارشات',
    icon: <BarChart3 size={20} />,
    color: 'text-teal-500',
    bgColor: 'bg-teal-500',
    subItems: [
      { label: 'فروش و خرید', icon: <BarChart3 size={16} /> },
      { label: 'موجودی و گردش کالا', icon: <Package size={16} /> },
      { label: 'حساب اشخاص', icon: <Users size={16} /> },
      { label: 'صندوق و بانک', icon: <Landmark size={16} /> },
      { label: 'دفتر روزنامه', icon: <BookOpen size={16} /> },
      { label: 'دفتر کل و معین', icon: <BookOpen size={16} /> },
      { label: 'تراز آزمایشی', icon: <Scale size={16} /> },
      { label: 'سود و زیان', icon: <TrendingUp size={16} /> },
      { label: 'ترازنامه', icon: <FileSpreadsheet size={16} /> },
    ]
  },
  {
    id: 'accounting',
    label: 'اسناد حسابداری',
    icon: <BookOpen size={20} />,
    color: 'text-fuchsia-500',
    bgColor: 'bg-fuchsia-500',
    subItems: [
      { label: 'ثبت سند', icon: <PenTool size={16} /> },
      { label: 'فهرست اسناد', icon: <ClipboardList size={16} /> },
      { label: 'اسناد پیش‌نویس', icon: <FileText size={16} /> },
      { label: 'اسناد تأییدشده و قطعی', icon: <Lock size={16} /> },
      { label: 'اسناد اصلاحی و برگشتی', icon: <ArrowRightLeft size={16} /> },
      { label: 'بستن دوره مالی', icon: <Calendar size={16} /> },
    ]
  },
  {
    id: 'settings',
    label: 'تنظیمات',
    icon: <Settings size={20} />,
    color: 'text-slate-500',
    bgColor: 'bg-slate-500',
    subItems: [
      { label: 'کاربران و مجوزها', icon: <Users size={16} /> },
      { label: 'ظاهر', icon: <Palette size={16} /> },
      { label: 'تاریخ، ارقام و واحد پول', icon: <Globe size={16} /> },
      { label: 'قالب چاپ', icon: <Printer size={16} /> },
      { label: 'ورود و خروج Excel', icon: <Upload size={16} /> },
      { label: 'پشتیبان‌گیری و بازیابی', icon: <HardDrive size={16} /> },
      { label: 'سوابق عملیات', icon: <History size={16} /> },
      { label: 'اطلاعات نسخه', icon: <Info size={16} /> },
    ]
  },
];

export default function Layout({ children, currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }: LayoutProps) {
  const [expandedMenu, setExpandedMenu] = useState<PageType | null>(currentPage);
  const [darkMode, setDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const toggleMenu = (id: PageType) => {
    if (expandedMenu === id) {
      setExpandedMenu(null);
    } else {
      setExpandedMenu(id);
      setCurrentPage(id);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#f0f4f8]">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-72' : 'w-0 md:w-20'} transition-all duration-300 bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white flex flex-col overflow-hidden shadow-2xl z-20 relative`}>
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 pointer-events-none"></div>
        
        {/* Logo */}
        <div className="h-20 flex items-center justify-center border-b border-white/10 px-4 relative">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30 animate-pulse-soft">
                <BookOpen size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-black text-white tracking-wide">سَرمد</h1>
                <p className="text-[10px] text-blue-300 font-medium">سیستم حسابداری و انبارداری</p>
              </div>
            </div>
          ) : (
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <BookOpen size={22} className="text-white" />
            </div>
          )}
        </div>

        {/* Status Bar */}
        {sidebarOpen && (
          <div className="mx-4 mt-3 p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <span className="text-[10px] text-gray-300">آفلاین فعال</span>
            </div>
            <div className="flex items-center gap-1">
              <Wifi size={12} className="text-gray-400" />
              <Shield size={12} className="text-green-400" />
            </div>
          </div>
        )}

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 relative">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1.5">
              <button
                onClick={() => toggleMenu(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-200 group relative overflow-hidden
                  ${expandedMenu === item.id
                    ? 'bg-white/15 shadow-lg shadow-black/20'
                    : 'hover:bg-white/8'
                  }
                  ${currentPage === item.id && expandedMenu !== item.id ? 'bg-white/10' : ''}
                `}
              >
                {/* Active indicator */}
                {currentPage === item.id && (
                  <div className={`absolute right-0 top-1/2 -translate-y-1/2 w-1 h-8 rounded-l-full ${item.bgColor}`}></div>
                )}
                
                <div className={`w-9 h-9 rounded-xl ${expandedMenu === item.id ? item.bgColor : 'bg-white/10'} flex items-center justify-center shadow-md group-hover:scale-110 transition-all duration-200 ${expandedMenu === item.id ? 'text-white shadow-lg' : 'text-gray-300 group-hover:text-white'}`}>
                  {item.icon}
                </div>
                {sidebarOpen && (
                  <>
                    <span className={`flex-1 text-right text-sm font-medium ${expandedMenu === item.id ? 'text-white' : 'text-gray-300 group-hover:text-white'} transition-colors`}>{item.label}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-300 text-gray-400 ${expandedMenu === item.id ? 'rotate-180 text-white' : ''}`}
                    />
                  </>
                )}
              </button>

              {/* Sub Menu */}
              {sidebarOpen && expandedMenu === item.id && (
                <div className="mt-2 mr-5 border-r-2 border-white/10 pr-3 animate-fade-in">
                  {item.subItems.map((sub, idx) => (
                    <button
                      key={idx}
                      className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-gray-400 hover:text-white hover:bg-white/10 transition-all text-xs group/sub"
                    >
                      <span className={`${item.color} opacity-60 group-hover/sub:opacity-100 transition-opacity`}>{sub.icon}</span>
                      <span className="group-hover/sub:translate-x-[-2px] transition-transform">{sub.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar Footer */}
        {sidebarOpen && (
          <div className="p-3 border-t border-white/10">
            <div className="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/5 border border-white/10">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/20">
                <User size={16} className="text-white" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-white">مدیر سیستم</p>
                <p className="text-[10px] text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block"></span>
                  آنلاین
                </p>
              </div>
              <button className="text-gray-400 hover:text-red-400 transition-colors p-1.5 rounded-lg hover:bg-white/10">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header with Circular Icons */}
        <header className="h-20 bg-white/80 backdrop-blur-xl shadow-sm border-b border-gray-100/80 flex items-center justify-between px-6 z-10 relative">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-11 h-11 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 flex items-center justify-center transition-all hover:shadow-md active:scale-95"
            >
              <Menu size={20} className="text-gray-600" />
            </button>

            {/* Breadcrumb */}
            <div className="hidden md:flex items-center gap-2">
              <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 shadow-sm">
                <span className="text-xs text-gray-400">سیستم حسابداری سرمد</span>
                <ChevronLeft size={14} className="text-gray-300" />
                <span className={`text-sm font-bold ${menuItems.find(m => m.id === currentPage)?.color || 'text-blue-600'}`}>
                  {menuItems.find(m => m.id === currentPage)?.label}
                </span>
              </div>
            </div>
          </div>

          {/* Center - Quick Access Circular Icons */}
          <div className="hidden lg:flex items-center gap-3">
            <QuickAccessIcon
              icon={<Receipt size={18} />}
              label="فاکتور جدید"
              gradient="from-blue-400 to-blue-600"
              shadowColor="shadow-blue-500/30"
              onClick={() => setCurrentPage('sales')}
            />
            <QuickAccessIcon
              icon={<Package size={18} />}
              label="رسید انبار"
              gradient="from-emerald-400 to-emerald-600"
              shadowColor="shadow-emerald-500/30"
              onClick={() => setCurrentPage('inventory')}
            />
            <QuickAccessIcon
              icon={<Banknote size={18} />}
              label="دریافت وجه"
              gradient="from-amber-400 to-amber-600"
              shadowColor="shadow-amber-500/30"
              onClick={() => setCurrentPage('treasury')}
            />
            <QuickAccessIcon
              icon={<PenTool size={18} />}
              label="ثبت سند"
              gradient="from-fuchsia-400 to-fuchsia-600"
              shadowColor="shadow-fuchsia-500/30"
              onClick={() => setCurrentPage('accounting')}
            />
            <QuickAccessIcon
              icon={<BarChart3 size={18} />}
              label="گزارشات"
              gradient="from-teal-400 to-teal-600"
              shadowColor="shadow-teal-500/30"
              onClick={() => setCurrentPage('reports')}
            />
          </div>

          {/* Right Section - Circular Icons */}
          <div className="flex items-center gap-2.5">
            {/* Search */}
            <button className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 border border-blue-200/50">
              <Search size={18} className="text-blue-600" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-11 h-11 rounded-full bg-gradient-to-br from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-amber-500/20 active:scale-95 border border-amber-200/50 relative"
              >
                <Bell size={18} className="text-amber-600" />
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 rounded-full text-[9px] text-white flex items-center justify-center font-bold shadow-lg shadow-red-500/40 animate-pulse-soft">۳</span>
              </button>
              {showNotifications && (
                <div className="absolute left-0 top-14 w-80 bg-white rounded-3xl shadow-2xl border border-gray-100 p-5 animate-fade-in z-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-bold text-gray-800">اعلان‌ها</h3>
                    <span className="text-[10px] text-blue-500 bg-blue-50 px-2 py-1 rounded-full">۳ جدید</span>
                  </div>
                  <div className="space-y-2.5">
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-red-50/80 border border-red-100/50">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center flex-shrink-0">
                        <CreditCard size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-700 font-medium">چک سررسید امروز</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">مبلغ: ۵,۰۰۰,۰۰۰ ریال - بانک ملت</p>
                        <p className="text-[10px] text-gray-400">۲ دقیقه پیش</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-amber-50/80 border border-amber-100/50">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center flex-shrink-0">
                        <Package size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-700 font-medium">کالای کم‌موجود</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">۳ قلم کالا زیر حداقل موجودی</p>
                        <p className="text-[10px] text-gray-400">۱۵ دقیقه پیش</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-2xl bg-blue-50/80 border border-blue-100/50">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center flex-shrink-0">
                        <Receipt size={14} className="text-white" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-700 font-medium">فاکتور فروش جدید</p>
                        <p className="text-[10px] text-gray-400 mt-0.5">فاکتور #۱۲۳۸ ثبت شد</p>
                        <p className="text-[10px] text-gray-400">۱ ساعت پیش</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full mt-3 py-2 text-xs text-blue-600 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors font-medium">
                    مشاهده همه اعلان‌ها
                  </button>
                </div>
              )}
            </div>

            {/* Refresh */}
            <button className="w-11 h-11 rounded-full bg-gradient-to-br from-green-50 to-green-100 hover:from-green-100 hover:to-green-200 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-green-500/20 active:scale-95 border border-green-200/50">
              <RefreshCw size={18} className="text-green-600" />
            </button>

            {/* Dark Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-11 h-11 rounded-full bg-gradient-to-br from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95 border border-purple-200/50"
            >
              {darkMode ? <Sun size={18} className="text-purple-600" /> : <Moon size={18} className="text-purple-600" />}
            </button>

            {/* Calendar */}
            <button className="w-11 h-11 rounded-full bg-gradient-to-br from-cyan-50 to-cyan-100 hover:from-cyan-100 hover:to-cyan-200 flex items-center justify-center transition-all hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/20 active:scale-95 border border-cyan-200/50">
              <Calendar size={18} className="text-cyan-600" />
            </button>

            {/* Separator */}
            <div className="w-px h-8 bg-gray-200 mx-1"></div>

            {/* User Profile */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2.5 px-2 py-1.5 rounded-2xl hover:bg-gray-50 transition-all"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-400 to-pink-600 flex items-center justify-center shadow-lg shadow-rose-500/20">
                  <User size={18} className="text-white" />
                </div>
                <div className="hidden xl:block text-right">
                  <p className="text-xs font-bold text-gray-700">مدیر سیستم</p>
                  <p className="text-[10px] text-gray-400">admin@sarmad.ir</p>
                </div>
              </button>
              {showUserMenu && (
                <div className="absolute left-0 top-14 w-56 bg-white rounded-2xl shadow-2xl border border-gray-100 p-2 animate-fade-in z-50">
                  <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    <User size={16} /> پروفایل
                  </button>
                  <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                    <Settings size={16} /> تنظیمات
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-50 transition-colors">
                    <LogOut size={16} /> خروج
                  </button>
                </div>
              )}
            </div>

            {/* Date Badge */}
            <div className="hidden xl:flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-indigo-50 to-blue-50 border border-indigo-100/80 shadow-sm">
              <Calendar size={14} className="text-indigo-500" />
              <span className="text-xs text-indigo-700 font-bold">۱۴۰۴/۰۴/۱۵</span>
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

// Quick Access Icon Component
function QuickAccessIcon({ icon, label, gradient, shadowColor, onClick }: {
  icon: ReactNode;
  label: string;
  gradient: string;
  shadowColor: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex flex-col items-center gap-1"
      title={label}
    >
      <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center text-white shadow-lg ${shadowColor} group-hover:scale-110 group-active:scale-95 transition-all duration-200`}>
        {icon}
      </div>
      <span className="text-[9px] text-gray-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">{label}</span>
    </button>
  );
}
