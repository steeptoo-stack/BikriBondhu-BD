import React, { useState } from 'react';
import { X, ShieldCheck, Mail, Phone, MapPin, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Product } from '../types';

interface InfoModalProps {
  type: 'about' | 'safety' | 'terms' | 'privacy' | 'contact' | null;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        {type === 'about' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">আমাদের সম্পর্কে</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>BikriBondhu BD</strong> হলো বাংলাদেশের সাধারণ মানুষের জন্য ডিজাইন করা সবচেয়ে দ্রুত, সহজ ও বিশ্বস্ত লোকাল কেনাবেচার প্ল্যাটফর্ম।
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              আমাদের লক্ষ্য হলো স্থানীয় কমিউনিটির মানুষ যাতে মধ্যস্বত্বভোগী ছাড়া নিজেদের এলাকার ভেতর সরাসরি কথা বলে পুরনো বা নতুন জিনিস কেনাবেচা করতে পারে। মোবাইল, বাইক, ল্যাপটপ থেকে শুরু করে ফার্নিচার ও পোশাক—সবকিছু এক প্ল্যাটফর্মে।
            </p>
          </div>
        )}

        {type === 'safety' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3 flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-600" />
              <span>নিরাপত্তা নির্দেশিকা</span>
            </h2>
            <ul className="space-y-2.5 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">•</span>
                <span><strong>পণ্য দেখে টাকা দিন:</strong> সবসময় সামনাসামনি পণ্য পরীক্ষা করে শতভাগ নিশ্চিত হয়ে মূল্য পরিশোধ করবেন।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">•</span>
                <span><strong>কখনোই অগ্রিম বিকাশ/নগদ নয়:</strong> কোনো বিক্রেতা কুরিয়ার চার্জ বা বুকিংয়ের নাম করে অগ্রিম টাকা চাইলে বিরত থাকুন।</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="font-bold text-emerald-600">•</span>
                <span><strong>জনবহুল স্থানে লেনদেন:</strong> দিনে জনবহুল শপিংমল, বিশ্ববিদ্যালয় বা মেট্রো স্টেশনের মতো নিরাপদ জায়গায় দেখা করুন।</span>
              </li>
            </ul>
          </div>
        )}

        {type === 'terms' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">ব্যবহারবিধি ও নীতিমালা</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              ১. প্ল্যাটফর্মে কোনো অবৈধ, নকল বা কপিরাইট লঙ্ঘিত পণ্য পোস্ট করা সম্পূর্ণ নিষিদ্ধ।
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              ২. পণ্যের সঠিক দাম ও বাস্তব ছবি প্রদান করতে হবে। ইন্টারনেটের স্টক ছবি এড়িয়ে চলুন।
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              ৩. ক্রেতা ও বিক্রেতা উভয়কেই শালীন আচরণ বজায় রাখতে হবে। প্রতারণামূলক কোনো কর্মকাণ্ড প্রমাণিত হলে অ্যাকাউন্ট স্থগিত করা হবে।
            </p>
          </div>
        )}

        {type === 'privacy' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">গোপনীয়তা নীতি</h2>
            <p className="text-sm text-gray-600 leading-relaxed">
              আমরা আপনার ব্যক্তিগত তথ্যের সুরক্ষা নিশ্চিত করি। আপনার ফোন নম্বর কেবলমাত্র আপনি সম্মত হলে বিজ্ঞাপনে প্রদর্শন করা হয়। আপনার ইমেইল বা পাসওয়ার্ড কোনো তৃতীয় পক্ষের সাথে ভাগাভাগি করা হয় না।
            </p>
          </div>
        )}

        {type === 'contact' && (
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-3">আমাদের সাথে যোগাযোগ</h2>
            <p className="text-sm text-gray-600">যেকোনো প্রশ্ন বা সহযোগিতার জন্য আমাদের সাপোর্ট টিমের সাথে যোগাযোগ করুন:</p>
            <div className="space-y-3 bg-gray-50 p-4 rounded-xl text-sm">
              <div className="flex items-center gap-2 text-gray-700">
                <Mail className="w-4 h-4 text-emerald-600" />
                <span>ইমেইল: support@bikribondhu.com.bd</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>হটলাইন: ০৯৬১২-XXXXXX (সকাল ৯টা - রাত ৯টা)</span>
              </div>
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin className="w-4 h-4 text-emerald-600" />
                <span>প্রধান কার্যালয়: বনানী, ঢাকা ১২১৩, বাংলাদেশ</span>
              </div>
            </div>
          </div>
        )}

        <div className="pt-6 mt-4 border-t border-gray-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-emerald-600 text-white rounded-xl text-xs font-semibold hover:bg-emerald-700"
          >
            ঠিক আছে
          </button>
        </div>
      </div>
    </div>
  );
};

interface ReportModalProps {
  product: Product | null;
  onClose: () => void;
  onSubmitReport: (productId: string, productTitle: string, reason: string) => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({
  product,
  onClose,
  onSubmitReport,
}) => {
  const [reason, setReason] = useState('অবাস্তব কম দাম বা সন্দেহজনক বিজ্ঞাপন');
  const [details, setDetails] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!product) return null;

  const reasons = [
    'অবাস্তব কম দাম বা সন্দেহজনক বিজ্ঞাপন',
    'বিক্রেতা অগ্রিম টাকা দাবি করছেন',
    'নকল বা কপি পণ্য অরিজিনাল বলে দাবি',
    'অবৈধ বা নিষিদ্ধ আইটেম',
    'বিজ্ঞাপনে ভুল বা অসত্য তথ্য রয়েছে',
    'অন্যান্য কারণ'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitReport(product.id, product.title, `${reason}${details ? ` - ${details}` : ''}`);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-60 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div 
        className="relative bg-white rounded-2xl max-w-md w-full shadow-2xl p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-rose-600 mb-3">
          <AlertTriangle className="w-5 h-5" />
          <h3 className="text-base font-bold text-gray-900">বিজ্ঞাপন রিপোর্ট করুন</h3>
        </div>

        {submitted ? (
          <div className="text-center py-6 space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h4 className="text-sm font-bold text-gray-900">রিপোর্ট সফলভাবে জমা হয়েছে</h4>
            <p className="text-xs text-gray-500">আমাদের মডারেশন টিম দ্রুত এটি তদন্ত করে ব্যবস্থা গ্রহণ করবে। ধন্যবাদ।</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <p className="text-xs text-gray-600">
              আপনি <strong>"{product.title}"</strong> বিজ্ঞাপনটির বিরুদ্ধে অভিযোগ জানাচ্ছেন।
            </p>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                অভিযোগের ধরন বেছে নিন:
              </label>
              <div className="space-y-1.5">
                {reasons.map((r, idx) => (
                  <label key={idx} className="flex items-center gap-2 text-xs text-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      name="report-reason"
                      value={r}
                      checked={reason === r}
                      onChange={() => setReason(r)}
                      className="text-rose-600 focus:ring-rose-500"
                    />
                    <span>{r}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                অতিরিক্ত মন্তব্য (ঐচ্ছিক):
              </label>
              <textarea
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="কোনো নির্দিষ্ট তথ্য থাকলে লিখুন..."
                className="w-full text-xs p-2.5 border border-gray-300 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-rose-500"
              />
            </div>

            <div className="pt-3 border-t border-gray-100 flex justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-medium text-gray-600 hover:bg-gray-100"
              >
                বাতিল
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
              >
                রিপোর্ট জমা দিন
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
