/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { 
  Sparkles, ArrowRight, ShieldCheck, PlusCircle, CheckCircle2, 
  MapPin, Clock, Tag, ChevronRight, Zap 
} from 'lucide-react';
import { 
  ActivePage, Product, FilterState, UserProfile, ProductReport 
} from './types';
import { 
  INITIAL_PRODUCTS, INITIAL_USER, INITIAL_REPORTS, CATEGORIES, formatTaka 
} from './data/mockData';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { CategoryList } from './components/CategoryList';
import { ProductCard } from './components/ProductCard';
import { ProductDetailModal } from './components/ProductDetailModal';
import { SellProductView } from './components/SellProductView';
import { SearchFilterView } from './components/SearchFilterView';
import { UserDashboardView } from './components/UserDashboardView';
import { AdminPanelView } from './components/AdminPanelView';
import { TrustSafetySection } from './components/TrustSafetySection';
import { Footer } from './components/Footer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { InfoModal, ReportModal } from './components/InfoModal';

export default function App() {
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);
  const [reports, setReports] = useState<ProductReport[]>(INITIAL_REPORTS);
  
  // Favorites persistence
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('bikribondhu_favs');
      return saved ? JSON.parse(saved) : ['p1', 'p2'];
    } catch {
      return ['p1', 'p2'];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('bikribondhu_favs', JSON.stringify(favorites));
    } catch {
      // ignore
    }
  }, [favorites]);

  // Active filters state
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    category: '',
    division: '',
    district: '',
    condition: 'all',
    minPrice: '',
    maxPrice: '',
    sortBy: 'newest',
  });

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [reportTargetProduct, setReportTargetProduct] = useState<Product | null>(null);
  const [infoModalType, setInfoModalType] = useState<'about' | 'safety' | 'terms' | 'privacy' | 'contact' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Toggle favorite
  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter(id => id !== productId) : [...prev, productId];
      showToast(exists ? 'পছন্দের তালিকা থেকে সরানো হয়েছে' : 'পছন্দের তালিকায় যুক্ত হয়েছে ❤️');
      return updated;
    });
  };

  // Filter & search logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (p.status !== 'active') return false;

      // Keyword match
      if (filters.searchQuery.trim()) {
        const query = filters.searchQuery.toLowerCase().trim();
        const inTitle = p.title.toLowerCase().includes(query);
        const inDesc = p.description.toLowerCase().includes(query);
        const inCat = p.category.toLowerCase().includes(query);
        const inDistrict = p.district.toLowerCase().includes(query);
        if (!inTitle && !inDesc && !inCat && !inDistrict) return false;
      }

      // Category match
      if (filters.category && p.category !== filters.category) {
        return false;
      }

      // Division match
      if (filters.division && p.division !== filters.division) {
        return false;
      }

      // District match
      if (filters.district && p.district !== filters.district) {
        return false;
      }

      // Condition match
      if (filters.condition !== 'all' && p.condition !== filters.condition) {
        return false;
      }

      // Price match
      if (filters.minPrice && p.price < Number(filters.minPrice)) {
        return false;
      }
      if (filters.maxPrice && p.price > Number(filters.maxPrice)) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      // Default: featured first, then newest
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [products, filters]);

  // Handle new product submission
  const handleAddProduct = (newProdData: Omit<Product, 'id' | 'postedTime' | 'viewsCount' | 'status'>) => {
    const newProduct: Product = {
      ...newProdData,
      id: `p-${Date.now()}`,
      postedTime: 'এইমাত্র',
      viewsCount: 1,
      status: 'active'
    };

    setProducts(prev => [newProduct, ...prev]);
    setActivePage('home');
    showToast('আপনার পণ্যটি সফলভাবে পোস্ট করা হয়েছে! 🎉');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle sold status
  const handleToggleSoldStatus = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        const nextStatus = p.status === 'sold' ? 'active' : 'sold';
        showToast(nextStatus === 'sold' ? 'পণ্যটি বিক্রিত হিসেবে চিহ্নিত করা হয়েছে' : 'পণ্যটি পুনরায় সক্রিয় করা হয়েছে');
        return { ...p, status: nextStatus };
      }
      return p;
    }));
  };

  // Delete product
  const handleDeleteProduct = (productId: string) => {
    setProducts(prev => prev.filter(p => p.id !== productId));
    showToast('বিজ্ঞাপনটি অপসারণ করা হয়েছে');
    if (selectedProduct?.id === productId) {
      setSelectedProduct(null);
    }
  };

  // Toggle featured status (admin)
  const handleToggleFeatured = (productId: string) => {
    setProducts(prev => prev.map(p => {
      if (p.id === productId) {
        return { ...p, isFeatured: !p.isFeatured };
      }
      return p;
    }));
    showToast('ফিচার্ড স্ট্যাটাস পরিবর্তন করা হয়েছে');
  };

  // Submit report
  const handleSubmitReport = (productId: string, productTitle: string, reason: string) => {
    const newReport: ProductReport = {
      id: `rep-${Date.now()}`,
      productId,
      productTitle,
      reason,
      reportedAt: '১১ সেপ্টেম্বর ২০২৬',
      status: 'pending'
    };
    setReports(prev => [newReport, ...prev]);
  };

  // Resolve report (admin)
  const handleResolveReport = (reportId: string) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, status: 'resolved' } : r));
    showToast('রিপোর্ট সমাধান হিসেবে চিহ্নিত হয়েছে');
  };

  // Filter shortcuts
  const handleCategorySelect = (categoryName: string) => {
    setFilters(prev => ({ ...prev, category: categoryName }));
    if (activePage !== 'products' && activePage !== 'home') {
      setActivePage('products');
    }
  };

  const handleSearchSubmit = () => {
    setActivePage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const favoriteProducts = useMemo(() => {
    return products.filter(p => favorites.includes(p.id));
  }, [products, favorites]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50/70 text-gray-900 pb-16 md:pb-0">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-gray-900 text-white text-xs sm:text-sm font-medium px-4 py-2.5 rounded-xl shadow-lg border border-gray-700 animate-slideDown flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        activePage={activePage}
        setActivePage={setActivePage}
        favoritesCount={favorites.length}
        myPostsCount={products.filter(p => p.seller.name === user.name).length}
      />

      {/* Body Page Content */}
      <main className="flex-1">
        
        {/* VIEW 1: HOME PAGE */}
        {activePage === 'home' && (
          <div>
            {/* Hero Section */}
            <div className="relative bg-gradient-to-b from-emerald-700 via-emerald-800 to-teal-900 text-white pt-10 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
              {/* Subtle background decoration */}
              <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
              
              <div className="max-w-5xl mx-auto text-center space-y-4 relative z-10">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600/60 border border-emerald-400/30 text-emerald-200 text-xs font-semibold backdrop-blur-xs">
                  <Zap className="w-3.5 h-3.5 text-amber-300" />
                  <span>বাংলাদেশের ১ নম্বর স্থানীয় কেনাবেচার নির্ভরযোগ্য প্ল্যাটফর্ম</span>
                </div>

                <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
                  কাছাকাছি পণ্য কিনুন ও বিক্রি করুন
                </h1>

                <p className="text-xs sm:text-base text-emerald-100 max-w-2xl mx-auto leading-relaxed">
                  আপনার এলাকার বিশ্বস্ত মানুষের সাথে সরাসরি কথা বলে ব্যবহৃত ও নতুন ফোন, বাইক, ল্যাপটপ, ফার্নিচার বা যে কোনো পণ্য সহজে কেনাবেচা করুন।
                </p>

                {/* Prominent Search Bar */}
                <div className="pt-4 max-w-4xl mx-auto">
                  <SearchBar
                    filters={filters}
                    setFilters={setFilters}
                    onSearchSubmit={handleSearchSubmit}
                  />
                </div>
              </div>
            </div>

            {/* Container for Categories and Products */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
              
              {/* Category Cards Section */}
              <div className="bg-white rounded-2xl shadow-xs border border-gray-200/80 p-5 sm:p-6 mb-10">
                <CategoryList
                  selectedCategory={filters.category}
                  onSelectCategory={handleCategorySelect}
                />
              </div>

              {/* Products Section Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
                    <span>আপনার কাছাকাছি পণ্য</span>
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                      {filteredProducts.length}টি এভেইলেবল
                    </span>
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {filters.category ? `${filters.category} ক্যাটাগরির বিজ্ঞাপন` : 'সদ্য পোস্ট করা সেরা বিজ্ঞাপন সমূহ'}
                  </p>
                </div>

                {/* Category Quick Chips on desktop */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {['সকল', 'মোবাইল', 'বাইক', 'কম্পিউটার', 'ইলেকট্রনিক্স'].map((cat, idx) => {
                    const isAll = cat === 'সকল';
                    const active = isAll ? !filters.category : filters.category === cat;
                    return (
                      <button
                        key={idx}
                        onClick={() => setFilters(prev => ({ ...prev, category: isAll ? '' : cat }))}
                        className={`text-xs px-3 py-1.5 rounded-lg font-medium transition-colors ${
                          active
                            ? 'bg-emerald-600 text-white'
                            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Product Cards Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-3 mb-10">
                  <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                    🔍
                  </div>
                  <h3 className="text-base font-bold text-gray-900">কোনো পণ্য পাওয়া যায়নি</h3>
                  <p className="text-xs text-gray-500 max-w-sm mx-auto">
                    আপনার নির্বাচিত ফিল্টারে কোনো পণ্য পাওয়া যায়নি। ফিল্টার পরিবর্তন করে পুনরায় দেখুন।
                  </p>
                  <button
                    onClick={() => setFilters({
                      searchQuery: '',
                      category: '',
                      division: '',
                      district: '',
                      condition: 'all',
                      minPrice: '',
                      maxPrice: '',
                      sortBy: 'newest'
                    })}
                    className="px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700"
                  >
                    সকল পণ্য দেখুন
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 mb-10">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      isFavorite={favorites.includes(product.id)}
                      onToggleFavorite={handleToggleFavorite}
                      onSelectProduct={setSelectedProduct}
                    />
                  ))}
                </div>
              )}

              {/* View All Products CTA */}
              <div className="text-center mb-10">
                <button
                  id="btn-view-all-products"
                  onClick={() => {
                    setActivePage('products');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-800 hover:bg-gray-50 text-sm font-semibold shadow-xs hover:border-gray-400 transition-all cursor-pointer"
                >
                  <span>সকল পণ্য এবং ফিল্টার অপশন দেখুন</span>
                  <ArrowRight className="w-4 h-4 text-emerald-600" />
                </button>
              </div>

              {/* Banner: Sell Your Product CTA */}
              <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-3xl p-6 sm:p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm mb-10">
                <div className="space-y-1.5 text-center sm:text-left">
                  <h3 className="text-xl sm:text-2xl font-extrabold">
                    আপনার কি কোনো অব্যবহৃত জিনিস আছে?
                  </h3>
                  <p className="text-xs sm:text-sm text-amber-100 max-w-lg">
                    ঘরে অযথা ফেলে না রেখে BikriBondhu BD-তে এখনই বিনামূল্যে বিজ্ঞাপন দিয়ে নগদ টাকা আয় করুন।
                  </p>
                </div>
                <button
                  id="btn-cta-sell"
                  onClick={() => {
                    setActivePage('sell');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-white text-gray-900 font-bold text-sm shadow-md hover:bg-amber-50 transition-all shrink-0 active:scale-95 cursor-pointer"
                >
                  বিজ্ঞাপন পোস্ট করুন
                </button>
              </div>

              {/* Trust & Safety Section */}
              <TrustSafetySection />

            </div>
          </div>
        )}

        {/* VIEW 2: SEARCH & FILTER / ALL PRODUCTS */}
        {activePage === 'products' && (
          <SearchFilterView
            products={filteredProducts}
            filters={filters}
            setFilters={setFilters}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
            onSelectProduct={setSelectedProduct}
          />
        )}

        {/* VIEW 3: SELL PRODUCT */}
        {activePage === 'sell' && (
          <SellProductView
            onAddProduct={handleAddProduct}
            onCancel={() => setActivePage('home')}
          />
        )}

        {/* VIEW 4: MY POSTS / USER DASHBOARD */}
        {(activePage === 'my-posts' || activePage === 'account' || activePage === 'favorites') && (
          <UserDashboardView
            user={user}
            setUser={setUser}
            myProducts={products}
            favoriteProducts={favoriteProducts}
            onDeleteProduct={handleDeleteProduct}
            onToggleSoldStatus={handleToggleSoldStatus}
            onSelectProduct={setSelectedProduct}
            onNavigateSell={() => setActivePage('sell')}
            initialTab={
              activePage === 'favorites' ? 'favorites' :
              activePage === 'my-posts' ? 'posts' : 'profile'
            }
          />
        )}

        {/* VIEW 5: ADMIN PANEL */}
        {activePage === 'admin' && (
          <AdminPanelView
            products={products}
            reports={reports}
            onToggleFeatured={handleToggleFeatured}
            onDeleteProduct={handleDeleteProduct}
            onResolveReport={handleResolveReport}
            onCloseAdmin={() => setActivePage('home')}
            onSelectProduct={setSelectedProduct}
          />
        )}

      </main>

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        isFavorite={selectedProduct ? favorites.includes(selectedProduct.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onOpenReport={(p) => setReportTargetProduct(p)}
      />

      {/* Report Modal */}
      <ReportModal
        product={reportTargetProduct}
        onClose={() => setReportTargetProduct(null)}
        onSubmitReport={handleSubmitReport}
      />

      {/* Footer Links Info Modal */}
      <InfoModal
        type={infoModalType}
        onClose={() => setInfoModalType(null)}
      />

      {/* Footer */}
      <Footer
        onOpenInfoModal={setInfoModalType}
        onNavigate={setActivePage}
      />

      {/* Mobile Bottom Navigation Bar */}
      <MobileBottomNav
        activePage={activePage}
        setActivePage={setActivePage}
        favoritesCount={favorites.length}
      />

    </div>
  );
}
