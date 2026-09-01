import React, { useState } from 'react';
import { 
  X, 
  Package, 
  MapPin, 
  Tag, 
  LogOut, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Shield,
  ChevronRight
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const UserProfileModal: React.FC = () => {
  const { user, isProfileOpen, setIsProfileOpen, orders, logout, toast } = useShop();
  const [activeTab, setActiveTab] = useState<'orders' | 'addresses' | 'coupons'>('orders');

  if (!isProfileOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsProfileOpen(false)}
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-neutral-100 z-10 animate-scale">
          
          {/* Header with User Info */}
          <div className="bg-neutral-950 text-white p-6 sm:p-8 relative">
            <button
              onClick={() => setIsProfileOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover ring-4 ring-neutral-800"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-xl font-extrabold text-white">{user.name}</h2>
                  <span className="bg-[#FF5500] text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    VIP Member
                  </span>
                </div>
                <p className="text-xs text-neutral-400">{user.email}</p>
                <p className="text-[11px] text-neutral-500">{user.joinedDate}</p>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-neutral-100 px-6 pt-3 text-xs font-bold bg-neutral-50/50">
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 px-3 flex items-center gap-1.5 transition-colors border-b-2 ${
                activeTab === 'orders'
                  ? 'text-[#FF5500] border-[#FF5500]'
                  : 'text-neutral-500 border-transparent hover:text-neutral-900'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              <span>Order History ({orders.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`pb-3 px-3 flex items-center gap-1.5 transition-colors border-b-2 ${
                activeTab === 'addresses'
                  ? 'text-[#FF5500] border-[#FF5500]'
                  : 'text-neutral-500 border-transparent hover:text-neutral-900'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>Shipping Addresses</span>
            </button>

            <button
              onClick={() => setActiveTab('coupons')}
              className={`pb-3 px-3 flex items-center gap-1.5 transition-colors border-b-2 ${
                activeTab === 'coupons'
                  ? 'text-[#FF5500] border-[#FF5500]'
                  : 'text-neutral-500 border-transparent hover:text-neutral-900'
              }`}
            >
              <Tag className="w-3.5 h-3.5" />
              <span>Member Coupons</span>
            </button>
          </div>

          {/* Content Area */}
          <div className="p-6 max-h-[60vh] overflow-y-auto space-y-4">
            {activeTab === 'orders' && (
              <div className="space-y-4">
                {orders.length === 0 ? (
                  <div className="text-center py-12 text-neutral-400">
                    <Package className="w-10 h-10 mx-auto mb-2 opacity-50" />
                    <p className="text-sm font-semibold">No orders yet</p>
                    <p className="text-xs">Your purchases will be tracked right here.</p>
                  </div>
                ) : (
                  orders.map((order) => (
                    <div
                      key={order.id}
                      className="p-4 rounded-2xl border border-neutral-100 bg-neutral-50/60 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-extrabold text-sm text-neutral-900">
                            Order #{order.id}
                          </span>
                          <span className="text-xs text-neutral-400 ml-2">{order.date}</span>
                        </div>
                        <span
                          className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 ${
                            order.status === 'Delivered'
                              ? 'bg-emerald-100 text-emerald-700'
                              : 'bg-amber-100 text-amber-800'
                          }`}
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          {order.status}
                        </span>
                      </div>

                      {/* Items */}
                      <div className="divide-y divide-neutral-100">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="py-2 flex items-center justify-between text-xs">
                            <div className="flex items-center gap-2.5">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-10 h-10 rounded-lg object-contain bg-white p-0.5 border border-neutral-200"
                              />
                              <div>
                                <p className="font-bold text-neutral-900">{item.name}</p>
                                <p className="text-[11px] text-neutral-500">
                                  Qty: {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ''} {item.selectedColor ? `• ${item.selectedColor}` : ''}
                                </p>
                              </div>
                            </div>
                            <span className="font-bold text-neutral-900">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* Tracking & Total */}
                      <div className="pt-2 border-t border-neutral-200 flex items-center justify-between text-xs">
                        <div className="text-neutral-500 flex items-center gap-1 font-mono text-[11px]">
                          <span>Track: {order.trackingNumber}</span>
                        </div>
                        <div className="font-extrabold text-neutral-950 text-sm">
                          Paid: ${order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {activeTab === 'addresses' && (
              <div className="space-y-3">
                <div className="p-4 rounded-2xl border border-neutral-200 bg-white relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs bg-orange-100 text-[#FF5500] px-2 py-0.5 rounded-md uppercase">
                      Default Delivery Address
                    </span>
                    <span className="text-xs text-neutral-400">Home</span>
                  </div>
                  <h4 className="font-bold text-sm text-neutral-900">{user.name}</h4>
                  <p className="text-xs text-neutral-600 mt-1 leading-relaxed">
                    742 Evergreen Terrace<br />
                    San Francisco, CA 94107<br />
                    United States<br />
                    Phone: {user.phone || '+1 (555) 019-2834'}
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'coupons' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl border border-orange-200 bg-orange-50/50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-[#FF5500]">RTHVX10</span>
                    <span className="text-[10px] font-bold bg-[#FF5500] text-white px-2 py-0.5 rounded">10% OFF</span>
                  </div>
                  <p className="text-xs text-neutral-600">Save 10% on your next order storewide.</p>
                </div>

                <div className="p-3.5 rounded-2xl border border-neutral-200 bg-neutral-50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-neutral-900">FLASH70</span>
                    <span className="text-[10px] font-bold bg-neutral-900 text-white px-2 py-0.5 rounded">70% OFF</span>
                  </div>
                  <p className="text-xs text-neutral-600">Seasonal Flash discount on selected items.</p>
                </div>

                <div className="p-3.5 rounded-2xl border border-neutral-200 bg-neutral-50 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-sm text-neutral-900">FREESHIP</span>
                    <span className="text-[10px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded">FREE SHIP</span>
                  </div>
                  <p className="text-xs text-neutral-600">Free worldwide expedited shipping.</p>
                </div>
              </div>
            )}
          </div>

          {/* Footer Action */}
          <div className="p-5 border-t border-neutral-100 bg-neutral-50 flex items-center justify-between">
            <button
              onClick={logout}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-rose-600 hover:text-rose-700 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>

            <button
              onClick={() => setIsProfileOpen(false)}
              className="bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
