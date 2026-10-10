import type { ModelResults } from '@/types';
import { PROGRAMS } from '@/mock/training-data';

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

export { PROGRAMS };
