import React, { useState } from 'react';
import { 
  Tag, 
  Plus, 
  Trash2, 
  Copy, 
  Check, 
  Percent, 
  IndianRupee, 
  CheckCircle2, 
  XCircle,
  X
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Coupon } from '../types';

export const AdminCoupons: React.FC = () => {
  const { coupons, addCoupon, deleteCoupon, toggleCouponStatus, formatPrice, toast } = useShop();

  const [isAddCouponOpen, setIsAddCouponOpen] = useState(false);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  // New Coupon state
  const [code, setCode] = useState('');
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent');
  const [discountPercent, setDiscountPercent] = useState<number>(15);
  const [discountAmount, setDiscountAmount] = useState<number>(500);
  const [minOrder, setMinOrder] = useState<number | undefined>(999);
  const [description, setDescription] = useState('');
  const [expiryDate, setExpiryDate] = useState('Dec 31, 2026');

  const handleCopy = (couponCode: string) => {
    navigator.clipboard.writeText(couponCode);
    setCopiedCode(couponCode);
    toast('Code Copied', `"${couponCode}" copied to clipboard`, 'info');
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    const newCpn: Coupon = {
      code: code.trim().toUpperCase(),
      discountPercent: discountType === 'percent' ? Number(discountPercent) : undefined,
      discountAmount: discountType === 'fixed' ? Number(discountAmount) : undefined,
      minOrder: minOrder ? Number(minOrder) : undefined,
      description: description.trim() || `${discountType === 'percent' ? `${discountPercent}% Off` : `₹${discountAmount} Flat Off`} entire order`,
      isActive: true,
      expiryDate
    };

    addCoupon(newCpn);
    setCode('');
    setDescription('');
    setIsAddCouponOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-950 font-sans">
            Promotions & Coupons
          </h1>
          <p className="text-xs text-neutral-500">
            Create percentage discounts, flat cash vouchers, and free shipping triggers.
          </p>
        </div>

        <button
          onClick={() => setIsAddCouponOpen(true)}
          className="px-4 py-2.5 bg-[#FF5500] hover:bg-[#e04b00] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Create Promo Code
        </button>
      </div>

      {/* Coupons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coupons.map((cpn) => {
          const isActive = cpn.isActive !== false;
          return (
            <div
              key={cpn.code}
              className={`rounded-2xl border p-5 transition-all relative overflow-hidden bg-white shadow-xs ${
                isActive ? 'border-neutral-200' : 'border-neutral-200/60 opacity-60 bg-neutral-50'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#FF5500] flex items-center justify-center font-bold">
                    {cpn.discountPercent ? <Percent className="w-4 h-4" /> : <IndianRupee className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-extrabold text-base text-neutral-900 tracking-wider">
                        {cpn.code}
                      </span>
                      <button
                        onClick={() => handleCopy(cpn.code)}
                        className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors"
                        title="Copy code"
                      >
                        {copiedCode === cpn.code ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                    <p className="text-[11px] text-neutral-500 line-clamp-1">{cpn.description}</p>
                  </div>
                </div>

                {/* Active Switch */}
                <button
                  onClick={() => toggleCouponStatus(cpn.code)}
                  className={`px-2 py-0.5 rounded-full text-[10px] font-bold border transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                      : 'bg-neutral-100 text-neutral-500 border-neutral-200'
                  }`}
                >
                  {isActive ? 'Active' : 'Disabled'}
                </button>
              </div>

              {/* Promo Details */}
              <div className="mt-4 pt-3 border-t border-neutral-100 grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase font-semibold">Value</span>
                  <p className="font-bold text-neutral-900">
                    {cpn.discountPercent ? `${cpn.discountPercent}% Discount` : formatPrice(cpn.discountAmount)}
                  </p>
                </div>
                <div>
                  <span className="text-[10px] text-neutral-400 uppercase font-semibold">Min Order</span>
                  <p className="font-semibold text-neutral-800">
                    {cpn.minOrder ? formatPrice(cpn.minOrder) : 'No Minimum'}
                  </p>
                </div>
              </div>

              {/* Footer with Delete Action */}
              <div className="mt-3 pt-2 flex items-center justify-between text-[11px] text-neutral-400 border-t border-neutral-50">
                <span>{cpn.usageCount || 0} times claimed</span>
                <button
                  onClick={() => deleteCoupon(cpn.code)}
                  className="p-1 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
                  title="Delete Coupon"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Coupon Modal */}
      {isAddCouponOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-5 border border-neutral-100 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-neutral-100 pb-3">
              <h3 className="text-base font-bold text-neutral-900 font-sans">Create Promotional Code</h3>
              <button
                onClick={() => setIsAddCouponOpen(false)}
                className="p-1 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs">
              
              {/* Promo Code string */}
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700">Coupon Code *</label>
                <input
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  placeholder="e.g. FESTIVE25"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500] font-mono font-bold tracking-wider uppercase"
                />
              </div>

              {/* Discount Type */}
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700">Discount Structure</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setDiscountType('percent')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      discountType === 'percent'
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-700 border-neutral-200'
                    }`}
                  >
                    <Percent className="w-3.5 h-3.5" /> Percentage %
                  </button>
                  <button
                    type="button"
                    onClick={() => setDiscountType('fixed')}
                    className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                      discountType === 'fixed'
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-700 border-neutral-200'
                    }`}
                  >
                    <IndianRupee className="w-3.5 h-3.5" /> Flat ₹ Off
                  </button>
                </div>
              </div>

              {/* Discount Value */}
              {discountType === 'percent' ? (
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700">Discount Percentage (%)</label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    required
                    value={discountPercent}
                    onChange={(e) => setDiscountPercent(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <label className="font-semibold text-neutral-700">Flat Discount (₹ INR)</label>
                  <input
                    type="number"
                    min="10"
                    required
                    value={discountAmount}
                    onChange={(e) => setDiscountAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
                  />
                </div>
              )}

              {/* Minimum Order Value */}
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700">Minimum Order Amount (₹)</label>
                <input
                  type="number"
                  min="0"
                  value={minOrder || ''}
                  onChange={(e) => setMinOrder(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="Optional (e.g. 1499)"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="font-semibold text-neutral-700">Display Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. 25% discount on all festival season apparel"
                  className="w-full px-3 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-3 border-t border-neutral-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddCouponOpen(false)}
                  className="px-4 py-2 rounded-xl border border-neutral-200 text-neutral-600 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#FF5500] hover:bg-[#e04b00] text-white font-semibold flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" /> Publish Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
