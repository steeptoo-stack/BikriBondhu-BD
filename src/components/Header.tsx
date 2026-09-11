import React from 'react';
import { ShoppingBag, PlusCircle, User, Heart, ShieldCheck, Menu, X } from 'lucide-react';
import { ActivePage } from '../types';

interface HeaderProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  favoritesCount: number;
  myPostsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activePage,
  setActivePage,
  favoritesCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Tagline */}
          <div 
            id="brand-logo"
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-11 h-11 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm group-hover:bg-emerald-700 transition-colors">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold tracking-tight text-gray-900 group-hover:text-emerald-700 transition-colors">
                  BikriBondhu <span className="text-emerald-600">BD</span>
                </span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                  বাংলাদেশ
                </span>
              </div>
              <p className="text-xs text-gray-700 hidden sm:block">
                কাছাকাছি পণ্য কিনুন ও বিক্রি করুন
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              id="nav-home"
              onClick={() => handleNav('home')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === 'home'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              হোম
            </button>
            <button
              id="nav-products"
              onClick={() => handleNav('products')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === 'products'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              পণ্য
            </button>
            <button
              id="nav-my-posts"
              onClick={() => handleNav('my-posts')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === 'my-posts'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              আমার পোস্ট
            </button>
            <button
              id="nav-favorites"
              onClick={() => handleNav('favorites')}
              className={`relative px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === 'favorites'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <Heart className="w-4 h-4" />
                <span>পছন্দ</span>
                {favoritesCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-semibold flex items-center justify-center">
                    {favoritesCount}
                  </span>
                )}
              </div>
            </button>
            <button
              id="nav-account"
              onClick={() => handleNav('account')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePage === 'account'
                  ? 'text-emerald-700 bg-emerald-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center gap-1.5">
                <User className="w-4 h-4" />
                <span>অ্যাকাউন্ট</span>
              </div>
            </button>
            <button
              id="nav-admin"
              onClick={() => handleNav('admin')}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                activePage === 'admin'
                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
              title="অ্যাডমিন ডেমো প্যানেল"
            >
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ডেমো অ্যাডমিন</span>
              </span>
            </button>
          </nav>

          {/* Desktop Right CTA: বিক্রি করুন */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="btn-header-sell"
              onClick={() => handleNav('sell')}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium text-sm shadow-xs transition-all transform active:scale-95 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              <span>বিক্রি করুন</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              id="mobile-sell-shortcut"
              onClick={() => handleNav('sell')}
              className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-medium flex items-center gap-1"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>বিক্রি</span>
            </button>
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 pt-3 pb-5 space-y-2 shadow-lg">
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activePage === 'home' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
            }`}
          >
            হোম
          </button>
          <button
            onClick={() => handleNav('products')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activePage === 'products' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
            }`}
          >
            পণ্য তালিকা
          </button>
          <button
            onClick={() => handleNav('sell')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium bg-amber-50 text-amber-800`}
          >
            পণ্য বিক্রি করুন
          </button>
          <button
            onClick={() => handleNav('my-posts')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activePage === 'my-posts' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
            }`}
          >
            আমার পোস্ট
          </button>
          <button
            onClick={() => handleNav('favorites')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activePage === 'favorites' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
            }`}
          >
            পছন্দের পণ্য ({favoritesCount})
          </button>
          <button
            onClick={() => handleNav('account')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activePage === 'account' ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
            }`}
          >
            আমার অ্যাকাউন্ট
          </button>
          <button
            onClick={() => handleNav('admin')}
            className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium ${
              activePage === 'admin' ? 'bg-amber-100 text-amber-900' : 'text-amber-800'
            }`}
          >
            ডেমো অ্যাডমিন প্যানেল
          </button>
        </div>
      )}
    </header>
  );
};
