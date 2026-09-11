import React, { useState } from 'react';
import { 
  ShieldAlert, Package, Users, Tag, AlertTriangle, MapPin, 
  Sparkles, Trash2, CheckCircle, XCircle, ArrowLeft, Eye
} from 'lucide-react';
import { Product, ProductReport } from '../types';
import { CATEGORIES, BANGLADESH_LOCATIONS, formatTaka } from '../data/mockData';

interface AdminPanelViewProps {
  products: Product[];
  reports: ProductReport[];
  onToggleFeatured: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
  onResolveReport: (reportId: string) => void;
  onCloseAdmin: () => void;
  onSelectProduct: (p: Product) => void;
}

export const AdminPanelView: React.FC<AdminPanelViewProps> = ({
  products,
  reports,
  onToggleFeatured,
  onDeleteProduct,
  onResolveReport,
  onCloseAdmin,
  onSelectProduct,
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'reports' | 'categories' | 'locations' | 'users'>('products');

  const pendingReports = reports.filter(r => r.status === 'pending');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Warning Banner as requested by security instructions */}
      <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4 mb-6 text-amber-900 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <ShieldAlert className="w-6 h-6 text-amber-600 shrink-0" />
          <div>
            <h2 className="text-sm font-bold flex items-center gap-1.5">
              <span>ডেমো অ্যাডমিন ড্যাশবোর্ড (পরীক্ষামূলক ইন্টারফেস)</span>
              <span className="px-2 py-0.5 rounded bg-amber-200 text-amber-900 text-[10px] uppercase font-bold">
                Demo Only
              </span>
            </h2>
            <p className="text-xs text-amber-800 mt-0.5">
              নিরাপত্তা নীতি অনুযায়ী ফ্রন্টএন্ডে কোনো গোপন পাসওয়ার্ড হার্ডকোড করা হয়নি। এটি কার্যপ্রণালী পরীক্ষার জন্য তৈরি উন্মুক্ত ডেমো ইন্টারফেস।
            </p>
          </div>
        </div>

        <button
          onClick={onCloseAdmin}
          className="px-3.5 py-1.5 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-lg text-xs font-semibold flex items-center gap-1 shrink-0"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>মার্কেটপ্লেসে ফিরুন</span>
        </button>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-gray-500">মোট পণ্য</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">{products.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-gray-500">ফিচার্ড পণ্য</div>
          <div className="text-2xl font-bold text-amber-600 mt-1">
            {products.filter(p => p.isFeatured).length}
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-gray-500">বিচারাধীন রিপোর্ট</div>
          <div className="text-2xl font-bold text-rose-600 mt-1">{pendingReports.length}</div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-xs">
          <div className="text-xs font-semibold text-gray-500">মোট ক্যাটাগরি</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{CATEGORIES.length}</div>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="bg-white rounded-t-2xl border-x border-t border-gray-200 px-4 flex gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('products')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'products'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>পণ্য ব্যবস্থাপনা ({products.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('reports')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'reports'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <AlertTriangle className="w-4 h-4" />
          <span>রিপোর্ট ({reports.length})</span>
          {pendingReports.length > 0 && (
            <span className="w-2 h-2 rounded-full bg-rose-500"></span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('categories')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'categories'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Tag className="w-4 h-4" />
          <span>ক্যাটাগরি সমূহ</span>
        </button>

        <button
          onClick={() => setActiveTab('locations')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'locations'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>লোকেশন ও জেলা</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`py-3.5 px-3 text-xs sm:text-sm font-semibold border-b-2 whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'users'
              ? 'border-emerald-600 text-emerald-700'
              : 'border-transparent text-gray-500 hover:text-gray-900'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>ব্যবহারকারী</span>
        </button>
      </div>

      {/* Tab Panel Body */}
      <div className="bg-white rounded-b-2xl border border-gray-200 p-6 min-h-[450px]">
        
        {/* Products Management */}
        {activeTab === 'products' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-700">
              <thead className="bg-gray-50 text-gray-900 font-bold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-3">পণ্য</th>
                  <th className="py-3 px-3">ক্যাটাগরি</th>
                  <th className="py-3 px-3">দাম</th>
                  <th className="py-3 px-3">অবস্থান</th>
                  <th className="py-3 px-3">অবস্থা</th>
                  <th className="py-3 px-3">ফিচার্ড</th>
                  <th className="py-3 px-3 text-right">অ্যাকশন</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/70">
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2.5">
                        <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                        <span className="font-semibold text-gray-900 line-clamp-1 max-w-[200px]">{p.title}</span>
                      </div>
                    </td>
                    <td className="py-3 px-3">{p.category}</td>
                    <td className="py-3 px-3 font-semibold text-emerald-700">{formatTaka(p.price)}</td>
                    <td className="py-3 px-3">{p.district}</td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] bg-gray-100 font-medium">{p.condition}</span>
                    </td>
                    <td className="py-3 px-3">
                      <button
                        onClick={() => onToggleFeatured(p.id)}
                        className={`px-2 py-1 rounded text-[10px] font-semibold flex items-center gap-1 ${
                          p.isFeatured
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        <Sparkles className="w-3 h-3" />
                        <span>{p.isFeatured ? 'ফিচার্ড অন' : 'সাধারণ'}</span>
                      </button>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onSelectProduct(p)}
                          className="p-1 rounded text-gray-600 hover:text-emerald-700 hover:bg-emerald-50"
                          title="দেখুন"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onDeleteProduct(p.id)}
                          className="p-1 rounded text-rose-500 hover:bg-rose-50"
                          title="বিজ্ঞাপন মুছুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Reports Management */}
        {activeTab === 'reports' && (
          <div className="space-y-3">
            {reports.length === 0 ? (
              <p className="text-xs text-gray-500 text-center py-8">কোনো রিপোর্ট নেই</p>
            ) : (
              reports.map(rep => (
                <div
                  key={rep.id}
                  className="p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-gray-50"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-gray-900">{rep.productTitle}</span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        rep.status === 'pending' ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {rep.status === 'pending' ? 'অমীমাংসিত' : 'সমাধানকৃত'}
                      </span>
                    </div>
                    <p className="text-xs text-gray-700 mt-1">অভিযোগ: {rep.reason}</p>
                    <span className="text-[10px] text-gray-400 mt-1 block">তারিখ: {rep.reportedAt}</span>
                  </div>

                  {rep.status === 'pending' && (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onResolveReport(rep.id)}
                        className="px-3 py-1.5 bg-emerald-600 text-white rounded-lg text-xs font-semibold hover:bg-emerald-700 flex items-center gap-1"
                      >
                        <CheckCircle className="w-3.5 h-3.5" />
                        <span>সমাধান হয়েছে</span>
                      </button>
                      <button
                        onClick={() => onDeleteProduct(rep.productId)}
                        className="px-3 py-1.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-lg text-xs font-semibold hover:bg-rose-100 flex items-center gap-1"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>পণ্য অপসারণ</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        )}

        {/* Categories Overview */}
        {activeTab === 'categories' && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {CATEGORIES.map(c => (
              <div key={c.id} className="p-3 rounded-xl border border-gray-200 text-center">
                <span className="text-2xl block mb-1">{c.emoji}</span>
                <span className="text-xs font-bold text-gray-900 block">{c.name}</span>
                <span className="text-[10px] text-emerald-700 font-semibold">{c.count}টি পণ্য</span>
              </div>
            ))}
          </div>
        )}

        {/* Locations List */}
        {activeTab === 'locations' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BANGLADESH_LOCATIONS.map(div => (
              <div key={div.id} className="p-4 rounded-xl border border-gray-200 bg-gray-50">
                <h4 className="font-bold text-sm text-emerald-800 mb-2">{div.name} বিভাগ</h4>
                <div className="flex flex-wrap gap-1.5">
                  {div.districts.map(dist => (
                    <span key={dist.id} className="text-xs px-2 py-1 bg-white border border-gray-200 rounded-md text-gray-700">
                      {dist.name} ({dist.upazilas.length} উপজেলা)
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Users Management */}
        {activeTab === 'users' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-xl border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                  আ
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">আরিফুল ইসলাম (বর্তমান ব্যবহারকারী)</h4>
                  <p className="text-[11px] text-gray-500">০১৭১১-২২৩৩৪৪ • ঢাকা, মিরপুর</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                সক্রিয়
              </span>
            </div>

            <div className="p-3.5 rounded-xl border border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-xs">
                  তা
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-900">তানভীর আহমেদ (বিক্রেতা)</h4>
                  <p className="text-[11px] text-gray-500">০১৭৫২-XXXXXX • জয়পুরহাট</p>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                সক্রিয়
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
