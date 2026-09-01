import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Sparkles, 
  ShieldCheck, 
  Leaf, 
  Award, 
  ArrowRight,
  Clock
} from 'lucide-react';
import { useShop } from '../context/ShopContext';

interface BrandModalProps {
  type: 'about' | 'blog' | 'contact' | null;
  onClose: () => void;
}

export const BrandModals: React.FC<BrandModalProps> = ({ type, onClose }) => {
  const { toast } = useShop();

  // Contact Form states
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactSubject, setContactSubject] = useState('Product Inquiry');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSent, setContactSent] = useState(false);

  if (!type) return null;

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
    toast('Message Sent!', 'Our concierge team will respond within 2 hours.', 'success');
  };

  const blogPosts = [
    {
      id: 'blog-1',
      title: 'The Art of Modern Wardrobe Curation: Quality over Quantity',
      category: 'Fashion & Style',
      date: 'Aug 28, 2026',
      readTime: '4 min read',
      image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
      excerpt: 'How our French terry cotton pieces are engineered to retain structure, comfort, and minimal elegance through thousands of wears.'
    },
    {
      id: 'blog-2',
      title: 'Acoustic Precision: Inside the Next Generation of Wireless Audio',
      category: 'Electronics & Tech',
      date: 'Aug 20, 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Exploring active noise cancellation algorithms and carbon-fiber diaphragms that bring studio master recordings to daily commutes.'
    },
    {
      id: 'blog-3',
      title: 'Nordic Interior Principles: Sculptural Simplicity for Calmer Spaces',
      category: 'Home Decor',
      date: 'Aug 14, 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      excerpt: 'Why stoneware ceramics, tactile linen, and warm neutral palettes transform contemporary urban living.'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/65 backdrop-blur-xs transition-opacity"
      />

      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="relative bg-white rounded-3xl shadow-2xl max-w-3xl w-full overflow-hidden border border-neutral-100 z-10 animate-scale max-h-[88vh] flex flex-col">
          
          {/* Header */}
          <div className="p-6 border-b border-neutral-100 flex items-center justify-between bg-neutral-950 text-white shrink-0">
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tighter text-white">RTHVX</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5500]" />
              <span className="text-neutral-400 text-sm font-semibold ml-2 capitalize">
                {type === 'about' ? 'Our Story & Brand Craft' : type === 'blog' ? 'Editorial Journal' : 'Customer Concierge'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-full hover:bg-neutral-900 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body Content according to type */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            
            {/* ABOUT US MODAL */}
            {type === 'about' && (
              <div className="space-y-6">
                <div className="space-y-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                    About RTHVX
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight leading-snug">
                    Discover Products You’ll Love
                  </h2>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    Founded with a singular vision, <strong>RTHVX</strong> crafts and curates elevated lifestyle essentials for individuals who value modern aesthetics, uncompromised material durability, and thoughtful functional design.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
                    <Award className="w-6 h-6 text-[#FF5500]" />
                    <h4 className="font-bold text-sm text-neutral-900">Artisan Materials</h4>
                    <p className="text-xs text-neutral-500">
                      From 480GSM organic cotton to aerospace-grade titanium alloy and Tuscan leathers.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
                    <Leaf className="w-6 h-6 text-emerald-600" />
                    <h4 className="font-bold text-sm text-neutral-900">Sustainable Ethos</h4>
                    <p className="text-xs text-neutral-500">
                      100% recyclable packaging, ethical supply chains, and low carbon logistics.
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-2">
                    <ShieldCheck className="w-6 h-6 text-sky-600" />
                    <h4 className="font-bold text-sm text-neutral-900">30-Day Guarantee</h4>
                    <p className="text-xs text-neutral-500">
                      Try our products in your routine with hassle-free returns and responsive 24/7 care.
                    </p>
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-neutral-900 text-white flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-bold text-sm">Join over 50,000+ happy modern shoppers</h4>
                    <p className="text-xs text-neutral-400">Experience the RTHVX difference today.</p>
                  </div>
                  <button
                    onClick={onClose}
                    className="bg-[#FF5500] hover:bg-[#E64D00] text-white px-4 py-2 rounded-xl text-xs font-bold transition-all"
                  >
                    Start Shopping
                  </button>
                </div>
              </div>
            )}

            {/* BLOG MODAL */}
            {type === 'blog' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                    RTHVX Journal
                  </span>
                  <h2 className="text-2xl font-extrabold text-neutral-950">
                    Stories, Design & Modern Living
                  </h2>
                </div>

                <div className="space-y-4">
                  {blogPosts.map((post) => (
                    <div
                      key={post.id}
                      className="flex flex-col sm:flex-row gap-4 p-4 rounded-2xl border border-neutral-100 hover:border-neutral-200 bg-neutral-50/60 transition-all group cursor-pointer"
                      onClick={() => toast('Article', `Opening "${post.title}"`, 'info')}
                    >
                      <div className="w-full sm:w-44 aspect-[16/10] sm:aspect-square rounded-xl overflow-hidden bg-neutral-200 shrink-0">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-400">
                            <span className="text-[#FF5500] uppercase tracking-wider">{post.category}</span>
                            <span>•</span>
                            <span>{post.date}</span>
                            <span>•</span>
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="font-extrabold text-sm sm:text-base text-neutral-950 group-hover:text-[#FF5500] transition-colors leading-snug">
                            {post.title}
                          </h3>
                          <p className="text-xs text-neutral-600 line-clamp-2">
                            {post.excerpt}
                          </p>
                        </div>

                        <div className="flex items-center gap-1 text-xs font-bold text-neutral-900 group-hover:text-[#FF5500] transition-colors pt-2">
                          <span>Read Full Story</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* CONTACT US MODAL */}
            {type === 'contact' && (
              <div className="space-y-6">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#FF5500]">
                    24/7 Concierge
                  </span>
                  <h2 className="text-2xl font-extrabold text-neutral-950">
                    How Can We Help You?
                  </h2>
                  <p className="text-xs text-neutral-500">
                    Have questions about sizing, delivery, or custom orders? Our support team is online 24/7.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* Contact Info */}
                  <div className="md:col-span-5 space-y-4">
                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                        <Mail className="w-4 h-4 text-[#FF5500]" />
                        <span>Email Support</span>
                      </div>
                      <p className="text-xs text-neutral-600 font-medium">support@rthvx.com</p>
                      <p className="text-[11px] text-neutral-400">Average reply: 15 mins</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                        <Phone className="w-4 h-4 text-[#FF5500]" />
                        <span>Toll-Free Phone</span>
                      </div>
                      <p className="text-xs text-neutral-600 font-medium">+1 (800) 894-RTHVX</p>
                      <p className="text-[11px] text-neutral-400">Mon - Sun, 24 Hours</p>
                    </div>

                    <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-neutral-900">
                        <MapPin className="w-4 h-4 text-[#FF5500]" />
                        <span>Design Studio</span>
                      </div>
                      <p className="text-xs text-neutral-600 font-medium">540 Howard St, San Francisco, CA</p>
                    </div>
                  </div>

                  {/* Form */}
                  <div className="md:col-span-7">
                    {contactSent ? (
                      <div className="text-center py-10 bg-emerald-50 rounded-2xl p-6 border border-emerald-200 space-y-2">
                        <h4 className="font-extrabold text-base text-emerald-900">Message Received!</h4>
                        <p className="text-xs text-emerald-700">
                          Thank you for reaching out. A client advisor has been assigned to your ticket.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleContactSubmit} className="space-y-3">
                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-neutral-700">Your Name</label>
                          <input
                            type="text"
                            required
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            placeholder="Alex Rivera"
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-neutral-700">Email Address</label>
                          <input
                            type="email"
                            required
                            value={contactEmail}
                            onChange={(e) => setContactEmail(e.target.value)}
                            placeholder="alex@example.com"
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                          />
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-neutral-700">Subject</label>
                          <select
                            value={contactSubject}
                            onChange={(e) => setContactSubject(e.target.value)}
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                          >
                            <option value="Product Inquiry">Product Inquiry</option>
                            <option value="Order Tracking">Order Tracking & Shipping</option>
                            <option value="Returns & Exchanges">Returns & Exchanges</option>
                            <option value="Wholesale Partnership">Wholesale & Press</option>
                          </select>
                        </div>

                        <div className="space-y-1">
                          <label className="text-[11px] font-bold text-neutral-700">Message</label>
                          <textarea
                            rows={3}
                            required
                            value={contactMessage}
                            onChange={(e) => setContactMessage(e.target.value)}
                            placeholder="How can we assist you today?"
                            className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF5500]"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full bg-neutral-950 hover:bg-[#FF5500] text-white py-3 rounded-xl font-bold text-xs tracking-wide flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer active:scale-98"
                        >
                          <span>Send Message</span>
                          <Send className="w-3.5 h-3.5" />
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>
      </div>
    </div>
  );
};
