import { Link } from 'react-router-dom';
import { Users, ClipboardCheck, Trophy, Clock, ArrowRight, TrendingUp, Info } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_STUDENTS } from '@/data/users';

export function CounselorDashboard() {
  const total = MOCK_STUDENTS.length;
  const completedAssessment = MOCK_STUDENTS.filter((s) => s.hasAssessment).length;
  const withResults = MOCK_STUDENTS.filter((s) => s.hasResults).length;
  const noProfile = MOCK_STUDENTS.filter((s) => !s.hasProfile).length;

  const recentCompletions = MOCK_STUDENTS
    .filter((s) => s.completedAt)
    .sort((a, b) => new Date(b.completedAt!).getTime() - new Date(a.completedAt!).getTime())
    .slice(0, 5);

  const stats = [
    { label: 'Total Students', value: total, icon: Users, color: 'teal' },
    { label: 'Assessment Complete', value: completedAssessment, icon: ClipboardCheck, color: 'blue' },
    { label: 'Results Generated', value: withResults, icon: Trophy, color: 'amber' },
    { label: 'No Profile Yet', value: noProfile, icon: Clock, color: 'slate' },
  ];

  const colorMap: Record<string, string> = {
    teal: 'bg-teal-50 text-teal-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    slate: 'bg-slate-100 text-slate-500',
  };

  return (
    <AppShell title="Counselor Dashboard">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Overview</h2>
          <p className="text-slate-500 mt-1">Track student progress and assessment completion across your caseload.</p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.label} className="p-5">
                <div className={`w-11 h-11 rounded-xl ${colorMap[stat.color]} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
              </Card>
            );
          })}
        </div>

        {/* Progress bar */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-slate-700">Assessment Completion Rate</h3>
            </div>
            <Badge tone={completedAssessment / total >= 0.5 ? 'green' : 'amber'}>
              {Math.round((completedAssessment / total) * 100)}%
            </Badge>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all"
              style={{ width: `${(completedAssessment / total) * 100}%` }}
            />
          </div>
          <p className="text-sm text-slate-500 mt-2">
            {completedAssessment} of {total} students have completed their assessments.
          </p>
        </Card>

        {/* Recent completions */}
        <Card>
          <CardHeader
            title="Recent Completions"
            subtitle="Students who recently finished their assessments"
            icon={<Clock className="w-5 h-5" />}
            action={
              <Link to="/counselor/students" className="text-sm font-semibold text-teal-700 hover:text-teal-800">
                View all
              </Link>
            }
          />
          <div className="p-5">
            {recentCompletions.length === 0 ? (
              <p className="text-sm text-slate-400 text-center py-6">No recent completions yet.</p>
            ) : (
              <div className="space-y-2">
                {recentCompletions.map((student) => (
                  <Link
                    key={student.id}
                    to={`/counselor/students/${student.id}`}
                    className="flex items-center justify-between p-3 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-teal-700">
                          {student.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-800 text-sm">{student.name}</p>
                        <p className="text-xs text-slate-500">
                          {student.strand} • {student.gradeLevel}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-400">
                        {new Date(student.completedAt!).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      {student.hasResults && <Badge tone="green">Results ready</Badge>}
                      <ArrowRight className="w-4 h-4 text-slate-300" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </Card>

        {/* Info */}
        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            ProPath helps you track student progress. Use the Students page to view individual profiles and
            recommendations. All data is simulated for this prototype.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
