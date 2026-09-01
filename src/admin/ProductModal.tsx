import React, { useState, useEffect } from 'react';
import { X, Upload, Plus, Trash2, Check, AlertCircle } from 'lucide-react';
import { Product } from '../types';
import { CATEGORIES } from '../data/products';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Omit<Product, 'id'> & { id?: string }) => void;
  initialProduct?: Product | null;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialProduct
}) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<Product['category']>('Fashion');
  const [price, setPrice] = useState<number>(1999);
  const [originalPrice, setOriginalPrice] = useState<number | undefined>(2499);
  const [sku, setSku] = useState('');
  const [inStock, setInStock] = useState(true);
  const [badge, setBadge] = useState('');
  const [isNew, setIsNew] = useState(true);
  const [isBestseller, setIsBestseller] = useState(false);
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [selectedSizes, setSelectedSizes] = useState<string[]>(['S', 'M', 'L']);
  const [colors, setColors] = useState<{ name: string; hex: string }[]>([
    { name: 'Classic Black', hex: '#111111' },
    { name: 'Oatmeal Beige', hex: '#D6C7B2' }
  ]);

  const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'UK 7', 'UK 8', 'UK 9', 'UK 10', '41mm', '45mm', '500ml', '750ml', '30ml', '50ml'];

  useEffect(() => {
    if (initialProduct) {
      setName(initialProduct.name);
      setCategory(initialProduct.category);
      setPrice(initialProduct.price);
      setOriginalPrice(initialProduct.originalPrice);
      setSku(initialProduct.sku);
      setInStock(initialProduct.inStock);
      setBadge(initialProduct.badge || '');
      setIsNew(!!initialProduct.isNew);
      setIsBestseller(!!initialProduct.isBestseller);
      setImage(initialProduct.image);
      setDescription(initialProduct.description);
      setShortDescription(initialProduct.shortDescription || '');
      setFeatures(initialProduct.features.length > 0 ? initialProduct.features : ['']);
      setSelectedSizes(initialProduct.sizes || []);
      setColors(initialProduct.colors || []);
    } else {
      setName('');
      setCategory('Fashion');
      setPrice(1999);
      setOriginalPrice(2499);
      setSku(`RTH-${Math.floor(1000 + Math.random() * 9000)}`);
      setInStock(true);
      setBadge('New');
      setIsNew(true);
      setIsBestseller(false);
      setImage('https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80');
      setDescription('Crafted with premium materials and designed for timeless aesthetics and modern function.');
      setShortDescription('Premium lifestyle product engineered with highest precision.');
      setFeatures(['High-grade premium materials', 'Ergonomic contemporary design', 'Long-lasting durability']);
      setSelectedSizes(['S', 'M', 'L']);
      setColors([{ name: 'Matte Black', hex: '#18181B' }]);
    }
  }, [initialProduct, isOpen]);

  if (!isOpen) return null;

  const handleAddFeature = () => {
    setFeatures([...features, '']);
  };

  const handleFeatureChange = (index: number, val: string) => {
    const updated = [...features];
    updated[index] = val;
    setFeatures(updated);
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const toggleSize = (size: string) => {
    if (selectedSizes.includes(size)) {
      setSelectedSizes(selectedSizes.filter((s) => s !== size));
    } else {
      setSelectedSizes([...selectedSizes, size]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const discountPercent = originalPrice && originalPrice > price 
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : undefined;

    const productPayload: Omit<Product, 'id'> & { id?: string } = {
      id: initialProduct?.id,
      name: name.trim(),
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      category,
      price: Number(price) || 0,
      originalPrice: originalPrice ? Number(originalPrice) : undefined,
      discountPercent,
      sku: sku.trim() || `RTH-${Date.now().toString().slice(-4)}`,
      inStock,
      badge: badge.trim() || (discountPercent ? `-${discountPercent}%` : undefined),
      isNew,
      isBestseller,
      image: image.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      gallery: [image.trim() || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80'],
      description: description.trim(),
      shortDescription: shortDescription.trim(),
      features: features.filter((f) => f.trim().length > 0),
      sizes: selectedSizes,
      colors: colors.length > 0 ? colors : undefined,
      rating: initialProduct?.rating || 4.9,
      reviewCount: initialProduct?.reviewCount || 1
    };

    onSave(productPayload);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[92vh] border border-neutral-100 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/50">
          <div>
            <h2 className="text-lg font-bold text-neutral-900 font-sans">
              {initialProduct ? 'Edit Product' : 'Add New Product'}
            </h2>
            <p className="text-xs text-neutral-500">
              {initialProduct ? `Updating SKU ${initialProduct.sku}` : 'Fill in the details to publish a new catalog item'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6 space-y-6 flex-1 text-sm">
          
          {/* Main Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            {/* Product Name */}
            <div className="space-y-1 md:col-span-2">
              <label className="text-xs font-semibold text-neutral-700">Product Title *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Minimalist Cotton Oversized Tee"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] transition-all bg-white"
              />
            </div>

            {/* Category */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Product['category'])}
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] transition-all bg-white"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* SKU */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700">SKU Code</label>
              <input
                type="text"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                placeholder="RTH-FAS-001"
                className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] transition-all bg-white font-mono text-xs"
              />
            </div>

            {/* Selling Price in INR */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700">Selling Price (₹ INR) *</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-neutral-400 font-semibold">₹</span>
                <input
                  type="number"
                  required
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  placeholder="2499"
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] transition-all font-semibold"
                />
              </div>
            </div>

            {/* Original MRP / Compare Price */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700">Original MRP (₹ INR)</label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-neutral-400 font-semibold">₹</span>
                <input
                  type="number"
                  min="0"
                  value={originalPrice || ''}
                  onChange={(e) => setOriginalPrice(e.target.value ? Number(e.target.value) : undefined)}
                  placeholder="3499"
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] transition-all text-neutral-600"
                />
              </div>
            </div>
          </div>

          {/* Image URL & Live Preview */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700">Image URL</label>
            <div className="flex gap-3 items-start">
              <div className="flex-1">
                <input
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://images.unsplash.com/photo-..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] transition-all text-xs"
                />
                <p className="text-[11px] text-neutral-400 mt-1">Paste a clean image link from Unsplash, CDN or asset repository</p>
              </div>
              <div className="w-16 h-16 rounded-xl border border-neutral-200 overflow-hidden bg-neutral-100 shrink-0">
                {image ? (
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-neutral-400">
                    <Upload className="w-5 h-5" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Descriptions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700">Short Summary</label>
              <textarea
                rows={2}
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief one-liner for catalog badges and quick view..."
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] transition-all resize-none text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold text-neutral-700">Full Description</label>
              <textarea
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Comprehensive material details, craft story, and fit guide..."
                className="w-full px-3.5 py-2 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] transition-all resize-none text-xs"
              />
            </div>
          </div>

          {/* Key Features Bullet List */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-semibold text-neutral-700">Key Product Highlights</label>
              <button
                type="button"
                onClick={handleAddFeature}
                className="text-xs font-semibold text-[#FF5500] hover:text-[#e04b00] flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Add Feature
              </button>
            </div>
            <div className="space-y-2">
              {features.map((feat, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feat}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    placeholder={`Feature ${idx + 1} (e.g. 100% Organic Heavyweight Cotton)`}
                    className="flex-1 px-3 py-2 text-xs rounded-lg border border-neutral-200 focus:outline-none focus:ring-1 focus:ring-[#FF5500] bg-white"
                  />
                  {features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveFeature(idx)}
                      className="p-2 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-neutral-700">Available Sizes / Variants</label>
            <div className="flex flex-wrap gap-1.5">
              {AVAILABLE_SIZES.map((size) => {
                const isSelected = selectedSizes.includes(size);
                return (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`px-3 py-1 text-xs rounded-lg font-medium border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900'
                        : 'bg-white text-neutral-600 border-neutral-200 hover:border-neutral-400'
                    }`}
                  >
                    {size}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Status & Flags */}
          <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            {/* In Stock toggle */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={inStock}
                onChange={(e) => setInStock(e.target.checked)}
                className="w-4 h-4 text-[#FF5500] rounded focus:ring-[#FF5500]"
              />
              <span className="text-xs font-medium text-neutral-800">In Stock</span>
            </label>

            {/* New Arrival flag */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isNew}
                onChange={(e) => setIsNew(e.target.checked)}
                className="w-4 h-4 text-[#FF5500] rounded focus:ring-[#FF5500]"
              />
              <span className="text-xs font-medium text-neutral-800">New Arrival</span>
            </label>

            {/* Bestseller flag */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isBestseller}
                onChange={(e) => setIsBestseller(e.target.checked)}
                className="w-4 h-4 text-[#FF5500] rounded focus:ring-[#FF5500]"
              />
              <span className="text-xs font-medium text-neutral-800">Bestseller</span>
            </label>

            {/* Custom Badge input */}
            <div className="space-y-0.5 col-span-2 sm:col-span-1">
              <input
                type="text"
                value={badge}
                onChange={(e) => setBadge(e.target.value)}
                placeholder="Badge (e.g. HOT)"
                className="w-full px-2.5 py-1 text-xs rounded-lg border border-neutral-200 bg-white"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="pt-4 border-t border-neutral-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl border border-neutral-200 text-neutral-700 font-medium text-xs hover:bg-neutral-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#FF5500] hover:bg-[#e04b00] text-white font-semibold text-xs shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              {initialProduct ? 'Save Product Changes' : 'Publish Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
