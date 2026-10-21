import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Printer, Info, Route, CheckCircle2, Circle, Target, Briefcase, Trophy } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MOCK_RECOMMENDATIONS } from '@/data/recommendations';

export function ProgramExplanation() {
  const { rank } = useParams<{ rank: string }>();
  const rankNum = parseInt(rank ?? '0', 10);
  const rec = MOCK_RECOMMENDATIONS.find((r) => r.rank === rankNum);

  if (!rec) {
    return (
      <AppShell title="Explanation">
        <div className="max-w-2xl mx-auto">
          <Card className="p-8 text-center">
            <h2 className="font-bold text-slate-800 mb-1">Recommendation not found</h2>
            <p className="text-slate-500 mb-4">The explanation you're looking for doesn't exist.</p>
            <Link to="/student/results" className="text-teal-600 font-semibold">
              Back to Results
            </Link>
          </Card>
        </div>
      </AppShell>
    );
  }

  const nextRec = MOCK_RECOMMENDATIONS.find((r) => r.rank === rankNum + 1);
  const prevRec = MOCK_RECOMMENDATIONS.find((r) => r.rank === rankNum - 1);

  const handlePrint = () => window.print();

  const pathSentence = (() => {
    const steps = rec.decisionPath.map((s) => {
      const attrLower = s.attribute.toLowerCase();
      if (attrLower.includes('riasec')) return `your top interest is ${s.value}`;
      if (attrLower.includes('numerical')) return `your ${s.value.toLowerCase()} numerical reasoning ability`;
      if (attrLower.includes('abstract')) return `your ${s.value.toLowerCase()} abstract reasoning`;
      if (attrLower.includes('verbal')) return `your ${s.value.toLowerCase()} verbal reasoning`;
      if (attrLower.includes('gwa')) return `your ${s.value} GWA`;
      if (attrLower.includes('strand')) return `your ${s.value} strand`;
      if (attrLower.includes('conscientiousness')) return `your ${s.value.toLowerCase()} conscientiousness`;
      if (attrLower.includes('openness')) return `your ${s.value.toLowerCase()} openness`;
      if (attrLower.includes('skill')) return `your ${s.value.toLowerCase()} readiness skills`;
      return `${s.attribute}: ${s.value}`;
    });
    return steps.join(', ') + ` — led to the recommendation of ${rec.program}.`;
  })();

  return (
    <AppShell title="Program Explanation">
      <div className="max-w-3xl mx-auto space-y-5 print:max-w-none">
        {/* Back + print */}
        <div className="flex items-center justify-between print:hidden">
          <Link
            to="/student/results"
            className="inline-flex items-center gap-1 text-sm font-medium text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </Link>
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
          >
            <Printer className="w-4 h-4" />
            Print / Save as PDF
          </button>
        </div>

        {/* Print-only header */}
        <div className="hidden print:block mb-4">
          <h1 className="text-2xl font-bold text-slate-900">ProPath — {rec.program}</h1>
          <p className="text-slate-600">Rank #{rec.rank} | Confidence: {Math.round(rec.confidence * 100)}%</p>
        </div>

        {/* Program header */}
        <Card className={`p-5 ${rec.rank <= 3 ? 'border-teal-200' : ''}`}>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center flex-shrink-0">
              <Trophy className="w-7 h-7 text-teal-600" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge tone="teal">Rank #{rec.rank}</Badge>
                <Badge tone={rec.confidence >= 0.8 ? 'green' : rec.confidence >= 0.7 ? 'amber' : 'slate'}>
                  {Math.round(rec.confidence * 100)}% Confidence
                </Badge>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mt-2">{rec.program}</h2>
              <p className="text-sm text-slate-500 flex items-center gap-1 mt-0.5">
                <Briefcase className="w-3.5 h-3.5" />
                {rec.field}
              </p>
            </div>
          </div>
        </Card>

        {/* Plain-language explanation */}
        <Card>
          <CardHeader
            title="Why This Program?"
            subtitle="The model's reasoning, translated to plain language"
            icon={<Route className="w-5 h-5" />}
          />
          <div className="p-5">
            <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 mb-4">
              <p className="text-sm text-slate-700 leading-relaxed">
                <span className="font-semibold">Your {rec.decisionPath.map((s) => s.value).join(', ')}</span> {pathSentence}
              </p>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
              <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Disclaimer:</span> This explanation is generated by the C4.5
                recommendation model to <span className="font-semibold">guide, not replace</span> the Guidance Office.
                Discuss this with your counselor before deciding.
              </p>
            </div>
          </div>
        </Card>

        {/* Decision Path Steps */}
        <Card>
          <CardHeader
            title="Decision Path"
            subtitle="How the model classified you, step by step"
            icon={<Route className="w-5 h-5" />}
          />
          <div className="p-5">
            {/* Visual path */}
            <div className="flex items-center justify-center mb-6 overflow-x-auto pb-2">
              <div className="flex items-center gap-0.5 sm:gap-1">
                {/* Root */}
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center">
                    <Circle className="w-4 h-4 text-slate-400" />
                  </div>
                  <span className="text-xs text-slate-400 mt-1">Start</span>
                </div>

                {rec.decisionPath.map((step, idx) => (
                  <div key={idx} className="flex items-center gap-1">
                    {/* Arrow */}
                    <div className="flex items-center">
                      <div className="w-6 h-0.5 bg-teal-300" />
                      <ArrowRight className="w-4 h-4 text-teal-400" />
                    </div>
                    {/* Step node */}
                    <div className="flex flex-col items-center min-w-[60px] sm:min-w-[80px]">
                      <div className={`w-12 h-12 rounded-xl ${idx === rec.decisionPath.length - 1 ? 'bg-teal-600' : 'bg-teal-100 border-2 border-teal-300'} flex items-center justify-center`}>
                        {idx === rec.decisionPath.length - 1 ? (
                          <Target className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-xs font-bold text-teal-700">{idx + 1}</span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500 mt-1 text-center font-medium leading-tight max-w-[90px]">
                        {step.attribute}
                      </span>
                      <span className="text-xs text-teal-600 font-semibold">{step.value}</span>
                    </div>
                  </div>
                ))}

                {/* Final leaf */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    <div className="w-6 h-0.5 bg-teal-300" />
                    <ArrowRight className="w-4 h-4 text-teal-400" />
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-xl bg-emerald-500 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-slate-600 mt-1 font-bold text-center max-w-[100px] leading-tight">
                      {rec.program}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step details */}
            <div className="space-y-3">
              {rec.decisionPath.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl border border-slate-100"
                >
                  <div className="w-7 h-7 rounded-lg bg-teal-50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-xs font-bold text-teal-700">{idx + 1}</span>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-semibold text-slate-700 text-sm">{step.attribute}</span>
                      <Badge tone="teal">{step.value}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 mt-1 leading-relaxed">{step.explanation}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                </div>
                <div>
                  <span className="font-semibold text-slate-800 text-sm">Result: {rec.program}</span>
                  <p className="text-sm text-slate-600 mt-0.5">
                    Based on the path above, the model recommends this program with {Math.round(rec.confidence * 100)}% confidence.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Career outcomes */}
        <Card>
          <CardHeader
            title="Career Outcomes"
            subtitle="Common career paths for this program"
            icon={<Briefcase className="w-5 h-5" />}
          />
          <div className="p-5">
            <div className="grid grid-cols-2 gap-2">
              {rec.careerOutcomes.map((career, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 p-3 rounded-xl border border-slate-100"
                >
                  <CheckCircle2 className="w-4 h-4 text-teal-500 flex-shrink-0" />
                  <span className="text-sm text-slate-700 font-medium">{career}</span>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Navigation between recommendations */}
        <div className="flex items-center justify-between print:hidden">
          {prevRec ? (
            <Link to={`/student/results/${prevRec.rank}`}>
              <Button variant="secondary" size="md">
                <ArrowLeft className="w-4 h-4 mr-1" />
                #{prevRec.rank} {prevRec.program.replace('BS ', '').replace('BA ', '')}
              </Button>
            </Link>
          ) : (
            <div />
          )}
          {nextRec ? (
            <Link to={`/student/results/${nextRec.rank}`}>
              <Button variant="secondary" size="md">
                #{nextRec.rank} {nextRec.program.replace('BS ', '').replace('BA ', '')}
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          ) : (
            <Link to="/student/results">
              <Button variant="primary" size="md">
                Back to All Results
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          )}
        </div>
      </div>
    </AppShell>
  );
}
