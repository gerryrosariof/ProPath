import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Save, Clock } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { LikertScale } from '@/components/assessment/LikertScale';
import { useAssessment } from '@/context/AssessmentContext';
import { ASSESSMENT_INSTRUMENTS } from '@/mock/assessments';
import type { InstrumentId } from '@/types';

export function TestPlayer() {
  const { instrumentId } = useParams<{ instrumentId: string }>();
  const navigate = useNavigate();
  const { answers, setAnswer, getInstrumentStatus, markInstrumentCompleted } = useAssessment();

  const instrument = ASSESSMENT_INSTRUMENTS.find((i) => i.id === instrumentId);
  const validId = instrument?.id as InstrumentId | undefined;

  const [currentIdx, setCurrentIdx] = useState(0);
  const [showUnansweredWarning, setShowUnansweredWarning] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);

  useEffect(() => {
    setCurrentIdx(0);
    setShowUnansweredWarning(false);
  }, [instrumentId]);

  const instrumentAnswers = validId ? (answers[validId] ?? {}) : {};

  const answeredCount = useMemo(() => {
    if (!instrument) return 0;
    return instrument.questions.filter((q) => instrumentAnswers[q.id] !== undefined).length;
  }, [instrument, instrumentAnswers]);

  if (!instrument || !validId) {
    return (
      <AppShell title="Assessment">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
            <h2 className="font-bold text-slate-800 mb-1">Instrument not found</h2>
            <p className="text-slate-500 mb-4">The assessment you're looking for doesn't exist.</p>
            <Link to="/student/assessment" className="text-teal-600 font-semibold">Back to Assessment Hub</Link>
          </Card>
        </div>
      </AppShell>
    );
  }

  const question = instrument.questions[currentIdx];
  const totalQuestions = instrument.questions.length;
  const progressPct = Math.round((answeredCount / totalQuestions) * 100);
  const status = getInstrumentStatus(validId);
  const isLastQuestion = currentIdx === totalQuestions - 1;
  const currentAnswer = instrumentAnswers[question.id];

  const handleAnswer = (value: number) => {
    setAnswer(validId, question.id, value);
    if (showUnansweredWarning) setShowUnansweredWarning(false);
  };

  const handlePrev = () => {
    if (currentIdx > 0) setCurrentIdx(currentIdx - 1);
  };

  const handleNext = () => {
    if (currentIdx < totalQuestions - 1) setCurrentIdx(currentIdx + 1);
  };

  const handleSaveProgress = () => {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2000);
  };

  const allAnswered = instrument.questions.every((q) => instrumentAnswers[q.id] !== undefined);

  const handleSubmit = () => {
    if (!allAnswered) {
      setShowUnansweredWarning(true);
      return;
    }
    markInstrumentCompleted(validId);
    navigate('/student/assessment');
  };

  return (
    <AppShell title={instrument.shortTitle}>
      <div className="max-w-2xl mx-auto space-y-5">
        {/* Back link */}
        <Link
          to="/student/assessment"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assessment Hub
        </Link>

        {/* Header card */}
        <Card className="p-5">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h2 className="font-bold text-slate-800">{instrument.title}</h2>
              <p className="text-sm text-slate-500 mt-0.5">{instrument.description}</p>
            </div>
            {status === 'completed' && (
              <span className="text-xs font-semibold text-emerald-600 flex items-center gap-1 flex-shrink-0">
                <CheckCircle2 className="w-4 h-4" />
                Completed
              </span>
            )}
          </div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-sm font-medium text-slate-600">
              Question {currentIdx + 1} of {totalQuestions}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              ~{instrument.estimatedMinutes} min
            </span>
          </div>
          <ProgressBar value={progressPct} />
        </Card>

        {/* Unanswered warning */}
        {showUnansweredWarning && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">
              You have {totalQuestions - answeredCount} unanswered question{totalQuestions - answeredCount > 1 ? 's' : ''}.
              Please answer all questions before submitting.
            </p>
          </div>
        )}

        {/* Saved flash */}
        {savedFlash && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <p className="text-sm text-emerald-700 font-medium">Progress saved!</p>
          </div>
        )}

        {/* Question card */}
        <Card className="p-6">
          <p className="text-lg font-semibold text-slate-800 mb-5 leading-relaxed">
            {question.text}
          </p>

          {question.type === 'likert' ? (
            <LikertScale
              options={question.options}
              value={currentAnswer}
              onChange={handleAnswer}
            />
          ) : (
            <div className="space-y-2">
              {question.options.map((opt, idx) => {
                const selected = currentAnswer === opt.value;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAnswer(opt.value)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border text-left transition-all ${
                      selected
                        ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                        selected ? 'border-teal-600 bg-teal-600' : 'border-slate-300'
                      }`}
                    >
                      {selected && <div className="w-2 h-2 rounded-full bg-white" />}
                    </div>
                    <span className={`text-sm font-medium ${selected ? 'text-teal-800' : 'text-slate-700'}`}>
                      {opt.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between gap-3">
          <Button
            variant="secondary"
            onClick={handlePrev}
            disabled={currentIdx === 0}
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Previous
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="ghost" onClick={handleSaveProgress}>
              <Save className="w-4 h-4 mr-1" />
              Save
            </Button>
            {isLastQuestion ? (
              <Button onClick={handleSubmit}>
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Submit
              </Button>
            ) : (
              <Button onClick={handleNext}>
                Next
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            )}
          </div>
        </div>

        {/* Question dots */}
        <div className="flex items-center justify-center gap-1.5 pt-2">
          {instrument.questions.map((q, idx) => {
            const isAnswered = instrumentAnswers[q.id] !== undefined;
            const isCurrent = idx === currentIdx;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIdx(idx)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  isCurrent
                    ? 'bg-teal-600 w-6'
                    : isAnswered
                    ? 'bg-teal-400'
                    : 'bg-slate-300'
                }`}
                aria-label={`Go to question ${idx + 1}`}
              />
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
