import React, { useState, useEffect } from 'react';
import { InquiryRepository } from '../../repositories/InquiryRepository';
import DocChecklistModal from '../../components/forms/DocChecklistModal';

/**
 * CSCPage — Stitch Design System (01_csc_services.html)
 * Light bg + ambient glows + hero split layout + services bento grid
 * PAN Card: featured md:col-span-2 md:row-span-2
 */

const FALLBACK_SERVICES = [
  {
    id: 'pan', titleEn: 'PAN Card Services', titleMr: 'पॅन कार्ड सेवा',
    icon: 'id_card', iconBg: 'bg-stitch-red-light', iconColor: 'text-primary',
    descEn: 'New applications, corrections, and linking with Aadhaar processed swiftly.',
    descMr: 'नवीन अर्ज, दुरुस्ती आणि आधारशी जोडणी.',
    badge: 'Fast Track', badgeColor: 'text-stitch-emerald bg-stitch-emerald/10',
    featured: true,
  },
  {
    id: 'aadhaar', titleEn: 'Aadhaar Updates', titleMr: 'आधार अपडेट',
    icon: 'fingerprint', iconBg: 'bg-secondary-container', iconColor: 'text-tertiary-container',
    descEn: 'Address, phone, and detail corrections.',
    descMr: 'पत्ता, फोन आणि तपशील दुरुस्ती.',
    featured: false,
  },
  {
    id: 'voterid', titleEn: 'Voter ID', titleMr: 'मतदार ओळखपत्र',
    icon: 'how_to_vote', iconBg: 'bg-surface-container-high', iconColor: 'text-secondary',
    descEn: 'Registration and modifications.',
    descMr: 'नोंदणी आणि बदल.',
    featured: false,
  },
  {
    id: 'insurance', titleEn: 'Vehicle & Life Insurance', titleMr: 'वाहन व जीवन विमा',
    icon: 'health_and_safety', iconBg: 'bg-stitch-red-light', iconColor: 'text-primary',
    descEn: 'Compare and renew policies from top providers instantly.',
    descMr: 'शीर्ष प्रदात्यांकडून तात्काळ पॉलिसी तुलना आणि नूतनीकरण.',
    featured: false, wide: true,
  },
];

export default function CSCPage({ lang = 'mr', onNavigate }) {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const isMarathi = lang === 'mr';

  useEffect(() => {
    async function load() {
      try {
        const data = await InquiryRepository.getCSCServices('all');
        setServices(data && data.length > 0 ? data : FALLBACK_SERVICES);
      } catch {
        setServices(FALLBACK_SERVICES);
      }
    }
    load();
  }, []);

  const displayServices = services.length > 0 ? services : FALLBACK_SERVICES;

  return (
    <div className="bg-background min-h-screen relative overflow-x-hidden pb-20 md:pb-0">
      {/* Ambient Background Glow */}
      <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-stitch-red-light rounded-full mix-blend-multiply filter blur-[140px] opacity-70" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary-container rounded-full mix-blend-multiply filter blur-[140px] opacity-70" />
      </div>

      <main className="w-full max-w-7xl mx-auto px-md md:px-gutter lg:px-lg pb-2xl pt-xl">

        {/* Hero Section — flex row */}
        <section className="mb-2xl flex flex-col md:flex-row items-center gap-xl">
          {/* Left: Text */}
          <div className="flex-1 space-y-md">
            <span className="inline-block px-sm py-xs bg-secondary-container text-on-secondary-container text-label-caps font-label-caps rounded-full">
              Government Services
            </span>
            <h1 className="text-display-hero-mobile md:text-display-hero font-display-hero-mobile md:font-display-hero text-text-primary">
              {isMarathi ? (
                <>
                  विश्वसनीय CSC &<br />
                  <span className="text-primary">महा-ई-सेवा</span> केंद्र
                </>
              ) : (
                <>
                  Trusted CSC &<br />
                  <span className="text-primary">Maha-E-Seva</span> Center
                </>
              )}
            </h1>
            <p className="text-body-lg font-body-lg text-secondary max-w-2xl">
              {isMarathi
                ? 'विश्वासार्ह, जलद आणि सुरक्षित शासकीय दस्तऐवज प्रक्रियेसाठी एकमेव ठिकाण.'
                : 'Your one-stop destination for reliable, fast, and secure government document processing. We bridge the gap between citizens and essential services with professional assistance.'}
            </p>
            <div className="flex gap-md pt-sm">
              <button
                type="button"
                onClick={() => onNavigate && onNavigate('contact')}
                className="px-lg py-md bg-primary text-on-primary text-label-bold font-label-bold rounded-lg shadow-sm hover:bg-stitch-red-dark transition-colors border border-primary/20 flex items-center gap-sm btn-interactive"
              >
                <span>{isMarathi ? 'अपॉइंटमेंट बुक करा' : 'Book Appointment'}</span>
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* Right: Hero Image */}
          <div className="flex-1 relative w-full h-[400px] rounded-xl overflow-hidden glass-panel shadow-lg">
            <div
              className="bg-cover bg-center w-full h-full"
              style={{
                backgroundImage: `url('https://images.unsplash.com/photo-1556745757-8d76bdb6984b?auto=format&fit=crop&w=800&q=80')`,
              }}
            />
          </div>
        </section>

        {/* Services Bento Grid */}
        <section className="mb-2xl space-y-lg">
          <div className="text-center space-y-sm">
            <h2 className="text-headline-lg font-headline-lg text-text-primary">
              {isMarathi ? 'आवश्यक सेवा' : 'Essential Services'}
            </h2>
            <p className="text-body-md font-body-md text-secondary">
              {isMarathi
                ? 'तुमच्या बोटांच्या टोकावर सर्व डिजिटल शासन समाधाने.'
                : 'Comprehensive digital governance solutions at your fingertips.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-md auto-rows-[200px]">
            {/* Featured — PAN Card: col-span-2 row-span-2 */}
            {displayServices.slice(0, 1).map((s) => (
              <div
                key={s.id}
                className="glass-panel p-lg rounded-xl md:col-span-2 md:row-span-2 stitch-card-hover flex flex-col justify-between group cursor-pointer"
                onClick={() => { setSelectedService(s); setIsModalOpen(true); }}
              >
                <div className="flex justify-between items-start">
                  <div className={`w-12 h-12 ${s.iconBg || 'bg-stitch-red-light'} rounded-lg flex items-center justify-center ${s.iconColor || 'text-primary'}`}>
                    <span className="material-symbols-outlined fill">{s.icon || 'id_card'}</span>
                  </div>
                  {s.badge && (
                    <span className={`text-label-caps font-label-caps px-sm py-xs rounded ${s.badgeColor || 'text-stitch-emerald bg-stitch-emerald/10'}`}>
                      {s.badge}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-headline-md font-headline-md text-text-primary mb-xs group-hover:text-primary transition-colors">
                    {isMarathi ? (s.titleMr || s.title_en) : (s.titleEn || s.title_en)}
                  </h3>
                  <p className="text-body-md font-body-md text-secondary">
                    {isMarathi ? (s.descMr || s.overviewMr || s.overview_en) : (s.descEn || s.overviewEn || s.overview_en)}
                  </p>
                </div>
              </div>
            ))}

            {/* Aadhaar */}
            {displayServices.slice(1, 2).map((s) => (
              <div
                key={s.id}
                className="glass-panel p-md rounded-xl md:col-span-1 md:row-span-1 stitch-card-hover flex flex-col justify-between group cursor-pointer"
                onClick={() => { setSelectedService(s); setIsModalOpen(true); }}
              >
                <div className={`w-10 h-10 ${s.iconBg || 'bg-secondary-container'} rounded-lg flex items-center justify-center ${s.iconColor || 'text-tertiary-container'} mb-sm`}>
                  <span className="material-symbols-outlined fill">{s.icon || 'fingerprint'}</span>
                </div>
                <div>
                  <h3 className="text-body-lg font-headline-md text-text-primary group-hover:text-primary transition-colors">
                    {isMarathi ? (s.titleMr || s.title_en) : (s.titleEn || s.title_en)}
                  </h3>
                  <p className="text-body-md font-body-md text-secondary text-sm">
                    {isMarathi ? (s.descMr || s.overviewMr) : (s.descEn || s.overviewEn)}
                  </p>
                </div>
              </div>
            ))}

            {/* Voter ID */}
            {displayServices.slice(2, 3).map((s) => (
              <div
                key={s.id}
                className="glass-panel p-md rounded-xl md:col-span-1 md:row-span-1 stitch-card-hover flex flex-col justify-between group cursor-pointer"
                onClick={() => { setSelectedService(s); setIsModalOpen(true); }}
              >
                <div className={`w-10 h-10 ${s.iconBg || 'bg-surface-container-high'} rounded-lg flex items-center justify-center ${s.iconColor || 'text-secondary'} mb-sm`}>
                  <span className="material-symbols-outlined fill">{s.icon || 'how_to_vote'}</span>
                </div>
                <div>
                  <h3 className="text-body-lg font-headline-md text-text-primary group-hover:text-primary transition-colors">
                    {isMarathi ? (s.titleMr || s.title_en) : (s.titleEn || s.title_en)}
                  </h3>
                  <p className="text-body-md font-body-md text-secondary text-sm">
                    {isMarathi ? (s.descMr || s.overviewMr) : (s.descEn || s.overviewEn)}
                  </p>
                </div>
              </div>
            ))}

            {/* Insurance — wide card */}
            {displayServices.slice(3, 4).map((s) => (
              <div
                key={s.id}
                className="glass-panel p-md rounded-xl md:col-span-2 md:row-span-1 stitch-card-hover flex flex-col justify-between group cursor-pointer"
                onClick={() => { setSelectedService(s); setIsModalOpen(true); }}
              >
                <div className="flex items-center gap-md mb-sm">
                  <div className={`w-10 h-10 ${s.iconBg || 'bg-stitch-red-light'} rounded-lg flex items-center justify-center ${s.iconColor || 'text-primary'}`}>
                    <span className="material-symbols-outlined fill">{s.icon || 'health_and_safety'}</span>
                  </div>
                  <h3 className="text-body-lg font-headline-md text-text-primary group-hover:text-primary transition-colors">
                    {isMarathi ? (s.titleMr || s.title_en) : (s.titleEn || s.title_en)}
                  </h3>
                </div>
                <p className="text-body-md font-body-md text-secondary">
                  {isMarathi ? (s.descMr || s.overviewMr) : (s.descEn || s.overviewEn)}
                </p>
              </div>
            ))}

            {/* Additional services */}
            {displayServices.slice(4).map((s, idx) => (
              <div
                key={s.id || idx}
                className="glass-panel p-md rounded-xl stitch-card-hover flex flex-col justify-between group cursor-pointer"
                onClick={() => { setSelectedService(s); setIsModalOpen(true); }}
              >
                <div className={`w-10 h-10 ${s.iconBg || 'bg-surface-container-high'} rounded-lg flex items-center justify-center ${s.iconColor || 'text-secondary'} mb-sm`}>
                  <span className="material-symbols-outlined fill">{s.icon || 'assignment'}</span>
                </div>
                <div>
                  <h3 className="text-body-lg font-headline-md text-text-primary group-hover:text-primary transition-colors">
                    {isMarathi ? (s.titleMr || s.title_en) : (s.titleEn || s.title_en)}
                  </h3>
                  <p className="text-body-md font-body-md text-secondary text-sm">
                    {isMarathi ? (s.descMr || s.overviewMr) : (s.descEn || s.overviewEn)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Doc Checklist Modal */}
      <DocChecklistModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={selectedService}
        lang={lang}
      />
    </div>
  );
}
