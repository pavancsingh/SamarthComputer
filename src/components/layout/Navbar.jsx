import React from 'react';

/**
 * Navbar Component — Stitch Design System
 * Desktop navigation links matching Stitch screens exactly:
 * Courses | CSC Services | Timetable | About Us | Faculty | Contact
 * Active state: text-primary border-b-2 border-primary font-label-bold
 * Inactive: text-secondary font-label-bold hover:text-primary transition-colors
 */
export default function Navbar({ lang = 'mr', currentView = 'home', onNavigate }) {
  const isMarathi = lang === 'mr';

  const navLinks = [
    { id: 'home',      labelEn: 'Home',         labelMr: 'मुख्यपृष्ठ' },
    { id: 'courses',   labelEn: 'Courses',       labelMr: 'कोर्सेस' },
    { id: 'services',  labelEn: 'Services',      labelMr: 'सेवा' },
    { id: 'timetable', labelEn: 'Timetable',     labelMr: 'वेळापत्रक' },
    { id: 'about',     labelEn: 'About Us',      labelMr: 'आमच्याबद्दल' },
    { id: 'faculty',   labelEn: 'Faculty',       labelMr: 'शिक्षक वृंद' },
    { id: 'contact',   labelEn: 'Contact',       labelMr: 'संपर्क' },
  ];


  return (
    <nav className="hidden md:flex items-center gap-lg font-label-bold text-label-bold">
      {navLinks.map((link) => {
        const isActive = currentView === link.id;
        return (
          <button
            key={link.id}
            type="button"
            onClick={() => onNavigate && onNavigate(link.id)}
            className={`transition-colors duration-200 pb-0.5 whitespace-nowrap ${
              isActive
                ? 'text-primary border-b-2 border-primary font-label-bold'
                : 'text-secondary hover:text-primary'
            }`}
          >
            <span className={isMarathi ? 'marathi-text' : ''}>
              {isMarathi ? link.labelMr : link.labelEn}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
