import React from 'react';
import { CATEGORIES } from '../data/mockData';

interface CategoryListProps {
  selectedCategory: string;
  onSelectCategory: (categoryName: string) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">ক্যাটাগরি সমূহ</h2>
          <p className="text-xs text-gray-500 mt-0.5">আপনার পছন্দের ক্যাটাগরি বেছে নিয়ে পণ্য দেখুন</p>
        </div>
        {selectedCategory && (
          <button
            onClick={() => onSelectCategory('')}
            className="text-xs font-medium text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md transition-colors"
          >
            সব ক্যাটাগরি দেখুন
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-2.5 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.name;
          return (
            <button
              key={cat.id}
              id={`cat-btn-${cat.slug}`}
              onClick={() => onSelectCategory(isSelected ? '' : cat.name)}
              className={`flex flex-col items-center justify-center p-3 sm:p-3.5 rounded-xl border text-center transition-all cursor-pointer group ${
                isSelected
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm scale-102'
                  : 'bg-white hover:bg-gray-50/80 border-gray-200 text-gray-800 hover:border-gray-300 hover:shadow-xs'
              }`}
            >
              <span className="text-2xl sm:text-3xl mb-1.5 transition-transform group-hover:scale-110">
                {cat.emoji}
              </span>
              <span className={`text-xs font-semibold line-clamp-1 ${isSelected ? 'text-white' : 'text-gray-900'}`}>
                {cat.name}
              </span>
              <span className={`text-[10px] mt-0.5 ${isSelected ? 'text-emerald-100' : 'text-gray-400'}`}>
                {cat.count}টি পণ্য
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
