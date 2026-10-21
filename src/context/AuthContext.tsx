import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { Role, SessionUser } from '@/utils/types';
import { SEED_USERS } from '@/data/users';

interface AuthContextValue {
  user: SessionUser | null;
  login: (email: string) => boolean;
  register: (data: { name: string; email: string; role: Role }) => void;
  logout: () => void;
  updateProfileStatus: (key: 'hasProfile' | 'hasAssessment' | 'hasResults', value: boolean) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);

  const login = useCallback((email: string): boolean => {
    const found = SEED_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (found) {
      setUser(found);
      return true;
    }
    return false;
  }, []);

  const register = useCallback((data: { name: string; email: string; role: Role }) => {
    const newUser: SessionUser = {
      id: `new-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      hasProfile: false,
      hasAssessment: false,
      hasResults: false,
    };
    setUser(newUser);
  }, []);

  const logout = useCallback(() => setUser(null), []);

  const updateProfileStatus = useCallback(
    (key: 'hasProfile' | 'hasAssessment' | 'hasResults', value: boolean) => {
      setUser((prev) => (prev ? { ...prev, [key]: value } : prev));
    },
    [],
  );

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfileStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
