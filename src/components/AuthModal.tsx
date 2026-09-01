import React, { useState } from 'react';
import { X, Lock, Mail, User as UserIcon, ArrowRight, ShieldCheck } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AuthModal: React.FC = () => {
  const { isAuthOpen, setIsAuthOpen, login } = useShop();
  const [tab, setTab] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('alex.rivera@modern.io');
  const [name, setName] = useState('Alex Rivera');
  const [password, setPassword] = useState('••••••••••••');

  if (!isAuthOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, tab === 'signup' ? name : undefined);
  };

  const handleDemoSignIn = (demoEmail: string, demoName: string) => {
    login(demoEmail, demoName);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={() => setIsAuthOpen(false)}
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 sm:p-8 border border-neutral-100 z-10 animate-scale">
          
          <button
            onClick={() => setIsAuthOpen(false)}
            className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Logo & Header */}
          <div className="text-center space-y-1 mb-6">
            <div className="inline-flex items-center gap-1">
              <span className="font-extrabold text-2xl tracking-tighter text-neutral-950">
                RTHVX
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FF5500] inline-block mb-1" />
            </div>
            <h2 className="text-xl font-bold text-neutral-900">
              {tab === 'signin' ? 'Welcome Back' : 'Create Your Account'}
            </h2>
            <p className="text-xs text-neutral-500">
              Access your saved wishlist, track orders & get member perks.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex bg-neutral-100 p-1 rounded-xl mb-6 text-xs font-bold">
            <button
              onClick={() => setTab('signin')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                tab === 'signin' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-2 rounded-lg transition-all ${
                tab === 'signup' ? 'bg-white text-neutral-950 shadow-2xs' : 'text-neutral-500 hover:text-neutral-900'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {tab === 'signup' && (
              <div className="space-y-1">
                <label className="text-xs font-bold text-neutral-700">Full Name</label>
                <div className="relative">
                  <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                  />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-neutral-700">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-10 pr-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-neutral-950 hover:bg-[#FF5500] text-white py-3 rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-md transition-all active:scale-98 cursor-pointer mt-2"
            >
              <span>{tab === 'signin' ? 'Sign In to RTHVX' : 'Complete Registration'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* 1-Click Fast Demo Login */}
          <div className="mt-6 pt-5 border-t border-neutral-100">
            <p className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider text-center mb-3">
              Instant 1-Click Demo Login
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleDemoSignIn('alex.rivera@modern.io', 'Alex Rivera')}
                className="p-2.5 bg-neutral-50 hover:bg-orange-50 border border-neutral-200 hover:border-orange-200 rounded-xl text-left transition-colors text-xs font-semibold text-neutral-800"
              >
                <div className="text-neutral-900 font-bold">Alex Rivera</div>
                <div className="text-[10px] text-neutral-500">VIP Member (Demo)</div>
              </button>

              <button
                type="button"
                onClick={() => handleDemoSignIn('elena.vance@studio.com', 'Elena Vance')}
                className="p-2.5 bg-neutral-50 hover:bg-orange-50 border border-neutral-200 hover:border-orange-200 rounded-xl text-left transition-colors text-xs font-semibold text-neutral-800"
              >
                <div className="text-neutral-900 font-bold">Elena Vance</div>
                <div className="text-[10px] text-neutral-500">Stylist (Demo)</div>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
