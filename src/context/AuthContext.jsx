import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const ADMIN_EMAIL = 'pawansingh3760@gmail.com';
export const ALLOWED_ADMIN_USERS = [
  'pawansingh3760@gmail.com',
  'admin@samarth.com',
  'admin@samarthcomputers.in',
  'admin',
  'pavan',
  'sagarbhosale'
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const checkIsAdminEmail = (email) => {
    if (!email) return true; // Allow empty username if password is valid
    const clean = email.toLowerCase().trim();
    return ALLOWED_ADMIN_USERS.includes(clean) ||
           clean.includes('admin') ||
           clean.includes('pawansingh') ||
           clean.includes('pavan') ||
           clean.includes('samarth') ||
           clean.includes('sagar') ||
           clean.includes('bhosale');
  };

  useEffect(() => {
    // Check initial Supabase Session or Local Session
    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user && checkIsAdminEmail(session.user.email)) {
          setUser(session.user);
          setIsAdmin(true);
          setLoading(false);
          return;
        }
      } catch (err) {
        console.warn('Supabase Auth Session check notice:', err.message);
      }

      // Check Local Admin Session
      const storedAdmin = localStorage.getItem('samarth_admin_session');
      if (storedAdmin === 'true') {
        setIsAdmin(true);
        setUser({ email: ADMIN_EMAIL, name: 'Samarth Master Admin', id: 'admin-master' });
      } else {
        setIsAdmin(false);
        setUser(null);
      }
      setLoading(false);
    }

    checkSession();

    // Listen for Auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user && checkIsAdminEmail(session.user.email)) {
        setUser(session.user);
        setIsAdmin(true);
      } else {
        const storedAdmin = localStorage.getItem('samarth_admin_session');
        if (storedAdmin === 'true') {
          setIsAdmin(true);
          setUser({ email: ADMIN_EMAIL, name: 'Samarth Master Admin', id: 'admin-master' });
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      }
      setLoading(false);
    });

    return () => {
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockoutTime, setLockoutTime] = useState(0);

  const loginAdmin = async (emailInput, passwordInput) => {
    const now = Date.now();
    if (lockoutTime > now) {
      const remainingSec = Math.ceil((lockoutTime - now) / 1000);
      return { success: false, message: `Too many failed attempts. Please wait ${remainingSec} seconds.` };
    }

    const cleanEmail = (emailInput || '').trim().toLowerCase();
    const cleanPass = (passwordInput || '').trim();

    // 1. Validate against system credentials fallback
    const validPasswords = [
      'pavan@1137', 'pavan@3760', 'samarth123', 'admin123', 'admin',
      'pavan'
    ];
    const isPassValid = validPasswords.includes(cleanPass.toLowerCase()) || cleanPass === 'Pavan@1137' || cleanPass === 'Pavan@3760';

    if (isPassValid) {
      localStorage.setItem('samarth_admin_session', 'true');
      const adminUser = { email: cleanEmail || ADMIN_EMAIL, name: 'Samarth Master Admin', id: 'admin-master' };
      setUser(adminUser);
      setIsAdmin(true);
      setFailedAttempts(0);
      setLockoutTime(0);
      return { success: true };
    }

    // 2. Attempt Supabase Auth login if email format is used
    if (cleanEmail.includes('@') && cleanPass) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPass
        });

        if (!error && data?.user) {
          localStorage.setItem('samarth_admin_session', 'true');
          setUser(data.user);
          setIsAdmin(true);
          setFailedAttempts(0);
          setLockoutTime(0);
          return { success: true };
        }
      } catch (err) {
        console.warn('Supabase Auth login notice:', err.message);
      }
    }

    // Failed attempt handling
    const newAttempts = failedAttempts + 1;
    setFailedAttempts(newAttempts);
    if (newAttempts >= 5) {
      setLockoutTime(now + 60000); // 60s lockout
      setFailedAttempts(0);
      return { success: false, message: 'Too many invalid attempts. Account locked for 60 seconds.' };
    }

    return { success: false, message: `Invalid Admin Password. (${5 - newAttempts} attempts remaining)` };
  };

  const logoutAdmin = async () => {
    localStorage.removeItem('samarth_admin_session');
    setUser(null);
    setIsAdmin(false);
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Logout notice:', err.message);
    }
  };


  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

