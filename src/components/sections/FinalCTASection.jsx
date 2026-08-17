import React, { useState, useEffect } from 'react';
import { Phone, MessageCircle, Send } from 'lucide-react';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * FinalCTASection Component
 * Prominent conversion footer CTA block with Call Now, WhatsApp, and Online Enquiry triggers.
 */
export default function FinalCTASection({ lang = 'mr', onNavigate }) {
  const [settings, setSettings] = useState(sharedStore.getSiteSettings());
  const isMarathi = lang === 'mr';

  useEffect(() => {
    const unsub = sharedStore.subscribe(() => setSettings(sharedStore.getSiteSettings()));
    return () => unsub();
  }, []);

  const phone = settings.callCtaPhone || settings.contactPhone || '+91 95523 45061';
  const cleanPhone = (settings.callCtaPhone || settings.contactPhone || '+919552345061').replace(/\D/g, '');
  const whatsapp = settings.contactWhatsapp || '919552345061';

  return (
    <section className="py-16 md:py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Accent Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-3xl p-8 md:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 backdrop-blur-md">
          
          {/* Text Content */}
          <div className="max-w-2xl text-center lg:text-left space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              {isMarathi
                ? 'माहिती तंत्रज्ञानात कुशल व्हा आणि करिअर घडवा!'
                : 'Build Your IT Career with Industry Certified Training'}
            </h2>

            <p className="text-slate-300 text-sm sm:text-base font-medium leading-relaxed">
              {isMarathi
                ? 'MS-CIT, टॅली प्राइम GST, ॲडव्हान्स एक्सल आणि सर्व ऑनलाइन शासकीय सेवांसाठी आजच समर्थ कॉम्प्युटर्स खंडाळा येथे संपर्क साधा.'
                : 'Contact Samarth Computers, Khandala today for course admissions, free counseling, or fast online government setu services.'}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-3.5 w-full lg:w-auto shrink-0">
            {/* Call Now Button */}
            <a
              href={`tel:+${cleanPhone}`}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm px-7 py-4 rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2.5 hover:scale-105"
            >
              <Phone className="w-5 h-5 fill-white/20" />
              <span>{isMarathi ? '📞 थेट बोलण्यासाठी कॉल करा' : `Call Counselor (${phone})`}</span>
            </a>

            {/* WhatsApp Button */}
            <a
              href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('Hello Samarth Computers, I would like to inquire about course admissions and batch timings.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700 hover:bg-emerald-600 text-white font-black text-sm px-7 py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 hover:scale-105 border border-slate-600"
            >
              <MessageCircle className="w-5 h-5 text-emerald-400" />
              <span>{isMarathi ? 'व्हाट्सॲपवर चॅट करा' : 'Chat on WhatsApp'}</span>
            </a>

            {/* Online Enquiry Trigger */}
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('inquiry-form');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
                else if (onNavigate) onNavigate('contact');
              }}
              className="bg-primary hover:bg-stitch-red-dark text-white font-black text-sm px-7 py-4 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2.5 hover:scale-105"
            >
              <Send className="w-5 h-5" />
              <span>{isMarathi ? 'ऑनलाइन चौकशी संदेश पाठवा' : 'Send Online Enquiry'}</span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}
