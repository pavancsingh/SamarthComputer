import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const ALLOWED_ADMIN_EMAILS = [
    'pawansingh3760@gmail.com',
    'admin@samarthcomputers.in',
    'admin@samarth.com',
    'admin@samarthcomputers.com'
  ];

  // Check if authenticated Supabase user is registered as an active admin in public.admin_users
  const verifyAdminRole = async (authUser) => {
    if (!authUser || !authUser.id) return false;
    try {
      const authEmail = (authUser.email || '').toLowerCase().trim();

      // 1. Direct query to admin_users table by user_id or email
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, user_id, email, is_active, role')
        .or(`user_id.eq.${authUser.id},email.eq.${authEmail}`)
        .eq('is_active', true)
        .maybeSingle();

      if (!error && data) {
        // Automatically associate auth user_id if null in admin_users
        if (!data.user_id && authUser.id) {
          await supabase
            .from('admin_users')
            .update({ user_id: authUser.id })
            .eq('id', data.id);
        }
        return true;
      }

      // 2. Allow authenticated users matching designated institute admin emails
      if (authEmail && ALLOWED_ADMIN_EMAILS.includes(authEmail)) {
        return true;
      }

      return false;
    } catch (err) {
      console.warn('[AuthContext] Admin verification notice:', err.message);
      const authEmail = (authUser.email || '').toLowerCase().trim();
      return authEmail && ALLOWED_ADMIN_EMAILS.includes(authEmail);
    }
  };

  useEffect(() => {
    async function checkSession() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const isUserAdmin = await verifyAdminRole(session.user);
          setUser(session.user);
          setIsAdmin(isUserAdmin);
        } else {
          setUser(null);
          setIsAdmin(false);
        }
      } catch (err) {
        console.warn('[AuthContext] Session check notice:', err.message);
        setUser(null);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    }

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (session?.user) {
        const isUserAdmin = await verifyAdminRole(session.user);
        setUser(session.user);
        setIsAdmin(isUserAdmin);
      } else {
        setUser(null);
        setIsAdmin(false);
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
    // Check if lockout is currently active
    if (lockoutTime > 0) {
      if (lockoutTime > now) {
        const remainingSec = Math.ceil((lockoutTime - now) / 1000);
        return { success: false, message: `Too many failed attempts. Please wait ${remainingSec} seconds.` };
      } else {
        // Lockout expired, reset counters
        setLockoutTime(0);
        setFailedAttempts(0);
      }
    }

    let cleanEmail = (emailInput || '').trim().toLowerCase();
    const cleanPass = (passwordInput || '').trim();

    if (!cleanEmail || !cleanPass) {
      return { success: false, message: 'Please enter a valid admin email and password.' };
    }

    // Default username shortcuts for admin login
    if (cleanEmail === 'admin' || cleanEmail === 'samarth') {
      cleanEmail = 'admin@samarthcomputers.in';
    } else if (cleanEmail === 'pawansingh' || cleanEmail === 'pavan' || cleanEmail === 'sagarbhosale') {
      cleanEmail = 'pawansingh3760@gmail.com';
    }

    if (!cleanEmail.includes('@')) {
      return { success: false, message: 'Please enter a valid admin email address.' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password: cleanPass
      });

      if (!error && data?.user) {
        const isUserAdmin = await verifyAdminRole(data.user);
        if (isUserAdmin) {
          setUser(data.user);
          setIsAdmin(true);
          setFailedAttempts(0);
          setLockoutTime(0);
          return { success: true };
        } else {
          await supabase.auth.signOut();
          setUser(null);
          setIsAdmin(false);
          return { success: false, message: 'Access Denied: Account lacks active Admin privileges.' };
        }
      }

      if (error) {
        const newAttempts = failedAttempts + 1;
        setFailedAttempts(newAttempts);
        if (newAttempts >= 5) {
          setLockoutTime(now + 60000); // 60s lockout
          setFailedAttempts(0);
          return { success: false, message: 'Too many invalid attempts. Account locked for 60 seconds.' };
        }
        return { success: false, message: error.message || 'Invalid login credentials.' };
      }
    } catch (err) {
      console.warn('[AuthContext] Exception during login:', err.message);
      return { success: false, message: err.message || 'Authentication error occurred.' };
    }

    const newAttempts = failedAttempts + 1;
    setFailedAttempts(newAttempts);
    if (newAttempts >= 5) {
      setLockoutTime(now + 60000);
      setFailedAttempts(0);
      return { success: false, message: 'Too many invalid attempts. Account locked for 60 seconds.' };
    }

    return { success: false, message: 'Invalid Admin Credentials.' };
  };

  const logoutAdmin = async () => {
    setUser(null);
    setIsAdmin(false);
    try {
      await supabase.auth.signOut();
    } catch (err) {
      console.warn('[AuthContext] Logout notice:', err.message);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, loginAdmin, logoutAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

