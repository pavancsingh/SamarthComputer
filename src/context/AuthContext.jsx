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

  useEffect(() => {
    // Check initial Supabase Session or Local Session
    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setUser(session.user);
          setIsAdmin(true);
          return;
        }
      } catch (err) {
        console.warn('Supabase Auth Session check notice:', err.message);
      }

      // Check Local Admin Session
      const storedAdmin = localStorage.getItem('samarth_admin_session');
      if (storedAdmin === 'true') {
        setIsAdmin(true);
        setUser({ email: ADMIN_EMAIL, name: 'Samarth Master Admin' });
      }
      setLoading(false);
    }

    checkSession();

    // Listen for Auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setIsAdmin(true);
      } else {
        const storedAdmin = localStorage.getItem('samarth_admin_session');
        if (storedAdmin === 'true') {
          setIsAdmin(true);
          setUser({ email: ADMIN_EMAIL, name: 'Samarth Master Admin' });
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

    const isMatchUser = ALLOWED_ADMIN_USERS.includes(cleanEmail) || 
                         cleanEmail.includes('admin') || 
                         cleanEmail.includes('pawansingh') || 
                         cleanEmail.includes('samarth');

    if (!isMatchUser && cleanEmail !== '') {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      if (newAttempts >= 5) {
        setLockoutTime(now + 60000); // 60s lockout
        setFailedAttempts(0);
        return { success: false, message: 'Too many invalid attempts. Rate limit triggered for 60 seconds.' };
      }
      return { success: false, message: 'Unrecognized Admin Email/Username. Access Denied.' };
    }

    // 1. Attempt Supabase Auth login if email format is used
    if (cleanEmail.includes('@')) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password: cleanPass
        });

        if (!error && data?.user) {
          setUser(data.user);
          setIsAdmin(true);
          setFailedAttempts(0);
          localStorage.setItem('samarth_admin_session', 'true');
          return { success: true };
        }
      } catch (err) {
        console.warn('Supabase Auth login notice:', err.message);
      }
    }

    // 2. Validate against system credentials fallback
    const validPasswords = ['Pavan@1137', 'pavan@1137', 'samarth123', 'admin123', 'admin', 'Pavan@3760'];
    const passMatch = validPasswords.includes(cleanPass) || cleanPass.toLowerCase() === 'pavan@1137';

    if (passMatch) {
      const mockUser = { email: ADMIN_EMAIL, name: 'Samarth Master Admin', id: 'admin-master' };
      setUser(mockUser);
      setIsAdmin(true);
      setFailedAttempts(0);
      localStorage.setItem('samarth_admin_session', 'true');
      return { success: true };
    }

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
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('Logout notice:', err.message);
    }
    localStorage.removeItem('samarth_admin_session');
    setUser(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
