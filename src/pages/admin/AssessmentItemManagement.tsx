import { useState } from 'react';
import { ClipboardList, ChevronDown, ChevronRight, Plus, Pencil, X, Info, CheckCircle2, Trash2 } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { ASSESSMENT_INSTRUMENTS } from '@/mock/assessments';
import type { AssessmentInstrument, Question, QuestionType, QuestionOption } from '@/types';

export function AssessmentItemManagement() {
  const [instruments, setInstruments] = useState<AssessmentInstrument[]>(() =>
    ASSESSMENT_INSTRUMENTS.map((i) => ({ ...i, questions: [...i.questions] })),
  );
  const [expanded, setExpanded] = useState<string | null>(instruments[0]?.id ?? null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingInstrument, setEditingInstrument] = useState<string | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [form, setForm] = useState({
    text: '',
    type: 'multiple-choice' as QuestionType,
    trait: '',
    options: [] as { label: string; value: number }[],
  });

  const openAdd = (instrumentId: string) => {
    setEditingInstrument(instrumentId);
    setEditingQuestion(null);
    const instrument = instruments.find((i) => i.id === instrumentId);
    const isLikert = instrument?.questions[0]?.type === 'likert';
    setForm({
      text: '',
      type: isLikert ? 'likert' : 'multiple-choice',
      trait: '',
      options: isLikert
        ? [
            { label: 'Strongly Disagree', value: 1 },
            { label: 'Disagree', value: 2 },
            { label: 'Neutral', value: 3 },
            { label: 'Agree', value: 4 },
            { label: 'Strongly Agree', value: 5 },
          ]
        : [
            { label: '', value: 1 },
            { label: '', value: 2 },
            { label: '', value: 3 },
            { label: '', value: 5 },
          ],
    });
    setModalOpen(true);
  };

  const openEdit = (instrumentId: string, question: Question) => {
    setEditingInstrument(instrumentId);
    setEditingQuestion(question);
    setForm({
      text: question.text,
      type: question.type,
      trait: question.options[0]?.trait ?? '',
      options: question.options.map((o) => ({ label: o.label, value: o.value })),
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.text.trim() || !editingInstrument) return;
    const options: QuestionOption[] = form.options.map((o) => ({
      label: o.label,
      value: o.value,
      trait: form.trait || undefined,
    }));
    const newQuestion: Question = editingQuestion
      ? { ...editingQuestion, text: form.text, type: form.type, options }
      : {
          id: `q-${Date.now()}`,
          text: form.text,
          type: form.type,
          options,
        };

    setInstruments((prev) =>
      prev.map((inst) =>
        inst.id === editingInstrument
          ? {
              ...inst,
              questions: editingQuestion
                ? inst.questions.map((q) => (q.id === editingQuestion.id ? newQuestion : q))
                : [...inst.questions, newQuestion],
            }
          : inst,
      ),
    );
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setModalOpen(false);
    }, 1200);
  };

  const handleDelete = (instrumentId: string, questionId: string) => {
    setInstruments((prev) =>
      prev.map((inst) =>
        inst.id === instrumentId
          ? { ...inst, questions: inst.questions.filter((q) => q.id !== questionId) }
          : inst,
      ),
    );
  };

  return (
    <AppShell title="Assessment Items">
      <div className="max-w-4xl mx-auto space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Assessment Item Management</h2>
          <p className="text-slate-500 mt-1">Add, edit, and delete questions for each assessment instrument.</p>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Simulation Notice:</span> Changes are in-memory only and reset on page reload.
          </p>
        </div>

        {/* Instrument accordions */}
        <div className="space-y-3">
          {instruments.map((instrument) => {
            const isOpen = expanded === instrument.id;
            return (
              <Card key={instrument.id}>
                <button
                  onClick={() => setExpanded(isOpen ? null : instrument.id)}
                  className="w-full flex items-center justify-between p-4"
                >
                  <div className="flex items-center gap-3 text-left">
                    {isOpen ? <ChevronDown className="w-5 h-5 text-slate-400" /> : <ChevronRight className="w-5 h-5 text-slate-400" />}
                    <div>
                      <p className="font-semibold text-slate-800">{instrument.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {instrument.questions.length} questions • ~{instrument.estimatedMinutes} min
                      </p>
                    </div>
                  </div>
                  <Badge tone="slate">{instrument.shortTitle}</Badge>
                </button>

                {isOpen && (
                  <div className="border-t border-slate-100 p-4 space-y-2">
                    {instrument.questions.length === 0 ? (
                      <p className="text-sm text-slate-400 text-center py-4">No questions yet. Add one below.</p>
                    ) : (
                      instrument.questions.map((q, idx) => (
                        <div
                          key={q.id}
                          className="flex items-start gap-3 p-3 rounded-xl border border-slate-100"
                        >
                          <div className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-xs font-bold text-slate-500">{idx + 1}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm text-slate-700 font-medium">{q.text}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge tone={q.type === 'likert' ? 'blue' : 'teal'}>
                                {q.type === 'likert' ? 'Likert' : 'Multiple Choice'}
                              </Badge>
                              {q.options[0]?.trait && (
                                <span className="text-xs text-slate-400">Trait: {q.options[0].trait}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <button
                              onClick={() => openEdit(instrument.id, q)}
                              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-teal-600 transition-colors"
                            >
                              <Pencil className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(instrument.id, q.id)}
                              className="p-1.5 rounded-lg text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                    <button
                      onClick={() => openAdd(instrument.id)}
                      className="flex items-center gap-1.5 w-full p-3 rounded-xl border-2 border-dashed border-slate-200 text-slate-500 hover:border-teal-300 hover:text-teal-600 transition-colors text-sm font-semibold"
                    >
                      <Plus className="w-4 h-4" />
                      Add Question
                    </button>
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Add/Edit question modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setModalOpen(false)} />
          <Card className="relative max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-lg">
                {editingQuestion ? 'Edit Question' : 'Add Question'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {saveSuccess ? (
              <div className="flex flex-col items-center py-8">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Question saved successfully</p>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  label="Question Text"
                  value={form.text}
                  onChange={(e) => setForm({ ...form, text: e.target.value })}
                  placeholder="Enter the question..."
                />
                <Input
                  label="Trait / Category"
                  value={form.trait}
                  onChange={(e) => setForm({ ...form, trait: e.target.value })}
                  placeholder="e.g. verbal, numerical, Investigative..."
                  hint="All options for this question will be tagged with this trait."
                />
                <Select
                  label="Question Type"
                  value={form.type}
                  onChange={(e) => {
                    const type = e.target.value as QuestionType;
                    setForm({
                      ...form,
                      type,
                      options: type === 'likert'
                        ? [
                            { label: 'Strongly Disagree', value: 1 },
                            { label: 'Disagree', value: 2 },
                            { label: 'Neutral', value: 3 },
                            { label: 'Agree', value: 4 },
                            { label: 'Strongly Agree', value: 5 },
                          ]
                        : [
                            { label: '', value: 1 },
                            { label: '', value: 2 },
                            { label: '', value: 3 },
                            { label: '', value: 5 },
                          ],
                    });
                  }}
                >
                  <option value="multiple-choice">Multiple Choice</option>
                  <option value="likert">Likert Scale</option>
                </Select>

                <div>
                  <p className="text-sm font-semibold text-slate-700 mb-2">Answer Options</p>
                  <div className="space-y-2">
                    {form.options.map((opt, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="number"
                          value={opt.value}
                          onChange={(e) => {
                            const newOpts = [...form.options];
                            newOpts[idx] = { ...opt, value: Number(e.target.value) };
                            setForm({ ...form, options: newOpts });
                          }}
                          className="w-16 px-2 py-2 rounded-lg border border-slate-300 text-sm text-slate-800 text-center"
                        />
                        <input
                          type="text"
                          value={opt.label}
                          onChange={(e) => {
                            const newOpts = [...form.options];
                            newOpts[idx] = { ...opt, label: e.target.value };
                            setForm({ ...form, options: newOpts });
                          }}
                          placeholder="Option label..."
                          className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} disabled={!form.text.trim()}>
                    {editingQuestion ? 'Save Changes' : 'Add Question'}
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </AppShell>
  );
}
