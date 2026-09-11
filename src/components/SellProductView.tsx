import React, { useState } from 'react';
import { UploadCloud, CheckCircle2, Eye, ArrowLeft, Image as ImageIcon, Sparkles, Tag, MapPin, Phone } from 'lucide-react';
import { Product, ProductCondition } from '../types';
import { CATEGORIES, BANGLADESH_LOCATIONS, formatTaka } from '../data/mockData';

interface SellProductViewProps {
  onAddProduct: (newProduct: Omit<Product, 'id' | 'postedTime' | 'viewsCount' | 'status'>) => void;
  onCancel: () => void;
}

export const SellProductView: React.FC<SellProductViewProps> = ({
  onAddProduct,
  onCancel,
}) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0].name);
  const [price, setPrice] = useState('');
  const [condition, setCondition] = useState<ProductCondition>('ব্যবহৃত');
  const [division, setDivision] = useState('ঢাকা');
  const [district, setDistrict] = useState('ঢাকা');
  const [upazila, setUpazila] = useState('মিরপুর');
  const [description, setDescription] = useState('');
  const [contactPhone, setContactPhone] = useState('০১৭১১-XXXXXX');
  const [sellerName, setSellerName] = useState('আরিফুল ইসলাম');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80');
  const [showLivePreview, setShowLivePreview] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // District options based on division
  const currentDivisionObj = BANGLADESH_LOCATIONS.find(d => d.name === division);
  const districtList = currentDivisionObj ? currentDivisionObj.districts : [];
  const currentDistrictObj = districtList.find(d => d.name === district);
  const upazilaList = currentDistrictObj ? currentDistrictObj.upazilas : [];

  const handleDivisionChange = (newDiv: string) => {
    setDivision(newDiv);
    const divObj = BANGLADESH_LOCATIONS.find(d => d.name === newDiv);
    if (divObj && divObj.districts.length > 0) {
      setDistrict(divObj.districts[0].name);
      setUpazila(divObj.districts[0].upazilas[0] || '');
    } else {
      setDistrict('');
      setUpazila('');
    }
  };

  const handleDistrictChange = (newDist: string) => {
    setDistrict(newDist);
    const distObj = districtList.find(d => d.name === newDist);
    if (distObj && distObj.upazilas.length > 0) {
      setUpazila(distObj.upazilas[0]);
    } else {
      setUpazila('');
    }
  };

  // Sample quick images for testing
  const sampleImages = [
    { label: 'ফোন', url: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80' },
    { label: 'ল্যাপটপ', url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80' },
    { label: 'বাইক', url: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80' },
    { label: 'ঘড়ি', url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80' },
    { label: 'ফার্নিচার', url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80' }
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!title.trim()) errs.title = 'পণ্যের নাম লিখুন';
    if (!price || isNaN(Number(price)) || Number(price) <= 0) errs.price = 'সঠিক দাম উল্লেখ করুন';
    if (!description.trim()) errs.description = 'পণ্যের বিস্তারিত বিবরণ দিন';
    if (!contactPhone.trim()) errs.phone = 'যোগাযোগের মোবাইল নম্বর দিন';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onAddProduct({
        title,
        category,
        price: Number(price),
        condition,
        division,
        district,
        upazila,
        description,
        image: imageUrl,
        seller: {
          name: sellerName || 'আরিফুল ইসলাম',
          phone: contactPhone,
          isVerified: true,
          memberSince: 'আজকের তালিকা',
          totalListings: 1
        },
        isFeatured: false
      });
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Top navigation back */}
      <button
        onClick={onCancel}
        className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-emerald-700 mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>পূর্ববর্তী পেজে ফিরে যান</span>
      </button>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Banner Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 px-6 py-6 sm:py-8 text-white">
          <h1 className="text-xl sm:text-2xl font-bold">আপনার পণ্য বিক্রি করুন</h1>
          <p className="text-xs sm:text-sm text-emerald-100 mt-1">
            সঠিক তথ্য দিয়ে দ্রুত আপনার স্থানীয় ক্রেতাদের কাছে বিজ্ঞাপন পৌঁছে দিন
          </p>
        </div>

        {/* Tab Preview Toggle */}
        <div className="flex border-b border-gray-200 bg-gray-50/70 px-6 py-2.5">
          <button
            type="button"
            onClick={() => setShowLivePreview(false)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              !showLivePreview ? 'bg-white text-emerald-700 shadow-xs border border-gray-200' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            ফর্ম পূরণ করুন
          </button>
          <button
            type="button"
            onClick={() => setShowLivePreview(true)}
            className={`px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 ${
              showLivePreview ? 'bg-white text-emerald-700 shadow-xs border border-gray-200' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>লাইভ প্রিভিউ দেখুন</span>
          </button>
        </div>

        {/* Live Preview Mode */}
        {showLivePreview ? (
          <div className="p-6 sm:p-8 space-y-6">
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs px-4 py-3 rounded-xl flex items-center justify-between">
              <span>এটি বিজ্ঞাপনের প্রিভিউ। ক্রেতারা আপনার পণ্যটি যেভাবে দেখবেন:</span>
              <button 
                onClick={() => setShowLivePreview(false)} 
                className="font-bold underline cursor-pointer"
              >
                এডিট করতে ফিরে যান
              </button>
            </div>

            <div className="max-w-md mx-auto bg-white rounded-xl border border-gray-200 overflow-hidden shadow-md">
              <div className="relative aspect-4/3 w-full bg-gray-100">
                <img src={imageUrl} alt="Product Preview" className="w-full h-full object-cover" />
                <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs font-semibold bg-emerald-600 text-white">
                  {condition}
                </span>
              </div>
              <div className="p-4 space-y-2">
                <div className="text-xl font-bold text-emerald-700">
                  {price ? formatTaka(Number(price)) : '৳ ০'}
                </div>
                <h3 className="text-base font-semibold text-gray-900">
                  {title || 'পণ্যের নাম এখানে দেখাবে'}
                </h3>
                <div className="text-xs text-gray-500 flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-gray-400" />
                  <span>{upazila ? `${upazila}, ` : ''}{district}, {division}</span>
                </div>
                <div className="text-xs text-gray-600 pt-2 border-t border-gray-100 line-clamp-3">
                  {description || 'পণ্যের বিস্তারিত বিবরণ এখানে দেখাবে...'}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setShowLivePreview(false)}
                className="px-5 py-2.5 rounded-xl border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                এডিট করুন
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold shadow-xs"
              >
                বিজ্ঞাপন প্রকাশ করুন
              </button>
            </div>
          </div>
        ) : (
          /* Form Mode */
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Image upload section */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                ১. পণ্যের ছবি আপলোড
              </label>
              
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                {/* Image preview box */}
                <div className="sm:col-span-4 relative aspect-4/3 w-full bg-gray-100 rounded-xl overflow-hidden border-2 border-dashed border-gray-300 flex items-center justify-center group">
                  {imageUrl ? (
                    <img src={imageUrl} alt="Selected" className="w-full h-full object-cover" />
                  ) : (
                    <div className="text-center p-3 text-gray-400">
                      <ImageIcon className="w-8 h-8 mx-auto mb-1" />
                      <span className="text-xs">ছবি নির্বাচন করুন</span>
                    </div>
                  )}
                </div>

                {/* Upload controls */}
                <div className="sm:col-span-8 space-y-3">
                  <div className="flex items-center gap-3">
                    <label className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-semibold cursor-pointer transition-colors flex items-center gap-1.5 border border-gray-300">
                      <UploadCloud className="w-4 h-4 text-emerald-600" />
                      <span>ডিভাইস থেকে ছবি নির্বাচন করুন</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleFileUpload}
                        className="hidden" 
                      />
                    </label>
                  </div>

                  <div>
                    <span className="text-[11px] text-gray-500 block mb-1.5 font-medium">
                      অথবা ডেমো ছবি বেছে নিন:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {sampleImages.map((s, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setImageUrl(s.url)}
                          className={`text-xs px-2.5 py-1 rounded-lg border transition-colors ${
                            imageUrl === s.url
                              ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold'
                              : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Basic Info */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                ২. পণ্যের মৌলিক তথ্য
              </label>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  পণ্যের নাম / শিরোনাম <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="যেমন: iPhone 13 128GB Midnight Blue"
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 ${
                    errors.title ? 'border-rose-400 bg-rose-50' : 'border-gray-300'
                  }`}
                />
                {errors.title && <p className="text-xs text-rose-500 mt-1">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Category */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    ক্যাটাগরি <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {CATEGORIES.map(cat => (
                      <option key={cat.id} value={cat.name}>
                        {cat.emoji} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Price */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    দাম (টাকায় ৳) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="যেমন: ৪৫০০০"
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 ${
                      errors.price ? 'border-rose-400 bg-rose-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.price && <p className="text-xs text-rose-500 mt-1">{errors.price}</p>}
                </div>

                {/* Condition */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    পণ্যের অবস্থা <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setCondition('ব্যবহৃত')}
                      className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-colors ${
                        condition === 'ব্যবহৃত'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-600'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      ব্যবহৃত
                    </button>
                    <button
                      type="button"
                      onClick={() => setCondition('নতুন')}
                      className={`flex-1 py-2.5 text-xs font-semibold rounded-xl border transition-colors ${
                        condition === 'নতুন'
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-600'
                          : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      নতুন
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Location Section */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                ৩. অবস্থান ও এলাকা
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Division */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">বিভাগ</label>
                  <select
                    value={division}
                    onChange={(e) => handleDivisionChange(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {BANGLADESH_LOCATIONS.map(div => (
                      <option key={div.id} value={div.name}>{div.name}</option>
                    ))}
                  </select>
                </div>

                {/* District */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">জেলা</label>
                  <select
                    value={district}
                    onChange={(e) => handleDistrictChange(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {districtList.map(dist => (
                      <option key={dist.id} value={dist.name}>{dist.name}</option>
                    ))}
                  </select>
                </div>

                {/* Upazila */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">উপজেলা / থানা</label>
                  <select
                    value={upazila}
                    onChange={(e) => setUpazila(e.target.value)}
                    className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 bg-white"
                  >
                    {upazilaList.map((upa, idx) => (
                      <option key={idx} value={upa}>{upa}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Description & Contact Details */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
                ৪. বিস্তারিত বিবরণ ও যোগাযোগ
              </label>

              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  বিস্তারিত বিবরণ <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="পণ্যের অবস্থা, কোনো সমস্যা আছে কিনা, সাথে কি কি দেওয়া হবে ইত্যাদি বিস্তারিত লিখুন..."
                  className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 ${
                    errors.description ? 'border-rose-400 bg-rose-50' : 'border-gray-300'
                  }`}
                />
                {errors.description && <p className="text-xs text-rose-500 mt-1">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    আপনার নাম
                  </label>
                  <input
                    type="text"
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder="আপনার পুরো নাম"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    মোবাইল নম্বর <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="০১৭১১-XXXXXX"
                    className={`w-full px-3.5 py-2.5 border rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 ${
                      errors.phone ? 'border-rose-400 bg-rose-50' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="text-xs text-rose-500 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Submit Bar */}
            <div className="pt-6 border-t border-gray-200 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowLivePreview(true)}
                className="px-4 py-2.5 rounded-xl border border-gray-300 text-xs sm:text-sm font-medium text-gray-700 hover:bg-gray-50 flex items-center gap-1.5"
              >
                <Eye className="w-4 h-4 text-gray-500" />
                <span>প্রিভিউ দেখুন</span>
              </button>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  বাতিল
                </button>
                <button
                  id="btn-submit-post"
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-xs disabled:opacity-50 flex items-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>পোস্ট হচ্ছে...</span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-4 h-4" />
                      <span>পণ্য পোস্ট করুন</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
