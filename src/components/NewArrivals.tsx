import React, { useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Star, 
  ShoppingBag, 
  ArrowRight,
  Eye,
  Check
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { formatPrice } from '../utils/format';

interface NewArrivalsProps {
  onViewAllClick: () => void;
}

export const NewArrivals: React.FC<NewArrivalsProps> = ({ onViewAllClick }) => {
  const { 
    products, 
    addToCart, 
    toggleWishlist, 
    isInWishlist, 
    setQuickViewProduct 
  } = useShop();

  const scrollRef = useRef<HTMLDivElement>(null);

  // New arrivals specific 6 products as specified in prompt
  const newArrivalIds = ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5', 'prod-6'];
  const newArrivalProducts = newArrivalIds
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean) as Product[];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="new-arrivals" className="py-14 bg-[#FAFAFA] border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Carousel Navigation Controls */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-1">
              <span>Fresh Drops</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              New Arrivals
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onViewAllClick}
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 hover:text-[#FF5500] transition-colors cursor-pointer mr-2"
            >
              <span>View All New Arrivals</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Left / Right Arrow Carousel Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 shadow-2xs transition-all cursor-pointer"
                aria-label="Previous Products"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="w-9 h-9 rounded-full bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-950 hover:text-white hover:border-neutral-950 shadow-2xs transition-all cursor-pointer"
                aria-label="Next Products"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel / Responsive Horizontal Slider */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {newArrivalProducts.map((product) => {
            const isWishlisted = isInWishlist(product.id);

            return (
              <div
                key={product.id}
                onClick={() => setQuickViewProduct(product)}
                className="snap-start shrink-0 w-[240px] sm:w-[260px] md:w-[280px] bg-white rounded-2xl p-3 sm:p-3.5 border border-neutral-100 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
              >
                {/* Image Container with Badges and Wishlist */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F6F6F6] mb-3.5 flex items-center justify-center p-2">
                  
                  {/* Badge: New or Discount */}
                  {product.badge && (
                    <div
                      className={`absolute top-2.5 left-2.5 z-10 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                        product.badge.startsWith('-')
                          ? 'bg-[#FF5500] text-white shadow-xs'
                          : 'bg-neutral-900 text-white'
                      }`}
                    >
                      {product.badge}
                    </div>
                  )}

                  {/* Wishlist Heart Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product);
                    }}
                    aria-label="Save to Wishlist"
                    className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                      isWishlisted
                        ? 'bg-rose-50 text-rose-600 shadow-xs'
                        : 'bg-white/90 text-neutral-600 hover:text-rose-600 hover:bg-white shadow-xs'
                    }`}
                  >
                    <Heart
                      className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`}
                    />
                  </button>

                  {/* Main Product Image */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-108 transition-transform duration-500"
                  />

                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-x-2 bottom-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-full bg-white/90 backdrop-blur-xs text-neutral-900 text-xs font-semibold py-2 rounded-lg flex items-center justify-center gap-1.5 shadow-sm">
                      <Eye className="w-3.5 h-3.5" />
                      <span>Quick View</span>
                    </div>
                  </div>
                </div>

                {/* Product Info */}
                <div className="space-y-1.5 px-0.5">
                  <h3 className="font-bold text-sm text-neutral-900 line-clamp-1 group-hover:text-[#FF5500] transition-colors">
                    {product.name}
                  </h3>

                  {/* Price Row */}
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-sm text-neutral-950">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-xs text-neutral-400 line-through font-medium">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Ratings & Reviews */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1">
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < Math.floor(product.rating)
                                ? 'fill-amber-400 text-amber-400'
                                : 'text-neutral-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-[11px] font-semibold text-neutral-500 ml-0.5">
                        ({product.reviewCount})
                      </span>
                    </div>

                    {/* Add To Cart Circular Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product, 1);
                      }}
                      aria-label={`Add ${product.name} to cart`}
                      className="w-8 h-8 rounded-full bg-neutral-900 hover:bg-[#FF5500] text-white flex items-center justify-center transition-all transform active:scale-90 cursor-pointer shadow-xs"
                      title="Add to Cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
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
