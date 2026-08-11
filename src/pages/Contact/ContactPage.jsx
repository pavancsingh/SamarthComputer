import React, { useState, useEffect } from 'react';
import { InquiryRepository } from '../../repositories/InquiryRepository';
import { CourseRepository } from '../../repositories/CourseRepository';
import { sharedStore } from '../../repositories/sharedStore';

/**
 * ContactPage — Stitch Design System (14_contact_us.html)
 * Centered hero heading + 2-col grid: 7-col glass form with tabs | 5-col info card + map
 */

const TABS = [
  { id: 'admission', labelEn: 'Admission Inquiry', labelMr: 'प्रवेश चौकशी' },
  { id: 'csc',       labelEn: 'CSC Service',       labelMr: 'CSC सेवा' },
  { id: 'general',   labelEn: 'General Feedback',  labelMr: 'सामान्य प्रतिक्रिया' },
];

export default function ContactPage({ lang = 'mr' }) {
  const [activeTab, setActiveTab] = useState('admission');
  const [form, setForm] = useState({ name: '', phone: '', course: '', service: '', contact: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const isMarathi = lang === 'mr';

  const [settings, setSettings] = useState(sharedStore.getSiteSettings());
  const [courses, setCourses] = useState(sharedStore.getCourses());
  const [cscServices, setCscServices] = useState(sharedStore.getCSCServices());
  const [govtServices, setGovtServices] = useState(sharedStore.getGovtServices());

  useEffect(() => {
    CourseRepository.getAllCourses().then((res) => {
      if (res && res.length > 0) setCourses(res);
    });
    InquiryRepository.getCSCServices().then((res) => {
      if (res && res.length > 0) setCscServices(res);
    });
    InquiryRepository.getGovtServices().then((res) => {
      if (res && res.length > 0) setGovtServices(res);
    });

    const unsubscribe = sharedStore.subscribe(() => {
      setSettings(sharedStore.getSiteSettings());
      setCourses(sharedStore.getCourses());
      setCscServices(sharedStore.getCSCServices());
      setGovtServices(sharedStore.getGovtServices());
    });
    return unsubscribe;
  }, []);

  const handleChange = (e) => setForm((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await InquiryRepository.submitInquiry({ ...form, type: activeTab, lang });
    } catch {}
    setLoading(false);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setForm({ name: '', phone: '', course: '', service: '', contact: '', message: '' });
  };

  const inputClass = 'form-input w-full rounded-lg border border-slate-200 px-md py-sm bg-surface-container-lowest text-body-md font-body-md focus:outline-none focus:ring-2 focus:ring-primary';

  return (
    <div className="bg-background min-h-screen pb-20 md:pb-0" id="contact">
      <main className="max-w-7xl mx-auto px-4 md:px-gutter py-xl space-y-xl">

        {/* ── Hero Heading ── */}
        <div className="text-center space-y-md">
          <h1 className="font-display-hero-mobile text-display-hero-mobile md:font-display-hero md:text-display-hero text-text-primary">
            {isMarathi ? 'आमच्याशी संपर्क साधा' : 'Get in Touch'}
          </h1>
          <p className="font-body-lg text-body-lg text-secondary max-w-xl mx-auto">
            {isMarathi
              ? 'तुमची चौकशी सादर करा किंवा खंडाळा बस स्टँडजवळ आमच्या केंद्राला भेट द्या.'
              : 'Submit your inquiry online or visit our center near Khandala Bus Stand.'}
          </p>
        </div>

        {/* ── 2-col Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">

          {/* LEFT: Glass Form (7 cols) */}
          <div className="lg:col-span-7 glass-panel rounded-xl p-lg space-y-lg" id="inquiry-form">
            {/* Tabs */}
            <div className="flex gap-xs border-b border-slate-100 overflow-x-auto hide-scrollbar">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-md py-sm text-label-bold font-label-bold whitespace-nowrap transition-colors ${
                    activeTab === tab.id
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-secondary hover:text-text-primary'
                  }`}
                >
                  {isMarathi ? tab.labelMr : tab.labelEn}
                </button>
              ))}
            </div>

            {submitted ? (
              <div className="flex flex-col items-center justify-center text-center py-xl gap-md">
                <span className="material-symbols-outlined fill text-stitch-emerald text-6xl">check_circle</span>
                <h3 className="text-headline-md font-headline-md text-on-background">
                  {isMarathi ? 'धन्यवाद! आम्ही लवकरच संपर्क करू.' : 'Thank you! We\'ll be in touch shortly.'}
                </h3>
              </div>
            ) : (
              <form className="space-y-md" onSubmit={handleSubmit}>

                {/* Admission Tab */}
                {activeTab === 'admission' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div>
                        <label className="block text-label-bold font-label-bold text-text-primary mb-xs">
                          {isMarathi ? 'पूर्ण नाव' : 'Full Name / पूर्ण नाव'}
                        </label>
                        <input name="name" type="text" value={form.name} onChange={handleChange}
                          placeholder={isMarathi ? 'तुमचे पूर्ण नाव' : 'Enter your full name'}
                          className={inputClass} required />
                      </div>
                      <div>
                        <label className="block text-label-bold font-label-bold text-text-primary mb-xs">
                          {isMarathi ? 'फोन नंबर' : 'Phone Number / फोन नंबर'}
                        </label>
                        <input name="phone" type="tel" value={form.phone} onChange={handleChange}
                          placeholder="+91"
                          className={inputClass} required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-label-bold font-label-bold text-text-primary mb-xs">
                        {isMarathi ? 'अभ्यासक्रम' : 'Course of Interest / अभ्यासक्रम'}
                      </label>
                      <select name="course" value={form.course} onChange={handleChange} className={inputClass}>
                        <option value="">{isMarathi ? 'अभ्यासक्रम निवडा...' : 'Select a course...'}</option>
                        {courses.map((c) => (
                          <option key={c.id || c.slug} value={c.title || c.titleEn}>
                            {isMarathi ? (c.subtitleMr || c.subtitle_mr || c.title) : (c.title || c.titleEn)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-label-bold font-label-bold text-text-primary mb-xs">
                        {isMarathi ? 'संदेश (ऐच्छिक)' : 'Message (Optional)'}
                      </label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        rows={4} placeholder="How can we help you?"
                        className={inputClass} />
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full bg-primary text-white font-label-bold text-label-bold py-md rounded-lg shadow-sm hover:bg-stitch-red-dark transition-colors flex items-center justify-center gap-xs btn-interactive disabled:opacity-60">
                      {loading ? 'Submitting...' : (isMarathi ? 'चौकशी सादर करा' : 'Submit Inquiry')}
                      {!loading && <span className="material-symbols-outlined text-[20px]">arrow_forward</span>}
                    </button>
                  </>
                )}

                {/* CSC Tab */}
                {activeTab === 'csc' && (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                      <div>
                        <label className="block text-label-bold font-label-bold text-text-primary mb-xs">Name</label>
                        <input name="name" type="text" value={form.name} onChange={handleChange}
                          placeholder="Your name" className={inputClass} required />
                      </div>
                      <div>
                        <label className="block text-label-bold font-label-bold text-text-primary mb-xs">Aadhar / Phone</label>
                        <input name="phone" type="text" value={form.phone} onChange={handleChange}
                          placeholder="Contact info" className={inputClass} required />
                      </div>
                    </div>
                    <div>
                      <label className="block text-label-bold font-label-bold text-text-primary mb-xs">Required Service</label>
                      <select name="service" value={form.service} onChange={handleChange} className={inputClass}>
                        <option value="">{isMarathi ? 'सेवा निवडा...' : 'Select service...'}</option>
                        {cscServices.map((s) => (
                          <option key={s.id || s.slug} value={s.titleMr || s.title_mr || s.titleEn || s.title_en}>
                            {isMarathi ? (s.titleMr || s.title_mr || s.titleEn) : (s.titleEn || s.title_en || s.titleMr)}
                          </option>
                        ))}
                        {govtServices.map((g) => (
                          <option key={g.id || g.slug} value={g.titleMr || g.title_mr || g.titleEn || g.title_en}>
                            {isMarathi ? (g.titleMr || g.title_mr || g.titleEn) : (g.titleEn || g.title_en || g.titleMr)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full bg-stitch-slate-card text-white font-label-bold text-label-bold py-md rounded-lg shadow-sm hover:bg-black transition-colors btn-interactive disabled:opacity-60">
                      {loading ? 'Submitting...' : (isMarathi ? 'सेवा विनंती करा' : 'Request Service')}
                    </button>
                  </>
                )}

                {/* General Tab */}
                {activeTab === 'general' && (
                  <>
                    <div>
                      <label className="block text-label-bold font-label-bold text-text-primary mb-xs">Email or Phone</label>
                      <input name="contact" type="text" value={form.contact} onChange={handleChange}
                        placeholder="Contact detail" className={inputClass} required />
                    </div>
                    <div>
                      <label className="block text-label-bold font-label-bold text-text-primary mb-xs">Feedback / Inquiry</label>
                      <textarea name="message" value={form.message} onChange={handleChange}
                        rows={5} placeholder="Your message here..."
                        className={inputClass} />
                    </div>
                    <button type="submit" disabled={loading}
                      className="w-full border border-slate-200 text-text-primary font-label-bold text-label-bold py-md rounded-lg shadow-sm hover:bg-surface-container transition-colors btn-interactive disabled:opacity-60">
                      {loading ? 'Sending...' : (isMarathi ? 'संदेश पाठवा' : 'Send Message')}
                    </button>
                  </>
                )}
              </form>
            )}
          </div>

          {/* RIGHT: Contact Info + Map (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-gutter">
            {/* Info Card */}
            <div className="bg-white rounded-xl border border-slate-200/50 p-lg shadow-stitch-md hover:shadow-stitch-lg transition-all duration-300">
              <h3 className="text-headline-md font-headline-md text-text-primary mb-md">
                {isMarathi ? 'संपर्क माहिती' : 'Contact Information'}
              </h3>
              <div className="space-y-md">
                {/* Address */}
                <div className="flex items-start gap-md">
                  <div className="p-sm bg-stitch-red-light text-primary rounded-lg flex-shrink-0">
                    <span className="material-symbols-outlined fill">location_on</span>
                  </div>
                  <div>
                    <p className="text-label-bold font-label-bold text-text-primary">Main Office</p>
                    <p className="text-body-md font-body-md text-secondary mt-xs">
                      {isMarathi ? (settings.contactAddressMr || 'राजेंद्र विद्यालयाजवळ, खंडाळा, ता. खंडाळा, जि. सातारा ४१२८०२') : (settings.contactAddressEn || 'Near Rajendra Vidhalya, Khandala, Ta. Khandala, Dist. Satara - 412802')}
                    </p>
                  </div>
                </div>
                {/* Hours */}
                <div className="flex items-start gap-md">
                  <div className="p-sm bg-surface-container text-stitch-slate-card rounded-lg flex-shrink-0">
                    <span className="material-symbols-outlined fill">schedule</span>
                  </div>
                  <div>
                    <p className="text-label-bold font-label-bold text-text-primary">Office Hours</p>
                    <p className="text-body-md font-body-md text-secondary mt-xs">
                      {isMarathi ? (settings.contactHoursMr || 'सोमवार - शनिवार: सकाळी ९:०० ते रात्री ७:००') : (settings.contactHoursEn || 'Monday - Saturday: 9:00 AM - 7:00 PM')}
                    </p>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start gap-md">
                  <div className="p-sm bg-stitch-red-light text-primary rounded-lg flex-shrink-0">
                    <span className="material-symbols-outlined fill">call</span>
                  </div>
                  <div>
                    <p className="text-label-bold font-label-bold text-text-primary">Phone</p>
                    <a href={`tel:${settings.contactPhone || '+919552345061'}`} className="text-body-md font-body-md text-primary font-medium mt-xs hover:underline block">
                      {settings.contactPhone || '+91 95523 45061'}
                    </a>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-lg pt-lg border-t border-slate-100">
                <a
                  href={`https://wa.me/${settings.contactWhatsapp || '919552345061'}?text=Hello%20Samarth%20Computers`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-sm w-full bg-[#25D366]/10 text-[#075E54] hover:bg-[#25D366]/20 py-sm px-md rounded-lg transition-colors font-label-bold text-label-bold"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  {isMarathi ? 'व्हाट्सॲपवर चॅट करा' : 'Chat on WhatsApp'}
                </a>
              </div>
            </div>

            {/* Map */}
            <div className="bg-surface-container rounded-xl overflow-hidden h-[300px] relative shadow-stitch-md border border-slate-200/50">
              <iframe
                title="Samarth Computers Location"
                src={settings.contactMapUrl || "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3789.0946052295697!2d74.06488181504043!3d18.04649018799785!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2f7bf9d34c6f1%3A0xadf7d5d7d5e8e8e8!2sKhandala%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"}
                className="w-full h-full border-0 opacity-80"
                loading="lazy"
                allowFullScreen
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent flex items-end p-md pointer-events-none">
                <a
                  href="https://maps.google.com/?q=Khandala,+Maharashtra"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/90 backdrop-blur text-text-primary px-sm py-xs rounded text-label-caps font-label-caps flex items-center gap-xs pointer-events-auto hover:bg-white transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px] text-primary fill">pin_drop</span>
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
