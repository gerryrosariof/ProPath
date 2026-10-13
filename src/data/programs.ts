export interface CollegeProgram {
  id: string;
  name: string;
  field: string;
  description: string;
  targetStrands: string[];
  careerOutcomes: string[];
  duration: string;
  status: 'active' | 'inactive';
}

export const MOCK_PROGRAMS: CollegeProgram[] = [
  {
    id: 'prog-001',
    name: 'BS Computer Science',
    field: 'Computing & Technology',
    description: 'Covers algorithms, software engineering, data structures, and computer systems.',
    targetStrands: ['STEM', 'ICT'],
    careerOutcomes: ['Software Engineer', 'Data Analyst', 'Systems Developer', 'AI/ML Specialist'],
    duration: '4 years',
    status: 'active',
  },
  {
    id: 'prog-002',
    name: 'BS Civil Engineering',
    field: 'Engineering',
    description: 'Structural design, construction, geotechnics, and transportation engineering.',
    targetStrands: ['STEM'],
    careerOutcomes: ['Structural Engineer', 'Project Manager', 'Urban Planner', 'Construction Consultant'],
    duration: '5 years',
    status: 'active',
  },
  {
    id: 'prog-003',
    name: 'BS Nursing',
    field: 'Health Sciences',
    description: 'Patient care, health assessment, clinical practice, and community health.',
    targetStrands: ['STEM', 'HUMSS'],
    careerOutcomes: ['Registered Nurse', 'Public Health Worker', 'Clinical Coordinator', 'Nurse Educator'],
    duration: '4 years',
    status: 'active',
  },
  {
    id: 'prog-004',
    name: 'BS Accountancy',
    field: 'Business & Finance',
    description: 'Financial accounting, auditing, taxation, and business law.',
    targetStrands: ['ABM'],
    careerOutcomes: ['CPA', 'Auditor', 'Financial Analyst', 'Tax Consultant'],
    duration: '5 years',
    status: 'active',
  },
  {
    id: 'prog-005',
    name: 'BA Communication',
    field: 'Media & Communication',
    description: 'Journalism, broadcasting, media production, and corporate communications.',
    targetStrands: ['HUMSS', 'GAS'],
    careerOutcomes: ['Journalist', 'PR Specialist', 'Media Producer', 'Content Writer'],
    duration: '4 years',
    status: 'active',
  },
  {
    id: 'prog-006',
    name: 'BS Information Technology',
    field: 'Computing & Technology',
    description: 'Networks, systems administration, cybersecurity, and IT project management.',
    targetStrands: ['ICT', 'STEM'],
    careerOutcomes: ['Network Administrator', 'IT Consultant', 'Systems Analyst', 'Cybersecurity Specialist'],
    duration: '4 years',
    status: 'active',
  },
  {
    id: 'prog-007',
    name: 'BS Psychology',
    field: 'Social Sciences',
    description: 'Cognitive, developmental, and clinical psychology with research methods.',
    targetStrands: ['HUMSS', 'STEM'],
    careerOutcomes: ['Guidance Counselor', 'HR Specialist', 'Behavioral Researcher', 'Mental Health Worker'],
    duration: '4 years',
    status: 'active',
  },
  {
    id: 'prog-008',
    name: 'BS Education',
    field: 'Education',
    description: 'Teaching methods, curriculum development, and educational psychology.',
    targetStrands: ['HUMSS', 'GAS'],
    careerOutcomes: ['Teacher', 'Curriculum Developer', 'School Administrator', 'Education Consultant'],
    duration: '4 years',
    status: 'active',
  },
];
