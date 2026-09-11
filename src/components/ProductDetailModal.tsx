import React, { useState } from 'react';
import { 
  X, MapPin, Clock, Tag, ShieldCheck, Phone, MessageSquare, 
  AlertTriangle, Heart, CheckCircle2, ChevronRight, Share2 
} from 'lucide-react';
import { Product } from '../types';
import { formatTaka } from '../data/mockData';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (productId: string) => void;
  onOpenReport: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  isFavorite,
  onToggleFavorite,
  onOpenReport,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [showPhoneNumber, setShowPhoneNumber] = useState<boolean>(false);
  const [showChatModal, setShowChatModal] = useState<boolean>(false);
  const [chatMessage, setChatMessage] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<Array<{ sender: 'user' | 'seller'; text: string; time: string }>>([]);
  const [copiedLink, setCopiedLink] = useState(false);

  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setShowPhoneNumber(false);
      setShowChatModal(false);
      setChatHistory([
        { 
          sender: 'seller', 
          text: `আসসালামু আলাইকুম! ${product.title} সম্পর্কে কোনো তথ্য জানার থাকলে নির্দ্বিধায় মেসেজ দিন।`, 
          time: 'কিছুক্ষণ আগে' 
        }
      ]);
    }
  }, [product]);

  if (!product) return null;

  const allImages = [product.image, ...(product.additionalImages || [])];

  const handleSendMessage = (textToSend?: string) => {
    const text = textToSend || chatMessage;
    if (!text.trim()) return;

    const userMsg = { sender: 'user' as const, text: text.trim(), time: 'এখন' };
    setChatHistory(prev => [...prev, userMsg]);
    setChatMessage('');

    // Simulated quick friendly response from seller
    setTimeout(() => {
      setChatHistory(prev => [
        ...prev,
        {
          sender: 'seller',
          text: 'ধন্যবাদ মেসেজ দেওয়ার জন্য। পণ্যটি এখনো এভেইলেবল আছে। আপনি চাইলে সরাসরি দেখে নিতে পারেন।',
          time: 'এখন'
        }
      ]);
    }, 1000);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6 animate-fadeIn">
      <div 
        className="relative bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header / Top Close Bar */}
        <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>হোম</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span>{product.category}</span>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-gray-900 font-medium truncate max-w-[150px] sm:max-w-xs">{product.title}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
              title="লিংক কপি করুন"
            >
              <Share2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => onToggleFavorite(product.id)}
              className="p-2 rounded-full text-gray-500 hover:text-rose-500 hover:bg-rose-50 transition-colors"
              title="পছন্দ তালিকা"
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              id="btn-close-modal"
              onClick={onClose}
              className="p-2 rounded-full text-gray-500 hover:text-gray-900 hover:bg-gray-100 transition-colors"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {copiedLink && (
          <div className="bg-emerald-50 text-emerald-800 text-xs px-4 py-2 text-center font-medium border-b border-emerald-100">
            বিজ্ঞাপনের লিংক ক্লিপবোর্ডে কপি করা হয়েছে!
          </div>
        )}

        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
          {/* Main Content Grid: Images on left, Pricing & Actions on right */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Gallery Column (7 cols) */}
            <div className="lg:col-span-7 flex flex-col gap-3">
              <div className="relative aspect-4/3 w-full bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
                <img
                  src={selectedImage}
                  alt={product.title}
                  className="w-full h-full object-cover object-center"
                  onError={(e) => {
                    // Fallback to svg if image fails
                    (e.target as HTMLElement).setAttribute('src', 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"><rect fill="%23f3f4f6" width="600" height="400"/><text fill="%239ca3af" font-size="20" x="50%" y="50%" text-anchor="middle">পণ্য ছবি</text></svg>');
                  }}
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-xs font-semibold bg-emerald-700 text-white shadow-xs">
                  {product.condition}
                </span>
              </div>

              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`relative w-20 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                        selectedImage === img ? 'border-emerald-600 scale-98' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Description Section */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <h3 className="text-base font-bold text-gray-900 mb-2">বিস্তারিত বিবরণ</h3>
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line bg-gray-50/70 p-4 rounded-xl border border-gray-100">
                  {product.description}
                </div>
              </div>
            </div>

            {/* Details & Action Column (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mb-2">
                  {formatTaka(product.price)}
                </div>

                <h1 className="text-lg sm:text-xl font-bold text-gray-900 leading-snug mb-3">
                  {product.title}
                </h1>

                {/* Meta details list */}
                <div className="space-y-2 text-xs sm:text-sm text-gray-600 mb-5 bg-gray-50 p-3.5 rounded-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>ঠিকানা:</strong> {product.upazila}, {product.district}, {product.division}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Tag className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>ক্যাটাগরি:</strong> {product.category} ({product.condition})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span><strong>বিজ্ঞাপন দেওয়া হয়েছে:</strong> {product.postedTime}</span>
                  </div>
                </div>

                {/* Seller Info Card */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 mb-4 shadow-xs">
                  <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                    বিক্রেতার তথ্য
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-base">
                      {product.seller.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-gray-900 text-sm">{product.seller.name}</span>
                        {product.seller.isVerified && (
                          <span className="inline-flex items-center text-[10px] font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200" title="ভেরিফাইড বিক্রেতা">
                            <ShieldCheck className="w-3 h-3 mr-0.5" />
                            যাচাইকৃত
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">
                        সদস্য হয়েছেন: {product.seller.memberSince}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons: Call & Chat */}
                <div className="space-y-2.5">
                  {/* Call Button */}
                  <div className="relative">
                    {showPhoneNumber ? (
                      <a
                        href={`tel:${product.seller.phone.replace(/[^0-9]/g, '')}`}
                        className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
                      >
                        <Phone className="w-4 h-4" />
                        <span>{product.seller.phone} (কল করুন)</span>
                      </a>
                    ) : (
                      <button
                        id="btn-show-phone"
                        onClick={() => setShowPhoneNumber(true)}
                        className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                      >
                        <Phone className="w-4 h-4" />
                        <span>বিক্রেতার ফোন নম্বর দেখুন</span>
                      </button>
                    )}
                  </div>

                  {/* Message Seller Button */}
                  <button
                    id="btn-message-seller"
                    onClick={() => setShowChatModal(true)}
                    className="w-full py-3 px-4 rounded-xl bg-white border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>মেসেজ পাঠান</span>
                  </button>
                </div>
              </div>

              {/* Safety reminder & Report */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-emerald-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>পণ্য দেখে তারপর মূল্য পরিশোধ করুন</span>
                </div>
                <button
                  id="btn-report-listing"
                  onClick={() => onOpenReport(product)}
                  className="text-xs text-gray-500 hover:text-rose-600 flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>রিপোর্ট করুন</span>
                </button>
              </div>

            </div>
          </div>
        </div>

        {/* Chat Drawer / Modal Overlay */}
        {showChatModal && (
          <div className="fixed inset-0 z-60 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-4 shadow-xl border border-gray-200 flex flex-col max-h-[80vh]">
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                    {product.seller.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-gray-900">{product.seller.name}</h4>
                    <p className="text-[11px] text-gray-500">অনলাইনে আছেন</p>
                  </div>
                </div>
                <button 
                  onClick={() => setShowChatModal(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Message Stream */}
              <div className="flex-1 overflow-y-auto py-3 space-y-2.5 max-h-60 text-xs">
                {chatHistory.map((item, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${item.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-xl px-3 py-2 ${
                        item.sender === 'user'
                          ? 'bg-emerald-600 text-white rounded-tr-none'
                          : 'bg-gray-100 text-gray-800 rounded-tl-none'
                      }`}
                    >
                      {item.text}
                    </div>
                    <span className="text-[10px] text-gray-400 mt-0.5 px-1">{item.time}</span>
                  </div>
                ))}
              </div>

              {/* Quick suggestions */}
              <div className="pt-2 border-t border-gray-100 flex gap-1.5 overflow-x-auto pb-2">
                <button
                  type="button"
                  onClick={() => handleSendMessage('পণ্যটি কি এখনও পাওয়া যাবে?')}
                  className="shrink-0 text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full"
                >
                  পণ্যটি কি এখনো আছে?
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage('দাম কিছুটা কমানো সম্ভব?')}
                  className="shrink-0 text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full"
                >
                  দাম কমানো যাবে?
                </button>
                <button
                  type="button"
                  onClick={() => handleSendMessage('কোথায় দেখা করতে পারি?')}
                  className="shrink-0 text-[11px] bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-full"
                >
                  কখন দেখা করবেন?
                </button>
              </div>

              {/* Input */}
              <div className="pt-2 flex gap-2">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSendMessage();
                  }}
                  placeholder="আপনার মেসেজ লিখুন..."
                  className="flex-1 text-xs px-3 py-2 border border-gray-200 rounded-xl focus:outline-hidden focus:ring-1 focus:ring-emerald-500"
                />
                <button
                  onClick={() => handleSendMessage()}
                  className="px-3.5 py-2 bg-emerald-600 text-white text-xs font-semibold rounded-xl hover:bg-emerald-700"
                >
                  পাঠান
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
