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
import AdminLoginPage from './pages/Admin/AdminLoginPage';
import AdminDashboard from './pages/Admin/AdminDashboard';
import SmoothScroll from './components/common/SmoothScroll';
import './styles/tailwind.css';

function MainApp() {
  const [lang, setLang] = useState('mr');
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'courses' | 'details' | 'csc' | 'govt' | 'repair' | 'about' | 'faculty' | 'gallery' | 'contact' | 'admin'
  const [selectedSlug, setSelectedSlug] = useState('mscit');
  const { isAdmin } = useAuth();

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

      {/* Admin Protected View */}
      {currentView === 'admin' && (
        isAdmin ? (
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

