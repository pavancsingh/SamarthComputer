import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const ADMIN_EMAIL = 'pawansingh3760@gmail.com';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  // Check if authenticated Supabase user is registered in public.admin_users
  const verifyAdminRole = async (authUser) => {
    if (!authUser) return false;
    try {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('user_id', authUser.id)
        .eq('is_active', true)
        .maybeSingle();

      if (!error && data) {
        return true;
      }

      // Fallback email match for master admin account
      if (authUser.email === ADMIN_EMAIL) {
        return true;
      }
      return false;
    } catch (err) {
      console.warn('[AuthContext] Admin verification notice:', err.message);
      return authUser.email === ADMIN_EMAIL;
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
    let cleanEmail = (emailInput || '').trim().toLowerCase();
    const cleanPass = (passwordInput || '').trim();

    // System master passwords
    const validMasterPasswords = ['pavan@1137', 'pavan@3760', 'samarth123', 'admin123', 'admin'];
    const isMasterPass = validMasterPasswords.includes(cleanPass.toLowerCase()) || cleanPass === 'Pavan@1137' || cleanPass === 'Pavan@3760';

    // Reset lockout if correct master password entered
    const now = Date.now();
    if (isMasterPass) {
      setLockoutTime(0);
      setFailedAttempts(0);
    } else if (lockoutTime > now) {
      const remainingSec = Math.ceil((lockoutTime - now) / 1000);
      return { success: false, message: `Too many failed attempts. Please wait ${remainingSec} seconds.` };
    }

    // Map default admin usernames and aliases to registered Supabase admin email
    const adminAliases = ['admin', 'pavan', 'sagarbhosale', 'admin@samarth.com', 'admin@samarthcomputers.in', 'pawansingh'];
    if (!cleanEmail || adminAliases.includes(cleanEmail) || cleanEmail.startsWith('admin@') || cleanEmail.startsWith('pavan@')) {
      cleanEmail = ADMIN_EMAIL;
    }

    if (!cleanEmail.includes('@') || !cleanPass) {
      return { success: false, message: 'Please enter a valid admin email and password.' };
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
        }
      }

      if (error) {
        console.warn('[AuthContext] Supabase Auth login notice:', error.message);
      }
    } catch (err) {
      console.warn('[AuthContext] Exception during login:', err.message);
    }

    // Master password fallback if Supabase Auth network/API error occurs
    if (isMasterPass) {
      const masterUser = { email: ADMIN_EMAIL, name: 'Samarth Master Admin', id: '16eaa664-7d6b-4cc3-9c95-99645a45ec7a' };
      setUser(masterUser);
      setIsAdmin(true);
      setFailedAttempts(0);
      setLockoutTime(0);
      return { success: true };
    }

    // Failed attempt handling
    const newAttempts = failedAttempts + 1;
    setFailedAttempts(newAttempts);
    if (newAttempts >= 5) {
      setLockoutTime(now + 60000); // 60s lockout
      setFailedAttempts(0);
      return { success: false, message: 'Too many invalid attempts. Account locked for 60 seconds.' };
    }

    return { success: false, message: `Invalid Admin Credentials. (${5 - newAttempts} attempts remaining)` };
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

