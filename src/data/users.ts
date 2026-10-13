import type { SessionUser, Strand, Track } from '@/utils/types';

export const SEED_USERS: SessionUser[] = [
  {
    id: 'stu-001',
    name: 'Maria Santos',
    email: 'maria.santos@school.ph',
    role: 'student',
    track: 'Academic',
    strand: 'STEM',
    gradeLevel: 'Grade 12',
    hasProfile: true,
    hasAssessment: true,
    hasResults: true,
  },
  {
    id: 'cou-001',
    name: 'Mr. Jaime Reyes',
    email: 'j.reyes@school.ph',
    role: 'counselor',
    hasProfile: false,
    hasAssessment: false,
    hasResults: false,
  },
  {
    id: 'adm-001',
    name: 'Dr. Elena Cruz',
    email: 'e.cruz@school.ph',
    role: 'admin',
    hasProfile: false,
    hasAssessment: false,
    hasResults: false,
  },
];

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  strand: Strand;
  track: Track;
  gradeLevel: 'Grade 11' | 'Grade 12';
  hasProfile: boolean;
  hasAssessment: boolean;
  hasResults: boolean;
  completedAt: string | null;
}

export const MOCK_STUDENTS: StudentRecord[] = [
  { id: 'stu-001', name: 'Maria Santos', email: 'maria.santos@school.ph', strand: 'STEM', track: 'Academic', gradeLevel: 'Grade 12', hasProfile: true, hasAssessment: true, hasResults: true, completedAt: '2024-03-10T14:30:00Z' },
  { id: 'stu-002', name: 'Juan Dela Cruz', email: 'juan.delacruz@school.ph', strand: 'ABM', track: 'Academic', gradeLevel: 'Grade 12', hasProfile: true, hasAssessment: true, hasResults: false, completedAt: null },
  { id: 'stu-003', name: 'Ana Lim', email: 'ana.lim@school.ph', strand: 'HUMSS', track: 'Academic', gradeLevel: 'Grade 11', hasProfile: false, hasAssessment: false, hasResults: false, completedAt: null },
  { id: 'stu-004', name: 'Carlos Garcia', email: 'carlos.garcia@school.ph', strand: 'ICT', track: 'Tech-Pro', gradeLevel: 'Grade 12', hasProfile: true, hasAssessment: true, hasResults: true, completedAt: '2024-03-08T09:15:00Z' },
  { id: 'stu-005', name: 'Liza Mendoza', email: 'liza.mendoza@school.ph', strand: 'GAS', track: 'Academic', gradeLevel: 'Grade 11', hasProfile: true, hasAssessment: false, hasResults: false, completedAt: null },
  { id: 'stu-006', name: 'Patrick Ong', email: 'patrick.ong@school.ph', strand: 'STEM', track: 'Academic', gradeLevel: 'Grade 12', hasProfile: true, hasAssessment: true, hasResults: true, completedAt: '2024-03-12T11:00:00Z' },
  { id: 'stu-007', name: 'Sofia Ramos', email: 'sofia.ramos@school.ph', strand: 'HUMSS', track: 'Academic', gradeLevel: 'Grade 12', hasProfile: true, hasAssessment: true, hasResults: false, completedAt: null },
  { id: 'stu-008', name: 'Diego Torres', email: 'diego.torres@school.ph', strand: 'ICT', track: 'Tech-Pro', gradeLevel: 'Grade 11', hasProfile: false, hasAssessment: false, hasResults: false, completedAt: null },
  { id: 'stu-009', name: 'Bianca Reyes', email: 'bianca.reyes@school.ph', strand: 'ABM', track: 'Academic', gradeLevel: 'Grade 12', hasProfile: true, hasAssessment: true, hasResults: true, completedAt: '2024-03-09T16:45:00Z' },
  { id: 'stu-010', name: 'Marco Villanueva', email: 'marco.v@school.ph', strand: 'HE', track: 'Tech-Pro', gradeLevel: 'Grade 12', hasProfile: true, hasAssessment: false, hasResults: false, completedAt: null },
  { id: 'stu-011', name: 'Tina Aquino', email: 'tina.aquino@school.ph', strand: 'HUMSS', track: 'Academic', gradeLevel: 'Grade 11', hasProfile: true, hasAssessment: true, hasResults: false, completedAt: null },
  { id: 'stu-012', name: 'Ramon Castro', email: 'ramon.castro@school.ph', strand: 'STEM', track: 'Academic', gradeLevel: 'Grade 12', hasProfile: true, hasAssessment: true, hasResults: true, completedAt: '2024-03-11T13:20:00Z' },
];

export interface ManagedUser {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'counselor' | 'admin';
  strand?: Strand;
  track?: Track;
  gradeLevel?: 'Grade 11' | 'Grade 12';
  status: 'active' | 'disabled';
  createdAt: string;
}

export const MOCK_MANAGED_USERS: ManagedUser[] = [
  { id: 'stu-001', name: 'Maria Santos', email: 'maria.santos@school.ph', role: 'student', strand: 'STEM', track: 'Academic', gradeLevel: 'Grade 12', status: 'active', createdAt: '2024-01-15' },
  { id: 'stu-002', name: 'Juan Dela Cruz', email: 'juan.delacruz@school.ph', role: 'student', strand: 'ABM', track: 'Academic', gradeLevel: 'Grade 12', status: 'active', createdAt: '2024-01-15' },
  { id: 'stu-003', name: 'Ana Lim', email: 'ana.lim@school.ph', role: 'student', strand: 'HUMSS', track: 'Academic', gradeLevel: 'Grade 11', status: 'active', createdAt: '2024-01-20' },
  { id: 'stu-004', name: 'Carlos Garcia', email: 'carlos.garcia@school.ph', role: 'student', strand: 'ICT', track: 'Tech-Pro', gradeLevel: 'Grade 12', status: 'active', createdAt: '2024-01-20' },
  { id: 'stu-005', name: 'Liza Mendoza', email: 'liza.mendoza@school.ph', role: 'student', strand: 'GAS', track: 'Academic', gradeLevel: 'Grade 11', status: 'active', createdAt: '2024-01-22' },
  { id: 'stu-006', name: 'Patrick Ong', email: 'patrick.ong@school.ph', role: 'student', strand: 'STEM', track: 'Academic', gradeLevel: 'Grade 12', status: 'active', createdAt: '2024-01-22' },
  { id: 'stu-007', name: 'Sofia Ramos', email: 'sofia.ramos@school.ph', role: 'student', strand: 'HUMSS', track: 'Academic', gradeLevel: 'Grade 12', status: 'active', createdAt: '2024-02-01' },
  { id: 'stu-008', name: 'Diego Torres', email: 'diego.torres@school.ph', role: 'student', strand: 'ICT', track: 'Tech-Pro', gradeLevel: 'Grade 11', status: 'disabled', createdAt: '2024-02-01' },
  { id: 'cou-001', name: 'Mr. Jaime Reyes', email: 'j.reyes@school.ph', role: 'counselor', status: 'active', createdAt: '2023-08-10' },
  { id: 'cou-002', name: 'Ms. Patricia Lim', email: 'p.lim@school.ph', role: 'counselor', status: 'active', createdAt: '2023-08-10' },
  { id: 'adm-001', name: 'Dr. Elena Cruz', email: 'e.cruz@school.ph', role: 'admin', status: 'active', createdAt: '2023-06-01' },
  { id: 'stu-009', name: 'Bianca Reyes', email: 'bianca.reyes@school.ph', role: 'student', strand: 'ABM', track: 'Academic', gradeLevel: 'Grade 12', status: 'active', createdAt: '2024-02-10' },
];
