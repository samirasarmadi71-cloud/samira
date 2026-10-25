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
  Globe, Printer, Upload, HardDrive, History, Info
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
  subItems: SubMenuItem[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'داشبورد',
    icon: <LayoutDashboard size={20} />,
    color: 'from-blue-500 to-blue-600',
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
    color: 'from-emerald-500 to-emerald-600',
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
    color: 'from-violet-500 to-violet-600',
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
    color: 'from-amber-500 to-amber-600',
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
    color: 'from-rose-500 to-rose-600',
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
    color: 'from-cyan-500 to-cyan-600',
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
    color: 'from-indigo-500 to-indigo-600',
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
    color: 'from-teal-500 to-teal-600',
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
    color: 'from-fuchsia-500 to-fuchsia-600',
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
    color: 'from-slate-500 to-slate-600',
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
      <aside className={`${sidebarOpen ? 'w-64' : 'w-0 md:w-16'} transition-all duration-300 bg-gradient-to-b from-[#1e293b] to-[#0f172a] text-white flex flex-col overflow-hidden shadow-2xl z-20`}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-center border-b border-white/10 px-4">
          {sidebarOpen ? (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center shadow-lg">
                <BookOpen size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white">سرمد</h1>
                <p className="text-[10px] text-gray-400">سیستم حسابداری</p>
              </div>
            </div>
          ) : (
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <BookOpen size={20} className="text-white" />
            </div>
          )}
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {menuItems.map((item) => (
            <div key={item.id} className="mb-1">
              <button
                onClick={() => toggleMenu(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
                  ${expandedMenu === item.id
                    ? 'bg-white/15 shadow-lg'
                    : 'hover:bg-white/10'
                  }
                  ${currentPage === item.id && expandedMenu !== item.id ? 'bg-white/10' : ''}
                `}
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center shadow-md group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-right text-sm font-medium">{item.label}</span>
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${expandedMenu === item.id ? 'rotate-180' : ''}`}
                    />
                  </>
                )}
              </button>

              {/* Sub Menu */}
              {sidebarOpen && expandedMenu === item.id && (
                <div className="mt-1 mr-4 border-r-2 border-white/10 pr-3 animate-fade-in">
                  {item.subItems.map((sub, idx) => (
                    <button
                      key={idx}
                      className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all text-xs"
                    >
                      <span className="text-gray-400">{sub.icon}</span>
                      <span>{sub.label}</span>
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
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-white/5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                <User size={14} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium">مدیر سیستم</p>
                <p className="text-[10px] text-gray-400">آنلاین</p>
              </div>
              <button className="text-gray-400 hover:text-red-400 transition-colors">
                <LogOut size={16} />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white shadow-sm border-b border-gray-100 flex items-center justify-between px-4 z-10">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Menu size={20} className="text-gray-600" />
            </button>

            {/* Breadcrumb */}
            <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
              <span>سیستم حسابداری سرمد</span>
              <ChevronLeft size={14} />
              <span className="text-blue-600 font-medium">
                {menuItems.find(m => m.id === currentPage)?.label}
              </span>
            </div>
          </div>

          {/* Header Circular Icons */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 flex items-center justify-center transition-all hover:scale-110 shadow-sm">
              <Search size={18} className="text-blue-600" />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 hover:from-amber-200 hover:to-amber-300 flex items-center justify-center transition-all hover:scale-110 shadow-sm relative"
              >
                <Bell size={18} className="text-amber-600" />
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-bold">3</span>
              </button>
              {showNotifications && (
                <div className="absolute left-0 top-12 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 animate-fade-in z-50">
                  <h3 className="text-sm font-bold text-gray-700 mb-3">اعلان‌ها</h3>
                  <div className="space-y-2">
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-red-50">
                      <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5"></div>
                      <div>
                        <p className="text-xs text-gray-700">چک سررسید امروز: ۵,۰۰۰,۰۰۰ ریال</p>
                        <p className="text-[10px] text-gray-400">۲ دقیقه پیش</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-amber-50">
                      <div className="w-2 h-2 rounded-full bg-amber-500 mt-1.5"></div>
                      <div>
                        <p className="text-xs text-gray-700">کالای کم‌موجود: ۳ قلم</p>
                        <p className="text-[10px] text-gray-400">۱۵ دقیقه پیش</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2 p-2 rounded-lg bg-blue-50">
                      <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                      <div>
                        <p className="text-xs text-gray-700">فاکتور فروش جدید ثبت شد</p>
                        <p className="text-[10px] text-gray-400">۱ ساعت پیش</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Dark Mode */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 flex items-center justify-center transition-all hover:scale-110 shadow-sm"
            >
              {darkMode ? <Sun size={18} className="text-purple-600" /> : <Moon size={18} className="text-purple-600" />}
            </button>

            {/* Calendar */}
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 flex items-center justify-center transition-all hover:scale-110 shadow-sm">
              <Calendar size={18} className="text-green-600" />
            </button>

            {/* User */}
            <button className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-100 to-rose-200 hover:from-rose-200 hover:to-rose-300 flex items-center justify-center transition-all hover:scale-110 shadow-sm">
              <User size={18} className="text-rose-600" />
            </button>

            {/* Date */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200">
              <Calendar size={14} className="text-gray-500" />
              <span className="text-xs text-gray-600 font-medium">۱۴۰۴/۰۴/۱۵</span>
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
