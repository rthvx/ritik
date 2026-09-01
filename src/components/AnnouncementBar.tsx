import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const AnnouncementBar: React.FC = () => {
  const { applyCoupon, setIsCartOpen } = useShop();
  const announcements = [
    { text: '🚚 Free Express Shipping Across India Over ₹999', tag: 'SHIPPING', code: 'FREESHIP' },
    { text: '🏷️ Seasonal Sale Up To 70% Off', tag: 'SALE', code: 'FLASH70' },
    { text: '⚡ Limited Time Deals — Extra 10% Off', tag: 'DEALS', code: 'RTHVX10' }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [announcements.length]);

  const current = announcements[currentIndex];

  const handleClaim = () => {
    applyCoupon(current.code);
    setIsCartOpen(true);
  };

  return (
    <div className="bg-[#0D0D0D] text-white text-xs font-medium py-2.5 px-4 relative z-30 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left filler on desktop */}
        <div className="hidden lg:flex items-center gap-4 text-neutral-400 text-[11px]">
          <span>✨ Discover modern essentials curated for you</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600"></span>
          <span>🔒 100% Encrypted Checkout</span>
        </div>

        {/* Center rotating announcement */}
        <div className="flex-1 flex justify-center items-center overflow-hidden h-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2"
            >
              <span>{current.text}</span>
              <button
                onClick={handleClaim}
                className="hidden sm:inline-flex items-center gap-0.5 text-[#FF5500] hover:text-[#ff6b21] font-semibold underline underline-offset-2 ml-2 transition-colors cursor-pointer text-[11px]"
              >
                Use Code <span className="font-mono bg-neutral-800 px-1 py-0.5 rounded text-white ml-1">{current.code}</span>
                <ChevronRight className="w-3 h-3 ml-0.5" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right direct quick action on desktop */}
        <div className="hidden lg:flex items-center gap-3 text-[11px] text-neutral-300">
          <button
            onClick={handleClaim}
            className="text-neutral-300 hover:text-white transition-colors"
          >
            Claim Offer
          </button>
          <span className="text-neutral-600">|</span>
          <span className="text-neutral-400">Currency: <strong className="text-[#FF5500]">INR (₹)</strong></span>
        </div>
      </div>
    </div>
  );
};
