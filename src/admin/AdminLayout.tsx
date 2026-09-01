import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Tag, 
  BarChart3, 
  Settings, 
  ExternalLink, 
  Bell, 
  Menu, 
  X, 
  ArrowLeft, 
  Store,
  Sparkles,
  Search,
  ShieldCheck,
  ChevronRight,
  LogOut,
  UserCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { AdminLogin } from './AdminLogin';
import { AdminOverview } from './AdminOverview';
import { AdminProducts } from './AdminProducts';
import { AdminOrders } from './AdminOrders';
import { AdminCustomers } from './AdminCustomers';
import { AdminCoupons } from './AdminCoupons';
import { AdminAnalytics } from './AdminAnalytics';
import { AdminSettings } from './AdminSettings';

export const AdminLayout: React.FC = () => {
  const { 
    currentView, 
    setCurrentView, 
    adminActiveTab, 
    setAdminActiveTab,
    orders,
    products,
    coupons,
    storeSettings,
    isAdminAuthenticated,
    adminLogout
  } = useShop();

  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // If user is not authenticated with valid admin credentials, show the Login screen
  if (!isAdminAuthenticated) {
    return <AdminLogin />;
  }

  const pendingOrdersCount = orders.filter((o) => o.status === 'Confirmed' || o.status === 'Processing').length;
  const outOfStockCount = products.filter((p) => !p.inStock).length;

  interface NavItem {
    id: string;
    label: string;
    icon: React.ElementType;
    badge?: string;
  }

  const NAV_ITEMS: NavItem[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'products', label: 'Products', icon: Package, badge: outOfStockCount > 0 ? `${outOfStockCount} out` : undefined },
    { id: 'orders', label: 'Orders', icon: ShoppingBag, badge: pendingOrdersCount > 0 ? `${pendingOrdersCount}` : undefined },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'coupons', label: 'Coupons & Promos', icon: Tag },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Store Settings', icon: Settings },
  ];

  const renderActiveTabContent = () => {
    switch (adminActiveTab) {
      case 'overview':
        return <AdminOverview onNavigateTab={(tab) => setAdminActiveTab(tab as any)} />;
      case 'products':
        return <AdminProducts />;
      case 'orders':
        return <AdminOrders />;
      case 'customers':
        return <AdminCustomers />;
      case 'coupons':
        return <AdminCoupons />;
      case 'analytics':
        return <AdminAnalytics />;
      case 'settings':
        return <AdminSettings />;
      default:
        return <AdminOverview onNavigateTab={(tab) => setAdminActiveTab(tab as any)} />;
    }
  };

  return (
    <div className="min-h-screen bg-neutral-100 flex flex-col md:flex-row text-neutral-900 font-sans antialiased">
      
      {/* Mobile Header Bar */}
      <div className="md:hidden bg-neutral-950 text-white p-4 flex items-center justify-between sticky top-0 z-40 border-b border-neutral-800">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#FF5500] text-white flex items-center justify-center font-black text-sm">
            R
          </div>
          <div>
            <span className="font-extrabold text-sm tracking-tight text-white font-sans">
              RTHVX ADMIN
            </span>
            <span className="block text-[10px] text-neutral-400">Store Management Console</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentView('store')}
            className="px-2.5 py-1.5 text-xs bg-neutral-800 text-neutral-200 rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <Store className="w-3.5 h-3.5" /> Store
          </button>
          <button
            onClick={adminLogout}
            className="p-1.5 text-red-400 hover:text-red-300 hover:bg-neutral-900 rounded-lg cursor-pointer"
            title="Log Out Admin"
          >
            <LogOut className="w-4 h-4" />
          </button>
          <button
            onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
            className="p-2 text-neutral-300 hover:text-white"
          >
            {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Sidebar for Desktop & Mobile Overlay */}
      <aside
        className={`fixed md:sticky top-0 left-0 h-screen w-64 bg-neutral-950 text-neutral-300 flex flex-col justify-between z-50 border-r border-neutral-800/80 transition-transform duration-200 ${
          isMobileNavOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 flex flex-col flex-1 overflow-y-auto">
          
          {/* Logo & Brand */}
          <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#FF5500] text-white flex items-center justify-center font-black text-sm shadow-md">
                R
              </div>
              <div>
                <h2 className="text-base font-extrabold text-white tracking-wider font-sans">
                  RTHVX
                </h2>
                <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-mono">
                  Console v2.4
                </span>
              </div>
            </div>
            {isMobileNavOpen && (
              <button
                onClick={() => setIsMobileNavOpen(false)}
                className="md:hidden text-neutral-400 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Nav List */}
          <nav className="mt-6 space-y-1.5 flex-1">
            <div className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider px-3 pb-2">
              Management
            </div>

            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = adminActiveTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setAdminActiveTab(item.id as any);
                    setIsMobileNavOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FF5500] text-white shadow-sm'
                      : 'text-neutral-400 hover:bg-neutral-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full ${
                      isActive ? 'bg-black/30 text-white' : 'bg-neutral-800 text-neutral-300'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Switch to Storefront Button */}
          <div className="pt-4 border-t border-neutral-800 space-y-2">
            <button
              onClick={() => setCurrentView('store')}
              className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white text-xs font-semibold flex items-center justify-center gap-2 border border-neutral-800 transition-all cursor-pointer"
            >
              <Store className="w-4 h-4 text-[#FF5500]" />
              <span>Back to Storefront</span>
              <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-60" />
            </button>
          </div>
        </div>

        {/* User / Session Card with Logout */}
        <div className="p-4 bg-neutral-900/80 border-t border-neutral-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-full bg-[#FF5500]/20 text-[#FF5500] font-bold flex items-center justify-center text-xs shrink-0">
              RX
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate flex items-center gap-1">
                <span>rthvx7</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
              </p>
              <p className="text-[10px] text-neutral-400 truncate">Super Admin</p>
            </div>
          </div>

          <button
            onClick={adminLogout}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-red-400 hover:bg-neutral-800 transition-colors cursor-pointer"
            title="Log Out of Admin Console"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 flex flex-col h-screen overflow-y-auto">
        
        {/* Desktop Top Header Bar */}
        <header className="hidden md:flex bg-white border-b border-neutral-200/80 px-8 py-4 items-center justify-between sticky top-0 z-30 shadow-xs">
          <div className="flex items-center gap-3 text-xs text-neutral-500">
            <span className="font-semibold text-neutral-900">{storeSettings.storeName}</span>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            <span className="capitalize font-bold text-neutral-900">{adminActiveTab}</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Quick stats indicator */}
            <div className="flex items-center gap-4 text-xs font-medium text-neutral-600 bg-neutral-50 px-3 py-1.5 rounded-xl border border-neutral-200">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Store Live
              </span>
              <span className="text-neutral-300">|</span>
              <span>{products.length} Products</span>
              <span className="text-neutral-300">|</span>
              <span>{orders.length} Orders</span>
            </div>

            {/* Back to storefront link */}
            <button
              onClick={() => setCurrentView('store')}
              className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Store className="w-3.5 h-3.5 text-[#FF5500]" />
              Storefront Preview
            </button>

            {/* Admin Logout Button */}
            <button
              onClick={adminLogout}
              className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
              title="Secure Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        </header>

        {/* View Body */}
        <div className="p-4 sm:p-6 md:p-8 flex-1">
          {renderActiveTabContent()}
        </div>
      </main>
    </div>
  );
};
