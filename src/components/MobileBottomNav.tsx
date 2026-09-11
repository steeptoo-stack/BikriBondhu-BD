import React from 'react';
import { Home, Search, PlusCircle, Heart, User } from 'lucide-react';
import { ActivePage } from '../types';

interface MobileBottomNavProps {
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  favoritesCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activePage,
  setActivePage,
  favoritesCount,
}) => {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-lg px-2 py-1.5 safe-area-bottom">
      <div className="flex items-center justify-around">
        {/* 🏠 হোম */}
        <button
          id="mobile-nav-home"
          onClick={() => setActivePage('home')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-xs font-medium transition-colors ${
            activePage === 'home' ? 'text-emerald-700' : 'text-gray-500'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">হোম</span>
        </button>

        {/* 🔍 খুঁজুন */}
        <button
          id="mobile-nav-search"
          onClick={() => setActivePage('products')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-xs font-medium transition-colors ${
            activePage === 'products' ? 'text-emerald-700' : 'text-gray-500'
          }`}
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">খুঁজুন</span>
        </button>

        {/* ➕ বিক্রি */}
        <button
          id="mobile-nav-sell"
          onClick={() => setActivePage('sell')}
          className="flex flex-col items-center justify-center -mt-3.5 py-1 px-2.5 transition-transform active:scale-95"
        >
          <div className="w-11 h-11 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md">
            <PlusCircle className="w-6 h-6" />
          </div>
          <span className="text-[11px] font-bold text-amber-700 mt-0.5">বিক্রি</span>
        </button>

        {/* ❤️ পছন্দ */}
        <button
          id="mobile-nav-favorites"
          onClick={() => setActivePage('favorites')}
          className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-xs font-medium transition-colors ${
            activePage === 'favorites' ? 'text-emerald-700' : 'text-gray-500'
          }`}
        >
          <Heart className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">পছন্দ</span>
          {favoritesCount > 0 && (
            <span className="absolute top-1 right-2 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center">
              {favoritesCount}
            </span>
          )}
        </button>

        {/* 👤 অ্যাকাউন্ট */}
        <button
          id="mobile-nav-account"
          onClick={() => setActivePage('account')}
          className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-lg text-xs font-medium transition-colors ${
            activePage === 'account' ? 'text-emerald-700' : 'text-gray-500'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[11px]">অ্যাকাউন্ট</span>
        </button>
      </div>
    </div>
  );
};
