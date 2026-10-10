import type { Strand, Track } from '@/types';

export const STRANDS_BY_TRACK: Record<Track, Strand[]> = {
  Academic: ['STEM', 'ABM', 'HUMSS', 'GAS'],
  'Tech-Pro': ['ICT', 'HE', 'IA'],
};

export const STRAND_LABELS: Record<Strand, string> = {
  STEM: 'STEM — Science, Technology, Engineering & Mathematics',
  ABM: 'ABM — Accountancy, Business & Management',
  HUMSS: 'HUMSS — Humanities & Social Sciences',
  GAS: 'GAS — General Academic Strand',
  ICT: 'ICT — Information & Communications Technology',
  HE: 'HE — Home Economics',
  IA: 'IA — Industrial Arts',
};

export const TRACK_LABELS: Record<Track, string> = {
  Academic: 'Academic Track',
  'Tech-Pro': 'Tech-Pro (TVL) Track',
};

export const ACADEMIC_SUBJECTS: Record<Track, string[]> = {
  Academic: ['English', 'Filipino', 'Mathematics', 'Science', 'Social Studies', 'Core Science'],
  'Tech-Pro': ['English', 'Filipino', 'Mathematics', 'ICT / Specialized', 'Entrepreneurship', 'Shop Work'],
};

export const PHILIPPINE_UNIVERSITIES = [
  'University of the Philippines',
  'De La Salle University',
  'Ateneo de Manila University',
  'University of Santo Tomas',
  'Polytechnic University of the Philippines',
  'Mindanao State University',
  'University of the East',
  'Far Eastern University',
  'Philippine Normal University',
  'Technological Institute of the Philippines',
  'Mapua University',
  'Bulacan State University',
];
