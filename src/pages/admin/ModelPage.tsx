import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Cpu, Play, Loader2, CheckCircle2, TrendingUp, GitBranch, Info, Settings2, Clock, ArrowRight } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { MOCK_MODEL_RESULTS } from '@/data/model';
import { MOCK_TRAINING_DATA, PROGRAMS } from '@/data/model';
import type { ModelResults } from '@/utils/types';

type TrainState = 'idle' | 'training' | 'done';

export function ModelPage() {
  const [trainState, setTrainState] = useState<TrainState>('idle');
  const [confidenceFactor, setConfidenceFactor] = useState(0.25);
  const [minInstances, setMinInstances] = useState(2);
  const [results, setResults] = useState<ModelResults | null>(null);

  const handleTrain = () => {
    setTrainState('training');
    setResults(null);
    setTimeout(() => {
      setResults(MOCK_MODEL_RESULTS);
      setTrainState('done');
    }, 2800);
  };

  const accuracyPct = results ? Math.round(results.accuracy * 100) : 0;
  const programsInData = PROGRAMS;
  const recordCount = MOCK_TRAINING_DATA.length;

  return (
    <AppShell title="Model">
      <div className="max-w-4xl mx-auto space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">C4.5 Recommendation Model</h2>
          <p className="text-slate-500 mt-1">
            Train and evaluate the decision tree model used for program recommendations.
          </p>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Simulation Notice:</span> The training process and results shown here are
            simulated for the prototype. No actual machine learning is performed.
          </p>
        </div>

        {/* Pruning Settings + Train Button */}
        <Card>
          <CardHeader
            title="Training Configuration"
            subtitle="C4.5 pruning parameters"
            icon={<Settings2 className="w-5 h-5" />}
          />
          <div className="p-5 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Confidence Factor (C)"
                type="number"
                step="0.05"
                min="0.05"
                max="0.5"
                value={confidenceFactor}
                onChange={(e) => setConfidenceFactor(Number(e.target.value))}
                hint="Lower = more aggressive pruning (typical: 0.25)"
              />
              <Input
                label="Minimum Instances per Leaf (M)"
                type="number"
                min="1"
                max="10"
                value={minInstances}
                onChange={(e) => setMinInstances(Number(e.target.value))}
                hint="Higher = simpler tree, less overfitting"
              />
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-slate-100">
              <div className="text-sm text-slate-500">
                Training on <span className="font-semibold text-slate-700">{recordCount}</span> records
                with <span className="font-semibold text-slate-700">{programsInData.length}</span> target programs
              </div>
              {trainState === 'training' ? (
                <Button disabled size="lg">
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Training...
                </Button>
              ) : (
                <Button onClick={handleTrain} size="lg">
                  <Play className="w-4 h-4 mr-1.5" />
                  {trainState === 'done' ? 'Retrain Model' : 'Train Model'}
                </Button>
              )}
            </div>

            {/* Training progress animation */}
            {trainState === 'training' && (
              <div className="space-y-2 pt-2">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Loader2 className="w-4 h-4 animate-spin text-teal-600" />
                  Building decision tree from training data...
                </div>
                <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-teal-500 rounded-full animate-pulse" style={{ width: '60%' }} />
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  Computing information gain, splitting nodes, applying pruning...
                </div>
              </div>
            )}
          </div>
        </Card>

        {/* Results */}
        {trainState === 'done' && results && (
          <div className="space-y-4 animate-in fade-in duration-500">
            {/* Success banner */}
            <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm font-semibold text-emerald-800">Model trained successfully</p>
                <p className="text-xs text-emerald-700">Pruned C4.5 tree with confidence factor {confidenceFactor} and min {minInstances} instances per leaf.</p>
              </div>
            </div>

            {/* Accuracy summary */}
            <div className="grid sm:grid-cols-3 gap-4">
              <Card className="p-5 text-center">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-2">
                  <TrendingUp className="w-6 h-6 text-teal-600" />
                </div>
                <p className="text-3xl font-bold text-slate-800">{accuracyPct}%</p>
                <p className="text-sm text-slate-500 mt-1">Accuracy</p>
              </Card>
              <Card className="p-5 text-center">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center mx-auto mb-2">
                  <Cpu className="w-6 h-6 text-blue-600" />
                </div>
                <p className="text-3xl font-bold text-slate-800">{results.correctPredictions}/{results.totalSamples}</p>
                <p className="text-sm text-slate-500 mt-1">Correct / Total</p>
              </Card>
              <Card className="p-5 text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-2">
                  <GitBranch className="w-6 h-6 text-amber-600" />
                </div>
                <p className="text-3xl font-bold text-slate-800">10</p>
                <p className="text-sm text-slate-500 mt-1">Decision Rules</p>
              </Card>
            </div>

            {/* Confusion Matrix */}
            <Card>
              <CardHeader
                title="Confusion Matrix"
                subtitle="Predicted vs actual program assignments"
                icon={<Cpu className="w-5 h-5" />}
              />
              <div className="p-5 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr>
                      <th className="px-3 py-2 text-left font-semibold text-slate-600 sticky left-0 bg-white">
                        Predicted \ Actual
                      </th>
                      {programsInData.map((p) => (
                        <th key={p} className="px-2 py-2 text-center font-semibold text-slate-600 whitespace-nowrap">
                          {p.replace('BS ', '').replace('BA ', '')}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {programsInData.map((predicted) => (
                      <tr key={predicted} className="border-t border-slate-100">
                        <td className="px-3 py-2 font-medium text-slate-700 whitespace-nowrap sticky left-0 bg-white">
                          {predicted.replace('BS ', '').replace('BA ', '')}
                        </td>
                        {programsInData.map((actual) => {
                          const entry = results.confusionMatrix.find(
                            (e) => e.predicted === predicted && e.actual === actual,
                          );
                          const count = entry?.count ?? 0;
                          const isDiagonal = predicted === actual;
                          return (
                            <td key={actual} className="px-2 py-2 text-center">
                              {count > 0 ? (
                                <span
                                  className={`inline-flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold ${
                                    isDiagonal
                                      ? 'bg-emerald-100 text-emerald-700'
                                      : 'bg-red-100 text-red-600'
                                  }`}
                                >
                                  {count}
                                </span>
                              ) : (
                                <span className="text-slate-300">·</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Per-Program Precision/Recall */}
            <Card>
              <CardHeader
                title="Per-Program Metrics"
                subtitle="Precision, recall, and F1 score for each program"
                icon={<TrendingUp className="w-5 h-5" />}
              />
              <div className="p-5 space-y-3">
                {results.programMetrics.map((metric) => (
                  <div
                    key={metric.program}
                    className="flex items-center gap-4 p-3 rounded-xl border border-slate-100"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-slate-800 text-sm">{metric.program}</p>
                      <p className="text-xs text-slate-400">Support: {metric.support} samples</p>
                    </div>
                    <div className="flex items-center gap-6 flex-shrink-0">
                      <div className="text-center">
                        <p className="text-xs text-slate-400">Precision</p>
                        <p className="font-bold text-slate-700">{Math.round(metric.precision * 100)}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-400">Recall</p>
                        <p className="font-bold text-slate-700">{Math.round(metric.recall * 100)}%</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-slate-400">F1</p>
                        <p className="font-bold text-slate-700">{metric.f1.toFixed(2)}</p>
                      </div>
                      <Badge tone={metric.f1 >= 0.8 ? 'green' : metric.f1 >= 0.7 ? 'amber' : 'red'}>
                        {metric.f1 >= 0.8 ? 'Good' : metric.f1 >= 0.7 ? 'Fair' : 'Poor'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Link to decision tree */}
            <Card className="p-5 bg-teal-50 border-teal-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <GitBranch className="w-6 h-6 text-teal-600" />
                  <div>
                    <h3 className="font-semibold text-slate-800">View Decision Tree</h3>
                    <p className="text-sm text-slate-600">See the trained tree structure and extracted rules.</p>
                  </div>
                </div>
                <Link
                  to="/admin/model/tree"
                  className="flex items-center gap-1 px-4 py-2.5 rounded-lg bg-teal-600 text-white text-sm font-semibold hover:bg-teal-700 transition-colors flex-shrink-0"
                >
                  View Tree
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </Card>
          </div>
        )}

        {trainState === 'idle' && (
          <Card className="p-8 text-center">
            <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
              <Cpu className="w-7 h-7 text-slate-400" />
            </div>
            <h3 className="font-semibold text-slate-700 mb-1">Model not trained yet</h3>
            <p className="text-sm text-slate-500 max-w-sm mx-auto">
              Click "Train Model" above to simulate building the C4.5 decision tree from the training data.
            </p>
          </Card>
        )}
      </div>
    </AppShell>
  );
}
