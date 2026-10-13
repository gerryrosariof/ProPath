import type {
  AssessmentAnswers,
  AcademicProfile,
  CategorizedAttribute,
  CategorizedProfile,
  Category,
  RiasecCode,
  ThresholdConfig,
} from '@/types';
import { ASSESSMENT_INSTRUMENTS } from '@/mock/assessments';
import { DEFAULT_THRESHOLDS } from '@/mock/thresholds';

export function categorize(normalizedPct: number, threshold: ThresholdConfig): Category {
  if (normalizedPct < threshold.lowMax) return 'Low';
  if (normalizedPct < threshold.averageMax) return 'Average';
  return 'High';
}

function computeInstrumentScores(
  answers: AssessmentAnswers,
  instrumentId: string,
): Record<string, number> {
  const instrument = ASSESSMENT_INSTRUMENTS.find((i) => i.id === instrumentId);
  if (!instrument) return {};

  const instrumentAnswers = answers[instrumentId] ?? {};
  const traitTotals: Record<string, number> = {};
  const traitCounts: Record<string, number> = {};

  for (const question of instrument.questions) {
    const answerValue = instrumentAnswers[question.id];
    if (answerValue === undefined) continue;
    for (const option of question.options) {
      if (option.value === answerValue && option.trait) {
        const trait = option.trait;
        traitTotals[trait] = (traitTotals[trait] ?? 0) + answerValue;
        traitCounts[trait] = (traitCounts[trait] ?? 0) + 1;
      }
    }
  }

  const result: Record<string, number> = {};
  for (const trait of Object.keys(traitTotals)) {
    result[trait] = traitTotals[trait] / traitCounts[trait];
  }
  return result;
}

function normalizeToPct(rawScore: number, maxScore: number): number {
  if (maxScore <= 0) return 0;
  return Math.round((rawScore / maxScore) * 100);
}

const TRAIT_LABELS: Record<string, string> = {
  verbal: 'Verbal Reasoning',
  numerical: 'Numerical Reasoning',
  abstract: 'Abstract Reasoning',
  STEM: 'STEM Aptitude',
  Health: 'Health Sciences Aptitude',
  Business: 'Business Aptitude',
  Humanities: 'Humanities Aptitude',
  Arts: 'Arts Aptitude',
  IT: 'IT Aptitude',
  Realistic: 'Realistic',
  Investigative: 'Investigative',
  Artistic: 'Artistic',
  Social: 'Social',
  Enterprising: 'Enterprising',
  Conventional: 'Conventional',
  time_management: 'Time Management',
  study_skills: 'Study Skills',
  research: 'Research Skills',
  collaboration: 'Collaboration',
  readiness: 'College Readiness',
  resilience: 'Resilience',
  Openness: 'Openness',
  Conscientiousness: 'Conscientiousness',
  Extraversion: 'Extraversion',
  Agreeableness: 'Agreeableness',
  Neuroticism: 'Neuroticism',
};

export function getTraitLabel(trait: string): string {
  return TRAIT_LABELS[trait] ?? trait;
}

function buildAttributes(
  scores: Record<string, number>,
  maxPerItem: number,
  threshold: ThresholdConfig,
  source: string,
): CategorizedAttribute[] {
  return Object.entries(scores).map(([trait, rawScore]) => {
    const normalizedPct = normalizeToPct(rawScore, maxPerItem);
    return {
      label: getTraitLabel(trait),
      rawScore: Math.round(rawScore * 100) / 100,
      maxScore: maxPerItem,
      normalizedPct,
      category: categorize(normalizedPct, threshold),
      source,
    };
  });
}

function computeRiasecTop3(scores: Record<string, number>): RiasecCode[] {
  const riasecTraits = ['Realistic', 'Investigative', 'Artistic', 'Social', 'Enterprising', 'Conventional'];
  const riasecLetters: Record<string, string> = {
    Realistic: 'R',
    Investigative: 'I',
    Artistic: 'A',
    Social: 'S',
    Enterprising: 'E',
    Conventional: 'C',
  };

  return riasecTraits
    .filter((t) => scores[t] !== undefined)
    .map((t) => ({ code: riasecLetters[t], trait: t, score: scores[t] }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export function categorizeProfile(
  answers: AssessmentAnswers,
  profile: AcademicProfile | null,
  thresholds: Record<string, ThresholdConfig> = DEFAULT_THRESHOLDS,
): CategorizedProfile {
  const academicScores = computeInstrumentScores(answers, 'academic');
  const aptitudeScores = computeInstrumentScores(answers, 'aptitude');
  const interestScores = computeInstrumentScores(answers, 'interest');
  const skillScores = computeInstrumentScores(answers, 'skill');
  const personalityScores = computeInstrumentScores(answers, 'personality');

  const academic = buildAttributes(academicScores, 5, thresholds.academic, 'Academic Aptitude Test');
  const aptitude = buildAttributes(aptitudeScores, 5, thresholds.aptitude, 'Program Aptitude Test');
  const interest = buildAttributes(interestScores, 5, thresholds.interest, 'Interest Inventory');
  const skill = buildAttributes(skillScores, 5, thresholds.skill, 'Skills & Readiness');
  const personality = buildAttributes(personalityScores, 5, thresholds.personality, 'Personality Test');

  const riasecTop3 = computeRiasecTop3(interestScores);

  let gwaCategory: Category = 'Low';
  let gwaValue = 0;
  let subjectCategories: CategorizedAttribute[] = [];

  if (profile) {
    gwaValue = profile.gwa;
    const gwaPct = normalizeToPct(profile.gwa, 99);
    gwaCategory = categorize(gwaPct, thresholds.gwa);

    subjectCategories = profile.subjectGrades.map((sg) => {
      const pct = normalizeToPct(sg.grade, 99);
      return {
        label: sg.subject,
        rawScore: sg.grade,
        maxScore: 99,
        normalizedPct: pct,
        category: categorize(pct, thresholds.subject),
        source: 'Academic Record',
      };
    });
  }

  return {
    academic,
    aptitude,
    interest,
    skill,
    personality,
    riasecTop3,
    gwaCategory,
    gwaValue,
    subjectCategories,
  };
}

export function generateMockAnswers(): AssessmentAnswers {
  const answers: AssessmentAnswers = {};
  for (const instrument of ASSESSMENT_INSTRUMENTS) {
    answers[instrument.id] = {};
    for (const question of instrument.questions) {
      const correctOption = question.options.reduce((best, opt) =>
        opt.value > best.value ? opt : best,
      );
      answers[instrument.id][question.id] = correctOption.value;
    }
  }
  return answers;
}

export function generateMockProfile(): AcademicProfile {
  return {
    track: 'Academic',
    strand: 'STEM',
    gradeLevel: 'Grade 12',
    gwa: 90.5,
    subjectGrades: [
      { subject: 'English', grade: 92 },
      { subject: 'Filipino', grade: 90 },
      { subject: 'Mathematics', grade: 94 },
      { subject: 'Science', grade: 93 },
      { subject: 'Social Studies', grade: 88 },
      { subject: 'Core Science', grade: 91 },
    ],
    targetSchools: ['University of the Philippines', 'De La Salle University'],
  };
}
