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
            Empowering the next generation of digital leaders through quality computer education and government services.
          </p>
          <div className="text-label-bold font-label-bold text-surface-variant/80 mt-sm space-y-1">
            <div>📍 {isMarathi ? (settings?.contactAddressMr || 'Near Rajendra Vidhalya, Khandala, Satara') : (settings?.contactAddressEn || 'Near Rajendra Vidhalya, Khandala, Satara')}</div>
            <div className="pt-1">
              <a
                href={`tel:${settings?.callCtaPhone || settings?.contactPhone || '+919552345061'}`}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all hover:scale-105"
                title="Call Samarth Computers"
              >
                <span>📞 {isMarathi ? (settings?.callCtaTextMr || 'कॉल करा: ' + (settings?.contactPhone || '+91 95523 45061')) : (settings?.callCtaTextEn || 'Call Now: ' + (settings?.contactPhone || '+91 95523 45061'))}</span>
              </a>
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
            © 2024 Samarth Computers &amp; CSC Services, Khandala. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
