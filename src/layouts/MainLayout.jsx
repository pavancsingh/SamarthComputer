import React, { useState } from 'react';
import EmergencyBanner from '../components/EmergencyBanner';
import UtilityBar from '../components/layout/UtilityBar';
import Header from '../components/layout/Header';
import MobileNav from '../components/layout/MobileNav';
import Footer from '../components/layout/Footer';

/**
 * MainLayout Component
 * Primary layout wrapper enforcing Module 1 global layout standards.
 * When currentView is 'admin', bypasses public headers/footers to provide a full-screen, isolated Admin UI.
 */
export default function MainLayout({ children, lang = 'mr', onLanguageChange, currentView, onNavigate }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  // Dedicated Admin layout — no public website header, navbar, emergency banner, footer or mobile nav
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-[#F8FAFC] text-slate-800 antialiased font-sans">
        {children}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 selection:bg-accent-gold selection:text-slate-950">
      {/* 1. Emergency Urgency Banner */}
      <EmergencyBanner lang={lang} onLanguageChange={onLanguageChange} />

      {/* 2. Top Utility Announcement Bar */}
      <UtilityBar 
        lang={lang} 
        onLanguageChange={onLanguageChange} 
      />

      {/* 3. Primary Sticky Header & Desktop Navigation */}
      <Header 
        lang={lang} 
        onMobileMenuToggle={toggleMobileMenu} 
        isMobileMenuOpen={isMobileMenuOpen}
        currentView={currentView}
        onNavigate={onNavigate}
      />

      {/* 4. Main Page View Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* 5. Footer */}
      <Footer lang={lang} onNavigate={onNavigate} />

      {/* 6. Mobile Drawer & Persistent Bottom Action Bar */}
      <MobileNav 
        isOpen={isMobileMenuOpen} 
        onClose={() => setIsMobileMenuOpen(false)} 
        lang={lang} 
        currentView={currentView}
        onNavigate={onNavigate}
      />

    </div>
  );
}
