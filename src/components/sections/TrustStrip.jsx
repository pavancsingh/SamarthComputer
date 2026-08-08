import React from 'react';
import { ShieldCheck, Award, BookOpen, CheckCircle2 } from 'lucide-react';

/**
 * TrustStrip Component - Google Stitch Design
 * Showcase official partner accreditations: MKCL, YCMOU, Network Solutions, Edutech, and SARTHI.
 */
export default function TrustStrip({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  const trustItems = [
    {
      title: "MKCL Authorized",
      sub: "ALC: 13210399 / 13210273",
      badge: "Official Center",
      color: "text-stitch-red bg-stitch-red/10 border-stitch-red/30"
    },
    {
      title: "YCMOU Partner",
      sub: "Yashwantrao Chavan Open Univ",
      badge: "Academic Partner",
      color: "text-stitch-amber bg-stitch-amber/10 border-stitch-amber/30"
    },
    {
      title: "Network Solutions",
      sub: "IT Infrastructure & Labs",
      badge: "Tech Partner",
      color: "text-stitch-indigo bg-stitch-indigo/10 border-stitch-indigo/30"
    },
    {
      title: "Edutech Media",
      sub: "Digital Learning Content",
      badge: "Education Partner",
      color: "text-stitch-emerald bg-stitch-emerald/10 border-stitch-emerald/30"
    },
    {
      title: "SARTHI Govt Scheme",
      sub: "Skill Development Inst",
      badge: "Govt Scheme",
      color: "text-purple-400 bg-purple-500/10 border-purple-500/30"
    }
  ];

  return (
    <section className="bg-stitch-slate-dark border-y border-stitch-slate-card/80 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-5">
          <span className={`text-xs font-bold text-slate-400 uppercase tracking-widest ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'आमचे अधिकृत पार्टनर्स व मान्यता' : 'Official Government Accreditations & Educational Partners'}
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 items-center">
          {trustItems.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-slate-800/60 border border-slate-700/60 p-4 rounded-2xl text-center hover:border-slate-500/80 transition-all hover:-translate-y-0.5 shadow-stitch-sm"
            >
              <div className="font-extrabold text-xs text-white mb-0.5">{item.title}</div>
              <div className="text-[10px] text-slate-400 mb-2 line-clamp-1">{item.sub}</div>
              <span className={`inline-flex items-center gap-1 text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border ${item.color}`}>
                <CheckCircle2 className="w-2.5 h-2.5" />
                {item.badge}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

