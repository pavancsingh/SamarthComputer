import React, { useState } from 'react';
import { 
  Monitor, Smartphone, Keyboard, FileText, Table, Presentation, 
  Globe, Mail, Sparkles, ShieldCheck, Briefcase, ChevronLeft, ChevronRight, CheckCircle2, Award
} from 'lucide-react';

/**
 * 3D MS-CIT Course Map Component
 * Interactive 3D-styled learning journey map with 11 connected nodes surrounding the central 🎓 MS-CIT hub.
 * Responsive for Desktop (3D Orbital Path) & Mobile (Step Carousel / Interactive Grid).
 */
export default function MSCIT3DCourseMap({ course, lang = 'mr', onNavigate }) {
  const isMarathi = lang === 'mr';
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewMode, setViewMode] = useState('orbital'); // 'orbital' | 'timeline'

  // 11 Core Learning Journey Topics
  const topics = [
    {
      id: 1,
      icon: Monitor,
      materialIcon: 'devices',
      titleEn: 'Computer & Smartphone Basics',
      titleMr: 'संगणक व स्मार्टफोन पायाभूत ज्ञान',
      descEn: 'Master hardware components, CPU, RAM, storage, smartphone connectivity, and peripheral devices.',
      descMr: 'हार्डवेअर घटक, CPU, RAM, मेमरी, स्मार्टफोन कनेक्टिव्हिटी आणि पेरिफेरल्सचे प्रॅक्टिकल ज्ञान.',
      skillsEn: ['Hardware Identification', 'Smartphone Pairing', 'System Diagnostics'],
      skillsMr: ['हार्डवेअर ओळख', 'स्मार्टफोन सिंक', 'बेसिक ट्रबलशूटिंग'],
      category: 'Foundation'
    },
    {
      id: 2,
      icon: Monitor,
      materialIcon: 'desktop_windows',
      titleEn: 'Windows 11 Operating System',
      titleMr: 'Windows 11 ऑपरेटिंग सिस्टम',
      descEn: 'Learn desktop customization, File Explorer navigation, folder organization, control panel, and app settings.',
      descMr: 'डेस्कटॉप कस्टमायझेशन, फाइल एक्स्प्लोरर, फोल्डर रचना, कंट्रोल पॅनेल आणि ॲप सेटिंग्ज.',
      skillsEn: ['File Management', 'Windows 11 Settings', 'Shortcut Keys'],
      skillsMr: ['फाइल मॅनेजमेंट', 'विंडोज सेटिंग्ज', 'शॉर्टकट कीज'],
      category: 'System'
    },
    {
      id: 3,
      icon: Keyboard,
      materialIcon: 'keyboard',
      titleEn: 'English & Marathi Typing Skills',
      titleMr: 'इंग्रजी व मराठी टायपिंग कौशल्य',
      descEn: 'Touch typing techniques, speed building, Unicode Marathi typing (ISM/ISM V6), and official keyboard layouts.',
      descMr: 'टच टायपिंग पद्धती, टायपिंग स्पीड वाढवणे, युनिकोड मराठी टायपिंग (ISM V6).',
      skillsEn: ['Touch Typing', 'Marathi ISM Typing', 'Speed Building'],
      skillsMr: ['टच टायपिंग', 'मराठी युनिकोड', 'स्पीड बिल्डींग'],
      category: 'Skills'
    },
    {
      id: 4,
      icon: FileText,
      materialIcon: 'description',
      titleEn: 'MS Word 2021 (Documentation)',
      titleMr: 'MS Word 2021 (दस्तावेज निर्मिती)',
      descEn: 'Official letter drafting, professional resume creation, report formatting, tables, graphics, and Mail Merge.',
      descMr: 'अधिकृत पत्रव्यवहार, बायोडाटा बनवणे, अहवाल फॉरमॅटिंग, तक्ते व मेल मर्ज.',
      skillsEn: ['Document Drafting', 'Mail Merge', 'Resume Building'],
      skillsMr: ['पत्रलेखन', 'मेल मर्ज', 'रिज्युमे मेकिंग'],
      category: 'Office Productivity'
    },
    {
      id: 5,
      icon: Table,
      materialIcon: 'table_chart',
      titleEn: 'MS Excel 2021 (Data & Formulas)',
      titleMr: 'MS Excel 2021 (डेटा व फॉर्म्युले)',
      descEn: 'Spreadsheet creation, mathematical & logical formulas, dynamic charts, data sorting, and auto-filtering.',
      descMr: 'स्प्रेडशीट, गणितीय व लॉजिकल फॉर्म्युले, आलेख (Charts), डेटा सॉर्टिंग व फिल्टरिंग.',
      skillsEn: ['Excel Formulas', 'Charts & Graphs', 'Budgeting Sheets'],
      skillsMr: ['फॉर्म्युले व फंक्शन्स', 'चार्ट्स', 'बजेट शीट'],
      category: 'Data Management'
    },
    {
      id: 6,
      icon: Presentation,
      materialIcon: 'slideshow',
      titleEn: 'MS PowerPoint 2021 (Presentations)',
      titleMr: 'MS PowerPoint 2021 (प्रेझेंटेशन)',
      descEn: 'Design animated slides, transitions, multimedia audio/video embedding, and high-definition video export.',
      descMr: 'ॲनिमेटेड स्लाइड्स, ट्रान्सिशन्स, ऑडिओ-व्हिडिओ जोडणे आणि व्हिडिओ प्रेझेंटेशन एक्सपोर्ट.',
      skillsEn: ['Slide Design', 'Custom Animations', 'Video Export'],
      skillsMr: ['स्लाइड डिझाईन', 'ॲनिमेशन', 'व्हिडिओ एक्सपोर्ट'],
      category: 'Presentation'
    },
    {
      id: 7,
      icon: Globe,
      materialIcon: 'public',
      titleEn: 'Internet & Online Services',
      titleMr: 'इंटरनेट व ऑनलाइन नागरिक सेवा',
      descEn: 'Web browsing, DigiLocker integration, online bill payments, Aadhaar/PAN applications, and MahaOnline portal.',
      descMr: 'वेब ब्राऊजिंग, डिजीलॉकर, ऑनलाइन बिल भरणे, आधार/पॅन सेवा आणि महाऑनलाइन पोर्टल.',
      skillsEn: ['DigiLocker', 'Online Bill Pay', 'MahaOnline Portals'],
      skillsMr: ['डिजीलॉकर', 'ऑनलाइन पेमेंट', 'शासकीय पोर्टल'],
      category: 'Digital Services'
    },
    {
      id: 8,
      icon: Mail,
      materialIcon: 'mail',
      titleEn: 'MS Outlook & Email Management',
      titleMr: 'MS Outlook व ईमेल व्यवस्थापन',
      descEn: 'Professional email drafting, calendar scheduling, file attachments, contact groups, and corporate netiquettes.',
      descMr: 'व्यावसायिक ईमेल लेखन, कॅलेंडर शेड्यूलिंग, अटॅचमेंट्स, कॉन्टॅक्ट्स व ईमेल शिष्टाचार.',
      skillsEn: ['Email Etiquette', 'Calendar Invites', 'Attachment Safety'],
      skillsMr: ['ईमेल शिष्टाचार', 'कॅलेंडर शेड्यूलिंग', 'फाइल अटॅचमेंट'],
      category: 'Communication'
    },
    {
      id: 9,
      icon: Sparkles,
      materialIcon: 'auto_awesome',
      titleEn: 'AI & Prompt Engineering',
      titleMr: 'कृत्रिम बुद्धिमत्ता (AI) व प्रॉम्ट इंजिनिअरिंग',
      descEn: 'Practical AI tools: ChatGPT, Gemini, smart web research, AI image generation, and productivity prompts.',
      descMr: 'ChatGPT, Gemini चा प्रभावी वापर, AI मजकूर निर्मिती, स्मार्ट सर्च आणि AI पॉवर्ड टूल्स.',
      skillsEn: ['ChatGPT & Gemini', 'Prompt Writing', 'AI Research'],
      skillsMr: ['ChatGPT वापर', 'प्रॉम्ट डिझाईन', 'AI रिसर्च'],
      category: 'Next-Gen AI'
    },
    {
      id: 10,
      icon: ShieldCheck,
      materialIcon: 'security',
      titleEn: 'Cyber Security & Netiquettes',
      titleMr: 'सायबर सुरक्षा व ऑनलाईन नियम',
      descEn: 'Strong password policies, Two-Factor Authentication (2FA), phishing shield, safe UPI banking, and social media safety.',
      descMr: 'पासवर्ड सुरक्षा, 2-स्टेप व्हेरीफिकेशन, फसवणूक प्रतिबंध, सुरक्षित बँकिंग व सोशल मीडिया नियम.',
      skillsEn: ['2FA Setup', 'Phishing Awareness', 'Safe UPI Banking'],
      skillsMr: ['2FA सुरक्षा', 'फिशिंग बचाव', 'सुरक्षित बँकिंग'],
      category: 'Security'
    },
    {
      id: 11,
      icon: Briefcase,
      materialIcon: 'work',
      titleEn: 'Digital Skills & Job Readiness',
      titleMr: 'डिजिटल कौशल्य व रोजगार सज्जता',
      descEn: 'Professional workplace communication, applying on job portals, interview preparation, and freelancing basics.',
      descMr: 'व्यावसायिक संवाद कौशल्य, जॉब पोर्टल्सवर अर्ज करणे, मुलाखतीची तयारी व फ्रीलान्सिंग मूलभूत ज्ञान.',
      skillsEn: ['Job Applications', 'Interview Skills', 'Workplace Communication'],
      skillsMr: ['जॉब अर्ज', 'वर्कप्लेस संवाद', 'इंटरव्ह्यू तयारी'],
      category: 'Career Growth'
    }
  ];

  const activeTopic = topics[activeIndex];

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % topics.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + topics.length) % topics.length);
  };

  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 rounded-3xl p-6 md:p-10 text-white shadow-2xl border border-slate-800 relative overflow-hidden my-8">
      {/* Background Ambient Glow & Grid Lines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent-gold/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header & Controls */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-primary text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
              {isMarathi ? '३डी कोर्स मॅप' : 'Interactive 3D Journey'}
            </span>
            <span className="text-xs text-accent-gold font-bold flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-accent-gold" /> MKCL Certified Syllabus
            </span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-white">
            {isMarathi ? 'MS-CIT ३डी लर्निंग मॅप (११ मुख्य टप्पे)' : 'MS-CIT 3D Interactive Learning Journey'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isMarathi 
              ? 'कम्प्युटर बेसिकपासून AI व जॉब रेडिनेसपर्यंतचा परिपूर्ण रोडमॅप. कोणत्याही नोडवर क्लिक करा.' 
              : 'Click any node around the center hub to explore syllabus details & practical skills.'}
          </p>
        </div>

        {/* View Mode Toggle Button */}
        <div className="flex items-center gap-2 self-start md:self-auto bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700">
          <button
            type="button"
            onClick={() => setViewMode('orbital')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'orbital' 
                ? 'bg-primary text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isMarathi ? '३डी ऑर्बिटल व्ह्यू' : '3D Orbit View'}
          </button>
          <button
            type="button"
            onClick={() => setViewMode('timeline')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              viewMode === 'timeline' 
                ? 'bg-primary text-white shadow-md' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isMarathi ? 'लिस्ट टप्प्यांचा व्ह्यू' : 'Step Timeline'}
          </button>
        </div>
      </div>

      {/* Main Interactive Map Section */}
      {viewMode === 'orbital' ? (
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-10 min-h-[500px]">
          
          {/* 3D Orbit Node Map View */}
          <div className="w-full lg:w-3/5 relative h-[380px] sm:h-[460px] flex items-center justify-center">
            
            {/* SVG Connecting Lines to Center Hub */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
              <defs>
                <linearGradient id="lineGlow" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DC2626" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.4" />
                </linearGradient>
              </defs>
              {topics.map((t, idx) => {
                const total = topics.length;
                const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
                const radiusPercent = 38; // Radius from center
                const cx = 50;
                const cy = 50;
                const x = cx + radiusPercent * Math.cos(angle);
                const y = cy + radiusPercent * Math.sin(angle);
                const isActive = idx === activeIndex;

                return (
                  <line
                    key={t.id}
                    x1={`${cx}%`}
                    y1={`${cy}%`}
                    x2={`${x}%`}
                    y2={`${y}%`}
                    stroke={isActive ? 'url(#lineGlow)' : '#334155'}
                    strokeWidth={isActive ? '2.5' : '1'}
                    strokeDasharray={isActive ? 'none' : '4 4'}
                    className="transition-all duration-300"
                  />
                );
              })}
            </svg>

            {/* Central Hub Node: 🎓 MS-CIT */}
            <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-primary via-accent-gold to-primary rounded-full blur-xl opacity-60 group-hover:opacity-100 transition duration-500 animate-pulse" />
                <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-slate-900 border-2 border-accent-gold flex flex-col items-center justify-center p-2 text-center shadow-2xl transform hover:scale-105 transition-all cursor-pointer">
                  <span className="text-2xl sm:text-4xl mb-1 transform hover:rotate-12 transition-transform">🎓</span>
                  <span className="font-extrabold text-sm sm:text-base text-white tracking-tight">MS-CIT</span>
                  <span className="text-[9px] sm:text-[10px] font-bold text-accent-gold uppercase tracking-wider">MKCL Hub</span>
                </div>
              </div>
            </div>

            {/* 11 Radial Orbital Topic Nodes */}
            {topics.map((t, idx) => {
              const total = topics.length;
              const angle = (idx / total) * 2 * Math.PI - Math.PI / 2;
              const radiusPercent = 38;
              const x = 50 + radiusPercent * Math.cos(angle);
              const y = 50 + radiusPercent * Math.sin(angle);
              const isActive = idx === activeIndex;

              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  style={{ top: `${y}%`, left: `${x}%` }}
                  className={`absolute z-30 -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 focus:outline-none ${
                    isActive ? 'scale-125 z-40' : 'hover:scale-110 opacity-80 hover:opacity-100'
                  }`}
                  title={isMarathi ? t.titleMr : t.titleEn}
                >
                  <div
                    className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center border shadow-xl transition-all ${
                      isActive
                        ? 'bg-primary border-accent-gold text-white shadow-primary/50 ring-4 ring-primary/30'
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:border-slate-500'
                    }`}
                  >
                    <span className="text-xs font-black">{t.id}</span>
                  </div>
                  {/* Tooltip Label on Hover */}
                  <div className="hidden sm:group-hover:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg border border-slate-700 pointer-events-none">
                    {isMarathi ? t.titleMr : t.titleEn}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Topic Details Card */}
          <div className="w-full lg:w-2/5 bg-slate-900/90 border border-slate-800 p-6 rounded-2xl shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center text-accent-gold font-black text-xs">
                  {activeTopic.id}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Topic {activeTopic.id} of 11 • {activeTopic.category}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                  title="Previous Topic"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all"
                  title="Next Topic"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-black text-white flex items-center gap-2">
                <span>{isMarathi ? activeTopic.titleMr : activeTopic.titleEn}</span>
              </h3>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed font-marathi-body">
                {isMarathi ? activeTopic.descMr : activeTopic.descEn}
              </p>
            </div>

            {/* Key Skills Acquired Badges */}
            <div className="space-y-2 pt-2 border-t border-slate-800">
              <span className="text-[10px] font-extrabold text-accent-gold uppercase tracking-wider">
                {isMarathi ? 'आत्मसात होणारी मुख्य कौशल्ये (Key Skills):' : 'Key Practical Skills Learned:'}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(isMarathi ? activeTopic.skillsMr : activeTopic.skillsEn).map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-slate-800 text-slate-200 border border-slate-700 text-[11px] font-semibold px-2.5 py-1 rounded-lg flex items-center gap-1"
                  >
                    <CheckCircle2 className="w-3 h-3 text-stitch-emerald shrink-0" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Progress Bar & Quick Action */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
                <span>Learning Path Progress</span>
                <span>{Math.round((activeTopic.id / 11) * 100)}% Completed</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-primary to-accent-gold transition-all duration-300 rounded-full"
                  style={{ width: `${(activeTopic.id / 11) * 100}%` }}
                />
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* Timeline List View */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10">
          {topics.map((t, idx) => (
            <div
              key={t.id}
              onClick={() => setActiveIndex(idx)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                idx === activeIndex
                  ? 'bg-slate-800/90 border-primary shadow-lg ring-2 ring-primary/30'
                  : 'bg-slate-900/60 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="w-7 h-7 rounded-lg bg-primary/20 border border-primary/40 text-accent-gold font-bold text-xs flex items-center justify-center">
                  {t.id}
                </span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.category}</span>
              </div>
              <h4 className="font-bold text-sm text-white mb-1">{isMarathi ? t.titleMr : t.titleEn}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{isMarathi ? t.descMr : t.descEn}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
