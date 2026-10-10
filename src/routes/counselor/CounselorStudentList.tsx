import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, X, Users, ArrowRight, Info } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Select } from '@/components/ui/Input';
import { MOCK_STUDENTS } from '@/mock/users';
import type { Strand, Track } from '@/types';

type StatusFilter = 'all' | 'no-profile' | 'in-progress' | 'completed';

function getStudentStatus(s: (typeof MOCK_STUDENTS)[0]): 'no-profile' | 'in-progress' | 'completed' {
  if (!s.hasProfile) return 'no-profile';
  if (s.hasResults) return 'completed';
  return 'in-progress';
}

const STATUS_META: Record<string, { label: string; tone: 'red' | 'amber' | 'green' }> = {
  'no-profile': { label: 'No Profile', tone: 'red' },
  'in-progress': { label: 'In Progress', tone: 'amber' },
  completed: { label: 'Completed', tone: 'green' },
};

export function CounselorStudentList() {
  const [search, setSearch] = useState('');
  const [strandFilter, setStrandFilter] = useState('all');
  const [trackFilter, setTrackFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');

  const strands = useMemo(
    () => [...new Set(MOCK_STUDENTS.map((s) => s.strand))].sort(),
    [],
  );

  const filtered = useMemo(() => {
    return MOCK_STUDENTS.filter((s) => {
      const matchesSearch =
        search === '' ||
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase());
      const matchesStrand = strandFilter === 'all' || s.strand === strandFilter;
      const matchesTrack = trackFilter === 'all' || s.track === trackFilter;
      const matchesStatus = statusFilter === 'all' || getStudentStatus(s) === statusFilter;
      return matchesSearch && matchesStrand && matchesTrack && matchesStatus;
    });
  }, [search, strandFilter, trackFilter, statusFilter]);

  const hasActiveFilters = search !== '' || strandFilter !== 'all' || trackFilter !== 'all' || statusFilter !== 'all';

  const clearFilters = () => {
    setSearch('');
    setStrandFilter('all');
    setTrackFilter('all');
    setStatusFilter('all');
  };

  return (
    <AppShell title="Students">
      <div className="max-w-5xl mx-auto space-y-5">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Student List</h2>
          <p className="text-slate-500 mt-1">Search and filter students to view their profiles and recommendations.</p>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-blue-50 border border-blue-200">
          <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-800">
            All student data is simulated for this prototype. Click a student to view their read-only profile summary.
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
                  placeholder="Search by name or email..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="w-36">
              <Select label="Track" value={trackFilter} onChange={(e) => setTrackFilter(e.target.value)}>
                <option value="all">All Tracks</option>
                <option value="Academic">Academic</option>
                <option value="Tech-Pro">Tech-Pro</option>
              </Select>
            </div>
            <div className="w-36">
              <Select label="Strand" value={strandFilter} onChange={(e) => setStrandFilter(e.target.value)}>
                <option value="all">All Strands</option>
                {strands.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </Select>
            </div>
            <div className="w-40">
              <Select label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as StatusFilter)}>
                <option value="all">All Statuses</option>
                <option value="no-profile">No Profile</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </Select>
            </div>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1 px-3 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
                Clear
              </button>
            )}
          </div>
        </Card>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <Filter className="w-4 h-4" />
          Showing <span className="font-semibold text-slate-700">{filtered.length}</span> of {MOCK_STUDENTS.length} students
        </div>

        {/* Student table */}
        <Card className="overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No students match your filters.</p>
              <button onClick={clearFilters} className="text-sm text-teal-600 font-semibold mt-2">
                Clear filters
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Student</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Strand</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Track</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Grade</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-600">View</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((student) => {
                    const status = getStudentStatus(student);
                    const statusMeta = STATUS_META[status];
                    return (
                      <tr key={student.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3">
                          <p className="font-medium text-slate-800">{student.name}</p>
                          <p className="text-xs text-slate-400">{student.email}</p>
                        </td>
                        <td className="px-4 py-3"><span className="font-medium text-slate-700">{student.strand}</span></td>
                        <td className="px-4 py-3"><span className="text-slate-600">{student.track}</span></td>
                        <td className="px-4 py-3"><span className="text-slate-600">{student.gradeLevel}</span></td>
                        <td className="px-4 py-3"><Badge tone={statusMeta.tone}>{statusMeta.label}</Badge></td>
                        <td className="px-4 py-3 text-right">
                          <Link
                            to={`/counselor/students/${student.id}`}
                            className="inline-flex items-center gap-1 text-teal-700 font-semibold hover:text-teal-800"
                          >
                            View <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>
    </AppShell>
  );
}
