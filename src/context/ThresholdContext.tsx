import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { ThresholdConfig } from '@/utils/types';
import { DEFAULT_THRESHOLDS } from '@/data/thresholds';

interface ThresholdContextValue {
  thresholds: Record<string, ThresholdConfig>;
  updateThreshold: (key: string, config: ThresholdConfig) => void;
  resetThresholds: () => void;
}

const ThresholdContext = createContext<ThresholdContextValue | null>(null);

export function ThresholdProvider({ children }: { children: ReactNode }) {
  const [thresholds, setThresholds] = useState<Record<string, ThresholdConfig>>(DEFAULT_THRESHOLDS);

  const updateThreshold = useCallback((key: string, config: ThresholdConfig) => {
    setThresholds((prev) => ({ ...prev, [key]: config }));
  }, []);

  const resetThresholds = useCallback(() => setThresholds(DEFAULT_THRESHOLDS), []);

  return (
    <ThresholdContext.Provider value={{ thresholds, updateThreshold, resetThresholds }}>
      {children}
    </ThresholdContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useThresholds() {
  const ctx = useContext(ThresholdContext);
  if (!ctx) throw new Error('useThresholds must be used within ThresholdProvider');
  return ctx;
}
