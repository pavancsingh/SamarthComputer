import React from 'react';

/**
 * Footer Component — Stitch Design System
 * Dark footer matching Stitch screens: bg-on-background (#191c1e)
 * Brand in text-primary-fixed, links in text-surface-variant/80
 * Features a single clean Admin Portal Login button.
 */
export default function Footer({ lang = 'mr', onNavigate }) {
  const isMarathi = lang === 'mr';

  const quickLinks = [
    { id: 'about',     labelEn: 'About Us',      labelMr: 'आमच्याबद्दल' },
    { id: 'courses',   labelEn: 'Courses',        labelMr: 'कोर्सेस' },
    { id: 'faculty',   labelEn: 'Faculty',        labelMr: 'शिक्षक वृंद' },
    { id: 'contact',   labelEn: 'Contact',        labelMr: 'संपर्क' },
  ];

  const legalLinks = [
    { id: 'terms',   labelEn: 'Terms of Service',  labelMr: 'सेवा अटी' },
    { id: 'privacy', labelEn: 'Privacy Policy',    labelMr: 'गोपनीयता' },
    { id: 'refund',  labelEn: 'Refund Policy',     labelMr: 'परतावा धोरण' },
  ];

  return (
    <footer className="bg-on-background text-primary-fixed w-full pb-20 md:pb-0">
      <div className="w-full py-xl px-gutter max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-lg">

        {/* Brand + Description */}
        <div className="flex flex-col gap-sm max-w-xs">
          <span className="text-headline-md font-headline-lg text-primary-fixed">
            Samarth Computers
          </span>
          <p className="font-body-md text-label-bold text-surface-variant/80 leading-relaxed">
            Empowering the next generation of digital leaders through quality computer education and government services.
          </p>
          <div className="text-label-bold font-label-bold text-surface-variant/60 mt-sm">
            <div>📍 Near Rajendra Vidhalya, Khandala, Satara</div>
            <div>📞 +91 95523 45061</div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-sm">
          <h4 className="font-label-bold text-white mb-sm">Quick Links</h4>
          {quickLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => onNavigate && onNavigate(link.id)}
              className="font-body-md text-surface-variant/80 hover:text-primary-fixed transition-colors duration-200 text-left text-sm"
            >
              {isMarathi ? link.labelMr : link.labelEn}
            </button>
          ))}
        </div>

        {/* Legal Links */}
        <div className="flex flex-col gap-sm">
          <h4 className="font-label-bold text-white mb-sm">Legal</h4>
          {legalLinks.map((link) => (
            <a
              key={link.id}
              href="#"
              className="font-body-md text-surface-variant/80 hover:text-primary-fixed transition-colors duration-200 text-sm"
            >
              {isMarathi ? link.labelMr : link.labelEn}
            </a>
          ))}
        </div>

        {/* Certifications & Single Admin Portal Login Button */}
        <div className="flex flex-col gap-sm">
          <h4 className="font-label-bold text-white mb-sm">Certifications</h4>
          <div className="text-sm text-surface-variant/80 space-y-1 font-body-md mb-md">
            <div>🏛️ MKCL Authorized Center</div>
            <div>🏛️ CSC / MahaOnline Center</div>
            <div>📋 ALC: 13210399 / 13210273</div>
          </div>

          {/* SINGLE Admin Login Button */}
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('admin')}
            className="inline-flex items-center justify-center gap-xs px-md py-sm bg-primary/20 hover:bg-primary text-primary-fixed hover:text-white border border-primary/40 rounded-lg text-label-bold font-label-bold text-xs transition-all duration-200 shadow-sm btn-interactive"
          >
            <span className="material-symbols-outlined text-[16px]">admin_panel_settings</span>
            <span>{isMarathi ? 'एडमिन पोर्टल लॉगिन' : 'Admin Portal Login'}</span>
          </button>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="w-full border-t border-surface-variant/20 py-sm">
        <div className="max-w-7xl mx-auto px-gutter flex justify-center">
          <span className="font-body-md text-surface-variant/60 text-sm text-center">
            © 2024 Samarth Computers &amp; CSC Services, Khandala. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
