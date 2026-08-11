import React from 'react';
import { X, Home, BookOpen, FileText, Building2, Clock, Info, Users, ShieldCheck, Phone, LogIn } from 'lucide-react';

/**
 * MobileNav Component — Stitch Design System
 * Provides both:
 * 1. Slide-over drawer when hamburger button is clicked (isOpen = true)
 * 2. Persistent bottom navigation bar for mobile (hidden on desktop)
 */
import { sharedStore } from '../../repositories/sharedStore';

export default function MobileNav({ isOpen = false, onClose, lang = 'mr', currentView = 'home', onNavigate }) {
  const isMarathi = lang === 'mr';
  const [settings, setSettings] = React.useState(sharedStore.getSiteSettings());

  React.useEffect(() => {
    const unsub = sharedStore.subscribe(() => setSettings(sharedStore.getSiteSettings()));
    return () => unsub();
  }, []);

  const drawerLinks = [
    { id: 'home', labelEn: 'Home', labelMr: 'मुख्यपृष्ठ', icon: Home },
    { id: 'courses', labelEn: 'Courses', labelMr: 'कोर्सेस', icon: BookOpen },
    { id: 'services', labelEn: 'Services', labelMr: 'सेवा', icon: FileText },
    { id: 'timetable', labelEn: 'Batch Timetable', labelMr: 'वेळापत्रक', icon: Clock },
    { id: 'about', labelEn: 'About Institute', labelMr: 'आमच्याबद्दल', icon: Info },
    { id: 'faculty', labelEn: 'Faculty & Mentors', labelMr: 'शिक्षक वृंद', icon: Users },
    { id: 'verification', labelEn: 'Certificate Verification', labelMr: 'प्रमाणपत्र पडताळणी', icon: ShieldCheck },
    { id: 'contact', labelEn: 'Contact Us', labelMr: 'संपर्क', icon: Phone },
    { id: 'admin', labelEn: 'Admin Portal', labelMr: 'ॲडमिन पोर्टल', icon: LogIn },
  ];

  const bottomNavItems = [
    { id: 'home', labelEn: 'Home', labelMr: 'होम', iconFill: 'home' },
    { id: 'courses', labelEn: 'Courses', labelMr: 'कोर्सेस', iconFill: 'school' },
    { id: 'services', labelEn: 'Services', labelMr: 'सेवा', iconFill: 'account_balance' },
    { id: 'timetable', labelEn: 'Schedule', labelMr: 'वेळापत्रक', iconFill: 'calendar_month' },
    { id: 'contact', labelEn: 'Contact', labelMr: 'संपर्क', iconFill: 'phone' },
  ];

  return (
    <>
      {/* 1. Mobile Drawer Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm md:hidden flex justify-end">
          <div className="w-4/5 max-w-sm bg-white h-full p-6 shadow-2xl overflow-y-auto flex flex-col justify-between animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-primary text-white flex items-center justify-center font-black">
                    S
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-slate-900">Samarth Computers</div>
                    <div className="text-[10px] text-slate-500 font-bold">MKCL &amp; CSC Center</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-1">
                {drawerLinks.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentView === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        if (onNavigate) onNavigate(item.id);
                        if (onClose) onClose();
                      }}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                        isActive
                          ? 'bg-stitch-red-light text-primary font-extrabold'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <Icon className={`w-4 h-4 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                      <span>{isMarathi ? item.labelMr : item.labelEn}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-2">
              <a
                href={`tel:${settings.callCtaPhone || settings.contactPhone || '+919552345061'}`}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3 rounded-xl shadow-sm flex items-center justify-center gap-2 transition-all"
              >
                <Phone className="w-4 h-4 text-white fill-white/20" />
                <span>{isMarathi ? (settings.callCtaTextMr || '📞 थेट कॉल करा (Call Now)') : (settings.callCtaTextEn || `Call Now (${settings.callCtaPhone || '+91 95523 45061'})`)}</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  if (onNavigate) onNavigate('contact');
                  if (onClose) onClose();
                }}
                className="w-full bg-primary text-white font-extrabold text-xs py-3 rounded-xl shadow-sm"
              >
                {isMarathi ? 'प्रवेश घ्या / चौकशी' : 'Apply Now / Inquiry'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. Fixed Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 w-full z-40 flex justify-around items-center px-2 py-2 md:hidden bg-white/95 backdrop-blur-lg border-t border-slate-200 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] rounded-t-2xl">
        {bottomNavItems.map((item) => {
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate && onNavigate(item.id)}
              className={`flex flex-col items-center justify-center rounded-xl px-2 py-1 transition-all min-w-[54px] min-h-[44px] ${
                isActive ? 'text-primary scale-95' : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              <span
                className="material-symbols-outlined text-[22px]"
                style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
              >
                {item.iconFill}
              </span>
              <span className={`text-[10px] font-semibold mt-0.5 ${isActive ? 'font-black text-primary' : ''}`}>
                {isMarathi ? item.labelMr : item.labelEn}
              </span>
            </button>
          );
        })}

        {/* Mobile Fixed Call Now Pill */}
        <a
          href={`tel:${settings.callCtaPhone || settings.contactPhone || '+919552345061'}`}
          className="flex flex-col items-center justify-center rounded-xl px-2.5 py-1 text-emerald-700 bg-emerald-50 border border-emerald-300/80 shadow-xs active:scale-95 transition-transform min-w-[54px] min-h-[44px]"
          title="Call Now"
        >
          <Phone className="w-5 h-5 text-emerald-600 fill-emerald-600/20" />
          <span className="text-[10px] font-black text-emerald-800 mt-0.5">
            {isMarathi ? (settings.callCtaTextMr || 'कॉल करा') : 'Call Now'}
          </span>
        </a>
      </nav>
    </>
  );
}

