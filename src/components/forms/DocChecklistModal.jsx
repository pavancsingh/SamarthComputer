import React from 'react';
import { FileText, X, CheckCircle2, MessageCircle, Clock, ShieldCheck, ArrowRight } from 'lucide-react';

/**
 * DocChecklistModal Component
 * Interactive modal displaying mandatory document checklists and direct WhatsApp application link.
 */
export default function DocChecklistModal({ isOpen, onClose, service = null, lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  if (!isOpen || !service) return null;

  const docs = isMarathi ? service.requiredDocsMr : service.requiredDocsEn;
  const steps = isMarathi ? service.stepsMr : service.stepsEn;

  const whatsappMessage = `https://wa.me/919822000000?text=Hello%20Samarth%20Computers,%20I%20want%20to%20apply%20for%20${encodeURIComponent(service.titleEn)}.`;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-navy-dark to-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary/20 border border-secondary/40 flex items-center justify-center text-secondary-cyan">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-extrabold text-base text-white ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi ? service.titleMr : service.titleEn}
              </h3>
              <div className="text-[11px] text-accent-gold font-bold">
                ⏱️ {isMarathi ? service.timelineMr : service.timelineEn}
              </div>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          
          {/* Overview */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-1">
            <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              {isMarathi ? 'सेवा परिचय:' : 'Service Summary:'}
            </div>
            <p className={`text-xs text-slate-700 leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? service.overviewMr : service.overviewEn}
            </p>
          </div>

          {/* Mandatory Document Checklist */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className={`font-extrabold text-sm text-slate-900 ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi ? 'आवश्यक कागदपत्रांची यादी (Mandatory Documents):' : 'Mandatory Document Checklist:'}
              </h4>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                ✓ 100% Validated
              </span>
            </div>

            <div className="space-y-2">
              {docs.map((doc, dIdx) => (
                <div key={dIdx} className="bg-white border border-slate-200 p-3 rounded-xl flex items-center gap-2.5 text-xs font-semibold text-slate-800 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{doc}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="text-xs font-bold text-slate-900">
              {isMarathi ? 'प्रक्रिया कशी होते?' : 'Application Process:'}
            </div>
            <ol className="space-y-1.5 text-xs text-slate-600 list-decimal pl-4">
              {steps.map((st, sIdx) => (
                <li key={sIdx}>{st}</li>
              ))}
            </ol>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-slate-100 space-y-2">
            <a
              href={whatsappMessage}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-whatsapp hover:bg-whatsapp-dark text-slate-950 font-extrabold text-xs py-3.5 rounded-xl shadow-md transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-slate-950" />
              <span>{isMarathi ? 'कागदपत्रे व्हाट्सॲपवर पाठवा' : 'Send Documents via WhatsApp'}</span>
            </a>

            <div className="text-center text-[10px] text-slate-400">
              📍 {isMarathi ? 'किंवा केंद्रावर थेट आधार कार्ड घेऊन या.' : 'Or visit Samarth Computers center near Khandala Bus Stand.'}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
