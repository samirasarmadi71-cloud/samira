import { useState } from 'react';
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

export type PageType = 'dashboard' | 'base-data' | 'contacts' | 'purchases' | 'sales' | 'inventory' | 'treasury' | 'reports' | 'accounting' | 'settings';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderPage = () => {
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
      default: return <Dashboard />;
    }
  };

  return (
    <Layout
      currentPage={currentPage}
      setCurrentPage={setCurrentPage}
      sidebarOpen={sidebarOpen}
      setSidebarOpen={setSidebarOpen}
    >
      {renderPage()}
    </Layout>
  );
}

export default App;
