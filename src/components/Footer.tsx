import React, { useState } from 'react';
import { 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Youtube, 
  Send, 
  ShieldCheck, 
  CreditCard,
  CheckCircle2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface FooterProps {
  onOpenShop: () => void;
  onOpenAbout: () => void;
  onOpenBlog: () => void;
  onOpenContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenShop,
  onOpenAbout,
  onOpenBlog,
  onOpenContact
}) => {
  const { toast, setSelectedCategory, setCurrentView } = useShop();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }

    setIsSubscribed(true);
    toast('Subscribed to RTHVX! 🎉', 'Welcome! Use code RTHVX10 at checkout for 10% off.', 'success');
  };

  return (
    <footer className="bg-neutral-950 text-white pt-16 pb-12 border-t border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Newsletter & Promo Bar */}
        <div className="bg-neutral-900 rounded-3xl p-8 sm:p-10 mb-14 border border-neutral-800 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">
              VIP Community
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              Unlock 10% Off Your First Order
            </h3>
            <p className="text-sm text-neutral-400">
              Sign up for our newsletter to receive exclusive drops, private flash sales, and modern design inspiration.
            </p>
          </div>

          <div className="w-full lg:w-auto">
            {isSubscribed ? (
              <div className="flex items-center gap-2 bg-emerald-950/80 border border-emerald-700/60 px-5 py-3.5 rounded-2xl text-emerald-300 text-sm font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>You're subscribed! Use promo code <strong className="font-mono text-white bg-emerald-900/90 px-1.5 py-0.5 rounded">RTHVX10</strong></span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5 max-w-md w-full">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-neutral-950 border border-neutral-700 rounded-xl px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:outline-none focus:border-[#FF5500] flex-1"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#FF5500] hover:bg-[#E64D00] text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md shrink-0 active:scale-95"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 pb-14 border-b border-neutral-800">
          
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-1">
              <span className="font-extrabold text-2xl tracking-tighter text-white font-sans">
                RTHVX
              </span>
              <span className="w-2 h-2 rounded-full bg-[#FF5500] inline-block mb-1" />
            </div>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              Discover Products You’ll Love. RTHVX is a premier modern online store crafting and curating elevated lifestyle essentials with meticulous attention to detail, quality, and sustainable craftsmanship.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3 pt-2">
              <a
                href="#instagram"
                onClick={(e) => { e.preventDefault(); toast('Instagram', 'Visiting @RTHVX Official'); }}
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-[#FF5500] transition-all"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                onClick={(e) => { e.preventDefault(); toast('Twitter / X', 'Visiting @RTHVX'); }}
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-[#FF5500] transition-all"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                onClick={(e) => { e.preventDefault(); toast('YouTube', 'Visiting RTHVX Studios'); }}
                className="w-9 h-9 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-white hover:border-neutral-700 hover:bg-[#FF5500] transition-all"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium">
              <li>
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenShop}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Shop Catalog
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenAbout}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBlog}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Blog & Editorial
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenContact}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentView('admin')}
                  className="text-[#FF5500] hover:text-[#ff7733] font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  Admin Console
                </button>
              </li>
            </ul>
          </div>

          {/* Shop Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Shop Categories
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium">
              {['Fashion', 'Electronics', 'Beauty', 'Fitness', 'Home Decor', 'Accessories'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat);
                      onOpenShop();
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Support & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-200">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400 font-medium">
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer">
                  Order Tracking
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer">
                  Shipping & Returns
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer">
                  30-Day Guarantee
                </button>
              </li>
              <li>
                <button onClick={onOpenAbout} className="hover:text-white transition-colors cursor-pointer">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={onOpenAbout} className="hover:text-white transition-colors cursor-pointer">
                  Terms & Conditions
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright & Security Info */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} RTHVX Inc. All rights reserved. Designed for modern living.</p>
          
          <div className="flex items-center gap-3">
            <span className="text-[11px] text-neutral-400">Accepted Payments:</span>
            <div className="flex items-center gap-1.5 font-mono text-[10px] bg-neutral-900 border border-neutral-800 px-2 py-1 rounded text-neutral-300">
              VISA • MC • AMEX • APPLE PAY • PAYPAL
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};
