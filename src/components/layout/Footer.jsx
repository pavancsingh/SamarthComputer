import React, { useState, useEffect } from 'react';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * Footer Component — Stitch Design System
 * Dark footer matching Stitch screens: bg-on-background (#191c1e)
 * Brand in text-primary-fixed, links in text-surface-variant/80
 * Features a single clean Admin Portal Login button.
 */
export default function Footer({ lang = 'mr', onNavigate }) {
  const isMarathi = lang === 'mr';
  const [settings, setSettings] = useState(sharedStore.getSiteSettings());

  useEffect(() => {
    const unsub = sharedStore.subscribe(() => {
      setSettings(sharedStore.getSiteSettings());
    });
    return () => unsub();
  }, []);

  const courseLinks = [
    { id: 'courses',  labelEn: 'All Courses',     labelMr: 'सर्व कोर्सेस' },
    { id: 'courses',  labelEn: 'MS-CIT (MKCL)',    labelMr: 'MS-CIT (कोर्स)' },
    { id: 'courses',  labelEn: 'Tally Prime + GST', labelMr: 'टॅली प्राइम + GST' },
    { id: 'courses',  labelEn: 'Advanced Excel',    labelMr: 'ॅड्वान्स एक्सल' },
  ];

  const serviceLinks = [
    { id: 'services', labelEn: 'All Services',      labelMr: 'सर्व सेवा' },
    { id: 'services', labelEn: 'Govt Certificates', labelMr: 'शासकीय दाखले' },
    { id: 'services', labelEn: 'PAN Card Services',  labelMr: 'पॅन कार्ड सेवा' },
    { id: 'services', labelEn: 'CSC / Digital Seva', labelMr: 'CSC / डिजिटल सेवा' },
  ];

  const quickLinks = [
    { id: 'about',     labelEn: 'About Us',      labelMr: 'आमच्याबद्दल' },
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
          <div className="flex items-center gap-3">
            <img
              key={settings?.logoUrl || 'footer-logo'}
              src={settings?.logoUrl || '/assets/logos/samarth-main-logo.png'}
              alt="Samarth Computers Logo"
              className="w-12 h-12 object-contain bg-white rounded-xl p-1 shadow-sm border border-white/20"
              onError={(e) => { e.currentTarget.src = '/assets/logos/samarth-main-logo.png'; }}
            />
            <span className="text-headline-md font-headline-lg text-primary-fixed">
              Samarth Computers
            </span>
          </div>
          <p className="font-body-md text-label-bold text-surface-variant/80 leading-relaxed">
            {settings?.footerTagline || 'Empowering students and citizens with quality computer education and fast-track digital government services.'}
          </p>
          <div className="text-label-bold font-label-bold text-surface-variant/80 mt-sm space-y-1">
            <div>📍 {isMarathi ? (settings?.contactAddressMr || 'Near Rajendra Vidhalya, Khandala, Satara') : (settings?.contactAddressEn || 'Near Rajendra Vidhalya, Khandala, Satara')}</div>
            <div className="pt-1 flex flex-wrap items-center gap-2">
              <a
                href={`tel:${settings?.callCtaPhone || settings?.contactPhone || '+919552345061'}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all hover:scale-105"
                title="Call Samarth Computers"
              >
                <span>📞 {isMarathi ? (settings?.callCtaTextMr || 'कॉल करा: ' + (settings?.contactPhone || '+91 95523 45061')) : (settings?.callCtaTextEn || 'Call Now: ' + (settings?.contactPhone || '+91 95523 45061'))}</span>
              </a>
            </div>

            {/* Social Media Icon Badges */}
            <div className="flex items-center gap-2 pt-2">
              {settings?.socialFacebook && (
                <a
                  href={settings.socialFacebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook Page"
                  className="w-8 h-8 rounded-xl bg-blue-600/20 hover:bg-blue-600 text-blue-400 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="Facebook Page"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
              )}
              {settings?.socialInstagram && (
                <a
                  href={settings.socialInstagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram Profile"
                  className="w-8 h-8 rounded-xl bg-pink-600/20 hover:bg-pink-600 text-pink-400 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="Instagram Profile"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
              )}
              {settings?.socialYoutube && (
                <a
                  href={settings.socialYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube Channel"
                  className="w-8 h-8 rounded-xl bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="YouTube Channel"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              )}
              {settings?.contactWhatsapp && (
                <a
                  href={`https://wa.me/${settings.contactWhatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp Direct Chat"
                  className="w-8 h-8 rounded-xl bg-emerald-600/20 hover:bg-emerald-600 text-emerald-400 hover:text-white flex items-center justify-center transition-all duration-200 shadow-sm"
                  title="WhatsApp Direct Chat"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Courses Links */}
        <div className="flex flex-col gap-sm">
          <h4 className="font-label-bold text-white mb-sm">{isMarathi ? 'कोर्सेस' : 'Courses'}</h4>
          {courseLinks.map((link, idx) => (
            <button
              key={`course-${idx}`}
              type="button"
              onClick={() => onNavigate && onNavigate(link.id)}
              className="font-body-md text-surface-variant/80 hover:text-primary-fixed transition-colors duration-200 text-left text-sm"
            >
              {isMarathi ? link.labelMr : link.labelEn}
            </button>
          ))}
        </div>

        {/* Services Links */}
        <div className="flex flex-col gap-sm">
          <h4 className="font-label-bold text-white mb-sm">{isMarathi ? 'ऑनलाइन सेवा' : 'Services'}</h4>
          {serviceLinks.map((link, idx) => (
            <button
              key={`service-${idx}`}
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
            {settings?.copyrightText || '© 2026 Samarth Computers Khandala. All rights reserved.'}
          </span>
        </div>
      </div>
    </footer>
  );
}
