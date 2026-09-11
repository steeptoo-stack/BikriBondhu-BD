export type ProductCondition = 'নতুন' | 'ব্যবহৃত';

export type ProductStatus = 'active' | 'sold' | 'draft' | 'pending';

export interface SellerInfo {
  name: string;
  phone: string;
  isVerified: boolean;
  memberSince: string;
  totalListings?: number;
}

export interface Product {
  id: string;
  title: string;
  price: number;
  category: string;
  condition: ProductCondition;
  division: string;
  district: string;
  upazila: string;
  postedTime: string;
  description: string;
  image: string;
  additionalImages?: string[];
  seller: SellerInfo;
  isFeatured?: boolean;
  status: ProductStatus;
  viewsCount: number;
}

export interface Category {
  id: string;
  name: string;
  emoji: string;
  slug: string;
  count: number;
  bgLight: string;
}

export interface DistrictLocation {
  id: string;
  name: string;
  upazilas: string[];
}

export interface DivisionLocation {
  id: string;
  name: string;
  districts: DistrictLocation[];
}

export interface UserProfile {
  id: string;
  name: string;
  phone: string;
  email: string;
  division: string;
  district: string;
  upazila: string;
  joinedDate: string;
  avatar: string;
}

export interface ProductReport {
  id: string;
  productId: string;
  productTitle: string;
  reason: string;
  reportedAt: string;
  status: 'pending' | 'resolved' | 'dismissed';
}

export type ActivePage = 
  | 'home' 
  | 'products' 
  | 'details' 
  | 'sell' 
  | 'my-posts' 
  | 'favorites' 
  | 'account' 
  | 'admin';

export interface FilterState {
  searchQuery: string;
  category: string;
  division: string;
  district: string;
  condition: 'all' | 'নতুন' | 'ব্যবহৃত';
  minPrice: string;
  maxPrice: string;
  sortBy: 'newest' | 'price-asc' | 'price-desc';
}
