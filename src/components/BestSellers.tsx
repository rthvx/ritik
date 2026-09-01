import React from 'react';
import { Star, ShoppingBag, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { formatPrice } from '../utils/format';

interface BestSellersProps {
  onViewAllClick: () => void;
}

export const BestSellers: React.FC<BestSellersProps> = ({ onViewAllClick }) => {
  const { 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct 
  } = useShop();

  // 3 specific Best Sellers as requested
  const bestSellerIds = ['prod-7', 'prod-2', 'prod-8'];
  const bestSellerProducts = bestSellerIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  return (
    <section id="best-sellers" className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Best Sellers
            </h2>
          </div>

          <button
            onClick={onViewAllClick}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-800 hover:text-[#FF5500] transition-colors cursor-pointer"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 3 Large Premium Product Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {bestSellerProducts.map((product) => {
            const isWishlisted = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                onClick={() => setQuickViewProduct(product)}
                className="group cursor-pointer bg-white rounded-3xl p-5 border border-neutral-100 shadow-xs hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                {/* Product Image Area with Bestseller Badge */}
                <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#F7F7F8] mb-5 flex items-center justify-center p-4">
                  
                  {/* Bestseller Badge */}
                  <div className="absolute top-3.5 left-3.5 z-10 px-3 py-1 rounded-full text-[11px] font-bold bg-amber-500 text-white shadow-xs tracking-wide">
                    Bestseller
                  </div>

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    aria-label="Save to Wishlist"
                    className={`absolute top-3.5 right-3.5 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all ${
                      isWishlisted
                        ? 'bg-rose-50 text-rose-600 shadow-xs'
                        : 'bg-white/90 text-neutral-600 hover:text-rose-600 hover:bg-white shadow-xs'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                  </button>

                  {/* High Quality Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                {/* Content & Details */}
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-extrabold text-base sm:text-lg text-neutral-950 group-hover:text-[#FF5500] transition-colors leading-snug">
                        {product.name}
                      </h3>
                      <p className="text-xs text-neutral-500 line-clamp-1 mt-1 font-medium">
                        {product.shortDescription || product.description}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-extrabold text-lg text-neutral-950">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="block text-xs text-neutral-400 line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Ratings */}
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(product.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-300'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-neutral-800 ml-1">
                      {product.rating.toFixed(1)}
                    </span>
                    <span className="text-xs text-neutral-400 font-medium">
                      ({product.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Quick Add Button & Cart Action Row */}
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      className="flex-1 bg-neutral-950 hover:bg-[#FF5500] text-white py-3 px-4 rounded-xl font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 active:scale-98 shadow-xs cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Quick Add</span>
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setQuickViewProduct(product);
                      }}
                      className="w-11 h-11 rounded-xl border border-neutral-200 hover:border-neutral-900 flex items-center justify-center text-neutral-700 hover:text-black transition-colors"
                      title="View Details"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
