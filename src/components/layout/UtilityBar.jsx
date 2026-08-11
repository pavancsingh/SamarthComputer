import React from 'react';
import { MapPin, Phone, Clock, Globe } from 'lucide-react';

/**
 * UtilityBar Component - Google Stitch Design
 * Top utility bar displaying official center location, working hours, phone numbers, and language switcher.
 */
import { sharedStore } from '../../repositories/sharedStore';

export default function UtilityBar({ lang = 'mr', onLanguageChange }) {
  const isMarathi = lang === 'mr';
  const [settings, setSettings] = React.useState(sharedStore.getSiteSettings());

  React.useEffect(() => {
    const unsub = sharedStore.subscribe(() => setSettings(sharedStore.getSiteSettings()));
    return () => unsub();
  }, []);

  return (
    <div className="bg-stitch-navy text-slate-200 text-xs py-2 border-b border-stitch-slate-card/60 relative z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Left Side: Center Location & Working Hours */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1.5 text-slate-300 hover:text-white transition-colors cursor-pointer">
            <MapPin className="w-3.5 h-3.5 text-stitch-red shrink-0" aria-hidden="true" />
            <span className={isMarathi ? 'marathi-text font-medium text-slate-200' : 'font-medium text-slate-200'}>
              {isMarathi
                ? (settings.contactAddressMr || 'राजेंद्र विद्यालयाजवळ, खंडाळा, ता. खंडाळा, जि. सातारा ४१२८०२')
                : (settings.contactAddressEn || 'Near Rajendra Vidhalya Khandala, Tal Khandala Dist Satara 412802')}
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5 text-slate-400">
            <Clock className="w-3.5 h-3.5 text-stitch-amber shrink-0" aria-hidden="true" />
            <span>
              {isMarathi
                ? (settings.contactHoursMr || 'सकाळी ८:०० - रात्री ८:०० (सोम-शनि)')
                : (settings.contactHoursEn || '8:00 AM - 8:00 PM (Mon-Sat)')}
            </span>
          </div>
        </div>

        {/* Right Side: Direct Phone & Language Toggle Pill */}
        <div className="flex items-center gap-4">
          <a
            href={`tel:${settings.callCtaPhone || settings.contactPhone || '+919552345061'}`}
            className="flex items-center gap-1.5 font-bold text-white hover:text-stitch-red-border transition-colors shrink-0"
          >
            <Phone className="w-3.5 h-3.5 text-stitch-emerald" aria-hidden="true" />
            <span>{settings.contactPhone || '+91 95523 45061'}</span>
          </a>

          {/* Language Switcher Pill */}
          <div className="flex items-center bg-stitch-slate-dark/90 p-0.5 rounded-full border border-slate-700/80 shadow-stitch-sm">
            <Globe className="w-3.5 h-3.5 text-slate-400 ml-2 mr-1" aria-hidden="true" />
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-all ${
                lang === 'en' 
                  ? 'bg-stitch-red text-white shadow-stitch-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
              aria-label="Switch to English"
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => onLanguageChange('mr')}
              className={`px-2.5 py-0.5 text-[11px] font-bold rounded-full transition-all marathi-text ${
                lang === 'mr' 
                  ? 'bg-stitch-red text-white shadow-stitch-sm' 
                  : 'text-slate-400 hover:text-white'
              }`}
              aria-label="मराठीमध्ये बदला"
            >
              मराठी
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}


