import { Link } from 'react-router-dom';
import { Brain, Target, Compass, Wrench, Users, ArrowRight, CheckCircle2, Clock, Circle } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAssessment } from '@/context/AssessmentContext';
import { useAuth } from '@/context/AuthContext';
import { ASSESSMENT_INSTRUMENTS } from '@/data/assessments';
import type { InstrumentId } from '@/utils/types';

const ICONS: Record<string, typeof Brain> = {
  brain: Brain,
  target: Target,
  compass: Compass,
  wrench: Wrench,
  users: Users,
};

export function AssessmentHub() {
  const { getInstrumentStatus, completedCount, allCompleted } = useAssessment();
  const { updateProfileStatus } = useAuth();

  if (allCompleted) {
    updateProfileStatus('hasAssessment', true);
  }

  const totalInstruments = ASSESSMENT_INSTRUMENTS.length;
  const pct = Math.round((completedCount / totalInstruments) * 100);

  return (
    <AppShell title="Career Assessment">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Career Assessment</h2>
          <p className="text-slate-500 mt-1">
            Complete all five instruments below. You can save your progress and return anytime.
          </p>
        </div>

        {/* Overall progress */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-700">Assessment Progress</h3>
            <Badge tone={pct === 100 ? 'green' : 'teal'}>
              {completedCount} of {totalInstruments} completed
            </Badge>
          </div>
          <ProgressBar value={pct} tone={pct === 100 ? 'green' : 'teal'} />
        </Card>

        {/* Instrument cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {ASSESSMENT_INSTRUMENTS.map((inst, idx) => {
            const Icon = ICONS[inst.icon] ?? Brain;
            const status = getInstrumentStatus(inst.id as InstrumentId);
            const statusBadge =
              status === 'completed' ? (
                <Badge tone="green"><CheckCircle2 className="w-3 h-3 mr-1" />Completed</Badge>
              ) : status === 'in-progress' ? (
                <Badge tone="amber"><Circle className="w-3 h-3 mr-1" />In Progress</Badge>
              ) : (
                <Badge tone="slate"><Clock className="w-3 h-3 mr-1" />Not Started</Badge>
              );

            return (
              <Card key={inst.id} className="p-5 flex flex-col">
                <div className="flex items-start gap-3 mb-3">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    status === 'completed' ? 'bg-emerald-50 text-emerald-600'
                    : status === 'in-progress' ? 'bg-amber-50 text-amber-600'
                    : 'bg-teal-50 text-teal-600'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-slate-400">PART {idx + 1}</span>
                      {statusBadge}
                    </div>
                    <h3 className="font-semibold text-slate-800 text-sm">{inst.title}</h3>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed flex-1 mb-4">{inst.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    ~{inst.estimatedMinutes} min
                  </span>
                  <Link
                    to={`/student/assessment/${inst.id}`}
                    className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      status === 'completed'
                        ? 'text-slate-600 hover:bg-slate-50'
                        : 'text-teal-700 bg-teal-50 hover:bg-teal-100'
                    }`}
                  >
                    {status === 'completed' ? 'Review' : status === 'in-progress' ? 'Continue' : 'Start'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Confirmation link */}
        {completedCount > 0 && (
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-700">Review & Submit</h3>
                <p className="text-sm text-slate-500 mt-0.5">
                  Once you've completed all five instruments, review your answers and submit.
                </p>
              </div>
              <Link
                to="/student/assessment/confirm"
                className={`flex items-center gap-1 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors flex-shrink-0 ${
                  allCompleted
                    ? 'text-white bg-teal-600 hover:bg-teal-700'
                    : 'text-slate-500 bg-slate-100'
                }`}
              >
                Review
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
