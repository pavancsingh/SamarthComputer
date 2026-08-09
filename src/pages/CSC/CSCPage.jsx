import React, { useState, useEffect, useMemo } from 'react';
import { InquiryRepository } from '../../repositories/InquiryRepository';
import { CSC_SERVICES_DATA } from '../../constants/cscData';
import DocChecklistModal from '../../components/forms/DocChecklistModal';
import { Search, Filter, Calendar, ExternalLink, ArrowRight, ShieldCheck, CheckCircle2, Award, Clock, FileText, Sparkles } from 'lucide-react';

/**
 * CSCPage — Complete CSC, Exam & Scholarship Forms Module
 * Category filters (Scholarships, Exams, CSC, Admissions, Utilities, Revenue Certificates),
 * Live search, deadline badges, open/closed status indicators, and document checklist modal.
 */
export default function CSCPage({ lang = 'mr', onNavigate }) {
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    async function loadData() {
      try {
        const data = await InquiryRepository.getCSCServices('all');
        if (data && data.length > 0) {
          setServices(data);
        } else {
          setServices(CSC_SERVICES_DATA);
        }
      } catch (err) {
        console.warn('Fallback to local CSC data:', err);
        setServices(CSC_SERVICES_DATA);
      }
    }
    loadData();
  }, []);

  // Category filter tabs definition
  const categories = [
    { id: 'all', labelMr: 'सर्व सेवा (All)', labelEn: 'All Services', icon: 'grid_view' },
    { id: 'scholarship', labelMr: '🎓 शिष्यवृत्ती अर्ज (Scholarships)', labelEn: 'Scholarship Forms', icon: 'school' },
    { id: 'exam', labelMr: '📋 परीक्षा फॉर्म (Exam Forms)', labelEn: 'Exam Forms', icon: 'assignment' },
    { id: 'csc', labelMr: '🏛️ सीएससी व ओळखपत्र (CSC Desk)', labelEn: 'CSC & Identity', icon: 'badge' },
    { id: 'admission', labelMr: '🏫 प्रवेश प्रक्रिया (Admissions)', labelEn: 'Admissions & CAP', icon: 'account_balance' },
    { id: 'utility', labelMr: '⚙️ विद्यार्थी सुविधा (Student Utility)', labelEn: 'Student Utilities', icon: 'construction' },
    { id: 'revenue', labelMr: '📜 शासकीय दाखले (Govt Desks)', labelEn: 'Govt Certificates', icon: 'article' },
  ];

  // Real-time filtered list
  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      const matchesCategory = selectedCategory === 'all' || s.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const titleMr = (s.titleMr || s.title_mr || '').toLowerCase();
      const titleEn = (s.titleEn || s.title_en || '').toLowerCase();
      const overviewMr = (s.overviewMr || s.overview_mr || '').toLowerCase();
      const overviewEn = (s.overviewEn || s.overview_en || '').toLowerCase();
      const cat = (s.category || '').toLowerCase();

      const matchesSearch = titleMr.includes(query) ||
                            titleEn.includes(query) ||
                            overviewMr.includes(query) ||
                            overviewEn.includes(query) ||
                            cat.includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [services, selectedCategory, searchQuery]);

  return (
    <div className="bg-[#F8FAFC] min-h-screen relative text-slate-800 pb-20 md:pb-12">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-indigo-100/60 via-slate-100/30 to-transparent pointer-events-none blur-3xl -z-10" />

      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">
        
        {/* Header Hero Section */}
        <section className="mb-10 text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-indigo-700 text-xs font-black shadow-xs">
            <Sparkles className="w-4 h-4 text-indigo-600" />
            <span>{isMarathi ? 'अधिकृत सेतू व ऑनलाईन सेवा केंद्र' : 'Official Setu & Online Service Desk'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {isMarathi ? (
              <>
                CSC, शिष्यवृत्ती व <span className="text-indigo-600">परीक्षा ऑनलाईन फॉर्म</span>
              </>
            ) : (
              <>
                CSC, Scholarship & <span className="text-indigo-600">Exam Online Forms</span>
              </>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            {isMarathi
              ? 'MahaDBT शिष्यवृत्ती, MPSC, पोलीस भरती, SSC, अभियांत्रिकी प्रवेश, पॅन कार्ड, उत्पन्न व रहिवासी दाखले - सर्व ऑनलाईन फॉर्म अचूक व वेळेत भरून मिळतील.'
              : 'MahaDBT Scholarships, MPSC, Police Recruitment, SSC, College CAP Admissions, PAN Card, Income & Domicile Certificates - Instant assisted online form filing.'}
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-xl mx-auto">
            <div className="relative shadow-sm rounded-2xl">
              <input
                type="text"
                placeholder={isMarathi ? 'फॉर्म किंवा सेवेचे नाव शोधा (उदा. MahaDBT, MPSC, पॅन कार्ड...)' : 'Search forms or services (e.g. MahaDBT, MPSC, PAN Card...)'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-300 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600 shadow-sm"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-3.5" />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3.5 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </section>

        {/* Category Filters Carousel / Tabs */}
        <section className="mb-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2.5 rounded-2xl text-xs font-black shrink-0 transition-all border ${
                    active
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm scale-[1.02]'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  {isMarathi ? cat.labelMr : cat.labelEn}
                </button>
              );
            })}
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-16">
          {filteredServices.length === 0 ? (
            <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center space-y-3">
              <FileText className="w-12 h-12 text-slate-300 mx-auto" />
              <h3 className="text-base font-bold text-slate-700">
                {isMarathi ? 'कोणतीही सेवा सापडली नाही' : 'No matching services found'}
              </h3>
              <p className="text-xs text-slate-500">
                {isMarathi ? 'कृपया इतर कीवर्ड शोधून पहा किंवा श्रेणी फिल्टर बदला.' : 'Try searching with another keyword or change category filter.'}
              </p>
              <button
                onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                className="px-4 py-2 bg-indigo-50 text-indigo-600 text-xs font-bold rounded-xl hover:bg-indigo-100"
              >
                {isMarathi ? 'सर्व दाखवा' : 'Show All Services'}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map((service) => {
                const title = isMarathi ? (service.titleMr || service.title_mr || service.titleEn) : (service.titleEn || service.title_en);
                const overview = isMarathi ? (service.overviewMr || service.overview_mr || service.overviewEn) : (service.overviewEn || service.overview_en);
                const timeline = isMarathi ? (service.timelineMr || service.timeline_mr || service.timelineEn) : (service.timelineEn || service.timeline_en);
                const deadline = isMarathi ? (service.deadlineMr || service.deadline_mr || service.deadlineEn) : (service.deadlineEn || service.deadline_en);
                const docs = (isMarathi ? (service.requiredDocsMr || service.required_docs_mr) : (service.requiredDocsEn || service.required_docs_en)) || [];
                const status = service.status || 'Open';
                const isClosed = status === 'Closed';

                return (
                  <div
                    key={service.id || service.slug}
                    className="bg-white border border-slate-200/90 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group relative overflow-hidden"
                  >
                    {/* Featured Stripe Accent */}
                    {service.isFeatured && (
                      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600" />
                    )}

                    <div className="space-y-4">
                      {/* Top Badges & Status */}
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg border border-indigo-200/60">
                          {service.badge || (isMarathi ? 'शासकीय सेवा' : 'Govt Desk')}
                        </span>

                        {isClosed ? (
                          <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                            🔴 Closed
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            🟢 Open
                          </span>
                        )}
                      </div>

                      {/* Title */}
                      <h3 className="text-base font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors leading-snug">
                        {title}
                      </h3>

                      {/* Overview */}
                      <p className="text-xs text-slate-600 font-medium line-clamp-2 leading-relaxed">
                        {overview}
                      </p>

                      {/* Deadline & Timeline Pill */}
                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center gap-2 text-[11px] font-extrabold text-amber-700 bg-amber-50/80 px-3 py-1.5 rounded-xl border border-amber-200/70">
                          <Calendar className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>{isMarathi ? 'मुदत:' : 'Deadline:'} {deadline || 'Always Available'}</span>
                        </div>

                        {timeline && (
                          <div className="flex items-center gap-2 text-[11px] font-bold text-slate-500 px-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{timeline}</span>
                          </div>
                        )}
                      </div>

                      {/* Mandatory Document Checklist Preview Tags */}
                      {docs.length > 0 && (
                        <div className="pt-2 border-t border-slate-100 space-y-1.5">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider">
                            {isMarathi ? 'आवश्यक कागदपत्रे:' : 'Required Documents:'}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {docs.slice(0, 3).map((d, idx) => (
                              <span key={idx} className="text-[10px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md">
                                ✓ {d}
                              </span>
                            ))}
                            {docs.length > 3 && (
                              <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
                                +{docs.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Bottom CTA Actions */}
                    <div className="pt-5 mt-4 border-t border-slate-100 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => { setSelectedService(service); setIsModalOpen(true); }}
                        className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3 rounded-xl shadow-xs transition-all hover:scale-[1.01] flex items-center justify-center gap-1.5"
                      >
                        <span>{isMarathi ? 'अर्ज करा / कागदपत्रे' : 'Apply & Check Docs'}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-white" />
                      </button>

                      {service.officialUrl && (
                        <a
                          href={service.officialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          title="Official Website"
                          className="p-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl transition-colors border border-slate-200 shrink-0"
                        >
                          <ExternalLink className="w-4 h-4 text-slate-600" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

      </main>

      {/* Interactive Document Checklist & Direct Lead Modal */}
      <DocChecklistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
        lang={lang}
      />
    </div>
  );
}
