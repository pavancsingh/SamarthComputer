import React, { useState, useEffect } from 'react';
import { Menu, X, MessageCircle, Sparkles, ShieldCheck } from 'lucide-react';
import Navbar from './Navbar';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * Header Component - Google Stitch Design System
 * Glassmorphic sticky header containing brand logo lockup, MKCL/CSC authority tags,
 * navbar menu links, WhatsApp helpline, and primary conversion action button.
 */
export default function Header({ lang = 'mr', onMobileMenuToggle, isMobileMenuOpen, currentView, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [settings, setSettings] = useState(sharedStore.getSiteSettings());
  const isMarathi = lang === 'mr';

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    const unsubscribe = sharedStore.subscribe(() => {
      setSettings(sharedStore.getSiteSettings());
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  return (
    <header 
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'py-2.5 bg-white/90 backdrop-blur-xl border-b border-slate-200/90 shadow-stitch-md' 
          : 'py-3.5 bg-white/80 backdrop-blur-lg border-b border-slate-200/60'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Logo Lockup */}
        <button 
          type="button"
          onClick={() => onNavigate && onNavigate('home')} 
          className="flex items-center gap-3 group text-left shrink-0"
        >
          {settings.logoUrl ? (
            <img 
              src={settings.logoUrl} 
              alt="Samarth Computers Logo" 
              className="w-10 h-10 object-contain rounded-2xl border border-slate-200 shadow-stitch-sm group-hover:scale-105 transition-all"
            />
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-stitch-red-dark via-stitch-red to-rose-500 text-white flex items-center justify-center font-extrabold text-xl shadow-stitch-sm group-hover:scale-105 transition-all">
              S
            </div>
          )}
          <div>
            <div className="font-extrabold text-stitch-slate-dark text-base sm:text-lg leading-tight tracking-tight flex items-center gap-2">
              <span className={isMarathi ? 'marathi-text font-bold' : ''}>समर्थ कॉम्प्युटर्स</span>
              <span className="inline-flex items-center gap-1 bg-stitch-red-light text-stitch-red font-extrabold text-[10px] px-2 py-0.5 rounded-full border border-stitch-red-border/60">
                <ShieldCheck className="w-3 h-3 text-stitch-red" />
                MKCL & CSC
              </span>
            </div>
            <div className="text-slate-500 text-[11px] font-semibold tracking-wide">
              Samarth Computers, Khandala
            </div>
          </div>
        </button>

        {/* Desktop Navigation */}
        <Navbar lang={lang} currentView={currentView} onNavigate={onNavigate} />

        {/* Desktop Primary CTAs */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          {/* WhatsApp Direct Button */}
          <a
            href="https://wa.me/919552345061?text=Hello%20Samarth%20Computers,%20I%20want%20information%20about%20courses/services."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 bg-emerald-50 hover:bg-emerald-100/80 text-emerald-800 font-bold text-xs px-3.5 py-2.5 rounded-2xl border border-emerald-200/80 shadow-stitch-sm transition-all hover:scale-[1.03]"
            title="WhatsApp Helpline"
          >
            <MessageCircle className="w-4 h-4 text-stitch-whatsapp fill-emerald-100" />
            <span>{isMarathi ? 'व्हाट्सॲप' : 'WhatsApp'}</span>
          </a>

          {/* Primary Demo Button */}
          <a
            href="#inquiry-form"
            className="flex items-center gap-1.5 bg-gradient-to-r from-stitch-red to-stitch-red-dark hover:from-stitch-red-dark hover:to-red-800 text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-stitch-sm hover:shadow-stitch-glow transition-all hover:scale-[1.03] active:scale-95"
          >
            <Sparkles className="w-4 h-4 text-red-200" />
            <span className={isMarathi ? 'marathi-text font-bold' : ''}>
              {isMarathi ? 'मोफत डेमो क्लास बुक करा' : 'Book Free Demo'}
            </span>
          </a>
        </div>

        {/* Mobile Hamburger Toggle Button */}
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="lg:hidden p-2.5 rounded-2xl text-slate-800 hover:bg-slate-100 transition-colors shrink-0"
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-slate-900" />
          ) : (
            <Menu className="w-6 h-6 text-slate-900" />
          )}
        </button>
      </div>
    </header>
  );
}



