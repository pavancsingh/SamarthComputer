import React from 'react';
import { ShieldAlert, ArrowRight, MessageCircle, FileText, CheckCircle2 } from 'lucide-react';

/**
 * GovtSchemesSection Component
 * Auto-updating news cards for new Maharashtra and Central Government welfare schemes.
 */
export default function GovtSchemesSection({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  const schemes = [
    {
      titleMr: "नमो शेतकरी महासन्मान निधी योजना",
      titleEn: "Namo Shetkari Maha Samman Nidhi",
      descMr: "वार्षिक ₹१२,००० आर्थिक मदत. CSC केंद्रावर e-KYC आणि बँक खाते सीडिंग प्रक्रिया सुरू.",
      descEn: "Annual ₹12,000 assistance for farmers. E-KYC & Aadhaar seeding assistance available at center.",
      badge: "शेतकरी विशेष",
      link: "https://wa.me/919822000000?text=I%20want%20info%20about%20Namo%20Shetkari%20Scheme"
    },
    {
      titleMr: "मुख्यमंत्री लाडकी बहीण योजना 2026",
      titleEn: "Ladki Bahin Yojana Scheme",
      descMr: "पात्र महिलांना दरमहा ₹१,५०० आर्थिक मदत. ऑनलाइन अर्ज भरणी व कागदपत्र तपासणी.",
      descEn: "Monthly ₹1,500 assistance for eligible women. Direct online form submission at CSC counter.",
      badge: "महिला विशेष",
      link: "https://wa.me/919822000000?text=I%20want%20info%20about%20Ladki%20Bahin%20Yojana"
    },
    {
      titleMr: "आयुष्मान भारत - ५ लाख मोफत आरोग्य कार्ड",
      titleEn: "Ayushman Bharat PM-JAY Health Card",
      descMr: "प्रति कुटुंब ५ लाख रुपयांपर्यंत मोफत वैद्यकीय उपचार कार्ड. झटपट ५ मिनिटात प्रिंट.",
      descEn: "Free 5 Lakh health insurance cover card. Instant verification & printing at center.",
      badge: "आरोग्य कार्ड",
      link: "https://wa.me/919822000000?text=I%20want%20info%20about%20Ayushman%20Bharat"
    }
  ];

  return (
    <section className="py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10 pb-6 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-accent-gold/20 text-accent-gold text-xs font-bold px-3 py-1 rounded-full mb-2 border border-accent-gold/30">
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>{isMarathi ? 'नवीन शासकीय योजना अपडेट्स' : 'Latest Government Welfare Schemes'}</span>
            </div>
            <h2 className={`text-2xl sm:text-3xl font-extrabold text-white ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'ऑनलाइन सेवा व शासकीय योजना' : 'Online Services & Govt Schemes'}
            </h2>
          </div>

          <a
            href="https://wa.me/919822000000?text=I%20want%20info%20about%20Govt%20Schemes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-dark text-slate-950 font-extrabold text-xs px-4 py-2.5 rounded-xl transition-transform hover:scale-105 shrink-0"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{isMarathi ? 'सर्व योजनांची माहिती व्हाट्सॲपवर मिळवा' : 'Get Scheme Info on WhatsApp'}</span>
          </a>
        </div>

        {/* Schemes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {schemes.map((item, idx) => (
            <div 
              key={idx}
              className="bg-slate-800/80 border border-slate-700 p-6 rounded-2xl flex flex-col justify-between hover:border-accent-gold/60 transition-all group"
            >
              <div className="space-y-3">
                <span className="inline-block bg-primary/30 text-secondary-cyan text-[10px] font-bold px-2.5 py-1 rounded-md border border-secondary-cyan/30">
                  {item.badge}
                </span>

                <h3 className={`font-bold text-base text-white group-hover:text-accent-gold transition-colors ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? item.titleMr : item.titleEn}
                </h3>

                <p className={`text-xs text-slate-300 leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? item.descMr : item.descEn}
                </p>
              </div>

              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-between text-xs font-bold text-accent-gold hover:text-amber-300 pt-3 border-t border-slate-700/60"
              >
                <span>{isMarathi ? 'कागदपत्रे तपासणी करा' : 'Check Required Docs'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
