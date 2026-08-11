import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AdminRepository } from './repositories/AdminRepository';
import { sharedStore } from './repositories/sharedStore';
import { supabase } from './lib/supabase';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home/HomePage';
import CoursesPage from './pages/Courses/CoursesPage';
import CourseDetailsPage from './pages/CourseDetails/CourseDetailsPage';
import CSCPage from './pages/CSC/CSCPage';
import GovernmentPage from './pages/Government/GovernmentPage';
import ServicesPage from './pages/Services/ServicesPage';
import ContactPage from './pages/Contact/ContactPage';
import AboutPage from './pages/About/AboutPage';
import FacultyPage from './pages/Faculty/FacultyPage';
import GalleryPage from './pages/Gallery/GalleryPage';
import StudentVerificationPage from './pages/Student/StudentVerificationPage';
import AdminLoginPage from './pages/Admin/AdminLoginPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import SmoothScroll from './components/common/SmoothScroll';
import BatchTimetableWidget from './components/sections/BatchTimetableWidget';
import './styles/tailwind.css';

function MainApp() {
  const [lang, setLang] = useState('mr');
  const [currentView, setCurrentView] = useState('home'); // home|courses|details|services|csc|govt|about|faculty|gallery|contact|timetable|verification|admin
  const [selectedSlug, setSelectedSlug] = useState('mscit');
  const { isAdmin, loading: authLoading } = useAuth();

  const handleNavigate = (view, slug = 'mscit') => {
    // Redirect old csc/govt direct links to unified services hub
    const resolvedView = (view === 'csc' || view === 'govt') ? 'services' : view;
    setCurrentView(resolvedView);
    if (slug) setSelectedSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    // 1. Initial sync of site settings from DB
    const syncSiteSettings = async () => {
      try {
        const settings = await AdminRepository.getSiteSettings();
        if (settings) sharedStore.saveSiteSettings(settings);
      } catch (err) {
        console.warn('[App] site_settings sync notice:', err.message);
      }
    };
    syncSiteSettings();

    // 2. Refresh when window regains focus across tabs/devices
    const handleFocus = () => syncSiteSettings();
    window.addEventListener('focus', handleFocus);

    // 3. Supabase Realtime channel for site_settings updates
    const channel = supabase
      .channel('public:site_settings_realtime')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'site_settings' }, async () => {
        syncSiteSettings();
      })
      .subscribe();

    const handleOpenAdmin = () => {
      handleNavigate('admin');
    };
    window.addEventListener('openAdminPortal', handleOpenAdmin);

    return () => {
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('openAdminPortal', handleOpenAdmin);
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <MainLayout 
      lang={lang} 
      onLanguageChange={setLang}
      currentView={currentView}
      onNavigate={handleNavigate}
    >
      {/* Page View Content */}
      {currentView === 'home' && <HomePage lang={lang} onNavigate={handleNavigate} />}
      {currentView === 'courses' && <CoursesPage lang={lang} onNavigate={handleNavigate} />}
      {currentView === 'details' && <CourseDetailsPage slug={selectedSlug} lang={lang} onNavigate={handleNavigate} />}
      {currentView === 'services' && <ServicesPage lang={lang} onNavigate={handleNavigate} />}
      {/* Legacy views redirected to services via handleNavigate, kept for safety */}
      {currentView === 'csc' && <ServicesPage lang={lang} onNavigate={handleNavigate} />}
      {currentView === 'govt' && <ServicesPage lang={lang} onNavigate={handleNavigate} />}
      {currentView === 'about' && <AboutPage lang={lang} onNavigate={handleNavigate} />}
      {currentView === 'faculty' && <FacultyPage lang={lang} onNavigate={handleNavigate} />}
      {currentView === 'gallery' && <GalleryPage lang={lang} onNavigate={handleNavigate} />}
      {currentView === 'contact' && <ContactPage lang={lang} onNavigate={handleNavigate} />}
      {currentView === 'timetable' && (
        <div className="min-h-screen bg-background pt-lg pb-20 md:pb-0">
          <BatchTimetableWidget lang={lang} fullPage />
        </div>
      )}
      {currentView === 'verification' && <StudentVerificationPage lang={lang} />}

      {/* Admin Protected View */}
      {currentView === 'admin' && (
        authLoading ? (
          // Wait for session check to complete before deciding login vs dashboard
          <div className="min-h-screen flex items-center justify-center bg-background">
            <div className="flex flex-col items-center gap-4">
              <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              <p className="text-sm text-muted-foreground">Checking session…</p>
            </div>
          </div>
        ) : isAdmin ? (
          <AdminDashboard lang={lang} onLogout={() => handleNavigate('home')} />
        ) : (
          <AdminLoginPage lang={lang} onSuccess={() => setCurrentView('admin')} onNavigate={handleNavigate} />
        )
      )}
    </MainLayout>
  );
}



export default function App() {
  return (
    <AuthProvider>
      <SmoothScroll>
        <MainApp />
      </SmoothScroll>
    </AuthProvider>
  );
}

