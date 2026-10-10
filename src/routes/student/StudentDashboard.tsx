import { Link } from 'react-router-dom';
import { ClipboardList, BookOpen, FileText, ArrowRight, CheckCircle2, Circle } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { useAuth } from '@/context/AuthContext';

export function StudentDashboard() {
  const { user } = useAuth();

  const steps = [
    {
      label: 'Academic Profile',
      desc: 'Enter your track, strand, GWA, and subject grades.',
      to: '/student/profile',
      icon: BookOpen,
      done: user?.hasProfile ?? false,
    },
    {
      label: 'Career Assessment',
      desc: 'Complete the five-part assessment (academic, aptitude, interest, skill, personality).',
      to: '/student/assessment',
      icon: ClipboardList,
      done: user?.hasAssessment ?? false,
    },
    {
      label: 'View Results',
      desc: 'See your ranked college program recommendations with explanations.',
      to: '/student/results',
      icon: FileText,
      done: user?.hasResults ?? false,
    },
  ];

  const completedCount = steps.filter((s) => s.done).length;
  const pct = Math.round((completedCount / steps.length) * 100);

  return (
    <AppShell title="My Dashboard">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Greeting */}
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Hello, {user?.name.split(' ')[0]}</h2>
          <p className="text-slate-500 mt-1">Here's your progress so far.</p>
        </div>

        {/* Overall progress */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-slate-700">Overall Progress</h3>
            <Badge tone={pct === 100 ? 'green' : 'teal'}>
              {completedCount} of {steps.length} complete
            </Badge>
          </div>
          <ProgressBar value={pct} tone={pct === 100 ? 'green' : 'teal'} />
        </Card>

        {/* Step cards */}
        <div className="space-y-4">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <Card key={step.label} className="p-5">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${step.done ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                    {step.done ? <CheckCircle2 className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">STEP {String(idx + 1).padStart(2, '0')}</span>
                      {step.done && <Badge tone="green">Done</Badge>}
                      {!step.done && <Badge tone="amber">Pending</Badge>}
                    </div>
                    <h3 className="font-semibold text-slate-800 mt-0.5">{step.label}</h3>
                    <p className="text-sm text-slate-500 mt-0.5">{step.desc}</p>
                  </div>
                  <Link
                    to={step.to}
                    className={`flex-shrink-0 flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                      step.done
                        ? 'text-slate-600 hover:bg-slate-50'
                        : 'text-teal-700 bg-teal-50 hover:bg-teal-100'
                    }`}
                  >
                    {step.done ? 'View' : 'Start'}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Info banner */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
          <Circle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            ProPath is a support tool for your school's Guidance Office. Recommendations are
            generated from your assessment and academic record to guide counseling — not replace it.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
