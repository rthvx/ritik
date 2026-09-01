import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Truck, 
  ShieldCheck 
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/format';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    subtotal,
    discountAmount,
    shippingAmount,
    taxAmount,
    totalAmount,
    freeShippingThreshold,
    amountNeededForFreeShipping,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    setIsCheckoutOpen
  } = useShop();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyCoupon(promoInput);
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-neutral-900" />
              <h2 className="font-extrabold text-lg text-neutral-950">
                Your Shopping Bag
              </h2>
              <span className="text-xs font-bold bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded-full">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-orange-50/70 p-3.5 border-b border-orange-100">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="flex items-center gap-1.5 font-bold text-neutral-800">
                <Truck className="w-4 h-4 text-[#FF5500]" />
                {amountNeededForFreeShipping === 0 ? (
                  <span className="text-[#FF5500]">You unlocked Free Express Shipping! 🎉</span>
                ) : (
                  <span>
                    Add <strong className="text-[#FF5500]">{formatPrice(amountNeededForFreeShipping)}</strong> more for Free Shipping
                  </span>
                )}
              </span>
              <span className="font-semibold text-neutral-500">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full h-1.5 bg-orange-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF5500] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-neutral-900 text-base">Your bag is empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Explore our modern collection and discover products you'll love.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="inline-flex items-center gap-1.5 bg-neutral-950 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-100 group relative"
                >
                  {/* Thumbnail */}
                  <div className="w-20 h-20 bg-white rounded-xl overflow-hidden p-1 shrink-0 flex items-center justify-center border border-neutral-200/60">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-bold text-sm text-neutral-900 truncate">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-rose-600 p-1 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Variant tags */}
                      <div className="flex flex-wrap gap-1 mt-0.5 text-[11px] text-neutral-500 font-medium">
                        {item.selectedColor && (
                          <span className="bg-white px-1.5 py-0.5 rounded border border-neutral-200">
                            {item.selectedColor}
                          </span>
                        )}
                        {item.selectedSize && (
                          <span className="bg-white px-1.5 py-0.5 rounded border border-neutral-200">
                            {item.selectedSize}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between mt-2">
                      <span className="font-extrabold text-sm text-neutral-950">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>

                      <div className="flex items-center bg-white border border-neutral-200 rounded-lg overflow-hidden shadow-2xs">
                        <button
                          onClick={() => updateCartQuantity(item.id, -1)}
                          className="p-1 text-neutral-600 hover:bg-neutral-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-bold text-neutral-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, 1)}
                          className="p-1 text-neutral-600 hover:bg-neutral-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Panel */}
          {cart.length > 0 && (
            <div className="p-5 border-t border-neutral-100 bg-white space-y-3.5">
              
              {/* Promo code box */}
              {appliedCoupon ? (
                <div className="flex items-center justify-between bg-orange-50 border border-orange-200 rounded-xl px-3 py-2 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-neutral-800">
                    <Tag className="w-3.5 h-3.5 text-[#FF5500]" />
                    <span>Coupon: <strong className="font-mono text-[#FF5500]">{appliedCoupon.code}</strong></span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-neutral-500 hover:text-neutral-900 text-xs font-semibold underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Promo code (e.g. RTHVX10)"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-8 pr-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-neutral-900 hover:bg-neutral-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {/* Price Calculation Summary */}
              <div className="space-y-1.5 text-xs text-neutral-600 font-medium pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-neutral-900">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#FF5500] font-bold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span>{shippingAmount === 0 ? <strong className="text-emerald-600">FREE</strong> : formatPrice(shippingAmount)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Estimated GST (12%)</span>
                  <span>{formatPrice(taxAmount)}</span>
                </div>

                <div className="flex justify-between text-sm font-extrabold text-neutral-950 pt-2 border-t border-neutral-100">
                  <span>Total</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#FF5500] hover:bg-[#E64D00] text-white py-3.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 active:scale-98 transition-all cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-400">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-500" />
                <span>30-Day Money Back Guarantee • Encrypted Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
