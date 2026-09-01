import React, { useState } from 'react';
import { 
  TrendingUp, 
  ShoppingBag, 
  Package, 
  Users, 
  IndianRupee, 
  ArrowUpRight, 
  ArrowDownRight, 
  Plus, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertTriangle,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product, Order, OrderStatus } from '../types';
import { OrderDetailModal } from './OrderDetailModal';
import { ProductModal } from './ProductModal';

interface AdminOverviewProps {
  onNavigateTab: (tab: string) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({ onNavigateTab }) => {
  const { 
    products, 
    orders, 
    customers, 
    coupons, 
    formatPrice, 
    addProduct, 
    updateOrderStatus,
    setCurrentView 
  } = useShop();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isAddProductOpen, setIsAddProductOpen] = useState(false);

  // Computed metrics
  const totalRevenue = orders.reduce((sum, ord) => sum + ord.total, 0);
  const totalOrdersCount = orders.length;
  const avgOrderValue = totalOrdersCount > 0 ? Math.round(totalRevenue / totalOrdersCount) : 0;
  const outOfStockCount = products.filter((p) => !p.inStock).length;
  const activeCouponsCount = coupons.filter((c) => c.isActive !== false).length;

  const STATUS_BADGES: Record<OrderStatus, { bg: string }> = {
    Confirmed: { bg: 'bg-blue-50 text-blue-700 border-blue-200' },
    Processing: { bg: 'bg-amber-50 text-amber-700 border-amber-200' },
    Shipped: { bg: 'bg-purple-50 text-purple-700 border-purple-200' },
    Delivered: { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
    Cancelled: { bg: 'bg-red-50 text-red-700 border-red-200' }
  };

  // Recent 5 orders
  const recentOrders = [...orders].slice(0, 5);

  // Top products
  const topProducts = products.filter((p) => p.isBestseller || p.rating >= 4.8).slice(0, 4);

  return (
    <div className="space-y-6">
      
      {/* Top Banner / Quick Action Bar */}
      <div className="bg-neutral-900 text-white rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-sm">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 text-[10px] font-extrabold uppercase tracking-wider bg-[#FF5500] text-white rounded-full">
              Live Operations
            </span>
            <span className="text-xs text-neutral-400">All systems operational</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight font-sans">
            Store Performance Overview
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
            Real-time telemetry of transactions, catalog inventory, customer acquisitions, and shipment fulfillment.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => setIsAddProductOpen(true)}
            className="px-4 py-2.5 bg-[#FF5500] hover:bg-[#e04b00] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add New Product
          </button>
          <button
            onClick={() => setCurrentView('store')}
            className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 font-medium text-xs rounded-xl border border-neutral-700 transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ExternalLink className="w-4 h-4" />
            View Storefront
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Revenue */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Total Revenue
            </span>
            <div className="w-8 h-8 rounded-xl bg-orange-50 text-[#FF5500] flex items-center justify-center">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">
              {formatPrice(totalRevenue)}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+18.4% vs last month</span>
            </div>
          </div>
        </div>

        {/* Total Orders */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Total Orders
            </span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">
              {totalOrdersCount} Orders
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-600 mt-1">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>+12 new this week</span>
            </div>
          </div>
        </div>

        {/* Average Order Value */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Avg Order Value
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">
              {formatPrice(avgOrderValue)}
            </div>
            <div className="flex items-center gap-1 text-[11px] font-medium text-purple-600 mt-1">
              <span>Healthy basket size</span>
            </div>
          </div>
        </div>

        {/* Active Products & Stock Alert */}
        <div className="bg-white p-5 rounded-2xl border border-neutral-100 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-neutral-500 uppercase tracking-wider">
              Catalog Items
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-bold text-neutral-900 tracking-tight">
              {products.length} Products
            </div>
            <div className="text-[11px] font-medium text-neutral-500 mt-1">
              {outOfStockCount > 0 ? (
                <span className="text-amber-600 font-semibold flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" /> {outOfStockCount} item out of stock
                </span>
              ) : (
                <span className="text-emerald-600 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 100% In Stock
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Graph & Quick Insights Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Sales Performance Visualizer (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-neutral-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider font-sans">
                Weekly Revenue Distribution
              </h2>
              <p className="text-xs text-neutral-500">Order volumes and gross turnover over the last 7 days</p>
            </div>
            <div className="flex items-center gap-1 text-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF5500]" />
              <span className="text-neutral-600 font-medium">Revenue (₹)</span>
            </div>
          </div>

          {/* Clean Custom Bar Chart */}
          <div className="pt-4 pb-2">
            <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2 border-b border-neutral-100">
              {[
                { day: 'Mon', amount: 14999, height: '45%' },
                { day: 'Tue', amount: 27718, height: '80%' },
                { day: 'Wed', amount: 18450, height: '55%' },
                { day: 'Thu', amount: 12428, height: '38%' },
                { day: 'Fri', amount: 31200, height: '90%' },
                { day: 'Sat', amount: 36800, height: '100%' },
                { day: 'Sun', amount: 24500, height: '70%' }
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-neutral-900 bg-neutral-100 px-1.5 py-0.5 rounded shadow-xs mb-1">
                    ₹{bar.amount.toLocaleString('en-IN')}
                  </div>
                  <div
                    style={{ height: bar.height }}
                    className="w-full max-w-[40px] rounded-t-lg bg-neutral-100 group-hover:bg-[#FF5500] transition-colors relative"
                  />
                  <span className="text-[11px] font-semibold text-neutral-500 group-hover:text-neutral-900 transition-colors">
                    {bar.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2 text-center">
            <div className="p-2.5 rounded-xl bg-neutral-50">
              <div className="text-xs text-neutral-500">Peak Day</div>
              <div className="text-sm font-bold text-neutral-900">Saturday (₹36.8k)</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-50">
              <div className="text-xs text-neutral-500">Conversion Rate</div>
              <div className="text-sm font-bold text-emerald-600">3.82% (+0.4%)</div>
            </div>
            <div className="p-2.5 rounded-xl bg-neutral-50">
              <div className="text-xs text-neutral-500">Active Promo Codes</div>
              <div className="text-sm font-bold text-neutral-900">{activeCouponsCount} Active</div>
            </div>
          </div>
        </div>

        {/* Store Highlights & Quick Shortcuts (1 Col) */}
        <div className="bg-white rounded-2xl p-6 border border-neutral-100 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider font-sans">
              Top Catalog Items
            </h2>
            <button
              onClick={() => onNavigateTab('products')}
              className="text-xs font-semibold text-[#FF5500] hover:text-[#e04b00] flex items-center gap-0.5 cursor-pointer"
            >
              View All <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-neutral-100">
            {topProducts.map((prod) => (
              <div key={prod.id} className="py-3 flex items-center justify-between first:pt-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="w-10 h-10 rounded-lg object-cover border border-neutral-100"
                  />
                  <div>
                    <p className="text-xs font-bold text-neutral-900 line-clamp-1">{prod.name}</p>
                    <p className="text-[11px] text-neutral-500">{prod.category} • {formatPrice(prod.price)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    prod.inStock ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                  }`}>
                    {prod.inStock ? 'In Stock' : 'Out'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-neutral-100 space-y-2">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
              Quick Shortcuts
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => onNavigateTab('orders')}
                className="p-2.5 rounded-xl border border-neutral-100 hover:bg-neutral-50 text-left transition-colors cursor-pointer"
              >
                <div className="text-xs font-bold text-neutral-800">Orders</div>
                <div className="text-[10px] text-neutral-500">{orders.length} transactions</div>
              </button>
              <button
                onClick={() => onNavigateTab('coupons')}
                className="p-2.5 rounded-xl border border-neutral-100 hover:bg-neutral-50 text-left transition-colors cursor-pointer"
              >
                <div className="text-xs font-bold text-neutral-800">Coupons</div>
                <div className="text-[10px] text-neutral-500">Manage discounts</div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Orders Section */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-xs overflow-hidden">
        <div className="p-6 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-neutral-950 uppercase tracking-wider font-sans">
              Recent Customer Orders
            </h2>
            <p className="text-xs text-neutral-500">Live order stream and fulfillment statuses</p>
          </div>
          <button
            onClick={() => onNavigateTab('orders')}
            className="text-xs font-semibold text-[#FF5500] hover:text-[#e04b00] flex items-center gap-1 cursor-pointer"
          >
            Manage All Orders <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-600 font-semibold border-b border-neutral-100">
              <tr>
                <th className="py-3 px-4">Order ID</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Items</th>
                <th className="py-3 px-4">Amount</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {recentOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-neutral-50/60 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-bold text-neutral-900">
                    #{ord.id}
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-neutral-900">{ord.shippingAddress.fullName}</div>
                    <div className="text-[11px] text-neutral-400">{ord.shippingAddress.city}</div>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-600">
                    {ord.items.length} item{ord.items.length > 1 ? 's' : ''} ({ord.items[0]?.name})
                  </td>
                  <td className="py-3.5 px-4 font-bold text-neutral-900">
                    {formatPrice(ord.total)}
                  </td>
                  <td className="py-3.5 px-4">
                    <select
                      value={ord.status}
                      onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-bold border cursor-pointer ${STATUS_BADGES[ord.status]?.bg || 'bg-neutral-100'}`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3.5 px-4 text-neutral-500 text-[11px]">
                    {ord.date}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedOrder(ord)}
                      className="p-1.5 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}

      {isAddProductOpen && (
        <ProductModal
          isOpen={isAddProductOpen}
          onClose={() => setIsAddProductOpen(false)}
          onSave={addProduct}
        />
      )}
    </div>
  );
};
