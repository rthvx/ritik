import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Heart, 
  User as UserIcon, 
  ShoppingBag, 
  Menu, 
  X, 
  ChevronDown,
  Sparkles,
  ArrowRight,
  Shield,
  LayoutDashboard
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { CATEGORIES } from '../data/products';

interface HeaderProps {
  onOpenShop: () => void;
  onOpenAbout: () => void;
  onOpenBlog: () => void;
  onOpenContact: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenShop,
  onOpenAbout,
  onOpenBlog,
  onOpenContact,
  onScrollToSection
}) => {
  const {
    cartCount,
    wishlist,
    user,
    setIsCartOpen,
    setIsWishlistOpen,
    setIsAuthOpen,
    setIsProfileOpen,
    setIsSearchOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
    setSelectedCategory,
    setCurrentView
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoriesDropdownOpen, setIsCategoriesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleCategorySelect = (categoryName: string) => {
    setSelectedCategory(categoryName);
    setIsCategoriesDropdownOpen(false);
    setIsMobileMenuOpen(false);
    onOpenShop();
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-xs py-3.5 border-b border-neutral-100'
          : 'bg-white py-4 border-b border-neutral-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Mobile Menu Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-neutral-700 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          {/* RTHVX Brand Logo */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-left group flex items-center gap-1 cursor-pointer"
          >
            <span className="font-extrabold text-2xl tracking-tighter text-neutral-950 font-sans group-hover:text-black transition-colors">
              RTHVX
            </span>
            <span className="w-2 h-2 rounded-full bg-[#FF5500] inline-block mb-1 group-hover:scale-125 transition-transform" />
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-neutral-600">
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-neutral-950 font-semibold relative after:content-[''] after:absolute after:-bottom-1.5 after:left-0 after:w-full after:h-0.5 after:bg-[#FF5500] transition-colors"
          >
            Home
          </button>

          <button
            onClick={onOpenShop}
            className="hover:text-neutral-950 transition-colors cursor-pointer"
          >
            Shop
          </button>

          <button
            onClick={() => onScrollToSection('new-arrivals')}
            className="hover:text-neutral-950 transition-colors cursor-pointer flex items-center gap-1"
          >
            New Arrivals
            <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider bg-orange-100 text-[#FF5500] rounded-full">
              HOT
            </span>
          </button>

          <button
            onClick={() => onScrollToSection('best-sellers')}
            className="hover:text-neutral-950 transition-colors cursor-pointer"
          >
            Best Sellers
          </button>

          {/* Categories dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCategoriesDropdownOpen(true)}
            onMouseLeave={() => setIsCategoriesDropdownOpen(false)}
          >
            <button
              onClick={() => setIsCategoriesDropdownOpen(!isCategoriesDropdownOpen)}
              className="flex items-center gap-1 hover:text-neutral-950 transition-colors py-1 cursor-pointer"
            >
              Categories
              <ChevronDown
                className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isCategoriesDropdownOpen ? 'rotate-180 text-[#FF5500]' : ''
                }`}
              />
            </button>

            {isCategoriesDropdownOpen && (
              <div className="absolute top-full left-0 w-72 pt-2 z-50">
                <div className="bg-white rounded-2xl shadow-xl border border-neutral-100 p-3 overflow-hidden">
                  <div className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase px-3 py-1.5">
                    Browse Department
                  </div>
                  <div className="grid grid-cols-1 gap-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleCategorySelect(cat.name)}
                        className="flex items-center justify-between p-2.5 rounded-xl hover:bg-neutral-50 transition-colors text-left group w-full"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={cat.image}
                            alt={cat.name}
                            className="w-9 h-9 rounded-lg object-cover group-hover:scale-105 transition-transform"
                          />
                          <div>
                            <div className="text-sm font-semibold text-neutral-800 group-hover:text-[#FF5500] transition-colors">
                              {cat.name}
                            </div>
                            <div className="text-[11px] text-neutral-500">
                              {cat.itemCount} items
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-neutral-300 group-hover:text-[#FF5500] group-hover:translate-x-0.5 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={onOpenAbout}
            className="hover:text-neutral-950 transition-colors cursor-pointer"
          >
            About
          </button>

          <button
            onClick={onOpenBlog}
            className="hover:text-neutral-950 transition-colors cursor-pointer"
          >
            Blog
          </button>

          <button
            onClick={onOpenContact}
            className="hover:text-neutral-950 transition-colors cursor-pointer"
          >
            Contact
          </button>
        </nav>

        {/* Right Action Icons: Search, Wishlist, Account, Cart */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Search Button */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search products"
            className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-all cursor-pointer relative group"
          >
            <Search className="w-5 h-5 stroke-[1.75]" />
            <span className="sr-only">Search</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            aria-label="Wishlist"
            className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-all cursor-pointer relative"
          >
            <Heart className="w-5 h-5 stroke-[1.75]" />
            {wishlist.length > 0 && (
              <span className="absolute 1 top-1 right-1 w-4 h-4 bg-[#FF5500] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-scale">
                {wishlist.length}
              </span>
            )}
            <span className="sr-only">Wishlist</span>
          </button>

          {/* Account Button */}
          <button
            onClick={() => {
              if (user) {
                setIsProfileOpen(true);
              } else {
                setIsAuthOpen(true);
              }
            }}
            aria-label="Account"
            className="p-2 text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 rounded-full transition-all cursor-pointer relative"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                alt={user.name}
                className="w-6 h-6 rounded-full object-cover ring-2 ring-neutral-200"
              />
            ) : (
              <UserIcon className="w-5 h-5 stroke-[1.75]" />
            )}
            <span className="sr-only">Account</span>
          </button>

          {/* Shopping Cart Button with Count Badge */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Shopping Cart"
            className="flex items-center gap-2 bg-neutral-950 hover:bg-neutral-800 text-white pl-3.5 pr-4 py-2 rounded-full transition-all shadow-xs cursor-pointer active:scale-95"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-neutral-200" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2.5 w-4 h-4 bg-[#FF5500] text-white text-[10px] font-extrabold rounded-full flex items-center justify-center ring-2 ring-neutral-950">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold tracking-wide">
              Cart
            </span>
          </button>

          {/* Admin Dashboard Button */}
          <button
            onClick={() => setCurrentView('admin')}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold transition-all border border-neutral-200 cursor-pointer active:scale-95 ml-1"
            title="Open Admin Dashboard"
          >
            <LayoutDashboard className="w-3.5 h-3.5 text-[#FF5500]" />
            <span>Admin</span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-Out Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-neutral-100 bg-white px-4 pt-3 pb-6 space-y-4 shadow-xl">
          <div className="flex items-center gap-2 bg-neutral-100 px-3 py-2 rounded-xl">
            <Search className="w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search products in RTHVX..."
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              readOnly
              className="bg-transparent text-sm w-full outline-none text-neutral-800"
            />
          </div>

          {/* Mobile Admin Quick Switch Banner */}
          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              setCurrentView('admin');
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-neutral-900 text-white font-bold text-xs flex items-center justify-between shadow-xs"
          >
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-[#FF5500]" />
              <span>ISKA DASHBASE ADMIN</span>
            </div>
            <span className="text-[10px] bg-[#FF5500] px-2 py-0.5 rounded-full">CONSOLE</span>
          </button>

          <div className="grid grid-cols-2 gap-2 text-sm font-medium text-neutral-700">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="p-2.5 text-left rounded-lg bg-neutral-50 font-semibold text-neutral-950"
            >
              Home
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenShop();
              }}
              className="p-2.5 text-left rounded-lg hover:bg-neutral-50"
            >
              Shop All
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onScrollToSection('new-arrivals');
              }}
              className="p-2.5 text-left rounded-lg hover:bg-neutral-50"
            >
              New Arrivals
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onScrollToSection('best-sellers');
              }}
              className="p-2.5 text-left rounded-lg hover:bg-neutral-50"
            >
              Best Sellers
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenAbout();
              }}
              className="p-2.5 text-left rounded-lg hover:bg-neutral-50"
            >
              About RTHVX
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBlog();
              }}
              className="p-2.5 text-left rounded-lg hover:bg-neutral-50"
            >
              Brand Blog
            </button>
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenContact();
              }}
              className="p-2.5 text-left rounded-lg hover:bg-neutral-50 col-span-2"
            >
              Contact Support
            </button>
          </div>

          <div className="pt-2 border-t border-neutral-100">
            <p className="text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">
              Categories
            </p>
            <div className="flex flex-wrap gap-1.5">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.name)}
                  className="px-3 py-1.5 text-xs font-medium bg-neutral-100 hover:bg-neutral-200 text-neutral-700 rounded-lg transition-colors"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
