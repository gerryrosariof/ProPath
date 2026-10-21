export type Role = 'student' | 'counselor' | 'admin';

export type Track = 'Academic' | 'Tech-Pro';

export type Strand =
  | 'STEM'
  | 'ABM'
  | 'HUMSS'
  | 'GAS'
  | 'ICT'
  | 'HE'
  | 'IA';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  strand?: Strand;
  track?: Track;
  gradeLevel?: 'Grade 11' | 'Grade 12';
}

export interface SubjectGrade {
  subject: string;
  grade: number;
}

export interface AcademicProfile {
  track: Track;
  strand: Strand;
  gradeLevel: 'Grade 11' | 'Grade 12';
  gwa: number;
  subjectGrades: SubjectGrade[];
  targetSchools: string[];
}

export type InstrumentId =
  | 'academic'
  | 'aptitude'
  | 'interest'
  | 'skill'
  | 'personality';

export type QuestionType = 'multiple-choice' | 'likert';

export interface QuestionOption {
  label: string;
  value: number;
  trait?: string;
}

export interface Question {
  id: string;
  text: string;
  type: QuestionType;
  options: QuestionOption[];
}

export interface AssessmentInstrument {
  id: InstrumentId;
  title: string;
  shortTitle: string;
  description: string;
  icon: string;
  estimatedMinutes: number;
  questions: Question[];
}

export type InstrumentStatus = 'not-started' | 'in-progress' | 'completed';

export interface AssessmentAnswers {
  [instrumentId: string]: {
    [questionId: string]: number | undefined;
  };
}

export interface AssessmentResult {
  instrumentId: InstrumentId;
  scores: Record<string, number>;
  completedAt: string;
}

export type Category = 'Low' | 'Average' | 'High';

export interface CategorizedAttribute {
  label: string;
  rawScore: number;
  maxScore: number;
  normalizedPct: number;
  category: Category;
  source: string;
}

export interface RiasecCode {
  code: string;
  trait: string;
  score: number;
}

export interface CategorizedProfile {
  academic: CategorizedAttribute[];
  aptitude: CategorizedAttribute[];
  interest: CategorizedAttribute[];
  skill: CategorizedAttribute[];
  personality: CategorizedAttribute[];
  riasecTop3: RiasecCode[];
  gwaCategory: Category;
  gwaValue: number;
  subjectCategories: CategorizedAttribute[];
}

export interface ThresholdConfig {
  lowMax: number;
  averageMax: number;
}

export interface SessionUser extends User {
  hasProfile: boolean;
  hasAssessment: boolean;
  hasResults: boolean;
}

// C4.5 Model Management types

export interface TrainingRecord {
  id: string;
  studentName: string;
  strand: Strand;
  track: Track;
  gwaCategory: Category;
  verbalCategory: Category;
  numericalCategory: Category;
  abstractCategory: Category;
  riasecTop: string;
  skillCategory: Category;
  openness: Category;
  conscientiousness: Category;
  actualProgram: string;
  year: string;
}

export interface ConfusionMatrixEntry {
  predicted: string;
  actual: string;
  count: number;
}

export interface ProgramMetric {
  program: string;
  precision: number;
  recall: number;
  f1: number;
  support: number;
}

export interface ModelResults {
  accuracy: number;
  totalSamples: number;
  correctPredictions: number;
  confusionMatrix: ConfusionMatrixEntry[];
  programMetrics: ProgramMetric[];
  trainedAt: string;
}

export type NodeType = 'root' | 'branch' | 'leaf';

export interface DecisionTreeNode {
  id: string;
  type: NodeType;
  attribute?: string;
  condition?: string;
  program?: string;
  confidence?: number;
  samples?: number;
  children?: DecisionTreeNode[];
}

export interface DecisionRule {
  id: string;
  conditions: string[];
  program: string;
  confidence: number;
  coverage: number;
}
