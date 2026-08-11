import React, { useState, useEffect, useRef } from 'react';
import { 
  ShieldCheck, Plus, Trash2, Edit3, Save, X, LogOut, CheckCircle2, 
  BookOpen, FileText, Users, RefreshCw, Sparkles, Filter, Building2,
  Camera, Upload, Image, Loader2, GraduationCap, KeyRound, Database, DatabaseBackup,
  Clock, Megaphone, Search, Bell, Menu, ChevronRight, Phone, MessageSquare,
  LayoutDashboard, ArrowUpRight, CheckCircle, AlertCircle, Eye, SlidersHorizontal, Info
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminRepository } from '../../repositories/AdminRepository';
import { sharedStore } from '../../repositories/sharedStore';
import { StorageService, toVersionedUrl } from '../../services/StorageService';

/**
 * AdminDashboard Component — Stitch Design System (Admin Suite)
 * Covers all 9 Stitch Admin screens:
 * 1. Overview Dashboard (KPI stats, quick actions, recent lead feed)
 * 2. Inbox Leads & Inquiries
 * 3. Courses Management
 * 4. Course Details Side Drawer (slide-over panel)
 * 5. CSC Services Management
 * 6. Government Services Management
 * 7. Batch Timetable & Schedule
 * 8. Campus Gallery & Photos
 * 9. Branding & Site Settings
 */
export default function AdminDashboard({ lang = 'en', onLogout }) {
  const { logoutAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logoutAdmin();
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/';
    }
  };

  const [tab, setTab] = useState('overview'); 
  // Tabs: 'overview' | 'inquiries' | 'courses' | 'csc' | 'govt' | 'timetable' | 'news' | 'faculty' | 'gallery' | 'settings'

  // Data states
  const [inquiries, setInquiries] = useState([]);
  const [courses, setCourses] = useState([]);
  const [cscServices, setCscServices] = useState([]);
  const [govtServices, setGovtServices] = useState([]);
  const [siteGallery, setSiteGallery] = useState([]);
  const [facultyList, setFacultyList] = useState([]);
  const [batchesList, setBatchesList] = useState([]);
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filters & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [leadFilter, setLeadFilter] = useState('All'); // 'All' | 'New Lead' | 'In Process' | 'Completed'

  // Side Drawer state for course details
  const [drawerCourse, setDrawerCourse] = useState(null);

  // Active Edit Form state
  const [editingItem, setEditingItem] = useState(null);
  const [formType, setFormType] = useState(null); 
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionNotice, setActionNotice] = useState(null); // { type: 'success' | 'error', text: '' }

  const [siteSettings, setSiteSettings] = useState(sharedStore.getSiteSettings());
  const [pendingLogo, setPendingLogo] = useState(null); // { file: File, previewUrl: string }
  const [pendingHero, setPendingHero] = useState(null); // { file: File, previewUrl: string }

  useEffect(() => {
    loadAllData();
    const unsubscribe = sharedStore.subscribe(() => {
      loadAllData();
      setSiteSettings(sharedStore.getSiteSettings());
    });
    return unsubscribe;
  }, []);

  async function loadAllData() {
    setLoading(true);
    const inqData = await AdminRepository.getAllInquiries();
    const courseData = await AdminRepository.getAllCourses();
    const cscData = await AdminRepository.getAllCSCServices();
    const govtData = await AdminRepository.getAllGovtServices();
    const galleryData = await AdminRepository.getAllSiteGallery();
    const facultyData = await AdminRepository.getAllFaculty();
    const batchData = await AdminRepository.getAllBatches();
    const newsData = await AdminRepository.getAllNews();

    setInquiries(inqData || []);
    setCourses(courseData || []);
    setCscServices(cscData || []);
    setGovtServices(govtData || []);
    setSiteGallery(galleryData || []);
    setFacultyList(facultyData || []);
    setBatchesList(batchData || []);
    setNewsList(newsData || []);
    setLoading(false);
  }

  // Cleanup Object URLs on unmount
  useEffect(() => {
    return () => {
      if (pendingLogo?.previewUrl) URL.revokeObjectURL(pendingLogo.previewUrl);
      if (pendingHero?.previewUrl) URL.revokeObjectURL(pendingHero.previewUrl);
    };
  }, [pendingLogo, pendingHero]);

  // Image Selection with Type & Size Validation + Instant Preview
  const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB

  const handleSelectBrandingImage = (e, type) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    // 1. Validate File Format
    if (!file.type || !file.type.startsWith('image/')) {
      setActionNotice({ type: 'error', text: 'Invalid file format. Please select an image file (PNG, JPG, WebP, SVG).' });
      return;
    }

    // 2. Validate File Size
    if (file.size > MAX_FILE_SIZE) {
      setActionNotice({ type: 'error', text: 'File size exceeds 5 MB. Please select a smaller image file.' });
      return;
    }

    // 3. Create instant local Object URL preview
    const previewUrl = URL.createObjectURL(file);

    if (type === 'logo') {
      if (pendingLogo?.previewUrl) URL.revokeObjectURL(pendingLogo.previewUrl);
      setPendingLogo({ file, previewUrl });
      setActionNotice({ type: 'success', text: 'New Logo preview loaded! Click "Save Site Branding Settings" to upload & save.' });
    } else if (type === 'hero') {
      if (pendingHero?.previewUrl) URL.revokeObjectURL(pendingHero.previewUrl);
      setPendingHero({ file, previewUrl });
      setActionNotice({ type: 'success', text: 'New Hero Banner preview loaded! Click "Save Site Branding Settings" to upload & save.' });
    }
  };

  // Discard / Cancel Pending Image Selection
  const handleCancelBrandingImage = (type) => {
    if (type === 'logo' && pendingLogo) {
      if (pendingLogo.previewUrl) URL.revokeObjectURL(pendingLogo.previewUrl);
      setPendingLogo(null);
      setActionNotice({ type: 'success', text: 'Selected logo preview discarded.' });
    } else if (type === 'hero' && pendingHero) {
      if (pendingHero.previewUrl) URL.revokeObjectURL(pendingHero.previewUrl);
      setPendingHero(null);
      setActionNotice({ type: 'success', text: 'Selected hero background preview discarded.' });
    }
  };

  // Confirm & Save Branding Settings
  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setActionNotice(null);

    const oldLogoUrl = siteSettings.logoUrl;
    const oldHeroUrl = siteSettings.heroBgUrl;
    let finalLogoUrl = siteSettings.logoUrl;
    let finalHeroUrl = siteSettings.heroBgUrl;

    try {
      // 1. Upload Logo if pending
      if (pendingLogo?.file) {
        setUploadingImage(true);
        const uploadedLogoUrl = await StorageService.uploadImage(pendingLogo.file, 'logo');
        setUploadingImage(false);
        if (!uploadedLogoUrl) {
          setActionNotice({ type: 'error', text: 'Failed to upload logo image to Storage. Save aborted.' });
          setIsSubmitting(false);
          return;
        }
        finalLogoUrl = uploadedLogoUrl;
      }

      // 2. Upload Hero Banner if pending
      if (pendingHero?.file) {
        setUploadingImage(true);
        const uploadedHeroUrl = await StorageService.uploadImage(pendingHero.file, 'hero');
        setUploadingImage(false);
        if (!uploadedHeroUrl) {
          setActionNotice({ type: 'error', text: 'Failed to upload hero banner image to Storage. Save aborted.' });
          setIsSubmitting(false);
          return;
        }
        finalHeroUrl = uploadedHeroUrl;
      }

      // 3. Apply version-stamping for zero-delay cache busting across all devices & browsers
      finalLogoUrl = toVersionedUrl(finalLogoUrl);
      finalHeroUrl = toVersionedUrl(finalHeroUrl);

      // Preload images into browser cache for instant rendering
      if (finalLogoUrl && !finalLogoUrl.startsWith('data:')) {
        const img = new Image();
        img.src = finalLogoUrl;
      }
      if (finalHeroUrl && !finalHeroUrl.startsWith('data:')) {
        const img = new Image();
        img.src = finalHeroUrl;
      }

      // 4. Save Settings to DB
      const updatedSettings = {
        ...siteSettings,
        logoUrl: finalLogoUrl,
        heroBgUrl: finalHeroUrl
      };

      const res = await AdminRepository.saveSiteSettings(updatedSettings);

      if (res.success) {
        // 4. Delete old Storage files if replaced
        if (pendingLogo?.file && oldLogoUrl && oldLogoUrl !== finalLogoUrl) {
          await StorageService.deleteImage(oldLogoUrl);
        }
        if (pendingHero?.file && oldHeroUrl && oldHeroUrl !== finalHeroUrl) {
          await StorageService.deleteImage(oldHeroUrl);
        }

        // 5. Cleanup preview Object URLs and clear pending state
        if (pendingLogo?.previewUrl) URL.revokeObjectURL(pendingLogo.previewUrl);
        if (pendingHero?.previewUrl) URL.revokeObjectURL(pendingHero.previewUrl);
        setPendingLogo(null);
        setPendingHero(null);

        setSiteSettings(updatedSettings);
        sharedStore.saveSiteSettings(updatedSettings);

        setActionNotice({ type: 'success', text: 'Site Branding Settings updated & saved successfully!' });
      } else {
        setActionNotice({ type: 'error', text: `Failed to save settings: ${res.error}` });
      }
    } catch (err) {
      console.error('[AdminDashboard] handleSaveSettings exception:', err);
      setActionNotice({ type: 'error', text: 'An unexpected error occurred while saving branding settings.' });
    } finally {
      setIsSubmitting(false);
      setUploadingImage(false);
    }
  };

  // Direct Image Upload Handler
  const handleFileUpload = async (e, folder = 'general', customCallback = null) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';

    setUploadingImage(true);
    const publicUrl = await StorageService.uploadImage(file, folder);
    setUploadingImage(false);

    if (publicUrl) {
      if (customCallback) {
        customCallback(publicUrl);
      } else {
        setEditingItem((prev) => ({ ...prev, imageUrl: publicUrl, image_url: publicUrl }));
      }
      setActionNotice({ type: 'success', text: 'Image uploaded successfully!' });
    } else {
      setActionNotice({ type: 'error', text: 'Failed to upload image to Storage.' });
    }
  };

  // --- Handlers ---
  const handleInquiryStatus = async (id, status) => {
    setIsSubmitting(true);
    const res = await AdminRepository.updateInquiryStatus(id, status);
    setIsSubmitting(false);
    if (res.success) {
      setActionNotice({ type: 'success', text: 'Lead status updated successfully!' });
      loadAllData();
    } else {
      setActionNotice({ type: 'error', text: `Failed to update status: ${res.error}` });
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead inquiry?')) {
      setIsSubmitting(true);
      const res = await AdminRepository.deleteInquiry(id);
      setIsSubmitting(false);
      if (res.success) {
        setActionNotice({ type: 'success', text: 'Lead inquiry deleted!' });
        loadAllData();
      } else {
        setActionNotice({ type: 'error', text: `Failed to delete lead: ${res.error}` });
      }
    }
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    if (!editingItem?.title || !editingItem.title.trim()) {
      setActionNotice({ type: 'error', text: 'Please enter a valid course title.' });
      return;
    }
    setIsSubmitting(true);
    const res = await AdminRepository.saveCourse(editingItem);
    setIsSubmitting(false);
    if (res.success) {
      setActionNotice({ type: 'success', text: `Course "${editingItem.title}" saved successfully!` });
      setEditingItem(null);
      setFormType(null);
      loadAllData();
    } else {
      setActionNotice({ type: 'error', text: `Failed to save course: ${res.error}` });
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setIsSubmitting(true);
      const res = await AdminRepository.deleteCourse(id);
      setIsSubmitting(false);
      if (res.success) {
        setActionNotice({ type: 'success', text: 'Course deleted successfully!' });
        loadAllData();
      } else {
        setActionNotice({ type: 'error', text: `Failed to delete course: ${res.error}` });
      }
    }
  };

  const handleSaveCSC = async (e) => {
    e.preventDefault();
    const title = editingItem?.titleEn || editingItem?.titleMr || editingItem?.title_en || editingItem?.title_mr;
    if (!title || !title.trim()) {
      setActionNotice({ type: 'error', text: 'Please enter a service title.' });
      return;
    }
    setIsSubmitting(true);
    const res = await AdminRepository.saveCSCService(editingItem);
    setIsSubmitting(false);
    if (res.success) {
      setActionNotice({ type: 'success', text: 'CSC Service saved successfully!' });
      setEditingItem(null);
      setFormType(null);
      loadAllData();
    } else {
      setActionNotice({ type: 'error', text: `Failed to save CSC service: ${res.error}` });
    }
  };

  const handleDeleteCSC = async (id) => {
    if (window.confirm('Are you sure you want to delete this CSC service?')) {
      setIsSubmitting(true);
      const res = await AdminRepository.deleteCSCService(id);
      setIsSubmitting(false);
      if (res.success) {
        setActionNotice({ type: 'success', text: 'CSC Service deleted!' });
        loadAllData();
      } else {
        setActionNotice({ type: 'error', text: `Failed to delete CSC service: ${res.error}` });
      }
    }
  };

  const handleSaveGovt = async (e) => {
    e.preventDefault();
    const title = editingItem?.titleEn || editingItem?.titleMr || editingItem?.title_en || editingItem?.title_mr;
    if (!title || !title.trim()) {
      setActionNotice({ type: 'error', text: 'Please enter a government service title.' });
      return;
    }
    setIsSubmitting(true);
    const res = await AdminRepository.saveGovtService(editingItem);
    setIsSubmitting(false);
    if (res.success) {
      setActionNotice({ type: 'success', text: 'Government service saved successfully!' });
      setEditingItem(null);
      setFormType(null);
      loadAllData();
    } else {
      setActionNotice({ type: 'error', text: `Failed to save Government service: ${res.error}` });
    }
  };

  const handleDeleteGovt = async (id) => {
    if (window.confirm('Are you sure you want to delete this Government service?')) {
      setIsSubmitting(true);
      const res = await AdminRepository.deleteGovtService(id);
      setIsSubmitting(false);
      if (res.success) {
        setActionNotice({ type: 'success', text: 'Government service deleted!' });
        loadAllData();
      } else {
        setActionNotice({ type: 'error', text: `Failed to delete Government service: ${res.error}` });
      }
    }
  };

  const handleSaveGalleryItem = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await AdminRepository.saveSiteGalleryItem(editingItem);
    setIsSubmitting(false);
    if (res.success) {
      setActionNotice({ type: 'success', text: 'Gallery photo saved successfully!' });
      setEditingItem(null);
      setFormType(null);
      loadAllData();
    } else {
      setActionNotice({ type: 'error', text: `Failed to save gallery item: ${res.error}` });
    }
  };

  const handleDeleteGalleryItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery photo?')) {
      setIsSubmitting(true);
      const res = await AdminRepository.deleteSiteGalleryItem(id);
      setIsSubmitting(false);
      if (res.success) {
        setActionNotice({ type: 'success', text: 'Gallery photo deleted!' });
        loadAllData();
      } else {
        setActionNotice({ type: 'error', text: `Failed to delete gallery photo: ${res.error}` });
      }
    }
  };

  const handleSaveFaculty = async (e) => {
    e.preventDefault();
    if (!editingItem?.name || !editingItem.name.trim()) {
      setActionNotice({ type: 'error', text: 'Please enter faculty member name.' });
      return;
    }
    setIsSubmitting(true);
    const res = await AdminRepository.saveFacultyItem(editingItem);
    setIsSubmitting(false);
    if (res.success) {
      setActionNotice({ type: 'success', text: 'Faculty member saved successfully!' });
      setEditingItem(null);
      setFormType(null);
      loadAllData();
    } else {
      setActionNotice({ type: 'error', text: `Failed to save faculty member: ${res.error}` });
    }
  };

  const handleDeleteFaculty = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      setIsSubmitting(true);
      const res = await AdminRepository.deleteFacultyItem(id);
      setIsSubmitting(false);
      if (res.success) {
        setActionNotice({ type: 'success', text: 'Faculty member deleted!' });
        loadAllData();
      } else {
        setActionNotice({ type: 'error', text: `Failed to delete faculty member: ${res.error}` });
      }
    }
  };

  const handleSaveBatch = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await AdminRepository.saveBatchItem(editingItem);
    setIsSubmitting(false);
    if (res.success) {
      setActionNotice({ type: 'success', text: 'Batch slot saved successfully!' });
      setEditingItem(null);
      setFormType(null);
      loadAllData();
    } else {
      setActionNotice({ type: 'error', text: `Failed to save batch slot: ${res.error}` });
    }
  };

  const handleDeleteBatch = async (id) => {
    if (window.confirm('Are you sure you want to delete this batch slot?')) {
      setIsSubmitting(true);
      const res = await AdminRepository.deleteBatchItem(id);
      setIsSubmitting(false);
      if (res.success) {
        setActionNotice({ type: 'success', text: 'Batch slot deleted!' });
        loadAllData();
      } else {
        setActionNotice({ type: 'error', text: `Failed to delete batch slot: ${res.error}` });
      }
    }
  };

  const handleSaveNews = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await AdminRepository.saveNewsItem(editingItem);
    setIsSubmitting(false);
    if (res.success) {
      setActionNotice({ type: 'success', text: 'News announcement saved successfully!' });
      setEditingItem(null);
      setFormType(null);
      loadAllData();
    } else {
      setActionNotice({ type: 'error', text: `Failed to save news item: ${res.error}` });
    }
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm('Are you sure you want to delete this news announcement?')) {
      setIsSubmitting(true);
      const res = await AdminRepository.deleteNewsItem(id);
      setIsSubmitting(false);
      if (res.success) {
        setActionNotice({ type: 'success', text: 'News item deleted!' });
        loadAllData();
      } else {
        setActionNotice({ type: 'error', text: `Failed to delete news item: ${res.error}` });
      }
    }
  };

  const handleSyncToSupabase = async () => {
    if (window.confirm('Do you want to sync all local data to Supabase database now?')) {
      setLoading(true);
      const res = await AdminRepository.syncAllLocalDataToSupabase();
      setLoading(false);
      alert(`Supabase Sync Completed! Successfully synced ${res.count || 0} records.`);
      loadAllData();
    }
  };

  // Filtered Leads — supports type-based filtering (Course Leads / Service Requests)
  const filteredInquiries = inquiries.filter((inq) => {
    // Type filter
    if (leadFilter === 'Course Leads') {
      if (inq.type !== 'course_admission') return false;
    } else if (leadFilter === 'Service Requests') {
      if (!['service_request', 'csc_service', 'govt_service'].includes(inq.type || '')) return false;
    } else if (leadFilter !== 'All') {
      // Status filter (New Lead, Contacted, Completed, etc.)
      if ((inq.status || 'New Lead') !== leadFilter) return false;
    }
    const matchesSearch = !searchQuery || 
      (inq.name && inq.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.mobile && inq.mobile.includes(searchQuery)) ||
      (inq.course_id && inq.course_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.service_id && inq.service_id.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  const [settingsExpanded, setSettingsExpanded] = useState(true);

  // Group 1: Core Operational Modules
  const mainNavItems = [
    { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'inquiries', label: 'Inbox Leads', icon: Users, badge: inquiries.length },
    { id: 'courses', label: 'Courses', icon: BookOpen, badge: courses.length },
    { id: 'csc', label: 'Online CSC & Services', icon: FileText, badge: cscServices.length },
    { id: 'faculty', label: 'Faculty', icon: GraduationCap, badge: facultyList.length },
    { id: 'news', label: 'News & Updates', icon: Megaphone, badge: newsList.length },
    { id: 'timetable', label: 'Batch Timetable', icon: Clock, badge: batchesList.length },
    { id: 'gallery', label: 'Campus Photos', icon: Camera, badge: siteGallery.length },
  ];

  // Group 2: Website Content Pages
  const websiteNavItems = [
    { id: 'home_control', label: 'Home Page', icon: Sparkles },
    { id: 'about_control', label: 'About Page', icon: Info },
    { id: 'contact_control', label: 'Contact & Call CTA', icon: Phone },
  ];

  // Group 3: Expandable Settings & Secondary Config
  const settingsNavItems = [
    { id: 'nav_control', label: 'Navigation Menu', icon: Menu },
    { id: 'settings', label: 'Branding & Logo', icon: Image },
    { id: 'govt', label: 'Govt Certificates', icon: Building2, badge: govtServices.length },
    { id: 'settings_theme', label: 'Theme / Colors', icon: Sparkles },
    { id: 'settings_info', label: 'Site Information', icon: Info },
    { id: 'settings_seo', label: 'SEO / Meta', icon: Search },
    { id: 'settings_social', label: 'Social Links', icon: MessageSquare },
    { id: 'settings_footer', label: 'Footer Settings', icon: FileText },
    { id: 'settings_general', label: 'Other Settings / Sync', icon: Database },
  ];

  const isSettingsActive = ['settings', 'nav_control', 'govt', 'settings_theme', 'settings_info', 'settings_seo', 'settings_social', 'settings_footer', 'settings_general'].includes(tab);

  return (
    <div className="bg-[#F8FAFC] text-slate-800 font-sans h-screen overflow-hidden flex flex-col antialiased">
      
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-indigo-600 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-black text-lg shadow-sm">
              S
            </div>
            <div>
              <div className="font-extrabold text-base text-slate-900 tracking-tight leading-none">
                Samarth Admin
              </div>
              <div className="text-[11px] text-primary font-bold flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-stitch-emerald animate-pulse"></span>
                <span>Operational Control Suite</span>
              </div>
            </div>
          </div>
        </div>

        {/* Global Search Bar */}
        <div className="flex-1 max-w-xl mx-8 hidden md:block">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search leads, courses, services, faculty..."
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white transition-all placeholder:text-slate-400 shadow-sm"
            />
          </div>
        </div>

        {/* Actions & Profile */}
        <div className="flex items-center gap-2">
          <button 
            onClick={loadAllData}
            className="p-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors active:scale-95 relative"
            title="Refresh Live Data"
          >
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-primary' : ''}`} />
          </button>

          <button 
            onClick={handleSyncToSupabase}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-primary/10 border border-primary/20 text-primary hover:bg-primary hover:text-white rounded-xl text-xs font-bold transition-all shadow-sm"
            title="Sync all local data with Supabase Database"
          >
            <DatabaseBackup className="w-3.5 h-3.5" />
            <span>Sync Supabase</span>
          </button>

          <button 
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl text-xs font-bold transition-all shadow-sm ml-1"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="flex flex-1 pt-16 h-full w-full">
        
        {/* Left Sidebar Navigation (Desktop & Mobile Drawer) */}
        <nav className={`fixed md:flex left-0 top-16 h-[calc(100vh-64px)] w-[280px] flex-col py-5 bg-white border-r border-slate-200 shadow-sm z-40 shrink-0 overflow-y-auto transition-transform ${mobileMenuOpen ? 'flex transform-none' : 'hidden md:flex'}`}>
          
          <div className="px-5 mb-4">
            <h2 className="text-[10px] font-extrabold text-slate-400 tracking-widest uppercase mb-1">Control Center</h2>
            <div className="text-sm font-black text-primary">
              Samarth Computers
            </div>
          </div>

          <div className="flex-1 space-y-5 px-3">
            
            {/* GROUP 1: MAIN NAVIGATION */}
            <div>
              <div className="text-[10px] font-black text-slate-400 tracking-wider uppercase px-3 mb-1.5">
                Main Navigation
              </div>
              <div className="space-y-0.5">
                {mainNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = tab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setTab(item.id);
                        setEditingItem(null);
                        setFormType(null);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold text-xs transition-all ${
                        isActive 
                          ? 'bg-primary text-white font-extrabold shadow-sm' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GROUP 2: WEBSITE PAGES */}
            <div>
              <div className="text-[10px] font-black text-slate-400 tracking-wider uppercase px-3 mb-1.5">
                Website Pages
              </div>
              <div className="space-y-0.5">
                {websiteNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = tab === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setTab(item.id);
                        setEditingItem(null);
                        setFormType(null);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold text-xs transition-all ${
                        isActive 
                          ? 'bg-primary text-white font-extrabold shadow-sm' 
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                        <span>{item.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* GROUP 3: EXPANDABLE SETTINGS SECTION */}
            <div>
              <div className="text-[10px] font-black text-slate-400 tracking-wider uppercase px-3 mb-1.5">
                System &amp; Settings
              </div>

              {/* Accordion Toggle Parent Header */}
              <button
                type="button"
                onClick={() => setSettingsExpanded(!settingsExpanded)}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl font-bold text-xs transition-all ${
                  isSettingsActive
                    ? 'bg-slate-100 text-slate-900 font-extrabold'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <SlidersHorizontal className="w-4 h-4 text-slate-500" />
                  <span>Settings &amp; Config</span>
                </div>
                <ChevronRight className={`w-3.5 h-3.5 text-slate-400 transition-transform ${settingsExpanded || isSettingsActive ? 'rotate-90' : ''}`} />
              </button>

              {/* Expandable Submenu Options */}
              {(settingsExpanded || isSettingsActive) && (
                <div className="mt-1 ml-3 pl-3 border-l border-slate-200 space-y-0.5 animate-in fade-in duration-200">
                  {settingsNavItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = tab === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          setTab(item.id);
                          setEditingItem(null);
                          setFormType(null);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg font-semibold text-xs transition-all ${
                          isActive 
                            ? 'bg-primary/10 text-primary font-black shadow-xs' 
                            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-primary' : 'text-slate-400'}`} />
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge !== undefined && (
                          <span className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                            isActive ? 'bg-primary text-white' : 'bg-slate-100 text-slate-500'
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

          </div>

          {/* Footer Info */}
          <div className="px-5 pt-4 mt-auto border-t border-slate-100 text-[11px] text-slate-400 font-semibold space-y-1">
            <div className="flex items-center gap-1 text-slate-600 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-stitch-emerald" />
              <span>ALC: 13210399 / 13210273</span>
            </div>
            <div>Samarth Computers, Khandala</div>
          </div>
        </nav>

        {/* Main Content View Area */}
        <main className="flex-1 md:ml-[280px] h-full overflow-y-auto w-full p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6 pb-24 md:pb-16">
            
            {actionNotice && (
              <div className={`p-4 rounded-2xl text-xs font-bold flex justify-between items-center shadow-sm ${
                actionNotice.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                  : 'bg-rose-50 text-rose-800 border border-rose-200'
              }`}>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className={`w-4 h-4 ${actionNotice.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`} />
                  <span>{actionNotice.text}</span>
                </div>
                <button onClick={() => setActionNotice(null)} className="font-extrabold hover:underline px-2 py-1">
                  Dismiss
                </button>
              </div>
            )}

            {/* TAB 0: OVERVIEW DASHBOARD */}
            {tab === 'overview' && (
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Dashboard Overview</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Operational analytics and recent inquiry activity for Samarth Computers
                  </p>
                </div>

                {/* 4 KPI Stat Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Card 1: Total Leads */}
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Leads</span>
                      <div className="p-2 bg-stitch-red-light text-primary rounded-xl">
                        <Users className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900">{inquiries.length}</div>
                    <div className="text-xs font-semibold text-stitch-emerald flex items-center gap-1">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                      <span>{inquiries.filter((i) => i.status === 'New Lead').length} new unread</span>
                    </div>
                  </div>

                  {/* Card 2: Active Courses */}
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Active Courses</span>
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
                        <BookOpen className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900">{courses.length}</div>
                    <div className="text-xs font-semibold text-slate-500">MKCL &amp; KLiC Recognized</div>
                  </div>

                  {/* Card 3: CSC Services */}
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">CSC Services</span>
                      <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
                        <FileText className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900">{cscServices.length}</div>
                    <div className="text-xs font-semibold text-slate-500">Aadhaar, PAN &amp; Govt Desk</div>
                  </div>

                  {/* Card 4: Faculty Members */}
                  <div className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Faculty &amp; Staff</span>
                      <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
                        <GraduationCap className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="text-3xl font-black text-slate-900">{facultyList.length}</div>
                    <div className="text-xs font-semibold text-stitch-emerald">Certified Instructors</div>
                  </div>
                </div>

                {/* Quick Actions & Recent Activity Feed Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                  {/* Left 7 Cols: Recent Lead Activity */}
                  <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-extrabold text-base text-slate-900">Recent Lead Inquiries</h3>
                      <button onClick={() => setTab('inquiries')} className="text-xs font-bold text-primary hover:underline">
                        View All →
                      </button>
                    </div>

                    <div className="space-y-3">
                      {inquiries.slice(0, 5).map((inq) => (
                        <div key={inq.id} className="p-3.5 bg-slate-50 rounded-xl flex items-center justify-between border border-slate-100 text-xs">
                          <div>
                            <div className="font-bold text-slate-900">{inq.name}</div>
                            <div className="text-slate-500">{inq.course_id || inq.service_id || 'Admission Inquiry'}</div>
                          </div>
                          <div className="text-right">
                            <span className="font-mono text-primary font-bold">{inq.mobile}</span>
                            <div className="text-[10px] text-slate-400">{inq.status || 'New Lead'}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right 5 Cols: Quick Navigation Cards */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="bg-primary p-6 rounded-2xl text-white space-y-3 shadow-md">
                      <h3 className="font-extrabold text-base">Quick Portal Actions</h3>
                      <p className="text-xs text-white/80">Manage course listings, timetable batches, and site branding image settings.</p>
                      <div className="flex flex-wrap gap-2 pt-2">
                        <button onClick={() => setTab('courses')} className="px-3 py-1.5 bg-white text-primary text-xs font-bold rounded-lg shadow-sm">
                          + Add Course
                        </button>
                        <button onClick={() => setTab('timetable')} className="px-3 py-1.5 bg-white/20 text-white hover:bg-white/30 text-xs font-bold rounded-lg">
                          Batch Schedule
                        </button>
                        <button onClick={() => setTab('settings')} className="px-3 py-1.5 bg-white/20 text-white hover:bg-white/30 text-xs font-bold rounded-lg">
                          Branding Settings
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 1: INBOX LEADS */}
            {tab === 'inquiries' && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Inbox Leads</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-stitch-emerald inline-block"></span>
                      <span>Auto-synced with Supabase inquiries table ({inquiries.length} Total Leads)</span>
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        name: '', mobile: '', type: 'course',
                        course_id: 'MS-CIT', batch_timing: 'Morning 09:30 AM', status: 'New Lead'
                      });
                      setFormType('inquiry');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-stitch-red-dark text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Lead</span>
                  </button>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                  <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    {['All', 'Course Leads', 'Service Requests', 'New Lead', 'In Process', 'Completed'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setLeadFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all whitespace-nowrap ${
                          leadFilter === f
                            ? f === 'Course Leads' ? 'bg-primary text-white shadow-sm'
                              : f === 'Service Requests' ? 'bg-indigo-600 text-white shadow-sm'
                              : 'bg-primary text-white shadow-sm'
                            : f === 'Course Leads' ? 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100'
                            : f === 'Service Requests' ? 'bg-indigo-50 text-indigo-600 border border-indigo-200 hover:bg-indigo-100'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {f === 'Course Leads' ? '🎓 ' : f === 'Service Requests' ? '🛎️ ' : ''}{f}
                      </button>
                    ))}
                  </div>

                  <div className="relative w-full md:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Filter leads..."
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-9 pr-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Data Table */}
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[750px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-500 uppercase tracking-wider">
                          <th className="p-4">Student Name</th>
                          <th className="p-4">Mobile Number</th>
                          <th className="p-4">Requested Service / Course</th>
                          <th className="p-4">Batch / Timing</th>
                          <th className="p-4">Status</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs font-medium">
                        {filteredInquiries.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="p-8 text-center text-slate-400 font-semibold">
                              No lead inquiries found.
                            </td>
                          </tr>
                        ) : (
                          filteredInquiries.map((inq) => (
                            <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                              <td className="p-4 font-bold text-slate-900">{inq.name}</td>
                              <td className="p-4 font-mono font-bold text-primary">{inq.mobile}</td>
                              <td className="p-4 font-semibold text-slate-700">
                                <div>{inq.course_id || inq.service_id || inq.issue_type || 'General Inquiry'}</div>
                                {inq.type && (
                                  <span className={`inline-block text-[9px] font-extrabold px-2 py-0.5 rounded-full mt-1 ${
                                    inq.type === 'course_admission'
                                      ? 'bg-red-50 text-red-600 border border-red-200'
                                      : ['service_request','csc_service','govt_service'].includes(inq.type)
                                      ? 'bg-indigo-50 text-indigo-600 border border-indigo-200'
                                      : 'bg-slate-100 text-slate-500 border border-slate-200'
                                  }`}>
                                    {inq.type === 'course_admission' ? '🎓 Course' 
                                      : ['service_request','csc_service','govt_service'].includes(inq.type) ? '🛎️ Service' 
                                      : inq.type}
                                  </span>
                                )}
                              </td>
                              <td className="p-4 text-slate-500">{inq.batch_timing || '-'}</td>
                              <td className="p-4">
                                <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                                  inq.status === 'Completed' 
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
                                    : inq.status === 'In Process'
                                    ? 'bg-amber-50 text-amber-700 border-amber-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}>
                                  {inq.status || 'New Lead'}
                                </span>
                              </td>
                              <td className="p-4 text-right space-x-2">
                                <a
                                  href={`https://wa.me/91${inq.mobile}?text=${encodeURIComponent(`Hello ${inq.name}, regards from Samarth Computers Khandala regarding your inquiry.`)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all"
                                  title="Connect on WhatsApp"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>WhatsApp</span>
                                </a>

                                <button
                                  onClick={() => handleInquiryStatus(inq.id, 'Completed')}
                                  className="bg-primary hover:bg-stitch-red-dark text-white px-2.5 py-1 rounded-lg text-[11px] font-bold shadow-sm transition-all"
                                >
                                  Done
                                </button>
                                
                                <button
                                  onClick={() => handleDeleteInquiry(inq.id)}
                                  className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-1.5 rounded-lg transition-all"
                                  title="Delete Lead"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: COURSES */}
            {tab === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Computer Courses Management</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Manage MS-CIT, Tally Prime, Advanced Excel, KLiC, DTP and Web Dev courses</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        slug: `course-${Date.now()}`,
                        title: '',
                        category: 'govt',
                        isPrimary: false,
                        isFeatured: false,
                        displayOrder: courses.length + 1,
                        durationEn: '2 Months',
                        durationMr: '२ महिने',
                        overviewEn: '',
                        overviewMr: '',
                        modulesEn: [],
                        modulesMr: [],
                        imageUrl: ''
                      });
                      setFormType('course');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-stitch-red-dark text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Course</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((c) => {
                    const isPrimary = c.is_primary || c.isPrimary || c.slug === 'mscit' || c.slug === 'tally-prime-gst' || c.slug === 'advanced-excel';
                    const isFeatured = c.is_featured || c.isFeatured;
                    const order = c.display_order !== undefined ? c.display_order : (c.displayOrder || 0);

                    return (
                      <div key={c.id || c.slug} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
                        {(c.image_url || c.imageUrl) ? (
                          <div className="h-40 w-full overflow-hidden bg-slate-100 relative">
                            <img src={c.image_url || c.imageUrl} alt={c.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 left-2 flex gap-1 flex-wrap">
                              <span className="bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                                {c.category || 'Course'}
                              </span>
                              {isPrimary && (
                                <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                                  Primary/Home
                                </span>
                              )}
                              {isFeatured && (
                                <span className="bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                                  Featured
                                </span>
                              )}
                            </div>
                            <span className="absolute bottom-2 right-2 bg-black/60 text-white text-[10px] font-mono px-2 py-0.5 rounded">
                              Order: #{order}
                            </span>
                          </div>
                        ) : (
                          <div className="p-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                            <span className="bg-slate-200 text-slate-800 text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                              {c.category || 'Course'}
                            </span>
                            {isPrimary && (
                              <span className="bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded">
                                Primary
                              </span>
                            )}
                          </div>
                        )}
                        <div className="p-5 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500 flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {c.duration_en || c.durationEn || '2 Months'}
                            </span>
                          </div>

                          <h3 className="font-extrabold text-base text-slate-900">{c.title}</h3>
                          <p className="text-xs text-slate-600 line-clamp-2">{c.overviewEn || c.overviewMr || c.overview_en || c.subtitleEn}</p>
                        </div>

                        <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-between gap-2 mt-2">
                          <button
                            onClick={() => setDrawerCourse(c)}
                            className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>View Details</span>
                          </button>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => { setEditingItem(c); setFormType('course'); }}
                              className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Edit</span>
                            </button>
                            <button
                              onClick={() => handleDeleteCourse(c.id || c.slug)}
                              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1 transition-all"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 3: CSC SERVICES */}
            {tab === 'csc' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">CSC &amp; MahaOnline Services</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Aadhaar, PAN Card, Income, Caste &amp; Domicile certificate desk</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        slug: `csc-${Date.now()}`, titleEn: '', timelineEn: '3-5 Days',
                        category: 'identity', overviewEn: '', imageUrl: ''
                      });
                      setFormType('csc');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-stitch-red-dark text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add CSC Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cscServices.map((s) => (
                    <div key={s.id || s.slug} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="bg-stitch-red-light text-primary border border-stitch-red-border text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
                            {s.category || 'CSC Service'}
                          </span>
                          <span className="text-xs font-bold text-slate-500">{s.timelineEn || s.timeline_en || '3-5 Days'}</span>
                        </div>
                        <h3 className="font-extrabold text-base text-slate-900">{s.titleEn || s.titleMr || s.title_en}</h3>
                        <p className="text-xs text-slate-600 line-clamp-2">{s.overviewEn || s.overviewMr || s.overview_en}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setEditingItem(s); setFormType('csc'); }}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteCSC(s.id || s.slug)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 4: GOVT SERVICES */}
            {tab === 'govt' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Government Services Catalog</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Aaple Sarkar portal &amp; revenue services catalog</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        slug: `govt-${Date.now()}`, titleEn: '', timelineEn: '7-15 Days',
                        category: 'revenue', overviewEn: '', imageUrl: ''
                      });
                      setFormType('govt');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-stitch-red-dark text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Govt Service</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {govtServices.map((g) => (
                    <div key={g.id || g.slug} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                      <div className="space-y-2">
                        <h3 className="font-extrabold text-base text-slate-900">{g.titleEn || g.titleMr || g.title_en}</h3>
                        <p className="text-xs text-slate-600 line-clamp-2">{g.overviewEn || g.overviewMr || g.overview_en}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setEditingItem(g); setFormType('govt'); }}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 transition-all"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDeleteGovt(g.id || g.slug)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 5: BATCH TIMETABLE */}
            {tab === 'timetable' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Batch Timetable &amp; Schedule</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Live computer classroom batch timings &amp; seat availability</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        id: `b-${Date.now()}`, category: 'morning', time: '08:00 AM - 09:30 AM',
                        courseEn: 'MS-CIT & Computer Basics', courseMr: 'MS-CIT व संगणक पायाभूत',
                        statusEn: 'Admission Open', statusMr: 'प्रवेश सुरू',
                        seatsEn: '5 Seats Left', seatsMr: '५ जागा शिल्लक'
                      });
                      setFormType('batch');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-stitch-red-dark text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Batch Slot</span>
                  </button>
                </div>

                <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                      <thead>
                        <tr className="bg-slate-50 border-b border-slate-200 text-xs font-black text-slate-500 uppercase tracking-wider">
                          <th className="p-4">Time Slot</th>
                          <th className="p-4">Course / Program</th>
                          <th className="p-4">Category</th>
                          <th className="p-4">Status</th>
                          <th className="p-4">Seats Left</th>
                          <th className="p-4 text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 text-xs font-medium">
                        {batchesList.map((b) => (
                          <tr key={b.id} className="hover:bg-slate-50 transition-colors">
                            <td className="p-4 font-mono font-bold text-primary flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-primary" />
                              <span>{b.time}</span>
                            </td>
                            <td className="p-4 font-extrabold text-slate-900">{b.courseEn}</td>
                            <td className="p-4">
                              <span className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">
                                {b.category}
                              </span>
                            </td>
                            <td className="p-4">
                              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                                {b.statusEn}
                              </span>
                            </td>
                            <td className="p-4 font-bold text-amber-600">{b.seatsEn}</td>
                            <td className="p-4 text-right space-x-2">
                              <button
                                onClick={() => { setEditingItem(b); setFormType('batch'); }}
                                className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs px-3 py-1 rounded-lg transition-all"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteBatch(b.id)}
                                className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs p-1.5 rounded-lg transition-all"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 6: NEWS & ANNOUNCEMENTS */}
            {tab === 'news' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">News &amp; Announcements</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Manage marquee announcements and scholarship news</p>
                  </div>

                  <button
                    onClick={() => {
                      const todayStr = new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                      setEditingItem({
                        id: `n-${Date.now()}`,
                        titleEn: '',
                        titleMr: '',
                        title_en: '',
                        title_mr: '',
                        categoryEn: 'Admissions',
                        categoryMr: 'प्रवेश अपडेट',
                        category_en: 'Admissions',
                        category_mr: 'प्रवेश अपडेट',
                        dateStr: todayStr,
                        date_str: todayStr,
                        descEn: '',
                        descMr: '',
                        desc_en: '',
                        desc_mr: ''
                      });
                      setFormType('news');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-stitch-red-dark text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Announcement</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {newsList.map((n) => {
                    const categoryStr = n.categoryEn || n.category_en || 'Admissions';
                    const dateStr = n.dateStr || n.date_str || (n.created_at ? new Date(n.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '2026');
                    const titleStr = n.titleEn || n.title_en || n.titleMr || n.title_mr || 'Announcement';
                    const descStr = n.descEn || n.desc_en || n.descMr || n.desc_mr || '';

                    return (
                      <div key={n.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="bg-stitch-red-light text-primary border border-stitch-red-border text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                              {categoryStr}
                            </span>
                            <span className="text-xs font-bold text-slate-400">{dateStr}</span>
                          </div>
                          <h3 className="font-extrabold text-base text-slate-900">{titleStr}</h3>
                          <p className="text-xs text-slate-600 line-clamp-3">{descStr}</p>
                        </div>

                        <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                          <button
                            onClick={() => {
                              setEditingItem({
                                ...n,
                                id: n.id,
                                titleEn: n.titleEn || n.title_en || '',
                                titleMr: n.titleMr || n.title_mr || '',
                                title_en: n.title_en || n.titleEn || '',
                                title_mr: n.title_mr || n.titleMr || '',
                                categoryEn: n.categoryEn || n.category_en || 'Admissions',
                                categoryMr: n.categoryMr || n.category_mr || 'प्रवेश अपडेट',
                                category_en: n.category_en || n.categoryEn || 'Admissions',
                                category_mr: n.category_mr || n.categoryMr || 'प्रवेश अपडेट',
                                dateStr: dateStr,
                                date_str: dateStr,
                                descEn: n.descEn || n.desc_en || '',
                                descMr: n.descMr || n.desc_mr || '',
                                desc_en: n.desc_en || n.descEn || '',
                                desc_mr: n.desc_mr || n.descMr || ''
                              });
                              setFormType('news');
                            }}
                            className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 transition-all"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>Edit</span>
                          </button>
                          <button
                            onClick={() => handleDeleteNews(n.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 7: FACULTY */}
            {tab === 'faculty' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Faculty &amp; Staff Members</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Manage instructor profiles, qualifications, and badges</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        name: '', roleEn: 'Computer Instructor', expEn: '5+ Years Experience',
                        specEn: '', badge: 'Faculty', imageUrl: ''
                      });
                      setFormType('faculty');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-stitch-red-dark text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Faculty Member</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {facultyList.map((fac) => (
                    <div key={fac.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all flex items-start gap-4 justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                          <img src={fac.imageUrl || fac.image_url} alt={fac.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h3 className="font-extrabold text-base text-slate-900">{fac.name}</h3>
                            <span className="bg-stitch-red-light text-primary border border-stitch-red-border text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                              {fac.badge || 'Faculty'}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-primary">{fac.roleEn || fac.roleMr}</div>
                          <p className="text-xs text-slate-500">{fac.expEn || fac.expMr}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          onClick={() => { setEditingItem(fac); setFormType('faculty'); }}
                          className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 rounded-xl transition-all"
                          title="Edit Profile"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteFaculty(fac.id)}
                          className="p-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 rounded-xl transition-all"
                          title="Delete Member"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 8: CAMPUS PHOTOS */}
            {tab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Campus Photo Gallery</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Upload and manage campus infrastructure &amp; event photos</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        titleEn: '', descEn: '', category: 'Campus', imageUrl: ''
                      });
                      setFormType('gallery');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-primary hover:bg-stitch-red-dark text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload New Photo</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {/* Stitch-styled Upload Dropzone Card */}
                  <label className="bg-white border-2 border-dashed border-slate-300 hover:border-primary rounded-2xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col items-center justify-center min-h-[220px] group text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 group-hover:bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      {uploadingImage ? <Loader2 className="w-6 h-6 animate-spin text-primary" /> : <Plus className="w-6 h-6 text-primary" />}
                    </div>
                    <span className="font-extrabold text-sm text-slate-900 group-hover:text-primary">Create / Upload Photo</span>
                    <span className="text-xs text-slate-400 mt-1 font-medium">Click to pick &amp; upload image</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => {
                        setEditingItem({ titleEn: 'New Gallery Photo', descEn: 'Center event or activity photo', category: 'Campus', imageUrl: '' });
                        setFormType('gallery');
                        handleFileUpload(e, 'gallery');
                      }} 
                      className="hidden" 
                    />
                  </label>

                  {siteGallery.map((item) => (
                    <div key={item.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-all">
                      <div className="h-44 w-full overflow-hidden bg-slate-100 relative group">
                        <img src={item.image_url || item.imageUrl} alt={item.titleEn} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {item.category}
                        </span>
                      </div>

                      <div className="p-4 space-y-1">
                        <h3 className="font-bold text-sm text-slate-900">{item.titleEn || item.title_en || item.titleMr}</h3>
                        <p className="text-xs text-slate-500 line-clamp-2">{item.descEn || item.desc_en || item.descMr}</p>
                      </div>

                      <div className="p-3 pt-0 border-t border-slate-100 flex items-center justify-end gap-2 mt-2">
                        <button
                          onClick={() => { setEditingItem(item); setFormType('gallery'); }}
                          className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs px-3 py-1 rounded-lg transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteGalleryItem(item.id)}
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs p-1.5 rounded-lg transition-all"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB 9: SITE BRANDING SETTINGS */}
            {tab === 'settings' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Site Branding Settings</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Manage brand logo and hero banner with instant local preview, file validation, and automatic cloud storage synchronization.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-8">
                  
                  {/* 1. Logo Image Management */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                        1. Header Brand Logo Image
                      </label>
                      <span className="text-[10px] font-semibold text-slate-400">PNG, JPG, WebP, SVG • Max 5MB</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <label className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
                        {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-accent-gold" /> : <Upload className="w-4 h-4 text-accent-gold" />}
                        <span>Select Logo File</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleSelectBrandingImage(e, 'logo')} 
                          className="hidden" 
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Logo Image URL"
                        value={pendingLogo ? pendingLogo.previewUrl : (siteSettings.logoUrl || '')}
                        onChange={(e) => {
                          if (pendingLogo) setPendingLogo(null);
                          setSiteSettings({ ...siteSettings, logoUrl: e.target.value });
                        }}
                        className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* Logo Preview Section (Current vs New Selected Preview) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {/* Current Logo Box */}
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                            Current Active Logo
                          </span>
                        </div>
                        <div className="h-20 flex items-center justify-center bg-white border border-slate-200 rounded-lg p-2">
                          {siteSettings.logoUrl ? (
                            <img 
                              src={siteSettings.logoUrl} 
                              alt="Current Logo" 
                              className="max-h-full max-w-full object-contain"
                              onError={(e) => { e.currentTarget.src = '/assets/logos/samarth-main-logo.png'; }}
                            />
                          ) : (
                            <span className="text-xs text-slate-400 italic">No custom logo set</span>
                          )}
                        </div>
                      </div>

                      {/* New Selected Logo Preview Box */}
                      {pendingLogo ? (
                        <div className="bg-primary/5 border border-primary/30 p-4 rounded-xl space-y-2 relative animate-in fade-in duration-200">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-white flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-accent-gold" /> New Selected Preview
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCancelBrandingImage('logo')}
                              className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-2 py-1 rounded-lg flex items-center gap-1 transition-all"
                              title="Discard pending logo selection"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Discard
                            </button>
                          </div>
                          <div className="h-20 flex items-center justify-center bg-white border border-primary/20 rounded-lg p-2">
                            <img 
                              src={pendingLogo.previewUrl} 
                              alt="New Logo Preview" 
                              className="max-h-full max-w-full object-contain" 
                            />
                          </div>
                          <p className="text-[10px] text-slate-500 font-semibold truncate">
                            File: {pendingLogo.file.name} ({(pendingLogo.file.size / 1024).toFixed(1)} KB)
                          </p>
                        </div>
                      ) : (
                        <div className="bg-slate-50/50 border border-dashed border-slate-200 p-4 rounded-xl flex flex-col items-center justify-center text-slate-400 text-xs text-center space-y-1">
                          <Image className="w-6 h-6 text-slate-300 mb-1" />
                          <span>Select a file to preview change</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2. Hero Background Banner Image Management */}
                  <div className="space-y-4 border-t border-slate-100 pt-6">
                    <div className="flex items-center justify-between">
                      <label className="block text-xs font-black text-slate-900 uppercase tracking-wider">
                        2. Hero Banner Background Image
                      </label>
                      <span className="text-[10px] font-semibold text-slate-400">PNG, JPG, WebP • Max 5MB</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <label className="cursor-pointer bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm">
                        {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-accent-gold" /> : <Upload className="w-4 h-4 text-accent-gold" />}
                        <span>Select Banner File</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleSelectBrandingImage(e, 'hero')} 
                          className="hidden" 
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Hero Background URL"
                        value={pendingHero ? pendingHero.previewUrl : (siteSettings.heroBgUrl || '')}
                        onChange={(e) => {
                          if (pendingHero) setPendingHero(null);
                          setSiteSettings({ ...siteSettings, heroBgUrl: e.target.value });
                        }}
                        className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    {/* Banner Preview Section (Current vs New Selected Preview) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                      {/* Current Banner Box */}
                      <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 relative">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-200 text-slate-700">
                            Current Active Banner
                          </span>
                        </div>
                        <div className="h-28 overflow-hidden bg-slate-200 border border-slate-200 rounded-lg">
                          {siteSettings.heroBgUrl ? (
                            <img 
                              src={siteSettings.heroBgUrl} 
                              alt="Current Banner" 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 italic">No custom banner set</div>
                          )}
                        </div>
                      </div>

                      {/* New Selected Banner Preview Box */}
                      {pendingHero ? (
                        <div className="bg-primary/5 border border-primary/30 p-4 rounded-xl space-y-2 relative animate-in fade-in duration-200">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-primary text-white flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-accent-gold" /> New Selected Preview
                            </span>
                            <button
                              type="button"
                              onClick={() => handleCancelBrandingImage('hero')}
                              className="text-xs font-bold text-red-600 hover:text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-2 py-1 rounded-lg flex items-center gap-1 transition-all"
                              title="Discard pending hero banner selection"
                            >
                              <Trash2 className="w-3.5 h-3.5" /> Discard
                            </button>
                          </div>
                          <div className="h-28 overflow-hidden bg-slate-200 border border-primary/30 rounded-lg">
                            <img 
                              src={pendingHero.previewUrl} 
                              alt="New Banner Preview" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <p className="text-[10px] text-slate-500 font-semibold truncate">
                            File: {pendingHero.file.name} ({(pendingHero.file.size / 1024).toFixed(1)} KB)
                          </p>
                        </div>
                      ) : (
                        <div className="bg-slate-50/50 border border-dashed border-slate-200 p-4 rounded-xl flex flex-col items-center justify-center text-slate-400 text-xs text-center space-y-1">
                          <Image className="w-6 h-6 text-slate-300 mb-1" />
                          <span>Select a file to preview change</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Save Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting || uploadingImage}
                    className="w-full bg-primary hover:bg-stitch-red-dark text-white font-extrabold text-xs py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 hover:scale-[1.01] disabled:opacity-50"
                  >
                    {isSubmitting || uploadingImage ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Processing & Saving Settings...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 text-white" />
                        <span>Save Site Branding Settings</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}

            {/* TAB: HOME PAGE CONTROLS */}
            {tab === 'home_control' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Home Page &amp; Section Controls</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Manage Hero headings, badge text, CTA buttons, Call CTA, and show/hide/reorder sections.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  {/* Hero Content Box */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-2">
                      1. Hero Banner Heading &amp; Subtitles
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Hero Heading (Marathi):</label>
                        <input
                          type="text"
                          value={siteSettings.heroTitleMr || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroTitleMr: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Hero Heading (English):</label>
                        <input
                          type="text"
                          value={siteSettings.heroTitleEn || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroTitleEn: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Hero Subtitle / Body (Marathi):</label>
                        <textarea
                          rows={2}
                          value={siteSettings.heroSubtitleMr || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroSubtitleMr: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Hero Subtitle / Body (English):</label>
                        <textarea
                          rows={2}
                          value={siteSettings.heroSubtitleEn || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroSubtitleEn: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag (Marathi):</label>
                        <input
                          type="text"
                          value={siteSettings.heroBadgeMr || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroBadgeMr: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Text (Marathi):</label>
                        <input
                          type="text"
                          value={siteSettings.heroCtaTextMr || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroCtaTextMr: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">CTA Button Destination View:</label>
                        <select
                          value={siteSettings.heroCtaDest || 'courses'}
                          onChange={(e) => setSiteSettings({ ...siteSettings, heroCtaDest: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-bold"
                        >
                          <option value="courses">Courses Page</option>
                          <option value="services">Services Page</option>
                          <option value="contact">Contact Page</option>
                          <option value="timetable">Timetable</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Section Visibility & Order Controls Box */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-2">
                      2. Section Visibility &amp; Display Ordering
                    </h3>
                    <p className="text-xs text-slate-500">Toggle sections active/inactive on public Home Page and adjust display order.</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {Object.entries(siteSettings.homeSections || {}).map(([secKey, secVal]) => (
                        <div key={secKey} className="p-3 bg-white border border-slate-200 rounded-xl space-y-2">
                          <div className="flex items-center justify-between">
                            <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-900">
                              <input
                                type="checkbox"
                                checked={secVal.visible !== false}
                                onChange={(e) => {
                                  const updated = { ...siteSettings.homeSections };
                                  updated[secKey] = { ...secVal, visible: e.target.checked };
                                  setSiteSettings({ ...siteSettings, homeSections: updated });
                                }}
                                className="w-4 h-4 rounded text-primary focus:ring-primary"
                              />
                              <span>{secVal.titleEn || secKey} ({secVal.titleMr || ''})</span>
                            </label>
                          </div>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500">
                            <span>Order:</span>
                            <input
                              type="number"
                              value={secVal.order || 0}
                              onChange={(e) => {
                                const updated = { ...siteSettings.homeSections };
                                updated[secKey] = { ...secVal, order: parseInt(e.target.value, 10) || 0 };
                                setSiteSettings({ ...siteSettings, homeSections: updated });
                              }}
                              className="w-16 p-1 bg-slate-50 border border-slate-300 rounded text-center text-xs font-bold"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-stitch-red-dark text-white font-extrabold text-xs py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>Save Home Page &amp; Section Controls</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB: ABOUT PAGE CONTROLS */}
            {tab === 'about_control' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">About Page Content Controls</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Manage About Us heading, overview description, institute image, mission &amp; vision statements.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">About Heading (Marathi):</label>
                      <input
                        type="text"
                        value={siteSettings.aboutHeadingMr || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, aboutHeadingMr: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">About Heading (English):</label>
                      <input
                        type="text"
                        value={siteSettings.aboutHeadingEn || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, aboutHeadingEn: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Institute Overview (Marathi):</label>
                      <textarea
                        rows={3}
                        value={siteSettings.aboutDescMr || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, aboutDescMr: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Institute Overview (English):</label>
                      <textarea
                        rows={3}
                        value={siteSettings.aboutDescEn || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, aboutDescEn: e.target.value })}
                        className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Institute Photo Image URL:</label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0">
                        {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Upload className="w-4 h-4 text-primary" />}
                        <span>Upload Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'about', (url) => setSiteSettings({ ...siteSettings, aboutImageUrl: url }))}
                          className="hidden"
                        />
                      </label>
                      <input
                        type="text"
                        value={siteSettings.aboutImageUrl || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, aboutImageUrl: e.target.value })}
                        className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <h4 className="font-extrabold text-xs text-primary">Mission Statement</h4>
                      <input
                        type="text"
                        placeholder="Marathi"
                        value={siteSettings.aboutMissionMr || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, aboutMissionMr: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                      <input
                        type="text"
                        placeholder="English"
                        value={siteSettings.aboutMissionEn || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, aboutMissionEn: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>

                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                      <h4 className="font-extrabold text-xs text-primary">Vision Statement</h4>
                      <input
                        type="text"
                        placeholder="Marathi"
                        value={siteSettings.aboutVisionMr || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, aboutVisionMr: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                      <input
                        type="text"
                        placeholder="English"
                        value={siteSettings.aboutVisionEn || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, aboutVisionEn: e.target.value })}
                        className="w-full p-2 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-stitch-red-dark text-white font-extrabold text-xs py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>Save About Page Content</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB: CONTACT & CALL CTA CONTROLS */}
            {tab === 'contact_control' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Contact &amp; Call CTA Settings</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Manage primary phone numbers, WhatsApp, email, office address, working hours, map URL, and Call Now CTA button.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  {/* Call CTA Box */}
                  <div className="p-5 bg-emerald-50/60 border border-emerald-200 rounded-2xl space-y-4">
                    <h3 className="text-sm font-extrabold text-emerald-900 border-b border-emerald-200 pb-2 flex items-center gap-2">
                      <Phone className="w-4 h-4 text-emerald-600" />
                      <span>Primary "Call Now" CTA Settings</span>
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Call CTA Phone Number:</label>
                        <input
                          type="text"
                          value={siteSettings.callCtaPhone || siteSettings.contactPhone || '+919552345061'}
                          onChange={(e) => setSiteSettings({ ...siteSettings, callCtaPhone: e.target.value })}
                          placeholder="+919552345061"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Call Button Label (Marathi):</label>
                        <input
                          type="text"
                          value={siteSettings.callCtaTextMr || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, callCtaTextMr: e.target.value })}
                          placeholder="📞 कॉल करा"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Call Button Label (English):</label>
                        <input
                          type="text"
                          value={siteSettings.callCtaTextEn || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, callCtaTextEn: e.target.value })}
                          placeholder="Call Now (+91 95523 45061)"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                        />
                      </div>
                    </div>
                  </div>

                  {/* General Contact Info Box */}
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-2">
                      General Contact &amp; Office Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Office Phone Number:</label>
                        <input
                          type="text"
                          value={siteSettings.contactPhone || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, contactPhone: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Number (Without +):</label>
                        <input
                          type="text"
                          value={siteSettings.contactWhatsapp || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, contactWhatsapp: e.target.value })}
                          placeholder="919552345061"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Email Address:</label>
                        <input
                          type="email"
                          value={siteSettings.contactEmail || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, contactEmail: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Physical Address (Marathi):</label>
                        <textarea
                          rows={2}
                          value={siteSettings.contactAddressMr || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, contactAddressMr: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Physical Address (English):</label>
                        <textarea
                          rows={2}
                          value={siteSettings.contactAddressEn || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, contactAddressEn: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Office Hours (Marathi):</label>
                        <input
                          type="text"
                          value={siteSettings.contactHoursMr || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, contactHoursMr: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Office Hours (English):</label>
                        <input
                          type="text"
                          value={siteSettings.contactHoursEn || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, contactHoursEn: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Google Maps Embed iframe URL:</label>
                      <input
                        type="url"
                        value={siteSettings.contactMapUrl || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, contactMapUrl: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono text-slate-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-stitch-red-dark text-white font-extrabold text-xs py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>Save Contact &amp; Call CTA Settings</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB: NAVIGATION CONTROLS */}
            {tab === 'nav_control' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Navigation Menu Controls</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Manage navigation item labels, visibility, and display ordering.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="space-y-3">
                    {(siteSettings.navSettings || []).map((navItem, idx) => (
                      <div key={navItem.id} className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-900">
                            <input
                              type="checkbox"
                              checked={navItem.visible !== false}
                              onChange={(e) => {
                                const list = [...(siteSettings.navSettings || [])];
                                list[idx] = { ...navItem, visible: e.target.checked };
                                setSiteSettings({ ...siteSettings, navSettings: list });
                              }}
                              className="w-4 h-4 rounded text-primary focus:ring-primary"
                            />
                            <span>Enabled ({navItem.id})</span>
                          </label>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 flex-1">
                          <input
                            type="text"
                            placeholder="English Label"
                            value={navItem.labelEn || ''}
                            onChange={(e) => {
                              const list = [...(siteSettings.navSettings || [])];
                              list[idx] = { ...navItem, labelEn: e.target.value };
                              setSiteSettings({ ...siteSettings, navSettings: list });
                            }}
                            className="p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                          />
                          <input
                            type="text"
                            placeholder="Marathi Label"
                            value={navItem.labelMr || ''}
                            onChange={(e) => {
                              const list = [...(siteSettings.navSettings || [])];
                              list[idx] = { ...navItem, labelMr: e.target.value };
                              setSiteSettings({ ...siteSettings, navSettings: list });
                            }}
                            className="p-2 bg-white border border-slate-300 rounded-lg text-xs font-medium"
                          />
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-slate-500">Order:</span>
                            <input
                              type="number"
                              value={navItem.order || idx + 1}
                              onChange={(e) => {
                                const list = [...(siteSettings.navSettings || [])];
                                list[idx] = { ...navItem, order: parseInt(e.target.value, 10) || 1 };
                                setSiteSettings({ ...siteSettings, navSettings: list });
                              }}
                              className="w-16 p-1.5 bg-white border border-slate-300 rounded-lg text-center font-bold"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-stitch-red-dark text-white font-extrabold text-xs py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>Save Navigation Menu Settings</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB: THEME / COLORS SETTINGS */}
            {tab === 'settings_theme' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Theme &amp; Visual Design Settings</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Manage website color palette, card styling, and typography appearance.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-2">
                      Primary Accent &amp; Color Scheme
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                        <span className="block text-xs font-bold text-slate-700">Primary Red (Stitch):</span>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#C62828] border border-slate-300 shadow-xs" />
                          <span className="font-mono text-xs font-bold text-slate-800">#C62828</span>
                        </div>
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                        <span className="block text-xs font-bold text-slate-700">Accent Emerald:</span>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#10B981] border border-slate-300 shadow-xs" />
                          <span className="font-mono text-xs font-bold text-slate-800">#10B981</span>
                        </div>
                      </div>
                      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-2">
                        <span className="block text-xs font-bold text-slate-700">Dark Navy Container:</span>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#0F172A] border border-slate-300 shadow-xs" />
                          <span className="font-mono text-xs font-bold text-slate-800">#0F172A</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-stitch-red-dark text-white font-extrabold text-xs py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>Save Theme Settings</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB: SITE INFORMATION */}
            {tab === 'settings_info' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Institute Information &amp; Accreditation</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Manage official center registration details, MKCL ALC codes, and center head information.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Institute Name (Marathi):</label>
                        <input
                          type="text"
                          value={siteSettings.siteTitleMr || 'समर्थ कॉम्प्युटर्स खंडाळा'}
                          onChange={(e) => setSiteSettings({ ...siteSettings, siteTitleMr: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Institute Name (English):</label>
                        <input
                          type="text"
                          value={siteSettings.siteTitleEn || 'Samarth Computers Khandala'}
                          onChange={(e) => setSiteSettings({ ...siteSettings, siteTitleEn: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">MKCL ALC Center Code:</label>
                        <input
                          type="text"
                          value={siteSettings.alcCode || '13210399 / 13210273'}
                          onChange={(e) => setSiteSettings({ ...siteSettings, alcCode: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">CSC Digital Seva Kendra ID:</label>
                        <input
                          type="text"
                          value={siteSettings.cscId || 'CSC-KHANDALA-412802'}
                          onChange={(e) => setSiteSettings({ ...siteSettings, cscId: e.target.value })}
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-stitch-red-dark text-white font-extrabold text-xs py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>Save Institute Information</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB: SEO & META TAGS */}
            {tab === 'settings_seo' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">SEO &amp; Meta Tags Configuration</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Optimize Google local search visibility, meta description, and keywords.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">SEO Title Tag:</label>
                      <input
                        type="text"
                        value={siteSettings.seoTitle || 'Samarth Computers Khandala | Best Computer Institute & CSC Center'}
                        onChange={(e) => setSiteSettings({ ...siteSettings, seoTitle: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Meta Description:</label>
                      <textarea
                        rows={3}
                        value={siteSettings.seoDescription || 'Samarth Computers Khandala offers MKCL MS-CIT, Tally Prime GST, Advanced Excel, DTP, and online CSC Aadhaar & Pan Card government services.'}
                        onChange={(e) => setSiteSettings({ ...siteSettings, seoDescription: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Meta Keywords (Comma separated):</label>
                      <input
                        type="text"
                        value={siteSettings.seoKeywords || 'MS-CIT Khandala, Tally Prime, Computer Class Khandala, CSC Center Khandala, Samarth Computers'}
                        onChange={(e) => setSiteSettings({ ...siteSettings, seoKeywords: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-stitch-red-dark text-white font-extrabold text-xs py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>Save SEO Configuration</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB: SOCIAL LINKS */}
            {tab === 'settings_social' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Social Media Handles &amp; Links</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Connect official social media pages and WhatsApp direct link.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Facebook Page URL:</label>
                        <input
                          type="url"
                          value={siteSettings.socialFacebook || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, socialFacebook: e.target.value })}
                          placeholder="https://facebook.com/samarthcomputers"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">Instagram Profile URL:</label>
                        <input
                          type="url"
                          value={siteSettings.socialInstagram || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, socialInstagram: e.target.value })}
                          placeholder="https://instagram.com/samarthcomputers"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">YouTube Channel URL:</label>
                        <input
                          type="url"
                          value={siteSettings.socialYoutube || ''}
                          onChange={(e) => setSiteSettings({ ...siteSettings, socialYoutube: e.target.value })}
                          placeholder="https://youtube.com/@samarthcomputers"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp Direct Chat Number:</label>
                        <input
                          type="text"
                          value={siteSettings.contactWhatsapp || '919552345061'}
                          onChange={(e) => setSiteSettings({ ...siteSettings, contactWhatsapp: e.target.value })}
                          placeholder="919552345061"
                          className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-mono font-bold"
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-stitch-red-dark text-white font-extrabold text-xs py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>Save Social Links</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB: FOOTER SETTINGS */}
            {tab === 'settings_footer' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Footer &amp; Copyright Settings</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Manage footer tagline, copyright statement, and accreditation notice.
                  </p>
                </div>

                <form onSubmit={handleSaveSettings} className="space-y-6">
                  <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Footer Tagline / Bio:</label>
                      <textarea
                        rows={2}
                        value={siteSettings.footerTagline || 'Empowering the next generation of digital leaders through quality computer education and government services.'}
                        onChange={(e) => setSiteSettings({ ...siteSettings, footerTagline: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Copyright Text Notice:</label>
                      <input
                        type="text"
                        value={siteSettings.copyrightText || '© 2026 Samarth Computers Khandala. All rights reserved.'}
                        onChange={(e) => setSiteSettings({ ...siteSettings, copyrightText: e.target.value })}
                        className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-medium"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-stitch-red-dark text-white font-extrabold text-xs py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>Save Footer Settings</span>
                  </button>
                </form>
              </div>
            )}

            {/* TAB: OTHER SETTINGS / GENERAL & SYNC */}
            {tab === 'settings_general' && (
              <div className="bg-white border border-slate-200 rounded-2xl p-6 md:p-8 shadow-sm space-y-6">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Database &amp; General System Control</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">
                    Manage local cache synchronization with remote Supabase PostgreSQL database.
                  </p>
                </div>

                <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl space-y-4">
                  <h3 className="text-sm font-extrabold text-slate-900 border-b border-slate-200 pb-2 flex items-center gap-2">
                    <Database className="w-4 h-4 text-primary" />
                    <span>Supabase Database Synchronization</span>
                  </h3>
                  <p className="text-xs text-slate-600">
                    Push all local cached courses, services, faculty, timetable batches, and site settings directly into your remote Supabase PostgreSQL tables.
                  </p>

                  <button
                    type="button"
                    onClick={handleSyncToSupabase}
                    disabled={loading}
                    className="px-6 py-3 bg-primary hover:bg-stitch-red-dark text-white text-xs font-extrabold rounded-xl shadow-sm transition-all flex items-center gap-2"
                  >
                    <DatabaseBackup className="w-4 h-4" />
                    <span>{loading ? 'Syncing to Supabase...' : 'Trigger Full Supabase Sync Now'}</span>
                  </button>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Course Details Side Drawer (Slide-Over Panel) */}
      {drawerCourse && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-6 shadow-2xl overflow-y-auto space-y-6 animate-in slide-in-from-right duration-300">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="text-xs font-extrabold text-primary uppercase tracking-wider">
                {drawerCourse.category || 'Course Details'}
              </span>
              <button onClick={() => setDrawerCourse(null)} className="p-1 rounded-full text-slate-400 hover:bg-slate-100">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {(drawerCourse.image_url || drawerCourse.imageUrl) && (
                <div className="h-44 w-full rounded-xl overflow-hidden bg-slate-100">
                  <img src={drawerCourse.image_url || drawerCourse.imageUrl} alt={drawerCourse.title} className="w-full h-full object-cover" />
                </div>
              )}

              <h2 className="text-xl font-black text-slate-900">{drawerCourse.title}</h2>
              <p className="text-xs text-slate-600">{drawerCourse.overviewEn || drawerCourse.subtitleEn}</p>

              <div className="p-4 bg-slate-50 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Duration:</span>
                  <span className="font-bold text-slate-900">{drawerCourse.durationEn || drawerCourse.duration_en || '2 Months'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Category:</span>
                  <span className="font-bold text-slate-900 uppercase">{drawerCourse.category || 'govt'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Primary / Home:</span>
                  <span className="font-bold text-slate-900">{(drawerCourse.is_primary || drawerCourse.isPrimary) ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Certification:</span>
                  <span className="font-bold text-slate-900">{drawerCourse.certificationEn || 'MKCL Certified'}</span>
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  onClick={() => { setEditingItem(drawerCourse); setFormType('course'); setDrawerCourse(null); }}
                  className="flex-1 py-2.5 bg-primary text-white font-extrabold text-xs rounded-xl text-center shadow-sm"
                >
                  Edit Course
                </button>
                <button
                  onClick={() => setDrawerCourse(null)}
                  className="py-2.5 px-4 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Dynamic Modal Overlay System */}
      {editingItem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-base text-slate-900 capitalize">
                {editingItem.id ? `Edit ${formType}` : `Add New ${formType}`}
              </h3>
              <button
                onClick={() => { setEditingItem(null); setFormType(null); }}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Course Form */}
            {formType === 'course' && (
              <form onSubmit={handleSaveCourse} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course Title:</label>
                  <input
                    type="text"
                    value={editingItem.title || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                    required
                    placeholder="e.g. MS-CIT (MKCL Certified)"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Course Category:</label>
                    <select
                      value={editingItem.category || 'govt'}
                      onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-bold"
                    >
                      <option value="govt">🏛️ Government (MS-CIT)</option>
                      <option value="job">💼 Job Oriented (Tally / Excel)</option>
                      <option value="klic">🎓 MKCL KLiC Courses</option>
                      <option value="design">🎨 Design & CAD</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Display Order:</label>
                    <input
                      type="number"
                      value={editingItem.displayOrder !== undefined ? editingItem.displayOrder : (editingItem.display_order || 0)}
                      onChange={(e) => setEditingItem({ ...editingItem, displayOrder: parseInt(e.target.value, 10) || 0, display_order: parseInt(e.target.value, 10) || 0 })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={!!(editingItem.isPrimary || editingItem.is_primary)}
                      onChange={(e) => setEditingItem({ ...editingItem, isPrimary: e.target.checked, is_primary: e.target.checked })}
                      className="w-4 h-4 rounded text-primary focus:ring-primary"
                    />
                    <span>Show on Home Page (Primary Course)</span>
                  </label>

                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                    <input
                      type="checkbox"
                      checked={!!(editingItem.isFeatured || editingItem.is_featured)}
                      onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked, is_featured: e.target.checked })}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500"
                    />
                    <span>Featured Status Badge</span>
                  </label>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration:</label>
                  <input
                    type="text"
                    value={editingItem.durationEn || editingItem.duration_en || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, durationEn: e.target.value, durationMr: e.target.value })}
                    placeholder="e.g. 2 Months (2 hrs/day)"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Short Description / Overview:</label>
                  <textarea
                    rows={2}
                    value={editingItem.overviewEn || editingItem.overview_en || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, overviewEn: e.target.value, overviewMr: e.target.value })}
                    placeholder="Course summary description..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Key Topics (One per line):</label>
                  <textarea
                    rows={3}
                    value={
                      Array.isArray(editingItem.modulesEn)
                        ? editingItem.modulesEn.map((m) => typeof m === 'string' ? m : (m.name || m.title || '')).join('\n')
                        : (editingItem.modulesEn || '')
                    }
                    onChange={(e) => {
                      const lines = e.target.value.split('\n');
                      const modulesList = lines.map((line) => ({ name: line }));
                      setEditingItem({ ...editingItem, modulesEn: modulesList, modulesMr: modulesList });
                    }}
                    placeholder="Computer Operating & Windows 11&#10;MS Word & Excel 2021&#10;AI & Digital Tools"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <label className="block text-xs font-bold text-slate-700">Course Banner Photo:</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Upload className="w-4 h-4 text-primary" />}
                      <span>{uploadingImage ? 'Uploading...' : 'Choose File'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileUpload(e, 'courses')} 
                        className="hidden" 
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={editingItem.imageUrl || editingItem.image_url || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value, image_url: e.target.value })}
                      className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-xl text-[11px] font-mono text-slate-700"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-stitch-red-dark text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
                  Save &amp; Sync Supabase DB
                </button>
              </form>
            )}

            {/* CSC & Online Services Form */}
            {formType === 'csc' && (
              <form onSubmit={handleSaveCSC} className="space-y-3 max-h-[75vh] overflow-y-auto pr-1">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Category:</label>
                  <select
                    value={editingItem.category || 'csc'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-bold"
                  >
                    <option value="scholarship">🎓 Scholarship Forms (शिष्यवृत्ती अर्ज)</option>
                    <option value="exam">📋 Competitive & Govt Exam Forms (स्पर्धा परीक्षा)</option>
                    <option value="csc">🏛️ CSC & Identity Services (पॅन कार्ड, आधार, गुमास्ता)</option>
                    <option value="admission">🏫 College & CAP Admissions (प्रवेश अर्ज)</option>
                    <option value="utility">⚙️ Student Utilities (रेझ्युमे, रीझाईज, प्रिंट)</option>
                    <option value="revenue">📜 Govt Revenue Certificates (उत्पन्न, जातीचा दाखला)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Title (English):</label>
                    <input
                      type="text"
                      value={editingItem.titleEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, titleEn: e.target.value })}
                      placeholder="e.g. MahaDBT Post-Matric Scholarship"
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Title (Marathi):</label>
                    <input
                      type="text"
                      value={editingItem.titleMr || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, titleMr: e.target.value })}
                      placeholder="उदा. महाडीबीटी स्कॉलरशिप अर्ज"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag:</label>
                    <input
                      type="text"
                      value={editingItem.badge || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                      placeholder="e.g. महाराष्ट्र शासन / MPSC"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Status:</label>
                    <select
                      value={editingItem.status || 'Open'}
                      onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-bold"
                    >
                      <option value="Open">🟢 Open / Accepting</option>
                      <option value="Closed">🔴 Closed / Expired</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Deadline Date / Note (English):</label>
                    <input
                      type="text"
                      value={editingItem.deadlineEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, deadlineEn: e.target.value, deadlineMr: e.target.value })}
                      placeholder="e.g. 31st October 2026"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Timeline / Processing Time:</label>
                    <input
                      type="text"
                      value={editingItem.timelineEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, timelineEn: e.target.value, timelineMr: e.target.value })}
                      placeholder="e.g. 3-5 Working Days"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Official Portal URL (Apply Link):</label>
                  <input
                    type="url"
                    value={editingItem.officialUrl || editingItem.official_url || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, officialUrl: e.target.value, official_url: e.target.value })}
                    placeholder="https://mahadbt.maharashtra.gov.in"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-mono"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Portal / Govt Fee (English):</label>
                    <input
                      type="text"
                      value={editingItem.govtFeeEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, govtFeeEn: e.target.value, govtFeeMr: e.target.value })}
                      placeholder="e.g. ₹56 Portal Fee"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div className="flex items-end pb-2">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                      <input
                        type="checkbox"
                        checked={!!editingItem.isFeatured}
                        onChange={(e) => setEditingItem({ ...editingItem, isFeatured: e.target.checked })}
                        className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                      />
                      <span>Featured Service / Priority Form</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Overview Description:</label>
                  <textarea
                    rows={2}
                    value={editingItem.overviewEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, overviewEn: e.target.value, overviewMr: e.target.value })}
                    placeholder="Provide detailed description of the form/service..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Required Documents (One per line):</label>
                  <textarea
                    rows={3}
                    value={Array.isArray(editingItem.requiredDocsEn) ? editingItem.requiredDocsEn.join('\n') : (editingItem.requiredDocsEn || '')}
                    onChange={(e) => {
                      const list = e.target.value.split('\n');
                      setEditingItem({ ...editingItem, requiredDocsEn: list, requiredDocsMr: list });
                    }}
                    placeholder="Aadhaar Card&#10;Marksheet&#10;Income Certificate"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-sm transition-all mt-2">
                  Save &amp; Sync Supabase DB
                </button>
              </form>
            )}

            {/* Govt Form */}
            {formType === 'govt' && (
              <form onSubmit={handleSaveGovt} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Government Service Title:</label>
                  <input
                    type="text"
                    value={editingItem.titleEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, titleEn: e.target.value, titleMr: e.target.value })}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Overview Description:</label>
                  <textarea
                    rows={3}
                    value={editingItem.overviewEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, overviewEn: e.target.value, overviewMr: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-stitch-red-dark text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
                  Save &amp; Sync Supabase DB
                </button>
              </form>
            )}

            {/* Batch Timetable Form */}
            {formType === 'batch' && (
              <form onSubmit={handleSaveBatch} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Batch Time Slot:</label>
                  <input
                    type="text"
                    value={editingItem.time || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, time: e.target.value })}
                    placeholder="e.g. 08:00 AM - 09:30 AM"
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Course Title (English):</label>
                  <input
                    type="text"
                    value={editingItem.courseEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, courseEn: e.target.value, courseMr: e.target.value })}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Status:</label>
                    <input
                      type="text"
                      value={editingItem.statusEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, statusEn: e.target.value, statusMr: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Seats Left:</label>
                    <input
                      type="text"
                      value={editingItem.seatsEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, seatsEn: e.target.value, seatsMr: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-stitch-red-dark text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
                  Save Batch Schedule Slot
                </button>
              </form>
            )}

            {/* News Form */}
            {formType === 'news' && (
              <form onSubmit={handleSaveNews} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Announcement Title (English &amp; Marathi):</label>
                  <input
                    type="text"
                    value={editingItem.titleEn || editingItem.title_en || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      titleEn: e.target.value,
                      titleMr: e.target.value,
                      title_en: e.target.value,
                      title_mr: e.target.value
                    })}
                    placeholder="e.g. MS-CIT New Batch Admissions Open 2026"
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category / Tag:</label>
                    <select
                      value={editingItem.categoryEn || editingItem.category_en || 'Admissions'}
                      onChange={(e) => {
                        const val = e.target.value;
                        const mrVal = val === 'Admissions' ? 'प्रवेश अपडेट' : val === 'Exams' ? 'परीक्षा अपडेट' : val === 'Scholarship' ? 'शिष्यवृत्ती' : 'सूचना';
                        setEditingItem({
                          ...editingItem,
                          categoryEn: val,
                          category_en: val,
                          categoryMr: mrVal,
                          category_mr: mrVal
                        });
                      }}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    >
                      <option value="Admissions">Admissions (प्रवेश अपडेट)</option>
                      <option value="Exams">Exams &amp; Results (परीक्षा अपडेट)</option>
                      <option value="Scholarship">Scholarship (शिष्यवृत्ती)</option>
                      <option value="Notice">Notice / Announcement (सूचना)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Announcement Date:</label>
                    <input
                      type="text"
                      value={editingItem.dateStr || editingItem.date_str || ''}
                      onChange={(e) => setEditingItem({
                        ...editingItem,
                        dateStr: e.target.value,
                        date_str: e.target.value
                      })}
                      placeholder="e.g. 10 Aug 2026 or August 2026"
                      required
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description / Details:</label>
                  <textarea
                    rows={3}
                    value={editingItem.descEn || editingItem.desc_en || ''}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      descEn: e.target.value,
                      descMr: e.target.value,
                      desc_en: e.target.value,
                      desc_mr: e.target.value
                    })}
                    placeholder="Enter announcement details..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-stitch-red-dark text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
                  Save Announcement &amp; Sync Supabase DB
                </button>
              </form>
            )}

            {/* Faculty Form */}
            {formType === 'faculty' && (
              <form onSubmit={handleSaveFaculty} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Faculty Name:</label>
                  <input
                    type="text"
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Designation / Role (English):</label>
                  <input
                    type="text"
                    value={editingItem.roleEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, roleEn: e.target.value, roleMr: e.target.value })}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Experience:</label>
                  <input
                    type="text"
                    value={editingItem.expEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, expEn: e.target.value, expMr: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <label className="block text-xs font-bold text-slate-700">Profile Headshot Photo:</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Upload className="w-4 h-4 text-primary" />}
                      <span>{uploadingImage ? 'Uploading...' : 'Choose File'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileUpload(e, 'faculty')} 
                        className="hidden" 
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={editingItem.imageUrl || editingItem.image_url || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value, image_url: e.target.value })}
                      className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-xl text-[11px] font-mono text-slate-700"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-stitch-red-dark text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
                  Save Faculty Profile
                </button>
              </form>
            )}

            {/* Gallery Form */}
            {formType === 'gallery' && (
              <form onSubmit={handleSaveGalleryItem} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Photo Title (English):</label>
                  <input
                    type="text"
                    value={editingItem.titleEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, titleEn: e.target.value, titleMr: e.target.value })}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category:</label>
                  <select
                    value={editingItem.category || 'Campus'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  >
                    <option value="Campus">Campus Infrastructure</option>
                    <option value="Events">Certificate Events</option>
                    <option value="Classroom">Practical Classroom</option>
                    <option value="Facilities">Facilities &amp; Counters</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description:</label>
                  <input
                    type="text"
                    value={editingItem.descEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, descEn: e.target.value, descMr: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <label className="block text-xs font-bold text-slate-700">Photo File:</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Upload className="w-4 h-4 text-primary" />}
                      <span>{uploadingImage ? 'Uploading...' : 'Choose File'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileUpload(e, 'gallery')} 
                        className="hidden" 
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={editingItem.imageUrl || editingItem.image_url || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value, image_url: e.target.value })}
                      className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-xl text-[11px] font-mono text-slate-700"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-stitch-red-dark text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
                  Save Gallery Photo
                </button>
              </form>
            )}

            {/* Inquiry Lead Form */}
            {formType === 'inquiry' && (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setIsSubmitting(true);
                const res = await AdminRepository.saveInquiry(editingItem);
                setIsSubmitting(false);
                if (res.success) {
                  setActionNotice({ type: 'success', text: 'New lead inquiry created in Supabase!' });
                  setEditingItem(null);
                  setFormType(null);
                  loadAllData();
                } else {
                  setActionNotice({ type: 'error', text: `Failed to create lead: ${res.error}` });
                }
              }} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Student Full Name:</label>
                  <input
                    type="text"
                    value={editingItem.name || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Mobile Number:</label>
                  <input
                    type="tel"
                    value={editingItem.mobile || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, mobile: e.target.value })}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Requested Course/Service:</label>
                    <input
                      type="text"
                      value={editingItem.course_id || editingItem.service_id || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, course_id: e.target.value, service_id: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Status:</label>
                    <select
                      value={editingItem.status || 'New Lead'}
                      onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    >
                      <option value="New Lead">New Lead</option>
                      <option value="In Process">In Process</option>
                      <option value="Completed">Completed</option>
                    </select>
                  </div>
                </div>
                <button type="submit" className="w-full bg-primary hover:bg-stitch-red-dark text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
                  Save Lead &amp; Sync Supabase DB
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
