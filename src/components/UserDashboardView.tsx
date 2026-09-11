import React, { useState } from 'react';
import { 
  User, Package, Heart, CheckCircle2, FileText, Settings, 
  Trash2, Edit3, Eye, Phone, Mail, MapPin, PlusCircle, AlertCircle
} from 'lucide-react';
import { Product, UserProfile } from '../types';
import { formatTaka } from '../data/mockData';

interface UserDashboardViewProps {
  user: UserProfile;
  setUser: React.Dispatch<React.SetStateAction<UserProfile>>;
  myProducts: Product[];
  favoriteProducts: Product[];
  onDeleteProduct: (productId: string) => void;
  onToggleSoldStatus: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onNavigateSell: () => void;
  initialTab?: 'posts' | 'favorites' | 'sold' | 'draft' | 'profile';
}

export const UserDashboardView: React.FC<UserDashboardViewProps> = ({
  user,
  setUser,
  myProducts,
  favoriteProducts,
  onDeleteProduct,
  onToggleSoldStatus,
  onSelectProduct,
  onNavigateSell,
  initialTab = 'posts'
}) => {
  const [activeTab, setActiveTab] = useState<'posts' | 'favorites' | 'sold' | 'draft' | 'profile'>(initialTab);
  
  // Profile edit form state
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [district, setDistrict] = useState(user.district);
  const [upazila, setUpazila] = useState(user.upazila);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Active user listings vs sold listings vs drafts
  const activePosts = myProducts.filter(p => p.status === 'active');
  const soldPosts = myProducts.filter(p => p.status === 'sold');
  const draftPosts = myProducts.filter(p => p.status === 'draft');

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      phone,
      email,
      district,
      upazila
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Banner / User Header */}
      <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-xs mb-6">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-4">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="relative w-16 h-16 rounded-full overflow-hidden bg-emerald-100 border-2 border-emerald-500 shrink-0">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                  যাচাইকৃত সদস্য
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 mt-1 justify-center sm:justify-start">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-gray-400" />
                  {user.phone}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-gray-400" />
                  {user.email}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  {user.district}, {user.division}
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={onNavigateSell}
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center gap-1.5 shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>নতুন পণ্য বিক্রি করুন</span>
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-gray-200 bg-white rounded-t-xl px-4 overflow-x-auto gap-2">
        <button
          onClick={() => setActiveTab('posts')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'posts'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>আমার পোস্ট ({activePosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'favorites'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>পছন্দের পণ্য ({favoriteProducts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('sold')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'sold'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          <span>বিক্রিত পণ্য ({soldPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('draft')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'draft'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>খসড়া ({draftPosts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
            activeTab === 'profile'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>প্রোফাইল সেটিংস</span>
        </button>
      </div>

      {/* Tab Content Body */}
      <div className="bg-white rounded-b-2xl border-x border-b border-gray-200 p-6 min-h-[400px]">
        
        {/* TAB 1: My Posts */}
        {activeTab === 'posts' && (
          <div>
            {activePosts.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Package className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="text-sm font-bold text-gray-800">আপনার কোনো সক্রিয় বিজ্ঞাপন নেই</h3>
                <p className="text-xs text-gray-500">আপনার অপ্রয়োজনীয় পণ্য সহজে বিক্রি করতে বিজ্ঞাপন পোস্ট করুন।</p>
                <button
                  onClick={onNavigateSell}
                  className="mt-2 px-4 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl"
                >
                  বিজ্ঞাপন দিন
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {activePosts.map(p => (
                  <div
                    key={p.id}
                    className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl border border-gray-200 hover:border-gray-300 transition-all bg-gray-50/50"
                  >
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img src={p.image} alt={p.title} className="w-20 h-16 rounded-lg object-cover shrink-0" />
                      <div>
                        <div className="text-sm font-bold text-gray-900 line-clamp-1">{p.title}</div>
                        <div className="text-xs font-semibold text-emerald-700 mt-0.5">{formatTaka(p.price)}</div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {p.category} • {p.district} • {p.postedTime}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                      <button
                        onClick={() => onSelectProduct(p)}
                        className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-700 hover:bg-white flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>দেখুন</span>
                      </button>

                      <button
                        onClick={() => onToggleSoldStatus(p.id)}
                        className="px-3 py-1.5 rounded-lg bg-teal-50 border border-teal-200 text-xs font-medium text-teal-800 hover:bg-teal-100 flex items-center gap-1"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>বিক্রিত হিসেবে চিহ্নিত করুন</span>
                      </button>

                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 border border-transparent hover:border-rose-200"
                        title="বিজ্ঞাপন মুছুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: Favorites */}
        {activeTab === 'favorites' && (
          <div>
            {favoriteProducts.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <Heart className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="text-sm font-bold text-gray-800">আপনার পছন্দের তালিকায় কোনো পণ্য নেই</h3>
                <p className="text-xs text-gray-500">পণ্য দেখার সময় হার্ট আইকনে ক্লিক করে সংরক্ষণ করতে পারবেন।</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {favoriteProducts.map(product => (
                  <div
                    key={product.id}
                    onClick={() => onSelectProduct(product)}
                    className="border border-gray-200 rounded-xl overflow-hidden cursor-pointer hover:shadow-md transition-all group"
                  >
                    <div className="aspect-4/3 relative bg-gray-100">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[11px] font-semibold bg-emerald-600 text-white">
                        {product.condition}
                      </span>
                    </div>
                    <div className="p-3.5">
                      <div className="text-base font-bold text-emerald-700">{formatTaka(product.price)}</div>
                      <h4 className="text-xs font-semibold text-gray-900 line-clamp-1 mt-1 group-hover:text-emerald-700">
                        {product.title}
                      </h4>
                      <p className="text-[11px] text-gray-500 mt-1">{product.district}, {product.division}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Sold items */}
        {activeTab === 'sold' && (
          <div>
            {soldPosts.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <CheckCircle2 className="w-12 h-12 text-gray-300 mx-auto" />
                <h3 className="text-sm font-bold text-gray-800">কোনো বিক্রিত পণ্য নেই</h3>
                <p className="text-xs text-gray-500">আপনার পোস্ট করা পণ্য বিক্রি হলে এই সেকশনে জমা হবে।</p>
              </div>
            ) : (
              <div className="space-y-3">
                {soldPosts.map(p => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-gray-50 opacity-80"
                  >
                    <div className="flex items-center gap-4">
                      <img src={p.image} alt={p.title} className="w-16 h-14 rounded-lg object-cover grayscale" />
                      <div>
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-gray-200 text-gray-700 mb-1">
                          বিক্রিত (SOLD)
                        </span>
                        <div className="text-sm font-bold text-gray-800">{p.title}</div>
                        <div className="text-xs text-emerald-700">{formatTaka(p.price)}</div>
                      </div>
                    </div>

                    <button
                      onClick={() => onToggleSoldStatus(p.id)}
                      className="px-3 py-1.5 text-xs font-medium text-emerald-700 bg-white border border-emerald-300 rounded-lg hover:bg-emerald-50"
                    >
                      পুনরায় সক্রিয় করুন
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Drafts */}
        {activeTab === 'draft' && (
          <div className="text-center py-12 space-y-3">
            <FileText className="w-12 h-12 text-gray-300 mx-auto" />
            <h3 className="text-sm font-bold text-gray-800">কোনো ড্রাফট বা খসড়া নেই</h3>
            <p className="text-xs text-gray-500">অসম্পূর্ণ পোস্ট এখানে ড্রাফট হিসেবে সংরক্ষণ করা থাকে।</p>
          </div>
        )}

        {/* TAB 5: Profile Settings */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="max-w-xl mx-auto space-y-4 py-4">
            {savedSuccess && (
              <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-3 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>আপনার প্রোফাইল তথ্য সফলভাবে সংরক্ষণ করা হয়েছে!</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">পুরো নাম</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">মোবাইল নম্বর</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">ইমেইল ঠিকানা</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">জেলা</label>
                <input
                  type="text"
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">উপজেলা / এলাকা</label>
                <input
                  type="text"
                  value={upazila}
                  onChange={(e) => setUpazila(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs"
              >
                তথ্য আপডেট করুন
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};
