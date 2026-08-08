import React from 'react';
import { Phone, MessageCircle, MapPin, Sparkles, BookOpen, ShieldCheck, Wrench, X, ChevronRight, Award } from 'lucide-react';

/**
 * MobileNav Component - Google Stitch Design System
 * Mobile Slide-out Drawer Menu + Persistent Sticky Bottom Action Bar.
 */
export default function MobileNav({ isOpen, onClose, lang = 'mr', onNavigate }) {
  const isMarathi = lang === 'mr';

  const handleMobileNav = (view) => {
    onClose();
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <>
      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-md z-50 lg:hidden animate-in fade-in duration-200"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Slide-out Drawer Menu */}
      <aside
        className={`fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-white z-50 lg:hidden shadow-stitch-lg flex flex-col justify-between transform transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        aria-label="Mobile Navigation Menu"
      >
        {/* Drawer Header */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-stitch-red text-white font-extrabold flex items-center justify-center text-base shadow-stitch-sm">
              S
            </div>
            <div>
              <div className="font-extrabold text-stitch-slate-dark text-sm">समर्थ कॉम्प्युटर्स</div>
              <div className="text-[10px] text-slate-500 font-semibold">MKCL & CSC Center, Khandala</div>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-2xl text-slate-400 hover:text-slate-900 hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Navigation Links */}
        <div className="p-4 overflow-y-auto flex-1 space-y-1.5">
          <button
            type="button"
            onClick={() => handleMobileNav('home')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-stitch-red-light font-bold text-stitch-slate-dark text-xs text-left transition-all"
          >
            <span className={isMarathi ? 'marathi-text font-bold' : 'font-bold'}>🏠 {isMarathi ? 'मुख्यपृष्ठ' : 'Home'}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('courses')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-stitch-red-light font-bold text-stitch-slate-dark text-xs text-left transition-all"
          >
            <span className={isMarathi ? 'marathi-text font-bold' : 'font-bold'}>📚 {isMarathi ? 'कोर्सेस (MS-CIT, Tally, Typing)' : 'Courses Catalog'}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('csc')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-stitch-red-light font-bold text-stitch-slate-dark text-xs text-left transition-all"
          >
            <span className={isMarathi ? 'marathi-text font-bold' : 'font-bold'}>📜 {isMarathi ? 'सीएससी व शासकीय सेवा' : 'CSC & Govt Services'}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('about')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-stitch-red-light font-bold text-stitch-slate-dark text-xs text-left transition-all"
          >
            <span className={isMarathi ? 'marathi-text font-bold' : 'font-bold'}>🏛️ {isMarathi ? 'आमच्याबद्दल (About Us)' : 'About Us'}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('faculty')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-stitch-red-light font-bold text-stitch-slate-dark text-xs text-left transition-all"
          >
            <span className={isMarathi ? 'marathi-text font-bold' : 'font-bold'}>👨‍🏫 {isMarathi ? 'शिक्षक वृंद (Faculty)' : 'Faculty & Instructors'}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('gallery')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-stitch-red-light font-bold text-stitch-slate-dark text-xs text-left transition-all"
          >
            <span className={isMarathi ? 'marathi-text font-bold' : 'font-bold'}>🖼️ {isMarathi ? 'फोटो गॅलरी (Gallery)' : 'Campus Photo Gallery'}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('contact')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl hover:bg-stitch-red-light font-bold text-stitch-slate-dark text-xs text-left transition-all"
          >
            <span className={isMarathi ? 'marathi-text font-bold' : 'font-bold'}>📞 {isMarathi ? 'संपर्क व नकाशा पत्ता' : 'Contact & Address'}</span>
            <ChevronRight className="w-4 h-4 text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => handleMobileNav('admin')}
            className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-slate-100 hover:bg-stitch-red-light font-bold text-stitch-slate-dark text-xs text-left transition-all border border-slate-200"
          >
            <span className={isMarathi ? 'marathi-text font-bold text-stitch-red' : 'font-bold text-stitch-red'}>🔒 {isMarathi ? 'ॲडमिन लॉगिन पोर्टल' : 'Master Admin Portal Login'}</span>
            <ChevronRight className="w-4 h-4 text-stitch-red" />
          </button>
        </div>



        {/* Drawer Footer CTA */}
        <div className="p-4 border-t border-slate-100 bg-slate-50 space-y-2">
          <a
            href="#inquiry-form"
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-stitch-red to-stitch-red-dark text-white font-extrabold text-xs py-3.5 rounded-2xl shadow-stitch-sm hover:scale-[1.02] transition-transform"
          >
            <Sparkles className="w-4 h-4 text-red-200" />
            <span className={isMarathi ? 'marathi-text' : ''}>{isMarathi ? 'मोफत डेमो क्लास बुक करा' : 'Book Free Demo Class'}</span>
          </a>
        </div>
      </aside>

      {/* Persistent Sticky Bottom Action Bar (Mobile Only) */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-xl border-t border-slate-200/90 shadow-stitch-lg z-40 py-2 px-3 flex items-center justify-around gap-1">
        <a
          href="tel:+919552345061"
          className="flex flex-col items-center gap-1 text-slate-700 hover:text-stitch-red transition-colors text-[10px] font-bold"
        >
          <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-stitch-slate-dark shadow-stitch-sm">
            <Phone className="w-4 h-4 text-stitch-red" />
          </div>
          <span>{isMarathi ? 'कॉल करा' : 'Call'}</span>
        </a>

        <a
          href="https://wa.me/919552345061?text=Hello%20Samarth%20Computers"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-emerald-800 hover:text-emerald-900 transition-colors text-[10px] font-bold"
        >
          <div className="w-9 h-9 rounded-2xl bg-emerald-100/80 flex items-center justify-center text-stitch-whatsapp shadow-stitch-sm">
            <MessageCircle className="w-4 h-4 fill-emerald-100 text-stitch-whatsapp" />
          </div>
          <span>{isMarathi ? 'व्हाट्सॲप' : 'WhatsApp'}</span>
        </a>

        <a
          href="https://maps.google.com/maps?q=Samarth+Computers+Khandala"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center gap-1 text-slate-700 hover:text-stitch-red transition-colors text-[10px] font-bold"
        >
          <div className="w-9 h-9 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 shadow-stitch-sm">
            <MapPin className="w-4 h-4 text-stitch-amber" />
          </div>
          <span>{isMarathi ? 'नकाशा' : 'Location'}</span>
        </a>

        <a
          href="#inquiry-form"
          className="flex flex-col items-center gap-1 text-stitch-slate-dark text-[10px] font-extrabold"
        >
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-r from-stitch-red to-stitch-red-dark flex items-center justify-center text-white shadow-stitch-glow">
            <Sparkles className="w-4 h-4 text-red-200" />
          </div>
          <span>{isMarathi ? 'डेमो क्लास' : 'Book Demo'}</span>
        </a>
      </div>
    </>
  );
}

