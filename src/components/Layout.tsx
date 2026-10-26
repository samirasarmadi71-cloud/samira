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
  Shield, RefreshCw, Wifi, X
} from 'lucide-react';
import { getPersianDate } from '../utils/persianDate';

interface LayoutProps {
  children: ReactNode;
  currentPage: PageType;
  setCurrentPage: (page: PageType) => void;
  subPage?: string;
  setSubPage?: (page: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  user: { id: number; username: string; fullName: string; role: string };
  onLogout: () => void;
  notifications: Array<{id: number; message: string; type: string; time: string}>;
  onDismissNotification: (id: number) => void;
  onShowDbStatus?: () => void;
}

interface MenuItem {
  id: PageType;
  label: string;
  icon: ReactNode;
  color: string;
  gradientFrom: string;
  gradientTo: string;
  shadowColor: string;
  subItems: { label: string; icon: ReactNode }[];
}

const menuItems: MenuItem[] = [
  {
    id: 'dashboard', label: 'داشبورد', icon: <LayoutDashboard size={22} />,
    color: 'text-blue-600', gradientFrom: '#3b82f6', gradientTo: '#1d4ed8', shadowColor: 'shadow-blue-500/40',
    subItems: [
      { label: 'نمای کلی', icon: <LayoutDashboard size={15} /> },
      { label: 'وضعیت مالی', icon: <DollarSign size={15} /> },
      { label: 'خلاصه فروش و خرید', icon: <BarChart3 size={15} /> },
      { label: 'موجودی و هشدارها', icon: <Package size={15} /> },
      { label: 'چک‌های نزدیک سررسید', icon: <Calendar size={15} /> },
      { label: 'آخرین عملیات', icon: <History size={15} /> },
    ]
  },
  {
    id: 'base-data', label: 'اطلاعات پایه', icon: <Database size={22} />,
    color: 'text-emerald-600', gradientFrom: '#10b981', gradientTo: '#047857', shadowColor: 'shadow-emerald-500/40',
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
    id: 'contacts', label: 'معرفی اشخاص', icon: <Users size={22} />,
    color: 'text-violet-600', gradientFrom: '#8b5cf6', gradientTo: '#6d28d9', shadowColor: 'shadow-violet-500/40',
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
    id: 'purchases', label: 'خرید', icon: <ShoppingCart size={22} />,
    color: 'text-amber-600', gradientFrom: '#f59e0b', gradientTo: '#d97706', shadowColor: 'shadow-amber-500/40',
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
    id: 'sales', label: 'فروش', icon: <TrendingUp size={22} />,
    color: 'text-rose-600', gradientFrom: '#f43f5e', gradientTo: '#e11d48', shadowColor: 'shadow-rose-500/40',
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
    id: 'inventory', label: 'انبار و کالا', icon: <Package size={22} />,
    color: 'text-cyan-600', gradientFrom: '#06b6d4', gradientTo: '#0891b2', shadowColor: 'shadow-cyan-500/40',
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
    id: 'treasury', label: 'چک و خزانه', icon: <Landmark size={22} />,
    color: 'text-indigo-600', gradientFrom: '#6366f1', gradientTo: '#4338ca', shadowColor: 'shadow-indigo-500/40',
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
    id: 'reports', label: 'گزارشات', icon: <BarChart3 size={22} />,
    color: 'text-teal-600', gradientFrom: '#14b8a6', gradientTo: '#0d9488', shadowColor: 'shadow-teal-500/40',
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
    id: 'accounting', label: 'اسناد حسابداری', icon: <BookOpen size={22} />,
    color: 'text-fuchsia-600', gradientFrom: '#d946ef', gradientTo: '#c026d3', shadowColor: 'shadow-fuchsia-500/40',
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
    id: 'settings', label: 'تنظیمات', icon: <Settings size={22} />,
    color: 'text-slate-600', gradientFrom: '#64748b', gradientTo: '#475569', shadowColor: 'shadow-slate-500/40',
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
  {
    id: 'chart-of-accounts', label: 'کدینگ حساب‌ها', icon: <FileText size={22} />,
    color: 'text-pink-600', gradientFrom: '#ec4899', gradientTo: '#db2777', shadowColor: 'shadow-pink-500/40',
    subItems: [
      { label: 'حساب‌های کل', icon: <FileText size={15} /> },
      { label: 'حساب‌های معین', icon: <FileText size={15} /> },
      { label: 'حساب‌های تفصیلی', icon: <FileText size={15} /> },
    ]
  },
];

export default function Layout({ 
  children, currentPage, setCurrentPage,
  subPage, setSubPage,
  sidebarOpen, setSidebarOpen, 
  darkMode, setDarkMode, 
  user, onLogout, 
  notifications, onDismissNotification,
  onShowDbStatus
}: LayoutProps) {
  const [expandedMenu, setExpandedMenu] = useState<PageType>(currentPage);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleMenuClick = (id: PageType) => {
    setExpandedMenu(id);
    setCurrentPage(id);
  };

  const handleSidebarToggle = (id: PageType) => {
    if (expandedMenu === id) {
      setExpandedMenu('dashboard');
    } else {
      setExpandedMenu(id);
      setCurrentPage(id);
    }
  };

  const currentItem = menuItems.find(m => m.id === currentPage);

  return (
    <div className="flex h-screen w-screen" style={{ direction: 'rtl' }}>
      {/* Sidebar */}
      <div 
        style={{ 
          width: sidebarOpen ? '256px' : '0px',
          minWidth: sidebarOpen ? '256px' : '0px',
          transition: 'all 0.3s ease-in-out',
          overflow: sidebarOpen ? 'visible' : 'hidden',
          background: darkMode ? '#1f2937' : '#ffffff',
          borderLeft: sidebarOpen ? (darkMode ? '1px solid #374151' : '1px solid #f3f4f6') : 'none',
          boxShadow: sidebarOpen ? '2px 0 8px rgba(0,0,0,0.05)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 30
        }}
      >
        {/* Logo */}
        <div style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          borderBottom: darkMode ? '1px solid #374151' : '1px solid #f3f4f6',
          padding: '0 16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{
              width: '36px', height: '36px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6, #ec4899)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
            }}>
              <BookOpen size={18} color="white" />
            </div>
            <div>
              <h1 style={{ fontSize: '16px', fontWeight: 900, color: darkMode ? 'white' : '#1f2937', margin: 0 }}>سَرمد</h1>
              <p style={{ fontSize: '9px', color: '#9ca3af', margin: 0, marginTop: '-2px' }}>حسابداری هوشمند</p>
            </div>
          </div>
        </div>

        {/* SQLite Badge - Clickable */}
        <button
          onClick={onShowDbStatus}
          style={{
            margin: '8px 12px', padding: '8px 12px', borderRadius: '12px',
            background: darkMode ? 'rgba(55, 65, 81, 0.5)' : '#eff6ff',
            border: darkMode ? '1px solid #4b5563' : '1px solid #dbeafe',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer', width: 'calc(100% - 24px)',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = darkMode ? 'rgba(55, 65, 81, 0.8)' : '#dbeafe';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = darkMode ? 'rgba(55, 65, 81, 0.5)' : '#eff6ff';
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#4ade80', animation: 'pulse 2s infinite' }}></div>
            <span style={{ fontSize: '10px', color: darkMode ? '#d1d5db' : '#4b5563', fontWeight: 500 }}>پایگاه داده فعال</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Shield size={11} color="#22c55e" />
            <Wifi size={11} color="#60a5fa" />
          </div>
        </button>

        {/* Menu Label */}
        <div style={{ padding: '12px 12px 4px 12px' }}>
          <span style={{ fontSize: '10px', fontWeight: 700, color: '#9ca3af', letterSpacing: '0.05em' }}>منوی اصلی</span>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '4px 10px' }}>
          {menuItems.map((item) => (
            <div key={item.id} style={{ marginBottom: '2px' }}>
              <button
                onClick={() => handleSidebarToggle(item.id)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  borderRadius: '12px',
                  border: 'none',
                  cursor: 'pointer',
                  background: expandedMenu === item.id 
                    ? (darkMode ? 'rgba(55, 65, 81, 0.5)' : '#f9fafb') 
                    : 'transparent',
                  transition: 'all 0.2s',
                  position: 'relative',
                  textAlign: 'right'
                }}
                onMouseEnter={(e) => {
                  if (expandedMenu !== item.id) {
                    e.currentTarget.style.background = darkMode ? 'rgba(55, 65, 81, 0.3)' : 'rgba(249, 250, 251, 0.8)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (expandedMenu !== item.id) {
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                {/* Active indicator */}
                {currentPage === item.id && (
                  <div style={{
                    position: 'absolute', right: '4px', top: '50%', transform: 'translateY(-50%)',
                    width: '4px', height: '24px', borderRadius: '4px',
                    background: `linear-gradient(to bottom, ${item.gradientFrom}, ${item.gradientTo})`
                  }}></div>
                )}

                {/* Icon */}
                <div style={{
                  width: '32px', height: '32px', borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: expandedMenu === item.id 
                    ? `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`
                    : (darkMode ? '#374151' : '#f3f4f6'),
                  color: expandedMenu === item.id ? 'white' : (darkMode ? '#9ca3af' : '#6b7280'),
                  transition: 'all 0.2s',
                  boxShadow: expandedMenu === item.id ? '0 2px 8px rgba(0,0,0,0.15)' : 'none'
                }}>
                  {item.icon}
                </div>

                {/* Label */}
                <span style={{
                  flex: 1, textAlign: 'right', fontSize: '12px', fontWeight: 600,
                  color: expandedMenu === item.id 
                    ? (darkMode ? 'white' : '#1f2937')
                    : (darkMode ? '#9ca3af' : '#6b7280')
                }}>
                  {item.label}
                </span>

                {/* Chevron */}
                {expandedMenu === item.id && (
                  <ChevronDown size={12} color="#9ca3af" style={{ transform: 'rotate(180deg)' }} />
                )}
              </button>

              {/* Submenu */}
              {expandedMenu === item.id && (
                <div style={{
                  marginTop: '4px', marginRight: '16px',
                  borderRight: darkMode ? '1px solid #374151' : '1px solid #f3f4f6',
                  paddingRight: '10px',
                  animation: 'fadeIn 0.2s ease-out'
                }}>
                  {item.subItems.map((sub, idx) => {
                    // Map submenu labels to subPage IDs
                    const subPageMap: Record<string, Record<string, string>> = {
                      'reports': {
                        'فروش و خرید': 'sales-purchase',
                        'موجودی و گردش کالا': 'inventory',
                        'حساب اشخاص': 'contacts',
                        'صندوق و بانک': 'cash-bank',
                        'دفتر روزنامه': 'journal',
                        'دفتر کل و معین': 'ledger',
                        'تراز آزمایشی': 'trial-balance',
                        'سود و زیان': 'profit-loss',
                        'ترازنامه': 'balance-sheet'
                      },
                      'inventory': {
                        'فهرست کالا و خدمات': 'list',
                        'رسید ورود': 'receipt',
                        'حواله خروج': 'issue',
                        'انتقال بین انبارها': 'transfer',
                        'انبارگردانی': 'stocktake',
                        'کارتکس': 'cardex',
                        'گزارش موجودی': 'report',
                        'کالاهای کم‌موجود': 'low-stock'
                      }
                    };
                    
                    const subPageId = subPageMap[item.id]?.[sub.label] || '';
                    
                    return (
                      <button
                        key={idx}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setCurrentPage(item.id);
                          if (setSubPage && subPageId) {
                            setSubPage(subPageId);
                          }
                          console.log('Submenu clicked:', sub.label, '→ Page:', item.id, 'SubPage:', subPageId);
                        }}
                        style={{
                          width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                          padding: '6px 12px', borderRadius: '8px', border: 'none',
                          cursor: 'pointer', background: 'transparent',
                          color: darkMode ? '#9ca3af' : '#9ca3af',
                          fontSize: '11px', transition: 'all 0.2s', textAlign: 'right'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = darkMode ? 'rgba(55, 65, 81, 0.5)' : '#f9fafb';
                          e.currentTarget.style.color = darkMode ? '#e5e7eb' : '#374151';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = darkMode ? '#9ca3af' : '#9ca3af';
                        }}
                      >
                        <span style={{ color: item.color, opacity: 0.6 }}>{sub.icon}</span>
                        <span>{sub.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* User Footer */}
        <div style={{
          padding: '10px', borderTop: darkMode ? '1px solid #374151' : '1px solid #f3f4f6'
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 10px',
            borderRadius: '12px', background: darkMode ? 'rgba(55, 65, 81, 0.5)' : '#f9fafb',
            border: darkMode ? '1px solid #4b5563' : '1px solid #f3f4f6'
          }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #4ade80, #16a34a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <User size={14} color="white" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: '11px', fontWeight: 700, color: darkMode ? 'white' : '#374151', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user.fullName}
              </p>
              <p style={{ fontSize: '9px', color: '#22c55e', margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#4ade80', display: 'inline-block' }}></span>
                {user.role === 'admin' ? 'مدیر سیستم' : user.role}
              </p>
            </div>
            <button
              onClick={onLogout}
              style={{
                padding: '4px', borderRadius: '8px', border: 'none',
                background: 'transparent', cursor: 'pointer', color: '#9ca3af',
                transition: 'all 0.2s'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#fef2f2';
                e.currentTarget.style.color = '#ef4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#9ca3af';
              }}
              title="خروج"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0, background: darkMode ? '#111827' : '#f0f4f8' }}>
        {/* Top Bar */}
        <header style={{
          background: darkMode ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(20px)',
          borderBottom: darkMode ? '1px solid #374151' : '1px solid rgba(229, 231, 235, 0.5)',
          zIndex: 20
        }}>
          {/* Utility Bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '8px 20px',
            borderBottom: darkMode ? '1px solid #374151' : '1px solid rgba(243, 244, 246, 0.5)'
          }}>
            {/* Left: Menu Toggle + Breadcrumb */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                style={{
                  width: '36px', height: '36px', borderRadius: '12px', border: 'none',
                  background: darkMode ? '#374151' : '#f3f4f6',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? '#4b5563' : '#e5e7eb'}
                onMouseLeave={(e) => e.currentTarget.style.background = darkMode ? '#374151' : '#f3f4f6'}
              >
                <Menu size={18} color={darkMode ? '#d1d5db' : '#4b5563'} />
              </button>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                <span style={{ color: '#9ca3af' }}>سیستم حسابداری سرمد</span>
                <ChevronLeft size={12} color="#d1d5db" />
                <span style={{ fontWeight: 700, color: currentItem?.color?.includes('blue') ? '#2563eb' : '#3b82f6' }}>
                  {currentItem?.label}
                </span>
              </div>
            </div>

            {/* Right: Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              {/* Search */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '6px 12px', borderRadius: '12px',
                background: darkMode ? '#374151' : '#f9fafb',
                border: darkMode ? '1px solid #4b5563' : '1px solid rgba(229, 231, 235, 0.5)',
                width: '200px'
              }}>
                <Search size={14} color="#9ca3af" />
                <input 
                  type="text" 
                  placeholder="جست‌وجو..." 
                  style={{
                    background: 'transparent', border: 'none', outline: 'none',
                    fontSize: '12px', color: darkMode ? '#e5e7eb' : '#4b5563',
                    width: '100%'
                  }}
                />
              </div>

              {/* Date */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                padding: '6px 12px', borderRadius: '12px',
                background: darkMode ? 'rgba(67, 56, 202, 0.2)' : '#eef2ff',
                border: darkMode ? '1px solid rgba(99, 102, 241, 0.3)' : '1px solid rgba(199, 210, 254, 0.5)'
              }}>
                <Calendar size={12} color="#6366f1" />
                <span style={{ fontSize: '11px', color: '#4338ca', fontWeight: 700 }}>{getPersianDate()}</span>
              </div>

              {/* Notifications */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  style={{
                    width: '36px', height: '36px', borderRadius: '12px', border: 'none',
                    background: darkMode ? 'rgba(180, 83, 9, 0.2)' : '#fffbeb',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    position: 'relative',
                    borderStyle: 'solid', borderWidth: '1px',
                    borderColor: darkMode ? 'rgba(180, 83, 9, 0.3)' : 'rgba(254, 243, 199, 0.5)'
                  }}
                >
                  <Bell size={16} color="#d97706" />
                  {notifications.length > 0 && (
                    <span style={{
                      position: 'absolute', top: '-4px', right: '-4px',
                      width: '16px', height: '16px', borderRadius: '50%',
                      background: '#ef4444', color: 'white', fontSize: '8px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontWeight: 700, boxShadow: '0 2px 4px rgba(239, 68, 68, 0.4)'
                    }}>{notifications.length}</span>
                  )}
                </button>
                {showNotifications && (
                  <div style={{
                    position: 'absolute', left: 0, top: '48px', width: '280px',
                    background: darkMode ? '#1f2937' : 'white',
                    borderRadius: '16px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    border: darkMode ? '1px solid #374151' : '1px solid #f3f4f6',
                    padding: '16px', zIndex: 100, animation: 'scaleIn 0.2s ease-out'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                      <h3 style={{ fontSize: '12px', fontWeight: 700, color: darkMode ? 'white' : '#1f2937', margin: 0 }}>اعلان‌ها</h3>
                      <button onClick={() => setShowNotifications(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                        <X size={14} color="#9ca3af" />
                      </button>
                    </div>
                    {notifications.length === 0 ? (
                      <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', padding: '16px 0' }}>اعلانی وجود ندارد</p>
                    ) : (
                      <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
                        {notifications.map(notif => (
                          <div key={notif.id} style={{
                            display: 'flex', alignItems: 'flex-start', gap: '8px',
                            padding: '8px', borderRadius: '12px', marginBottom: '8px',
                            background: darkMode ? 'rgba(55, 65, 81, 0.5)' : '#f9fafb',
                            border: darkMode ? '1px solid #374151' : '1px solid #f3f4f6'
                          }}>
                            <div style={{
                              width: '24px', height: '24px', borderRadius: '50%', flexShrink: 0,
                              background: notif.type === 'success' ? '#22c55e' : notif.type === 'error' ? '#ef4444' : notif.type === 'warning' ? '#f59e0b' : '#3b82f6',
                              display: 'flex', alignItems: 'center', justifyContent: 'center'
                            }}>
                              <Bell size={10} color="white" />
                            </div>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: '11px', color: darkMode ? '#e5e7eb' : '#374151', margin: 0 }}>{notif.message}</p>
                              <p style={{ fontSize: '9px', color: '#9ca3af', margin: 0 }}>{notif.time}</p>
                            </div>
                            <button onClick={() => onDismissNotification(notif.id)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                              <X size={12} color="#9ca3af" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Dark Mode */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                style={{
                  width: '36px', height: '36px', borderRadius: '12px', border: 'none',
                  background: darkMode ? 'rgba(147, 51, 234, 0.2)' : '#faf5ff',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderStyle: 'solid', borderWidth: '1px',
                  borderColor: darkMode ? 'rgba(147, 51, 234, 0.3)' : 'rgba(243, 232, 255, 0.5)'
                }}
              >
                {darkMode ? <Sun size={16} color="#fbbf24" /> : <Moon size={16} color="#9333ea" />}
              </button>

              {/* Refresh */}
              <button
                style={{
                  width: '36px', height: '36px', borderRadius: '12px', border: 'none',
                  background: darkMode ? 'rgba(34, 197, 94, 0.2)' : '#f0fdf4',
                  cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderStyle: 'solid', borderWidth: '1px',
                  borderColor: darkMode ? 'rgba(34, 197, 94, 0.3)' : 'rgba(220, 252, 231, 0.5)'
                }}
              >
                <RefreshCw size={16} color="#22c55e" />
              </button>

              {/* User */}
              <div style={{ position: 'relative' }}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    padding: '4px 8px', borderRadius: '12px', border: 'none',
                    background: 'transparent', cursor: 'pointer', transition: 'all 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? '#374151' : '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div style={{
                    width: '32px', height: '32px', borderRadius: '50%',
                    background: 'linear-gradient(135deg, #fb7185, #db2777)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 2px 4px rgba(219, 39, 119, 0.2)'
                  }}>
                    <User size={14} color="white" />
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '11px', fontWeight: 700, color: darkMode ? 'white' : '#374151', margin: 0 }}>{user.fullName}</p>
                    <p style={{ fontSize: '9px', color: '#9ca3af', margin: 0 }}>{user.role === 'admin' ? 'مدیر سیستم' : user.role}</p>
                  </div>
                </button>
                {showUserMenu && (
                  <div style={{
                    position: 'absolute', left: 0, top: '48px', width: '180px',
                    background: darkMode ? '#1f2937' : 'white',
                    borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                    border: darkMode ? '1px solid #374151' : '1px solid #f3f4f6',
                    padding: '6px', zIndex: 100, animation: 'scaleIn 0.2s ease-out'
                  }}>
                    <button style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 12px', borderRadius: '8px', border: 'none',
                      background: 'transparent', cursor: 'pointer', fontSize: '12px',
                      color: darkMode ? '#d1d5db' : '#4b5563', textAlign: 'right'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? '#374151' : '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <User size={14} /> پروفایل
                    </button>
                    <button style={{
                      width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                      padding: '8px 12px', borderRadius: '8px', border: 'none',
                      background: 'transparent', cursor: 'pointer', fontSize: '12px',
                      color: darkMode ? '#d1d5db' : '#4b5563', textAlign: 'right'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = darkMode ? '#374151' : '#f9fafb'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <Settings size={14} /> تنظیمات
                    </button>
                    <div style={{ borderTop: darkMode ? '1px solid #374151' : '1px solid #f3f4f6', margin: '4px 0' }}></div>
                    <button 
                      onClick={onLogout}
                      style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
                        padding: '8px 12px', borderRadius: '8px', border: 'none',
                        background: 'transparent', cursor: 'pointer', fontSize: '12px',
                        color: '#ef4444', textAlign: 'right'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.background = '#fef2f2'}
                      onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                    >
                      <LogOut size={14} /> خروج
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Circular Dock Menu */}
          <div style={{
            display: 'flex', justifyContent: 'center', padding: '12px 16px',
            overflowX: 'auto'
          }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '8px 12px', borderRadius: '20px',
              background: darkMode ? 'rgba(55, 65, 81, 0.8)' : 'rgba(255, 255, 255, 0.75)',
              backdropFilter: 'blur(20px)',
              border: darkMode ? '1px solid rgba(75, 85, 99, 0.5)' : '1px solid rgba(255, 255, 255, 0.5)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.1) inset',
              flexShrink: 0
            }}>
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleMenuClick(item.id)}
                  title={item.label}
                  style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    background: 'none', border: 'none', cursor: 'pointer',
                    padding: '4px', position: 'relative',
                    transition: 'transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    transform: currentPage === item.id ? 'translateY(-8px) scale(1.15)' : 'translateY(0)',
                    zIndex: currentPage === item.id ? 10 : 1
                  }}
                  onMouseEnter={(e) => {
                    if (currentPage !== item.id) {
                      e.currentTarget.style.transform = 'translateY(-6px) scale(1.1)';
                      e.currentTarget.style.zIndex = '10';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (currentPage !== item.id) {
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.zIndex = '1';
                    }
                  }}
                >
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: `linear-gradient(135deg, ${item.gradientFrom}, ${item.gradientTo})`,
                    color: 'white',
                    boxShadow: currentPage === item.id 
                      ? `0 10px 25px ${item.gradientFrom}66`
                      : '0 4px 12px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s',
                    opacity: currentPage === item.id ? 1 : 0.85
                  }}>
                    {item.icon}
                  </div>
                  {/* Tooltip */}
                  <div style={{
                    position: 'absolute', bottom: '-24px', left: '50%',
                    transform: 'translateX(-50%)', opacity: 0,
                    transition: 'opacity 0.2s', pointerEvents: 'none',
                    whiteSpace: 'nowrap'
                  }}
                  className="dock-tooltip"
                  >
                    <span style={{
                      fontSize: '9px', fontWeight: 700,
                      color: darkMode ? '#e5e7eb' : '#4b5563',
                      background: darkMode ? '#374151' : 'white',
                      border: darkMode ? '1px solid #4b5563' : '1px solid #f3f4f6',
                      padding: '2px 8px', borderRadius: '6px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      {item.label}
                    </span>
                  </div>
                  {/* Active dot */}
                  {currentPage === item.id && (
                    <div style={{
                      position: 'absolute', bottom: '-4px',
                      width: '6px', height: '6px', borderRadius: '50%',
                      background: item.gradientFrom
                    }}></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{ flex: 1, overflowY: 'auto', padding: '16px 24px' }}>
          <div style={{ animation: 'fadeIn 0.3s ease-out' }}>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
