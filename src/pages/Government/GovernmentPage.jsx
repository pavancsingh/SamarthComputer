import React, { useState, useEffect } from 'react';
import { InquiryRepository } from '../../repositories/InquiryRepository';
import { Shield, Search, FileText, MessageCircle } from 'lucide-react';
import RequirementsAccordion from '../../components/common/RequirementsAccordion';

/**
 * GovernmentPage Component - Google Stitch Design System
 * All Government Services catalog view featuring category tabs, live search, requirements, and WhatsApp triggers.
 */
export default function GovernmentPage({ lang = 'mr' }) {
  const [govtServices, setGovtServices] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeService, setActiveService] = useState(null);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    async function loadGovt() {
      const data = await InquiryRepository.getGovtServices(filter);
      setGovtServices(data);
    }
    loadGovt();
  }, [filter]);

  const filtered = govtServices.filter((s) => {
    const matchesSearch = (s.titleMr || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (s.titleEn || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="bg-stitch-ivory min-h-screen pb-24 text-stitch-slate-dark">
      
      {/* Header Banner */}
      <section className="bg-stitch-slate-dark text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-stitch-amber text-slate-950 font-extrabold text-xs px-4 py-1.5 rounded-full shadow-stitch-sm">
            <Shield className="w-4 h-4 text-slate-950" />
            <span>{isMarathi ? 'आपले सरकार & शासकीय ऑनलाईन केंद्र' : 'Aaple Sarkar Govt Services Portal'}</span>
          </span>

          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'ऑनलाइन सेवा (Online Services)' : 'Online Services'}
          </h1>

          <p className={`text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? 'जातीचा दाखला, महाराष्ट्राचे रहिवासी प्रमाणपत्र, ड्रायव्हिंग लायसन्स आणि रेशन कार्ड सेवा सेतू केंद्र खंडाळा.'
              : 'SDO Caste Certificates, Tehsildar Domicile Certificates, Driving Licenses, and Ration Card Services.'}
          </p>
        </div>
      </section>

      {/* Filter Bar & Search Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 relative z-20">
        <div className="bg-white rounded-3xl p-4 sm:p-5 shadow-stitch-md border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {[
              { id: 'all', labelMr: 'सर्व शासकीय सेवा', labelEn: 'All Services' },
              { id: 'revenue', labelMr: 'महसूल विभाग (दाखले)', labelEn: 'Revenue Dept' },
              { id: 'transport', labelMr: 'RTO ड्रायव्हिंग लायसन्स', labelEn: 'RTO Transport' },
              { id: 'food', labelMr: 'नागरी पुरवठा (रेशन कार्ड)', labelEn: 'Civil Supplies' }
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
              placeholder={isMarathi ? 'दाखल्याचे नाव शोधा (उदा. जातीचा दाखला)...' : 'Search (e.g. Caste, Domicile)...'}
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-medium text-stitch-slate-dark focus:outline-none focus:ring-2 focus:ring-stitch-red focus:border-stitch-red shadow-stitch-sm"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          </div>

        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="space-y-8">
          {filtered.map((item) => (
            <div
              key={item.id || item.slug}
              className="bg-white rounded-3xl border border-slate-200/90 shadow-stitch-md hover:shadow-stitch-lg p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start transition-all"
            >
              {/* Left Column: Details & Overview */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="bg-amber-50 text-stitch-amber border border-amber-200 font-extrabold text-[10px] uppercase px-3 py-1 rounded-full">
                    {item.badge}
                  </span>
                  <span className="bg-slate-100 text-slate-700 text-[11px] font-extrabold px-3 py-1 rounded-full border border-slate-200">
                    ⏱️ {isMarathi ? item.timelineMr : item.timelineEn}
                  </span>
                </div>

                <h2 className={`font-black text-xl sm:text-2xl text-stitch-slate-dark ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? item.titleMr : item.titleEn}
                </h2>

                <p className={`text-xs sm:text-sm text-slate-500 font-medium leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? item.overviewMr : item.overviewEn}
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href={`https://wa.me/919552345061?text=Hello%20Samarth%20Computers,%20I%20want%20to%20apply%20for%20${encodeURIComponent(item.titleEn)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-stitch-slate-dark hover:bg-stitch-whatsapp text-white hover:text-slate-950 font-extrabold text-xs px-5 py-3 rounded-2xl shadow-stitch-sm transition-all hover:scale-105"
                  >
                    <MessageCircle className="w-4 h-4 text-stitch-whatsapp" />
                    <span>{isMarathi ? 'व्हाट्सॲपवर अर्ज करा' : 'Apply via WhatsApp'}</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveService(activeService === item.id ? null : item.id)}
                    className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-stitch-slate-dark font-extrabold text-xs px-4.5 py-3 rounded-2xl border border-slate-200 shadow-stitch-sm transition-all"
                  >
                    <FileText className="w-4 h-4" />
                    <span>{activeService === item.id ? (isMarathi ? 'माहिती लपवा' : 'Hide Specs') : (isMarathi ? 'कागदपत्रे & प्रक्रिया पहा' : 'View Requirements')}</span>
                  </button>
                </div>
              </div>

              {/* Right Column: Accordion Specs */}
              <div className="lg:col-span-5 w-full">
                <RequirementsAccordion
                  requirements={isMarathi ? (item.requiredDocsMr || []) : (item.requiredDocsEn || [])}
                  steps={isMarathi ? item.stepsMr : item.stepsEn}
                  lang={lang}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

