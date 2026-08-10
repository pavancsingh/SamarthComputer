import React, { useState, useEffect } from 'react';
import { Sparkles, X, CheckCircle2, Send, Clock, User, Phone } from 'lucide-react';
import { CourseRepository } from '../../repositories/CourseRepository';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * AdmissionModal Component
 * Interactive modal for booking free demo classes and instant course admissions.
 */
export default function AdmissionModal({ isOpen, onClose, defaultCourse = 'mscit', lang = 'mr' }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [courses, setCourses] = useState(sharedStore.getCourses());
  const [batchesList, setBatchesList] = useState(sharedStore.getBatches());
  const [course, setCourse] = useState(defaultCourse);
  const [batch, setBatch] = useState('09:30 AM - 11:00 AM');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    CourseRepository.getAllCourses().then((res) => {
      if (res && res.length > 0) setCourses(res);
    });

    const unsubscribe = sharedStore.subscribe(() => {
      setCourses(sharedStore.getCourses());
      setBatchesList(sharedStore.getBatches());
    });
    return unsubscribe;
  }, []);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !mobile || mobile.length < 10) return;

    setIsSubmitting(true);
    await CourseRepository.submitAdmissionInquiry({
      name,
      mobile,
      course,
      batchTiming: batch
    });
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center text-accent-gold">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-extrabold text-base ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi ? 'मोफत डेमो क्लास & प्रवेश आरक्षित करा' : 'Book Free Demo & Reserve Seat'}
              </h3>
              <div className="text-[11px] text-slate-200">
                {isMarathi ? 'समर्थ कॉम्प्युटर्स, खंडाळा सेंटर' : 'Samarth Computers, Khandala Center'}
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="text-slate-300 hover:text-white p-1 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className={`font-extrabold text-xl text-slate-900 ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi ? 'प्रवेश अर्ज प्राप्त झाला आहे!' : 'Seat Reserved Successfully!'}
              </h4>
              <p className={`text-xs text-slate-600 max-w-sm mx-auto ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi
                  ? 'तुमच्या मोबाईलवर कन्फर्मेशन संदेश पाठवला आहे. आमचे समुपदेशक लवकरच तुमच्याशी बोलतील.'
                  : 'A confirmation SMS has been sent to your phone. Our course counselor will call you shortly.'}
              </p>
              <button
                type="button"
                onClick={onClose}
                className="bg-slate-900 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-md"
              >
                {isMarathi ? 'बंद करा' : 'Close Window'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isMarathi ? 'विद्यार्थ्याचे नाव:' : 'Student Full Name:'} *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isMarathi ? 'उदा. राहुल सूर्यवंशी' : 'e.g. Rahul Suryavanshi'}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {isMarathi ? 'मोबाईल नंबर:' : 'Mobile Number:'} *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    placeholder="e.g. 9822XXXXXX"
                    required
                    maxLength={10}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isMarathi ? 'कोर्स निवडा:' : 'Select Course:'}
                  </label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {courses.map((c) => (
                      <option key={c.id || c.slug} value={c.title || c.titleEn}>
                        {isMarathi ? (c.subtitleMr || c.subtitle_mr || c.title) : (c.title || c.titleEn)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isMarathi ? 'पसंतीची बॅच वेळ:' : 'Preferred Batch Time:'}
                  </label>
                  <select
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    {batchesList.length > 0 ? (
                      batchesList.map((b) => (
                        <option key={b.id} value={b.time}>
                          {b.time} ({isMarathi ? (b.statusMr || b.status_mr || b.category) : (b.statusEn || b.status_en || b.category)})
                        </option>
                      ))
                    ) : (
                      <>
                        <option value="08:00 AM - 09:30 AM">08:00 AM - 09:30 AM (सकाळ)</option>
                        <option value="09:30 AM - 11:00 AM">09:30 AM - 11:00 AM (सकाळ)</option>
                        <option value="02:30 PM - 04:00 PM">02:30 PM - 04:00 PM (दुपार)</option>
                        <option value="05:30 PM - 07:00 PM">05:30 PM - 07:00 PM (संध्याकाळ)</option>
                      </>
                    )}
                  </select>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-accent-gold to-amber-500 hover:from-amber-500 hover:to-accent-gold text-slate-950 font-extrabold text-sm py-3.5 rounded-xl shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>
                  {isSubmitting
                    ? (isMarathi ? 'सादर होत आहे...' : 'Submitting...')
                    : (isMarathi ? 'जागा निश्चित करा (Confirm Seat)' : 'Confirm Seat Reservation')}
                </span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
