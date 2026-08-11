import React, { useEffect } from 'react';
import Lenis from 'lenis';

/**
 * SmoothScroll Component
 * Integrates Lenis smooth scrolling for 60fps momentum scroll.
 */
export default function SmoothScroll({ children }) {
  useEffect(() => {
    let rafId = null;
    let lenis = null;

    try {
      lenis = new Lenis({
        duration: 1.0,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.5,
      });

      function raf(time) {
        if (lenis) {
          lenis.raf(time);
          rafId = requestAnimationFrame(raf);
        }
      }

      rafId = requestAnimationFrame(raf);
    } catch (e) {
      console.warn('Lenis smooth scroll initialization notice:', e);
    }

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis) {
        try {
          lenis.destroy();
        } catch {}
      }
    };
  }, []);

  return <>{children}</>;
}

