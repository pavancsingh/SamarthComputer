import { supabase } from '../lib/supabase';
import { COURSES_DATA, COURSE_LOGOS } from '../constants/coursesData';
import { AdminRepository } from './AdminRepository';
import { InquiryRepository } from './InquiryRepository';
import { sharedStore } from './sharedStore';

/**
 * CourseRepository
 * Data Access Layer for computer training courses with direct Supabase DB integration.
 * Uses Supabase as single source of truth and auto-populates missing courses safely (no duplicates).
 */
export const CourseRepository = {
  /**
   * Duplicate-safe check to populate missing default courses into Supabase
   */
  async ensureSeedCourses() {
    try {
      const { data: existing, error } = await supabase.from('courses').select('slug');
      if (error) return;
      const existingSlugs = new Set((existing || []).map((c) => c.slug));

      const missing = COURSES_DATA.filter((c) => !existingSlugs.has(c.slug));
      if (missing.length > 0) {
        console.log(`[CourseRepository] Seeding ${missing.length} missing course(s) to Supabase...`);
        for (const course of missing) {
          await AdminRepository.saveCourse(course);
        }
      }
    } catch (e) {
      console.warn('Course seed check warning:', e.message);
    }
  },

  /**
   * Alias for getCourses('all') to prevent runtime TypeErrors
   */
  async getAllCourses() {
    return this.getCourses('all');
  },

  /**
   * Resilience alias mapping to InquiryRepository.getCSCServices
   */
  async getCSCServices(category = 'all') {
    return InquiryRepository.getCSCServices(category);
  },

  /**
   * Resilience alias mapping to InquiryRepository.getGovtServices
   */
  async getGovtServices(category = 'all') {
    return InquiryRepository.getGovtServices(category);
  },

  /**
   * Fetch all courses with optional category filtering from Supabase DB.
   */
  async getCourses(category = 'all') {
    try {
      let query = supabase.from('courses').select('*').order('display_order', { ascending: true }).order('created_at', { ascending: false });
      if (category !== 'all') {
        if (category === 'primary') {
          query = query.eq('is_primary', true);
        } else {
          query = query.eq('category', category);
        }
      }
      let { data, error } = await query;
      if (error && error.message.includes('display_order')) {
        let retryQuery = supabase.from('courses').select('*').order('created_at', { ascending: false });
        if (category !== 'all') {
          if (category === 'primary') {
            retryQuery = retryQuery.eq('is_primary', true);
          } else {
            retryQuery = retryQuery.eq('category', category);
          }
        }
        const retry = await retryQuery;
        data = retry.data;
        error = retry.error;
      }

      if (error || !data || data.length === 0) {
        if (error) console.error('Supabase course fetch error:', error.message);
        const local = sharedStore.getCourses();
        if (category === 'primary') {
          return local.filter((c) => c.isPrimary || c.is_primary || c.slug === 'mscit' || c.slug === 'tally-prime-gst' || c.slug === 'advanced-excel');
        }
        if (category !== 'all') {
          return local.filter((c) => c.category === category);
        }
        return local;
      }

      return (data || []).map((c) => ({
        ...c,
        logoUrl: c.logo_url || c.logoUrl || COURSE_LOGOS[c.slug] || '',
        isPrimary: c.is_primary !== undefined ? c.is_primary : (c.isPrimary || false),
        isFeatured: c.is_featured !== undefined ? c.is_featured : (c.isFeatured || false),
        displayOrder: c.display_order !== undefined ? c.display_order : (c.displayOrder || 0),
        subtitleMr: c.subtitle_mr || c.subtitleMr,
        subtitleEn: c.subtitle_en || c.subtitleEn,
        durationMr: c.duration_mr || c.durationMr,
        durationEn: c.duration_en || c.durationEn,
        certificationMr: c.certification_mr || c.certificationMr,
        certificationEn: c.certification_en || c.certificationEn,
        eligibilityMr: c.eligibility_mr || c.eligibilityMr,
        eligibilityEn: c.eligibility_en || c.eligibilityEn,
        overviewMr: c.overview_mr || c.overviewMr,
        overviewEn: c.overview_en || c.overviewEn,
        modulesMr: c.modules_mr || c.modulesMr || [],
        modulesEn: c.modules_en || c.modulesEn || [],
        careersMr: c.careers_mr || c.careersMr || [],
        careersEn: c.careers_en || c.careersEn || []
      }));
    } catch (e) {
      console.error('Supabase course fetch exception:', e.message);
      const local = sharedStore.getCourses();
      return local;
    }
  },

  /**
   * Fetch a single course by slug from Supabase DB.
   */
  async getCourseBySlug(slug) {
    try {
      const { data, error } = await supabase.from('courses').select('*').eq('slug', slug).maybeSingle();
      if (!error && data) {
        return {
          ...data,
          logoUrl: data.logo_url || data.logoUrl || COURSE_LOGOS[data.slug] || '',
          isPrimary: data.is_primary !== undefined ? data.is_primary : (data.isPrimary || false),
          isFeatured: data.is_featured !== undefined ? data.is_featured : (data.isFeatured || false),
          displayOrder: data.display_order !== undefined ? data.display_order : (data.displayOrder || 0),
          subtitleMr: data.subtitle_mr || data.subtitleMr,
          subtitleEn: data.subtitle_en || data.subtitleEn,
          durationMr: data.duration_mr || data.durationMr,
          durationEn: data.duration_en || data.durationEn,
          certificationMr: data.certification_mr || data.certificationMr,
          certificationEn: data.certification_en || data.certificationEn,
          eligibilityMr: data.eligibility_mr || data.eligibilityMr,
          eligibilityEn: data.eligibility_en || data.eligibilityEn,
          overviewMr: data.overview_mr || data.overviewMr,
          overviewEn: data.overview_en || data.overviewEn,
          modulesMr: data.modules_mr || data.modulesMr || [],
          modulesEn: data.modules_en || data.modulesEn || [],
          careersMr: data.careers_mr || data.careersMr || [],
          careersEn: data.careers_en || data.careersEn || []
        };
      }
    } catch (e) {
      console.error('Supabase course detail fetch exception:', e.message);
    }
    // Local fallback if DB single query is empty
    const local = sharedStore.getCourses();
    return local.find((c) => c.slug === slug || c.id === slug) || null;
  },

  /**
   * Submit an admission inquiry directly to Supabase DB.
   */
  async submitAdmissionInquiry(payload) {
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          type: 'course_admission',
          name: payload.name,
          mobile: payload.mobile,
          course_id: payload.courseId || payload.course,
          batch_timing: payload.batchTiming || 'Morning',
          status: 'New Lead'
        }])
        .select();

      if (error) {
        console.error('Supabase DB inquiry error:', error.message);
        return { success: false, error: error.message };
      }
      return { success: true, data: data?.[0] };
    } catch (err) {
      console.error('Inquiry submission exception:', err.message);
      return { success: false, error: err.message };
    }
  }
};

