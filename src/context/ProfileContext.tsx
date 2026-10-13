import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { AcademicProfile } from '@/utils/types';

interface ProfileContextValue {
  profile: AcademicProfile | null;
  saveProfile: (p: AcademicProfile) => void;
  clearProfile: () => void;
}

const ProfileContext = createContext<ProfileContextValue | null>(null);

export function ProfileProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState<AcademicProfile | null>(null);

  const saveProfile = useCallback((p: AcademicProfile) => setProfile(p), []);
  const clearProfile = useCallback(() => setProfile(null), []);

  return (
    <ProfileContext.Provider value={{ profile, saveProfile, clearProfile }}>
      {children}
    </ProfileContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used within ProfileProvider');
  return ctx;
}
