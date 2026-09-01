import React, { useState } from 'react';
import { 
  Lock, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  Store, 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle,
  KeyRound,
  UserCheck
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AdminLogin: React.FC = () => {
  const { adminLogin, setCurrentView } = useShop();
  
  const [adminId, setAdminId] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!adminId.trim()) {
      setErrorMessage('Kripya Admin ID enter karein.');
      return;
    }

    if (!adminPassword.trim()) {
      setErrorMessage('Kripya Password enter karein.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const result = adminLogin(adminId, adminPassword);
      if (!result.success) {
        setErrorMessage(result.message || 'Galat ID ya Password. Sirf authorized admin hi login kar sakta hai.');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0d0f12] text-white flex flex-col justify-between items-center p-4 sm:p-6 selection:bg-[#FF5500] selection:text-white">
      {/* Top Navbar */}
      <header className="w-full max-w-5xl flex items-center justify-between py-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FF5500] text-white flex items-center justify-center font-black text-lg shadow-lg shadow-[#FF5500]/20">
            R
          </div>
          <div>
            <span className="font-extrabold text-base tracking-wider text-white">
              RTHVX
            </span>
            <span className="block text-[10px] text-neutral-400 font-mono tracking-widest">
              SECURE ADMIN GATEWAY
            </span>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('store')}
          className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900/80 hover:bg-neutral-800 text-neutral-300 hover:text-white text-xs font-semibold border border-neutral-800 transition-all cursor-pointer"
        >
          <Store className="w-4 h-4 text-[#FF5500]" />
          <span>Customer Storefront</span>
        </button>
      </header>

      {/* Main Login Card */}
      <div className="w-full max-w-md my-auto py-8">
        <div className="bg-neutral-900/90 backdrop-blur-xl border border-neutral-800/80 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
          
          {/* Subtle Decorative Top Glow */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-[#FF5500]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header Badge & Title */}
          <div className="text-center mb-6 relative z-10">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-neutral-800/90 border border-neutral-700/60 flex items-center justify-center mb-4 text-[#FF5500] shadow-inner">
              <Lock className="w-7 h-7" />
            </div>
            
            <h1 className="text-2xl font-black text-white tracking-tight">
              Admin Access Only
            </h1>
            <p className="text-xs text-neutral-400 mt-1.5">
              Yeh section confidential hai. Sirf verified credentials se login karein.
            </p>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-950/60 border border-red-800/60 text-red-300 text-xs flex items-start gap-2.5 animate-shake">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <div className="flex-1 font-medium leading-relaxed">
                {errorMessage}
              </div>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            
            {/* Admin ID Field */}
            <div>
              <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider mb-2">
                Admin ID / Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <UserCheck className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  value={adminId}
                  onChange={(e) => {
                    setAdminId(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Enter admin ID"
                  autoFocus
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-neutral-950/80 border border-neutral-700/70 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/20 font-medium transition-all"
                />
              </div>
            </div>

            {/* Admin Password Field */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-neutral-300 uppercase tracking-wider">
                  Admin Password
                </label>
                <span className="text-[11px] text-neutral-500 font-mono">
                  Protected
                </span>
              </div>

              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={adminPassword}
                  onChange={(e) => {
                    setAdminPassword(e.target.value);
                    if (errorMessage) setErrorMessage('');
                  }}
                  placeholder="Enter secret password"
                  required
                  className="w-full pl-10 pr-11 py-3 rounded-xl bg-neutral-950/80 border border-neutral-700/70 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FF5500] focus:ring-2 focus:ring-[#FF5500]/20 font-medium transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-white cursor-pointer transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4 text-neutral-400" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-2 py-3.5 px-4 rounded-xl bg-[#FF5500] hover:bg-[#ff6a1a] active:scale-[0.99] text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#FF5500]/25 transition-all cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Verifying Credentials...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  <span>Login to Admin Dashboard</span>
                </div>
              )}
            </button>
          </form>

          {/* Security Notice Card */}
          <div className="mt-6 pt-5 border-t border-neutral-800/80 flex items-start gap-2.5 text-neutral-400 text-[11px] leading-relaxed">
            <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
            <p>
              This console is locked for exclusive store management. Unauthorized access attempts are monitored and recorded.
            </p>
          </div>
        </div>

        {/* Back to store navigation */}
        <div className="text-center mt-6">
          <button
            onClick={() => setCurrentView('store')}
            className="inline-flex items-center gap-2 text-xs font-semibold text-neutral-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Customer Store</span>
          </button>
        </div>
      </div>

      {/* Footer System Info */}
      <footer className="w-full max-w-5xl py-3 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-neutral-500 gap-2 font-mono">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>System Online • 256-bit Encrypted Session</span>
        </div>
        <div>
          <span>RTHVX Admin Suite &copy; {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
};
