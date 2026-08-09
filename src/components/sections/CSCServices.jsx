import React, { useState, useEffect } from 'react';
import { Search, FileText, Shield, MessageCircle, ArrowRight } from 'lucide-react';
import { InquiryRepository } from '../../repositories/InquiryRepository';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * CSCServices Component — Online Services Showcase (Homepage)
 * Combines CSC & Government Services into a unified "Online Services" section.
 * Shows top 3 online services with live search, required documents, and a "View More Online Services" CTA button.
 */
export default function CSCServices({ lang = 'mr', onNavigate }) {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const isMarathi = lang === 'mr';

  useEffect(() => {
    async function load() {
      try {
        const cscData = await InquiryRepository.getCSCServices('all');
        const govtData = await InquiryRepository.getGovtServices('all');
        const combined = [...(cscData || []), ...(govtData || [])];
        setServices(combined);
      } catch (e) {
        console.error('Error loading online services:', e);
      }
    }
    load();

    const unsubscribe = sharedStore.subscribe(() => {
      load();
    });
    return unsubscribe;
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
    <section id="csc" className="py-20 bg-stitch-ivory border-b border-slate-200/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-emerald-50 text-stitch-emerald font-extrabold text-xs px-4 py-1.5 rounded-full border border-emerald-200 shadow-stitch-sm">
            <Shield className="w-4 h-4 text-stitch-emerald" />
            <span>{isMarathi ? 'महाऑनलाइन सेतू व ऑनलाइन सेवा केंद्र' : 'MahaOnline Setu & Online Service Desk'}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-stitch-slate-dark tracking-tight ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'ऑनलाइन सेवा (Online Services)' : 'Online Services'}
          </h2>

          <p className={`text-slate-500 text-sm sm:text-base font-medium ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? 'शिष्यवृत्ती, शासकीय दाखले, परीक्षा फॉर्म आणि ऑनलाईन सेतू सेवा - अचूक अर्ज भरणी आणि १००% शासकीय मान्यता.'
              : 'Scholarships, Govt Certificates, Exam Applications, and Portal Services — Fast, accurate, and 100% official.'}
          </p>
        </div>

        {/* Live Search Input */}
        <div className="max-w-md mx-auto mb-12 relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isMarathi ? 'कोणती ऑनलाईन सेवा हवी आहे? (उदा. पॅन कार्ड, स्कॉलरशिप, दाखला)' : 'Search online service (e.g. PAN Card, Scholarship, Domicile)'}
            className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-300 rounded-2xl shadow-stitch-sm font-medium text-sm text-stitch-slate-dark focus:outline-none focus:ring-2 focus:ring-stitch-red focus:border-stitch-red transition-all"
          />
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-4" />
        </div>

        {/* Top 3 Online Services Cards Grid */}
        {displayServices.length === 0 ? (
          <div className="text-center py-12 text-slate-500 font-medium">
            {isMarathi ? 'कोणतीही ऑनलाईन सेवा आढळली नाही.' : 'No online services found.'}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayServices.map((item, idx) => (
              <div 
                key={item.id || item.slug || idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-stitch-md hover:shadow-stitch-lg transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-stitch-red-light border border-stitch-red-border flex items-center justify-center text-stitch-red group-hover:bg-stitch-red group-hover:text-white transition-colors shadow-stitch-sm">
                      <FileText className="w-5 h-5" />
                    </div>
                    <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-3 py-1 rounded-full border border-slate-200">
                      {isMarathi ? (item.timelineMr || item.timeline_mr || 'वेळेत अर्ज') : (item.timelineEn || item.timeline_en || 'Fast Processing')}
                    </span>
                  </div>

                  <h3 className={`font-black text-lg text-stitch-slate-dark group-hover:text-stitch-red transition-colors ${isMarathi ? 'marathi-text' : ''}`}>
                    {isMarathi ? (item.titleMr || item.title_mr || item.titleEn) : (item.titleEn || item.title_en || item.titleMr)}
                  </h3>

                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {isMarathi ? (item.overviewMr || item.overview_mr || '') : (item.overviewEn || item.overview_en || '')}
                  </p>

                  {/* Document Checklist */}
                  <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5">
                    <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                      {isMarathi ? 'आवश्यक कागदपत्रे:' : 'Required Documents:'}
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {((isMarathi ? item.requiredDocsMr : item.requiredDocsEn) || []).slice(0, 3).map((doc, dIdx) => (
                        <span key={dIdx} className="bg-white border border-slate-200/80 text-slate-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-lg shadow-stitch-sm">
                          ✓ {doc}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <a
                  href={`https://wa.me/919552345061?text=I%20want%20to%20apply%20for%20${encodeURIComponent(item.titleEn || item.titleMr || 'Online Service')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 w-full flex items-center justify-center gap-2 bg-stitch-slate-dark hover:bg-stitch-whatsapp text-white hover:text-slate-950 font-extrabold text-xs py-3 rounded-2xl shadow-stitch-sm transition-all"
                >
                  <MessageCircle className="w-4 h-4 text-stitch-whatsapp" />
                  <span>{isMarathi ? 'व्हाट्सॲपवर अर्ज करा' : 'Apply via WhatsApp'}</span>
                </a>
              </div>
            ))}
          </div>
        )}

        {/* View More Online Services CTA */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={() => onNavigate && onNavigate('csc')}
            className="inline-flex items-center gap-2 bg-stitch-slate-dark text-white px-8 py-3.5 rounded-2xl font-black text-sm shadow-md hover:bg-stitch-red transition-all active:scale-95 group"
          >
            <span>{isMarathi ? 'अधिक ऑनलाईन सेवा पहा (View More Online Services)' : 'View More Online Services'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
}


