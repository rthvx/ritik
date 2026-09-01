import React, { useState } from 'react';
import { 
  X, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Mail, 
  Phone, 
  CreditCard, 
  Printer, 
  Edit3, 
  Save,
  AlertCircle
} from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { useShop } from '../context/ShopContext';

interface OrderDetailModalProps {
  order: Order | null;
  isOpen: boolean;
  onClose: () => void;
}

export const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
  order,
  isOpen,
  onClose
}) => {
  const { updateOrderStatus, updateOrderTracking, formatPrice, toast } = useShop();
  
  const [currentStatus, setCurrentStatus] = useState<OrderStatus>(order?.status || 'Confirmed');
  const [isEditingTracking, setIsEditingTracking] = useState(false);
  const [trackingInput, setTrackingInput] = useState(order?.trackingNumber || '');

  if (!isOpen || !order) return null;

  const STATUS_CONFIG: Record<OrderStatus, { label: string; bg: string; text: string; border: string }> = {
    Confirmed: { label: 'Confirmed', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
    Processing: { label: 'Processing', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
    Shipped: { label: 'In Transit', bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
    Delivered: { label: 'Delivered', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
    Cancelled: { label: 'Cancelled', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
  };

  const handleStatusChange = (newStatus: OrderStatus) => {
    setCurrentStatus(newStatus);
    updateOrderStatus(order.id, newStatus);
  };

  const handleSaveTracking = () => {
    if (trackingInput.trim()) {
      updateOrderTracking(order.id, trackingInput.trim());
      setIsEditingTracking(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh] border border-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-neutral-900 text-white flex items-center justify-center font-bold text-xs">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-neutral-950 font-sans">
                  Order #{order.id}
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${STATUS_CONFIG[currentStatus].bg} ${STATUS_CONFIG[currentStatus].text} ${STATUS_CONFIG[currentStatus].border}`}>
                  {STATUS_CONFIG[currentStatus].label}
                </span>
              </div>
              <p className="text-xs text-neutral-500">Placed on {order.date}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200/60 rounded-lg transition-colors cursor-pointer"
              title="Print Order Invoice"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-200/60 rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scroll Content */}
        <div className="overflow-y-auto p-6 space-y-6 flex-1 text-sm">
          
          {/* Status Changer Bar */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/70 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold text-neutral-700">Update Order Status:</span>
              <select
                value={currentStatus}
                onChange={(e) => handleStatusChange(e.target.value as OrderStatus)}
                className="px-3 py-1.5 rounded-lg border border-neutral-300 text-xs font-semibold bg-white text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>

            {/* Tracking Number */}
            <div className="flex items-center gap-2 text-xs">
              <Truck className="w-4 h-4 text-neutral-500" />
              {isEditingTracking ? (
                <div className="flex items-center gap-1.5">
                  <input
                    type="text"
                    value={trackingInput}
                    onChange={(e) => setTrackingInput(e.target.value)}
                    className="px-2 py-1 text-xs border border-neutral-300 rounded-md font-mono"
                  />
                  <button
                    onClick={handleSaveTracking}
                    className="p-1 bg-[#FF5500] text-white rounded hover:bg-[#e04b00]"
                  >
                    <Save className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="text-neutral-500">Tracking:</span>
                  <span className="font-mono font-semibold text-neutral-800">{order.trackingNumber}</span>
                  <button
                    onClick={() => {
                      setTrackingInput(order.trackingNumber);
                      setIsEditingTracking(true);
                    }}
                    className="text-neutral-400 hover:text-neutral-800 p-0.5"
                  >
                    <Edit3 className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Order Items Table */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-neutral-900 uppercase tracking-wider">
              Purchased Items ({order.items.length})
            </h3>
            <div className="rounded-xl border border-neutral-100 overflow-hidden divide-y divide-neutral-100">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between bg-white hover:bg-neutral-50/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 rounded-lg object-cover border border-neutral-100"
                    />
                    <div>
                      <p className="font-semibold text-neutral-900 text-xs">{item.name}</p>
                      <div className="flex items-center gap-2 text-[11px] text-neutral-500 mt-0.5">
                        {item.selectedColor && <span>Color: {item.selectedColor}</span>}
                        {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                        <span>Qty: {item.quantity}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-neutral-900 text-xs">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-[10px] text-neutral-400">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer & Shipping Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Shipping Destination */}
            <div className="p-4 rounded-xl bg-neutral-50/80 border border-neutral-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                <MapPin className="w-4 h-4 text-[#FF5500]" />
                Shipping Address
              </div>
              <div className="text-xs text-neutral-700 space-y-0.5 pl-6">
                <p className="font-semibold text-neutral-900">{order.shippingAddress.fullName}</p>
                <p>{order.shippingAddress.address}</p>
                <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.zip}</p>
                <p className="text-neutral-500">{order.shippingAddress.country}</p>
              </div>
            </div>

            {/* Customer & Payment Info */}
            <div className="p-4 rounded-xl bg-neutral-50/80 border border-neutral-100 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                <CreditCard className="w-4 h-4 text-emerald-600" />
                Customer & Payment
              </div>
              <div className="text-xs text-neutral-700 space-y-1.5 pl-6">
                <p className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{order.customerEmail || 'aarav.sharma@example.com'}</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-neutral-400" />
                  <span>{order.customerPhone || '+91 98765 43210'}</span>
                </p>
                <p className="text-[11px] font-medium text-neutral-600 pt-1">
                  Method: <span className="text-neutral-900 font-semibold">{order.paymentMethod || 'UPI / Net Banking'}</span>
                </p>
              </div>
            </div>
          </div>

          {/* Pricing Breakdown */}
          <div className="p-4 rounded-xl bg-neutral-900 text-white space-y-2">
            <div className="flex justify-between text-xs text-neutral-400">
              <span>Subtotal</span>
              <span className="font-semibold text-white">{formatPrice(order.subtotal)}</span>
            </div>
            {order.discount > 0 && (
              <div className="flex justify-between text-xs text-emerald-400">
                <span>Discount Applied</span>
                <span className="font-semibold">-{formatPrice(order.discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs text-neutral-400">
              <span>Shipping Fee</span>
              <span className="font-semibold text-white">
                {order.shipping === 0 ? 'FREE' : formatPrice(order.shipping)}
              </span>
            </div>
            <div className="flex justify-between text-xs text-neutral-400">
              <span>GST / Tax</span>
              <span className="font-semibold text-white">{formatPrice(order.tax)}</span>
            </div>
            <div className="pt-2 border-t border-neutral-800 flex justify-between text-sm font-bold">
              <span>Total Paid</span>
              <span className="text-[#FF5500] text-base">{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3.5 border-t border-neutral-100 bg-neutral-50 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close Order
          </button>
        </div>
      </div>
    </div>
  );
};
