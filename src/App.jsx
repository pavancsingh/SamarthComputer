import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import HomePage from './pages/Home/HomePage';
import CoursesPage from './pages/Courses/CoursesPage';
import CourseDetailsPage from './pages/CourseDetails/CourseDetailsPage';
import CSCPage from './pages/CSC/CSCPage';
import GovernmentPage from './pages/Government/GovernmentPage';
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
  const [currentView, setCurrentView] = useState('home'); // home|courses|details|csc|govt|about|faculty|gallery|contact|timetable|admin
  const [selectedSlug, setSelectedSlug] = useState('mscit');
  const { isAdmin, loading: authLoading } = useAuth();

  const handleNavigate = (view, slug = 'mscit') => {
    setCurrentView(view);
    if (slug) setSelectedSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleOpenAdmin = () => {
      handleNavigate('admin');
    };
    window.addEventListener('openAdminPortal', handleOpenAdmin);
    return () => window.removeEventListener('openAdminPortal', handleOpenAdmin);
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
      {currentView === 'csc' && <CSCPage lang={lang} onNavigate={handleNavigate} />}
      {currentView === 'govt' && <GovernmentPage lang={lang} onNavigate={handleNavigate} />}
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

