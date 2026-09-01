import React, { useState, useEffect } from 'react';
import { 
  X, 
  Star, 
  Heart, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Minus, 
  Plus,
  Share2
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { formatPrice } from '../utils/format';

export const ProductDetailModal: React.FC = () => {
  const {
    quickViewProduct,
    setQuickViewProduct,
    addToCart,
    buyNow,
    toggleWishlist,
    isInWishlist,
    toast
  } = useShop();

  const [selectedImage, setSelectedImage] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  useEffect(() => {
    if (quickViewProduct) {
      setSelectedImage(quickViewProduct.image);
      setSelectedColor(quickViewProduct.colors ? quickViewProduct.colors[0]?.name : '');
      setSelectedSize(quickViewProduct.sizes ? quickViewProduct.sizes[0] : '');
      setQuantity(1);
      setActiveTab('overview');
    }
  }, [quickViewProduct]);

  if (!quickViewProduct) return null;

  const isWishlisted = isInWishlist(quickViewProduct.id);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast('Link Copied!', `Shared link for ${quickViewProduct.name}`, 'info');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden border border-neutral-100 z-10 animate-scale">
          
          {/* Close Button */}
          <button
            onClick={() => setQuickViewProduct(null)}
            className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-950 transition-colors shadow-xs"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-0">
            
            {/* Left: Product Images Gallery */}
            <div className="md:col-span-6 bg-[#F8F8F9] p-6 sm:p-8 flex flex-col justify-between border-b md:border-b-0 md:border-r border-neutral-100">
              
              {/* Main Image Display */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-xs p-4 flex items-center justify-center mb-4">
                {quickViewProduct.badge && (
                  <div className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#FF5500] text-white shadow-xs">
                    {quickViewProduct.badge}
                  </div>
                )}

                <img
                  src={selectedImage || quickViewProduct.image}
                  alt={quickViewProduct.name}
                  className="w-full h-full object-contain mix-blend-multiply transition-all duration-300"
                />
              </div>

              {/* Gallery Thumbnails */}
              {quickViewProduct.gallery && quickViewProduct.gallery.length > 1 && (
                <div className="flex gap-2.5 overflow-x-auto pb-1">
                  {quickViewProduct.gallery.map((imgUrl, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(imgUrl)}
                      className={`w-16 h-16 rounded-xl overflow-hidden p-1 bg-white border-2 transition-all shrink-0 ${
                        selectedImage === imgUrl ? 'border-[#FF5500] shadow-xs' : 'border-neutral-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={imgUrl}
                        alt={`View ${i + 1}`}
                        className="w-full h-full object-contain mix-blend-multiply"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges under gallery */}
              <div className="pt-4 grid grid-cols-2 gap-2 text-[11px] text-neutral-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>Free Express Delivery over ₹999</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <RotateCcw className="w-3.5 h-3.5 text-[#FF5500]" />
                  <span>7-Day Easy Returns & Exchange</span>
                </div>
              </div>

            </div>

            {/* Right: Product Details & Controls */}
            <div className="md:col-span-6 p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
              
              <div className="space-y-4">
                
                {/* Category & SKU */}
                <div className="flex items-center justify-between text-xs text-neutral-400 font-medium">
                  <span className="text-[#FF5500] font-bold uppercase tracking-wider">
                    {quickViewProduct.category}
                  </span>
                  <span>SKU: {quickViewProduct.sku}</span>
                </div>

                {/* Title */}
                <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-snug">
                  {quickViewProduct.name}
                </h1>

                {/* Rating & Reviews */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(quickViewProduct.rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-neutral-200'
                        }`}
                      />
                    ))}
                    <span className="text-xs font-bold text-neutral-900 ml-1">
                      {quickViewProduct.rating.toFixed(1)}
                    </span>
                  </div>

                  <span className="text-neutral-300">•</span>
                  <span className="text-xs text-neutral-500 font-medium underline">
                    {quickViewProduct.reviewCount} customer reviews
                  </span>

                  <span className="text-neutral-300">•</span>
                  <div className="flex items-center gap-1 text-emerald-600 text-xs font-semibold">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>In Stock</span>
                  </div>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-1">
                  <span className="text-3xl font-extrabold text-neutral-950">
                    {formatPrice(quickViewProduct.price)}
                  </span>
                  {quickViewProduct.originalPrice && (
                    <span className="text-base text-neutral-400 line-through font-medium">
                      {formatPrice(quickViewProduct.originalPrice)}
                    </span>
                  )}
                  {quickViewProduct.discountPercent && (
                    <span className="text-xs font-bold bg-orange-100 text-[#FF5500] px-2 py-0.5 rounded-full">
                      Save {quickViewProduct.discountPercent}%
                    </span>
                  )}
                </div>

                {/* Description Tabs: Overview vs Features */}
                <div className="border-t border-b border-neutral-100 py-3 my-2">
                  <div className="flex gap-4 border-b border-neutral-100 pb-2 mb-2 text-xs font-bold">
                    <button
                      onClick={() => setActiveTab('overview')}
                      className={`pb-1 transition-colors ${
                        activeTab === 'overview'
                          ? 'text-[#FF5500] border-b-2 border-[#FF5500]'
                          : 'text-neutral-400 hover:text-neutral-700'
                      }`}
                    >
                      Description
                    </button>
                    <button
                      onClick={() => setActiveTab('specs')}
                      className={`pb-1 transition-colors ${
                        activeTab === 'specs'
                          ? 'text-[#FF5500] border-b-2 border-[#FF5500]'
                          : 'text-neutral-400 hover:text-neutral-700'
                      }`}
                    >
                      Specifications
                    </button>
                  </div>

                  {activeTab === 'overview' ? (
                    <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                      {quickViewProduct.description}
                    </p>
                  ) : (
                    <ul className="space-y-1.5 text-xs text-neutral-600">
                      {quickViewProduct.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#FF5500] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {/* Color Selector */}
                {quickViewProduct.colors && quickViewProduct.colors.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-neutral-800">Color:</span>
                      <span className="text-neutral-500 font-medium">{selectedColor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {quickViewProduct.colors.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setSelectedColor(c.name)}
                          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                            selectedColor === c.name ? 'ring-2 ring-offset-2 ring-neutral-900 scale-110' : 'opacity-80 hover:opacity-100'
                          }`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        >
                          {selectedColor === c.name && (
                            <Check className={`w-3.5 h-3.5 ${c.hex === '#F4F4F5' || c.hex === '#E5E7EB' || c.hex === '#FFFFFF' ? 'text-black' : 'text-white'}`} />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selector */}
                {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
                  <div className="space-y-2 pt-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-neutral-800">Size / Option:</span>
                      <span className="text-neutral-500 font-medium">{selectedSize}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {quickViewProduct.sizes.map((s) => (
                        <button
                          key={s}
                          onClick={() => setSelectedSize(s)}
                          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                            selectedSize === s
                              ? 'bg-neutral-900 text-white border-neutral-900 shadow-xs'
                              : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity & Action Controls */}
                <div className="pt-3 space-y-3">
                  <div className="flex items-center gap-3">
                    
                    {/* Quantity counter */}
                    <div className="flex items-center bg-neutral-100 border border-neutral-200 rounded-xl overflow-hidden">
                      <button
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="p-3 text-neutral-700 hover:bg-neutral-200 transition-colors"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-xs font-bold text-neutral-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity((q) => q + 1)}
                        className="p-3 text-neutral-700 hover:bg-neutral-200 transition-colors"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={() => {
                        addToCart(quickViewProduct, quantity, selectedColor, selectedSize);
                      }}
                      className="flex-1 bg-neutral-950 hover:bg-neutral-800 text-white py-3 px-5 rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-sm transition-all active:scale-98 cursor-pointer"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      <span>Add to Bag ({formatPrice(quickViewProduct.price * quantity)})</span>
                    </button>

                    {/* Wishlist toggle */}
                    <button
                      onClick={() => toggleWishlist(quickViewProduct)}
                      className={`p-3 rounded-xl border transition-all ${
                        isWishlisted
                          ? 'border-rose-200 bg-rose-50 text-rose-600'
                          : 'border-neutral-200 hover:border-neutral-400 text-neutral-700'
                      }`}
                      title="Save to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                    </button>

                    {/* Share */}
                    <button
                      onClick={handleShare}
                      className="p-3 rounded-xl border border-neutral-200 hover:border-neutral-400 text-neutral-700 transition-colors"
                      title="Share product"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Buy Now Direct Button */}
                  <button
                    onClick={() => {
                      buyNow(quickViewProduct, quantity, selectedColor, selectedSize);
                    }}
                    className="w-full bg-[#FF5500] hover:bg-[#E64D00] text-white py-3 px-5 rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-md shadow-orange-500/20 active:scale-98 transition-all cursor-pointer"
                  >
                    <Zap className="w-4 h-4 fill-white" />
                    <span>Buy Now with 1-Click</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
