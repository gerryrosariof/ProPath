import { useMemo, useState, useRef } from 'react';
import { Search, Upload, Database, Filter, X, FileSpreadsheet, Info } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Input';
import { MOCK_TRAINING_DATA, PROGRAMS } from '@/data/model';
import type { Category } from '@/utils/types';

const CATEGORY_TONES: Record<Category, 'red' | 'amber' | 'green'> = {
  Low: 'red',
  Average: 'amber',
  High: 'green',
};

const COLUMNS: { key: keyof typeof MOCK_TRAINING_DATA[0]; label: string; renderCategory?: boolean }[] = [
  { key: 'id', label: 'ID' },
  { key: 'studentName', label: 'Student' },
  { key: 'strand', label: 'Strand' },
  { key: 'gwaCategory', label: 'GWA', renderCategory: true },
  { key: 'verbalCategory', label: 'Verbal', renderCategory: true },
  { key: 'numericalCategory', label: 'Numerical', renderCategory: true },
  { key: 'abstractCategory', label: 'Abstract', renderCategory: true },
  { key: 'riasecTop', label: 'RIASEC' },
  { key: 'skillCategory', label: 'Skills', renderCategory: true },
  { key: 'conscientiousness', label: 'Consc.', renderCategory: true },
  { key: 'actualProgram', label: 'Program' },
  { key: 'year', label: 'Year' },
];

export function TrainingData() {
  const [search, setSearch] = useState('');
  const [programFilter, setProgramFilter] = useState('all');
  const [strandFilter, setStrandFilter] = useState('all');
  const [yearFilter, setYearFilter] = useState('all');
  const [uploadOpen, setUploadOpen] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filtered = useMemo(() => {
    return MOCK_TRAINING_DATA.filter((r) => {
      const matchesSearch =
        search === '' ||
        r.studentName.toLowerCase().includes(search.toLowerCase()) ||
        r.id.toLowerCase().includes(search.toLowerCase());
      const matchesProgram = programFilter === 'all' || r.actualProgram === programFilter;
      const matchesStrand = strandFilter === 'all' || r.strand === strandFilter;
      const matchesYear = yearFilter === 'all' || r.year === yearFilter;
      return matchesSearch && matchesProgram && matchesStrand && matchesYear;
    });
  }, [search, programFilter, strandFilter, yearFilter]);

  const years = useMemo(
    () => [...new Set(MOCK_TRAINING_DATA.map((r) => r.year))].sort().reverse(),
    [],
  );
  const strands = useMemo(
    () => [...new Set(MOCK_TRAINING_DATA.map((r) => r.strand))].sort(),
    [],
  );

  const hasActiveFilters = programFilter !== 'all' || strandFilter !== 'all' || yearFilter !== 'all' || search !== '';

  const clearFilters = () => {
    setSearch('');
    setProgramFilter('all');
    setStrandFilter('all');
    setYearFilter('all');
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedFile(file.name);
    }
  };

  const handleUploadSubmit = () => {
    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setUploadOpen(false);
      setUploadedFile(null);
    }, 2000);
  };

  return (
    <AppShell title="Training Data">
      <div className="max-w-6xl mx-auto space-y-5">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Training Data</h2>
            <p className="text-slate-500 mt-1">
              Historical student records used to train the C4.5 recommendation model.
            </p>
          </div>
          <Button onClick={() => setUploadOpen(true)}>
            <Upload className="w-4 h-4 mr-1.5" />
            Upload CSV
          </Button>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Simulation Notice:</span> This page uses mock historical data for the prototype.
            CSV upload is a UI mock — no data is actually imported or persisted.
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
                  placeholder="Search by name or ID..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="w-48">
              <Select
                label="Program"
                value={programFilter}
                onChange={(e) => setProgramFilter(e.target.value)}
              >
                <option value="all">All Programs</option>
                {PROGRAMS.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </Select>
            </div>
            <div className="w-36">
              <Select
                label="Strand"
                value={strandFilter}
                onChange={(e) => setStrandFilter(e.target.value)}
              >
                <option value="all">All Strands</option>
                {strands.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </div>
            <div className="w-28">
              <Select
                label="Year"
                value={yearFilter}
                onChange={(e) => setYearFilter(e.target.value)}
              >
                <option value="all">All Years</option>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </Select>
            </div>
            {hasActiveFilters && (
              <Button variant="ghost" size="md" onClick={clearFilters}>
                <X className="w-4 h-4 mr-1" />
                Clear
              </Button>
            )}
          </div>
        </Card>

        {/* Results count */}
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Filter className="w-4 h-4" />
          Showing <span className="font-semibold text-slate-700">{filtered.length}</span> of {MOCK_TRAINING_DATA.length} records
        </div>

        {/* Table */}
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  {COLUMNS.map((col) => (
                    <th
                      key={col.key}
                      className="px-3 py-3 text-left font-semibold text-slate-600 whitespace-nowrap"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={COLUMNS.length} className="px-3 py-8 text-center text-slate-400">
                      No records match your filters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((record) => (
                    <tr
                      key={record.id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition-colors"
                    >
                      {COLUMNS.map((col) => {
                        const value = record[col.key];
                        const isCategory = col.renderCategory && ['Low', 'Average', 'High'].includes(value as string);
                        return (
                          <td key={col.key} className="px-3 py-2.5 whitespace-nowrap">
                            {isCategory ? (
                              <Badge tone={CATEGORY_TONES[value as Category]}>{value as Category}</Badge>
                            ) : col.key === 'actualProgram' ? (
                              <span className="font-medium text-slate-700">{value as string}</span>
                            ) : col.key === 'studentName' ? (
                              <span className="font-medium text-slate-800">{value as string}</span>
                            ) : col.key === 'riasecTop' ? (
                              <span className="font-bold text-teal-700">{value as string}</span>
                            ) : (
                              <span className="text-slate-600">{value as string}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Upload Modal */}
      {uploadOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setUploadOpen(false)} />
          <Card className="relative max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center">
                  <FileSpreadsheet className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800">Upload Training Data</h3>
                  <p className="text-xs text-slate-500">CSV format, max 10MB</p>
                </div>
              </div>
              <button
                onClick={() => setUploadOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {uploadSuccess ? (
              <div className="flex flex-col items-center py-6">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                  <Database className="w-6 h-6 text-emerald-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700">Data imported successfully (simulated)</p>
                <p className="text-xs text-slate-500 mt-1">Records would be added to the training set.</p>
              </div>
            ) : (
              <>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/50 transition-colors"
                >
                  <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  {uploadedFile ? (
                    <p className="text-sm font-medium text-teal-700">{uploadedFile}</p>
                  ) : (
                    <>
                      <p className="text-sm text-slate-500">Click to select a CSV file</p>
                      <p className="text-xs text-slate-400 mt-1">Expected columns: student_id, strand, gwa, verbal, numerical, abstract, riasec, skills, program</p>
                    </>
                  )}
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".csv"
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                </div>
                <div className="flex justify-end gap-2 mt-4">
                  <Button variant="secondary" onClick={() => setUploadOpen(false)}>Cancel</Button>
                  <Button onClick={handleUploadSubmit} disabled={!uploadedFile}>
                    <Upload className="w-4 h-4 mr-1.5" />
                    Import
                  </Button>
                </div>
              </>
            )}
          </Card>
        </div>
      )}
    </AppShell>
  );
}
