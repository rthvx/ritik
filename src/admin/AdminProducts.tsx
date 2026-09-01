import React, { useState, useMemo } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  AlertTriangle, 
  Sparkles,
  ArrowUpDown,
  Tag,
  Package
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import { CATEGORIES } from '../data/products';
import { ProductModal } from './ProductModal';

export const AdminProducts: React.FC = () => {
  const { 
    products, 
    addProduct, 
    updateProduct, 
    deleteProduct, 
    toggleProductStock, 
    formatPrice 
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [stockFilter, setStockFilter] = useState<'all' | 'inStock' | 'outOfStock'>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'price-asc' | 'price-desc' | 'rating'>('newest');

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingProductId, setDeletingProductId] = useState<string | null>(null);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products.filter((prod) => {
      const matchSearch = prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.category.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCategory = selectedCategory === 'All' || prod.category === selectedCategory;
      const matchStock = stockFilter === 'all' 
        ? true 
        : stockFilter === 'inStock' 
        ? prod.inStock 
        : !prod.inStock;

      return matchSearch && matchCategory && matchStock;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // default order
    });
  }, [products, searchQuery, selectedCategory, stockFilter, sortBy]);

  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSaveProduct = (productData: Omit<Product, 'id'> & { id?: string }) => {
    if (editingProduct) {
      updateProduct({ ...editingProduct, ...productData });
    } else {
      addProduct(productData);
    }
  };

  const confirmDelete = () => {
    if (deletingProductId) {
      deleteProduct(deletingProductId);
      setDeletingProductId(null);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header with Title and Add Product Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-neutral-950 font-sans">
            Products Catalog
          </h1>
          <p className="text-xs text-neutral-500">
            Manage inventory items, pricing, attributes, categories, and stock availability.
          </p>
        </div>
        <button
          onClick={handleOpenAddModal}
          className="px-4 py-2.5 bg-[#FF5500] hover:bg-[#e04b00] text-white font-semibold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" />
          Add Product
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          
          {/* Search Bar */}
          <div className="md:col-span-2 relative">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by title, SKU, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] bg-neutral-50/50"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-neutral-400 hover:text-neutral-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] bg-neutral-50/50 text-neutral-800"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Stock Filter */}
          <div className="relative">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as 'all' | 'inStock' | 'outOfStock')}
              className="w-full px-3 py-2 text-xs rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-[#FF5500]/20 focus:border-[#FF5500] bg-neutral-50/50 text-neutral-800"
            >
              <option value="all">All Stock Statuses</option>
              <option value="inStock">In Stock Only</option>
              <option value="outOfStock">Out of Stock</option>
            </select>
          </div>
        </div>

        {/* Status Count Chips */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-neutral-100 text-xs">
          <span className="text-neutral-500 font-medium">
            Showing <strong className="text-neutral-900">{filteredProducts.length}</strong> of {products.length} products
          </span>

          <div className="flex items-center gap-2">
            <span className="text-neutral-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-transparent border-0 font-semibold text-neutral-800 focus:outline-none cursor-pointer"
            >
              <option value="newest">Catalog Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-600 font-semibold border-b border-neutral-100">
              <tr>
                <th className="py-3.5 px-4">Product Info</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Price (INR)</th>
                <th className="py-3.5 px-4">SKU</th>
                <th className="py-3.5 px-4">Stock Status</th>
                <th className="py-3.5 px-4">Badges</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    <Package className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="font-semibold">No products found matching the filter.</p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedCategory('All');
                        setStockFilter('all');
                      }}
                      className="mt-2 text-xs font-semibold text-[#FF5500] hover:underline"
                    >
                      Clear Filters
                    </button>
                  </td>
                </tr>
              ) : (
                filteredProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-neutral-50/50 transition-colors">
                    
                    {/* Image & Title */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={prod.image}
                          alt={prod.name}
                          className="w-12 h-12 rounded-xl object-cover border border-neutral-100 shrink-0"
                        />
                        <div>
                          <div className="font-bold text-neutral-900 hover:text-[#FF5500] transition-colors">
                            {prod.name}
                          </div>
                          <div className="text-[11px] text-neutral-400 line-clamp-1">
                            {prod.shortDescription || prod.description}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="py-3.5 px-4">
                      <span className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-700 font-medium text-[11px]">
                        {prod.category}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-neutral-950">
                        {formatPrice(prod.price)}
                      </div>
                      {prod.originalPrice && prod.originalPrice > prod.price && (
                        <div className="text-[10px] text-neutral-400 line-through">
                          {formatPrice(prod.originalPrice)}
                        </div>
                      )}
                    </td>

                    {/* SKU */}
                    <td className="py-3.5 px-4 font-mono text-[11px] text-neutral-600">
                      {prod.sku}
                    </td>

                    {/* Stock status toggle switch */}
                    <td className="py-3.5 px-4">
                      <button
                        onClick={() => toggleProductStock(prod.id)}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${
                          prod.inStock
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                            : 'bg-red-50 text-red-700 border-red-200 hover:bg-red-100'
                        }`}
                        title="Click to toggle stock availability"
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${prod.inStock ? 'bg-emerald-500' : 'bg-red-500'}`} />
                        {prod.inStock ? 'In Stock' : 'Out of Stock'}
                      </button>
                    </td>

                    {/* Badges / Highlights */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {prod.isNew && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-blue-50 text-blue-700">
                            NEW
                          </span>
                        )}
                        {prod.isBestseller && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-extrabold bg-orange-50 text-[#FF5500]">
                            BEST
                          </span>
                        )}
                        {prod.badge && !prod.isNew && (
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-neutral-100 text-neutral-600">
                            {prod.badge}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Action buttons */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => handleOpenEditModal(prod)}
                          className="p-1.5 text-neutral-500 hover:text-neutral-950 hover:bg-neutral-100 rounded-lg transition-colors cursor-pointer"
                          title="Edit Product"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeletingProductId(prod.id)}
                          className="p-1.5 text-neutral-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete Product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      {deletingProductId && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-sm w-full p-6 text-center space-y-4 border border-neutral-100 animate-in fade-in zoom-in-95">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-neutral-900">Delete Product?</h3>
              <p className="text-xs text-neutral-500 mt-1">
                Are you sure you want to remove this product from your catalog? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setDeletingProductId(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl border border-neutral-200 text-neutral-700 hover:bg-neutral-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-red-600 hover:bg-red-700 text-white shadow-xs transition-colors cursor-pointer"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProduct}
          initialProduct={editingProduct}
        />
      )}
    </div>
  );
};
