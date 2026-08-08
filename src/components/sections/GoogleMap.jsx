import React from 'react';
import { MapPin, Navigation } from 'lucide-react';

/**
 * GoogleMap Component - Google Stitch Design
 * Full-width interactive map section with floating address card and turn-by-turn navigation link.
 */
export default function GoogleMap({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  return (
    <section className="relative w-full h-[450px] bg-slate-200 overflow-hidden border-b border-slate-300">
      {/* Map Embed Iframe */}
      <iframe
        title="Samarth Computers Khandala Google Map Location"
        src="https://maps.google.com/maps?q=Khandala+Bus+Stand+Satara&t=&z=15&ie=UTF8&iwloc=&output=embed"
        className="w-full h-full border-0 filter grayscale-[15%] opacity-95 hover:grayscale-0 transition-all duration-500"
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Floating Card Overlay */}
      <div className="absolute bottom-6 left-4 sm:left-8 bg-stitch-slate-dark text-white p-6 rounded-3xl shadow-stitch-lg border border-slate-700/80 max-w-sm z-20">
        <div className="flex items-start gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-stitch-amber/20 border border-stitch-amber/40 flex items-center justify-center text-stitch-amber shrink-0 shadow-stitch-sm">
            <MapPin className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <h4 className={`font-black text-sm sm:text-base text-white ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'समर्थ कॉम्प्युटर्स, खंडाळा' : 'Samarth Computers, Khandala'}
            </h4>
            <p className={`text-xs text-slate-300 font-medium ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi
                ? '📍 मुख्य एसटी बस स्थानकासमोर, मुख्य रस्ता, खंडाळा'
                : '📍 Opposite Main Bus Stand, Main Road, Khandala'}
            </p>
            <div className="text-[10px] text-stitch-amber font-extrabold pt-1">
              {isMarathi ? '✓ बस स्थानकावरून फक्त २ मिनिटांचे अंतर' : '✓ 2-Minute Walk from Khandala Bus Stand'}
            </div>
          </div>
        </div>

        <a
          href="https://maps.google.com/maps?q=Khandala+Bus+Stand+Satara"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 w-full inline-flex items-center justify-center gap-2 bg-stitch-amber hover:bg-amber-400 text-slate-950 font-black text-xs py-3 rounded-2xl shadow-stitch-glow transition-all hover:scale-105"
        >
          <Navigation className="w-4 h-4 text-slate-950" />
          <span>{isMarathi ? 'गूगल मॅपवर रस्ता पहा' : 'Get Driving Directions'}</span>
        </a>
      </div>
    </section>
  );
}

