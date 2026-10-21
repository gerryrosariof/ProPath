import { createContext, useCallback, useContext, useState, type ReactNode } from 'react';
import type { AssessmentAnswers, InstrumentId, InstrumentStatus } from '@/utils/types';
import { ASSESSMENT_INSTRUMENTS } from '@/data/assessments';

interface AssessmentContextValue {
  answers: AssessmentAnswers;
  statuses: Record<InstrumentId, InstrumentStatus>;
  setAnswer: (instrumentId: InstrumentId, questionId: string, value: number) => void;
  getInstrumentStatus: (instrumentId: InstrumentId) => InstrumentStatus;
  markInstrumentCompleted: (instrumentId: InstrumentId) => void;
  allCompleted: boolean;
  completedCount: number;
}

const AssessmentContext = createContext<AssessmentContextValue | null>(null);

function computeInitialStatuses(): Record<InstrumentId, InstrumentStatus> {
  const obj = {} as Record<InstrumentId, InstrumentStatus>;
  for (const inst of ASSESSMENT_INSTRUMENTS) {
    obj[inst.id] = 'not-started';
  }
  return obj;
}

export function AssessmentProvider({ children }: { children: ReactNode }) {
  const [answers, setAnswers] = useState<AssessmentAnswers>({});
  const [statuses, setStatuses] = useState<Record<InstrumentId, InstrumentStatus>>(
    computeInitialStatuses,
  );

  const setAnswer = useCallback(
    (instrumentId: InstrumentId, questionId: string, value: number) => {
      setAnswers((prev) => ({
        ...prev,
        [instrumentId]: {
          ...(prev[instrumentId] ?? {}),
          [questionId]: value,
        },
      }));
      setStatuses((prev) => {
        if (prev[instrumentId] === 'completed') return prev;
        return { ...prev, [instrumentId]: 'in-progress' };
      });
    },
    [],
  );

  const getInstrumentStatus = useCallback(
    (instrumentId: InstrumentId): InstrumentStatus => statuses[instrumentId],
    [statuses],
  );

  const markInstrumentCompleted = useCallback((instrumentId: InstrumentId) => {
    setStatuses((prev) => ({ ...prev, [instrumentId]: 'completed' }));
  }, []);

  const completedCount = Object.values(statuses).filter((s) => s === 'completed').length;
  const allCompleted = completedCount === ASSESSMENT_INSTRUMENTS.length;

  return (
    <AssessmentContext.Provider
      value={{
        answers,
        statuses,
        setAnswer,
        getInstrumentStatus,
        markInstrumentCompleted,
        allCompleted,
        completedCount,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAssessment() {
  const ctx = useContext(AssessmentContext);
  if (!ctx) throw new Error('useAssessment must be used within AssessmentProvider');
  return ctx;
}
