import React from 'react';
import { X, Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/format';

export const WishlistDrawer: React.FC = () => {
  const {
    wishlist,
    products,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    addToCart,
    setQuickViewProduct
  } = useShop();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = wishlist
    .map((id) => products.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-rose-500 text-rose-500" />
              <h2 className="font-extrabold text-lg text-neutral-950">
                Your Saved Wishlist
              </h2>
              <span className="text-xs font-bold bg-rose-50 text-rose-600 px-2 py-0.5 rounded-full">
                {wishlistedProducts.length}
              </span>
            </div>

            <button
              onClick={() => setIsWishlistOpen(false)}
              className="p-2 text-neutral-400 hover:text-neutral-950 rounded-full hover:bg-neutral-100 transition-colors"
              aria-label="Close Wishlist"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {wishlistedProducts.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-rose-50 rounded-full flex items-center justify-center mx-auto text-rose-400">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-neutral-900 text-base">Your wishlist is empty</h3>
                <p className="text-xs text-neutral-500 max-w-xs mx-auto">
                  Click the heart icon on any product to save your favorite modern pieces here.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="inline-flex items-center gap-1.5 bg-neutral-950 text-white text-xs font-semibold px-5 py-2.5 rounded-xl hover:bg-neutral-800 transition-colors"
                >
                  Browse Products
                </button>
              </div>
            ) : (
              wishlistedProducts.map((prod) => {
                if (!prod) return null;
                return (
                  <div
                    key={prod.id}
                    className="flex gap-3.5 p-3 rounded-2xl bg-neutral-50 border border-neutral-100 group relative"
                  >
                    {/* Thumbnail */}
                    <div
                      onClick={() => {
                        setIsWishlistOpen(false);
                        setQuickViewProduct(prod);
                      }}
                      className="w-20 h-20 bg-white rounded-xl overflow-hidden p-1 shrink-0 flex items-center justify-center border border-neutral-200/60 cursor-pointer"
                    >
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-1">
                          <h4
                            onClick={() => {
                              setIsWishlistOpen(false);
                              setQuickViewProduct(prod);
                            }}
                            className="font-bold text-sm text-neutral-900 truncate hover:text-[#FF5500] cursor-pointer transition-colors"
                          >
                            {prod.name}
                          </h4>
                          <button
                            onClick={() => toggleWishlist(prod)}
                            className="text-neutral-400 hover:text-rose-600 p-1 transition-colors"
                            title="Remove from wishlist"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-extrabold text-sm text-neutral-950">
                            {formatPrice(prod.price)}
                          </span>
                          {prod.originalPrice && (
                            <span className="text-xs text-neutral-400 line-through">
                              {formatPrice(prod.originalPrice)}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Add To Cart */}
                      <button
                        onClick={() => {
                          addToCart(prod, 1);
                        }}
                        className="mt-2 w-full bg-neutral-900 hover:bg-[#FF5500] text-white text-xs font-semibold py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Bag</span>
                      </button>

                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer */}
          {wishlistedProducts.length > 0 && (
            <div className="p-5 border-t border-neutral-100 bg-white">
              <button
                onClick={() => {
                  wishlistedProducts.forEach((p) => p && addToCart(p, 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full bg-neutral-950 hover:bg-neutral-800 text-white py-3.5 rounded-xl font-bold text-sm tracking-wide flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <span>Add All to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
