import React from 'react';
import HeroSection from '../../components/sections/HeroSection';
import TrustStrip from '../../components/sections/TrustStrip';
import StatsCounter from '../../components/sections/StatsCounter';
import BatchTimetableWidget from '../../components/sections/BatchTimetableWidget';
import CoursesSection from '../../components/sections/CoursesSection';
import WhyChooseUs from '../../components/sections/WhyChooseUs';
import CSCServices from '../../components/sections/CSCServices';

import WorkshopsSection from '../../components/sections/WorkshopsSection';
import CareerCounselingBanner from '../../components/sections/CareerCounselingBanner';
import SuccessStories from '../../components/sections/SuccessStories';
import Reviews from '../../components/sections/Reviews';
import GallerySection from '../../components/sections/GallerySection';
import Faculty from '../../components/sections/Faculty';
import FAQ from '../../components/sections/FAQ';


import ContactForm from '../../components/sections/ContactForm';
import GoogleMap from '../../components/sections/GoogleMap';
import AIAssistantWidget from '../../components/common/AIAssistantWidget';

/**
 * HomePage Component
 * Master Homepage container rendering all Module 2 section components in exact sequential order.
 */
export default function HomePage({ lang = 'mr', onNavigate }) {
  return (
    <div className="homepage-wrapper">
      {/* 1. Hero Section */}
      <HeroSection lang={lang} onNavigate={onNavigate} />

      {/* 2. Official Trust & Recognition Strip */}
      <TrustStrip lang={lang} />

      {/* 3. Statistics Counter Grid */}
      <StatsCounter lang={lang} />

      {/* 4. Computer Courses Showcase */}
      <CoursesSection lang={lang} onNavigate={onNavigate} />

      {/* 5. Why Choose Samarth Computers */}
      <WhyChooseUs lang={lang} />

      {/* 6. Online Services Showcase (CSC & Govt Services) */}
      <CSCServices lang={lang} onNavigate={onNavigate} />

      {/* 7. Live Batch Timetable Schedule Widget */}
      <BatchTimetableWidget lang={lang} />


      {/* 10. Free Workshops, IT Skill Seminars & News Hub */}
      <WorkshopsSection lang={lang} />


      {/* 11. Free Career Counseling CTA Banner */}
      <CareerCounselingBanner lang={lang} />

      {/* 12. Student Success Stories */}
      <SuccessStories lang={lang} />

      {/* 13. Google Reviews Feed */}
      <Reviews lang={lang} />

      {/* 14. Campus Tour, Lab Gallery & Social Media Reels Hub */}
      <GallerySection lang={lang} />

      {/* 17. Faculty & Mentors Grid */}

      <Faculty lang={lang} />

      {/* 19. Frequently Asked Questions Accordion */}

      <FAQ lang={lang} />

      {/* 20. Contact & Multi-Tab Lead Form + Compact Google Map */}
      <ContactForm lang={lang} />

      {/* Persistent Floating AI Assistant Widget */}
      <AIAssistantWidget lang={lang} />
    </div>
  );
}

