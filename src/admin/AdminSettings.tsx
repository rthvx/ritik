import React, { useState } from 'react';
import { 
  Settings, 
  Store, 
  Mail, 
  Phone, 
  Truck, 
  Percent, 
  IndianRupee, 
  Save, 
  RotateCcw, 
  Check, 
  AlertTriangle,
  ShieldCheck,
  Lock,
  KeyRound
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { StoreSettings } from '../types';

export const AdminSettings: React.FC = () => {
  const { storeSettings, updateStoreSettings, resetToDefaultData, formatPrice } = useShop();

  const [formData, setFormData] = useState<StoreSettings>({ ...storeSettings });
  const [isSaved, setIsSaved] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);

  const handleChange = (field: keyof StoreSettings, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateStoreSettings(formData);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const handleConfirmReset = () => {
    resetToDefaultData();
    setIsResetModalOpen(false);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-neutral-950 font-sans">
          Store Configuration
        </h1>
        <p className="text-xs text-neutral-500">
          Manage currency localization, GST tax rules, shipping fees, support hotlines, and data resets.
        </p>
      </div>

      {/* Main Settings Form */}
      <form onSubmit={handleSave} className="space-y-6">
        
        {/* General Store Details */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
            <Store className="w-4 h-4 text-[#FF5500]" />
            <h2 className="text-sm font-bold text-neutral-900 font-sans uppercase tracking-wider">
              Store Identity & Brand
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-neutral-700">Store Name</label>
              <input
                type="text"
                required
                value={formData.storeName}
                onChange={(e) => handleChange('storeName', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700">Tagline / Slogan</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => handleChange('tagline', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700">Support Email</label>
              <input
                type="email"
                required
                value={formData.supportEmail}
                onChange={(e) => handleChange('supportEmail', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-700">Customer Care Hotline</label>
              <input
                type="text"
                value={formData.supportPhone}
                onChange={(e) => handleChange('supportPhone', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]"
              />
            </div>
          </div>
        </div>

        {/* Financial & Logistics Rules */}
        <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
            <Truck className="w-4 h-4 text-[#FF5500]" />
            <h2 className="text-sm font-bold text-neutral-900 font-sans uppercase tracking-wider">
              Shipping & Tax Rules (INR ₹)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            
            {/* Free shipping threshold */}
            <div className="space-y-1">
              <label className="font-semibold text-neutral-700">Free Shipping Min (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-neutral-400 font-semibold">₹</span>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.freeShippingThreshold}
                  onChange={(e) => handleChange('freeShippingThreshold', Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500] font-semibold"
                />
              </div>
              <p className="text-[10px] text-neutral-400">Orders above this get free delivery</p>
            </div>

            {/* Standard shipping cost */}
            <div className="space-y-1">
              <label className="font-semibold text-neutral-700">Standard Shipping Fee (₹)</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-neutral-400 font-semibold">₹</span>
                <input
                  type="number"
                  min="0"
                  required
                  value={formData.standardShippingFee}
                  onChange={(e) => handleChange('standardShippingFee', Number(e.target.value))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500] font-semibold"
                />
              </div>
              <p className="text-[10px] text-neutral-400">Default rate under threshold</p>
            </div>

            {/* GST Rate */}
            <div className="space-y-1">
              <label className="font-semibold text-neutral-700">GST / Tax Percentage (%)</label>
              <div className="relative">
                <span className="absolute right-3 top-2.5 text-neutral-400 font-semibold">%</span>
                <input
                  type="number"
                  min="0"
                  max="40"
                  required
                  value={formData.taxRatePercent}
                  onChange={(e) => handleChange('taxRatePercent', Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500] font-semibold"
                />
              </div>
              <p className="text-[10px] text-neutral-400">Currently set to {formData.taxRatePercent}%</p>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-neutral-50 border border-neutral-100">
          <div className="text-xs text-neutral-500">
            {isSaved && (
              <span className="text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-4 h-4" /> Changes saved and active across store!
              </span>
            )}
          </div>
          <button
            type="submit"
            className="px-6 py-2.5 bg-[#FF5500] hover:bg-[#e04b00] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
          >
            <Save className="w-4 h-4" />
            Save Store Settings
          </button>
        </div>
      </form>

      {/* Admin Security Credentials Card */}
      <div className="bg-neutral-900 text-white p-6 rounded-2xl border border-neutral-800 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-[#FF5500]" />
            <h2 className="text-sm font-bold text-white font-sans uppercase tracking-wider">
              Admin Access & Security Lock
            </h2>
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
            Active Protection
          </span>
        </div>

        <p className="text-xs text-neutral-400 leading-relaxed">
          Admin portal sirf authorized Super Admin ke liye locked hai. Is account ka access sirf aapke specified ID aur Password se authenticated hota hai.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-1">
          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase font-mono block">Authorized Admin ID</span>
              <span className="font-bold text-white font-mono">rthvx7</span>
            </div>
            <span className="px-2 py-0.5 rounded-md bg-[#FF5500]/20 text-[#FF5500] text-[10px] font-bold">
              SUPERADMIN
            </span>
          </div>

          <div className="p-3 rounded-xl bg-neutral-950 border border-neutral-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-neutral-500 uppercase font-mono block">Password Security</span>
              <span className="font-bold text-neutral-300 font-mono tracking-widest">•••••••••</span>
            </div>
            <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" /> Secured
            </span>
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset Data */}
      <div className="bg-red-50/50 p-6 rounded-2xl border border-red-100 space-y-3">
        <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
          <AlertTriangle className="w-4 h-4 text-red-600" />
          Reset Demo Data & Catalog
        </div>
        <p className="text-xs text-red-700 leading-relaxed max-w-xl">
          Restore initial mock catalog products, demo order transactions, sample customers, and promotional coupons to default factory settings.
        </p>
        <button
          type="button"
          onClick={() => setIsResetModalOpen(true)}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold text-xs rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          Reset to Default Data
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center space-y-4 border border-neutral-100 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <RotateCcw className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Reset All Data?</h3>
              <p className="text-xs text-neutral-500 mt-1">
                This will reset your local changes, coupons, orders, and products back to the original demo catalog.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmReset}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-600 hover:bg-red-700 text-white cursor-pointer"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
