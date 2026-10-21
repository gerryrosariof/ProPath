import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Brain, Target, Compass, Wrench, Users, Award, ArrowRight, TrendingUp, GraduationCap } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { BarChart } from '@/components/charts/BarChart';
import { DonutChart } from '@/components/charts/DonutChart';
import { useAssessment } from '@/context/AssessmentContext';
import { useProfile } from '@/context/ProfileContext';
import { useThresholds } from '@/context/ThresholdContext';
import { useAuth } from '@/context/AuthContext';
import { categorizeProfile, generateMockAnswers, generateMockProfile } from '@/utils/categorize';
import { ASSESSMENT_INSTRUMENTS } from '@/data/assessments';
import type { CategorizedAttribute, Category, InstrumentId } from '@/utils/types';

const CATEGORY_TONES: Record<Category, 'red' | 'amber' | 'green'> = {
  Low: 'red',
  Average: 'amber',
  High: 'green',
};

const SECTION_ICONS: Record<string, typeof Brain> = {
  academic: Brain,
  aptitude: Target,
  interest: Compass,
  skill: Wrench,
  personality: Users,
};

const RIASEC_COLORS = ['#0d9488', '#f59e0b', '#3b82f6'];

function AttributeChips({ attributes }: { attributes: CategorizedAttribute[] }) {
  if (attributes.length === 0) {
    return <p className="text-sm text-slate-400">No data yet — complete this assessment to see results.</p>;
  }
  return (
    <div className="flex flex-wrap gap-2">
      {attributes.map((attr, idx) => (
        <div
          key={idx}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-white"
        >
          <span className="text-sm font-medium text-slate-700">{attr.label}</span>
          <Badge tone={CATEGORY_TONES[attr.category]}>{attr.category}</Badge>
          <span className="text-xs text-slate-400">{attr.normalizedPct}%</span>
        </div>
      ))}
    </div>
  );
}

function SectionCard({
  sectionKey,
  attributes,
}: {
  sectionKey: string;
  attributes: CategorizedAttribute[];
}) {
  const instrument = ASSESSMENT_INSTRUMENTS.find((i) => i.id === sectionKey);
  const Icon = SECTION_ICONS[sectionKey] ?? Brain;

  const chartData = attributes.map((a) => ({
    label: a.label,
    value: a.normalizedPct,
    category: a.category,
  }));

  return (
    <Card>
      <CardHeader
        title={instrument?.title ?? sectionKey}
        subtitle={instrument?.description}
        icon={<Icon className="w-5 h-5" />}
      />
      <div className="p-5 space-y-4">
        <BarChart data={chartData} />
        <div className="pt-2 border-t border-slate-100">
          <AttributeChips attributes={attributes} />
        </div>
      </div>
    </Card>
  );
}

export function ProfileCategory() {
  const { answers, statuses } = useAssessment();
  const { profile } = useProfile();
  const { thresholds } = useThresholds();
  const { user } = useAuth();

  const hasRealData = Object.values(statuses).some((s) => s === 'completed' || s === 'in-progress');

  const effectiveAnswers = useMemo(() => {
    if (hasRealData && Object.keys(answers).length > 0) return answers;
    return generateMockAnswers();
  }, [answers, hasRealData]);

  const effectiveProfile = useMemo(() => {
    if (profile) return profile;
    if (user?.track) {
      return generateMockProfile();
    }
    return null;
  }, [profile, user]);

  const categorized = useMemo(
    () => categorizeProfile(effectiveAnswers, effectiveProfile, thresholds),
    [effectiveAnswers, effectiveProfile, thresholds],
  );

  const usingMockData = !hasRealData;

  const riasecSegments = categorized.riasecTop3.map((r, idx) => ({
    label: `${r.code} — ${r.trait}`,
    value: r.score,
    color: RIASEC_COLORS[idx] ?? '#94a3b8',
  }));

  const riasecCodeString = categorized.riasecTop3.map((r) => r.code).join('');

  return (
    <AppShell title="My Categorized Profile">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Categorized Profile</h2>
          <p className="text-slate-500 mt-1">
            Your assessment scores and academic record have been categorized into Low, Average, and High bands.
          </p>
        </div>

        {usingMockData && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
            <TrendingUp className="w-5 h-5 text-blue-600 flex-shrink-0" />
            <p className="text-sm text-blue-800">
              Showing sample data based on a completed profile. Take the assessments and enter your academic record
              to see your real categorized profile.
            </p>
          </div>
        )}

        {/* RIASEC + GWA summary */}
        <div className="grid md:grid-cols-2 gap-4">
          {/* RIASEC Donut */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-slate-800">RIASEC Top 3</h3>
            </div>
            {riasecSegments.length > 0 ? (
              <>
                <DonutChart
                  segments={riasecSegments}
                  centerValue={riasecCodeString}
                  centerLabel="Your Code"
                />
                <div className="mt-4 flex flex-wrap gap-2 justify-center">
                  {categorized.riasecTop3.map((r, idx) => (
                    <div
                      key={idx}
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200"
                    >
                      <span
                        className="w-3 h-3 rounded-sm"
                        style={{ backgroundColor: RIASEC_COLORS[idx] }}
                      />
                      <span className="text-sm font-bold text-slate-700">{r.code}</span>
                      <span className="text-sm text-slate-500">{r.trait}</span>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">
                Complete the Interest Inventory to see your RIASEC code.
              </p>
            )}
          </Card>

          {/* GWA + Subject summary */}
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-slate-800">Academic Record</h3>
            </div>
            {effectiveProfile ? (
              <>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center">
                    <Award className="w-7 h-7 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-slate-800">{categorized.gwaValue}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-slate-500">GWA</span>
                      <Badge tone={CATEGORY_TONES[categorized.gwaCategory]}>
                        {categorized.gwaCategory}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="pt-3 border-t border-slate-100">
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
              </>
            ) : (
              <p className="text-sm text-slate-400 text-center py-8">
                Enter your academic profile to see categorized grades.
              </p>
            )}
          </Card>
        </div>

        {/* Five instrument sections */}
        {(['academic', 'aptitude', 'interest', 'skill', 'personality'] as InstrumentId[]).map((id) => (
          <SectionCard
            key={id}
            sectionKey={id}
            attributes={categorized[id]}
          />
        ))}

        {/* Next step */}
        <Card className="p-5 bg-teal-50 border-teal-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TrendingUp className="w-6 h-6 text-teal-600" />
              <div>
                <h3 className="font-semibold text-slate-800">Ready for your results?</h3>
                <p className="text-sm text-slate-600">
                  Your categorized profile feeds into the recommendation engine.
                </p>
              </div>
            </div>
            <Link
              to="/student/results"
              className="flex items-center gap-1 px-4 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors flex-shrink-0"
            >
              View Results
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
