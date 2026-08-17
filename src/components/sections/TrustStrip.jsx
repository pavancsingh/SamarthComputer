import React from 'react';

/**
 * TrustStrip Component — Stitch Design System
 * Marquee trust strip matching 08_immersive_animated_experience.html
 * Section 5: "RECOGNIZED & CERTIFIED BY" with animated marquee scroll
 */
const TRUST_ITEMS = [
  { icon: 'verified', labelMr: 'MKCL अधिकृत केंद्र', labelEn: 'MKCL Authorized Centre' },
  { icon: 'account_balance', labelMr: 'महाराष्ट्र शासन', labelEn: 'Government of Maharashtra' },
  { icon: 'workspace_premium', labelMr: 'CSC / महाऑनलाइन सेवा केंद्र', labelEn: 'CSC / MahaOnline Service Centre' },
  { icon: 'school', labelMr: 'MS-CIT प्रशिक्षण केंद्र', labelEn: 'MS-CIT Training Centre' },
];

// Duplicate to create seamless infinite scroll
const ALL_ITEMS = [...TRUST_ITEMS, ...TRUST_ITEMS];

export default function TrustStrip({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';
  return (
    <section className="border-y border-surface-variant/30 bg-surface/50 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <p className="text-center text-label-caps font-label-caps text-secondary mb-6 tracking-widest">
          {isMarathi ? 'अधिकृत मान्यता व सेवा केंद्र' : 'Recognized Centre & Service Desk'}
        </p>

        {/* Marquee Container */}
        <div className="overflow-hidden whitespace-nowrap relative">
          <div className="marquee-track flex gap-16 items-center opacity-70 grayscale hover:grayscale-0 hover:[animation-play-state:paused] transition-all duration-500 pr-16">
            {ALL_ITEMS.map((item, idx) => (
              <div
                key={`trust-${idx}-${item.labelEn}`}
                className="flex items-center gap-sm flex-shrink-0 hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined text-3xl text-primary fill">
                  {item.icon}
                </span>
                <span className={`font-label-bold text-lg text-text-primary whitespace-nowrap ${isMarathi ? 'marathi-text' : ''}`}>
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
