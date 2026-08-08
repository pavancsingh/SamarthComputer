import React, { useState } from 'react';
import { MessageSquare, X, CheckCircle2, Send, Calendar, Clock, User, Phone, GraduationCap } from 'lucide-react';
import { CourseRepository } from '../../repositories/CourseRepository';

/**
 * CounselingModal Component
 * Interactive modal for booking 1-on-1 personal career counseling sessions.
 */
export default function CounselingModal({ isOpen, onClose, lang = 'mr' }) {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [qualification, setQualification] = useState('10th / 12th Pass');
  const [preferredDay, setPreferredDay] = useState('Today / Tomorrow');
  const [submitted, setSubmitted] = useState(false);
  const isMarathi = lang === 'mr';

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !mobile || mobile.length < 10) return;

    await CourseRepository.submitAdmissionInquiry({
      name,
      mobile,
      course: `Career Counseling - ${qualification}`,
      batchTiming: preferredDay
    });

    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-primary-dark via-primary to-primary-light text-white p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-accent-gold/20 border border-accent-gold/40 flex items-center justify-center text-accent-gold">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-extrabold text-base text-white ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi ? '१-ऑन-१ मोफत करिअर समुपदेशन' : 'Book 1-on-1 Free Career Counseling'}
              </h3>
              <div className="text-[11px] text-slate-200">
                {isMarathi ? 'तज्ज्ञ मार्गदर्शकांसोबत वैयक्तिक चर्चा' : 'Personal session with Senior Counselor'}
              </div>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className={`font-extrabold text-xl text-slate-900 ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi ? 'समुपदेशन सेशन बुक झाले!' : 'Counseling Session Booked!'}
              </h4>
              <p className={`text-xs text-slate-600 max-w-sm mx-auto ${isMarathi ? 'marathi-text' : ''}`}>
                {isMarathi
                  ? 'आमचे मुख्य मार्गदर्शक लवकरच तुमच्याशी फोनवर संपर्क साधून सोयीची वेळ ठरवतील.'
                  : 'Our senior academic counselor will call you shortly to confirm your session slot.'}
              </p>
              <button onClick={onClose} className="bg-slate-900 text-white text-xs font-bold px-6 py-2.5 rounded-xl shadow-md">
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
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary"
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
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-mono focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isMarathi ? 'शिक्षण पात्रता:' : 'Education Qualification:'}
                  </label>
                  <select
                    value={qualification}
                    onChange={(e) => setQualification(e.target.value)}
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="10th / 12th Pass">10th / 12th Standard</option>
                    <option value="Undergraduate B.Com / B.A / B.Sc">Undergraduate (Arts/Comm/Sci)</option>
                    <option value="Graduate / Job Seeker">Graduate / Job Seeker</option>
                    <option value="Working Professional">Working Professional</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {isMarathi ? 'पसंतीचा दिवस:' : 'Preferred Slot:'}
                  </label>
                  <select
                    value={preferredDay}
                    onChange={(e) => setPreferredDay(e.target.value)}
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="Today / Tomorrow">Today / Tomorrow</option>
                    <option value="Weekend (Saturday/Sunday)">Weekend Slot</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-accent-gold to-amber-500 hover:from-amber-500 hover:to-accent-gold text-slate-950 font-extrabold text-sm py-4 rounded-xl shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-slate-950" />
                <span>{isMarathi ? '🗣️ मोफत सेशन आरक्षित करा' : 'Confirm Free Session'}</span>
              </button>
            </form>
          )}
        </div>

      </div>
    </div>
  );
}
