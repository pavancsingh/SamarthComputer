import React from 'react';
import { Briefcase, Building, FileCheck, UserCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

/**
 * Placement Component
 * 4-step placement process, Shirwal MIDC employer logo wall, and resume upload form.
 */
export default function Placement({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  const steps = [
    {
      step: "०१",
      titleMr: "प्रॅक्टिकल कॉम्प्युटर ट्रेनिंग",
      titleEn: "Practical Skill Training",
      descMr: "MS-CIT, टॅली व एक्सल मधील रिअल-वर्ल्ड प्रोजेक्ट्सवर सराव."
    },
    {
      step: "०२",
      titleMr: "रिज्युमे & मॉक इंटरव्यू",
      titleEn: "Resume & Mock Interviews",
      descMr: "प्रोफेशनल बायोडाटा बनवणे आणि मुलाखत कौशल्यांचा सराव."
    },
    {
      step: "०३",
      titleMr: "शासकीय परीक्षा उत्तीर्ण",
      titleEn: "Govt Certificate Exam",
      descMr: "MKCL आणि Tally कडून अधिकृत प्रमाणपत्र प्राप्त करणे."
    },
    {
      step: "०४",
      titleMr: "स्थानिक कंपनी इंटरव्यू",
      titleEn: "Direct Company Interviews",
      descMr: "शिरवळ MIDC आणि सातारा मधील कंपन्यांमध्ये मुलाखतीची संधी."
    }
  ];

  return (
    <section className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary font-bold text-xs px-3.5 py-1 rounded-full border border-primary/20">
            <Briefcase className="w-4 h-4 text-primary" />
            <span>{isMarathi ? 'प्लेसमेंट सेल & रोजगाराची संधी' : 'Placement Support & Career Cell'}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'शिक्षणासोबत नोकरीची हमी - समर्थ प्लेसमेंट सेल' : 'Bridging Skill Training to Employment in Shirwal MIDC'}
          </h2>

          <p className={`text-slate-600 text-sm sm:text-base ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? 'आमच्या टॅली आणि कॉम्प्युटर ऑपरेटर विद्यार्थ्यांना स्थानिक कंपन्यांमध्ये नोकरीसाठी विशेष मार्गदर्शन.'
              : 'Our dedicated placement assistance guides students towards accounting and operator roles.'}
          </p>
        </div>

        {/* 4-Step Pathway */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {steps.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl space-y-3 relative group hover:bg-white hover:shadow-lg transition-all"
            >
              <div className="text-2xl font-extrabold text-accent-gold">{item.step}</div>
              <h3 className={`font-bold text-base text-slate-900 ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi ? item.titleMr : item.titleEn}
              </h3>
              <p className={`text-xs text-slate-600 leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi ? item.descMr : item.descEn}
              </p>
            </div>
          ))}
        </div>

        {/* Local Employer Strip */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 text-center space-y-4">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            {isMarathi ? 'स्थानिक रोजगार पार्टनर कंपन्या (Shirwal & Satara Region)' : 'Hiring Partners & Local Employment Destinations'}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-bold text-slate-300">
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl">Accounting Firms</span>
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl">Shirwal MIDC Units</span>
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl">Local Co-op Banks</span>
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl">Retail Supermarkets</span>
            <span className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl">Govt Service Outlets</span>
          </div>
        </div>

      </div>
    </section>
  );
}
