import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, Plus, Trash2, Edit3, Save, X, LogOut, CheckCircle2, 
  BookOpen, FileText, Users, RefreshCw, Sparkles, Filter, Building2,
  Camera, Upload, Image, Loader2, GraduationCap, KeyRound, Database, DatabaseBackup,
  Clock, Megaphone
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { AdminRepository } from '../../repositories/AdminRepository';
import { sharedStore } from '../../repositories/sharedStore';
import { StorageService } from '../../services/StorageService';

/**
 * AdminDashboard Component
 * Master Admin Control Panel in English with Fresh Bright Color Theme.
 * Fully synchronized with Supabase DB & Storage (with client fallback).
 * Manages Inbox Leads, Courses, CSC Services, Govt Services, Laptops, Hardware Repair, Certificates, and Campus Gallery/About Images.
 */
export default function AdminDashboard({ lang = 'en', onLogout }) {
  const { logoutAdmin } = useAuth();

  const handleLogout = async () => {
    await logoutAdmin();
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/';
    }
  };

  const [tab, setTab] = useState('inquiries'); 
  // Tabs: 'inquiries' | 'courses' | 'csc' | 'govt' | 'laptops' | 'repairs' | 'certificates' | 'gallery'

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

  // Active Edit Form state
  const [editingItem, setEditingItem] = useState(null);
  const [formType, setFormType] = useState(null); 
  // Types: 'course' | 'csc' | 'govt' | 'gallery' | 'faculty' | 'batch' | 'news'
  const [uploadingImage, setUploadingImage] = useState(false);

  const [siteSettings, setSiteSettings] = useState(sharedStore.getSiteSettings());

  useEffect(() => {
    loadAllData();
    const unsubscribe = sharedStore.subscribe(() => {
      loadAllData();
      setSiteSettings(sharedStore.getSiteSettings());
    });
    return unsubscribe;
  }, []);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    sharedStore.saveSiteSettings(siteSettings);
    alert('Site Logo & Hero Background Image settings saved successfully!');
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



  // Image Upload Handler using Supabase Storage
  const handleFileChange = async (e, folder = 'general') => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    const publicUrl = await StorageService.uploadImage(file, folder);
    setUploadingImage(false);

    if (publicUrl) {
      setEditingItem((prev) => ({
        ...prev,
        imageUrl: publicUrl,
        image_url: publicUrl
      }));
    } else {
      alert('Failed to upload image. Please try selecting a smaller file.');
    }
  };

  // --- Handlers ---
  const handleInquiryStatus = async (id, status) => {
    await AdminRepository.updateInquiryStatus(id, status);
    loadAllData();
  };

  const handleDeleteInquiry = async (id) => {
    if (window.confirm('Are you sure you want to delete this lead inquiry?')) {
      await AdminRepository.deleteInquiry(id);
      loadAllData();
    }
  };

  const handleSaveCourse = async (e) => {
    e.preventDefault();
    await AdminRepository.saveCourse(editingItem);
    setEditingItem(null);
    setFormType(null);
    loadAllData();
  };

  const handleDeleteCourse = async (id) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      await AdminRepository.deleteCourse(id);
      loadAllData();
    }
  };

  const handleSaveCSC = async (e) => {
    e.preventDefault();
    await AdminRepository.saveCSCService(editingItem);
    setEditingItem(null);
    setFormType(null);
    loadAllData();
  };

  const handleDeleteCSC = async (id) => {
    if (window.confirm('Are you sure you want to delete this CSC service?')) {
      await AdminRepository.deleteCSCService(id);
      loadAllData();
    }
  };

  const handleSaveGovt = async (e) => {
    e.preventDefault();
    await AdminRepository.saveGovtService(editingItem);
    setEditingItem(null);
    setFormType(null);
    loadAllData();
  };

  const handleDeleteGovt = async (id) => {
    if (window.confirm('Are you sure you want to delete this Government service?')) {
      await AdminRepository.deleteGovtService(id);
      loadAllData();
    }
  };



  const handleSaveGalleryItem = async (e) => {
    e.preventDefault();
    await AdminRepository.saveSiteGalleryItem(editingItem);
    setEditingItem(null);
    setFormType(null);
    loadAllData();
  };

  const handleDeleteGalleryItem = async (id) => {
    if (window.confirm('Are you sure you want to delete this gallery photo?')) {
      await AdminRepository.deleteSiteGalleryItem(id);
      loadAllData();
    }
  };

  const handleSaveFaculty = async (e) => {
    e.preventDefault();
    await AdminRepository.saveFacultyItem(editingItem);
    setEditingItem(null);
    setFormType(null);
    loadAllData();
  };

  const handleDeleteFaculty = async (id) => {
    if (window.confirm('Are you sure you want to delete this faculty member?')) {
      await AdminRepository.deleteFacultyItem(id);
      loadAllData();
    }
  };

  const handleSaveBatch = async (e) => {
    e.preventDefault();
    await AdminRepository.saveBatchItem(editingItem);
    setEditingItem(null);
    setFormType(null);
    loadAllData();
  };

  const handleDeleteBatch = async (id) => {
    if (window.confirm('Are you sure you want to delete this batch timetable slot?')) {
      await AdminRepository.deleteBatchItem(id);
      loadAllData();
    }
  };

  const handleSaveNews = async (e) => {
    e.preventDefault();
    await AdminRepository.saveNewsItem(editingItem);
    setEditingItem(null);
    setFormType(null);
    loadAllData();
  };

  const handleDeleteNews = async (id) => {
    if (window.confirm('Are you sure you want to delete this news announcement?')) {
      await AdminRepository.deleteNewsItem(id);
      loadAllData();
    }
  };

  const [syncingSupabase, setSyncingSupabase] = useState(false);

  const handleSyncAllToSupabase = async () => {
    setSyncingSupabase(true);
    const res = await AdminRepository.syncAllLocalDataToSupabase();
    setSyncingSupabase(false);
    if (res.success) {
      alert(`🎉 Success! All ${res.count} records (Courses, Services, Gallery & Faculty) synced to Supabase Database.`);
      loadAllData();
    } else {
      alert(`Notice: ${res.error || 'Check internet connection'}`);
    }
  };

  return (
    <div className="min-h-screen bg-stitch-ivory text-stitch-slate-dark pb-20">
      
      {/* Admin Top Header */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-4 sm:px-8 py-3.5 shadow-stitch-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-stitch-red text-white flex items-center justify-center font-black text-xl shadow-stitch-sm">
              S
            </div>
            <div>
              <h1 className="font-black text-lg text-stitch-slate-dark">Samarth Master Admin Panel</h1>
              <div className="text-xs text-stitch-red font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-stitch-emerald animate-pulse"></span>
                <span>Connected to Supabase DB & Storage</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={handleSyncAllToSupabase}
              disabled={syncingSupabase}
              className="px-3.5 py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-stitch-sm transition-all hover:scale-[1.02]"
              title="Push all courses, services & faculty to Supabase DB"
            >
              {syncingSupabase ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : <DatabaseBackup className="w-4 h-4 text-white" />}
              <span>{syncingSupabase ? 'Syncing Supabase...' : 'Sync All Data to Supabase'}</span>
            </button>

            <button
              onClick={loadAllData}
              className="p-2.5 rounded-2xl bg-slate-100 text-stitch-slate-dark hover:bg-slate-200 transition-all border border-slate-200 flex items-center gap-1.5 text-xs font-bold shadow-stitch-sm"
              title="Refresh Data"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              <span className="hidden sm:inline">Refresh</span>
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-xs px-3.5 py-2.5 rounded-2xl border border-red-200 flex items-center gap-1.5 transition-all shadow-stitch-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 space-y-8">
        
        {/* Admin ID / Password & Supabase Config Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-stitch-slate-dark text-white rounded-3xl p-6 shadow-stitch-md relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-700/80">
          <div className="space-y-2 relative z-10">
            <div className="flex items-center gap-2">
              <span className="bg-stitch-red/90 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Authorized Credentials
              </span>
              <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-400/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                Supabase Connected
              </span>
            </div>
            <h2 className="text-lg font-black text-white flex items-center gap-2">
              <KeyRound className="w-5 h-5 text-stitch-amber" />
              Master Admin Config & Login Info
            </h2>
            <div className="flex flex-wrap gap-4 text-xs font-mono text-slate-300 pt-1">
              <div className="bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
                Admin Email ID: <strong className="text-white">pawansingh3760@gmail.com</strong>
              </div>
              <div className="bg-slate-900/80 px-3 py-1.5 rounded-xl border border-slate-700">
                Master Password: <strong className="text-stitch-amber">Pavan@1137</strong>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 relative z-10 shrink-0">
            <button
              onClick={handleSyncAllToSupabase}
              disabled={syncingSupabase}
              className="bg-gradient-to-r from-stitch-red to-stitch-red-dark hover:from-stitch-red-dark hover:to-red-800 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-stitch-sm transition-all flex items-center gap-2 border border-stitch-red-border/40"
            >
              <Database className="w-4 h-4 text-white" />
              <span>Push All Catalog Data to Supabase DB</span>
            </button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-4">
          {[
            { id: 'inquiries', label: `📥 Inbox (${inquiries.length})`, icon: Users },
            { id: 'courses', label: `📚 Courses (${courses.length})`, icon: BookOpen },
            { id: 'csc', label: `📜 CSC (${cscServices.length})`, icon: FileText },
            { id: 'govt', label: `🏛️ Govt (${govtServices.length})`, icon: Building2 },
            { id: 'batches', label: `⏰ Batch Timetable (${batchesList.length})`, icon: Clock },
            { id: 'news', label: `📢 Programs & Updates (${newsList.length})`, icon: Megaphone },
            { id: 'faculty', label: `👨‍🏫 Faculty (${facultyList.length})`, icon: GraduationCap },
            { id: 'gallery', label: `🖼️ Campus Photos (${siteGallery.length})`, icon: Camera },
            { id: 'settings', label: '⚙️ Logo & Hero Image', icon: Image }
          ].map((t) => {
            const Icon = t.icon;
            const isActive = tab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => { setTab(t.id); setEditingItem(null); setFormType(null); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-black transition-all shadow-stitch-sm ${
                  isActive 
                    ? 'bg-stitch-red text-white' 
                    : 'bg-white text-stitch-slate-dark hover:bg-slate-100 border border-slate-200/90'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>



        {/* TAB 1: INQUIRIES & LEADS */}
        {tab === 'inquiries' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span>Student Admissions & Service Leads Inbox</span>
              </h2>
              <span className="text-xs text-slate-500 font-medium">Auto-synced with Supabase inquiries table</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-100 text-slate-700 uppercase font-extrabold text-[10px] tracking-wider border-b border-slate-200">
                    <tr>
                      <th className="p-4">Student / Applicant Name</th>
                      <th className="p-4">Mobile Number</th>
                      <th className="p-4">Type / Subject</th>
                      <th className="p-4">Batch / Details</th>
                      <th className="p-4">Status</th>
                      <th className="p-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {inquiries.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-8 text-center text-slate-500 font-medium">No lead inquiries found in inbox.</td>
                      </tr>
                    ) : (
                      inquiries.map((inq) => (
                        <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 font-bold text-slate-900">{inq.name}</td>
                          <td className="p-4 font-mono font-bold text-primary">{inq.mobile}</td>
                          <td className="p-4 font-medium text-slate-700">{inq.course_id || inq.service_id || inq.issue_type || inq.type}</td>
                          <td className="p-4 text-slate-500">{inq.batch_timing || '-'}</td>
                          <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold border ${
                              inq.status === 'Completed' ? 'bg-emerald-100 text-emerald-800 border-emerald-300' : 'bg-amber-100 text-amber-800 border-amber-300'
                            }`}>
                              {inq.status || 'New Lead'}
                            </span>
                          </td>
                          <td className="p-4 text-right space-x-2">
                            <button
                              onClick={() => handleInquiryStatus(inq.id, 'Completed')}
                              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg text-[10px] font-bold shadow-sm"
                            >
                              Mark Completed
                            </button>
                            <button
                              onClick={() => handleDeleteInquiry(inq.id)}
                              className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 p-1.5 rounded-lg"
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
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span>Computer Courses Management</span>
              </h2>

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
                className="bg-primary hover:bg-primary-dark text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Course</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((c) => (
                <div key={c.id || c.slug} className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-md transition-all overflow-hidden flex flex-col justify-between">
                  { (c.image_url || c.imageUrl) && (
                    <div className="h-40 w-full overflow-hidden bg-slate-100">
                      <img src={c.image_url || c.imageUrl} alt={c.title} className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="bg-primary/10 text-primary border border-primary/20 text-[10px] font-extrabold px-2.5 py-0.5 rounded-md uppercase">
                        {c.category}
                      </span>
                      <span className="text-xs font-bold text-slate-500">{c.fee_en || c.feeEn}</span>
                    </div>

                    <h3 className="font-extrabold text-base text-slate-900">{c.title}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{c.overviewEn || c.overviewMr || c.overview_en}</p>
                  </div>

                  <div className="p-4 pt-0 border-t border-slate-100 flex items-center justify-end gap-2 mt-2">
                    <button
                      onClick={() => { setEditingItem(c); setFormType('course'); }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(c.id || c.slug)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs px-3 py-1.5 rounded-xl flex items-center gap-1"
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

        {/* TAB 3: CSC SERVICES */}
        {tab === 'csc' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <FileText className="w-5 h-5 text-secondary" />
                <span>CSC & MahaOnline Services Management</span>
              </h2>

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
                className="bg-secondary hover:bg-secondary-cyan text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add New CSC Service</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {cscServices.map((s) => (
                <div key={s.id || s.slug} className="bg-white border border-slate-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition-all space-y-4 flex flex-col justify-between">
                  <div className="space-y-2">
                    <h3 className="font-extrabold text-base text-slate-900">{s.titleEn || s.titleMr || s.title_en}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{s.overviewEn || s.overviewMr || s.overview_en}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                    <button
                      onClick={() => { setEditingItem(s); setFormType('csc'); }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteCSC(s.id || s.slug)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1"
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
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-accent-gold" />
                <span>Government Portal Services Management</span>
              </h2>

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
                className="bg-primary hover:bg-primary-dark text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
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
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteGovt(g.id || g.slug)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center gap-1"
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





        {/* TAB 8: CAMPUS & ABOUT GALLERY */}
        {tab === 'gallery' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Camera className="w-5 h-5 text-primary" />
                <span>Campus & About Section Photo Gallery</span>
              </h2>

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
                className="bg-primary hover:bg-primary-dark text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Upload New Photo</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {siteGallery.map((item) => (
                <div key={item.id} className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-between">
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
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-200 font-bold text-xs px-3 py-1 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteGalleryItem(item.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 font-bold text-xs p-1.5 rounded-lg"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB: FACULTY MANAGEMENT */}
        {tab === 'faculty' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-stitch-red" />
                <span>Instructors & Center Leadership ({facultyList.length})</span>
              </h2>

              <button
                onClick={() => {
                  setEditingItem({
                    name: '',
                    roleMr: '',
                    roleEn: '',
                    expMr: '',
                    expEn: '',
                    specMr: '',
                    specEn: '',
                    badge: 'Instructor',
                    imageUrl: ''
                  });
                  setFormType('faculty');
                }}
                className="bg-stitch-red hover:bg-stitch-red-dark text-white font-extrabold text-xs px-4 py-2.5 rounded-2xl shadow-stitch-sm flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Faculty Member</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {facultyList.map((fac) => (
                <div key={fac.id} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-4 relative">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      {fac.imageUrl ? (
                        <img src={fac.imageUrl} alt={fac.name} className="w-14 h-14 rounded-2xl object-cover border border-slate-200 shadow-sm" />
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-stitch-slate-dark text-white flex items-center justify-center font-bold">
                          <GraduationCap className="w-7 h-7 text-stitch-amber" />
                        </div>
                      )}
                      <div>
                        <span className="bg-amber-50 text-stitch-amber text-[10px] font-black px-2.5 py-0.5 rounded-full border border-amber-200 uppercase">
                          {fac.badge || 'Faculty'}
                        </span>
                        <h3 className="font-extrabold text-base text-slate-900 mt-1">{fac.name}</h3>
                        <p className="text-xs text-stitch-red font-bold">{fac.roleEn || fac.roleMr}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => { setEditingItem(fac); setFormType('faculty'); }}
                        className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                        title="Edit Faculty"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteFaculty(fac.id)}
                        className="p-2 rounded-xl text-red-500 hover:bg-red-50"
                        title="Delete Faculty"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-slate-600 space-y-1">
                    <p className="font-semibold text-emerald-700">Experience: {fac.expEn || fac.expMr}</p>
                    <p className="text-slate-500 font-medium">{fac.specEn || fac.specMr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: BATCH TIMETABLE 2026 */}
        {tab === 'batches' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-stitch-amber" />
                <span>Daily Batch Timetable 2026 Schedule</span>
              </h2>

              <button
                onClick={() => {
                  setEditingItem({
                    category: 'morning',
                    time: '09:00 AM - 10:30 AM',
                    courseEn: '',
                    courseMr: '',
                    statusEn: 'Admission Open',
                    statusMr: 'प्रवेश सुरू',
                    seatsEn: '5 Seats Left',
                    seatsMr: '५ जागा शिल्लक'
                  });
                  setFormType('batch');
                }}
                className="bg-stitch-amber hover:bg-amber-600 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Batch Timing</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {batchesList.map((b) => (
                <div key={b.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-stitch-sm space-y-3 relative flex flex-col justify-between border-l-4 border-l-stitch-amber">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="bg-amber-100 text-amber-900 font-extrabold text-[10px] uppercase px-2.5 py-0.5 rounded-full">
                        {b.category}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => { setEditingItem(b); setFormType('batch'); }}
                          className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                          title="Edit Batch"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteBatch(b.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50"
                          title="Delete Batch"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <h3 className="font-black text-base text-slate-900 mt-2">{b.time}</h3>
                    <p className="font-bold text-xs text-stitch-red">{b.courseEn || b.courseMr}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{b.seatsEn || b.statusEn}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 8: PROGRAMS & NEWS UPDATES */}
        {tab === 'news' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-stitch-red" />
                <span>Programs, Admission Alerts & News Updates</span>
              </h2>

              <button
                onClick={() => {
                  setEditingItem({
                    titleEn: '',
                    titleMr: '',
                    categoryEn: 'Admissions',
                    categoryMr: 'प्रवेश अपडेट',
                    dateStr: '२०२६',
                    descEn: '',
                    descMr: ''
                  });
                  setFormType('news');
                }}
                className="bg-stitch-red hover:bg-stitch-red-dark text-white font-extrabold text-xs px-4 py-2.5 rounded-xl flex items-center gap-1.5 shadow-md transition-all hover:scale-105"
              >
                <Plus className="w-4 h-4" />
                <span>Add News Announcement</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsList.map((n) => (
                <div key={n.id} className="bg-white border border-slate-200 rounded-3xl p-5 shadow-stitch-sm space-y-3 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="bg-red-50 text-stitch-red font-bold text-[10px] px-2.5 py-0.5 rounded-md border border-red-200">
                        {n.categoryEn || n.categoryMr}
                      </span>
                      <span>{n.dateStr || '२०२६'}</span>
                    </div>

                    <h3 className="font-bold text-sm text-slate-900">{n.titleEn || n.titleMr}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-1">{n.descEn || n.descMr}</p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button
                      onClick={() => { setEditingItem(n); setFormType('news'); }}
                      className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs px-3 py-1 rounded-xl flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteNews(n.id)}
                      className="bg-red-50 hover:bg-red-100 text-red-600 font-bold text-xs px-3 py-1 rounded-xl flex items-center gap-1"
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

        {/* TAB 9: SITE SETTINGS (LOGO & HERO BACKGROUND IMAGE) */}
        {tab === 'settings' && (
          <div className="space-y-6 max-w-3xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
                <Image className="w-5 h-5 text-primary" />
                <span>Site Branding Logo & Hero Background Image Settings</span>
              </h2>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm space-y-6">
              
              {/* Logo URL Setting */}
              <div className="space-y-3">
                <label className="block text-sm font-extrabold text-slate-900">1. Header Brand Logo Image:</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                    {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Upload className="w-4 h-4 text-primary" />}
                    <span>{uploadingImage ? 'Uploading Logo...' : 'Upload Logo Image'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setUploadingImage(true);
                        const url = await StorageService.uploadImage(file, 'logo');
                        setUploadingImage(false);
                        if (url) setSiteSettings((prev) => ({ ...prev, logoUrl: url }));
                      }} 
                      className="hidden" 
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Enter custom Logo URL (e.g. https://...)"
                    value={siteSettings.logoUrl || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, logoUrl: e.target.value })}
                    className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900"
                  />
                </div>
                {siteSettings.logoUrl && (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-200">
                    <img src={siteSettings.logoUrl} alt="Logo Preview" className="w-12 h-12 object-contain rounded-xl border border-slate-300 bg-white" />
                    <span className="text-xs text-slate-600 font-medium">Header Brand Logo Preview</span>
                  </div>
                )}
              </div>

              {/* Hero Background Image Setting */}
              <div className="space-y-3 pt-4 border-t border-slate-100">
                <label className="block text-sm font-extrabold text-slate-900">2. Hero Section Background Banner Image:</label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2">
                    {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Upload className="w-4 h-4 text-primary" />}
                    <span>{uploadingImage ? 'Uploading Banner...' : 'Upload Hero Image'}</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={async (e) => {
                        const file = e.target.files[0];
                        if (!file) return;
                        setUploadingImage(true);
                        const url = await StorageService.uploadImage(file, 'banners');
                        setUploadingImage(false);
                        if (url) setSiteSettings((prev) => ({ ...prev, heroBgUrl: url }));
                      }} 
                      className="hidden" 
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Hero Background Image URL"
                    value={siteSettings.heroBgUrl || ''}
                    onChange={(e) => setSiteSettings({ ...siteSettings, heroBgUrl: e.target.value })}
                    className="flex-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-mono text-slate-900"
                  />
                </div>
                {siteSettings.heroBgUrl && (
                  <div className="space-y-1">
                    <div className="h-44 w-full rounded-2xl overflow-hidden border border-slate-200 relative">
                      <img src={siteSettings.heroBgUrl} alt="Hero Banner Preview" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[11px] text-slate-500 font-medium">Hero Section Computer Lab Visual Frame Preview</span>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-dark text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-md transition-all hover:scale-[1.01]"
              >
                💾 Save Site Logo & Hero Image Settings
              </button>
            </form>
          </div>
        )}

      </div>

      {/* EDITING MODAL WITH FILE UPLOAD */}
      {editingItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 max-w-lg w-full space-y-4 text-slate-900 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-base text-primary uppercase tracking-wide">
                Edit {formType} Record & Upload Image
              </h3>
              <button onClick={() => setEditingItem(null)} className="text-slate-400 hover:text-slate-700">
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
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Duration:</label>
                  <input
                    type="text"
                    value={editingItem.durationEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, durationEn: e.target.value, durationMr: e.target.value })}
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

                {/* Image Upload Input */}
                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <label className="block text-xs font-bold text-slate-700">Upload Course Image to Supabase Bucket:</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Upload className="w-4 h-4 text-primary" />}
                      <span>{uploadingImage ? 'Uploading...' : 'Choose File'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileChange(e, 'courses')} 
                        className="hidden" 
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Image URL or Base64"
                      value={editingItem.imageUrl || editingItem.image_url || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value, image_url: e.target.value })}
                      className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-xl text-[11px] font-mono text-slate-700"
                    />
                  </div>
                  {(editingItem.imageUrl || editingItem.image_url) && (
                    <div className="h-28 w-full rounded-xl overflow-hidden border border-slate-200 mt-2">
                      <img src={editingItem.imageUrl || editingItem.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all mt-4">
                  Save & Sync Supabase DB
                </button>
              </form>
            )}



            {/* Gallery / About Photo Form */}
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

                {/* Upload Image Component */}
                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <label className="block text-xs font-bold text-slate-700">Upload Photo to Supabase Storage Bucket:</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Upload className="w-4 h-4 text-primary" />}
                      <span>{uploadingImage ? 'Uploading...' : 'Choose Photo'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileChange(e, 'gallery')} 
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
                  {(editingItem.imageUrl || editingItem.image_url) && (
                    <div className="h-32 w-full rounded-xl overflow-hidden border border-slate-200 mt-2">
                      <img src={editingItem.imageUrl || editingItem.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all">
                  Upload & Save Photo to Supabase
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
                <button type="submit" className="w-full bg-secondary hover:bg-secondary-cyan text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all">
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
                <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all">
                  Save & Sync Supabase DB
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
                    placeholder="e.g. Prof. Sagar Bhosale (MBA)"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Role (English):</label>
                    <input
                      type="text"
                      value={editingItem.roleEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, roleEn: e.target.value })}
                      placeholder="Lead Instructor"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Role (मराठी):</label>
                    <input
                      type="text"
                      value={editingItem.roleMr || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, roleMr: e.target.value })}
                      placeholder="सेंटर हेड"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Experience (English):</label>
                    <input
                      type="text"
                      value={editingItem.expEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, expEn: e.target.value })}
                      placeholder="12+ Years Experience"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Experience (मराठी):</label>
                    <input
                      type="text"
                      value={editingItem.expMr || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, expMr: e.target.value })}
                      placeholder="१२+ वर्षांचा अनुभव"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Specialization / Bio (English):</label>
                  <textarea
                    rows={2}
                    value={editingItem.specEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, specEn: e.target.value })}
                    placeholder="Specializes in MS-CIT, Tally Prime..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Badge Tag:</label>
                  <input
                    type="text"
                    value={editingItem.badge || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, badge: e.target.value })}
                    placeholder="Center Head / Tally Specialist"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>

                {/* Upload Image Component */}
                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <label className="block text-xs font-bold text-slate-700">Upload Faculty Photo to Storage Bucket:</label>
                  <div className="flex items-center gap-3">
                    <label className="cursor-pointer bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-800 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5">
                      {uploadingImage ? <Loader2 className="w-4 h-4 animate-spin text-primary" /> : <Upload className="w-4 h-4 text-primary" />}
                      <span>{uploadingImage ? 'Uploading...' : 'Choose Photo'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileChange(e, 'faculty')} 
                        className="hidden" 
                      />
                    </label>
                    <input
                      type="text"
                      placeholder="Photo URL"
                      value={editingItem.imageUrl || editingItem.image_url || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value, image_url: e.target.value })}
                      className="flex-1 p-2 bg-slate-50 border border-slate-300 rounded-xl text-[11px] font-mono text-slate-700"
                    />
                  </div>
                  {(editingItem.imageUrl || editingItem.image_url) && (
                    <div className="h-24 w-24 rounded-2xl overflow-hidden border border-slate-200 mt-2">
                      <img src={editingItem.imageUrl || editingItem.image_url} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                  )}
                </div>

                <button type="submit" className="w-full bg-stitch-red hover:bg-stitch-red-dark text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all">
                  Save & Sync Faculty Record
                </button>
              </form>
            )}

            {/* Batch Form */}
            {formType === 'batch' && (
              <form onSubmit={handleSaveBatch} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Time Slot Category:</label>
                  <select
                    value={editingItem.category || 'morning'}
                    onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  >
                    <option value="morning">🌅 Morning Batch</option>
                    <option value="afternoon">☀️ Afternoon Batch</option>
                    <option value="evening">🌙 Evening Batch</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Batch Time (e.g. 09:00 AM - 10:30 AM):</label>
                  <input
                    type="text"
                    value={editingItem.time || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, time: e.target.value })}
                    required
                    placeholder="09:00 AM - 10:30 AM"
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Course / Topic (English):</label>
                    <input
                      type="text"
                      value={editingItem.courseEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, courseEn: e.target.value })}
                      placeholder="MS-CIT & Computer Basics"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Course / Topic (मराठी):</label>
                    <input
                      type="text"
                      value={editingItem.courseMr || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, courseMr: e.target.value })}
                      placeholder="MS-CIT व संगणक पायाभूत"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Seats / Status (English):</label>
                    <input
                      type="text"
                      value={editingItem.seatsEn || editingItem.statusEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, seatsEn: e.target.value, statusEn: e.target.value })}
                      placeholder="5 Seats Left"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Seats / Status (मराठी):</label>
                    <input
                      type="text"
                      value={editingItem.seatsMr || editingItem.statusMr || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, seatsMr: e.target.value, statusMr: e.target.value })}
                      placeholder="५ जागा शिल्लक"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                </div>
                <button type="submit" className="w-full bg-stitch-amber hover:bg-amber-600 text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all">
                  Save & Sync Batch Timetable
                </button>
              </form>
            )}

            {/* News Form */}
            {formType === 'news' && (
              <form onSubmit={handleSaveNews} className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Title (English):</label>
                    <input
                      type="text"
                      value={editingItem.titleEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, titleEn: e.target.value })}
                      required
                      placeholder="MS-CIT New Batch Admission 2026"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Title (मराठी):</label>
                    <input
                      type="text"
                      value={editingItem.titleMr || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, titleMr: e.target.value })}
                      placeholder="MS-CIT नवीन बॅच प्रवेश सुरू २०२६"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Category (English):</label>
                    <input
                      type="text"
                      value={editingItem.categoryEn || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, categoryEn: e.target.value })}
                      placeholder="Admissions / Exam Alerts"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Date / Month Tag:</label>
                    <input
                      type="text"
                      value={editingItem.dateStr || ''}
                      onChange={(e) => setEditingItem({ ...editingItem, dateStr: e.target.value })}
                      placeholder="ऑगस्ट २०२६"
                      className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description (English):</label>
                  <textarea
                    rows={2}
                    value={editingItem.descEn || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, descEn: e.target.value })}
                    placeholder="New batch starting this Monday..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Description (मराठी):</label>
                  <textarea
                    rows={2}
                    value={editingItem.descMr || ''}
                    onChange={(e) => setEditingItem({ ...editingItem, descMr: e.target.value })}
                    placeholder="नवीन बॅच सोमवारपासून सुरू होत आहे..."
                    className="w-full p-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 font-medium"
                  />
                </div>
                <button type="submit" className="w-full bg-stitch-red hover:bg-stitch-red-dark text-white font-bold text-xs py-3 rounded-xl shadow-md transition-all">
                  Save & Sync News Announcement
                </button>
              </form>
            )}



          </div>
        </div>
      )}

    </div>
  );
}
