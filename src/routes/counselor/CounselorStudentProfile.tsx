import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, GraduationCap, Award, Compass, ClipboardCheck, Trophy, ArrowRight, Info, User, Briefcase } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { DonutChart } from '@/components/charts/DonutChart';
import { BarChart } from '@/components/charts/BarChart';
import { MOCK_STUDENTS } from '@/mock/users';
import { MOCK_RECOMMENDATIONS } from '@/mock/recommendations';
import { categorizeProfile, generateMockAnswers, generateMockProfile } from '@/lib/categorize';
import { DEFAULT_THRESHOLDS } from '@/mock/thresholds';
import type { Category } from '@/types';

const CATEGORY_TONES: Record<Category, 'red' | 'amber' | 'green'> = {
  Low: 'red',
  Average: 'amber',
  High: 'green',
};

const RIASEC_COLORS = ['#0d9488', '#f59e0b', '#3b82f6'];

export function CounselorStudentProfile() {
  const { studentId } = useParams<{ studentId: string }>();
  const student = MOCK_STUDENTS.find((s) => s.id === studentId);

  if (!student) {
    return (
      <AppShell title="Student Profile">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <h2 className="font-bold text-slate-800 mb-1">Student not found</h2>
            <p className="text-slate-500 mb-4">This student profile doesn't exist.</p>
            <Link to="/counselor/students" className="text-teal-600 font-semibold">
              Back to Student List
            </Link>
          </Card>
        </div>
      </AppShell>
    );
  }

  const profile = generateMockProfile();
  profile.strand = student.strand;
  profile.track = student.track;
  const categorized = categorizeProfile(generateMockAnswers(), profile, DEFAULT_THRESHOLDS);

  const riasecSegments = categorized.riasecTop3.map((r, idx) => ({
    label: `${r.code} — ${r.trait}`,
    value: r.score,
    color: RIASEC_COLORS[idx] ?? '#94a3b8',
  }));
  const riasecCodeString = categorized.riasecTop3.map((r) => r.code).join('');

  const steps = [
    { label: 'Profile', done: student.hasProfile, icon: GraduationCap },
    { label: 'Assessment', done: student.hasAssessment, icon: ClipboardCheck },
    { label: 'Results', done: student.hasResults, icon: Trophy },
  ];

  return (
    <AppShell title="Student Profile">
      <div className="max-w-4xl mx-auto space-y-5">
        <Link
          to="/counselor/students"
          className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Students
        </Link>

        {/* Student header */}
        <Card className="p-5">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0">
              <User className="w-7 h-7 text-teal-600" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-slate-800">{student.name}</h2>
              <p className="text-sm text-slate-500">{student.email}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <Badge tone="teal">{student.strand}</Badge>
                <Badge tone="slate">{student.track}</Badge>
                <Badge tone="slate">{student.gradeLevel}</Badge>
              </div>
            </div>
          </div>

          {/* Progress steps */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={step.label} className="flex items-center gap-2">
                  {idx > 0 && <div className="w-6 h-0.5 bg-slate-200" />}
                  <div className="flex items-center gap-1.5">
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${step.done ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className={`text-xs font-medium ${step.done ? 'text-slate-700' : 'text-slate-400'}`}>
                      {step.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {!student.hasProfile && (
          <Card className="p-6 text-center">
            <Info className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-slate-500 font-medium">This student hasn't set up their academic profile yet.</p>
            <p className="text-sm text-slate-400 mt-1">Check back after they complete their profile and assessments.</p>
          </Card>
        )}

        {student.hasProfile && (
          <>
            {/* Profile summary */}
            <Card>
              <CardHeader
                title="Academic & Assessment Summary"
                subtitle="Read-only view of the student's categorized profile"
                icon={<Award className="w-5 h-5" />}
              />
              <div className="p-5 grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center">
                      <Award className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-slate-800">{categorized.gwaValue}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-xs text-slate-500">GWA</span>
                        <Badge tone={CATEGORY_TONES[categorized.gwaCategory]}>{categorized.gwaCategory}</Badge>
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Compass className="w-4 h-4 text-teal-600" />
                      <span className="text-sm font-semibold text-slate-700">RIASEC Code: {riasecCodeString}</span>
                    </div>
                    {riasecSegments.length > 0 && (
                      <DonutChart segments={riasecSegments} centerValue={riasecCodeString} centerLabel="Code" size={140} />
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-2">Subject Performance</p>
                    <BarChart
                      data={categorized.subjectCategories.map((s) => ({
                        label: s.label,
                        value: s.rawScore,
                        category: s.category,
                      }))}
                      max={99}
                      unit=""
                    />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-700 mb-2">Aptitude Scores</p>
                    <BarChart
                      data={categorized.aptitude.map((a) => ({
                        label: a.label,
                        value: a.normalizedPct,
                        category: a.category,
                      }))}
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Recommendations */}
            {student.hasResults ? (
              <Card>
                <CardHeader
                  title="Recommendations"
                  subtitle="The student's top program matches from the recommendation engine"
                  icon={<Trophy className="w-5 h-5" />}
                />
                <div className="p-5 space-y-3">
                  {MOCK_RECOMMENDATIONS.map((rec) => (
                    <Link
                      key={rec.program}
                      to={`/counselor/students/${student.id}/results/${rec.rank}`}
                      className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-teal-200 hover:bg-teal-50/50 transition-colors"
                    >
                      <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold text-teal-700">#{rec.rank}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm">{rec.program}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Briefcase className="w-3 h-3" />
                          {rec.field}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <span className="text-lg font-bold text-teal-600">{Math.round(rec.confidence * 100)}%</span>
                        <p className="text-xs text-slate-400">confidence</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 flex-shrink-0" />
                    </Link>
                  ))}
                </div>
              </Card>
            ) : (
              <Card className="p-6 text-center">
                <Trophy className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                <p className="text-slate-500 font-medium">Recommendations not yet generated.</p>
                <p className="text-sm text-slate-400 mt-1">
                  {student.hasAssessment
                    ? "The student has completed their assessment. Results will appear once they're generated."
                    : "The student needs to complete their assessment first."}
                </p>
              </Card>
            )}

            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                This is a read-only summary for counseling purposes. Recommendations guide, not replace,
                your professional guidance. All data is simulated for this prototype.
              </p>
            </div>
          </>
        )}
      </div>
    </AppShell>
  );
}
