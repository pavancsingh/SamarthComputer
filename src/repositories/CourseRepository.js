import { supabase } from '../lib/supabase';

/**
 * CourseRepository
 * Data Access Layer for computer training courses with direct Supabase DB integration.
 */
export const CourseRepository = {
  /**
   * Fetch all courses with optional category filtering from Supabase DB.
   */
  async getCourses(category = 'all') {
    try {
      let query = supabase.from('courses').select('*').order('created_at', { ascending: false });
      if (category !== 'all') {
        query = query.eq('category', category);
      }
      const { data, error } = await query;
      if (error) {
        console.error('Supabase course fetch error:', error.message);
        return [];
      }
      return (data || []).map((c) => ({
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
    } catch (e) {
      console.error('Supabase course fetch exception:', e.message);
      return [];
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
      console.error('Supabase course detail fetch exception:', e.message);
    }
    return null;
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
