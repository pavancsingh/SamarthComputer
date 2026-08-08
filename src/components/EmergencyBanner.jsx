import React, { useState } from 'react';
import { Sparkles, X, AlertCircle } from 'lucide-react';

/**
 * EmergencyBanner Component - Google Stitch Design
 * Top urgency notification bar for admission deadlines, exam alerts, and announcements.
 */
export default function EmergencyBanner({ lang = 'mr', onLanguageChange }) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const isMarathi = lang === 'mr';

  return (
    <aside 
      className="bg-gradient-to-r from-stitch-slate-dark via-stitch-navy to-stitch-slate-dark text-white text-xs py-2 px-4 border-b border-stitch-slate-card/80 shadow-stitch-sm relative z-50 transition-all" 
      role="region" 
      aria-label="Emergency Announcement"
    >
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="inline-flex items-center gap-1.5 bg-stitch-red/20 text-stitch-red-border font-extrabold text-[11px] px-2.5 py-0.5 rounded-full border border-stitch-red/40 animate-pulse">
            <AlertCircle className="w-3.5 h-3.5 text-stitch-red" />
            <span>{isMarathi ? '🚨 नवीन बॅच प्रवेश सुरू 2026' : '🚨 NEW BATCH ADMISSION 2026'}</span>
          </span>

          <p className={`text-slate-200 text-xs font-medium hidden sm:block ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? 'MS-CIT व टॅली प्राइम प्रवेशाची अंतिम तारीख १५ ऑगस्ट. खंडाळा सेंटरमध्ये मर्यादित जागा!'
              : 'MS-CIT & Tally Prime admission deadline Aug 15. Limited seats in Khandala center!'}
          </p>
        </div>

        <div className="flex items-center gap-3 ml-auto sm:ml-0">
          <a 
            href="#inquiry-form" 
            className="inline-flex items-center gap-1 bg-stitch-red hover:bg-stitch-red-dark text-white font-extrabold text-[11px] px-3 py-1 rounded-full shadow-stitch-sm transition-all hover:scale-105"
          >
            <Sparkles className="w-3 h-3 text-red-200" />
            <span>{isMarathi ? '⚡ आत्ताच जागा निश्चित करा' : '⚡ Reserve Seat Now'}</span>
          </a>

          <button 
            type="button" 
            className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            onClick={() => setIsVisible(false)}
            aria-label={isMarathi ? 'बंद करा' : 'Close'}
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}

