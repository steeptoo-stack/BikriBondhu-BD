import { Category, DivisionLocation, Product, UserProfile, ProductReport } from '../types';

export const CATEGORIES: Category[] = [
  { id: 'c1', name: 'মোবাইল', emoji: '📱', slug: 'mobile', count: 184, bgLight: 'bg-blue-50 text-blue-700 border-blue-200' },
  { id: 'c2', name: 'কম্পিউটার', emoji: '💻', slug: 'computer', count: 96, bgLight: 'bg-indigo-50 text-indigo-700 border-indigo-200' },
  { id: 'c3', name: 'বাইক', emoji: '🏍️', slug: 'bike', count: 72, bgLight: 'bg-amber-50 text-amber-700 border-amber-200' },
  { id: 'c4', name: 'গাড়ি', emoji: '🚗', slug: 'car', count: 48, bgLight: 'bg-emerald-50 text-emerald-700 border-emerald-200' },
  { id: 'c5', name: 'বাসা ও জমি', emoji: '🏠', slug: 'property', count: 65, bgLight: 'bg-teal-50 text-teal-700 border-teal-200' },
  { id: 'c6', name: 'ইলেকট্রনিক্স', emoji: '📺', slug: 'electronics', count: 112, bgLight: 'bg-violet-50 text-violet-700 border-violet-200' },
  { id: 'c7', name: 'আসবাবপত্র', emoji: '🪑', slug: 'furniture', count: 54, bgLight: 'bg-orange-50 text-orange-700 border-orange-200' },
  { id: 'c8', name: 'পোশাক', emoji: '👕', slug: 'clothing', count: 130, bgLight: 'bg-rose-50 text-rose-700 border-rose-200' },
  { id: 'c9', name: 'বই', emoji: '📚', slug: 'books', count: 42, bgLight: 'bg-sky-50 text-sky-700 border-sky-200' },
  { id: 'c10', name: 'অন্যান্য', emoji: '🔧', slug: 'others', count: 38, bgLight: 'bg-slate-50 text-slate-700 border-slate-200' },
];

export const BANGLADESH_LOCATIONS: DivisionLocation[] = [
  {
    id: 'rajshahi',
    name: 'রাজশাহী',
    districts: [
      { id: 'joypurhat', name: 'জয়পুরহাট', upazilas: ['জয়পুরহাট সদর', 'পাঁচবিবি', 'কালাই', 'ক্ষেতলাল', 'আক্কেলপুর'] },
      { id: 'bogura', name: 'বগুড়া', upazilas: ['বগুড়া সদর', 'শেরপুর', 'শিবগঞ্জ', 'দুপচাঁচিয়া', 'আদমদীঘি', 'গাবতলী'] },
      { id: 'rajshahi_dist', name: 'রাজশাহী', upazilas: ['বোয়ালিয়া', 'মতিহার', 'রাজপাড়া', 'পবা', 'বাঘা', 'গোদাগাড়ী'] },
      { id: 'pabna', name: 'পাবনা', upazilas: ['পাবনা সদর', 'ঈশ্বরদী', 'সাঁথিয়া', 'সুজানগর'] },
      { id: 'naogaon', name: 'নওগাঁ', upazilas: ['নওগাঁ সদর', 'পত্নীতলা', 'মহাদেবপুর', 'ধামইরহাট'] },
    ]
  },
  {
    id: 'dhaka',
    name: 'ঢাকা',
    districts: [
      { id: 'dhaka_dist', name: 'ঢাকা', upazilas: ['মিরপুর', 'ধানমন্ডি', 'উত্তরা', 'গুলশান', 'মোহাম্মদপুর', 'যাত্রাবাড়ী', 'সাভার'] },
      { id: 'gazipur', name: 'গাজীপুর', upazilas: ['গাজীপুর সদর', 'টঙ্গী', 'কালিয়াকৈর', 'শ্রীপুর'] },
      { id: 'narayanganj', name: 'নারায়ণগঞ্জ', upazilas: ['নারায়ণগঞ্জ সদর', 'সিদ্ধিরগঞ্জ', 'রূপগঞ্জ', 'সোনারগাঁও'] },
      { id: 'tangail', name: 'টাঙ্গাইল', upazilas: ['টাঙ্গাইল সদর', 'মির্জাপুর', 'মধুপুর'] },
    ]
  },
  {
    id: 'chattogram',
    name: 'চট্টগ্রাম',
    districts: [
      { id: 'chattogram_dist', name: 'চট্টগ্রাম', upazilas: ['কোতোয়ালী', 'পাঁচলাইশ', 'হালিশহর', 'খুলশী', 'পটিয়া', 'হাটহাজারী'] },
      { id: 'coxsbazar', name: 'কক্সবাজার', upazilas: ['কক্সবাজার সদর', 'রামু', 'টেকনাফ', 'চকরিয়া'] },
      { id: 'cumilla', name: 'কুমিল্লা', upazilas: ['কুমিল্লা আদর্শ সদর', 'চৌদ্দগ্রাম', 'লাকসাম', 'দাউদকান্দি'] },
    ]
  },
  {
    id: 'khulna',
    name: 'খুলনা',
    districts: [
      { id: 'khulna_dist', name: 'খুলনা', upazilas: ['খুলনা সদর', 'সোনাডাঙ্গা', 'খালিশপুর', 'দাকোপ'] },
      { id: 'jashore', name: 'যশোর', upazilas: ['যশোর সদর', 'বেনাপোল', 'ঝিকরগাছা', 'অভয়নগর'] },
      { id: 'kushtia', name: 'কুষ্টিয়া', upazilas: ['কুষ্টিয়া সদর', 'ভেড়ামারা', 'কুমারখালী'] },
    ]
  },
  {
    id: 'rangpur',
    name: 'রংপুর',
    districts: [
      { id: 'rangpur_dist', name: 'রংপুর', upazilas: ['রংপুর সদর', 'মিঠাপুকুর', 'পীরগঞ্জ', 'বদরগঞ্জ'] },
      { id: 'dinajpur', name: 'দিনাজপুর', upazilas: ['দিনাজপুর সদর', 'বীরগঞ্জ', 'পার্বতীপুর'] },
    ]
  },
  {
    id: 'sylhet',
    name: 'সিলেট',
    districts: [
      { id: 'sylhet_dist', name: 'সিলেট', upazilas: ['সিলেট সদর', 'দক্ষিণ সুরমা', 'গোলাপগঞ্জ', 'বিয়ানীবাজার'] },
      { id: 'moulvibazar', name: 'মৌলভীবাজার', upazilas: ['মৌলভীবাজার সদর', 'শ্রীমঙ্গল', 'কুলাউড়া'] },
    ]
  },
  {
    id: 'barishal',
    name: 'বরিশাল',
    districts: [
      { id: 'barishal_dist', name: 'বরিশাল', upazilas: ['বরিশাল সদর', 'বাবুগঞ্জ', 'গৌরনদী', 'বাকেরগঞ্জ'] },
      { id: 'patuakhali', name: 'পটুয়াখালী', upazilas: ['পটুয়াখালী সদর', 'কলাপাড়া', 'কুয়াকাটা'] },
    ]
  },
  {
    id: 'mymensingh',
    name: 'ময়মনসিংহ',
    districts: [
      { id: 'mymensingh_dist', name: 'ময়মনসিংহ', upazilas: ['ময়মনসিংহ সদর', 'ত্রিশাল', 'মুক্তাগাছা', 'ভালুকা'] },
      { id: 'jamalpur', name: 'জামালপুর', upazilas: ['জামালপুর সদর', 'সরিষাবাড়ী', 'ইসলামপুর'] },
    ]
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'iPhone 13 128GB - ফুল বক্স সহ ফ্রেশ কন্ডিশন',
    price: 45000,
    category: 'মোবাইল',
    condition: 'ব্যবহৃত',
    division: 'রাজশাহী',
    district: 'জয়পুরহাট',
    upazila: 'জয়পুরহাট সদর',
    postedTime: '১০ মিনিট আগে',
    description: 'iPhone 13 128GB Midnight Blue কালার। ব্যাটারি হেলথ ৮৭%। সাথে আসল বক্স, ক্যাবল ও মেমো দেওয়া হবে। ফোনে বিন্দুমাত্র দাগ বা ডেন্ট নেই। ক্যামেরা ও ফেস আইডি ১০০% ওকে। ব্যক্তিগত প্রয়োজনে বিক্রি করছি। জয়পুরহাট সদর এলাকায় এসে দেখে নিতে পারবেন।',
    image: 'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=800&q=80'
    ],
    seller: {
      name: 'তানভীর আহমেদ',
      phone: '০১৭৫২-XXXXXX',
      isVerified: true,
      memberSince: 'জানুয়ারি ২০২৪',
      totalListings: 4
    },
    isFeatured: true,
    status: 'active',
    viewsCount: 245
  },
  {
    id: 'p2',
    title: 'Yamaha FZS V3 Dual Channel ABS (Matt Black)',
    price: 185000,
    category: 'বাইক',
    condition: 'ব্যবহৃত',
    division: 'ঢাকা',
    district: 'ঢাকা',
    upazila: 'মিরপুর',
    postedTime: '২৫ মিনিট আগে',
    description: '২০২৩ সালের মডেল, মাত্র ১৪,২০০ কিমি রান করেছে। ডুয়াল চ্যানেল এবিএস ভার্সন। ডিজিটাল স্মার্ট কার্ড, মিরপুর বিআরটিএ রেজিস্ট্রেশন করা। ফার্স্ট পার্টি মালিক, যেকোনো সময় নাম পরিবর্তন সম্ভব। ইঞ্জিনের সাউন্ড একেবারে নতুন।',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80',
    additionalImages: [
      'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=800&q=80'
    ],
    seller: {
      name: 'রাশেদ করিম',
      phone: '০১৮১৬-XXXXXX',
      isVerified: true,
      memberSince: 'নভেম্বর ২০২৩',
      totalListings: 2
    },
    isFeatured: true,
    status: 'active',
    viewsCount: 380
  },
  {
    id: 'p3',
    title: 'MacBook Air M1 (2020) 8GB / 256GB Space Gray',
    price: 62000,
    category: 'কম্পিউটার',
    condition: 'ব্যবহৃত',
    division: 'রাজশাহী',
    district: 'রাজশাহী',
    upazila: 'বোয়ালিয়া',
    postedTime: '১ ঘণ্টা আগে',
    description: 'অ্যাপল এম১ চিপসেট ম্যাকবুক এয়ার। ব্যাটারি সাইকেল কাউন্ট ১৪৫, হেলথ ৯৪%। শুধুমাত্র অফিসিয়াল কোডিং ও গ্রাফিক্সের কাজে ব্যবহৃত হয়েছে। সাথে জেনুইন ৩০ ওয়াট অ্যাপল অ্যাডাপ্টার ও ইউএসবি সি কেবল রয়েছে।',
    image: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&w=800&q=80',
    seller: {
      name: 'সোহানুর রহমান',
      phone: '০১৭২১-XXXXXX',
      isVerified: true,
      memberSince: 'মার্চ ২০২৪',
      totalListings: 5
    },
    isFeatured: false,
    status: 'active',
    viewsCount: 190
  },
  {
    id: 'p4',
    title: 'Toyota Corolla Axio 2016 (Non-Hybrid) সুপারিও কন্ডিশন',
    price: 1450000,
    category: 'গাড়ি',
    condition: 'ব্যবহৃত',
    division: 'চট্টগ্রাম',
    district: 'চট্টগ্রাম',
    upazila: 'পাঁচলাইশ',
    postedTime: '২ ঘণ্টা আগে',
    description: 'টয়োটা এক্সিও ২০১৬ মডেল, ২০১৯ রেজিস্ট্রেশন। পার্ল হোয়াইট কালার, পেপার্স ২০২৬ পর্যন্ত আপ-টু-ডেট। কোনো এক্সিডেন্ট হিস্ট্রি নেই। অল অটো, পুশ স্টার্ট ও রিভার্স ক্যামেরা যুক্ত। ফ্যামিলি ইউজড কার।',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    seller: {
      name: 'ইমরান চৌধুরী',
      phone: '০১৮১৯-XXXXXX',
      isVerified: true,
      memberSince: 'আগস্ট ২০২২',
      totalListings: 1
    },
    isFeatured: true,
    status: 'active',
    viewsCount: 512
  },
  {
    id: 'p5',
    title: 'বগুড়া শহরের কাছে ৩ শতক নিষ্কন্টক আবাসিক প্লট জমি',
    price: 1200000,
    category: 'বাসা ও জমি',
    condition: 'নতুন',
    division: 'রাজশাহী',
    district: 'বগুড়া',
    upazila: 'বগুড়া সদর',
    postedTime: '৩ ঘণ্টা আগে',
    description: 'বগুড়া সদরের মাটিডালি সংলগ্ন সুশৃঙ্খল আবাসিক প্লট। গ্যাস, বিদ্যুৎ ও পানির লাইন সুবিধা রয়েছে। ১৫ ফিট প্রশস্ত রাস্তা। খারিজ করা পরিষ্কার দলিল। জরুরি প্রয়োজনে সরাসরি মালিক কর্তৃক বিক্রয়।',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=800&q=80',
    seller: {
      name: 'হাজী মতিউর রহমান',
      phone: '০১৭৫১-XXXXXX',
      isVerified: true,
      memberSince: 'মে ২০২৩',
      totalListings: 3
    },
    isFeatured: false,
    status: 'active',
    viewsCount: 420
  },
  {
    id: 'p6',
    title: 'Sony Bravia 43 inch 4K Ultra HD Smart Google TV',
    price: 33500,
    category: 'ইলেকট্রনিক্স',
    condition: 'ব্যবহৃত',
    division: 'খুলনা',
    district: 'খুলনা',
    upazila: 'সোনাডাঙ্গা',
    postedTime: '৪ ঘণ্টা আগে',
    description: 'অরিজিনাল সনি ব্রাভিয়া ৪৩ ইঞ্চি ফোর-কে স্মার্ট টিভি। ইউটিউব, নেটফ্লিক্স স্মুথ চলে। চমৎকার সাউন্ড ও কালার এক্যুরেসি। মাত্র ৮ মাস ব্যবহার করা হয়েছে, কোনো ইন্টারনাল সমস্যা নেই।',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=800&q=80',
    seller: {
      name: 'আসাদুজ্জামান অপু',
      phone: '০১৯১১-XXXXXX',
      isVerified: false,
      memberSince: 'ডিসেম্বর ২০২৪',
      totalListings: 1
    },
    isFeatured: false,
    status: 'active',
    viewsCount: 168
  },
  {
    id: 'p7',
    title: 'সেগুন কাঠের ৬ সিটার লাক্সারি ডাইনিং টেবিল সেট',
    price: 28000,
    category: 'আসবাবপত্র',
    condition: 'নতুন',
    division: 'সিলেট',
    district: 'সিলেট',
    upazila: 'সিলেট সদর',
    postedTime: '৫ ঘণ্টা আগে',
    description: '১০০% চট্টগ্রাম পাহাড়ী অরিজিনাল সেগুন কাঠের ডাইনিং টেবিল এবং ৬টি আরামদায়ক চেয়ার। ১০ মিমি টেম্পার্ড গ্লাস টপ সহ চমৎকার বার্নিশ ফিনিশিং। ১০০ বছরের ঘুণের গ্যারান্টি।',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    seller: {
      name: 'সিলেট ফার্নিচার ওয়ার্ল্ড',
      phone: '০১৭২৮-XXXXXX',
      isVerified: true,
      memberSince: 'ফেব্রুয়ারি ২০২৪',
      totalListings: 12
    },
    isFeatured: true,
    status: 'active',
    viewsCount: 290
  },
  {
    id: 'p8',
    title: 'আড়ং প্রিমিয়াম ডিজাইনার সুতি পাঞ্জাবি (সাইজ ৪০)',
    price: 2450,
    category: 'পোশাক',
    condition: 'নতুন',
    division: 'ঢাকা',
    district: 'ঢাকা',
    upazila: 'ধানমন্ডি',
    postedTime: '৬ ঘণ্টা আগে',
    description: 'ঈদের জন্য কেনা নতুন আড়ং সুতি পাঞ্জাবি। প্রিমিয়াম হ্যান্ড এম্ব্রয়ডারি করা কলার ও বাটন। ট্যাগ সহ ইনট্যাক্ট আছে, সাইজ কিছুটা বড় হওয়ার কারণে ক্রয়মূল্যের চেয়ে কমে বিক্রি করছি।',
    image: 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?auto=format&fit=crop&w=800&q=80',
    seller: {
      name: 'ফারহান তাহমিদ',
      phone: '০১৫২১-XXXXXX',
      isVerified: false,
      memberSince: 'এপ্রিল ২০২৪',
      totalListings: 1
    },
    isFeatured: false,
    status: 'active',
    viewsCount: 110
  },
  {
    id: 'p9',
    title: '৪৭তম বিসিএস প্রিলিমিনারি ও রিটেন পূর্ণাঙ্গ গাইড সেট',
    price: 1200,
    category: 'বই',
    condition: 'ব্যবহৃত',
    division: 'ময়মনসিংহ',
    district: 'ময়মনসিংহ',
    upazila: 'ময়মনসিংহ সদর',
    postedTime: '৭ ঘণ্টা আগে',
    description: 'প্রফেসর’স এবং এসিওরেন্স পাবলিকেশন্সের মোট ৮টি বিসিএস সহায়ক বইয়ের সেট। বইগুলোর পাতা সম্পূর্ণ পরিষ্কার এবং অক্ষত আছে। ময়মনসিংহ সদরে সরাসরি হস্তান্তর করা যাবে।',
    image: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=800&q=80',
    seller: {
      name: 'মাহমুদুল হাসান',
      phone: '০১৭৯৩-XXXXXX',
      isVerified: true,
      memberSince: 'জুলাই ২০২৪',
      totalListings: 3
    },
    isFeatured: false,
    status: 'active',
    viewsCount: 88
  },
  {
    id: 'p10',
    title: 'Bosch Professional 18V Cordless Hammer Drill Set',
    price: 5800,
    category: 'অন্যান্য',
    condition: 'নতুন',
    division: 'রংপুর',
    district: 'রংপুর',
    upazila: 'রংপুর সদর',
    postedTime: '৮ ঘণ্টা আগে',
    description: 'অরিজিনাল বশ কর্ডলেস ড্রিল ও স্ক্রু ড্রাইভার মেশিন। সাথে দুটি লিথিয়াম ব্যাটারি, ফাস্ট চার্জার এবং ২৪ পিস বিট সেট সহ হার্ডকেস বক্স। হোম ও প্রফেশনাল মেকানিকাল কাজের জন্য উপযুক্ত।',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    seller: {
      name: 'তারেক হার্ডওয়্যার',
      phone: '০১৭২৬-XXXXXX',
      isVerified: true,
      memberSince: 'মে ২০২৪',
      totalListings: 8
    },
    isFeatured: false,
    status: 'active',
    viewsCount: 142
  },
  {
    id: 'p11',
    title: 'Samsung Galaxy S23 Ultra 5G (12/256GB Phantom Black)',
    price: 72000,
    category: 'মোবাইল',
    condition: 'ব্যবহৃত',
    division: 'বরিশাল',
    district: 'বরিশাল',
    upazila: 'বরিশাল সদর',
    postedTime: '১০ ঘণ্টা আগে',
    description: 'স্যামসাং এস২৩ আল্ট্রা। ২০০ মেগাপিক্সেল ক্যামেরা, ১০০এক্স জুম অসাধারণ। সাথে অরিজিনাল এস-পেন এবং ৪৫ ওয়াট ফাস্ট চার্জার পাবেন। কোনোরকম স্ক্র্যাচ বা ত্রুটি নেই। অফিসিয়াল ভ্যারিয়েন্ট।',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80',
    seller: {
      name: 'শরীফুল ইসলাম',
      phone: '০১৭৭৭-XXXXXX',
      isVerified: true,
      memberSince: 'সেপ্টেম্বর ২০২৩',
      totalListings: 6
    },
    isFeatured: true,
    status: 'active',
    viewsCount: 620
  },
  {
    id: 'p12',
    title: 'Honda CB Trigger 150cc (Double Disc)',
    price: 85000,
    category: 'বাইক',
    condition: 'ব্যবহৃত',
    division: 'রাজশাহী',
    district: 'জয়পুরহাট',
    upazila: 'পাঁচবিবি',
    postedTime: '১২ ঘণ্টা আগে',
    description: 'হোন্ডা সিবি ট্রিগার ১৫০ সিসি ডাবল ডিস্ক ভার্সন। ইঞ্জিন আনটাচ, কোনো সমস্যা নেই। প্রতি লিটারে ৪০+ কিমি মাইলেজ দেয়। জয়পুরহাট বিআরটিএ রেজিস্ট্রেশন, ডিজিটাল নাম্বার প্লেট আছে।',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    seller: {
      name: 'মোস্তাফিজুর রহমান',
      phone: '০১৭৩৩-XXXXXX',
      isVerified: false,
      memberSince: 'ফেব্রুয়ারি ২০২৪',
      totalListings: 1
    },
    isFeatured: false,
    status: 'active',
    viewsCount: 215
  },
];

export const INITIAL_USER: UserProfile = {
  id: 'u1',
  name: 'আরিফুল ইসলাম',
  phone: '০১৭১১-২২৩৩৪৪',
  email: 'ariful.bd@gmail.com',
  division: 'ঢাকা',
  district: 'ঢাকা',
  upazila: 'মিরপুর',
  joinedDate: 'মার্চ ২০২৩',
  avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80'
};

export const INITIAL_REPORTS: ProductReport[] = [
  {
    id: 'rep-1',
    productId: 'p1',
    productTitle: 'iPhone 13 128GB',
    reason: 'বিক্রেতা অগ্রিম টাকা দাবি করছেন যা নীতিমালা পরিপন্থী।',
    reportedAt: '১১ সেপ্টেম্বর ২০২৬',
    status: 'pending'
  },
  {
    id: 'rep-2',
    productId: 'p6',
    productTitle: 'Sony Bravia 43 inch TV',
    reason: 'ছবির সাথে পণ্যের বর্ণনা মিলছে না বলে মনে হচ্ছে।',
    reportedAt: '১০ সেপ্টেম্বর ২০২৬',
    status: 'resolved'
  }
];

export const SAFETY_TIPS = [
  {
    id: 1,
    title: 'পণ্য দেখে তারপর টাকা দিন',
    description: 'কখনোই অগ্রিম টাকা বা বিকাশ/নগদ পেমেন্ট করবেন না। পণ্য হাতে পেয়ে সম্পূর্ণ পরীক্ষা করে মূল্য পরিশোধ করুন।'
  },
  {
    id: 2,
    title: 'অপরিচিত ব্যক্তিকে OTP/PIN দেবেন না',
    description: 'কোনো অবস্থাতেই আপনার ব্যাংক, বিকাশ বা নগদের ওটিপি অথবা গোপন পিন কারো সাথে শেয়ার করবেন না।'
  },
  {
    id: 3,
    title: 'নিরাপদ জনবহুল স্থানে দেখা করুন',
    description: 'কেনাবেচা বা পণ্য হস্তান্তরের জন্য সবসময় দিনের আলোতে ব্যস্ত শপিংমল বা পরিচিত পাবলিক স্থানে সাক্ষাত করুন।'
  },
  {
    id: 4,
    title: 'সন্দেহজনক বিজ্ঞাপন রিপোর্ট করুন',
    description: 'অবাস্তব কম দাম বা সন্দেহজনক কর্মকাণ্ড দেখলে সাথে সাথে "রিপোর্ট করুন" বাটনে ক্লিক করে রিপোর্ট করুন।'
  }
];

// Helper to format Bangladeshi Taka with Bengali numerals
export function formatTaka(amount: number): string {
  const englishNum = amount.toLocaleString('en-IN');
  const bnDigits: Record<string, string> = {
    '0': '০', '1': '১', '2': '২', '3': '৩', '4': '৪',
    '5': '৫', '6': '৬', '7': '৭', '8': '৮', '9': '৯',
    ',': ','
  };
  const bengaliNum = englishNum.split('').map(char => bnDigits[char] || char).join('');
  return `৳ ${bengaliNum}`;
}
