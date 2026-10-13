import type { ThresholdConfig } from '@/types';

export const DEFAULT_THRESHOLDS: Record<string, ThresholdConfig> = {
  academic: { lowMax: 40, averageMax: 70 },
  aptitude: { lowMax: 40, averageMax: 70 },
  interest: { lowMax: 40, averageMax: 70 },
  skill: { lowMax: 40, averageMax: 70 },
  personality: { lowMax: 40, averageMax: 70 },
  gwa: { lowMax: 75, averageMax: 88 },
  subject: { lowMax: 75, averageMax: 88 },
};

export const THRESHOLD_LABELS: Record<string, { title: string; description: string; max: number }> = {
  academic: { title: 'Academic Aptitude', description: 'Verbal, numerical, and abstract reasoning', max: 100 },
  aptitude: { title: 'Program Aptitude', description: 'Readiness for specific program areas', max: 100 },
  interest: { title: 'Interest Inventory (RIASEC)', description: 'Holland RIASEC themes', max: 100 },
  skill: { title: 'Skills & Readiness', description: 'Study skills, time management, resilience', max: 100 },
  personality: { title: 'Personality (Big Five)', description: 'OCEAN traits', max: 100 },
  gwa: { title: 'GWA (General Weighted Average)', description: 'Overall academic performance', max: 99 },
  subject: { title: 'Subject Grades', description: 'Individual subject performance', max: 99 },
};
