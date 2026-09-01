import React from 'react';
import { ArrowRight, Star, Sparkles, Plus, Eye, Check } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { PRODUCTS } from '../data/products';
import { formatPrice } from '../utils/format';

interface HeroSectionProps {
  onShopClick: () => void;
  onExploreClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onShopClick,
  onExploreClick
}) => {
  const { addToCart, setQuickViewProduct, products } = useShop();

  const sneakerProd = products.find((p) => p.id === 'prod-2') || products[1];
  const watchProd = products.find((p) => p.id === 'prod-4') || products[3];
  const headphoneProd = products.find((p) => p.id === 'prod-3') || products[2];
  const bottleProd = products.find((p) => p.id === 'prod-5') || products[4];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FAFAFA] via-[#F8F8F8] to-white pt-8 pb-16 lg:pt-14 lg:pb-24">
      
      {/* Background subtle radial ambient highlight */}
      <div className="absolute top-1/4 right-1/4 -z-10 w-96 h-96 bg-orange-100/40 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Typography & CTAs */}
          <div className="lg:col-span-6 space-y-6 lg:space-y-8 z-10">
            
            {/* Small Label: TRENDING NOW */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-50 border border-orange-200/60 text-[#FF5500] text-xs font-bold tracking-wider uppercase">
              <span className="w-2 h-2 rounded-full bg-[#FF5500] animate-pulse" />
              <span>TRENDING NOW</span>
            </div>

            {/* Large Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-neutral-950 leading-[1.08]">
              Discover Products <br className="hidden sm:inline" />
              <span className="relative">
                You’ll Love
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-[#FF5500] opacity-80"
                  viewBox="0 0 250 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C50 3 150 2 247 9"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-neutral-600 max-w-xl font-normal leading-relaxed">
              Shop the latest trending products curated for modern lifestyles.
              Premium materials, elevated aesthetics, and guaranteed lifetime quality.
            </p>

            {/* Buttons: Shop Now & Explore Collection */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                onClick={onShopClick}
                className="group inline-flex items-center justify-center gap-2.5 bg-[#FF5500] hover:bg-[#E64D00] text-white px-7 py-3.5 rounded-xl font-semibold text-sm tracking-wide shadow-md shadow-orange-500/20 transition-all transform active:scale-95 cursor-pointer"
              >
                <span>Shop Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center justify-center bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-200 px-6 py-3.5 rounded-xl font-semibold text-sm tracking-wide transition-all hover:border-neutral-400 active:scale-95 cursor-pointer"
              >
                <span>Explore Collection</span>
              </button>
            </div>

            {/* Customer Avatars + Social Proof */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <div className="flex -space-x-2.5 overflow-hidden">
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80"
                  alt="Customer"
                />
                <img
                  className="inline-block h-10 w-10 rounded-full ring-2 ring-white object-cover"
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=120&q=80"
                  alt="Customer"
                />
              </div>

              <div>
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-neutral-900 ml-1">4.9/5</span>
                </div>
                <p className="text-xs font-medium text-neutral-600 mt-0.5">
                  Loved by <strong className="text-neutral-950 font-bold">50,000+ customers</strong> worldwide
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Floating Product Cards */}
          <div className="lg:col-span-6 relative flex justify-center items-center select-none">
            
            {/* Main Stage Frame & Lifestyle Image */}
            <div className="relative w-full max-w-[480px] aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 shadow-2xl border-4 border-white">
              
              {/* Vibrant abstract orange curved accent chair element in backdrop matching mockup */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#FF5500] via-[#FF3B00] to-[#E63900] opacity-90 mix-blend-multiply" />
              
              <img
                src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85"
                alt="RTHVX Premium Lifestyle Collection"
                className="w-full h-full object-cover object-top relative z-0 transition-transform duration-700 hover:scale-105"
              />

              {/* Gradient lighting overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-1" />

              {/* Bottom lifestyle caption & indicator dots */}
              <div className="absolute bottom-4 left-0 right-0 z-10 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                  <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                  <span className="text-[10px] font-semibold text-white uppercase tracking-wider ml-1">
                    Edition 2026
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Card 1: Air Max 270 (Top Left) */}
            <div 
              onClick={() => setQuickViewProduct(sneakerProd)}
              className="absolute -top-4 -left-2 sm:-left-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-xl border border-neutral-100/90 flex items-center gap-3 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all group animate-float"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-50 overflow-hidden flex items-center justify-center p-1">
                <img
                  src={sneakerProd.image}
                  alt={sneakerProd.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="pr-1 text-left">
                <p className="text-xs font-bold text-neutral-900 leading-tight group-hover:text-[#FF5500] transition-colors">
                  {sneakerProd.name}
                </p>
                <p className="text-xs font-bold text-[#FF5500] mt-0.5">
                  {formatPrice(sneakerProd.price)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(sneakerProd, 1);
                }}
                className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center hover:bg-[#FF5500] transition-colors cursor-pointer"
                title="Quick Add"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Floating Card 2: Smart Watch (Top Right) */}
            <div 
              onClick={() => setQuickViewProduct(watchProd)}
              className="absolute top-8 -right-2 sm:-right-6 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-xl border border-neutral-100/90 flex items-center gap-3 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all group animate-float-delayed"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-50 overflow-hidden flex items-center justify-center p-1">
                <img
                  src={watchProd.image}
                  alt={watchProd.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="pr-1 text-left">
                <p className="text-xs font-bold text-neutral-900 leading-tight group-hover:text-[#FF5500] transition-colors">
                  Smart Watch
                </p>
                <p className="text-xs font-bold text-[#FF5500] mt-0.5">
                  {formatPrice(watchProd.price)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(watchProd, 1);
                }}
                className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center hover:bg-[#FF5500] transition-colors cursor-pointer"
                title="Quick Add"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Floating Card 3: Wireless Headphones (Mid Left) */}
            <div 
              onClick={() => setQuickViewProduct(headphoneProd)}
              className="absolute bottom-20 -left-4 sm:-left-10 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-xl border border-neutral-100/90 flex items-center gap-3 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all group animate-float-reverse"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-50 overflow-hidden flex items-center justify-center p-1">
                <img
                  src={headphoneProd.image}
                  alt={headphoneProd.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="pr-1 text-left">
                <p className="text-xs font-bold text-neutral-900 leading-tight group-hover:text-[#FF5500] transition-colors">
                  Wireless Headphone
                </p>
                <p className="text-xs font-bold text-[#FF5500] mt-0.5">
                  {formatPrice(headphoneProd.price)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(headphoneProd, 1);
                }}
                className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center hover:bg-[#FF5500] transition-colors cursor-pointer"
                title="Quick Add"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Floating Card 4: Water Bottle (Bottom Right) */}
            <div 
              onClick={() => setQuickViewProduct(bottleProd)}
              className="absolute bottom-10 -right-2 sm:-right-8 z-20 bg-white/95 backdrop-blur-md rounded-2xl p-2.5 sm:p-3 shadow-xl border border-neutral-100/90 flex items-center gap-3 cursor-pointer hover:scale-105 hover:shadow-2xl transition-all group animate-float"
            >
              <div className="w-12 h-12 rounded-xl bg-neutral-50 overflow-hidden flex items-center justify-center p-1">
                <img
                  src={bottleProd.image}
                  alt={bottleProd.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform"
                />
              </div>
              <div className="pr-1 text-left">
                <p className="text-xs font-bold text-neutral-900 leading-tight group-hover:text-[#FF5500] transition-colors">
                  Water Bottle
                </p>
                <p className="text-xs font-bold text-[#FF5500] mt-0.5">
                  {formatPrice(bottleProd.price)}
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(bottleProd, 1);
                }}
                className="w-7 h-7 rounded-lg bg-neutral-900 text-white flex items-center justify-center hover:bg-[#FF5500] transition-colors cursor-pointer"
                title="Quick Add"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
