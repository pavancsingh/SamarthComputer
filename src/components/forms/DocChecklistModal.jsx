import React, { useState } from 'react';
import { FileText, X, CheckCircle2, MessageCircle, Clock, ExternalLink, Calendar, Send, AlertCircle, Phone } from 'lucide-react';
import { InquiryRepository } from '../../repositories/InquiryRepository';

/**
 * DocChecklistModal Component
 * Interactive modal displaying mandatory document checklists, deadline details,
 * official portal link, direct WhatsApp apply link, and online inquiry form.
 */
export default function DocChecklistModal({ isOpen, onClose, service = null, lang = 'mr' }) {
  const isMarathi = lang === 'mr';
  const [applicantName, setApplicantName] = useState('');
  const [applicantMobile, setApplicantMobile] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  if (!isOpen || !service) return null;

  const title = isMarathi ? (service.titleMr || service.title_mr || service.titleEn) : (service.titleEn || service.title_en);
  const overview = isMarathi ? (service.overviewMr || service.overview_mr || service.overviewEn) : (service.overviewEn || service.overview_en);
  const timeline = isMarathi ? (service.timelineMr || service.timeline_mr || service.timelineEn) : (service.timelineEn || service.timeline_en);
  const deadline = isMarathi ? (service.deadlineMr || service.deadline_mr || service.deadlineEn) : (service.deadlineEn || service.deadline_en);
  const govtFee = isMarathi ? (service.govtFeeMr || service.govt_fee_mr || service.govtFeeEn) : (service.govtFeeEn || service.govt_fee_en);
  const docs = (isMarathi ? (service.requiredDocsMr || service.required_docs_mr) : (service.requiredDocsEn || service.required_docs_en)) || [];
  const steps = (isMarathi ? (service.stepsMr || service.steps_mr) : (service.stepsEn || service.steps_en)) || [];
  const officialUrl = service.officialUrl || service.official_url;
  const status = service.status || 'Open';

  const whatsappMessage = `https://wa.me/919822000000?text=Hello%20Samarth%20Computers,%20I%20want%20to%20apply%20for%20${encodeURIComponent(service.titleEn || service.titleMr)}.`;

  const handleInquirySubmit = async (e) => {
    e.preventDefault();
    if (!applicantName || !applicantMobile) return;
    setSubmitting(true);
    setSubmitError('');

    const res = await InquiryRepository.submitInquiry({
      name: applicantName,
      mobile: applicantMobile,
      service_id: service.id || service.slug,
      type: 'csc',
      details: {
        service_name: title,
        category: service.category || 'csc'
      }
    });

    setSubmitting(false);
    if (res.success) {
      setSubmitSuccess(true);
      setApplicantName('');
      setApplicantMobile('');
    } else {
      setSubmitError(res.error || 'Submission failed. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 relative">
        
        {/* Modal Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 border border-indigo-400/30 flex items-center justify-center text-indigo-300">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className={`font-extrabold text-base text-white ${isMarathi ? 'marathi-text' : ''}`}>
                {title}
              </h3>
              <div className="flex items-center gap-2 text-[11px] text-amber-300 font-bold mt-0.5">
                <span>⏱️ {timeline || 'Fast Processing'}</span>
                {status === 'Closed' ? (
                  <span className="bg-rose-500/20 text-rose-300 text-[10px] px-2 py-0.5 rounded-full border border-rose-500/40">Closed</span>
                ) : (
                  <span className="bg-emerald-500/20 text-emerald-300 text-[10px] px-2 py-0.5 rounded-full border border-emerald-500/40">🟢 Open</span>
                )}
              </div>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 space-y-5 max-h-[80vh] overflow-y-auto">
          
          {/* Key Info Strip: Deadline & Fee */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-amber-50/80 border border-amber-200/80 p-3 rounded-2xl">
              <div className="text-[10px] font-black text-amber-700 uppercase tracking-wider flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-600" />
                <span>{isMarathi ? 'अंतिम मुदत (Deadline):' : 'Application Deadline:'}</span>
              </div>
              <div className="text-xs font-black text-slate-900 mt-1">
                {deadline || 'Always Available'}
              </div>
            </div>

            <div className="bg-indigo-50/80 border border-indigo-200/80 p-3 rounded-2xl">
              <div className="text-[10px] font-black text-indigo-700 uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-indigo-600" />
                <span>{isMarathi ? 'शासकीय शुल्क (Fee):' : 'Official Portal Fee:'}</span>
              </div>
              <div className="text-xs font-black text-slate-900 mt-1">
                {govtFee || 'As per Govt Norms'}
              </div>
            </div>
          </div>

          {/* Service Overview */}
          {overview && (
            <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-1">
              <div className="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider">
                {isMarathi ? 'माहिती व तपशील:' : 'Overview & Details:'}
              </div>
              <p className={`text-xs text-slate-700 leading-relaxed ${isMarathi ? 'marathi-text' : ''}`}>
                {overview}
              </p>
            </div>
          )}

          {/* Mandatory Document Checklist */}
          {docs && docs.length > 0 && (
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <h4 className={`font-black text-xs text-slate-900 uppercase tracking-wider ${isMarathi ? 'marathi-text' : ''}`}>
                  {isMarathi ? 'आवश्यक कागदपत्रे (Mandatory Documents):' : 'Mandatory Document Checklist:'}
                </h4>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  ✓ Verified Checklist
                </span>
              </div>

              <div className="space-y-1.5">
                {docs.map((doc, dIdx) => (
                  <div key={dIdx} className="bg-white border border-slate-200 p-2.5 rounded-xl flex items-center gap-2 text-xs font-semibold text-slate-800 shadow-xs">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Process Steps */}
          {steps && steps.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="text-xs font-black text-slate-900 uppercase tracking-wider">
                {isMarathi ? 'प्रक्रिया कशी पार पडते?' : 'Application Process:'}
              </div>
              <ol className="space-y-1 text-xs text-slate-600 list-decimal pl-4">
                {steps.map((st, sIdx) => (
                  <li key={sIdx} className="leading-relaxed">{st}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Direct Lead Submission Form inside Modal */}
          <div className="bg-slate-900 text-white p-4.5 rounded-2xl space-y-3 shadow-md">
            <div className="text-xs font-black text-indigo-300 flex items-center gap-1.5">
              <Send className="w-4 h-4 text-indigo-400" />
              <span>{isMarathi ? 'केंद्रावरून अर्ज भरण्यासाठी नोंदणी करा' : 'Register for Online Form Filing Assistance'}</span>
            </div>

            {submitSuccess ? (
              <div className="p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold text-center">
                ✓ {isMarathi ? 'तुमची माहिती नोंदवली गेली आहे! आमचे प्रतिनिधी लवकरच संपर्क करतील.' : 'Registration successful! Our team will contact you shortly.'}
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-2.5">
                <input
                  type="text"
                  placeholder={isMarathi ? 'तुमचे संपूर्ण नाव (Full Name)' : 'Enter your full name'}
                  value={applicantName}
                  onChange={(e) => setApplicantName(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
                <input
                  type="tel"
                  placeholder={isMarathi ? 'मोबाईल नंबर (Mobile Number)' : 'Enter 10-digit mobile number'}
                  value={applicantMobile}
                  onChange={(e) => setApplicantMobile(e.target.value)}
                  required
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
                />
                {submitError && <div className="text-rose-400 text-[11px] font-bold">{submitError}</div>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-xs py-2.5 rounded-xl shadow transition-all flex items-center justify-center gap-1.5"
                >
                  <span>{submitting ? 'सबमिट होत आहे...' : (isMarathi ? 'ऑनलाईन अर्ज नोंदणी करा' : 'Request Form Filing Assistance')}</span>
                </button>
              </form>
            )}
          </div>

          {/* Action Links */}
          <div className="pt-2 space-y-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <a
                href="tel:+919552345061"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs py-3 rounded-xl shadow transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-white fill-white/20" />
                <span>{isMarathi ? '📞 थेट कॉल करा' : 'Call Center Now'}</span>
              </a>

              <a
                href={whatsappMessage}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-900 hover:bg-black text-white font-extrabold text-xs py-3 rounded-xl shadow transition-transform hover:scale-[1.01] flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>{isMarathi ? 'व्हाट्सॲपवर पाठवा' : 'Send via WhatsApp'}</span>
              </a>
            </div>

            {officialUrl && (
              <a
                href={officialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 border border-slate-300/80"
              >
                <ExternalLink className="w-4 h-4 text-slate-600" />
                <span>{isMarathi ? 'शासकीय अधिकृत संकेतस्थळ' : 'Visit Official Govt Portal'}</span>
              </a>
            )}

            <div className="text-center text-[10px] text-slate-400 font-medium">
              📍 {isMarathi ? 'किंवा समर्थ कॉम्प्युटर्स, खंडाळा येथे प्रत्यक्ष भेट द्या.' : 'Or visit Samarth Computers near Khandala Bus Stand.'}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
