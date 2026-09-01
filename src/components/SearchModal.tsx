import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ShoppingBag, ArrowRight, TrendingUp } from 'lucide-react';
import { useShop } from '../context/ShopContext';

export const SearchModal: React.FC = () => {
  const {
    products,
    isSearchOpen,
    setIsSearchOpen,
    addToCart,
    setQuickViewProduct
  } = useShop();

  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const popularKeywords = ['Essential Hoodie', 'Air Max 270', 'Sony WH-1000XM5', 'Smart Watch', 'Stainless Steel Bottle', 'Sunglasses', 'Beauty Serum'];

  const filteredProducts = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsSearchOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-start justify-center p-4 sm:p-6 pt-16 sm:pt-20">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden border border-neutral-100 z-10 animate-scale">
          
          {/* Search Header Bar */}
          <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center gap-3">
            <Search className="w-5 h-5 text-[#FF5500] shrink-0" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by product name, category, or style..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-base sm:text-lg font-medium text-neutral-900 placeholder:text-neutral-400 outline-none bg-transparent"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="text-xs font-semibold text-neutral-400 hover:text-neutral-700 px-2 py-1 bg-neutral-100 rounded-md"
              >
                Clear
              </button>
            )}
            <button
              onClick={() => setIsSearchOpen(false)}
              className="p-2 text-neutral-400 hover:text-neutral-900 rounded-full hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions when empty */}
          {!query && (
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-neutral-400 uppercase tracking-wider">
                <TrendingUp className="w-4 h-4 text-[#FF5500]" />
                <span>Popular Trending Searches</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularKeywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setQuery(kw)}
                    className="px-3.5 py-1.5 rounded-full bg-neutral-100 hover:bg-orange-50 hover:text-[#FF5500] hover:border-orange-200 border border-neutral-100 text-xs font-semibold text-neutral-700 transition-colors cursor-pointer"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Results List */}
          {query && (
            <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
              <div className="text-xs font-semibold text-neutral-500 px-2 py-1">
                Found {filteredProducts.length} result{filteredProducts.length === 1 ? '' : 's'}
              </div>

              {filteredProducts.length === 0 ? (
                <div className="text-center py-12 space-y-2">
                  <p className="text-sm font-semibold text-neutral-700">No products matched "{query}"</p>
                  <p className="text-xs text-neutral-400">Try searching for "Hoodie", "Watch", or "Sneakers"</p>
                </div>
              ) : (
                filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setQuickViewProduct(product);
                    }}
                    className="flex items-center justify-between p-3 rounded-2xl hover:bg-neutral-50 border border-transparent hover:border-neutral-100 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="w-14 h-14 rounded-xl bg-neutral-100 p-1 shrink-0 overflow-hidden flex items-center justify-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-[#FF5500] uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h4 className="font-bold text-sm text-neutral-900 group-hover:text-[#FF5500] transition-colors">
                          {product.name}
                        </h4>
                        <p className="text-xs font-bold text-neutral-900 mt-0.5">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product, 1);
                        }}
                        className="p-2 rounded-xl bg-neutral-900 hover:bg-[#FF5500] text-white transition-colors"
                        title="Add to bag"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#FF5500] group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
