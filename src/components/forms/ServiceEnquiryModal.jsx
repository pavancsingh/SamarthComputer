import React, { useState, useEffect } from 'react';
import { X, CheckCircle, Phone, User, MessageSquare, Clock, Wrench, Loader2 } from 'lucide-react';
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

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen && !submitting) {
        handleClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, submitting]);

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
    if (submitting) return; // Prevent double submission

    const trimmedName = form.name.trim();
    const cleanMobile = form.mobile.replace(/\D/g, '');

    // 1. Validation Checks
    if (!trimmedName) { 
      setError(isMarathi ? 'कृपया आपले संपूर्ण नाव टाका.' : 'Please enter your full name.'); 
      return; 
    }
    if (cleanMobile.length !== 10 || !/^[6-9]\d{9}$/.test(cleanMobile)) { 
      setError(isMarathi ? 'कृपया १०-अंकी वैध मोबाईल नंबर टाका (उदा. 9876543210).' : 'Please enter a valid 10-digit mobile number starting with 6-9.'); 
      return; 
    }

    setSubmitting(true);
    setError('');
    try {
      const res = await InquiryRepository.submitServiceRequest({
        name: trimmedName,
        mobile: cleanMobile,
        serviceId: defaultService?.id || defaultService?.slug || '',
        serviceName: serviceTitle,
        notes: form.notes.trim(),
        preferredTime: form.preferredTime,
      });
      if (res && res.success) {
        setSubmitted(true);
      } else {
        setError(isMarathi ? 'काही तांत्रिक अडचण आली. कृपया पुन्हा प्रयत्न करा.' : 'Submission failed. Please check your network and try again.');
      }
    } catch (err) {
      console.error('[ServiceEnquiryModal] Error:', err);
      setError(isMarathi ? 'काही तांत्रिक अडचण आली. कृपया पुन्हा प्रयत्न करा.' : 'Submission failed. Please check your network and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    if (submitting) return;
    setForm({ name: '', mobile: '', notes: '', preferredTime: 'anytime' });
    setSubmitted(false);
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/70 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden my-auto animate-in zoom-in-95 duration-200 border border-slate-200">
        {/* Header */}
        <div className="bg-slate-900 p-6 text-white relative border-b border-slate-800">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-rose-500/20 border border-rose-500/30 rounded-2xl flex items-center justify-center shrink-0">
                <Wrench className="w-6 h-6 text-rose-400" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-black leading-tight text-white">
                  {isMarathi ? 'सेवा विनंती अर्ज' : 'Service Request'}
                </h2>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  {isMarathi ? 'आम्ही २ तासात संपर्क करू.' : 'We will contact you within 2 hours.'}
                </p>
              </div>
            </div>
            <button 
              type="button" 
              onClick={handleClose} 
              disabled={submitting}
              className="p-2 hover:bg-white/10 rounded-xl transition-colors disabled:opacity-50"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>
          {/* Workflow breadcrumb */}
          <div className="flex items-center gap-1.5 mt-4 text-[11px] font-bold text-slate-400">
            <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-slate-200">📋 {isMarathi ? 'विनंती' : 'Request'}</span>
            <span>→</span>
            <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-slate-200">⚙️ {isMarathi ? 'प्रक्रिया' : 'Processing'}</span>
            <span>→</span>
            <span className="bg-white/10 px-2.5 py-0.5 rounded-full text-slate-200">✅ {isMarathi ? 'पूर्ण' : 'Completion'}</span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle className="w-9 h-9 text-emerald-600" />
              </div>
              <div className="space-y-1">
                <h3 className="text-xl font-black text-slate-900">
                  {isMarathi ? 'सेवा विनंती यशस्वी!' : 'Service Request Received!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 font-medium">
                  {isMarathi
                    ? 'आमचा प्रतिनिधी लवकरच तुमच्याशी संपर्क साधेल. धन्यवाद!'
                    : 'Our representative will contact you within 2 hours. Thank you!'}
                </p>
              </div>
              <div className="pt-2 space-y-2">
                <a
                  href={`https://wa.me/919552345061?text=Hello%20Samarth%20Computers,%20I%20need%20help%20with%20${encodeURIComponent(serviceTitle || 'a service')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm px-6 py-3.5 rounded-2xl transition-all shadow-md"
                >
                  <span>💬</span>
                  <span>{isMarathi ? 'WhatsApp वर थेट बोला' : 'Chat on WhatsApp'}</span>
                </a>
                <button 
                  type="button"
                  onClick={handleClose} 
                  className="w-full py-3 text-xs sm:text-sm text-slate-600 hover:text-slate-900 font-bold border border-slate-200 rounded-2xl transition-colors"
                >
                  {isMarathi ? 'बंद करा' : 'Close'}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Selected Service Display */}
              {serviceTitle && (
                <div className="bg-rose-50/60 border border-rose-200/80 rounded-2xl px-4 py-3 flex items-center gap-3">
                  <Wrench className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <div className="text-[10px] font-black text-primary uppercase tracking-wider">
                      {isMarathi ? 'निवडलेली सेवा' : 'Selected Service'}
                    </div>
                    <div className="text-sm font-black text-slate-900">{serviceTitle}</div>
                  </div>
                </div>
              )}

              {/* Name */}
              <div>
                <label className="block text-xs font-black text-slate-800 mb-1.5">
                  <User className="w-3.5 h-3.5 inline mr-1 text-primary" />
                  {isMarathi ? 'पूर्ण नाव *' : 'Full Name *'}
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => handleChange('name', e.target.value)}
                  placeholder={isMarathi ? 'उदा. सुनीता शिंदे' : 'e.g. Sunita Shinde'}
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-slate-50/50"
                  required
                  autoFocus
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-xs font-black text-slate-800 mb-1.5">
                  <Phone className="w-3.5 h-3.5 inline mr-1 text-primary" />
                  {isMarathi ? 'मोबाइल नंबर (१० अंकी) *' : 'Mobile Number (10 Digits) *'}
                </label>
                <input
                  type="tel"
                  value={form.mobile}
                  onChange={e => handleChange('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))}
                  placeholder="9876543210"
                  maxLength={10}
                  className="w-full border border-slate-300 rounded-2xl px-4 py-3 text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-slate-50/50"
                  required
                />
              </div>

              {/* Preferred Time */}
              <div>
                <label className="block text-xs font-black text-slate-800 mb-1.5">
                  <Clock className="w-3.5 h-3.5 inline mr-1 text-primary" />
                  {isMarathi ? 'संपर्काची वेळ' : 'Preferred Contact Time'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {PREFERRED_TIMES.map(pt => (
                    <button
                      key={pt.value}
                      type="button"
                      onClick={() => handleChange('preferredTime', pt.value)}
                      className={`text-xs font-black px-3 py-2.5 rounded-xl border text-left transition-all ${
                        form.preferredTime === pt.value
                          ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      {isMarathi ? pt.labelMr : pt.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Notes (optional) */}
              <div>
                <label className="block text-xs font-black text-slate-800 mb-1.5">
                  <MessageSquare className="w-3.5 h-3.5 inline mr-1 text-slate-400" />
                  {isMarathi ? 'अतिरिक्त माहिती (ऐच्छिक)' : 'Additional Notes (Optional)'}
                </label>
                <textarea
                  value={form.notes}
                  onChange={e => handleChange('notes', e.target.value)}
                  rows={2}
                  placeholder={isMarathi ? 'तुमच्या सेवेबद्दल अधिक माहिती द्या...' : 'Any additional details about your service request...'}
                  className="w-full border border-slate-300 rounded-2xl px-4 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-slate-50/50 resize-none"
                />
              </div>

              {error && (
                <div className="text-xs font-bold text-rose-700 bg-rose-50 border border-rose-200 px-3.5 py-2.5 rounded-xl flex items-center gap-2">
                  <span>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary hover:bg-stitch-red-dark text-white font-black text-sm py-3.5 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-white" />
                    <span>{isMarathi ? 'पाठवत आहे...' : 'Submitting...'}</span>
                  </>
                ) : (
                  <>
                    <Wrench className="w-4 h-4 text-white" />
                    <span>{isMarathi ? 'सेवा विनंती सादर करा' : 'Submit Service Request'}</span>
                  </>
                )}
              </button>
              <p className="text-center text-[11px] text-slate-500 font-semibold">
                🔒 {isMarathi ? 'तुमची माहिती पूर्णपणे सुरक्षित आहे.' : 'Your information is 100% secure and private.'}
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
