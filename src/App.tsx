import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import BaseData from './pages/BaseData';
import Contacts from './pages/Contacts';
import Purchases from './pages/Purchases';
import Sales from './pages/Sales';
import Inventory from './pages/Inventory';
import Treasury from './pages/Treasury';
import Reports from './pages/Reports';
import Accounting from './pages/Accounting';
import Settings from './pages/Settings';
import LoginPage from './pages/LoginPage';
import ChartOfAccounts from './pages/ChartOfAccounts';
import DatabaseStatus from './components/DatabaseStatus';
import SubPageRenderer from './components/SubPageRenderer';
import { initDatabase } from './database/db';

export type PageType = 'dashboard' | 'base-data' | 'contacts' | 'purchases' | 'sales' | 'inventory' | 'treasury' | 'reports' | 'accounting' | 'settings' | 'chart-of-accounts';

interface User {
  id: number;
  username: string;
  fullName: string;
  role: string;
}

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [subPage, setSubPage] = useState<string>('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [dbLoading, setDbLoading] = useState(true);
  const [notifications, setNotifications] = useState<Array<{id: number; message: string; type: string; time: string}>>([]);
  const [showDbStatus, setShowDbStatus] = useState(false);

  // Initialize database on app start
  useEffect(() => {
    const init = async () => {
      try {
        await initDatabase();
        // Check if user was logged in before (session)
        // Only restore session if it's less than 1 hour old
        const savedUser = localStorage.getItem('sarmad_user');
        const sessionTime = localStorage.getItem('sarmad_session_time');
        
        if (savedUser && sessionTime) {
          const elapsed = Date.now() - parseInt(sessionTime);
          const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
          
          if (elapsed < oneHour) {
            setUser(JSON.parse(savedUser));
          } else {
            // Session expired
            localStorage.removeItem('sarmad_user');
            localStorage.removeItem('sarmad_session_time');
          }
        }
        
        // Load dark mode preference
        const savedDark = localStorage.getItem('sarmad_dark_mode');
        if (savedDark === 'true') setDarkMode(true);
      } catch (e) {
        console.error('Database init failed:', e);
      } finally {
        setDbLoading(false);
      }
    };
    init();
  }, []);

  // Apply dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('sarmad_dark_mode', String(darkMode));
  }, [darkMode]);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
    localStorage.setItem('sarmad_user', JSON.stringify(loggedInUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('sarmad_user');
  };

  const addNotification = (message: string, type: string = 'info') => {
    const newNotif = {
      id: Date.now(),
      message,
      type,
      time: new Date().toLocaleTimeString('fa-IR')
    };
    setNotifications(prev => [newNotif, ...prev].slice(0, 10));
  };

  const dismissNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  if (dbLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900" dir="rtl">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white/20 border-t-blue-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/80 text-sm">در حال بارگذاری پایگاه داده...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    // If subPage is set, render the subpage
    if (subPage) {
      return <SubPageRenderer module={currentPage} subPage={subPage} />;
    }

    // Otherwise render the main page
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'base-data': return <BaseData />;
      case 'contacts': return <Contacts />;
      case 'purchases': return <Purchases />;
      case 'sales': return <Sales />;
      case 'inventory': return <Inventory />;
      case 'treasury': return <Treasury />;
      case 'reports': return <Reports />;
      case 'accounting': return <Accounting />;
      case 'settings': return <Settings />;
      case 'chart-of-accounts': return <ChartOfAccounts />;
      default: return <Dashboard />;
    }
  };

  return (
    <>
      <Layout
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        subPage={subPage}
        setSubPage={setSubPage}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        user={user}
        onLogout={handleLogout}
        notifications={notifications}
        onDismissNotification={dismissNotification}
        onShowDbStatus={() => setShowDbStatus(true)}
      >
        {renderPage()}
      </Layout>
      
      {/* Database Status Modal */}
      {showDbStatus && (
        <DatabaseStatus onClose={() => setShowDbStatus(false)} />
      )}
      
      {/* Toast Notifications */}
      <div className="fixed bottom-4 left-4 z-50 space-y-2">
        {notifications.map(notif => (
          <div 
            key={notif.id}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl shadow-lg animate-slide-left cursor-pointer ${
              notif.type === 'success' ? 'bg-green-500 text-white' :
              notif.type === 'error' ? 'bg-red-500 text-white' :
              notif.type === 'warning' ? 'bg-amber-500 text-white' :
              'bg-blue-500 text-white'
            }`}
            onClick={() => dismissNotification(notif.id)}
          >
            <span className="text-xs font-medium">{notif.message}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
