import { useMemo, useState } from 'react';
import { Settings2, RotateCcw, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { BarChart } from '@/components/charts/BarChart';
import { useThresholds } from '@/context/ThresholdContext';
import { THRESHOLD_LABELS } from '@/data/thresholds';
import { categorize, generateMockAnswers, generateMockProfile, categorizeProfile } from '@/utils/categorize';
import type { Category, ThresholdConfig } from '@/utils/types';

const THRESHOLD_KEYS = ['academic', 'aptitude', 'interest', 'skill', 'personality', 'gwa', 'subject'];

const SAMPLE_SCORES = [25, 45, 55, 65, 75, 85, 95];

function CategoryPreview({
  threshold,
  max,
}: {
  threshold: ThresholdConfig;
  max: number;
}) {
  const normalizedScores = SAMPLE_SCORES.map((s) => Math.round((s / max) * 100));
  const counts = { Low: 0, Average: 0, High: 0 } as Record<Category, number>;
  for (const ns of normalizedScores) {
    const cat = categorize(ns, threshold);
    counts[cat]++;
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {(['Low', 'Average', 'High'] as Category[]).map((cat) => (
        <div key={cat} className="flex items-center gap-1.5">
          <Badge tone={cat === 'Low' ? 'red' : cat === 'Average' ? 'amber' : 'green'}>
            {cat}
          </Badge>
          <span className="text-xs text-slate-500">{counts[cat]} samples</span>
        </div>
      ))}
    </div>
  );
}

export function AdminSettings() {
  const { thresholds, updateThreshold, resetThresholds } = useThresholds();
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});

  const mockCategorized = useMemo(
    () => categorizeProfile(generateMockAnswers(), generateMockProfile(), thresholds),
    [thresholds],
  );

  const handleSave = () => {
    setErrors({});
    for (const key of THRESHOLD_KEYS) {
      const t = thresholds[key];
      if (t.lowMax >= t.averageMax) {
        setErrors((p) => ({ ...p, [`${key}-low`]: 'Low threshold must be below Average threshold.' }));
      }
      if (t.lowMax < 0 || t.averageMax > 100) {
        setErrors((p) => ({ ...p, [`${key}-low`]: 'Values must be between 0 and 100.' }));
      }
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleReset = () => {
    resetThresholds();
    setErrors({});
  };

  const handleChange = (key: string, field: 'lowMax' | 'averageMax', value: string) => {
    const num = value === '' ? 0 : Number(value);
    if (Number.isNaN(num)) return;
    const current = thresholds[key];
    updateThreshold(key, { ...current, [field]: num });
    setErrors((p) => ({ ...p, [`${key}-low`]: undefined, [`${key}-avg`]: undefined }));
  };

  const previewData = mockCategorized.academic.concat(mockCategorized.aptitude).map((a) => ({
    label: a.label,
    value: a.normalizedPct,
    category: a.category,
  }));

  return (
    <AppShell title="Settings">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Score Thresholds</h2>
          <p className="text-slate-500 mt-1">
            Edit the Low / Average / High thresholds for each instrument and academic metric. Changes
            apply live to the preview below.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <p className="text-sm text-emerald-800 font-medium">Thresholds saved successfully.</p>
          </div>
        )}

        {Object.keys(errors).length > 0 && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-700">Please fix the threshold errors highlighted below.</p>
          </div>
        )}

        {/* Threshold editors */}
        <div className="space-y-4">
          {THRESHOLD_KEYS.map((key) => {
            const meta = THRESHOLD_LABELS[key];
            const t = thresholds[key];
            return (
              <Card key={key}>
                <CardHeader
                  title={meta.title}
                  subtitle={meta.description}
                  icon={<Settings2 className="w-5 h-5" />}
                />
                <div className="p-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      label="Low (0 to this value)"
                      type="number"
                      min={0}
                      max={100}
                      value={t.lowMax}
                      onChange={(e) => handleChange(key, 'lowMax', e.target.value)}
                      error={errors[`${key}-low`]}
                      hint={`Score below ${t.lowMax}${meta.max === 99 ? '' : '%'} = Low`}
                    />
                    <Input
                      label="Average (up to this value)"
                      type="number"
                      min={0}
                      max={100}
                      value={t.averageMax}
                      onChange={(e) => handleChange(key, 'averageMax', e.target.value)}
                      error={errors[`${key}-avg`]}
                      hint={`Score ${t.lowMax}–${t.averageMax}${meta.max === 99 ? '' : '%'} = Average, above = High`}
                    />
                  </div>
                  <div className="mt-3 pt-3 border-t border-slate-100">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">Live Preview</p>
                    <CategoryPreview threshold={t} max={meta.max} />
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Full preview chart */}
        <Card>
          <CardHeader
            title="Combined Preview (Mock Student)"
            subtitle="Shows how a mock student's scores are categorized with current thresholds"
            icon={<Settings2 className="w-5 h-5" />}
          />
          <div className="p-5">
            <BarChart data={previewData} />
          </div>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={handleReset}>
            <RotateCcw className="w-4 h-4 mr-1.5" />
            Reset to Defaults
          </Button>
          <Button onClick={handleSave} size="lg">
            <Save className="w-4 h-4 mr-1.5" />
            Save Thresholds
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
