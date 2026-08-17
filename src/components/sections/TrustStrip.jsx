import React from 'react';

/**
 * TrustStrip Component — Stitch Design System
 * Marquee trust strip matching 08_immersive_animated_experience.html
 * Section 5: "RECOGNIZED & CERTIFIED BY" with animated marquee scroll
 */
const TRUST_ITEMS = [
  { icon: 'verified', labelMr: 'MKCL अधिकृत केंद्र', labelEn: 'MKCL Authorized Center' },
  { icon: 'account_balance', labelMr: 'महाराष्ट्र शासन मान्यताप्राप्त', labelEn: 'Govt. of Maharashtra Recognized' },
  { icon: 'workspace_premium', labelMr: 'सीएससी व महाऑनलाइन सेतू केंद्र', labelEn: 'CSC & MahaOnline Service Center' },
  { icon: 'school', labelMr: 'MS-CIT अधिकृत प्रशिक्षण केंद्र', labelEn: 'MS-CIT Training Center' },
];

// Duplicate to create seamless infinite scroll
const ALL_ITEMS = [...TRUST_ITEMS, ...TRUST_ITEMS];

export default function TrustStrip({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';
  return (
    <section className="border-y border-slate-200/80 bg-slate-50/60 py-6 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <p className={`text-center mb-5 ${isMarathi ? 'marathi-text font-bold text-xs text-slate-500' : 'text-xs font-bold uppercase tracking-wider text-slate-500'}`}>
          {isMarathi ? 'अधिकृत मान्यता व सेतू केंद्र' : 'Recognized Center & Service Desk'}
        </p>

        {/* Marquee Container */}
        <div className="overflow-hidden whitespace-nowrap relative">
          <div className="marquee-track flex gap-12 items-center opacity-85 hover:opacity-100 hover:[animation-play-state:paused] transition-all duration-500 pr-12">
            {ALL_ITEMS.map((item, idx) => (
              <div
                key={`trust-${idx}-${item.labelEn}`}
                className="flex items-center gap-2.5 flex-shrink-0"
              >
                <span className="material-symbols-outlined text-2xl text-primary shrink-0">
                  {item.icon}
                </span>
                <span className={`font-bold text-sm text-slate-800 whitespace-nowrap ${isMarathi ? 'marathi-text font-bold' : ''}`}>
                  {isMarathi ? item.labelMr : item.labelEn}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
