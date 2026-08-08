import { sharedStore } from './sharedStore';
import { supabase } from '../lib/supabase';

/**
 * CourseRepository
 * Data Access Layer for computer training courses with Supabase DB integration & unified reactive store fallback.
 */
export const CourseRepository = {
  /**
   * Fetch all courses with optional category filtering.
   */
  async getCourses(category = 'all') {
    try {
      let query = supabase.from('courses').select('*').order('created_at', { ascending: false });
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (!error && data && data.length > 0) {
        sharedStore.syncCoursesFromRemote(data);
        return data.map((c) => ({
          ...c,
          subtitleMr: c.subtitle_mr || c.subtitleMr,
          subtitleEn: c.subtitle_en || c.subtitleEn,
          durationMr: c.duration_mr || c.durationMr,
          durationEn: c.duration_en || c.durationEn,
          feeMr: c.fee_mr || c.feeMr,
          feeEn: c.fee_en || c.feeEn,
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
      }
    } catch (e) {
      console.warn('Supabase course fetch notice: falling back to shared store.', e.message);
    }

    const all = sharedStore.getCourses();
    if (category === 'all') return all;
    return all.filter((c) => c.category === category);
  },

  /**
   * Fetch a single course by its unique slug.
   */
  async getCourseBySlug(slug) {
    try {
      const { data, error } = await supabase.from('courses').select('*').eq('slug', slug).maybeSingle();
      if (!error && data) {
        return {
          ...data,
          subtitleMr: data.subtitle_mr || data.subtitleMr,
          subtitleEn: data.subtitle_en || data.subtitleEn,
          durationMr: data.duration_mr || data.durationMr,
          durationEn: data.duration_en || data.durationEn,
          feeMr: data.fee_mr || data.feeMr,
          feeEn: data.fee_en || data.feeEn,
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
      console.warn('Supabase course detail fetch notice:', e.message);
    }

    const all = sharedStore.getCourses();
    return all.find((c) => c.slug === slug || c.id === slug) || all[0];
  },

  /**
   * Submit an admission booking inquiry to Supabase DB & Shared Store.
   */
  async submitAdmissionInquiry(payload) {
    sharedStore.addInquiry({
      type: 'course_admission',
      name: payload.name,
      mobile: payload.mobile,
      course_id: payload.courseId || payload.course,
      batch_timing: payload.batchTiming || 'Morning'
    });

    try {
      const { data, error } = await supabase
        .from('inquiries')
        .insert([{
          type: 'course_admission',
          name: payload.name,
          mobile: payload.mobile,
          course_id: payload.courseId || payload.course,
          batch_timing: payload.batchTiming || 'Morning',
          created_at: new Date().toISOString()
        }]);

      if (error) {
        console.warn('Supabase DB inquiry notice:', error.message);
      }
      return { success: true, data };
    } catch (err) {
      console.warn('Inquiry service error handled cleanly:', err.message);
      return { success: true };
    }
  }
};
