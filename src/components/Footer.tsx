import React from 'react';
import { ShoppingBag, ShieldCheck, Heart } from 'lucide-react';
import { ActivePage } from '../types';

interface FooterProps {
  onOpenInfoModal: (type: 'about' | 'safety' | 'terms' | 'privacy' | 'contact') => void;
  onNavigate: (page: ActivePage) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenInfoModal,
  onNavigate,
}) => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16 text-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-gray-100">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
            <div 
              onClick={() => onNavigate('home')} 
              className="flex items-center gap-2.5 cursor-pointer inline-flex"
            >
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-gray-900 tracking-tight">
                BikriBondhu <span className="text-emerald-600">BD</span>
              </span>
            </div>
            <p className="text-sm text-gray-600 font-medium">
              "বাংলাদেশের স্থানীয় কেনাবেচার সহজ প্ল্যাটফর্ম"
            </p>
            <p className="text-xs text-gray-700 max-w-sm leading-relaxed">
              আপনার এলাকার স্থানীয় মানুষের সাথে সহজে এবং নিরাপদে পণ্য ক্রয়-বিক্রয়ের সেরা বিশ্বস্ত ওয়েবসাইট। ঢাকা থেকে জয়পুরহাট, টেকনাফ থেকে তেঁতুলিয়া—সবার জন্য উন্মুক্ত।
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              গুরুত্বপূর্ণ লিংক
            </h4>
            <ul className="space-y-2 text-xs text-gray-700">
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-emerald-700 transition-colors">
                  সকল পণ্য দেখুন
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('sell')} className="hover:text-emerald-700 transition-colors">
                  বিজ্ঞাপন পোস্ট করুন
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('my-posts')} className="hover:text-emerald-700 transition-colors">
                  আমার পোস্ট
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-emerald-700 transition-colors text-amber-700 font-medium">
                  ডেমো অ্যাডমিন প্যানেল
                </button>
              </li>
            </ul>
          </div>

          {/* Policy Links as specified */}
          <div>
            <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
              তথ্য ও সহায়তা
            </h4>
            <ul className="space-y-2 text-xs text-gray-700">
              <li>
                <button 
                  onClick={() => onOpenInfoModal('about')} 
                  className="hover:text-emerald-700 transition-colors"
                >
                  আমাদের সম্পর্কে
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenInfoModal('safety')} 
                  className="hover:text-emerald-700 transition-colors"
                >
                  নিরাপত্তা নির্দেশিকা
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenInfoModal('terms')} 
                  className="hover:text-emerald-700 transition-colors"
                >
                  ব্যবহারবিধি
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenInfoModal('privacy')} 
                  className="hover:text-emerald-700 transition-colors"
                >
                  গোপনীয়তা নীতি
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onOpenInfoModal('contact')} 
                  className="hover:text-emerald-700 transition-colors"
                >
                  যোগাযোগ
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-700 gap-3">
          <p>© ২০২৬ BikriBondhu BD। সর্বস্বত্ব সংরক্ষিত।</p>
          <div className="flex items-center gap-1">
            <span>বাংলাদেশে তৈরি</span>
            <span className="text-emerald-600">🇧🇩</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
