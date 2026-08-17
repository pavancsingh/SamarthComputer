import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Send, CheckCircle2, MessageCircle, Sparkles, Navigation } from 'lucide-react';
import { CourseRepository } from '../../repositories/CourseRepository';
import { InquiryRepository } from '../../repositories/InquiryRepository';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * ContactForm Component - Google Stitch Design System
 * Multi-tab primary lead generation form + NAP contact cards for BOTH official Khandala branches + Compact Google Map.
 */
export default function ContactForm({ lang = 'mr' }) {
  const [activeTab, setActiveTab] = useState('course');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedItem, setSelectedItem] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [courses, setCourses] = useState([]);
  const [cscServices, setCscServices] = useState([]);
  const [govtServices, setGovtServices] = useState([]);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    loadData();
    const unsubscribe = sharedStore.subscribe(() => {
      loadData();
    });
    return unsubscribe;
  }, []);

  async function loadData() {
    const cData = await CourseRepository.getCourses('all');
    const cscData = await InquiryRepository.getCSCServices('all');
    const govtData = await InquiryRepository.getGovtServices('all');

    setCourses(cData || []);
    setCscServices(cscData || []);
    setGovtServices(govtData || []);

    if (cData && cData.length > 0 && !selectedItem) {
      setSelectedItem(cData[0].title);
    }
  }

  const [lastSubmitTime, setLastSubmitTime] = useState(0);
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    const cleanName = name.trim().replace(/<[^>]*>/g, '');
    const cleanPhone = phone.trim().replace(/\D/g, '');

    if (!cleanName || cleanName.length < 2) {
      setFormError(isMarathi ? 'कृपया वैध नाव प्रविष्ट करा.' : 'Please enter a valid name.');
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setFormError(isMarathi ? 'कृपया १० अंकांचा वैध मोबाईल नंबर प्रविष्ट करा.' : 'Please enter a valid 10-digit mobile number.');
      return;
    }

    const now = Date.now();
    if (now - lastSubmitTime < 5000) {
      setFormError(isMarathi ? 'कृपया पुन्हा प्रयत्न करण्यापूर्वी ५ सेकंद थांबा.' : 'Please wait 5 seconds before submitting again.');
      return;
    }

    setLastSubmitTime(now);
    const chosen = selectedItem || (courses.length > 0 ? courses[0].title : 'MS-CIT');

    if (activeTab === 'course') {
      await CourseRepository.submitAdmissionInquiry({
        name: cleanName,
        mobile: cleanPhone,
        courseId: chosen,
        batchTiming: 'Morning'
      });
    } else {
      await InquiryRepository.submitCSCInquiry({
        name: cleanName,
        mobile: cleanPhone,
        serviceId: chosen
      });
    }

    setSubmitted(true);
    const text = encodeURIComponent(`Hello Samarth Computers, my name is ${cleanName} (${cleanPhone}). I am inquiring about ${chosen}.`);
    window.open(`https://wa.me/919552345061?text=${text}`, '_blank');
  };

  return (
    <section id="inquiry-form" className="py-20 bg-white border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 bg-stitch-red-light text-stitch-red font-extrabold text-xs px-4 py-1.5 rounded-full border border-stitch-red-border shadow-stitch-sm">
            <Sparkles className="w-4 h-4 text-stitch-red" />
            <span>{isMarathi ? 'प्रवेश व चौकशी केंद्र' : 'Inquiry & Admission Desk'}</span>
          </div>

          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-black text-stitch-slate-dark tracking-tight ${isMarathi ? 'marathi-text' : ''}`}>
            {isMarathi ? 'आजच संपर्क साधा किंवा आमच्या दोन्ही शाखांना भेट द्या' : 'Get in Touch or Visit Our 2 Official Branches'}
          </h2>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Both Official Branches + Compact Google Map */}
          <div className="lg:col-span-5 space-y-5">
            
            {/* Branch 1 Card */}
            <div className="bg-stitch-slate-dark text-white p-6 rounded-3xl space-y-4 shadow-stitch-md border border-slate-700/80 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-3.5">
                <div>
                  <h3 className="font-black text-base text-white">
                    {isMarathi ? 'समर्थ कॉम्प्युटर्स (मुख्य शाखा)' : 'Samarth Computers (Main Branch)'}
                  </h3>
                  <div className="text-[11px] text-slate-400 font-semibold">{isMarathi ? 'मुख्य शाखा • खंडाळा' : 'Main Branch • Khandala'}</div>
                </div>
                <span className="bg-stitch-amber/20 text-stitch-amber text-[10px] font-black px-3 py-1 rounded-full border border-stitch-amber/40 uppercase">
                  ALC: 13210399
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-slate-300 font-medium">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-stitch-amber shrink-0 mt-0.5" />
                  <span>{isMarathi ? 'Civil Court समोर, खंडाळा, जि. सातारा - ४१२८०२' : 'Opp. Civil Court, Khandala, Dist. Satara - 412802'}</span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-stitch-amber shrink-0" />
                    <a href="tel:+919552345061" className="font-bold text-white hover:underline">9552345061 / 9850283664</a>
                  </div>
                  <a
                    href="tel:+919552345061"
                    className="px-3 py-1 bg-stitch-amber text-slate-950 font-black text-[11px] rounded-lg shadow-sm hover:scale-105 transition-all"
                  >
                    📞 {isMarathi ? 'कॉल करा' : 'Call Now'}
                  </a>
                </div>
              </div>
            </div>

            {/* Branch 2 Card */}
            <div className="bg-stitch-red text-white p-6 rounded-3xl space-y-4 shadow-stitch-md border border-red-700/80 relative overflow-hidden">
              <div className="flex items-center justify-between border-b border-red-400/30 pb-3.5">
                <div>
                  <h3 className="font-black text-base text-white">
                    {isMarathi ? 'समर्थ कॉम्प्युटर्स (शाखा क्र. २)' : 'Samarth Computers (Branch 2)'}
                  </h3>
                  <div className="text-[11px] text-red-200 font-semibold">{isMarathi ? 'शाखा क्र. २ • खंडाळा' : 'Branch 2 • Khandala'}</div>
                </div>
                <span className="bg-white/20 text-white text-[10px] font-black px-3 py-1 rounded-full border border-white/30 uppercase">
                  ALC: 13210273
                </span>
              </div>

              <div className="space-y-2.5 text-xs text-red-100 font-medium">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
                  <span>{isMarathi ? 'राजेंद्र विद्यालयाजवळ, खंडाळा, जि. सातारा - ४१२८०२' : 'Near Rajendra Vidhalya, Khandala, Dist. Satara - 412802'}</span>
                </div>
                <div className="flex items-center justify-between gap-2 pt-1">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-amber-300 shrink-0" />
                    <a href="tel:+919850283664" className="font-bold text-white hover:underline">9850283664 / 9158879900</a>
                  </div>
                  <a
                    href="tel:+919850283664"
                    className="px-3 py-1 bg-white text-stitch-red font-black text-[11px] rounded-lg shadow-sm hover:scale-105 transition-all"
                  >
                    📞 Call Now
                  </a>
                </div>
              </div>
            </div>

            {/* Direct Call & WhatsApp Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="tel:+919552345061"
                className="flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs py-3.5 rounded-2xl shadow-stitch-sm transition-all hover:scale-[1.01]"
              >
                <Phone className="w-4 h-4 text-white fill-white/20" />
                <span>{isMarathi ? '📞 थेट कॉल करा (Call Now)' : 'Call Now (+91 95523 45061)'}</span>
              </a>

              <a
                href="https://wa.me/919552345061?text=Hello%20Samarth%20Computers"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-stitch-whatsapp hover:bg-emerald-400 text-slate-950 font-black text-xs py-3.5 rounded-2xl shadow-stitch-sm transition-all hover:scale-[1.01]"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp Helpline</span>
              </a>
            </div>

            {/* Compact Short Google Map */}
            <div className="bg-white border border-slate-200/90 rounded-3xl overflow-hidden shadow-stitch-sm space-y-0 relative">
              <div className="p-3.5 bg-slate-50 border-b border-slate-200/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-stitch-red shrink-0" />
                  <span className="font-extrabold text-xs text-stitch-slate-dark">
                    {isMarathi ? 'गूगल मॅप लोकेशन (खंडाळा सेंटर)' : 'Google Map Location'}
                  </span>
                </div>
                <a 
                  href="https://maps.google.com/maps?q=Khandala+Bus+Stand+Satara"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-extrabold text-stitch-red hover:underline flex items-center gap-1"
                >
                  <span>{isMarathi ? 'मॅप उघडा' : 'Open Map'}</span>
                  <Navigation className="w-3 h-3 text-stitch-red" />
                </a>
              </div>
              <iframe
                title="Samarth Computers Khandala Google Map Location"
                src="https://maps.google.com/maps?q=Khandala+Bus+Stand+Satara&t=&z=15&ie=UTF8&iwloc=&output=embed"
                className="w-full h-44 border-0 filter grayscale-[15%] hover:grayscale-0 transition-all duration-300"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

          </div>

          {/* Right Column: Multi-Tab Interactive Form Card */}
          <div className="lg:col-span-7 bg-stitch-ivory border border-slate-200/90 p-6 sm:p-8 rounded-3xl shadow-stitch-md">
            
            {/* Form Intent Tab Switcher */}
            <div className="flex items-center gap-2 border-b border-slate-200/80 pb-4 mb-6">
              {[
                { id: 'course', labelMr: '🎓 कॉम्प्युटर कोर्स', labelEn: '🎓 Computer Courses' },
                { id: 'csc', labelMr: '📜 शासकीय दाखले', labelEn: '📜 Govt Services' }
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(t.id);
                    if (t.id === 'course' && courses.length > 0) setSelectedItem(courses[0].title);
                    if (t.id === 'csc' && cscServices.length > 0) setSelectedItem(cscServices[0].titleMr || cscServices[0].title_mr);
                  }}
                  className={`px-4 py-2.5 rounded-full text-xs font-black transition-all shadow-stitch-sm ${
                    activeTab === t.id
                      ? 'bg-stitch-red text-white'
                      : 'bg-white text-stitch-slate-dark hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  {isMarathi ? t.labelMr : t.labelEn}
                </button>
              ))}
            </div>


            {submitted ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-stitch-emerald flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="font-black text-xl text-stitch-slate-dark">
                  {isMarathi ? 'चौकशी अर्ज प्राप्त झाला!' : 'Inquiry Submitted Successfully!'}
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto font-medium">
                  {isMarathi
                    ? 'आमचे प्रतिनिधी लवकरच तुमच्याशी संपर्क साधतील. धन्यवाद!'
                    : 'Our counselor will contact you shortly on your phone number. Thank you!'}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-xs font-extrabold text-stitch-red underline pt-2"
                >
                  {isMarathi ? 'दुसरा अर्ज करा' : 'Submit Another Form'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold rounded-xl animate-in fade-in">
                    {formError}
                  </div>
                )}
                <div>
                  <label className="block text-xs font-extrabold text-stitch-slate-dark mb-1.5">
                    {isMarathi ? 'विद्यार्थ्याचे नाव:' : 'Full Name:'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    required
                    className="w-full p-3.5 bg-white border border-slate-300 rounded-2xl text-xs font-medium text-stitch-slate-dark focus:ring-2 focus:ring-stitch-red focus:border-stitch-red shadow-stitch-sm transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold text-stitch-slate-dark mb-1.5">
                    {isMarathi ? 'मोबाईल नंबर:' : 'Mobile Number:'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 9552345061"
                    required
                    maxLength={10}
                    className="w-full p-3.5 bg-white border border-slate-300 rounded-2xl text-xs font-mono text-stitch-slate-dark focus:ring-2 focus:ring-stitch-red focus:border-stitch-red shadow-stitch-sm transition-all"
                  />
                </div>

                {activeTab === 'course' && (
                  <div>
                    <label className="block text-xs font-extrabold text-stitch-slate-dark mb-1.5">
                      {isMarathi ? 'अभ्यासक्रम निवडा (Live Synced Courses):' : 'Select Course:'}
                    </label>
                    <select
                      value={selectedItem}
                      onChange={(e) => setSelectedItem(e.target.value)}
                      className="w-full p-3.5 bg-white border border-slate-300 rounded-2xl text-xs font-extrabold text-stitch-slate-dark focus:ring-2 focus:ring-stitch-red focus:border-stitch-red shadow-stitch-sm transition-all"
                    >
                      {courses.map((c) => (
                        <option key={c.id || c.slug} value={c.title}>
                          {c.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {activeTab === 'csc' && (
                  <div>
                    <label className="block text-xs font-extrabold text-stitch-slate-dark mb-1.5">
                      {isMarathi ? 'शासकीय सेवा निवडा:' : 'Select Govt Service:'}
                    </label>
                    <select
                      value={selectedItem}
                      onChange={(e) => setSelectedItem(e.target.value)}
                      className="w-full p-3.5 bg-white border border-slate-300 rounded-2xl text-xs font-extrabold text-stitch-slate-dark focus:ring-2 focus:ring-stitch-red focus:border-stitch-red shadow-stitch-sm transition-all"
                    >
                      {cscServices.map((s) => (
                        <option key={s.id || s.slug} value={s.titleMr || s.title_mr || s.titleEn}>
                          {s.titleMr || s.title_mr || s.titleEn}
                        </option>
                      ))}
                      {govtServices.map((g) => (
                        <option key={g.id || g.slug} value={g.titleMr || g.title_mr || g.titleEn}>
                          {g.titleMr || g.title_mr || g.titleEn}
                        </option>
                      ))}
                    </select>
                  </div>
                )}



                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-stitch-red to-stitch-red-dark hover:from-stitch-red-dark hover:to-red-800 text-white font-black text-xs py-4 rounded-2xl shadow-stitch-glow transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                >
                  <Send className="w-4 h-4 text-white" />
                  <span>{isMarathi ? 'अर्ज पाठवा (Submit Inquiry)' : 'Submit Inquiry & Connect'}</span>
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}


