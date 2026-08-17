import React, { useState, useEffect } from 'react';
import { Search, FileText, Shield, MessageCircle, ArrowRight, Phone } from 'lucide-react';
import { InquiryRepository } from '../../repositories/InquiryRepository';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * CSCServices Component — Online Services Showcase (Homepage)
 * Combines CSC & Government Services into a unified "Online Services" section.
 * Shows top 3 online services with live search, required documents, and a "View More Online Services" CTA button.
 */
export default function CSCServices({ lang = 'mr', onNavigate }) {
  const [services, setServices] = useState(() => {
    const csc = sharedStore.getCSCServices() || [];
    const govt = sharedStore.getGovtServices() || [];
    return [...csc, ...govt];
  });
  const [searchTerm, setSearchTerm] = useState('');
  const isMarathi = lang === 'mr';

  useEffect(() => {
    let isMounted = true;
    async function load() {
      try {
        const cscData = await InquiryRepository.getCSCServices('all');
        const govtData = await InquiryRepository.getGovtServices('all');
        const combined = [...(cscData || []), ...(govtData || [])];
        if (isMounted && combined.length > 0) setServices(combined);
      } catch (e) {
        console.warn('Notice loading online services:', e.message);
      }
    }
    load();

    const unsubscribe = sharedStore.subscribe(() => {
      if (isMounted) {
        const csc = sharedStore.getCSCServices() || [];
        const govt = sharedStore.getGovtServices() || [];
        const combined = [...csc, ...govt];
        if (combined.length > 0) setServices(combined);
      }
    });
    return () => {
      isMounted = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const filtered = services.filter(s => 
    (s.titleMr || s.title_mr || '').toLowerCase().includes(searchTerm.toLowerCase()) || 
    (s.titleEn || s.title_en || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.overviewMr || s.overview_mr || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (s.overviewEn || s.overview_en || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Display top 3 online services on Home page
  const displayServices = filtered.slice(0, 3);

  return (
    <section id="csc" className="py-16 md:py-24 bg-white border-b border-slate-200/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-700 font-bold text-xs px-4 py-1.5 rounded-full border border-emerald-200/80 shadow-xs">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span className={isMarathi ? 'marathi-text' : ''}>{isMarathi ? 'महाऑनलाइन सेतू व ऑनलाईन सेवा केंद्र' : 'MahaOnline Setu & Online Service Desk'}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 ${isMarathi ? 'marathi-heading leading-[1.3] md:leading-[1.25]' : 'tracking-tight'}`}>
            {isMarathi ? 'ऑनलाईन शासकीय सेवा' : 'Online Services'}
          </h2>

          <p className={`text-slate-600 text-sm sm:text-base font-medium ${isMarathi ? 'marathi-text leading-[1.8]' : 'leading-relaxed'}`}>
            {isMarathi
              ? 'शासकीय दाखले, शिष्यवृत्ती, पॅन कार्ड, परीक्षा फॉर्म आणि ऑनलाईन सेतू सेवा — अचूक अर्ज भरणी व १००% अधिकृत प्रक्रिया.'
              : 'Scholarships, Govt Certificates, Exam Applications, and Portal Services — Fast, accurate, and 100% official.'}
          </p>
        </div>

        {/* Live Search Input */}
        <div className="max-w-md mx-auto mb-12 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isMarathi ? 'कोणती ऑनलाईन सेवा हवी आहे? (उदा. पॅन कार्ड, दाखला, स्कॉलरशिप)' : 'Search online service (e.g. PAN Card, Scholarship, Domicile)'}
            className={`w-full pl-11 pr-4 py-3.5 bg-white border border-slate-300 rounded-2xl shadow-xs font-medium text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all ${isMarathi ? 'marathi-text' : ''}`}
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
        </div>

        {/* Top 3 Online Services Cards Grid */}
        {displayServices.length === 0 ? (
          <div className={`text-center py-12 text-slate-500 font-medium ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'कोणतीही ऑनलाईन सेवा आढळली नाही.' : 'No online services found.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {displayServices.map((item, idx) => (
              <div 
                key={item.id || item.slug || `csc-${idx}-${item.titleEn || item.titleMr}`}
                className="bg-white rounded-3xl p-6 md:p-7 border border-slate-200/90 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="w-11 h-11 rounded-2xl bg-rose-50 border border-rose-200/80 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors shadow-xs shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className={`bg-slate-100 text-slate-700 text-[11px] font-bold px-3 py-1 rounded-full border border-slate-200 ${isMarathi ? 'marathi-text' : ''}`}>
                      {isMarathi ? (item.timelineMr || item.timeline_mr || 'वेळेत सेवा') : (item.timelineEn || item.timeline_en || 'Fast Processing')}
                    </span>
                  </div>

                  <h3 className={`font-bold text-lg text-slate-900 group-hover:text-primary transition-colors ${isMarathi ? 'marathi-heading leading-[1.3]' : ''}`}>
                    {isMarathi ? (item.titleMr || item.title_mr || item.titleEn) : (item.titleEn || item.title_en || item.titleMr)}
                  </h3>

                  <p className={`text-xs sm:text-sm text-slate-600 font-medium line-clamp-2 ${isMarathi ? 'marathi-text leading-[1.7]' : 'leading-relaxed'}`}>
                    {isMarathi ? (item.overviewMr || item.overview_mr || '') : (item.overviewEn || item.overview_en || '')}
                  </p>

                  {/* Document Checklist */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/70 space-y-2">
                    <div className={`text-[10px] font-bold text-slate-400 uppercase ${isMarathi ? 'marathi-text' : 'tracking-wider'}`}>
                      {isMarathi ? 'आवश्यक कागदपत्रे:' : 'Required Documents:'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {((isMarathi ? item.requiredDocsMr : item.requiredDocsEn) || []).slice(0, 3).map((doc, dIdx) => (
                        <span key={`doc-${dIdx}-${doc}`} className={`bg-white border border-slate-200 text-slate-800 text-[11px] font-bold px-2.5 py-1 rounded-xl shadow-xs ${isMarathi ? 'marathi-text' : ''}`}>
                          ✓ {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-2 pt-4 border-t border-slate-100">
                  <a
                    href="tel:+919552345061"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 font-bold text-xs py-3 rounded-2xl shadow-xs transition-all"
                    title="Call Now: +91 95523 45061"
                  >
                    <Phone className="w-4 h-4 text-emerald-600 fill-emerald-600/20 shrink-0" />
                    <span className={isMarathi ? 'marathi-text font-bold' : ''}>{isMarathi ? 'थेट कॉल करा' : 'Call Now'}</span>
                  </a>

                  <a
                    href={`https://wa.me/919552345061?text=I%20want%20to%20apply%20for%20${encodeURIComponent(item.titleEn || item.titleMr || 'Online Service')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-1.5 bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs py-3 rounded-2xl shadow-xs transition-all"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className={isMarathi ? 'marathi-text font-bold' : ''}>{isMarathi ? 'व्हाट्सॲप' : 'WhatsApp'}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View All Online Services CTA Button */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('csc')}
            className="inline-flex items-center gap-2 bg-slate-900 hover:bg-primary text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 group"
          >
            <span className={isMarathi ? 'marathi-text font-bold' : ''}>{isMarathi ? 'सर्व ऑनलाईन सेवा पहा' : 'View All Online Services'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </section>
  );
}


