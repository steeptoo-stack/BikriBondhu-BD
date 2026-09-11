import React from 'react';
import { MapPin, Clock, Heart, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { formatTaka } from '../data/mockData';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isFavorite,
  onToggleFavorite,
  onSelectProduct,
}) => {
  const [imgSrc, setImgSrc] = React.useState(product.image);
  const [imgError, setImgError] = React.useState(false);

  // Fallback SVG image in case network image cannot be retrieved
  const fallbackSvg = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300" fill="%23f1f5f9"><rect width="400" height="300" fill="%23f3f4f6"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="18" fill="%239ca3af">${encodeURIComponent(product.category)}</text></svg>`;

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onSelectProduct(product)}
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200 flex flex-col cursor-pointer"
    >
      {/* Product Image Box */}
      <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
        <img
          src={imgError ? fallbackSvg : imgSrc}
          alt={product.title}
          loading="lazy"
          onError={() => {
            if (!imgError) {
              setImgError(true);
              setImgSrc(fallbackSvg);
            }
          }}
          className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-300"
        />

        {/* Condition Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
          <span
            className={`px-2 py-0.5 rounded-md text-[11px] font-semibold tracking-wide ${
              product.condition === 'নতুন'
                ? 'bg-emerald-600 text-white'
                : 'bg-gray-900/80 text-white backdrop-blur-xs'
            }`}
          >
            {product.condition}
          </span>
          {product.isFeatured && (
            <span className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-500 text-white shadow-xs">
              <Sparkles className="w-3 h-3" />
              <span>ফিচার্ড</span>
            </span>
          )}
        </div>

        {/* Favorite Heart Button */}
        <button
          type="button"
          id={`fav-btn-${product.id}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-xs transition-transform active:scale-90 ${
            isFavorite
              ? 'bg-white text-rose-500 shadow-sm'
              : 'bg-white/80 text-gray-600 hover:text-rose-500 hover:bg-white'
          }`}
          aria-label="পছন্দের তালিকায় রাখুন"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Product Information */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Price */}
          <div className="text-lg sm:text-xl font-bold text-emerald-700 tracking-tight mb-1">
            {formatTaka(product.price)}
          </div>

          {/* Title */}
          <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-emerald-700 transition-colors">
            {product.title}
          </h3>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-100 flex flex-col gap-2">
          {/* Location & Time */}
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-1 line-clamp-1">
              <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{product.district}, {product.division}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span>{product.postedTime}</span>
            </div>
          </div>

          {/* View Details Button */}
          <button
            type="button"
            className="w-full mt-1 py-1.5 px-3 rounded-lg text-xs font-medium text-emerald-700 bg-emerald-50 hover:bg-emerald-100 transition-colors flex items-center justify-center gap-1"
          >
            <span>বিস্তারিত দেখুন</span>
          </button>
        </div>
      </div>
    </div>
  );
};
