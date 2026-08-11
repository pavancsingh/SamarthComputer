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
    // Sanitize search query: strip out commas, parentheses, quotes, and % to prevent filter injection
    const cleanTerm = regNo.trim().replace(/[,()%"'\\]/g, '');
    if (!cleanTerm) return null;

    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .or(`reg_no.ilike.%${cleanTerm}%,student_name_en.ilike.%${cleanTerm}%,student_name_mr.ilike.%${cleanTerm}%`)
        .maybeSingle();

      if (error) {
        console.warn('[StudentRepository] Search notice:', error.message);
        return null;
      }
      return data;
    } catch (err) {
      console.warn('[StudentRepository] Search exception:', err.message);
      return null;
    }
  }
};


