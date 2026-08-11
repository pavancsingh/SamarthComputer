import React from 'react';

/**
 * Navbar Component — Stitch Design System
 * Desktop navigation links matching Stitch screens exactly:
 * Courses | CSC Services | Timetable | About Us | Faculty | Contact
 * Active state: text-primary border-b-2 border-primary font-label-bold
 * Inactive: text-secondary font-label-bold hover:text-primary transition-colors
 */
import { sharedStore } from '../../repositories/sharedStore';

export default function Navbar({ lang = 'mr', currentView = 'home', onNavigate }) {
  const isMarathi = lang === 'mr';
  const [settings, setSettings] = React.useState(sharedStore.getSiteSettings());

  React.useEffect(() => {
    const unsub = sharedStore.subscribe(() => setSettings(sharedStore.getSiteSettings()));
    return () => unsub();
  }, []);

  const defaultNavLinks = [
    { id: 'home',      labelEn: 'Home',         labelMr: 'मुख्यपृष्ठ', visible: true, order: 1 },
    { id: 'courses',   labelEn: 'Courses',       labelMr: 'कोर्सेस', visible: true, order: 2 },
    { id: 'services',  labelEn: 'Services',      labelMr: 'सेवा', visible: true, order: 3 },
    { id: 'timetable', labelEn: 'Timetable',     labelMr: 'वेळापत्रक', visible: true, order: 4 },
    { id: 'about',     labelEn: 'About Us',      labelMr: 'आमच्याबद्दल', visible: true, order: 5 },
    { id: 'faculty',   labelEn: 'Faculty',       labelMr: 'शिक्षक वृंद', visible: true, order: 6 },
    { id: 'contact',   labelEn: 'Contact',       labelMr: 'संपर्क', visible: true, order: 7 },
  ];

  const configuredLinks = settings.navSettings && settings.navSettings.length > 0
    ? settings.navSettings
    : defaultNavLinks;

  const activeLinks = configuredLinks
    .filter((l) => l.visible !== false)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  return (
    <nav className="hidden md:flex items-center gap-lg font-label-bold text-label-bold">
      {activeLinks.map((link) => {
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
              {isMarathi ? (link.labelMr || link.labelEn) : (link.labelEn || link.labelMr)}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
