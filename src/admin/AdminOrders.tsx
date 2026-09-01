import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Eye, 
  Truck, 
  CheckCircle2, 
  Clock, 
  X, 
  Trash2, 
  Filter, 
  Calendar,
  IndianRupee,
  ShoppingBag,
  ArrowUpDown
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Order, OrderStatus } from '../types';
import { OrderDetailModal } from './OrderDetailModal';

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, deleteOrder, formatPrice } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [deletingOrderId, setDeletingOrderId] = useState<string | null>(null);

  const STATUS_CONFIG: Record<OrderStatus, { label: string; bg: string; text: string; border: string }> = {
    Confirmed: { label: 'Confirmed', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    Processing: { label: 'Processing', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    Shipped: { label: 'Shipped', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    Delivered: { label: 'Delivered', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    Cancelled: { label: 'Cancelled', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
  };

  const filteredOrders = useMemo(() => {
    return orders.filter((ord) => {
      const matchSearch = 
        ord.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.shippingAddress.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.shippingAddress.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ord.trackingNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (ord.customerEmail && ord.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchStatus = selectedStatus === 'All' || ord.status === selectedStatus;

      return matchSearch && matchStatus;
    });
  }, [orders, searchQuery, selectedStatus]);

  const confirmDelete = () => {
    if (deletingOrderId) {
      deleteOrder(deletingOrderId);
      setDeletingOrderId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-950 font-sans">
            Orders Fulfillment
          </h1>
          <p className="text-xs text-neutral-500">
            Track deliveries, print invoices, and update order processing lifecycle states.
          </p>
        </div>

        {/* Quick count chips */}
        <div className="flex items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-xl bg-white border border-neutral-200 font-semibold text-neutral-800">
            Total Orders: {orders.length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          
          {/* Search bar */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by Order ID, customer name, city, tracking number..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] bg-neutral-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Status filter dropdown */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] bg-neutral-50/50 text-neutral-800"
            >
              <option value="All">All Order Statuses</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped (In Transit)</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        {/* Status Pill Filters */}
        <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-neutral-100 text-xs">
          {['All', 'Confirmed', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map((st) => {
            const count = st === 'All' ? orders.length : orders.filter((o) => o.status === st).length;
            const isSelected = selectedStatus === st;
            return (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-neutral-900 text-white'
                    : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
                }`}
              >
                {st} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-600 font-semibold border-b border-neutral-100">
              <tr>
                <th className="py-3.5 px-4">Order ID & Date</th>
                <th className="py-3.5 px-4">Customer & Location</th>
                <th className="py-3.5 px-4">Items Summary</th>
                <th className="py-3.5 px-4">Total Paid</th>
                <th className="py-3.5 px-4">Fulfillment Status</th>
                <th className="py-3.5 px-4">Tracking Code</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    <ShoppingBag className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold">No orders found matching the filter criteria.</p>
                  </td>
                </tr>
              ) : (
                filteredOrders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-neutral-50/50 transition-colors">
                    
                    {/* Order ID & Date */}
                    <td className="py-3.5 px-4">
                      <div className="font-mono font-bold text-neutral-900">
                        #{ord.id}
                      </div>
                      <div className="text-[11px] text-neutral-400">
                        {ord.date}
                      </div>
                    </td>

                    {/* Customer */}
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-neutral-900">
                        {ord.shippingAddress.fullName}
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        {ord.shippingAddress.city}, {ord.shippingAddress.state}
                      </div>
                    </td>

                    {/* Items */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5">
                        <div className="flex -space-x-2 overflow-hidden">
                          {ord.items.slice(0, 3).map((it, i) => (
                            <img
                              key={i}
                              src={it.image}
                              alt={it.name}
                              className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                            />
                          ))}
                        </div>
                        <span className="text-neutral-700 font-medium text-[11px]">
                          {ord.items.length} item{ord.items.length > 1 ? 's' : ''}
                        </span>
                      </div>
                    </td>

                    {/* Total */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-neutral-950">
                        {formatPrice(ord.total)}
                      </div>
                      <div className="text-[10px] text-neutral-400">
                        {ord.paymentMethod || 'Online'}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-3.5 px-4">
                      <select
                        value={ord.status}
                        onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                        className={`px-2.5 py-1 rounded-full text-[11px] font-bold border cursor-pointer ${STATUS_CONFIG[ord.status]?.bg} ${STATUS_CONFIG[ord.status]?.text} ${STATUS_CONFIG[ord.status]?.border}`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>

                    {/* Tracking */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-600">
                      {ord.trackingNumber}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setSelectedOrder(ord)}
                          className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                          title="View Order Details & Invoice"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingOrderId(ord.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Order Record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deletingOrderId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center space-y-4 border border-neutral-100 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Delete Order #{deletingOrderId}?</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Are you sure you want to permanently delete this order history record?
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingOrderId(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};
