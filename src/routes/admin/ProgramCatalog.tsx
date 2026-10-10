import { useMemo, useState } from 'react';
import { Search, Plus, Pencil, X, Info, BookOpen, CheckCircle2, Briefcase, GraduationCap } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { MOCK_PROGRAMS, type CollegeProgram } from '@/mock/programs';
import type { Strand } from '@/types';

const ALL_STRANDS: Strand[] = ['STEM', 'ABM', 'HUMSS', 'GAS', 'ICT', 'HE', 'IA'];

export function ProgramCatalog() {
  const [programs, setPrograms] = useState<CollegeProgram[]>(MOCK_PROGRAMS);
  const [search, setSearch] = useState('');
  const [fieldFilter, setFieldFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProgram, setEditingProgram] = useState<CollegeProgram | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '',
    field: '',
    description: '',
    targetStrands: [] as Strand[],
    careerOutcomes: [] as string[],
    duration: '4 years',
    status: 'active' as 'active' | 'inactive',
  });

  const fields = useMemo(
    () => [...new Set(programs.map((p) => p.field))].sort(),
    [programs],
  );

  const filtered = useMemo(() => {
    return programs.filter((p) => {
      const matchesSearch =
        search === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase());
      const matchesField = fieldFilter === 'all' || p.field === fieldFilter;
      return matchesSearch && matchesField;
    });
  }, [programs, search, fieldFilter]);

  const openAdd = () => {
    setEditingProgram(null);
    setForm({ name: '', field: '', description: '', targetStrands: [], careerOutcomes: [], duration: '4 years', status: 'active' });
    setModalOpen(true);
  };

  const openEdit = (program: CollegeProgram) => {
    setEditingProgram(program);
    setForm({
      name: program.name,
      field: program.field,
      description: program.description,
      targetStrands: program.targetStrands as Strand[],
      careerOutcomes: program.careerOutcomes,
      duration: program.duration,
      status: program.status,
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.field.trim()) return;
    if (editingProgram) {
      setPrograms((prev) =>
        prev.map((p) => (p.id === editingProgram.id ? { ...editingProgram, ...form } : p)),
      );
    } else {
      const newProgram: CollegeProgram = {
        id: `prog-${Date.now()}`,
        ...form,
      };
      setPrograms((prev) => [...prev, newProgram]);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setModalOpen(false);
    }, 1200);
  };

  const toggleStrand = (strand: Strand) => {
    setForm((prev) => ({
      ...prev,
      targetStrands: prev.targetStrands.includes(strand)
        ? prev.targetStrands.filter((s) => s !== strand)
        : [...prev.targetStrands, strand],
    }));
  };

  const addCareerOutcome = () => {
    setForm((prev) => ({ ...prev, careerOutcomes: [...prev.careerOutcomes, ''] }));
  };

  const updateCareerOutcome = (idx: number, value: string) => {
    setForm((prev) => ({
      ...prev,
      careerOutcomes: prev.careerOutcomes.map((c, i) => (i === idx ? value : c)),
    }));
  };

  const removeCareerOutcome = (idx: number) => {
    setForm((prev) => ({
      ...prev,
      careerOutcomes: prev.careerOutcomes.filter((_, i) => i !== idx),
    }));
  };

  return (
    <AppShell title="Program Catalog">
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">College Program Catalog</h2>
            <p className="text-slate-500 mt-1">Manage the college programs available for recommendations.</p>
          </div>
          <Button onClick={openAdd}>
            <Plus className="w-4 h-4 mr-1.5" />
            Add Program
          </Button>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Simulation Notice:</span> Changes are in-memory only and reset on page reload.
          </p>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="flex flex-wrap items-end gap-3">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-slate-700 mb-1.5">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or description..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="w-48">
              <Select label="Field" value={fieldFilter} onChange={(e) => setFieldFilter(e.target.value)}>
                <option value="all">All Fields</option>
                {fields.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </Select>
            </div>
          </div>
        </Card>

        {/* Program cards */}
        {filtered.length === 0 ? (
          <Card className="p-12 text-center">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-slate-500 font-medium">No programs match your filters.</p>
          </Card>
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((program) => (
              <Card key={program.id} className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center flex-shrink-0">
                      <GraduationCap className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800">{program.name}</h3>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Briefcase className="w-3 h-3" />
                        {program.field}
                      </p>
                    </div>
                  </div>
                  <Badge tone={program.status === 'active' ? 'green' : 'slate'}>
                    {program.status === 'active' ? 'Active' : 'Inactive'}
                  </Badge>
                </div>

                <p className="text-sm text-slate-600 mt-3 leading-relaxed">{program.description}</p>

                <div className="mt-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Target Strands</p>
                  <div className="flex flex-wrap gap-1.5">
                    {program.targetStrands.map((s) => (
                      <Badge key={s} tone="teal">{s}</Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-3">
                  <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-1.5">Careers</p>
                  <p className="text-sm text-slate-600">{program.careerOutcomes.join(', ')}</p>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-400">{program.duration}</span>
                  <button
                    onClick={() => openEdit(program)}
                    className="flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    Edit
                  </button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Add/Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setModalOpen(false)} />
          <Card className="relative max-w-lg w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-lg">
                {editingProgram ? 'Edit Program' : 'Add New Program'}
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
                <p className="text-sm font-semibold text-slate-700">
                  Program {editingProgram ? 'updated' : 'added'} successfully
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  label="Program Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g. BS Computer Science"
                />
                <Input
                  label="Field"
                  value={form.field}
                  onChange={(e) => setForm({ ...form, field: e.target.value })}
                  placeholder="e.g. Computing & Technology"
                />
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1.5">Description</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    placeholder="Brief description of the program..."
                    rows={3}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 resize-none"
                  />
                </div>
                <Input
                  label="Duration"
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  placeholder="e.g. 4 years"
                />
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Target Strands</label>
                  <div className="flex flex-wrap gap-2">
                    {ALL_STRANDS.map((s) => (
                      <button
                        key={s}
                        onClick={() => toggleStrand(s)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium border transition-colors ${
                          form.targetStrands.includes(s)
                            ? 'bg-teal-600 text-white border-teal-600'
                            : 'bg-white text-slate-600 border-slate-300 hover:border-teal-300'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">Career Outcomes</label>
                  <div className="space-y-2">
                    {form.careerOutcomes.map((outcome, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <input
                          type="text"
                          value={outcome}
                          onChange={(e) => updateCareerOutcome(idx, e.target.value)}
                          placeholder="e.g. Software Engineer"
                          className="flex-1 px-3 py-2 rounded-lg border border-slate-300 text-sm text-slate-800"
                        />
                        <button
                          onClick={() => removeCareerOutcome(idx)}
                          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={addCareerOutcome}
                      className="flex items-center gap-1 text-sm font-semibold text-teal-700 hover:text-teal-800"
                    >
                      <Plus className="w-4 h-4" />
                      Add Career
                    </button>
                  </div>
                </div>
                <Select
                  label="Status"
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as 'active' | 'inactive' })}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </Select>
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} disabled={!form.name.trim() || !form.field.trim()}>
                    {editingProgram ? 'Save Changes' : 'Add Program'}
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
