import React, { useState } from 'react';
import { Download, Send, CheckCircle2, Shield } from 'lucide-react';

/**
 * BrochureSection Component - Google Stitch Design
 * Lead magnet allowing users to download course prospectus and fee charts.
 */
export default function BrochureSection({ lang = 'mr' }) {
  const [mobile, setMobile] = useState('');
  const [course, setCourse] = useState('mscit');
  const [submitted, setSubmitted] = useState(false);
  const isMarathi = lang === 'mr';

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!mobile || mobile.length < 10) return;
    setSubmitted(true);
    const text = encodeURIComponent(`Hello Samarth Computers, I want to download the official Syllabus PDF for ${course}. My WhatsApp number is ${mobile}.`);
    window.open(`https://wa.me/919552345061?text=${text}`, '_blank');
  };

  return (
    <section id="brochure" className="py-16 bg-stitch-slate-dark text-white relative overflow-hidden border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column */}
          <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
            <span className="inline-flex items-center gap-1.5 bg-stitch-amber text-slate-950 font-extrabold text-xs px-4 py-1.5 rounded-full shadow-stitch-sm">
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span>{isMarathi ? 'मोफत माहिती पत्रक (Prospectus 2026)' : 'Free Course Prospectus 2026'}</span>
            </span>

            <h2 className={`text-2xl sm:text-4xl font-black tracking-tight leading-tight ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi ? 'कोर्सचा संपूर्ण सिलॅबस आणि फी स्ट्रक्चर डाऊनलोड करा' : 'Download Complete Course Syllabus & Fee Schedule'}
            </h2>

            <p className={`text-slate-300 text-sm sm:text-base font-medium max-w-xl ${isMarathi ? 'marathi-text' : ''}`}>
              {isMarathi
                ? 'तुमच्या मोबाईलवर MS-CIT, टॅली व टायपिंग क्लासची सविस्तर माहिती, परीक्षा स्वरूप आणि सवलत ऑफर्स मिळवा.'
                : 'Get complete course modules, exam patterns, fee instalments, and seasonal discount details directly on WhatsApp.'}
            </p>

            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs text-slate-300 font-semibold pt-2">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-stitch-amber" />
                <span>{isMarathi ? 'अधिकृत MKCL अभ्यासक्रम PDF' : 'Official MKCL Syllabus PDF'}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-stitch-amber" />
                <span>{isMarathi ? 'हप्त्यांची माहिती' : 'Instalment Payment Structure'}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Lead Form Card */}
          <div className="lg:col-span-5 bg-white text-stitch-slate-dark p-6 sm:p-8 rounded-3xl shadow-stitch-lg border border-slate-200">
            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-full bg-emerald-100 text-stitch-emerald flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="font-black text-lg text-stitch-slate-dark">
                  {isMarathi ? 'माहिती पत्रक पाठवले आहे!' : 'Brochure Sent Successfully!'}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {isMarathi
                    ? 'तुमच्या व्हाट्सॲप नंबरवर सिलॅबस PDF पाठवली गेली आहे. धन्यवाद!'
                    : 'The PDF prospectus has been sent to your WhatsApp number. Thank you!'}
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-extrabold text-stitch-red underline pt-2"
                >
                  {isMarathi ? 'दुसरा फॉर्म डाऊनलोड करा' : 'Download Another Brochure'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className={`font-black text-base text-stitch-slate-dark text-center ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? 'मोफत PDF डाऊनलोड फॉर्म' : 'Free Prospectus Download'}
                </h3>

                <div>
                  <label className="block text-xs font-extrabold text-stitch-slate-dark mb-1">
                    {isMarathi ? 'कोर्स निवडा:' : 'Select Course:'}
                  </label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-bold text-stitch-slate-dark focus:ring-2 focus:ring-stitch-red focus:border-stitch-red shadow-stitch-sm transition-all"
                  >
                    <option value="mscit">MS-CIT (MKCL Certified)</option>
                    <option value="tally">Tally Prime + GST</option>
                    <option value="typing">GCC-TBC Typing (Eng/Mar)</option>
                    <option value="excel">Advanced Excel & Analytics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-stitch-slate-dark mb-1">
                    {isMarathi ? 'तुमचा व्हाट्सॲप नंबर:' : 'WhatsApp Mobile Number:'}
                  </label>
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="e.g. 9552345061"
                    required
                    maxLength={10}
                    className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-mono text-stitch-slate-dark focus:ring-2 focus:ring-stitch-red focus:border-stitch-red shadow-stitch-sm transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-stitch-amber hover:bg-amber-400 text-slate-950 font-black text-xs py-3.5 rounded-2xl shadow-stitch-glow transition-all hover:scale-[1.01] flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-slate-950" />
                  <span>{isMarathi ? 'व्हाट्सॲपवर PDF मिळवा' : 'Get PDF on WhatsApp'}</span>
                </button>

                <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-semibold">
                  <Shield className="w-3 h-3 text-stitch-emerald" />
                  <span>{isMarathi ? 'तुमचा मोबाईल नंबर पूर्णपणे सुरक्षित राहील.' : '100% Privacy Protected.'}</span>
                </div>
              </form>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}

