import { createContext, useContext, useState, useEffect } from 'react';
import { ROLES } from '../data/roles';

const AuthContext = createContext(null);
const STORAGE_KEY = 'fba_connect_session';

export function AuthProvider({ children }) {
  const [session, setSession] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    if (session) localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    else localStorage.removeItem(STORAGE_KEY);
  }, [session]);

  // Demo login: rol tanlash orqali (real loyihada telefon/parol → token)
  function login(role, name) {
    if (!ROLES[role]) return false;
    setSession({ role, name: name || ROLES[role].label, loggedAt: Date.now() });
    return true;
  }

  function logout() {
    setSession(null);
  }

  return (
    <AuthContext.Provider value={{ session, login, logout, isStaff: session && session.role !== 'student' }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
