import React from 'react';
import { Search, MapPin, Grid, ArrowRight } from 'lucide-react';
import { CATEGORIES, BANGLADESH_LOCATIONS } from '../data/mockData';
import { FilterState } from '../types';

interface SearchBarProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  onSearchSubmit: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  filters,
  setFilters,
  onSearchSubmit,
}) => {
  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newDivision = e.target.value;
    setFilters(prev => ({
      ...prev,
      division: newDivision,
      district: '' // reset district when division changes
    }));
  };

  const selectedDivisionObj = BANGLADESH_LOCATIONS.find(d => d.name === filters.division);
  const districtList = selectedDivisionObj ? selectedDivisionObj.districts : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-md border border-gray-200/80 p-3 sm:p-4">
      <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-stretch gap-3">
        {/* Keyword Search Input */}
        <div className="flex-1 relative flex items-center">
          <Search className="w-5 h-5 text-gray-400 absolute left-3.5 pointer-events-none" />
          <input
            id="search-keyword-input"
            type="text"
            value={filters.searchQuery}
            onChange={(e) => setFilters(prev => ({ ...prev, searchQuery: e.target.value }))}
            placeholder="আপনি কী খুঁজছেন? (যেমন: iPhone 13, বাইক, ল্যাপটপ...)"
            className="w-full pl-11 pr-4 py-3 bg-gray-50 hover:bg-gray-100/70 focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Category Selector */}
        <div className="w-full lg:w-48 relative flex items-center">
          <Grid className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
          <select
            id="search-category-select"
            value={filters.category}
            onChange={(e) => setFilters(prev => ({ ...prev, category: e.target.value }))}
            className="w-full pl-9 pr-8 py-3 bg-gray-50 hover:bg-gray-100/70 focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer appearance-none"
          >
            <option value="">সকল ক্যাটাগরি</option>
            {CATEGORIES.map(cat => (
              <option key={cat.id} value={cat.name}>
                {cat.emoji} {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Division Selector */}
        <div className="w-full lg:w-44 relative flex items-center">
          <MapPin className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
          <select
            id="search-division-select"
            value={filters.division}
            onChange={handleDivisionChange}
            className="w-full pl-9 pr-8 py-3 bg-gray-50 hover:bg-gray-100/70 focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer appearance-none"
          >
            <option value="">সকল বিভাগ</option>
            {BANGLADESH_LOCATIONS.map(div => (
              <option key={div.id} value={div.name}>
                {div.name}
              </option>
            ))}
          </select>
        </div>

        {/* District Selector (if division selected) */}
        {filters.division && (
          <div className="w-full lg:w-40 relative flex items-center">
            <select
              id="search-district-select"
              value={filters.district}
              onChange={(e) => setFilters(prev => ({ ...prev, district: e.target.value }))}
              className="w-full px-3 py-3 bg-gray-50 hover:bg-gray-100/70 focus:bg-white border border-gray-200 rounded-xl text-sm text-gray-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-transparent cursor-pointer"
            >
              <option value="">সব জেলা</option>
              {districtList.map(dist => (
                <option key={dist.id} value={dist.name}>
                  {dist.name}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Search Submit Button */}
        <button
          id="search-submit-btn"
          type="submit"
          className="w-full lg:w-auto px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
        >
          <span>খুঁজুন</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
