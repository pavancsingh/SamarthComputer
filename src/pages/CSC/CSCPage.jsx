import React, { useState, useEffect } from 'react';
import { Shield, Search, FileText, MessageCircle } from 'lucide-react';
import { InquiryRepository } from '../../repositories/InquiryRepository';
import DocChecklistModal from '../../components/forms/DocChecklistModal';

/**
 * CSCPage Component - Google Stitch Design System
 * Full CSC & MahaOnline Government Services portal with live search, service category filters,
 * document checklist drawers, and fast application triggers.
 */
export default function CSCPage({ lang = 'mr' }) {
  const [services, setServices] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    async function loadCSC() {
      const data = await InquiryRepository.getCSCServices(filter);
      setServices(data);
    }
    loadCSC();
  }, [filter]);

  const filteredServices = services.filter((s) => 
    s.titleMr.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.titleEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.overviewEn.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const openDocModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  return (
    <div className="bg-stitch-ivory min-h-screen pb-24 text-stitch-slate-dark">
      
      {/* Header Banner */}
      <section className="bg-stitch-slate-dark text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-emerald-50 text-stitch-emerald font-extrabold text-xs px-4 py-1.5 rounded-full border border-emerald-200 shadow-stitch-sm">
            <Shield className="w-4 h-4 text-stitch-emerald" />
            <span>{isMarathi ? 'महाऑनलाइन सीएससी केंद्र खंडाळा' : 'MahaOnline CSC Government Center Khandala'}</span>
          </span>

          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'ऑनलाइन सेवा (Online Services)' : 'Online Services'}
          </h1>

          <p className={`text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? 'अचूक ऑनलाइन फॉर्म भरणी, शासकीय फी पावती आणि १००% डिजिटल स्वाक्षरीचे दाखले. कागदपत्रे आणा आणि काम करून घ्या.'
              : 'Accurate government portal processing, official fee receipts, and digitally signed certificates.'}
          </p>
        </div>
      </section>

      {/* Filter Bar & Search Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-stitch-md border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', labelMr: 'सर्व सेवा', labelEn: 'All Services' },
              { id: 'identity', labelMr: 'ओळखपत्र व पॅन', labelEn: 'Identity & PAN' },
              { id: 'certificates', labelMr: 'दाखले व उतारे', labelEn: 'Certificates' },
              { id: 'business', labelMr: 'व्यवसाय परवाने', labelEn: 'Business Licenses' }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilter(btn.id)}
                className={`px-4 py-2.5 rounded-full text-xs font-black transition-all shadow-stitch-sm ${
                  filter === btn.id
                    ? 'bg-stitch-red text-white'
                    : 'bg-slate-100 text-stitch-slate-dark hover:bg-slate-200'
                }`}
              >
                <span className={isMarathi ? 'marathi-text' : ''}>
                  {isMarathi ? btn.labelMr : btn.labelEn}
                </span>
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isMarathi ? 'सेवेचे नाव शोधा (उदा. पॅन, गॅझेट)...' : 'Search service (e.g. PAN, Income)...'}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium text-stitch-slate-dark focus:outline-none focus:ring-2 focus:ring-stitch-red focus:border-stitch-red shadow-stitch-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-stitch-md hover:shadow-stitch-lg transition-all duration-300 flex flex-col justify-between overflow-hidden group hover:-translate-y-1 p-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="bg-stitch-red-light text-stitch-red border border-stitch-red-border font-extrabold text-[10px] uppercase px-3 py-1 rounded-full">
                    {item.badge}
                  </span>
                  <span className="text-[11px] font-extrabold text-slate-500 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
                    ⏱️ {isMarathi ? item.timelineMr : item.timelineEn}
                  </span>
                </div>

                <h2 className={`font-black text-lg text-stitch-slate-dark group-hover:text-stitch-red transition-colors ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? item.titleMr : item.titleEn}
                </h2>

                <p className={`text-xs text-slate-500 line-clamp-2 leading-relaxed font-medium ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? item.overviewMr : item.overviewEn}
                </p>

                {/* Document List Preview */}
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 space-y-1.5">
                  <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
                    {isMarathi ? 'आवश्यक कागदपत्रे:' : 'Required Documents:'}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {(isMarathi ? item.requiredDocsMr : item.requiredDocsEn).slice(0, 3).map((d, dIdx) => (
                      <span key={dIdx} className="bg-white border border-slate-200/80 text-slate-700 text-[10px] font-semibold px-2.5 py-0.5 rounded-lg shadow-stitch-sm">
                        ✓ {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => openDocModal(item)}
                  className="flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-stitch-slate-dark font-extrabold text-xs py-3 rounded-2xl border border-slate-200 shadow-stitch-sm transition-all"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>{isMarathi ? 'कागदपत्र यादी' : 'Doc Checklist'}</span>
                </button>

                <a
                  href={`https://wa.me/919552345061?text=I%20want%20to%20apply%20for%20${encodeURIComponent(item.titleEn)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 bg-stitch-slate-dark hover:bg-stitch-whatsapp text-white hover:text-slate-950 font-extrabold text-xs py-3 rounded-2xl shadow-stitch-sm transition-all hover:scale-105"
                >
                  <MessageCircle className="w-3.5 h-3.5 text-stitch-whatsapp" />
                  <span>{isMarathi ? 'अर्ज करा' : 'Apply Now'}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Document Checklist Modal */}
      <DocChecklistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
        lang={lang}
      />
    </div>
  );
}

