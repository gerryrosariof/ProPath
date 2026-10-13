import type { TrainingRecord, ModelResults, DecisionTreeNode, DecisionRule } from '@/utils/types';

export const PROGRAMS = [
  'BS Computer Science',
  'BS Civil Engineering',
  'BS Nursing',
  'BS Accountancy',
  'BA Communication',
  'BS Information Technology',
  'BS Psychology',
  'BS Education',
] as const;

export const MOCK_TRAINING_DATA: TrainingRecord[] = [
  { id: 'TR-001', studentName: 'Angela Reyes', strand: 'STEM', track: 'Academic', gwaCategory: 'High', verbalCategory: 'High', numericalCategory: 'High', abstractCategory: 'High', riasecTop: 'I', skillCategory: 'High', openness: 'High', conscientiousness: 'High', actualProgram: 'BS Computer Science', year: '2023' },
  { id: 'TR-002', studentName: 'Bernard Cruz', strand: 'STEM', track: 'Academic', gwaCategory: 'High', verbalCategory: 'Average', numericalCategory: 'High', abstractCategory: 'High', riasecTop: 'I', skillCategory: 'High', openness: 'Average', conscientiousness: 'High', actualProgram: 'BS Civil Engineering', year: '2023' },
  { id: 'TR-003', studentName: 'Carmela Tan', strand: 'STEM', track: 'Academic', gwaCategory: 'High', verbalCategory: 'High', numericalCategory: 'Average', abstractCategory: 'Average', riasecTop: 'S', skillCategory: 'High', openness: 'High', conscientiousness: 'High', actualProgram: 'BS Nursing', year: '2023' },
  { id: 'TR-004', studentName: 'Diego Lim', strand: 'ABM', track: 'Academic', gwaCategory: 'High', verbalCategory: 'High', numericalCategory: 'High', abstractCategory: 'Average', riasecTop: 'E', skillCategory: 'High', openness: 'Average', conscientiousness: 'High', actualProgram: 'BS Accountancy', year: '2023' },
  { id: 'TR-005', studentName: 'Erika Santos', strand: 'HUMSS', track: 'Academic', gwaCategory: 'High', verbalCategory: 'High', numericalCategory: 'Average', abstractCategory: 'Low', riasecTop: 'A', skillCategory: 'Average', openness: 'High', conscientiousness: 'Average', actualProgram: 'BA Communication', year: '2023' },
  { id: 'TR-006', studentName: 'Francis Ong', strand: 'ICT', track: 'Tech-Pro', gwaCategory: 'Average', verbalCategory: 'Average', numericalCategory: 'High', abstractCategory: 'High', riasecTop: 'I', skillCategory: 'High', openness: 'High', conscientiousness: 'Average', actualProgram: 'BS Information Technology', year: '2023' },
  { id: 'TR-007', studentName: 'Grace Dela Cruz', strand: 'HUMSS', track: 'Academic', gwaCategory: 'Average', verbalCategory: 'High', numericalCategory: 'Low', abstractCategory: 'Average', riasecTop: 'S', skillCategory: 'Average', openness: 'High', conscientiousness: 'High', actualProgram: 'BS Psychology', year: '2023' },
  { id: 'TR-008', studentName: 'Hector Villanueva', strand: 'HUMSS', track: 'Academic', gwaCategory: 'Average', verbalCategory: 'High', numericalCategory: 'Low', abstractCategory: 'Low', riasecTop: 'S', skillCategory: 'Average', openness: 'Average', conscientiousness: 'High', actualProgram: 'BS Education', year: '2023' },
  { id: 'TR-009', studentName: 'Isabela Ramos', strand: 'STEM', track: 'Academic', gwaCategory: 'High', verbalCategory: 'Average', numericalCategory: 'High', abstractCategory: 'High', riasecTop: 'I', skillCategory: 'High', openness: 'High', conscientiousness: 'Average', actualProgram: 'BS Computer Science', year: '2023' },
  { id: 'TR-010', studentName: 'Jared Pineda', strand: 'STEM', track: 'Academic', gwaCategory: 'Average', verbalCategory: 'Average', numericalCategory: 'High', abstractCategory: 'High', riasecTop: 'R', skillCategory: 'Average', openness: 'Average', conscientiousness: 'High', actualProgram: 'BS Civil Engineering', year: '2023' },
  { id: 'TR-011', studentName: 'Katrina Lopez', strand: 'STEM', track: 'Academic', gwaCategory: 'High', verbalCategory: 'High', numericalCategory: 'Average', abstractCategory: 'Average', riasecTop: 'S', skillCategory: 'High', openness: 'High', conscientiousness: 'High', actualProgram: 'BS Nursing', year: '2022' },
  { id: 'TR-012', studentName: 'Lawrence Tan', strand: 'ABM', track: 'Academic', gwaCategory: 'Average', verbalCategory: 'High', numericalCategory: 'High', abstractCategory: 'Average', riasecTop: 'E', skillCategory: 'Average', openness: 'Average', conscientiousness: 'High', actualProgram: 'BS Accountancy', year: '2022' },
  { id: 'TR-013', studentName: 'Maya Aquino', strand: 'HUMSS', track: 'Academic', gwaCategory: 'High', verbalCategory: 'High', numericalCategory: 'Average', abstractCategory: 'Low', riasecTop: 'A', skillCategory: 'High', openness: 'High', conscientiousness: 'Average', actualProgram: 'BA Communication', year: '2022' },
  { id: 'TR-014', studentName: 'Nathan Garcia', strand: 'ICT', track: 'Tech-Pro', gwaCategory: 'Average', verbalCategory: 'Average', numericalCategory: 'High', abstractCategory: 'High', riasecTop: 'I', skillCategory: 'Average', openness: 'High', conscientiousness: 'Average', actualProgram: 'BS Information Technology', year: '2022' },
  { id: 'TR-015', studentName: 'Olivia Bautista', strand: 'HUMSS', track: 'Academic', gwaCategory: 'High', verbalCategory: 'High', numericalCategory: 'Average', abstractCategory: 'Average', riasecTop: 'S', skillCategory: 'High', openness: 'High', conscientiousness: 'High', actualProgram: 'BS Psychology', year: '2022' },
  { id: 'TR-016', studentName: 'Paolo Domingo', strand: 'HUMSS', track: 'Academic', gwaCategory: 'Low', verbalCategory: 'Average', numericalCategory: 'Low', abstractCategory: 'Low', riasecTop: 'S', skillCategory: 'Low', openness: 'Average', conscientiousness: 'Average', actualProgram: 'BS Education', year: '2022' },
  { id: 'TR-017', studentName: 'Quincy Reyes', strand: 'STEM', track: 'Academic', gwaCategory: 'High', verbalCategory: 'High', numericalCategory: 'High', abstractCategory: 'High', riasecTop: 'I', skillCategory: 'High', openness: 'High', conscientiousness: 'High', actualProgram: 'BS Computer Science', year: '2022' },
  { id: 'TR-018', studentName: 'Rica Mendoza', strand: 'STEM', track: 'Academic', gwaCategory: 'Average', verbalCategory: 'Average', numericalCategory: 'High', abstractCategory: 'Average', riasecTop: 'R', skillCategory: 'Average', openness: 'Average', conscientiousness: 'High', actualProgram: 'BS Civil Engineering', year: '2022' },
  { id: 'TR-019', studentName: 'Samuel Castro', strand: 'ABM', track: 'Academic', gwaCategory: 'High', verbalCategory: 'High', numericalCategory: 'High', abstractCategory: 'Average', riasecTop: 'E', skillCategory: 'High', openness: 'High', conscientiousness: 'High', actualProgram: 'BS Accountancy', year: '2022' },
  { id: 'TR-020', studentName: 'Tina Fernandez', strand: 'STEM', track: 'Academic', gwaCategory: 'Average', verbalCategory: 'High', numericalCategory: 'Average', abstractCategory: 'Average', riasecTop: 'S', skillCategory: 'Average', openness: 'High', conscientiousness: 'High', actualProgram: 'BS Nursing', year: '2022' },
  { id: 'TR-021', studentName: 'Ulysses Ramos', strand: 'ICT', track: 'Tech-Pro', gwaCategory: 'Low', verbalCategory: 'Average', numericalCategory: 'Average', abstractCategory: 'High', riasecTop: 'R', skillCategory: 'Average', openness: 'Average', conscientiousness: 'Average', actualProgram: 'BS Information Technology', year: '2022' },
  { id: 'TR-022', studentName: 'Vanessa Lim', strand: 'HUMSS', track: 'Academic', gwaCategory: 'Average', verbalCategory: 'High', numericalCategory: 'Low', abstractCategory: 'Average', riasecTop: 'A', skillCategory: 'Average', openness: 'High', conscientiousness: 'Average', actualProgram: 'BA Communication', year: '2022' },
  { id: 'TR-023', studentName: 'Walter Sy', strand: 'HUMSS', track: 'Academic', gwaCategory: 'Average', verbalCategory: 'High', numericalCategory: 'Low', abstractCategory: 'Low', riasecTop: 'S', skillCategory: 'Average', openness: 'High', conscientiousness: 'High', actualProgram: 'BS Psychology', year: '2021' },
  { id: 'TR-024', studentName: 'Xenia Torres', strand: 'HUMSS', track: 'Academic', gwaCategory: 'Average', verbalCategory: 'Average', numericalCategory: 'Low', abstractCategory: 'Low', riasecTop: 'S', skillCategory: 'Low', openness: 'Average', conscientiousness: 'High', actualProgram: 'BS Education', year: '2021' },
  { id: 'TR-025', studentName: 'Yannick Dela Pena', strand: 'STEM', track: 'Academic', gwaCategory: 'High', verbalCategory: 'Average', numericalCategory: 'High', abstractCategory: 'High', riasecTop: 'I', skillCategory: 'High', openness: 'Average', conscientiousness: 'High', actualProgram: 'BS Computer Science', year: '2021' },
  { id: 'TR-026', studentName: 'Zara Villanueva', strand: 'ABM', track: 'Academic', gwaCategory: 'Average', verbalCategory: 'High', numericalCategory: 'Average', abstractCategory: 'Average', riasecTop: 'E', skillCategory: 'Average', openness: 'Average', conscientiousness: 'High', actualProgram: 'BS Accountancy', year: '2021' },
  { id: 'TR-027', studentName: 'Adrian Bautista', strand: 'STEM', track: 'Academic', gwaCategory: 'High', verbalCategory: 'High', numericalCategory: 'High', abstractCategory: 'High', riasecTop: 'I', skillCategory: 'High', openness: 'High', conscientiousness: 'Average', actualProgram: 'BS Computer Science', year: '2021' },
  { id: 'TR-028', studentName: 'Bianca Cruz', strand: 'STEM', track: 'Academic', gwaCategory: 'Average', verbalCategory: 'High', numericalCategory: 'Average', abstractCategory: 'Average', riasecTop: 'S', skillCategory: 'Average', openness: 'High', conscientiousness: 'High', actualProgram: 'BS Nursing', year: '2021' },
  { id: 'TR-029', studentName: 'Carlos Dimacali', strand: 'ICT', track: 'Tech-Pro', gwaCategory: 'Average', verbalCategory: 'Average', numericalCategory: 'High', abstractCategory: 'High', riasecTop: 'I', skillCategory: 'High', openness: 'High', conscientiousness: 'Average', actualProgram: 'BS Information Technology', year: '2021' },
  { id: 'TR-030', studentName: 'Diana Ong', strand: 'HUMSS', track: 'Academic', gwaCategory: 'High', verbalCategory: 'High', numericalCategory: 'Average', abstractCategory: 'Low', riasecTop: 'A', skillCategory: 'High', openness: 'High', conscientiousness: 'Average', actualProgram: 'BA Communication', year: '2021' },
  { id: 'TR-031', studentName: 'Eugenio Pascual', strand: 'HUMSS', track: 'Academic', gwaCategory: 'Average', verbalCategory: 'High', numericalCategory: 'Low', abstractCategory: 'Average', riasecTop: 'S', skillCategory: 'Average', openness: 'High', conscientiousness: 'High', actualProgram: 'BS Psychology', year: '2021' },
  { id: 'TR-032', studentName: 'Fatima Reyes', strand: 'STEM', track: 'Academic', gwaCategory: 'High', verbalCategory: 'Average', numericalCategory: 'High', abstractCategory: 'High', riasecTop: 'R', skillCategory: 'High', openness: 'Average', conscientiousness: 'High', actualProgram: 'BS Civil Engineering', year: '2021' },
];

export const MOCK_MODEL_RESULTS: ModelResults = {
  accuracy: 0.844,
  totalSamples: 32,
  correctPredictions: 27,
  trainedAt: '2024-03-15T10:30:00Z',
  confusionMatrix: [
    { predicted: 'BS Computer Science', actual: 'BS Computer Science', count: 5 },
    { predicted: 'BS Civil Engineering', actual: 'BS Civil Engineering', count: 4 },
    { predicted: 'BS Civil Engineering', actual: 'BS Computer Science', count: 1 },
    { predicted: 'BS Nursing', actual: 'BS Nursing', count: 4 },
    { predicted: 'BS Accountancy', actual: 'BS Accountancy', count: 4 },
    { predicted: 'BA Communication', actual: 'BA Communication', count: 3 },
    { predicted: 'BS Information Technology', actual: 'BS Information Technology', count: 3 },
    { predicted: 'BS Information Technology', actual: 'BS Computer Science', count: 1 },
    { predicted: 'BS Psychology', actual: 'BS Psychology', count: 3 },
    { predicted: 'BS Psychology', actual: 'BS Education', count: 1 },
    { predicted: 'BS Education', actual: 'BS Education', count: 3 },
    { predicted: 'BS Education', actual: 'BS Nursing', count: 1 },
    { predicted: 'BS Computer Science', actual: 'BS Civil Engineering', count: 1 },
  ],
  programMetrics: [
    { program: 'BS Computer Science', precision: 0.83, recall: 0.83, f1: 0.83, support: 6 },
    { program: 'BS Civil Engineering', precision: 0.80, recall: 0.80, f1: 0.80, support: 5 },
    { program: 'BS Nursing', precision: 0.80, recall: 0.80, f1: 0.80, support: 5 },
    { program: 'BS Accountancy', precision: 1.0, recall: 1.0, f1: 1.0, support: 4 },
    { program: 'BA Communication', precision: 1.0, recall: 1.0, f1: 1.0, support: 3 },
    { program: 'BS Information Technology', precision: 0.75, recall: 0.75, f1: 0.75, support: 4 },
    { program: 'BS Psychology', precision: 0.75, recall: 0.75, f1: 0.75, support: 4 },
    { program: 'BS Education', precision: 0.75, recall: 0.75, f1: 0.75, support: 4 },
  ],
};

export const MOCK_DECISION_TREE: DecisionTreeNode = {
  id: 'node-1',
  type: 'root',
  attribute: 'RIASEC Top Code',
  samples: 32,
  children: [
    {
      id: 'node-2', type: 'branch', attribute: 'RIASEC Top Code', condition: 'Investigative (I)', samples: 12,
      children: [
        {
          id: 'node-3', type: 'branch', attribute: 'Numerical Reasoning', condition: 'High', samples: 8,
          children: [
            {
              id: 'node-4', type: 'branch', attribute: 'Strand', condition: 'STEM', samples: 6,
              children: [
                { id: 'node-5', type: 'leaf', condition: 'STEM', program: 'BS Computer Science', confidence: 0.83, samples: 5 },
                { id: 'node-6', type: 'leaf', condition: 'ICT', program: 'BS Information Technology', confidence: 0.75, samples: 1 },
              ],
            },
            { id: 'node-7', type: 'leaf', condition: 'Not STEM/ICT', program: 'BS Civil Engineering', confidence: 0.80, samples: 2 },
          ],
        },
        { id: 'node-8', type: 'leaf', condition: 'Average or Low', program: 'BS Information Technology', confidence: 0.67, samples: 4 },
      ],
    },
    {
      id: 'node-9', type: 'branch', attribute: 'RIASEC Top Code', condition: 'Social (S)', samples: 10,
      children: [
        {
          id: 'node-10', type: 'branch', attribute: 'GWA Category', condition: 'High', samples: 5,
          children: [
            { id: 'node-11', type: 'leaf', condition: 'High', program: 'BS Nursing', confidence: 0.80, samples: 3 },
            { id: 'node-12', type: 'leaf', condition: 'Average', program: 'BS Psychology', confidence: 0.75, samples: 2 },
          ],
        },
        { id: 'node-13', type: 'leaf', condition: 'Average or Low', program: 'BS Education', confidence: 0.80, samples: 5 },
      ],
    },
    {
      id: 'node-14', type: 'branch', attribute: 'RIASEC Top Code', condition: 'Enterprising (E)', samples: 4,
      children: [
        { id: 'node-15', type: 'leaf', condition: 'Enterprising (E)', program: 'BS Accountancy', confidence: 0.88, samples: 4 },
      ],
    },
    {
      id: 'node-16', type: 'branch', attribute: 'RIASEC Top Code', condition: 'Artistic (A)', samples: 3,
      children: [
        { id: 'node-17', type: 'leaf', condition: 'Artistic (A)', program: 'BA Communication', confidence: 0.82, samples: 3 },
      ],
    },
    {
      id: 'node-18', type: 'branch', attribute: 'RIASEC Top Code', condition: 'Realistic (R)', samples: 3,
      children: [
        { id: 'node-19', type: 'leaf', condition: 'Realistic (R)', program: 'BS Civil Engineering', confidence: 0.72, samples: 3 },
      ],
    },
  ],
};

export const MOCK_DECISION_RULES: DecisionRule[] = [
  { id: 'rule-1', conditions: ['RIASEC Top = Investigative (I)', 'Numerical Reasoning = High', 'Strand = STEM'], program: 'BS Computer Science', confidence: 0.83, coverage: 15.6 },
  { id: 'rule-2', conditions: ['RIASEC Top = Investigative (I)', 'Numerical Reasoning = High', 'Strand = ICT'], program: 'BS Information Technology', confidence: 0.75, coverage: 3.1 },
  { id: 'rule-3', conditions: ['RIASEC Top = Investigative (I)', 'Numerical Reasoning = High', 'Strand = Other'], program: 'BS Civil Engineering', confidence: 0.80, coverage: 6.3 },
  { id: 'rule-4', conditions: ['RIASEC Top = Investigative (I)', 'Numerical Reasoning = Average or Low'], program: 'BS Information Technology', confidence: 0.67, coverage: 12.5 },
  { id: 'rule-5', conditions: ['RIASEC Top = Social (S)', 'GWA = High'], program: 'BS Nursing', confidence: 0.80, coverage: 9.4 },
  { id: 'rule-6', conditions: ['RIASEC Top = Social (S)', 'GWA = Average (with high Openness)'], program: 'BS Psychology', confidence: 0.75, coverage: 6.3 },
  { id: 'rule-7', conditions: ['RIASEC Top = Social (S)', 'GWA = Average or Low'], program: 'BS Education', confidence: 0.80, coverage: 15.6 },
  { id: 'rule-8', conditions: ['RIASEC Top = Enterprising (E)'], program: 'BS Accountancy', confidence: 0.88, coverage: 12.5 },
  { id: 'rule-9', conditions: ['RIASEC Top = Artistic (A)'], program: 'BA Communication', confidence: 0.82, coverage: 9.4 },
  { id: 'rule-10', conditions: ['RIASEC Top = Realistic (R)'], program: 'BS Civil Engineering', confidence: 0.72, coverage: 9.4 },
];
