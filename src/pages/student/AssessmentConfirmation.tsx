import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, AlertTriangle, FileText } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAssessment } from '@/context/AssessmentContext';
import { useAuth } from '@/context/AuthContext';
import { ASSESSMENT_INSTRUMENTS } from '@/mock/assessments';
import type { InstrumentId } from '@/types';

export function AssessmentConfirmation() {
  const { getInstrumentStatus, completedCount, allCompleted } = useAssessment();
  const { updateProfileStatus } = useAuth();

  if (allCompleted) {
    updateProfileStatus('hasAssessment', true);
  }

  const totalInstruments = ASSESSMENT_INSTRUMENTS.length;
  const pct = Math.round((completedCount / totalInstruments) * 100);

  return (
    <AppShell title="Review & Confirm">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Assessment Review</h2>
          <p className="text-slate-500 mt-1">
            Review your assessment completion status below. Once all five instruments are complete, you can view your results.
          </p>
        </div>

        {/* Overall progress */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-700">Overall Completion</h3>
            <Badge tone={allCompleted ? 'green' : 'teal'}>
              {completedCount} of {totalInstruments} completed
            </Badge>
          </div>
          <ProgressBar value={pct} tone={allCompleted ? 'green' : 'teal'} />
        </Card>

        {/* Instrument summary */}
        <div className="space-y-3">
          {ASSESSMENT_INSTRUMENTS.map((inst, idx) => {
            const status = getInstrumentStatus(inst.id as InstrumentId);
            const isDone = status === 'completed';
            return (
              <Card key={inst.id} className="p-4">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    isDone ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'
                  }`}>
                    {isDone ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">PART {idx + 1}</span>
                      {isDone ? <Badge tone="green">Completed</Badge> : <Badge tone="amber">Incomplete</Badge>}
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm mt-0.5">{inst.title}</h3>
                    <p className="text-xs text-slate-500 mt-0.5">{inst.questions.length} questions</p>
                  </div>
                  <Link
                    to={`/student/assessment/${inst.id}`}
                    className="flex-shrink-0 text-sm font-semibold text-teal-700 hover:text-teal-800"
                  >
                    {isDone ? 'Review' : 'Complete'}
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Action area */}
        {allCompleted ? (
          <Card className="p-6 text-center bg-teal-50 border-teal-200">
            <div className="w-16 h-16 rounded-2xl bg-teal-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-teal-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-800 mb-2">All assessments complete!</h3>
            <p className="text-slate-600 mb-5 max-w-md mx-auto">
              You've completed all five instruments. Your results are ready to view with ranked program recommendations.
            </p>
            <Link to="/student/results">
              <Button size="lg">
                <FileText className="w-4 h-4 mr-1.5" />
                View My Results
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </Card>
        ) : (
          <Card className="p-6 text-center bg-amber-50 border-amber-200">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
            </div>
            <h3 className="font-bold text-slate-800 mb-1">Almost there!</h3>
            <p className="text-slate-600 mb-4 text-sm">
              You still have {totalInstruments - completedCount} instrument{totalInstruments - completedCount > 1 ? 's' : ''} to complete
              before you can view your results.
            </p>
            <Link to="/student/assessment">
              <Button variant="secondary" size="md">
                <ArrowRight className="w-4 h-4 mr-1" />
                Back to Assessment Hub
              </Button>
            </Link>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
