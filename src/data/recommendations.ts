export interface DecisionPathStep {
  attribute: string;
  value: string;
  explanation: string;
}

export interface ProgramRecommendation {
  rank: number;
  program: string;
  field: string;
  confidence: number;
  reason: string;
  decisionPath: DecisionPathStep[];
  careerOutcomes: string[];
}

export const MOCK_RECOMMENDATIONS: ProgramRecommendation[] = [
  {
    rank: 1,
    program: 'BS Computer Science',
    field: 'Computing & Technology',
    confidence: 0.83,
    reason:
      'Your High numerical reasoning, Investigative RIASEC interest, and STEM strand strongly align with computer science programs.',
    decisionPath: [
      {
        attribute: 'RIASEC Top Code',
        value: 'Investigative (I)',
        explanation:
          'Your top interest is Investigative, meaning you enjoy analytical, scientific, and problem-solving activities.',
      },
      {
        attribute: 'Numerical Reasoning',
        value: 'High',
        explanation:
          'You scored High in numerical reasoning, indicating strong ability in mathematics and quantitative tasks required for CS coursework.',
      },
      {
        attribute: 'Strand',
        value: 'STEM',
        explanation:
          'Your STEM strand provides the foundational science and math preparation needed for a computer science degree.',
      },
    ],
    careerOutcomes: ['Software Engineer', 'Data Analyst', 'Systems Developer', 'AI/ML Specialist'],
  },
  {
    rank: 2,
    program: 'BS Civil Engineering',
    field: 'Engineering',
    confidence: 0.80,
    reason:
      'Your strong numerical and abstract reasoning combined with Investigative interests point toward engineering disciplines.',
    decisionPath: [
      {
        attribute: 'RIASEC Top Code',
        value: 'Investigative (I)',
        explanation:
          'Your Investigative interest suggests you thrive in analytical and technical problem-solving environments.',
      },
      {
        attribute: 'Numerical Reasoning',
        value: 'High',
        explanation:
          'High numerical ability is essential for engineering computation, physics, and structural analysis.',
      },
      {
        attribute: 'Strand',
        value: 'STEM (alternative path)',
        explanation:
          'While CS is the top match, your STEM background also prepares you well for civil engineering.',
      },
    ],
    careerOutcomes: ['Structural Engineer', 'Project Manager', 'Urban Planner', 'Construction Consultant'],
  },
  {
    rank: 3,
    program: 'BS Information Technology',
    field: 'Computing & Technology',
    confidence: 0.75,
    reason:
      'Your Investigative interest and High abstract reasoning make IT a solid alternative within the technology field.',
    decisionPath: [
      {
        attribute: 'RIASEC Top Code',
        value: 'Investigative (I)',
        explanation:
          'Your Investigative interest aligns with technology roles that require systematic problem-solving.',
      },
      {
        attribute: 'Abstract Reasoning',
        value: 'High',
        explanation:
          'High abstract reasoning supports understanding systems architecture and logical frameworks.',
      },
      {
        attribute: 'Skill Readiness',
        value: 'High',
        explanation:
          'Your High college readiness and study skills indicate you can handle the IT curriculum.',
      },
    ],
    careerOutcomes: ['Network Administrator', 'IT Consultant', 'Systems Analyst', 'Cybersecurity Specialist'],
  },
  {
    rank: 4,
    program: 'BS Nursing',
    field: 'Health Sciences',
    confidence: 0.70,
    reason:
      'Your High GWA and Social interest as a secondary RIASEC trait suggest potential in health-related fields.',
    decisionPath: [
      {
        attribute: 'RIASEC Secondary',
        value: 'Social (S)',
        explanation:
          'Social is your secondary RIASEC trait, indicating you also enjoy helping and caring for others.',
      },
      {
        attribute: 'GWA Category',
        value: 'High (90.5)',
        explanation:
          'Your High GWA of 90.5 meets the academic requirements for competitive nursing programs.',
      },
      {
        attribute: 'Conscientiousness',
        value: 'High',
        explanation:
          'High conscientiousness is a strong predictor of success in disciplined, detail-critical fields like nursing.',
      },
    ],
    careerOutcomes: ['Registered Nurse', 'Public Health Worker', 'Clinical Coordinator', 'Nurse Educator'],
  },
  {
    rank: 5,
    program: 'BS Psychology',
    field: 'Social Sciences',
    confidence: 0.68,
    reason:
      'Your High verbal reasoning and Social/Investigative interest mix suit psychology, which blends science and people.',
    decisionPath: [
      {
        attribute: 'RIASEC Mix',
        value: 'Investigative + Social',
        explanation:
          'Your interest profile blends Investigative and Social themes, matching psychology\'s mix of research and human behavior.',
      },
      {
        attribute: 'Verbal Reasoning',
        value: 'High',
        explanation:
          'High verbal reasoning supports the heavy reading, writing, and communication demands of psychology.',
      },
      {
        attribute: 'Openness',
        value: 'High',
        explanation:
          'High Openness correlates with curiosity about human behavior and abstract thinking patterns.',
      },
    ],
    careerOutcomes: ['Guidance Counselor', 'HR Specialist', 'Behavioral Researcher', 'Mental Health Worker'],
  },
];
