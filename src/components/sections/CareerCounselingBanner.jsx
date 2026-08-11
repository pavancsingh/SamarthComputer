import React from 'react';
import { UserCheck, ArrowRight, MessageSquare } from 'lucide-react';

/**
 * CareerCounselingBanner Component - Google Stitch Design
 * Offer 1-on-1 free career guidance sessions for students and graduates.
 */
export default function CareerCounselingBanner({ lang = 'mr' }) {
  const isMarathi = lang === 'mr';

  return (
    <section className="py-12 bg-stitch-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-stitch-slate-dark rounded-3xl p-8 sm:p-12 text-white shadow-stitch-lg relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 border border-slate-700/80">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-stitch-amber/15 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3.5 text-center lg:text-left relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 bg-stitch-amber text-slate-950 font-extrabold text-xs px-3.5 py-1 rounded-full uppercase tracking-wider shadow-stitch-sm">
              <UserCheck className="w-4 h-4 text-slate-950" />
              <span>{isMarathi ? 'मोफत करिअर समुपदेशन' : 'Free 1-on-1 Career Counseling'}</span>
            </span>

            <h2 className={`text-2xl sm:text-4xl font-black text-white leading-tight ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? '१०वी, १२वी किंवा ग्रॅज्युएशननंतर पुढे काय करायचे?' : 'Confused About Career Options After 10th, 12th or Graduation?'}
            </h2>

            <p className={`text-slate-300 text-sm sm:text-base font-medium leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi
                ? 'आमच्या तज्ज्ञ शिक्षकांसोबत १-ऑन-१ मोफत चर्चा करा आणि तुमच्या आवडीनुसार योग्य संगणक कोर्स निवडा.'
                : 'Book a free personal session with our senior counselor to find the best job-oriented computer path.'}
            </p>
          </div>

          <div className="shrink-0 relative z-10 flex flex-col sm:flex-row gap-3">
            <a
              href="tel:+919552345061"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm px-6 py-4 rounded-2xl shadow-stitch-sm transition-all hover:scale-105"
              title="Call Counselor Directly: +91 95523 45061"
            >
              <span className="material-symbols-outlined text-[18px]">call</span>
              <span>{isMarathi ? '📞 थेट कॉल करा' : 'Call Counselor Now'}</span>
            </a>

            <a
              href="#inquiry-form"
              className="inline-flex items-center justify-center gap-2 bg-stitch-amber hover:bg-amber-400 text-slate-950 font-black text-xs sm:text-sm px-6 py-4 rounded-2xl shadow-stitch-glow transition-all hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 text-slate-950" />
              <span className={isMarathi ? 'marathi-text font-bold' : ''}>
                {isMarathi ? '🗣️ मोफत सेशन बुक करा' : 'Book Free Session'}
              </span>
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}

