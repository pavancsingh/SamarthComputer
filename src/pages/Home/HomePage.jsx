import React from 'react';
import HeroSection from '../../components/sections/HeroSection';
import TrustStrip from '../../components/sections/TrustStrip';
import StatsCounter from '../../components/sections/StatsCounter';
import CoursesSection from '../../components/sections/CoursesSection';
import CSCServices from '../../components/sections/CSCServices';
import WhyChooseUs from '../../components/sections/WhyChooseUs';
import BatchTimetableWidget from '../../components/sections/BatchTimetableWidget';
import News from '../../components/sections/News';
import SuccessStories from '../../components/sections/SuccessStories';
import GallerySection from '../../components/sections/GallerySection';
import Faculty from '../../components/sections/Faculty';
import FAQ from '../../components/sections/FAQ';
import ContactForm from '../../components/sections/ContactForm';
import FinalCTASection from '../../components/sections/FinalCTASection';

/**
 * HomePage Component
 * Homepage container. Each established homepage section remains in its original
 * visitor journey, from admission notice through enquiry.
 */
export default function HomePage({ lang = 'mr', onNavigate }) {
  return (
    <div className="homepage-wrapper homepage-editorial" lang={lang}>
      {/* Hero */}
      <HeroSection lang={lang} onNavigate={onNavigate} />

      {/* Recognition and centre statistics */}
      <TrustStrip lang={lang} />
      <StatsCounter lang={lang} />

      {/* Featured courses */}
      <CoursesSection lang={lang} onNavigate={onNavigate} />

      {/* Combined About, Why Samarth, and mission content */}
      <WhyChooseUs lang={lang} />

      {/* Services, batches, and current updates */}
      <CSCServices lang={lang} onNavigate={onNavigate} />
      <BatchTimetableWidget lang={lang} />
      <News lang={lang} />

      {/* Combined student success stories and Google reviews */}
      <SuccessStories lang={lang} />

      {/* Gallery includes campus media and reels */}
      <GallerySection lang={lang} />
      <Faculty lang={lang} />
      <FAQ lang={lang} />

      {/* Contact, branches, and final enquiry actions */}
      <ContactForm lang={lang} />
      <FinalCTASection lang={lang} onNavigate={onNavigate} />
    </div>
  );
}
