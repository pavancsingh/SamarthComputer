import React, { useState } from 'react';
import { X, CheckCircle, Phone, User, MessageSquare, Clock, Wrench } from 'lucide-react';
import { InquiryRepository } from '../../repositories/InquiryRepository';

/**
 * ServiceEnquiryModal — SERVICES Workflow Only
 * Dedicated service request form. Never used for course admissions.
 * Submits to `inquiries` table with type: 'service_request'.
 */
export default function ServiceEnquiryModal({ isOpen, onClose, defaultService = null, lang = 'mr' }) {
  const isMarathi = lang === 'mr';
  const serviceTitle = defaultService
    ? (isMarathi ? (defaultService.titleMr || defaultService.title_mr || defaultService.titleEn) : (defaultService.titleEn || defaultService.title_en))
    : '';

  const [form, setForm] = useState({
    name: '',
    mobile: '',
    notes: '',
    preferredTime: 'anytime'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const PREFERRED_TIMES = [
    { value: 'morning', labelEn: 'Morning (9AM–12PM)', labelMr: 'सकाळ (९–१२)' },
    { value: 'afternoon', labelEn: 'Afternoon (12–4PM)', labelMr: 'दुपारी (१२–४)' },
    { value: 'evening', labelEn: 'Evening (4–7PM)', labelMr: 'सायंकाळ (४–७)' },
    { value: 'anytime', labelEn: 'Any Time', labelMr: 'कोणत्याही वेळी' },
  ];

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) { setError(isMarathi ? 'कृपया आपले नाव टाका.' : 'Please enter your name.'); return; }
    if (!form.mobile.trim() || form.mobile.length < 10) { setError(isMarathi ? 'कृपया वैध मोबाइल नंबर टाका.' : 'Please enter a valid mobile number.'); return; }

    setSubmitting(true);
    setError('');
    try {
      const res = await InquiryRepository.submitServiceRequest({
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        serviceId: defaultService?.id || defaultService?.slug || '',
        serviceName: serviceTitle,
        notes: form.notes.trim(),
        preferredTime: form.preferredTime,
      });
      if (res && res.success) {
        setSubmitted(true);
      } else {
        setError(isMarathi ? 'काही तांत्रिक अडचण आली. पुन्हा प्रयत्न करा.' : 'Submission failed. Please try again.');
      }
    } catch {
      setError(isMarathi ? 'काही तांत्रिक अडचण आली. पुन्हा प्रयत्न करा.' : 'Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm({ name: '', mobile: '', notes: '', preferredTime: 'anytime' });
    setSubmitted(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 text-white relative">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 bg-white/20 rounded-xl flex items-center justify-center">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-extrabold leading-tight">
                  {isMarathi ? 'सेवा विनंती अर्ज' : 'Service Request'}
                </h2>
                <p className="text-xs text-white/80 font-medium mt-0.5">
                  {isMarathi ? 'आम्ही २ तासात संपर्क करू.' : 'We will contact you within 2 hours.'}
                </p>
              </div>
            </div>
            <button type="button" onClick={handleClose} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          {/* Workflow breadcrumb */}
          <div className="flex items-center gap-1.5 mt-4 text-[11px] font-bold text-white/70">
            <span className="bg-white/20 px-2 py-0.5 rounded-full">📋 {isMarathi ? 'विनंती' : 'Request'}</span>
            <span>→</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full">⚙️ {isMarathi ? 'प्रक्रिया' : 'Processing'}</span>
            <span>→</span>
            <span className="bg-white/20 px-2 py-0.5 rounded-full">✅ {isMarathi ? 'पूर्ण' : 'Completion'}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-9 h-9 text-indigo-600" />
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900">
                  {isMarathi ? 'सेवा विनंती यशस्वी!' : 'Service Request Received!'}
                </h3>
                <p className="text-sm text-slate-500 font-medium mt-1">
                  {isMarathi
                    ? 'आमचा प्रतिनिधी लवकरच तुमच्याशी संपर्क करेल. धन्यवाद!'
                    : 'Our representative will contact you within 2 hours. Thank you!'}
                </p>
              </div>
              <a
                href={`https://wa.me/919552345061?text=Hello%20Samarth%20Computers,%20I%20need%20help%20with%20${encodeURIComponent(serviceTitle || 'a service')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm px-5 py-2.5 rounded-xl transition-colors"
              >
                <span>💬</span>
                {isMarathi ? 'WhatsApp वर संपर्क करा' : 'Chat on WhatsApp'}
              </a>
              <button onClick={handleClose} className="block w-full mt-2 text-sm text-slate-500 hover:text-slate-700 font-semibold">
                {isMarathi ? 'बंद करा' : 'Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Service Display */}
              {serviceTitle && (
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl px-4 py-3 flex items-center gap-2">
                  <Wrench className="w-4 h-4 text-indigo-600 shrink-0" />
                  <div>
                    <div className="text-[10px] font-extrabold text-indigo-500 uppercase tracking-wider">
                      {isMarathi ? 'निवडलेली सेवा' : 'Selected Service'}
                    </div>
                    <div className="text-sm font-bold text-indigo-800">{serviceTitle}</div>
                  </div>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  <User className="w-3.5 h-3.5 inline mr-1 text-indigo-600" />
                  {isMarathi ? 'पूर्ण नाव *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder={isMarathi ? 'उदा. सुनीता शिंदे' : 'e.g. Sunita Shinde'}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
                  required
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  <Phone className="w-3.5 h-3.5 inline mr-1 text-indigo-600" />
                  {isMarathi ? 'मोबाइल नंबर *' : 'Mobile Number *'}
                </label>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={e => handleChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="+91 XXXXX XXXXX"
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50"
                  required
                />
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  <Clock className="w-3.5 h-3.5 inline mr-1 text-indigo-600" />
                  {isMarathi ? 'संपर्काची वेळ' : 'Preferred Contact Time'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PREFERRED_TIMES.map(pt => (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => handleChange('preferredTime', pt.value)}
                      className={`text-xs font-bold px-3 py-2 rounded-lg border text-left transition-all ${
                        form.preferredTime === pt.value
                          ? 'bg-indigo-600 text-white border-indigo-600'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-indigo-300'
                      }`}
                    >
                      {isMarathi ? pt.labelMr : pt.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes (optional) */}
              <div>
                <label className="block text-xs font-extrabold text-slate-700 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                  {isMarathi ? 'अतिरिक्त माहिती (ऐच्छिक)' : 'Additional Notes (Optional)'}
                </label>
                <textarea
                  value={form.notes}
                  onChange={e => handleChange('notes', e.target.value)}
                  rows={2}
                  placeholder={isMarathi ? 'तुमच्या सेवेबद्दल अधिक माहिती द्या...' : 'Any additional details about your service request...'}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-slate-50 resize-none"
                />
              </div>

              {error && (
                <p className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg">
                  ⚠️ {error}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm py-3 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-60"
              >
                {submitting ? (
                  <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />{isMarathi ? 'पाठवत आहे...' : 'Submitting...'}</>
                ) : (
                  <><Wrench className="w-4 h-4" />{isMarathi ? 'सेवा विनंती सादर करा' : 'Submit Service Request'}</>
                )}
              </button>
              <p className="text-center text-[10px] text-slate-400 font-medium">
                🔒 {isMarathi ? 'तुमची माहिती पूर्णपणे सुरक्षित आहे.' : 'Your information is 100% secure and private.'}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
