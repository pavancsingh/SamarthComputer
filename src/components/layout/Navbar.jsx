import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import MegaMenu from './MegaMenu';

/**
 * Navbar Component
 * Desktop navigation menu links merged into a single clean header row.
 * Merges CSC Services & Govt Services into a single combined dropdown item.
 */
export default function Navbar({ lang = 'mr', currentView = 'home', onNavigate }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const timeoutRef = useRef(null);
  const navRef = useRef(null);
  const isMarathi = lang === 'mr';

  // Close menu on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        setActiveMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleMouseEnter = (menuName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(menuName);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 350);
  };

  const handleLinkClick = (view) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(null);
    if (onNavigate) {
      onNavigate(view);
    }
  };

  return (
    <nav 
      ref={navRef}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
      className="hidden lg:flex items-center gap-1.5 font-medium text-xs text-stitch-slate-dark relative"
    >
      {/* Home Link */}
      <button
        type="button"
        onClick={() => handleLinkClick('home')}
        className={`px-4 py-2 rounded-2xl transition-all ${
          currentView === 'home' 
            ? 'text-stitch-red font-extrabold bg-stitch-red-light border border-stitch-red-border/80 shadow-stitch-sm' 
            : 'hover:text-stitch-red hover:bg-slate-100/80 font-semibold'
        }`}
      >
        <span className={isMarathi ? 'marathi-text' : ''}>
          {isMarathi ? 'मुख्यपृष्ठ' : 'Home'}
        </span>
      </button>

      {/* Courses Mega Menu Trigger */}
      <div 
        onMouseEnter={() => handleMouseEnter('courses')}
        onMouseLeave={handleMouseLeave}
        className="py-2 relative"
      >
        <button
          type="button"
          onClick={() => handleLinkClick('courses')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl transition-all ${
            currentView === 'courses' || activeMenu === 'courses' 
              ? 'text-stitch-red bg-stitch-red-light font-extrabold border border-stitch-red-border/80 shadow-stitch-sm' 
              : 'hover:text-stitch-red hover:bg-slate-100/80 font-semibold'
          }`}
        >
          <span className={isMarathi ? 'marathi-text' : ''}>
            {isMarathi ? 'कोर्सेस' : 'Courses'}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-stitch-red transition-transform duration-200 ${activeMenu === 'courses' ? 'rotate-180' : ''}`} />
        </button>

        {activeMenu === 'courses' && (
          <div 
            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
            onMouseLeave={handleMouseLeave}
          >
            <MegaMenu 
              type="courses" 
              lang={lang} 
              onClose={() => setActiveMenu(null)}
              onNavigate={onNavigate}
            />
          </div>
        )}
      </div>

      {/* Merged CSC & Govt Services Trigger */}
      <div 
        onMouseEnter={() => handleMouseEnter('csc')}
        onMouseLeave={handleMouseLeave}
        className="py-2 relative"
      >
        <button
          type="button"
          onClick={() => handleLinkClick('csc')}
          className={`flex items-center gap-1.5 px-4 py-2 rounded-2xl transition-all ${
            currentView === 'csc' || currentView === 'govt' || activeMenu === 'csc' 
              ? 'text-stitch-red bg-stitch-red-light font-extrabold border border-stitch-red-border/80 shadow-stitch-sm' 
              : 'hover:text-stitch-red hover:bg-slate-100/80 font-semibold'
          }`}
        >
          <span className={isMarathi ? 'marathi-text' : ''}>
            {isMarathi ? 'सीएससी व शासकीय सेवा' : 'CSC & Govt Services'}
          </span>
          <ChevronDown className={`w-3.5 h-3.5 text-stitch-red transition-transform duration-200 ${activeMenu === 'csc' ? 'rotate-180' : ''}`} />
        </button>

        {activeMenu === 'csc' && (
          <div 
            onMouseEnter={() => { if (timeoutRef.current) clearTimeout(timeoutRef.current); }}
            onMouseLeave={handleMouseLeave}
          >
            <MegaMenu 
              type="csc" 
              lang={lang} 
              onClose={() => setActiveMenu(null)}
              onNavigate={onNavigate}
            />
          </div>
        )}
      </div>

      {/* About Us Link */}
      <button
        type="button"
        onClick={() => handleLinkClick('about')}
        className={`px-3.5 py-2 rounded-2xl transition-all ${
          currentView === 'about' 
            ? 'text-stitch-red font-extrabold bg-stitch-red-light border border-stitch-red-border/80 shadow-stitch-sm' 
            : 'hover:text-stitch-red hover:bg-slate-100/80 font-semibold'
        }`}
      >
        <span className={isMarathi ? 'marathi-text' : ''}>
          {isMarathi ? 'आमच्याबद्दल' : 'About Us'}
        </span>
      </button>

      {/* Faculty Link */}
      <button
        type="button"
        onClick={() => handleLinkClick('faculty')}
        className={`px-3.5 py-2 rounded-2xl transition-all ${
          currentView === 'faculty' 
            ? 'text-stitch-red font-extrabold bg-stitch-red-light border border-stitch-red-border/80 shadow-stitch-sm' 
            : 'hover:text-stitch-red hover:bg-slate-100/80 font-semibold'
        }`}
      >
        <span className={isMarathi ? 'marathi-text' : ''}>
          {isMarathi ? 'शिक्षक वृंद' : 'Faculty'}
        </span>
      </button>

      {/* Gallery Link */}
      <button
        type="button"
        onClick={() => handleLinkClick('gallery')}
        className={`px-3.5 py-2 rounded-2xl transition-all ${
          currentView === 'gallery' 
            ? 'text-stitch-red font-extrabold bg-stitch-red-light border border-stitch-red-border/80 shadow-stitch-sm' 
            : 'hover:text-stitch-red hover:bg-slate-100/80 font-semibold'
        }`}
      >
        <span className={isMarathi ? 'marathi-text' : ''}>
          {isMarathi ? 'गॅलरी' : 'Gallery'}
        </span>
      </button>

      {/* Contact Link */}
      <button
        type="button"
        onClick={() => handleLinkClick('contact')}
        className={`px-3.5 py-2 rounded-2xl transition-all ${
          currentView === 'contact' 
            ? 'text-stitch-red font-extrabold bg-stitch-red-light border border-stitch-red-border/80 shadow-stitch-sm' 
            : 'hover:text-stitch-red hover:bg-slate-100/80 font-semibold'
        }`}
      >
        <span className={isMarathi ? 'marathi-text' : ''}>
          {isMarathi ? 'संपर्क' : 'Contact'}
        </span>
      </button>
    </nav>
  );
}
