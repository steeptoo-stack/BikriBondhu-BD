import React from 'react';
import { ShieldCheck, Eye, Lock, MapPin, AlertTriangle } from 'lucide-react';

export const TrustSafetySection: React.FC = () => {
  const tips = [
    {
      icon: Eye,
      title: 'পণ্য দেখে তারপর টাকা দিন',
      desc: 'কখনোই অগ্রিম টাকা বা বিকাশ/নগদ পেমেন্ট করবেন না। পণ্য হাতে পেয়ে সম্পূর্ণ পরীক্ষা করে মূল্য পরিশোধ করুন।'
    },
    {
      icon: Lock,
      title: 'অপরিচিত ব্যক্তিকে OTP/PIN দেবেন না',
      desc: 'কোনো অবস্থাতেই আপনার ব্যাংক, বিকাশ বা নগদের ওটিপি অথবা গোপন পিন কারো সাথে শেয়ার করবেন না।'
    },
    {
      icon: MapPin,
      title: 'নিরাপদ জায়গায় দেখা করুন',
      desc: 'কেনাবেচা বা পণ্য হস্তান্তরের জন্য সবসময় দিনের আলোতে ব্যস্ত শপিংমল বা পরিচিত পাবলিক স্থানে সাক্ষাত করুন।'
    },
    {
      icon: AlertTriangle,
      title: 'সন্দেহজনক বিজ্ঞাপন রিপোর্ট করুন',
      desc: 'অবাস্তব কম দাম বা সন্দেহজনক কর্মকাণ্ড দেখলে সাথে সাথে রিপোর্ট অপশনে ক্লিক করে আমাদের অবহিত করুন।'
    }
  ];

  return (
    <section className="bg-emerald-900 text-white rounded-3xl p-6 sm:p-10 my-10 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-800/40 pointer-events-none blur-2xl"></div>
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-64 h-64 rounded-full bg-teal-800/40 pointer-events-none blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex items-center gap-2.5 text-emerald-300 mb-2">
          <ShieldCheck className="w-6 h-6 text-emerald-400" />
          <span className="text-xs font-bold uppercase tracking-wider">বিশ্বাস ও নিরাপত্তা</span>
        </div>

        <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
          নিরাপদ কেনাবেচার জরুরি নির্দেশিকা
        </h2>
        <p className="text-xs sm:text-sm text-emerald-100/90 max-w-2xl mb-8 leading-relaxed">
          BikriBondhu BD প্ল্যাটফর্মে আপনার প্রতিটি লেনদেন যেন নিরাপদ ও ঝামেলামুক্ত থাকে সেজন্য এই সহজ নিয়মগুলো মেনে চলুন:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tips.map((tip, idx) => {
            const Icon = tip.icon;
            return (
              <div
                key={idx}
                className="bg-emerald-800/60 backdrop-blur-xs border border-emerald-700/50 rounded-2xl p-5 hover:bg-emerald-800/90 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-emerald-200 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-white mb-1.5">{tip.title}</h3>
                <p className="text-xs text-emerald-100/80 leading-relaxed">{tip.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
