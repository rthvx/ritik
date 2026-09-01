import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';

interface ShopByCategoriesProps {
  onViewAllClick: () => void;
}

export const ShopByCategories: React.FC<ShopByCategoriesProps> = ({ onViewAllClick }) => {
  const { setSelectedCategory } = useShop();

  const handleSelectCategory = (catName: string) => {
    setSelectedCategory(catName);
    onViewAllClick();
  };

  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight">
              Shop by Categories
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 mt-1 font-medium">
              Explore our curated departments designed for modern lifestyles
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory(null);
              onViewAllClick();
            }}
            className="group inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-900 hover:text-[#FF5500] transition-colors cursor-pointer"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => handleSelectCategory(cat.name)}
              className="group cursor-pointer bg-neutral-50 hover:bg-white rounded-2xl p-3 border border-neutral-100 hover:border-neutral-200 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Category Image Box */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-neutral-200 mb-3">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>

              {/* Category Label & CTA */}
              <div className="text-left px-1 pb-1">
                <h3 className="font-bold text-sm text-neutral-900 group-hover:text-[#FF5500] transition-colors">
                  {cat.name}
                </h3>
                <div className="flex items-center justify-between text-xs text-neutral-500 mt-0.5">
                  <span className="font-medium group-hover:text-neutral-700 transition-colors">
                    Shop Now
                  </span>
                  <span className="text-xs group-hover:text-[#FF5500] group-hover:translate-x-1 transition-transform font-bold">
                    →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
