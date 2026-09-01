/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { FeatureBenefits } from './components/FeatureBenefits';
import { ShopByCategories } from './components/ShopByCategories';
import { NewArrivals } from './components/NewArrivals';
import { BestSellers } from './components/BestSellers';
import { PromotionalSection } from './components/PromotionalSection';
import { BottomTrustSection } from './components/BottomTrustSection';
import { Footer } from './components/Footer';

// Interactive Modals & Drawers
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SearchModal } from './components/SearchModal';
import { AuthModal } from './components/AuthModal';
import { UserProfileModal } from './components/UserProfileModal';
import { CheckoutModal } from './components/CheckoutModal';
import { ShopCatalogModal } from './components/ShopCatalogModal';
import { BrandModals } from './components/BrandModals';
import { ToastContainer } from './components/ToastContainer';
import { AdminLayout } from './admin/AdminLayout';

const MainShopApp: React.FC = () => {
  const { currentView } = useShop();
  const [isShopCatalogOpen, setIsShopCatalogOpen] = useState(false);
  const [activeBrandModal, setActiveBrandModal] = useState<'about' | 'blog' | 'contact' | null>(null);

  if (currentView === 'admin') {
    return (
      <>
        <AdminLayout />
        <ToastContainer />
      </>
    );
  }

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCFCFC] text-[#111111] font-sans selection:bg-[#FF5500] selection:text-white">
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Header with Navigation & Icons */}
      <Header
        onOpenShop={() => setIsShopCatalogOpen(true)}
        onOpenAbout={() => setActiveBrandModal('about')}
        onOpenBlog={() => setActiveBrandModal('blog')}
        onOpenContact={() => setActiveBrandModal('contact')}
        onScrollToSection={scrollToSection}
      />

      <main className="flex-1">
        {/* 3. Hero Section */}
        <HeroSection
          onShopClick={() => setIsShopCatalogOpen(true)}
          onExploreClick={() => scrollToSection('new-arrivals')}
        />

        {/* 4. Feature Benefits (Free Shipping, Secure Payments, Easy Returns, 24/7 Support) */}
        <FeatureBenefits />

        {/* 5. Shop by Categories (6 Categories with images) */}
        <ShopByCategories
          onViewAllClick={() => setIsShopCatalogOpen(true)}
        />

        {/* 6. New Arrivals (Horizontal Carousel with 6 Products) */}
        <NewArrivals
          onViewAllClick={() => setIsShopCatalogOpen(true)}
        />

        {/* 7. Best Sellers (3 Large Premium Product Cards) */}
        <BestSellers
          onViewAllClick={() => setIsShopCatalogOpen(true)}
        />

        {/* 8. Promotional Section (Flash Sale & New Collection Banners) */}
        <PromotionalSection
          onShopSaleClick={() => setIsShopCatalogOpen(true)}
          onShopCollectionClick={() => setIsShopCatalogOpen(true)}
        />

        {/* 9. Bottom Trust Section (4 Trust features) */}
        <BottomTrustSection />
      </main>

      {/* 10. Footer */}
      <Footer
        onOpenShop={() => setIsShopCatalogOpen(true)}
        onOpenAbout={() => setActiveBrandModal('about')}
        onOpenBlog={() => setActiveBrandModal('blog')}
        onOpenContact={() => setActiveBrandModal('contact')}
      />

      {/* Slide-over Drawers & Modals */}
      <CartDrawer />
      <WishlistDrawer />
      <ProductDetailModal />
      <SearchModal />
      <AuthModal />
      <UserProfileModal />
      <CheckoutModal />
      
      {/* Full Catalog Modal with Filters & Sorting */}
      <ShopCatalogModal
        isOpen={isShopCatalogOpen}
        onClose={() => setIsShopCatalogOpen(false)}
      />

      {/* Brand Modals (About, Blog, Contact) */}
      <BrandModals
        type={activeBrandModal}
        onClose={() => setActiveBrandModal(null)}
      />

      {/* Animated Toast Alerts Container */}
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainShopApp />
    </ShopProvider>
  );
}
