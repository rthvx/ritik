import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Truck, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  ShoppingBag,
  PackageCheck,
  Smartphone
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useShop } from '../context/ShopContext';
import { Order } from '../types';
import { formatPrice } from '../utils/format';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    subtotal,
    discountAmount,
    shippingAmount,
    taxAmount,
    totalAmount,
    appliedCoupon,
    createOrder,
    user,
    toast,
    setIsProfileOpen
  } = useShop();

  const [fullName, setFullName] = useState(user?.name || 'Aarav Sharma');
  const [email, setEmail] = useState(user?.email || 'aarav.sharma@example.com');
  const [address, setAddress] = useState('42, Connaught Place, Block B');
  const [city, setCity] = useState('New Delhi');
  const [state, setState] = useState('Delhi');
  const [zip, setZip] = useState('110001');
  const [country, setCountry] = useState('India');
  
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [upiId, setUpiId] = useState('aarav@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExp, setCardExp] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('888');

  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isCheckoutOpen) return null;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast('Empty Bag', 'Please add items to your cart before checkout.', 'warning');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      const order = createOrder({
        fullName,
        address,
        city,
        state,
        zip,
        country
      });

      setIsProcessing(false);
      setPlacedOrder(order);

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        console.error(e);
      }

      toast('Order Placed Successfully! 🎉', `Order #${order.id} is confirmed.`, 'success');
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setPlacedOrder(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={handleClose}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-neutral-100 z-10 animate-scale">
          
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-20 p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>

          {placedOrder ? (
            // Order Confirmation Success View
            <div className="p-8 sm:p-12 text-center space-y-6">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto ring-8 ring-emerald-50/50">
                <PackageCheck className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FF5500]">
                  Payment Verified
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950">
                  Thank You For Your Order!
                </h2>
                <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
                  We’ve received your order and are preparing it for shipment. A receipt has been sent to <strong className="text-neutral-800">{email}</strong>.
                </p>
              </div>

              {/* Order summary mini card */}
              <div className="bg-neutral-50 rounded-2xl p-5 border border-neutral-100 max-w-md mx-auto text-left space-y-3">
                <div className="flex justify-between items-center text-xs pb-2 border-b border-neutral-200 font-medium">
                  <span className="text-neutral-500">Order ID</span>
                  <span className="font-mono font-bold text-neutral-900">#{placedOrder.id}</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-neutral-200 font-medium">
                  <span className="text-neutral-500">Tracking Code</span>
                  <span className="font-mono font-bold text-[#FF5500]">{placedOrder.trackingNumber}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-medium">
                  <span className="text-neutral-500">Total Paid</span>
                  <span className="font-extrabold text-sm text-neutral-950">{formatPrice(placedOrder.total)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => {
                    handleClose();
                    setIsProfileOpen(true);
                  }}
                  className="w-full sm:w-auto bg-neutral-950 hover:bg-neutral-800 text-white font-bold text-xs px-6 py-3 rounded-xl transition-all shadow-xs"
                >
                  View in Order History
                </button>
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs px-6 py-3 rounded-xl transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            // Checkout Form View
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-12">
              
              {/* Left Column: Form Details */}
              <div className="md:col-span-7 p-6 sm:p-8 space-y-6 border-b md:border-b-0 md:border-r border-neutral-100">
                
                {/* Header */}
                <div>
                  <div className="flex items-center gap-1.5 text-[#FF5500] text-xs font-bold uppercase tracking-wider mb-1">
                    <Lock className="w-3.5 h-3.5" />
                    <span>256-Bit SSL Secure Checkout</span>
                  </div>
                  <h2 className="text-2xl font-extrabold text-neutral-950">
                    Checkout & Shipping
                  </h2>
                </div>

                {/* Contact & Shipping Info */}
                <div className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    1. Shipping Address (India)
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-neutral-700">Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>

                    <div className="col-span-2 space-y-1">
                      <label className="text-[11px] font-bold text-neutral-700">Street Address</label>
                      <input
                        type="text"
                        required
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-neutral-700">City</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-neutral-700">State / PIN Code</label>
                      <div className="grid grid-cols-2 gap-1.5">
                        <input
                          type="text"
                          required
                          value={state}
                          onChange={(e) => setState(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                        />
                        <input
                          type="text"
                          required
                          value={zip}
                          onChange={(e) => setZip(e.target.value)}
                          className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-2.5 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Selection */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400">
                    2. Payment Method
                  </h3>

                  <div className="grid grid-cols-3 gap-2">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('upi')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                        paymentMethod === 'upi'
                          ? 'border-[#FF5500] bg-orange-50/40 text-neutral-950'
                          : 'border-neutral-200 hover:border-neutral-400 text-neutral-600'
                      }`}
                    >
                      <Smartphone className="w-4 h-4 text-[#FF5500]" />
                      <span>UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                        paymentMethod === 'card'
                          ? 'border-[#FF5500] bg-orange-50/40 text-neutral-950'
                          : 'border-neutral-200 hover:border-neutral-400 text-neutral-600'
                      }`}
                    >
                      <CreditCard className="w-4 h-4 text-neutral-900" />
                      <span>Card / NetBank</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-bold ${
                        paymentMethod === 'cod'
                          ? 'border-[#FF5500] bg-orange-50/40 text-neutral-950'
                          : 'border-neutral-200 hover:border-neutral-400 text-neutral-600'
                      }`}
                    >
                      <Truck className="w-4 h-4 text-neutral-900" />
                      <span>Cash on Delivery</span>
                    </button>
                  </div>

                  {paymentMethod === 'upi' && (
                    <div className="space-y-2 bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-neutral-700">UPI ID / VPA</label>
                        <input
                          type="text"
                          required
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. yourname@oksbi"
                          className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 font-mono focus:outline-none focus:border-[#FF5500]"
                        />
                      </div>
                      <p className="text-[10px] text-neutral-500">
                        Supports Google Pay, PhonePe, Paytm, BHIM, and all bank UPI apps.
                      </p>
                    </div>
                  )}

                  {paymentMethod === 'card' && (
                    <div className="space-y-2 bg-neutral-50 p-3.5 rounded-2xl border border-neutral-200">
                      <div className="space-y-1">
                        <label className="text-[11px] font-bold text-neutral-700">Card Number</label>
                        <input
                          type="text"
                          required
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 font-mono focus:outline-none focus:border-[#FF5500]"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-neutral-700">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            required
                            value={cardExp}
                            onChange={(e) => setCardExp(e.target.value)}
                            className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 font-mono focus:outline-none focus:border-[#FF5500]"
                          />
                        </div>
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-neutral-700">CVV</label>
                          <input
                            type="text"
                            required
                            value={cardCvc}
                            onChange={(e) => setCardCvc(e.target.value)}
                            className="w-full bg-white border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 font-mono focus:outline-none focus:border-[#FF5500]"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Right Column: Order Summary & Place Order Button */}
              <div className="md:col-span-5 bg-neutral-50/70 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  <h3 className="font-extrabold text-sm text-neutral-950 flex items-center justify-between">
                    <span>Order Summary</span>
                    <span className="text-xs font-bold text-neutral-400">
                      {cart.reduce((sum, item) => sum + item.quantity, 0)} Items
                    </span>
                  </h3>

                  {/* Cart preview list */}
                  <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 min-w-0">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="w-9 h-9 rounded-lg object-contain bg-white p-0.5 border border-neutral-200 shrink-0"
                          />
                          <div className="truncate">
                            <p className="font-bold text-neutral-900 truncate">{item.product.name}</p>
                            <p className="text-[10px] text-neutral-500">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <span className="font-bold text-neutral-900 shrink-0 ml-2">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Calculation summary */}
                  <div className="border-t border-neutral-200 pt-3 space-y-1.5 text-xs text-neutral-600">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-bold text-neutral-900">{formatPrice(subtotal)}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-[#FF5500] font-bold">
                        <span>Discount ({appliedCoupon?.code})</span>
                        <span>-{formatPrice(discountAmount)}</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shippingAmount === 0 ? <strong className="text-emerald-600">FREE</strong> : formatPrice(shippingAmount)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Estimated GST (12%)</span>
                      <span>{formatPrice(taxAmount)}</span>
                    </div>

                    <div className="flex justify-between text-base font-extrabold text-neutral-950 pt-2 border-t border-neutral-200">
                      <span>Total Due</span>
                      <span className="text-[#FF5500]">{formatPrice(totalAmount)}</span>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="space-y-2">
                  <button
                    type="submit"
                    disabled={isProcessing || cart.length === 0}
                    className="w-full bg-[#FF5500] hover:bg-[#E64D00] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md shadow-orange-500/25 active:scale-98 transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Authorizing Payment...</span>
                      </div>
                    ) : (
                      <>
                        <span>Pay {formatPrice(totalAmount)}</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-400">
                    <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Guaranteed Safe & Encrypted Checkout</span>
                  </div>
                </div>

              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
