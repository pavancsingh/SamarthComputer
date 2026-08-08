import React, { useState } from 'react';
import { Sparkles, UserCheck } from 'lucide-react';
import ContactForm from '../../components/sections/ContactForm';
import GoogleMap from '../../components/sections/GoogleMap';
import CounselingModal from '../../components/forms/CounselingModal';

/**
 * ContactPage Component - Google Stitch Design System
 * Admissions & Inquiry Hub featuring multi-tab lead capture, 1-on-1 counseling booking,
 * NAP (Name, Address, Phone) details, bus stand landmark directions, and Google Maps location.
 */
export default function ContactPage({ lang = 'mr' }) {
  const [isCounselingOpen, setIsCounselingOpen] = useState(false);
  const isMarathi = lang === 'mr';

  return (
    <div className="bg-stitch-ivory min-h-screen pb-24 text-stitch-slate-dark">
      
      {/* Hero Header */}
      <section className="bg-stitch-slate-dark text-white py-16 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <span className="inline-flex items-center gap-1.5 bg-stitch-amber text-slate-950 font-extrabold text-xs px-4 py-1.5 rounded-full shadow-stitch-sm">
            <Sparkles className="w-4 h-4 text-slate-950" />
            <span>{isMarathi ? 'प्रवेश & संपर्क हेल्पडेस्क' : 'Admissions & Inquiry Desk'}</span>
          </span>

          <h1 className={`text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'समर्थ कॉम्प्युटर्स खंडाळा येथे संपर्क साधा' : 'Get in Touch with Samarth Computers Khandala'}
          </h1>

          <p className={`text-slate-300 text-sm sm:text-base font-medium max-w-2xl mx-auto ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi
              ? 'क्लास प्रवेश, सीएससी शासकीय सेवा किंवा लॅपटॉप दुरुस्तीबाबत कोणत्याही चौकशीसाठी थेट भेट द्या किंवा ऑनलाईन अर्ज करा.'
              : 'Visit our center near Khandala Bus Stand or submit your course/CSC service inquiry online.'}
          </p>

          <div className="pt-4 flex justify-center">
            <button
              type="button"
              onClick={() => setIsCounselingOpen(true)}
              className="bg-stitch-amber hover:bg-amber-400 text-slate-950 font-black text-xs px-6 py-3.5 rounded-2xl shadow-stitch-glow transition-all hover:scale-105 flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4 text-slate-950" />
              <span>{isMarathi ? '🗣️ १-ऑन-१ मोफत करिअर समुपदेशन बुक करा' : 'Book 1-on-1 Free Counseling'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Multi-Tab Lead Form Section */}
      <section className="pt-12">
        <ContactForm lang={lang} />
      </section>

      {/* Google Map & Landmark Section */}
      <section className="pt-12">
        <GoogleMap lang={lang} />
      </section>

      {/* Counseling Modal */}
      <CounselingModal
        isOpen={isCounselingOpen}
        onClose={() => setIsCounselingOpen(false)}
        lang={lang}
      />
    </div>
  );
}

