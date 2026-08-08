import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Plus, Trash2, Edit3, Save, X, LogOut, CheckCircle2, 
  BookOpen, FileText, Users, RefreshCw, Sparkles, Filter, Building2,
  Camera, Upload, Image, Loader2, GraduationCap, KeyRound, Database, DatabaseBackup,
  Clock, Megaphone, Crop, Search, Bell, Menu, ChevronRight, Phone, MessageSquare
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminRepository } from '../../repositories/AdminRepository';
import { sharedStore } from '../../repositories/sharedStore';
import { StorageService } from '../../services/StorageService';
import ImageCropperModal from '../../components/admin/ImageCropperModal';

/**
 * AdminDashboard Component - Google Stitch Indigo Admin Architecture
 * Professional, high-density master admin control panel for Samarth Computers, Khandala.
 * Synchronized with Supabase DB & Storage with reactive fallback store.
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

  const [tab, setTab] = useState('inquiries'); 
  // Tabs: 'inquiries' | 'courses' | 'csc' | 'govt' | 'timetable' | 'news' | 'faculty' | 'gallery' | 'settings'

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

  // Active Edit Form state
  const [editingItem, setEditingItem] = useState(null);
  const [formType, setFormType] = useState(null); 
  // Types: 'inquiry' | 'course' | 'csc' | 'govt' | 'gallery' | 'faculty' | 'batch' | 'news'
  const [uploadingImage, setUploadingImage] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionNotice, setActionNotice] = useState(null); // { type: 'success' | 'error', text: '' }

  const [siteSettings, setSiteSettings] = useState(sharedStore.getSiteSettings());

  useEffect(() => {
    loadAllData();
    const unsubscribe = sharedStore.subscribe(() => {
      loadAllData();
      setSiteSettings(sharedStore.getSiteSettings());
    });
    return unsubscribe;
  }, []);

  const handleSaveSettings = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const res = await AdminRepository.saveSiteSettings(siteSettings);
    setIsSubmitting(false);
    if (res.success) {
      setActionNotice({ type: 'success', text: 'Site Logo & Hero Background Image settings saved successfully to Supabase DB!' });
    } else {
      setActionNotice({ type: 'error', text: `Failed to save settings: ${res.error}` });
    }
  };

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

  // Image Crop & Upload State
  const [cropState, setCropState] = useState(null);

  const handleFileSelect = (e, folder = 'general', aspectRatio = 1, customCallback = null) => {
    const file = e.target.files[0];
    if (!file) return;
    setCropState({
      file,
      folder,
      aspectRatio,
      onComplete: customCallback
    });
    e.target.value = '';
  };

  const handleCroppedUpload = async (croppedFile) => {
    if (!cropState) return;
    const { folder, onComplete } = cropState;
    setCropState(null);
    setUploadingImage(true);

    const publicUrl = await StorageService.uploadImage(croppedFile, folder);
    setUploadingImage(false);

    if (publicUrl) {
      if (onComplete) {
        onComplete(publicUrl);
      } else {
        setEditingItem((prev) => ({
          ...prev,
          imageUrl: publicUrl,
          image_url: publicUrl
        }));
      }
    } else {
      alert('Failed to upload image to Supabase Storage bucket.');
    }
  };

  // --- Handlers ---
  const handleInquiryStatus = async (id, status) => {
    setIsSubmitting(true);
    const res = await AdminRepository.updateInquiryStatus(id, status);
    setIsSubmitting(false);
    if (res.success) {
      setActionNotice({ type: 'success', text: 'Lead status updated in Supabase!' });
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
        setActionNotice({ type: 'success', text: 'Lead inquiry deleted from Supabase DB!' });
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
      setActionNotice({ type: 'success', text: `Course "${editingItem.title}" saved successfully to Supabase DB!` });
      setEditingItem(null);
      setFormType(null);
      loadAllData();
    } else {
      setActionNotice({ type: 'error', text: `Failed to save course to Supabase DB: ${res.error}` });
    }
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setIsSubmitting(true);
      const res = await AdminRepository.deleteCourse(id);
      setIsSubmitting(false);
      if (res.success) {
        setActionNotice({ type: 'success', text: 'Course deleted successfully from Supabase DB!' });
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
      setActionNotice({ type: 'success', text: 'CSC Service saved successfully to Supabase DB!' });
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
        setActionNotice({ type: 'success', text: 'CSC Service deleted from Supabase DB!' });
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
      setActionNotice({ type: 'success', text: 'Government service saved successfully to Supabase DB!' });
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
        setActionNotice({ type: 'success', text: 'Government service deleted from Supabase DB!' });
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
      setActionNotice({ type: 'success', text: 'Gallery photo saved successfully to Supabase DB!' });
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
        setActionNotice({ type: 'success', text: 'Gallery photo deleted from Supabase DB!' });
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
      setActionNotice({ type: 'success', text: 'Faculty member saved successfully to Supabase DB!' });
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
        setActionNotice({ type: 'success', text: 'Faculty member deleted from Supabase DB!' });
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
      setActionNotice({ type: 'success', text: 'Batch slot saved successfully to Supabase DB!' });
      setEditingItem(null);
      setFormType(null);
      loadAllData();
    } else {
      setActionNotice({ type: 'error', text: `Failed to save batch slot: ${res.error}` });
    }
  };

  const handleDeleteBatch = async (id) => {
    if (window.confirm('Are you sure you want to delete this batch timetable slot?')) {
      setIsSubmitting(true);
      const res = await AdminRepository.deleteBatchItem(id);
      setIsSubmitting(false);
      if (res.success) {
        setActionNotice({ type: 'success', text: 'Batch slot deleted from Supabase DB!' });
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
      setActionNotice({ type: 'success', text: 'News announcement saved successfully to Supabase DB!' });
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
        setActionNotice({ type: 'success', text: 'News item deleted from Supabase DB!' });
        loadAllData();
      } else {
        setActionNotice({ type: 'error', text: `Failed to delete news item: ${res.error}` });
      }
    }
  };

  const handleSyncToSupabase = async () => {
    if (window.confirm('Do you want to sync all local data to Supabase PostgreSQL database now?')) {
      setLoading(true);
      const res = await AdminRepository.syncAllLocalDataToSupabase();
      setLoading(false);
      alert(`Supabase Sync Completed! Successfully synced ${res.count || 0} records.`);
      loadAllData();
    }
  };

  // Filtered Leads
  const filteredInquiries = inquiries.filter((inq) => {
    const matchesFilter = leadFilter === 'All' || (inq.status || 'New Lead') === leadFilter;
    const matchesSearch = !searchQuery || 
      (inq.name && inq.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.mobile && inq.mobile.includes(searchQuery)) ||
      (inq.course_id && inq.course_id.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (inq.service_id && inq.service_id.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  const sidebarNavItems = [
    { id: 'inquiries', label: 'Inbox Leads', icon: Users, badge: inquiries.length },
    { id: 'courses', label: 'Courses', icon: BookOpen, badge: courses.length },
    { id: 'csc', label: 'CSC Services', icon: FileText, badge: cscServices.length },
    { id: 'govt', label: 'Govt Services', icon: Building2, badge: govtServices.length },
    { id: 'timetable', label: 'Batch Timetable', icon: Clock, badge: batchesList.length },
    { id: 'news', label: 'News & Updates', icon: Megaphone, badge: newsList.length },
    { id: 'faculty', label: 'Faculty', icon: GraduationCap, badge: facultyList.length },
    { id: 'gallery', label: 'Campus Photos', icon: Camera, badge: siteGallery.length },
    { id: 'settings', label: 'Settings', icon: Image }
  ];

  return (
    <div className="bg-[#F8FAFC] text-slate-800 font-sans h-screen overflow-hidden flex flex-col antialiased">
      
      {/* Top Navigation Bar */}
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 md:px-8 h-16 bg-white border-b border-slate-200 shadow-sm shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-indigo-600 hover:bg-slate-100 rounded-full transition-colors active:scale-95"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg shadow-sm">
              S
            </div>
            <div>
              <div className="font-extrabold text-base text-slate-900 tracking-tight leading-none">
                Samarth Computers
              </div>
              <div className="text-[11px] text-indigo-600 font-bold flex items-center gap-1.5 mt-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Operational Control Center</span>
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
              className="w-full bg-slate-50 border border-slate-200 rounded-full py-2 pl-10 pr-4 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:bg-white transition-all placeholder:text-slate-400 shadow-sm"
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
            <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin text-indigo-600' : ''}`} />
          </button>

          <button 
            onClick={handleSyncToSupabase}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-indigo-50 border border-indigo-200 text-indigo-700 hover:bg-indigo-100 rounded-xl text-xs font-bold transition-all shadow-sm"
            title="Sync all local data with Supabase Database"
          >
            <DatabaseBackup className="w-3.5 h-3.5 text-indigo-600" />
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
        
        {/* Left Sidebar Navigation (Desktop) */}
        <nav className={`fixed md:flex left-0 top-16 h-[calc(100vh-64px)] w-[280px] flex-col py-6 bg-white border-r border-slate-200 shadow-sm z-40 shrink-0 overflow-y-auto transition-transform ${mobileMenuOpen ? 'flex transform-none' : 'hidden md:flex'}`}>
          <div className="px-6 mb-6">
            <h2 className="text-[11px] font-extrabold text-slate-400 tracking-wider uppercase mb-1">Navigation</h2>
            <div className="text-base font-black text-indigo-600">
              Admin Control Modules
            </div>
          </div>

          <div className="flex-1 flex flex-col gap-1 px-3 space-y-0.5">
            {sidebarNavItems.map((item) => {
              const Icon = item.icon;
              const isActive = tab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setTab(item.id);
                    setEditingItem(null);
                    setFormType(null);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                    isActive 
                      ? 'bg-indigo-50 text-indigo-600 border-r-4 border-indigo-600 font-extrabold shadow-sm' 
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                      isActive ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Footer Info */}
          <div className="px-6 pt-4 mt-auto border-t border-slate-100 text-[11px] text-slate-400 font-semibold space-y-1">
            <div className="flex items-center gap-1 text-slate-600 font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>ALC: 13210399 / 13210273</span>
            </div>
            <div>Khandala Main Branch</div>
          </div>
        </nav>

        {/* Main Content View Area */}
        <main className="flex-1 md:ml-[280px] h-full overflow-y-auto w-full p-4 md:p-8">
          <div className="max-w-7xl mx-auto space-y-6 pb-16">
            
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

            {/* MODULE 1: INBOX LEADS */}
            {tab === 'inquiries' && (
              <div className="space-y-6">
                {/* Module Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Inbox Leads</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1 flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
                      <span>Auto-synced with Supabase inquiries table ({inquiries.length} Total Leads)</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingItem({
                          name: '',
                          mobile: '',
                          type: 'course',
                          course_id: 'MS-CIT',
                          batch_timing: 'Morning 09:30 AM',
                          status: 'New Lead'
                        });
                        setFormType('inquiry');
                      }}
                      className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Lead</span>
                    </button>
                  </div>
                </div>

                {/* Filters & Search Toolbar */}
                <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
                  <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                    {['All', 'New Lead', 'In Process', 'Completed'].map((f) => (
                      <button
                        key={f}
                        onClick={() => setLeadFilter(f)}
                        className={`px-4 py-1.5 rounded-full text-xs font-extrabold transition-all ${
                          leadFilter === f
                            ? 'bg-indigo-600 text-white shadow-sm'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200 border border-slate-200'
                        }`}
                      >
                        {f}
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
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-1.5 pl-9 pr-3 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    />
                  </div>
                </div>

                {/* High Density Data Table */}
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
                              No lead inquiries found in inbox.
                            </td>
                          </tr>
                        ) : (
                          filteredInquiries.map((inq) => (
                            <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                              <td className="p-4 font-bold text-slate-900">{inq.name}</td>
                              <td className="p-4 font-mono font-bold text-indigo-600">{inq.mobile}</td>
                              <td className="p-4 font-semibold text-slate-700">
                                {inq.course_id || inq.service_id || inq.issue_type || inq.type || 'Course Admission'}
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
                                  className="inline-flex items-center gap-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-1.2 rounded-lg text-[11px] font-bold transition-all"
                                  title="Connect on WhatsApp"
                                >
                                  <MessageSquare className="w-3.5 h-3.5" />
                                  <span>WhatsApp</span>
                                </a>

                                <button
                                  onClick={() => handleInquiryStatus(inq.id, 'Completed')}
                                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-2.5 py-1.2 rounded-lg text-[11px] font-bold shadow-sm transition-all"
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

            {/* MODULE 2: COURSES */}
            {tab === 'courses' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Computer Courses Management</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Manage MS-CIT, Tally Prime, KLiC, DTP and C++ courses</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        slug: `course-${Date.now()}`,
                        title: '',
                        feeEn: '₹4,500',
                        durationEn: '2 Months',
                        category: 'govt',
                        overviewEn: '',
                        imageUrl: ''
                      });
                      setFormType('course');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add New Course</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {courses.map((c) => (
                    <div key={c.id || c.slug} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
                      {(c.image_url || c.imageUrl) && (
                        <div className="h-40 w-full overflow-hidden bg-slate-100 relative">
                          <img src={c.image_url || c.imageUrl} alt={c.title} className="w-full h-full object-cover" />
                          <span className="absolute top-2 left-2 bg-slate-900/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                            {c.category || 'Course'}
                          </span>
                        </div>
                      )}
                      <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">{c.duration_en || c.durationEn}</span>
                          <span className="font-black text-sm text-indigo-600">{c.fee_en || c.feeEn}</span>
                        </div>

                        <h3 className="font-extrabold text-base text-slate-900">{c.title}</h3>
                        <p className="text-xs text-slate-600 line-clamp-2">{c.overviewEn || c.overviewMr || c.overview_en}</p>
                      </div>

                      <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-end gap-2 mt-2">
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
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* MODULE 3: CSC SERVICES */}
            {tab === 'csc' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">CSC & MahaOnline Services</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Aadhaar, PAN Card, Income, Caste & Domicile certificate desk</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        slug: `csc-${Date.now()}`,
                        titleEn: '',
                        timelineEn: '3-5 Days',
                        category: 'identity',
                        overviewEn: '',
                        imageUrl: ''
                      });
                      setFormType('csc');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
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
                          <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase">
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

            {/* MODULE 4: GOVT SERVICES */}
            {tab === 'govt' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Government Scheme Portal Services</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Aaple Sarkar portal & revenue services catalog</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        slug: `govt-${Date.now()}`,
                        titleEn: '',
                        timelineEn: '7-15 Days',
                        category: 'revenue',
                        overviewEn: '',
                        imageUrl: ''
                      });
                      setFormType('govt');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
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

            {/* MODULE 5: BATCH TIMETABLE */}
            {tab === 'timetable' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Batch Timetable & Schedule</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Live computer classroom batch timings & seat availability</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        id: `b-${Date.now()}`,
                        category: 'morning',
                        time: '08:00 AM - 09:30 AM',
                        courseEn: 'MS-CIT & Computer Basics',
                        courseMr: 'MS-CIT व संगणक पायाभूत',
                        statusEn: 'Admission Open',
                        statusMr: 'प्रवेश सुरू',
                        seatsEn: '5 Seats Left',
                        seatsMr: '५ जागा शिल्लक'
                      });
                      setFormType('batch');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
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
                            <td className="p-4 font-mono font-bold text-indigo-600 flex items-center gap-2">
                              <Clock className="w-3.5 h-3.5 text-indigo-500" />
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

            {/* MODULE 6: NEWS & ANNOUNCEMENTS */}
            {tab === 'news' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">News & Announcements</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Manage marquee announcements and scholarship news</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        id: `n-${Date.now()}`,
                        titleEn: '',
                        titleMr: '',
                        categoryEn: 'Admissions',
                        categoryMr: 'प्रवेश अपडेट',
                        dateStr: '2026',
                        descEn: '',
                        descMr: ''
                      });
                      setFormType('news');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add Announcement</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {newsList.map((n) => (
                    <div key={n.id} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-3 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full">
                            {n.categoryEn}
                          </span>
                          <span className="text-xs font-bold text-slate-400">{n.dateStr}</span>
                        </div>
                        <h3 className="font-extrabold text-base text-slate-900">{n.titleEn || n.titleMr}</h3>
                        <p className="text-xs text-slate-600">{n.descEn || n.descMr}</p>
                      </div>

                      <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                        <button
                          onClick={() => { setEditingItem(n); setFormType('news'); }}
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
                  ))}
                </div>
              </div>
            )}

            {/* MODULE 7: FACULTY */}
            {tab === 'faculty' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Faculty & Staff Members</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Manage instructor profiles, qualifications, and badges</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        name: '',
                        roleEn: 'Computer Instructor',
                        expEn: '5+ Years Experience',
                        specEn: '',
                        badge: 'Faculty',
                        imageUrl: ''
                      });
                      setFormType('faculty');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
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
                            <span className="bg-indigo-50 text-indigo-700 border border-indigo-200 text-[10px] font-extrabold px-2 py-0.5 rounded-md">
                              {fac.badge || 'Faculty'}
                            </span>
                          </div>
                          <div className="text-xs font-bold text-indigo-600">{fac.roleEn || fac.roleMr}</div>
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

            {/* MODULE 8: CAMPUS PHOTOS */}
            {tab === 'gallery' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">Campus Photo Gallery</h1>
                    <p className="text-xs font-semibold text-slate-500 mt-1">Upload and manage campus infrastructure & event photos</p>
                  </div>

                  <button
                    onClick={() => {
                      setEditingItem({
                        titleEn: '',
                        descEn: '',
                        category: 'Campus',
                        imageUrl: ''
                      });
                      setFormType('gallery');
                    }}
                    className="flex items-center gap-1.5 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-extrabold text-xs shadow-sm transition-all hover:scale-[1.02]"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Upload New Photo</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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

            {/* MODULE 9: SITE BRANDING SETTINGS */}
            {tab === 'settings' && (
              <div className="space-y-6 max-w-3xl">
                <div>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">Site Branding Settings</h1>
                  <p className="text-xs font-semibold text-slate-500 mt-1">Header logo image URL and Hero background image manager</p>
                </div>

                <form onSubmit={handleSaveSettings} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm space-y-6">
                  
                  {/* Logo Image */}
                  <div className="space-y-3">
                    <label className="block text-xs font-black text-slate-900">1. Header Brand Logo Image:</label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all">
                        {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <Upload className="w-4 h-4 text-indigo-600" />}
                        <span>{uploadingImage ? 'Uploading...' : 'Choose Logo File'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleFileSelect(e, 'logo', 1, (url) => setSiteSettings((prev) => ({ ...prev, logoUrl: url })))} 
                          className="hidden" 
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Logo Image URL"
                        value={siteSettings.logoUrl || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, logoUrl: e.target.value })}
                        className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800"
                      />
                    </div>
                  </div>

                  {/* Hero Background Image */}
                  <div className="space-y-3 border-t border-slate-100 pt-5">
                    <label className="block text-xs font-black text-slate-900">2. Hero Banner Background Image:</label>
                    <div className="flex items-center gap-3">
                      <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 transition-all">
                        {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <Upload className="w-4 h-4 text-indigo-600" />}
                        <span>{uploadingImage ? 'Uploading...' : 'Choose Background File'}</span>
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleFileSelect(e, 'hero', 1.8, (url) => setSiteSettings((prev) => ({ ...prev, heroBgUrl: url })))} 
                          className="hidden" 
                        />
                      </label>
                      <input
                        type="text"
                        placeholder="Hero Background URL"
                        value={siteSettings.heroBgUrl || ''}
                        onChange={(e) => setSiteSettings({ ...siteSettings, heroBgUrl: e.target.value })}
                        className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-800"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-xs py-3.5 rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 hover:scale-[1.01]"
                  >
                    <Save className="w-4 h-4 text-white" />
                    <span>Save Site Branding Settings</span>
                  </button>
                </form>
              </div>
            )}

          </div>
        </main>
      </div>

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
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Fee (English):</label>
                    <input
                      type="text"
                      value={editingItem.feeEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, feeEn: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Duration:</label>
                    <input
                      type="text"
                      value={editingItem.durationEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, durationEn: e.target.value })}
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
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

                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <label className="block text-xs font-bold text-slate-700">Course Banner Photo:</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <Upload className="w-4 h-4 text-indigo-600" />}
                      <span>{uploadingImage ? 'Uploading...' : 'Choose File'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileSelect(e, 'courses', 1.5)} 
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

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
                  Save & Sync Supabase DB
                </button>
              </form>
            )}

            {/* CSC Form */}
            {formType === 'csc' && (
              <form onSubmit={handleSaveCSC} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">CSC Service Title:</label>
                  <input
                    type="text"
                    value={editingItem.titleEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, titleEn: e.target.value, titleMr: e.target.value })}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Timeline:</label>
                  <input
                    type="text"
                    value={editingItem.timelineEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, timelineEn: e.target.value, timelineMr: e.target.value })}
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
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
                  Save & Sync Supabase DB
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
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
                  Save & Sync Supabase DB
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
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
                  Save Batch Schedule Slot
                </button>
              </form>
            )}

            {/* News Form */}
            {formType === 'news' && (
              <form onSubmit={handleSaveNews} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Announcement Title (English):</label>
                  <input
                    type="text"
                    value={editingItem.titleEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, titleEn: e.target.value, titleMr: e.target.value })}
                    required
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description:</label>
                  <textarea
                    rows={3}
                    value={editingItem.descEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, descEn: e.target.value, descMr: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
                  Save Announcement
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
                      {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <Upload className="w-4 h-4 text-indigo-600" />}
                      <span>{uploadingImage ? 'Uploading...' : 'Choose File'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileSelect(e, 'faculty', 1)} 
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

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
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
                    <option value="Facilities">Facilities & Counters</option>
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
                  <label className="block text-xs font-bold text-slate-700">Upload Photo to Supabase Storage Bucket:</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-indigo-600" /> : <Upload className="w-4 h-4 text-indigo-600" />}
                      <span>{uploadingImage ? 'Uploading...' : 'Choose Photo'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileSelect(e, 'gallery', 1.5)} 
                        className="hidden" 
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Image URL"
                      value={editingItem.imageUrl || editingItem.image_url || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value, image_url: e.target.value })}
                      required
                      className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-xl text-[11px] font-mono text-slate-700"
                    />
                  </div>
                </div>

                <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-3 rounded-xl shadow-sm transition-all">
                  Upload & Save Photo to Supabase
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Image Cropper Modal */}
      {cropState && (
        <ImageCropperModal
          imageFile={cropState.file}
          aspectRatio={cropState.aspectRatio || 1}
          onCropComplete={handleCroppedUpload}
          onCancel={() => setCropState(null)}
        />
      )}

    </div>
  );
}
