import React, { useState, useEffect } from 'react';
import { Menu, X, ShieldCheck, Phone } from 'lucide-react';
import Navbar from './Navbar';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * Header Component — Stitch Design System
 * Sticky glassmorphic top app bar: brand lockup, desktop nav, Call Now + Apply Now CTAs.
 * Matches Stitch screens: bg-white/80 backdrop-blur-xl h-20 max-w-7xl
 */
export default function Header({ lang = 'mr', onMobileMenuToggle, isMobileMenuOpen, currentView, onNavigate }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [settings, setSettings] = useState(sharedStore.getSiteSettings());
  const isMarathi = lang === 'mr';

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll, { passive: true });
    const unsubscribe = sharedStore.subscribe(() => setSettings(sharedStore.getSiteSettings()));
    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-xl border-surface-variant/70 shadow-stitch-sm'
          : 'bg-white/80 backdrop-blur-xl border-surface-variant/50 shadow-sm'
      }`}
    >
      <div className="flex justify-between items-center w-full px-4 md:px-8 max-w-7xl mx-auto h-20">

        {/* Brand */}
        <button
          type="button"
          onClick={() => onNavigate && onNavigate('home')}
          className="flex items-center gap-3 group text-left shrink-0"
        >
          <img
            key={settings.logoUrl || 'logo'}
            src={settings.logoUrl || '/assets/logos/samarth-main-logo.png'}
            alt="Samarth Computers"
            className="w-11 h-11 object-contain rounded-xl border border-surface-variant shadow-stitch-sm group-hover:scale-105 transition-all bg-white p-0.5"
            onError={(e) => {
              e.currentTarget.src = '/assets/logos/samarth-main-logo.png';
            }}
          />
          <div className="hidden sm:block">
            {/* Stitch: text-headline-md font-headline-lg text-primary */}
            <div className="text-headline-md font-headline-lg text-primary tracking-tight leading-tight">
              Samarth Computers
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <ShieldCheck className="w-3 h-3 text-stitch-emerald" />
              <span className="text-label-caps font-label-caps text-secondary">
                MKCL Authorized • CSC Center
              </span>
            </div>
          </div>
        </button>

        {/* Desktop Navigation — hidden on mobile */}
        <Navbar lang={lang} currentView={currentView} onNavigate={onNavigate} />

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          {/* Call Now Primary CTA */}
          <a
            href={`tel:${settings.callCtaPhone || settings.contactPhone || '+919552345061'}`}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-black text-xs rounded-xl border border-emerald-300/80 shadow-sm transition-all hover:scale-105"
            title={`Call Institute: ${settings.callCtaPhone || settings.contactPhone || '+91 95523 45061'}`}
          >
            <Phone className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
            <span>{isMarathi ? (settings.callCtaTextMr || '📞 कॉल करा') : (settings.callCtaTextEn || 'Call Now')}</span>
          </a>

          {/* Apply Now — Stitch primary button */}
          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('inquiry-form');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
              else if (onNavigate) onNavigate('contact');
            }}
            className="px-4 py-2 text-xs font-black bg-primary text-white rounded-xl shadow-sm hover:bg-stitch-red-dark transition-all border border-primary/20 btn-interactive"
          >
            {isMarathi ? 'प्रवेश घ्या' : 'Apply Now'}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          onClick={onMobileMenuToggle}
          className="md:hidden p-2 text-secondary hover:text-primary hover:bg-surface-container-low rounded-xl transition-colors"
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
    </header>
  );
}
