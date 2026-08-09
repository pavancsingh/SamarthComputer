import { supabase } from '../lib/supabase';

/**
 * StudentRepository
 * Data Access Layer for student portal.
 */
export const StudentRepository = {
  /**
   * Search certificate by registration number or student name in Supabase certificates table.
   */
  async getCertificateByRegNo(regNo) {
    if (!regNo) return null;
    const queryTerm = regNo.trim();
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .or(`reg_no.ilike.%${queryTerm}%,student_name_en.ilike.%${queryTerm}%,student_name_mr.ilike.%${queryTerm}%`)
        .maybeSingle();

      if (error) {
        console.error('StudentRepository certificate search error:', error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.error('StudentRepository certificate search exception:', err.message);
      return null;
    }
  }
};


