import React from 'react';
import { Filter, SlidersHorizontal, ArrowUpDown, X, RotateCcw } from 'lucide-react';
import { Product, FilterState } from '../types';
import { CATEGORIES, BANGLADESH_LOCATIONS } from '../data/mockData';
import { ProductCard } from './ProductCard';

interface SearchFilterViewProps {
  products: Product[];
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectProduct: (p: Product) => void;
}

export const SearchFilterView: React.FC<SearchFilterViewProps> = ({
  products,
  filters,
  setFilters,
  favorites,
  onToggleFavorite,
  onSelectProduct,
}) => {
  const [mobileFilterOpen, setMobileFilterOpen] = React.useState(false);

  // Selected division object for district dropdown
  const currentDivObj = BANGLADESH_LOCATIONS.find(d => d.name === filters.division);
  const districtList = currentDivObj ? currentDivObj.districts : [];

  const handleResetFilters = () => {
    setFilters({
      searchQuery: '',
      category: '',
      division: '',
      district: '',
      condition: 'all',
      minPrice: '',
      maxPrice: '',
      sortBy: 'newest'
    });
  };

  const hasActiveFilters = 
    Boolean(filters.searchQuery || filters.category || filters.division || filters.district || filters.condition !== 'all' || filters.minPrice || filters.maxPrice);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-gray-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            {filters.category ? `${filters.category} - পণ্য সমূহ` : 'সকল পণ্য সমূহ'}
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            মোট <span className="font-semibold text-emerald-700">{products.length}</span> টি বিজ্ঞাপন পাওয়া গেছে
          </p>
        </div>

        {/* Sorting and Mobile Filter Trigger */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-between sm:justify-end">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
            className="lg:hidden px-3 py-2 rounded-xl border border-gray-300 text-xs font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
            <span>ফিল্টার</span>
            {hasActiveFilters && (
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
            )}
          </button>

          {/* Sort Selector */}
          <div className="flex items-center gap-1.5 text-xs text-gray-700">
            <ArrowUpDown className="w-3.5 h-3.5 text-gray-400" />
            <span className="hidden sm:inline">সাজান:</span>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters(prev => ({ ...prev, sortBy: e.target.value as any }))}
              className="bg-white border border-gray-300 rounded-lg px-2.5 py-1.5 text-xs font-medium text-gray-800 focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
            >
              <option value="newest">সর্বাধুনিক</option>
              <option value="price-asc">কম দাম থেকে বেশি</option>
              <option value="price-desc">বেশি দাম থেকে কম</option>
            </select>
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex items-center gap-2 flex-wrap pt-3 pb-1">
          <span className="text-xs text-gray-500 font-medium">সক্রিয় ফিল্টার:</span>
          {filters.searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
              কীওয়ার্ড: {filters.searchQuery}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-emerald-900" 
                onClick={() => setFilters(prev => ({ ...prev, searchQuery: '' }))} 
              />
            </span>
          )}
          {filters.category && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
              {filters.category}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-emerald-900" 
                onClick={() => setFilters(prev => ({ ...prev, category: '' }))} 
              />
            </span>
          )}
          {filters.division && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
              {filters.division}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-emerald-900" 
                onClick={() => setFilters(prev => ({ ...prev, division: '', district: '' }))} 
              />
            </span>
          )}
          {filters.district && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
              {filters.district}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-emerald-900" 
                onClick={() => setFilters(prev => ({ ...prev, district: '' }))} 
              />
            </span>
          )}
          {filters.condition !== 'all' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
              {filters.condition}
              <X 
                className="w-3 h-3 cursor-pointer hover:text-emerald-900" 
                onClick={() => setFilters(prev => ({ ...prev, condition: 'all' }))} 
              />
            </span>
          )}
          {(filters.minPrice || filters.maxPrice) && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs bg-emerald-50 text-emerald-700 border border-emerald-200">
              দাম: {filters.minPrice || '০'} - {filters.maxPrice || 'সর্বোচ্চ'} ৳
              <X 
                className="w-3 h-3 cursor-pointer hover:text-emerald-900" 
                onClick={() => setFilters(prev => ({ ...prev, minPrice: '', maxPrice: '' }))} 
              />
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs text-rose-600 hover:text-rose-700 flex items-center gap-1 ml-1 cursor-pointer font-medium"
          >
            <RotateCcw className="w-3 h-3" />
            <span>ফিল্টার রিসেট</span>
          </button>
        </div>
      )}

      {/* Main Grid: Left Filter Sidebar + Right Products List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-4">
        
        {/* Filter Sidebar (Desktop and Mobile collapsible) */}
        <div className={`lg:block ${mobileFilterOpen ? 'block' : 'hidden'} lg:col-span-1`}>
          <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-6 shadow-xs sticky top-22">
            
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <div className="flex items-center gap-2 text-gray-900 font-bold text-sm">
                <Filter className="w-4 h-4 text-emerald-600" />
                <span>ফিল্টার অপশন</span>
              </div>
              {hasActiveFilters && (
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-emerald-700 hover:underline"
                >
                  সব মুছুন
                </button>
              )}
            </div>

            {/* Category Filter */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                ক্যাটাগরি
              </label>
              <div className="space-y-1 max-h-48 overflow-y-auto pr-1">
                <label className="flex items-center gap-2 text-xs text-gray-700 hover:text-emerald-700 cursor-pointer py-0.5">
                  <input
                    type="radio"
                    name="category-filter"
                    checked={!filters.category}
                    onChange={() => setFilters(prev => ({ ...prev, category: '' }))}
                    className="text-emerald-600 focus:ring-emerald-500"
                  />
                  <span>সকল ক্যাটাগরি</span>
                </label>
                {CATEGORIES.map(cat => (
                  <label key={cat.id} className="flex items-center justify-between text-xs text-gray-700 hover:text-emerald-700 cursor-pointer py-0.5">
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="category-filter"
                        checked={filters.category === cat.name}
                        onChange={() => setFilters(prev => ({ ...prev, category: cat.name }))}
                        className="text-emerald-600 focus:ring-emerald-500"
                      />
                      <span>{cat.emoji} {cat.name}</span>
                    </div>
                    <span className="text-[10px] text-gray-400">{cat.count}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div className="pt-3 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                লোকেশন / এলাকা
              </label>
              
              <div className="space-y-2">
                <div>
                  <select
                    value={filters.division}
                    onChange={(e) => setFilters(prev => ({ ...prev, division: e.target.value, district: '' }))}
                    className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white"
                  >
                    <option value="">সকল বিভাগ</option>
                    {BANGLADESH_LOCATIONS.map(d => (
                      <option key={d.id} value={d.name}>{d.name}</option>
                    ))}
                  </select>
                </div>

                {filters.division && (
                  <div>
                    <select
                      value={filters.district}
                      onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
                      className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white"
                    >
                      <option value="">সকল জেলা ({filters.division})</option>
                      {districtList.map(dist => (
                        <option key={dist.id} value={dist.name}>{dist.name}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>

            {/* Condition Filter */}
            <div className="pt-3 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                পণ্যের অবস্থা
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, condition: 'all' }))}
                  className={`flex-1 py-1.5 text-xs rounded-lg border font-medium ${
                    filters.condition === 'all'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  সব
                </button>
                <button
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, condition: 'নতুন' }))}
                  className={`flex-1 py-1.5 text-xs rounded-lg border font-medium ${
                    filters.condition === 'নতুন'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  নতুন
                </button>
                <button
                  type="button"
                  onClick={() => setFilters(prev => ({ ...prev, condition: 'ব্যবহৃত' }))}
                  className={`flex-1 py-1.5 text-xs rounded-lg border font-medium ${
                    filters.condition === 'ব্যবহৃত'
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  ব্যবহৃত
                </button>
              </div>
            </div>

            {/* Price Range */}
            <div className="pt-3 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                দামের পরিসীমা (৳)
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder="সর্বনিম্ন"
                  value={filters.minPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                  className="w-full text-xs px-2.5 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white"
                />
                <input
                  type="number"
                  placeholder="সর্বোচ্চ"
                  value={filters.maxPrice}
                  onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                  className="w-full text-xs px-2.5 py-2 border border-gray-200 rounded-lg bg-gray-50 focus:bg-white"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Product Cards Grid (3 cols on desktop) */}
        <div className="lg:col-span-3">
          {products.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                🔍
              </div>
              <h3 className="text-base font-bold text-gray-900">কোনো পণ্য পাওয়া যায়নি</h3>
              <p className="text-xs text-gray-500 max-w-sm mx-auto">
                আপনার অনুসন্ধানের সাথে মেলে এমন কোনো বিজ্ঞাপন পাওয়া যায়নি। ফিল্টার পরিবর্তন করে পুনরায় চেষ্টা করুন।
              </p>
              <button
                onClick={handleResetFilters}
                className="mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700"
              >
                ফিল্টার রিসেট করুন
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={onToggleFavorite}
                  onSelectProduct={onSelectProduct}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
