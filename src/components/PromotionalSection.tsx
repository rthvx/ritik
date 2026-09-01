import React, { useState, useEffect } from 'react';
import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface PromotionalSectionProps {
  onShopSaleClick: () => void;
  onShopCollectionClick: () => void;
}

export const PromotionalSection: React.FC<PromotionalSectionProps> = ({
  onShopSaleClick,
  onShopCollectionClick
}) => {
  const { applyCoupon, setIsCartOpen } = useShop();

  // Active countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 15,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleClaimFlashSale = () => {
    applyCoupon('FLASH70');
    onShopSaleClick();
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Banner 1: Flash Sale (Coral / Orange Radiant) */}
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#FF4500] via-[#FF5E36] to-[#FFA07A] p-6 sm:p-8 text-white min-h-[300px] flex flex-col justify-between shadow-lg shadow-orange-500/15 group">
            
            {/* Sneaker Graphic Floating on the Right */}
            <div className="absolute -right-4 sm:right-4 bottom-0 sm:bottom-4 w-48 sm:w-64 md:w-72 aspect-[4/3] pointer-events-none transition-transform duration-500 group-hover:scale-105 group-hover:-translate-y-2">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
                alt="Flash Sale Sneakers"
                className="w-full h-full object-contain drop-shadow-2xl"
              />
            </div>

            {/* Top Tag & Header */}
            <div className="relative z-10 max-w-[260px] sm:max-w-xs space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-xs text-white text-[11px] font-bold tracking-wider uppercase">
                <Flame className="w-3.5 h-3.5 fill-white text-white" />
                <span>Flash Sale</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight pt-1 leading-tight">
                Up To 70% Off
              </h3>
            </div>

            {/* Countdown Timer Block */}
            <div className="relative z-10 my-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md rounded-xl w-12 h-12 text-white border border-white/30">
                  <span className="font-extrabold text-base leading-none">
                    {String(timeLeft.days).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-white/80 mt-1">Days</span>
                </div>
                <span className="font-bold text-lg text-white/80">:</span>
                <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md rounded-xl w-12 h-12 text-white border border-white/30">
                  <span className="font-extrabold text-base leading-none">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-white/80 mt-1">Hours</span>
                </div>
                <span className="font-bold text-lg text-white/80">:</span>
                <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md rounded-xl w-12 h-12 text-white border border-white/30">
                  <span className="font-extrabold text-base leading-none">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-white/80 mt-1">Mins</span>
                </div>
                <span className="font-bold text-lg text-white/80">:</span>
                <div className="flex flex-col items-center justify-center bg-white/20 backdrop-blur-md rounded-xl w-12 h-12 text-white border border-white/30">
                  <span className="font-extrabold text-base leading-none">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-white/80 mt-1">Secs</span>
                </div>
              </div>
            </div>

            {/* Button */}
            <div className="relative z-10 pt-2">
              <button
                onClick={handleClaimFlashSale}
                className="inline-flex items-center gap-2 bg-white text-neutral-950 hover:bg-neutral-100 font-bold text-xs px-6 py-3 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Shop Sale Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

          {/* Banner 2: New Collection (Deep Obsidian & Athletics) */}
          <div className="relative rounded-3xl overflow-hidden bg-neutral-950 p-6 sm:p-8 text-white min-h-[300px] flex flex-col justify-between shadow-xl group border border-neutral-900">
            
            {/* Background Aesthetic Model Graphic */}
            <div className="absolute right-0 top-0 bottom-0 w-1/2 sm:w-5/12 overflow-hidden pointer-events-none">
              <img
                src="https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=800&q=80"
                alt="New Summer Collection"
                className="w-full h-full object-cover object-top opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/60 to-transparent" />
            </div>

            {/* Top Tag & Title */}
            <div className="relative z-10 max-w-[260px] sm:max-w-xs space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-neutral-800 text-orange-400 text-[11px] font-bold tracking-wider uppercase">
                <Sparkles className="w-3.5 h-3.5" />
                <span>New Collection</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight text-white">
                Summer 2026
              </h3>
              <p className="text-xs text-neutral-400 font-normal leading-relaxed pt-1">
                Discover the latest trends and fresh styles crafted for every movement.
              </p>
            </div>

            {/* Button */}
            <div className="relative z-10 pt-8 sm:pt-4">
              <button
                onClick={onShopCollectionClick}
                className="inline-flex items-center gap-2 bg-white text-neutral-950 hover:bg-neutral-100 font-bold text-xs px-6 py-3 rounded-full transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
