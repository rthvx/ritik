import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  Filter, 
  SlidersHorizontal, 
  ShoppingBag, 
  Heart, 
  Star, 
  ArrowUpDown,
  Sparkles
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';
import { Product } from '../types';
import { formatPrice } from '../utils/format';

interface ShopCatalogModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShopCatalogModal: React.FC<ShopCatalogModalProps> = ({ isOpen, onClose }) => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct
  } = useShop();

  const [searchFilter, setSearchFilter] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [priceRange, setPriceRange] = useState<number>(30000);

  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Category filter
    if (selectedCategory) {
      list = list.filter((p) => p.category === selectedCategory);
    }

    // Search text filter
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    // Price limit
    list = list.filter((p) => p.price <= priceRange);

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        break;
    }

    return list;
  }, [products, selectedCategory, searchFilter, sortBy, priceRange]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-2 sm:p-4 md:p-6">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-6xl w-full overflow-hidden border border-neutral-100 z-10 animate-scale flex flex-col max-h-[92vh]">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-950 text-white shrink-0">
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#FF5500] uppercase tracking-wider mb-0.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>RTHVX Complete Collection</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-white">
                {selectedCategory ? `${selectedCategory} Collection` : 'All Products'}
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Filter & Category Controls Bar */}
          <div className="p-4 sm:p-5 border-b border-neutral-100 bg-neutral-50/80 shrink-0 space-y-3">
            
            {/* Category pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                  selectedCategory === null
                    ? 'bg-neutral-950 text-white shadow-xs'
                    : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                }`}
              >
                All Departments ({products.length})
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all ${
                    selectedCategory === cat.name
                      ? 'bg-[#FF5500] text-white shadow-xs'
                      : 'bg-white text-neutral-700 hover:bg-neutral-200 border border-neutral-200'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Search & Sort options */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
              
              <div className="relative w-full sm:w-72">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter catalog..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full bg-white border border-neutral-200 rounded-xl pl-8 pr-3 py-1.5 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                />
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-600">
                  <span>Max:</span>
                  <input
                    type="range"
                    min="999"
                    max="30000"
                    step="500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(Number(e.target.value))}
                    className="accent-[#FF5500] w-24 h-1.5 bg-neutral-200 rounded-lg cursor-pointer"
                  />
                  <span className="font-bold text-neutral-900 min-w-14">{formatPrice(priceRange)}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  <ArrowUpDown className="w-3.5 h-3.5 text-neutral-400" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-white border border-neutral-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-neutral-800 focus:outline-none focus:border-[#FF5500]"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest Arrivals</option>
                  </select>
                </div>
              </div>

            </div>

          </div>

          {/* Product Grid */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            <div className="text-xs text-neutral-500 font-medium mb-4">
              Showing {filteredProducts.length} curated products
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <p className="text-base font-bold text-neutral-800">No products match your criteria</p>
                <p className="text-xs text-neutral-500">Try adjusting your filters or price slider.</p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchFilter('');
                    setPriceRange(30000);
                  }}
                  className="px-4 py-2 bg-neutral-950 text-white text-xs font-bold rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
                {filteredProducts.map((product) => {
                  const isWishlisted = isInWishlist(product.id);

                  return (
                    <div
                      key={product.id}
                      onClick={() => setQuickViewProduct(product)}
                      className="bg-white rounded-2xl p-3 sm:p-4 border border-neutral-100 shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer relative"
                    >
                      {/* Image Box */}
                      <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#F6F6F6] mb-3 flex items-center justify-center p-2">
                        {product.badge && (
                          <div
                            className={`absolute top-2 left-2 z-10 px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                              product.badge === 'Bestseller'
                                ? 'bg-amber-500 text-white'
                                : product.badge.startsWith('-')
                                ? 'bg-[#FF5500] text-white'
                                : 'bg-neutral-900 text-white'
                            }`}
                          >
                            {product.badge}
                          </div>
                        )}

                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleWishlist(product);
                          }}
                          className={`absolute top-2 right-2 z-10 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                            isWishlisted
                              ? 'bg-rose-50 text-rose-600'
                              : 'bg-white/80 text-neutral-500 hover:text-rose-600'
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                        </button>

                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Info */}
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-[#FF5500] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h4 className="font-bold text-xs sm:text-sm text-neutral-900 line-clamp-1 group-hover:text-[#FF5500] transition-colors">
                          {product.name}
                        </h4>

                        <div className="flex items-center justify-between pt-1">
                          <div className="flex items-baseline gap-1.5">
                            <span className="font-extrabold text-sm text-neutral-950">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-[11px] text-neutral-400 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>

                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              addToCart(product, 1);
                            }}
                            className="w-7 h-7 rounded-full bg-neutral-900 hover:bg-[#FF5500] text-white flex items-center justify-center transition-colors shadow-2xs"
                            title="Add to Bag"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
