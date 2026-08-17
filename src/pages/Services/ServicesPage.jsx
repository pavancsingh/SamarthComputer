import React, { useState, useEffect, useMemo } from 'react';
import { InquiryRepository } from '../../repositories/InquiryRepository';
import { sharedStore } from '../../repositories/sharedStore';
import ServiceEnquiryModal from '../../components/forms/ServiceEnquiryModal';
import {
  Search, ChevronRight, ChevronLeft, ArrowRight, ExternalLink,
  FileText, Shield, Printer, Laptop, Wrench, Globe,
  Clock, CheckCircle2, AlertCircle, Sparkles, MessageCircle, X, Phone
} from 'lucide-react';

/**
 * ServicesPage — SERVICES Workflow Hub
 * Request → Processing → Completion
 * Completely separate from Courses workflow.
 * 6 category cards → filtered service list → detail panel → ServiceEnquiryModal
 */

const SERVICE_CATEGORIES = [
  {
    id: 'govt',
    source: 'govt', // fetched from govt_services table
    labelEn: 'Online Government Services',
    labelMr: 'ऑनलाइन शासकीय सेवा',
    descEn: 'Caste, Domicile, Income Certificates, RTO & Ration Card services',
    descMr: 'जात, रहिवास, उत्पन्न दाखले, RTO व रेशन कार्ड सेवा',
    icon: Shield,
    color: 'from-amber-500 to-orange-600',
    bgLight: 'bg-amber-50',
    textColor: 'text-amber-700',
    borderColor: 'border-amber-200',
    emoji: '🏛️'
  },
  {
    id: 'csc',
    source: 'csc',
    cscCategory: 'csc',
    labelEn: 'CSC / Digital Seva',
    labelMr: 'CSC / डिजिटल सेवा',
    descEn: 'Aadhaar, PAN Card, Voter ID, Passport & Digital Seva services',
    descMr: 'आधार, पॅन कार्ड, मतदार ओळखपत्र, पासपोर्ट व डिजिटल सेवा',
    icon: Laptop,
    color: 'from-indigo-500 to-blue-600',
    bgLight: 'bg-indigo-50',
    textColor: 'text-indigo-700',
    borderColor: 'border-indigo-200',
    emoji: '💻'
  },
  {
    id: 'scholarship',
    source: 'csc',
    cscCategory: 'scholarship',
    labelEn: 'PAN Card Services',
    labelMr: 'पॅन कार्ड सेवा',
    descEn: 'New PAN Card, Correction, e-PAN & Lost PAN Card replacement',
    descMr: 'नवीन पॅन कार्ड, दुरुस्ती, ई-पॅन व हरवलेले पॅन कार्ड',
    icon: FileText,
    color: 'from-emerald-500 to-teal-600',
    bgLight: 'bg-emerald-50',
    textColor: 'text-emerald-700',
    borderColor: 'border-emerald-200',
    emoji: '🪪'
  },
  {
    id: 'utility',
    source: 'csc',
    cscCategory: 'utility',
    labelEn: 'Print & Document Work',
    labelMr: 'प्रिंट व कागदपत्रे',
    descEn: 'Photocopy, Scanning, Lamination, Resume Typing & Form Filling',
    descMr: 'झेरॉक्स, स्कॅनिंग, लॅमिनेशन, रिज्युमे टायपिंग व फॉर्म भरणे',
    icon: Printer,
    color: 'from-pink-500 to-rose-600',
    bgLight: 'bg-pink-50',
    textColor: 'text-pink-700',
    borderColor: 'border-pink-200',
    emoji: '🖨️'
  },
  {
    id: 'exam',
    source: 'csc',
    cscCategory: 'exam',
    labelEn: 'Other Online Services',
    labelMr: 'इतर ऑनलाइन सेवा',
    descEn: 'Exam Forms, Scholarship Applications, Bill Payments & Utilities',
    descMr: 'परीक्षा फॉर्म, शिष्यवृत्ती, बिल पेमेंट व इतर ऑनलाइन सेवा',
    icon: Globe,
    color: 'from-purple-500 to-violet-600',
    bgLight: 'bg-purple-50',
    textColor: 'text-purple-700',
    borderColor: 'border-purple-200',
    emoji: '🌐'
  },
  {
    id: 'revenue',
    source: 'csc',
    cscCategory: 'revenue',
    labelEn: 'Technical Support',
    labelMr: 'तांत्रिक सहाय्य',
    descEn: 'Computer Repair, Software Installation, Network Setup & Data Recovery',
    descMr: 'कॉम्प्युटर दुरुस्ती, सॉफ्टवेअर इन्स्टॉलेशन, नेटवर्क सेटअप',
    icon: Wrench,
    color: 'from-slate-600 to-gray-700',
    bgLight: 'bg-slate-50',
    textColor: 'text-slate-700',
    borderColor: 'border-slate-200',
    emoji: '🔧'
  }
];

// Fallback govt services data
const FALLBACK_GOVT_SERVICES = [
  {
    id: 'caste-cert', slug: 'caste-cert',
    titleMr: 'जातीचा दाखला', titleEn: 'Caste Certificate',
    overviewMr: 'SDO कार्यालयातून जात प्रमाणपत्र काढण्यासाठी सर्व कागदपत्रे व ऑनलाइन अर्ज सहाय्य.',
    overviewEn: 'Assisted filing for Caste Certificate from SDO office. All documents guidance and online form submission.',
    timelineMr: '७–१५ दिवस', timelineEn: '7–15 Days',
    badge: 'महसूल विभाग', category: 'revenue',
    requiredDocsMr: ['आधार कार्ड', 'शाळा सोडल्याचा दाखला', 'जुना जात दाखला (असल्यास)', 'रेशन कार्ड'],
    requiredDocsEn: ['Aadhaar Card', 'School Leaving Certificate', 'Old Caste Certificate (if any)', 'Ration Card'],
    stepsEn: ['Visit Samarth Computers with documents', 'Online form filled at CSC', 'Submit at SDO counter', 'Track status online'],
    stepsMr: ['कागदपत्रांसह समर्थ कॉम्प्युटर्सला भेट', 'CSC वर ऑनलाइन फॉर्म भरणे', 'SDO काउंटरवर सबमिट', 'ऑनलाइन स्थिती तपासा'],
    status: 'Open'
  },
  {
    id: 'domicile-cert', slug: 'domicile-cert',
    titleMr: 'रहिवास प्रमाणपत्र (Domicile)', titleEn: 'Domicile Certificate',
    overviewMr: 'महाराष्ट्र रहिवास प्रमाणपत्र — तहसील कार्यालयातून काढण्यासाठी सहाय्य.',
    overviewEn: 'Maharashtra Domicile Certificate from Tehsil office with full documentation assistance.',
    timelineMr: '५–१० दिवस', timelineEn: '5–10 Days',
    badge: 'महसूल विभाग', category: 'revenue',
    requiredDocsMr: ['आधार कार्ड', 'रेशन कार्ड', 'शाळा बोनाफाईड', 'जन्म दाखला'],
    requiredDocsEn: ['Aadhaar Card', 'Ration Card', 'School Bonafide', 'Birth Certificate'],
    stepsEn: ['Collect documents', 'Fill online form at CSC', 'Submit at Tehsil', 'Collect certificate'],
    stepsMr: ['कागदपत्रे जमा करा', 'CSC वर ऑनलाइन फॉर्म', 'तहसीलमध्ये सादर', 'प्रमाणपत्र घ्या'],
    status: 'Open'
  },
  {
    id: 'income-cert', slug: 'income-cert',
    titleMr: 'उत्पन्नाचा दाखला', titleEn: 'Income Certificate',
    overviewMr: 'शिष्यवृत्ती, सरकारी योजना व प्रवेशासाठी उत्पन्नाचा दाखला काढण्यासाठी सहाय्य.',
    overviewEn: 'Income Certificate for scholarship, government schemes and college admissions.',
    timelineMr: '३–७ दिवस', timelineEn: '3–7 Days',
    badge: 'महसूल विभाग', category: 'revenue',
    requiredDocsMr: ['आधार कार्ड', 'रेशन कार्ड', 'पगार पत्रक / व्यवसाय पुरावा'],
    requiredDocsEn: ['Aadhaar Card', 'Ration Card', 'Salary Slip / Business Proof'],
    stepsEn: ['Visit with documents', 'Fill income certificate form', 'SDO approval', 'Download digitally'],
    stepsMr: ['कागदपत्रांसह भेट द्या', 'उत्पन्न दाखला फॉर्म भरा', 'SDO मंजुरी', 'डिजिटल डाउनलोड'],
    status: 'Open'
  }
];

const FALLBACK_CSC_SERVICES = [
  {
    id: 'pan-new', slug: 'pan-new', category: 'csc',
    titleMr: 'नवीन पॅन कार्ड अर्ज', titleEn: 'New PAN Card Application',
    overviewMr: 'NSDL / UTI पोर्टलद्वारे नवीन पॅन कार्डसाठी ऑनलाइन अर्ज.',
    overviewEn: 'New PAN Card online application via NSDL/UTI portal with document guidance.',
    timelineMr: '७–१५ दिवस', timelineEn: '7–15 Days',
    badge: 'CSC सेवा', requiredDocsMr: ['आधार कार्ड', 'जन्म दाखला / पासपोर्ट', 'पासपोर्ट फोटो'],
    requiredDocsEn: ['Aadhaar Card', 'Birth Certificate / Passport', 'Passport Photo'], status: 'Open'
  },
  {
    id: 'ration-card', slug: 'ration-card', category: 'csc',
    titleMr: 'रेशन कार्ड अर्ज / दुरुस्ती', titleEn: 'Ration Card Application / Correction',
    overviewMr: 'नवीन रेशन कार्डसाठी अर्ज, सदस्य जोडणे / काढणे व दुरुस्ती सहाय्य.',
    overviewEn: 'New Ration Card application, member addition/removal and correction assistance.',
    timelineMr: '१५–३० दिवस', timelineEn: '15–30 Days',
    badge: 'नागरी पुरवठा', requiredDocsMr: ['आधार कार्ड', 'निवासाचा पुरावा', 'कुटुंब फोटो'],
    requiredDocsEn: ['Aadhaar Card', 'Address Proof', 'Family Photograph'], status: 'Open'
  },
  {
    id: 'driving-license', slug: 'driving-license', category: 'csc',
    titleMr: 'ड्रायव्हिंग लायसन्स अर्ज', titleEn: 'Driving License Application',
    overviewMr: 'LLR / DL साठी ऑनलाइन अर्ज, स्लॉट बुकिंग आणि दस्तऐवज तयारी.',
    overviewEn: 'LLR / DL online application, slot booking and document preparation guidance.',
    timelineMr: '१५–२१ दिवस', timelineEn: '15–21 Days',
    badge: 'RTO सेवा', requiredDocsMr: ['आधार कार्ड', 'वय पुरावा', 'पत्ता पुरावा', 'पासपोर्ट फोटो'],
    requiredDocsEn: ['Aadhaar Card', 'Age Proof', 'Address Proof', 'Passport Photo'], status: 'Open'
  },
  {
    id: 'print-xerox', slug: 'print-xerox', category: 'utility',
    titleMr: 'झेरॉक्स / प्रिंट / स्कॅनिंग', titleEn: 'Photocopy / Printing / Scanning',
    overviewMr: 'कागदपत्रांचे प्रिंट, झेरॉक्स, स्कॅनिंग, PDF बनवणे व लॅमिनेशन.',
    overviewEn: 'Document printing, xerox copying, scanning, PDF creation, and lamination.',
    timelineMr: 'त्वरित', timelineEn: 'Instant',
    badge: 'प्रिंट सेवा', requiredDocsMr: [], requiredDocsEn: [], status: 'Open'
  },
  {
    id: 'scholarship-apply', slug: 'scholarship-apply', category: 'scholarship',
    titleMr: 'MahaDBT शिष्यवृत्ती अर्ज', titleEn: 'MahaDBT Scholarship Application',
    overviewMr: 'EBC, SC, OBC, NT आणि SBC शिष्यवृत्ती अर्ज ऑनलाइन भरण्यासाठी सहाय्य.',
    overviewEn: 'Assisted online filing for EBC, SC, OBC, NT and SBC scholarship on MahaDBT portal.',
    timelineMr: 'आवेदन काळात', timelineEn: 'During Application Period',
    badge: 'शिष्यवृत्ती', requiredDocsMr: ['आधार कार्ड', 'उत्पन्न दाखला', 'जात प्रमाणपत्र', 'बँक पासबुक', 'गुणपत्रक'],
    requiredDocsEn: ['Aadhaar Card', 'Income Certificate', 'Caste Certificate', 'Bank Passbook', 'Marksheet'], status: 'Open'
  }
];



export default function ServicesPage({ lang = 'mr', onNavigate }) {
  const isMarathi = lang === 'mr';

  // Data — read from sharedStore first
  const [govtServices, setGovtServices] = useState(() => {
    const cached = sharedStore.getGovtServices();
    return cached && cached.length > 0 ? cached : FALLBACK_GOVT_SERVICES;
  });
  const [cscServices, setCscServices] = useState(() => {
    const cached = sharedStore.getCSCServices();
    return cached && cached.length > 0 ? cached : FALLBACK_CSC_SERVICES;
  });
  const [loading, setLoading] = useState(false);

  // Navigation State
  const [selectedCategory, setSelectedCategory] = useState(null); // null = show category cards
  const [searchQuery, setSearchQuery] = useState('');

  // Detail Panel State
  const [detailService, setDetailService] = useState(null);

  // Modal State
  const [enquiryService, setEnquiryService] = useState(null);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        const [govtData, cscData] = await Promise.all([
          InquiryRepository.getGovtServices('all'),
          InquiryRepository.getCSCServices('all')
        ]);
        if (isMounted) {
          if (govtData && govtData.length > 0) setGovtServices(govtData);
          if (cscData && cscData.length > 0) setCscServices(cscData);
        }
      } catch (err) {
        console.warn('Notice loading services:', err.message);
      }
    }

    loadData();

    const unsubscribe = sharedStore.subscribe(() => {
      if (isMounted) {
        const govt = sharedStore.getGovtServices();
        const csc = sharedStore.getCSCServices();
        if (govt && govt.length > 0) setGovtServices(govt);
        if (csc && csc.length > 0) setCscServices(csc);
      }
    });

    return () => {
      isMounted = false;
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // Resolve services for selected category
  const categoryServices = useMemo(() => {
    if (!selectedCategory) return [];
    const cat = SERVICE_CATEGORIES.find(c => c.id === selectedCategory);
    if (!cat) return [];

    if (cat.source === 'govt') {
      return govtServices;
    } else {
      // csc source — filter by cscCategory
      return cscServices.filter(s => s.category === cat.cscCategory || !cat.cscCategory);
    }
  }, [selectedCategory, govtServices, cscServices]);

  const filteredServices = useMemo(() => {
    if (!searchQuery.trim()) return categoryServices;
    const q = searchQuery.toLowerCase();
    return categoryServices.filter(s =>
      (s.titleEn || '').toLowerCase().includes(q) ||
      (s.titleMr || '').toLowerCase().includes(q) ||
      (s.overviewEn || '').toLowerCase().includes(q) ||
      (s.overviewMr || '').toLowerCase().includes(q)
    );
  }, [categoryServices, searchQuery]);

  const openEnquiry = (service) => {
    setEnquiryService(service);
    setIsEnquiryOpen(true);
  };

  const selectedCat = SERVICE_CATEGORIES.find(c => c.id === selectedCategory);

  return (
    <div className="bg-slate-50/70 min-h-screen pb-24 md:pb-12">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-rose-50/60 via-slate-50/30 to-transparent pointer-events-none" />

      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 md:pt-12">

        {/* ── Hero / Header ── */}
        <section className="text-center mb-10 max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200/80 text-primary text-xs font-black shadow-xs">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>{isMarathi ? 'अधिकृत सेतू, CSC व ऑनलाइन सेवा केंद्र' : 'Official Setu, CSC & Online Services Center'}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            {isMarathi ? (
              <>सरकारी व <span className="text-primary">ऑनलाइन सेवा</span></>
            ) : (
              <>Government &amp; <span className="text-primary">Online Services</span></>
            )}
          </h1>

          <p className="text-sm sm:text-base text-slate-600 font-medium leading-relaxed">
            {isMarathi
              ? 'जात दाखला, उत्पन्न प्रमाणपत्र, पॅन कार्ड, रेशन कार्ड, शिष्यवृत्ती, ड्रायव्हिंग लायसन्स — सर्व सेवा एकाच ठिकाणी, वेगाने व अचूकपणे.'
              : 'Caste & Income Certificates, PAN Card, Ration Card, Scholarships, Driving License — all services at one place, fast and accurate.'}
          </p>

          {/* Workflow badge */}
          <div className="flex items-center justify-center gap-2 text-xs font-extrabold text-slate-600">
            <span className="bg-slate-100 border border-slate-200 text-slate-800 px-3 py-1 rounded-full">📋 {isMarathi ? 'विनंती करा' : 'Request'}</span>
            <span className="text-slate-400">→</span>
            <span className="bg-purple-50 border border-purple-200 text-purple-800 px-3 py-1 rounded-full">⚙️ {isMarathi ? 'प्रक्रिया' : 'Processing'}</span>
            <span className="text-slate-400">→</span>
            <span className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full">✅ {isMarathi ? 'पूर्ण' : 'Completion'}</span>
          </div>
        </section>

        {/* ── Category Grid OR Service List ── */}
        {!selectedCategory ? (
          /* Category Cards Grid */
          <section className="mb-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICE_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setSelectedCategory(cat.id)}
                    className="group bg-white rounded-3xl border border-slate-200/90 p-6 md:p-7 text-left shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
                  >
                    {/* Gradient top accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${cat.color} rounded-t-3xl`} />

                    <div className="space-y-4">
                      <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center shadow-md shrink-0`}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      <div>
                        <div className="text-2xl mb-1">{cat.emoji}</div>
                        <h3 className="text-lg font-black text-slate-900 group-hover:text-primary transition-colors leading-snug mb-1">
                          {isMarathi ? cat.labelMr : cat.labelEn}
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed">
                          {isMarathi ? cat.descMr : cat.descEn}
                        </p>
                      </div>
                    </div>

                    <div className={`flex items-center gap-1.5 text-xs font-black ${cat.textColor} ${cat.bgLight} px-4 py-2 rounded-xl self-start border ${cat.borderColor} mt-4`}>
                      <span>{isMarathi ? 'सेवा पहा' : 'View Services'}</span>
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick WhatsApp CTA Banner */}
            <div className="mt-10 bg-slate-900 text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl border border-slate-800">
              <div className="text-center sm:text-left space-y-1">
                <h3 className="text-xl font-black text-white">{isMarathi ? 'तात्काळ मदत हवी आहे?' : 'Need Immediate Assistance?'}</h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium">
                  {isMarathi ? 'WhatsApp वर मेसेज करा — लगेच उत्तर मिळेल!' : 'WhatsApp us — we reply instantly!'}
                </p>
              </div>
              <a
                href="https://wa.me/919552345061?text=Hello%20Samarth%20Computers,%20I%20need%20help%20with%20a%20service."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md shrink-0 hover:scale-105"
              >
                <MessageCircle className="w-5 h-5 text-white" />
                <span>{isMarathi ? 'WhatsApp करा' : 'WhatsApp Now'}</span>
              </a>
            </div>
          </section>
        ) : (
          /* Service List for Selected Category */
          <section className="mb-12">
            {/* Back + Category Header */}
            <div className="flex items-center gap-3 mb-6">
              <button
                type="button"
                onClick={() => { setSelectedCategory(null); setSearchQuery(''); setDetailService(null); }}
                className="flex items-center gap-1.5 text-xs font-black text-slate-700 hover:text-primary bg-white border border-slate-300 px-4 py-2.5 rounded-xl transition-all shadow-xs"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{isMarathi ? 'सर्व सेवा' : 'All Services'}</span>
              </button>
              {selectedCat && (
                <div className="flex items-center gap-2">
                  <span className="text-xl">{selectedCat.emoji}</span>
                  <h2 className="text-xl font-black text-slate-900">
                    {isMarathi ? selectedCat.labelMr : selectedCat.labelEn}
                  </h2>
                </div>
              )}
            </div>

            {/* Search */}
            <div className="relative mb-6 max-w-lg">
              <Search className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={isMarathi ? 'सेवेचे नाव शोधा...' : 'Search services...'}
                className="w-full pl-10 pr-10 py-3 bg-white border border-slate-300 rounded-2xl text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary shadow-xs"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-3.5 text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {loading ? (
              <div className="text-center py-16">
                <div className="w-10 h-10 border-4 border-rose-200 border-t-primary rounded-full animate-spin mx-auto mb-4" />
                <p className="text-sm font-bold text-slate-500">{isMarathi ? 'सेवा लोड होत आहे...' : 'Loading services...'}</p>
              </div>
            ) : filteredServices.length === 0 ? (
              <div className="bg-white rounded-3xl border border-slate-200/90 p-12 text-center space-y-3 shadow-xs">
                <FileText className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-base font-black text-slate-900">
                  {isMarathi ? 'कोणतीही सेवा सापडली नाही' : 'No services found'}
                </h3>
                <p className="text-xs text-slate-500 font-medium">{isMarathi ? 'वेगळा शब्द वापरून शोधा.' : 'Try a different search term.'}</p>
                <button onClick={() => setSearchQuery('')} className="text-xs font-black text-primary hover:underline">
                  {isMarathi ? 'सर्व दाखवा' : 'Show All'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredServices.map(service => {
                  const title = isMarathi ? (service.titleMr || service.title_mr || service.titleEn) : (service.titleEn || service.title_en);
                  const overview = isMarathi ? (service.overviewMr || service.overview_mr || service.overviewEn) : (service.overviewEn || service.overview_en);
                  const timeline = isMarathi ? (service.timelineMr || service.timeline_mr) : (service.timelineEn || service.timeline_en);
                  const docs = isMarathi
                    ? (service.requiredDocsMr || service.required_docs_mr || [])
                    : (service.requiredDocsEn || service.required_docs_en || []);
                  const isClosed = service.status === 'Closed';

                  return (
                    <div
                      key={service.id || service.slug}
                      className="bg-white rounded-3xl border border-slate-200/90 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between group"
                    >
                      <div className="space-y-3.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-black uppercase tracking-wider text-primary bg-rose-50 px-3 py-1 rounded-full border border-rose-200/80">
                            {service.badge || (isMarathi ? 'शासकीय सेवा' : 'Service')}
                          </span>
                          {isClosed ? (
                            <span className="text-[11px] font-bold text-rose-700 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200 flex items-center gap-1">
                              <AlertCircle className="w-3 h-3" /> {isMarathi ? 'बंद' : 'Closed'}
                            </span>
                          ) : (
                            <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              {isMarathi ? 'उपलब्ध' : 'Open'}
                            </span>
                          )}
                        </div>

                        <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-primary transition-colors leading-snug">
                          {title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-600 font-medium line-clamp-2 leading-relaxed">{overview}</p>

                        {timeline && (
                          <div className="flex items-center gap-1.5 text-xs font-black text-amber-800 bg-amber-50 px-3 py-1.5 rounded-xl border border-amber-200/80">
                            <Clock className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                            <span>{isMarathi ? 'वेळ:' : 'Timeline:'} {timeline}</span>
                          </div>
                        )}

                        {docs.length > 0 && (
                          <div className="pt-3 border-t border-slate-100">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-wider mb-1.5">
                              {isMarathi ? 'आवश्यक कागदपत्रे:' : 'Required Documents:'}
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {docs.slice(0, 3).map((d, idx) => (
                                <span key={idx} className="text-[11px] font-bold text-slate-800 bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-xl shadow-xs">
                                  ✓ {d}
                                </span>
                              ))}
                              {docs.length > 3 && (
                                <span className="text-[11px] font-bold text-primary bg-rose-50 px-2.5 py-1 rounded-xl border border-rose-200/80">
                                  +{docs.length - 3} {isMarathi ? 'अधिक' : 'more'}
                                </span>
                              )}
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 mt-4 border-t border-slate-100 flex items-center gap-2">
                        <a
                          href="tel:+919552345061"
                          className="bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300/80 font-black text-xs px-3 py-2.5 rounded-xl transition-all flex items-center justify-center gap-1 shadow-xs shrink-0"
                          title="Call Now: +91 95523 45061"
                        >
                          <Phone className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600/20" />
                          <span>{isMarathi ? 'कॉल' : 'Call'}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => setDetailService(service)}
                          className="flex-1 bg-white text-slate-800 border border-slate-300 font-extrabold text-xs py-2.5 px-2.5 rounded-xl hover:bg-slate-50 transition-colors text-center"
                        >
                          {isMarathi ? 'तपशील' : 'Details'}
                        </button>
                        <button
                          type="button"
                          onClick={() => openEnquiry(service)}
                          className="flex-1 bg-primary hover:bg-stitch-red-dark text-white font-extrabold text-xs py-2.5 px-2.5 rounded-xl transition-colors flex items-center justify-center gap-1 shadow-xs"
                        >
                          <span>{isMarathi ? 'विनंती' : 'Request'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        {service.officialUrl && (
                          <a
                            href={service.officialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors shrink-0"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        )}
      </main>

      {/* ── Service Detail Panel (Slide Over) ── */}
      {detailService && (
        <div
          className="fixed inset-0 z-[800] bg-slate-900/50 backdrop-blur-sm flex justify-end"
          onClick={e => e.target === e.currentTarget && setDetailService(null)}
        >
          <div className="w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl animate-in slide-in-from-right duration-250">
            {/* Panel Header */}
            <div className="bg-slate-900 p-6 text-white sticky top-0 z-10 border-b border-slate-800">
              <div className="flex justify-between items-start mb-2">
                <span className="text-[11px] font-black uppercase tracking-wider bg-rose-500/20 border border-rose-500/30 text-rose-300 px-3 py-1 rounded-full">
                  {detailService.badge || 'Service'}
                </span>
                <button onClick={() => setDetailService(null)} className="p-1.5 hover:bg-white/10 rounded-xl transition-colors">
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>
              <h2 className="text-xl font-black mt-3 leading-snug">
                {isMarathi ? (detailService.titleMr || detailService.title_mr) : (detailService.titleEn || detailService.title_en)}
              </h2>
              <div className="flex items-center gap-2 mt-2">
                <Clock className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black text-amber-300">
                  {isMarathi ? (detailService.timelineMr || detailService.timeline_mr) : (detailService.timelineEn || detailService.timeline_en)}
                </span>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Overview */}
              <div>
                <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">
                  {isMarathi ? 'माहिती' : 'Overview'}
                </h3>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  {isMarathi ? (detailService.overviewMr || detailService.overview_mr) : (detailService.overviewEn || detailService.overview_en)}
                </p>
              </div>

              {/* Required Documents */}
              {(() => {
                const docs = isMarathi
                  ? (detailService.requiredDocsMr || detailService.required_docs_mr || [])
                  : (detailService.requiredDocsEn || detailService.required_docs_en || []);
                return docs.length > 0 ? (
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                      {isMarathi ? 'आवश्यक कागदपत्रे' : 'Required Documents'}
                    </h3>
                    <ul className="space-y-2">
                      {docs.map((doc, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                          <span className="text-sm font-bold text-slate-800">{doc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null;
              })()}

              {/* Process Steps */}
              {(() => {
                const steps = isMarathi
                  ? (detailService.stepsMr || detailService.steps_mr || [])
                  : (detailService.stepsEn || detailService.steps_en || []);
                return steps.length > 0 ? (
                  <div>
                    <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-3">
                      {isMarathi ? 'प्रक्रिया पायऱ्या' : 'Process Steps'}
                    </h3>
                    <ol className="space-y-3">
                      {steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="w-6 h-6 rounded-full bg-rose-50 text-primary border border-rose-200 font-black text-xs flex items-center justify-center shrink-0">
                            {idx + 1}
                          </span>
                          <span className="text-sm font-semibold text-slate-800 leading-snug">{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                ) : null;
              })()}

              {/* Action Buttons */}
              <div className="space-y-3 pt-2">
                <a
                  href="tel:+919552345061"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Phone className="w-4 h-4 text-white fill-white/20" />
                  <span>{isMarathi ? '📞 थेट कॉल करा (Call Now)' : 'Call Now (+91 95523 45061)'}</span>
                </a>

                <button
                  type="button"
                  onClick={() => { openEnquiry(detailService); setDetailService(null); }}
                  className="w-full bg-primary hover:bg-stitch-red-dark text-white font-black text-sm py-3.5 rounded-2xl flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Wrench className="w-4 h-4" />
                  <span>{isMarathi ? 'सेवा विनंती सादर करा' : 'Request This Service'}</span>
                </button>

                <a
                  href={`https://wa.me/919552345061?text=Hello%20Samarth%20Computers,%20I%20need%20help%20with%20${encodeURIComponent(isMarathi ? (detailService.titleMr || '') : (detailService.titleEn || ''))}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-emerald-600 text-white font-extrabold text-sm py-3.5 rounded-2xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>{isMarathi ? 'WhatsApp वर अर्ज करा' : 'Apply via WhatsApp'}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Service Enquiry Modal — SERVICES WORKFLOW ONLY */}
      <ServiceEnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => { setIsEnquiryOpen(false); setEnquiryService(null); }}
        defaultService={enquiryService}
        lang={lang}
      />
    </div>
  );
}
