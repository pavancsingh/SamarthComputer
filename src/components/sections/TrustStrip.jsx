import React from 'react';

/**
 * TrustStrip Component — Stitch Design System
 * Marquee trust strip matching 08_immersive_animated_experience.html
 * Section 5: "RECOGNIZED & CERTIFIED BY" with animated marquee scroll
 */
const TRUST_ITEMS = [
  { icon: 'verified',         label: 'MKCL' },
  { icon: 'account_balance',  label: 'Govt. of Maharashtra' },
  { icon: 'workspace_premium',label: 'CSC / MahaOnline' },
  { icon: 'school',           label: 'MS-CIT Authorized' },
  { icon: 'shield_check',     label: '100% Placement Support' },
  { icon: 'star',             label: '5000+ Students Trained' },
  { icon: 'laptop',           label: 'Computer Repair & Sales' },
];

// Duplicate to create seamless infinite scroll
const ALL_ITEMS = [...TRUST_ITEMS, ...TRUST_ITEMS];

export default function TrustStrip({ lang = 'mr' }) {
  return (
    <section className="border-y border-surface-variant/30 bg-surface/50 py-8 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <p className="text-center text-label-caps font-label-caps text-secondary mb-6 tracking-widest">
          RECOGNIZED &amp; CERTIFIED BY
        </p>

        {/* Marquee Container */}
        <div className="overflow-hidden whitespace-nowrap relative">
          <div className="marquee-track flex gap-16 items-center opacity-70 grayscale hover:grayscale-0 hover:[animation-play-state:paused] transition-all duration-500 pr-16">
            {ALL_ITEMS.map((item, idx) => (
              <div
                key={`trust-${idx}-${item.label}`}
                className="flex items-center gap-sm flex-shrink-0 hover:scale-105 transition-transform"
              >
                <span className="material-symbols-outlined text-3xl text-primary fill">
                  {item.icon}
                </span>
                <span className="font-label-bold text-lg text-text-primary whitespace-nowrap">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
