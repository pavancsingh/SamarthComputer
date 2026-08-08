import React from 'react';

/**
 * MobileNav Component — Stitch Design System
 * Fixed bottom navigation bar for mobile (hidden on md+).
 * Matches Stitch screens: Home, Courses, CSC Services, AI Assistant
 * Active item: text-primary + filled icon + scale-95
 * Inactive: text-secondary hover state
 */
export default function MobileNav({ currentView = 'home', onNavigate }) {
  const navItems = [
    {
      id: 'home',
      labelEn: 'Home',
      icon: 'home',
      iconFill: 'home',
    },
    {
      id: 'courses',
      labelEn: 'Courses',
      icon: 'school',
      iconFill: 'school',
    },
    {
      id: 'csc',
      labelEn: 'CSC Services',
      icon: 'account_balance',
      iconFill: 'account_balance',
    },
    {
      id: 'timetable',
      labelEn: 'Timetable',
      icon: 'calendar_month',
      iconFill: 'calendar_month',
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 md:hidden bg-white/90 backdrop-blur-lg border-t border-surface-variant/50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-xl">
      {navItems.map((item) => {
        const isActive = currentView === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate && onNavigate(item.id)}
            className={`flex flex-col items-center justify-center rounded-xl p-xs transition-all ${
              isActive
                ? 'text-primary scale-95'
                : 'text-secondary hover:bg-surface-container-low'
            }`}
          >
            <span
              className="material-symbols-outlined text-[24px]"
              style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}
            >
              {item.iconFill}
            </span>
            <span className={`text-label-caps font-label-caps mt-xs ${isActive ? 'font-bold' : ''}`}>
              {item.labelEn}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
