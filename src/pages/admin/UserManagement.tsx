import { useMemo, useState } from 'react';
import { Search, UserPlus, X, Pencil, Ban, CheckCircle2, Info, Users as UsersIcon } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { MOCK_MANAGED_USERS, type ManagedUser } from '@/mock/users';
import { STRANDS_BY_TRACK } from '@/data/constants';
import type { Role, Strand, Track } from '@/types';

export function UserManagement() {
  const [users, setUsers] = useState<ManagedUser[]>(MOCK_MANAGED_USERS);
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<ManagedUser | null>(null);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [form, setForm] = useState({
    name: '',
    email: '',
    role: 'student' as Role,
    track: 'Academic' as Track,
    strand: 'STEM' as Strand,
    gradeLevel: 'Grade 11' as 'Grade 11' | 'Grade 12',
  });

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchesSearch =
        search === '' ||
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());
      const matchesRole = roleFilter === 'all' || u.role === roleFilter;
      const matchesStatus = statusFilter === 'all' || u.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, search, roleFilter, statusFilter]);

  const openAdd = () => {
    setEditingUser(null);
    setForm({ name: '', email: '', role: 'student', track: 'Academic', strand: 'STEM', gradeLevel: 'Grade 11' });
    setModalOpen(true);
  };

  const openEdit = (user: ManagedUser) => {
    setEditingUser(user);
    setForm({
      name: user.name,
      email: user.email,
      role: user.role,
      track: user.track ?? 'Academic',
      strand: user.strand ?? 'STEM',
      gradeLevel: user.gradeLevel ?? 'Grade 11',
    });
    setModalOpen(true);
  };

  const handleSave = () => {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editingUser.id
            ? {
                ...u,
                name: form.name,
                email: form.email,
                role: form.role,
                ...(form.role === 'student'
                  ? { track: form.track, strand: form.strand, gradeLevel: form.gradeLevel }
                  : { track: undefined, strand: undefined, gradeLevel: undefined }),
              }
            : u,
        ),
      );
    } else {
      const newUser: ManagedUser = {
        id: `usr-${Date.now()}`,
        name: form.name,
        email: form.email,
        role: form.role,
        status: 'active',
        createdAt: new Date().toISOString().slice(0, 10),
        ...(form.role === 'student'
          ? { track: form.track, strand: form.strand, gradeLevel: form.gradeLevel }
          : {}),
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setModalOpen(false);
    }, 1200);
  };

  const toggleStatus = (id: string) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === 'active' ? 'disabled' : 'active' } : u,
      ),
    );
  };

  const roleLabels: Record<Role, string> = { student: 'Student', counselor: 'Counselor', admin: 'Admin' };

  return (
    <AppShell title="User Management">
      <div className="max-w-5xl mx-auto space-y-5">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">User Management</h2>
            <p className="text-slate-500 mt-1">Add, edit, and disable user accounts.</p>
          </div>
          <Button onClick={openAdd}>
            <UserPlus className="w-4 h-4 mr-1.5" />
            Add User
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
                  placeholder="Search by name or email..."
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-slate-300 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500"
                />
              </div>
            </div>
            <div className="w-36">
              <Select label="Role" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                <option value="all">All Roles</option>
                <option value="student">Students</option>
                <option value="counselor">Counselors</option>
                <option value="admin">Admins</option>
              </Select>
            </div>
            <div className="w-36">
              <Select label="Status" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">All</option>
                <option value="active">Active</option>
                <option value="disabled">Disabled</option>
              </Select>
            </div>
          </div>
        </Card>

        {/* Table */}
        <Card className="overflow-hidden">
          {filtered.length === 0 ? (
            <div className="p-12 text-center">
              <UsersIcon className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No users match your filters.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Name</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Email</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Role</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Strand/Track</th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-600">Status</th>
                    <th className="px-4 py-3 text-right font-semibold text-slate-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((user) => (
                    <tr key={user.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-medium text-slate-800">{user.name}</td>
                      <td className="px-4 py-3 text-slate-600">{user.email}</td>
                      <td className="px-4 py-3">
                        <Badge tone={user.role === 'admin' ? 'amber' : user.role === 'counselor' ? 'blue' : 'teal'}>
                          {roleLabels[user.role]}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {user.role === 'student' ? `${user.strand ?? '—'} / ${user.track ?? '—'}` : '—'}
                      </td>
                      <td className="px-4 py-3">
                        <Badge tone={user.status === 'active' ? 'green' : 'red'}>
                          {user.status === 'active' ? 'Active' : 'Disabled'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openEdit(user)}
                            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-teal-600 transition-colors"
                            title="Edit"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => toggleStatus(user.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              user.status === 'active'
                                ? 'text-slate-500 hover:bg-red-50 hover:text-red-600'
                                : 'text-slate-500 hover:bg-emerald-50 hover:text-emerald-600'
                            }`}
                            title={user.status === 'active' ? 'Disable' : 'Enable'}
                          >
                            {user.status === 'active' ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Add/Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/40" onClick={() => setModalOpen(false)} />
          <Card className="relative max-w-md w-full p-6">
            <div className="flex items-start justify-between mb-4">
              <h3 className="font-bold text-slate-800 text-lg">
                {editingUser ? 'Edit User' : 'Add New User'}
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
                  User {editingUser ? 'updated' : 'added'} successfully
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Input
                  label="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Juan Dela Cruz"
                />
                <Input
                  label="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="juan@school.ph"
                />
                <Select
                  label="Role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value as Role })}
                >
                  <option value="student">Student</option>
                  <option value="counselor">Counselor</option>
                  <option value="admin">Admin</option>
                </Select>
                {form.role === 'student' && (
                  <div className="grid grid-cols-2 gap-3">
                    <Select
                      label="Track"
                      value={form.track}
                      onChange={(e) => {
                        const track = e.target.value as Track;
                        setForm({ ...form, track, strand: STRANDS_BY_TRACK[track][0] });
                      }}
                    >
                      <option value="Academic">Academic</option>
                      <option value="Tech-Pro">Tech-Pro</option>
                    </Select>
                    <Select
                      label="Strand"
                      value={form.strand}
                      onChange={(e) => setForm({ ...form, strand: e.target.value as Strand })}
                    >
                      {STRANDS_BY_TRACK[form.track].map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </Select>
                    <Select
                      label="Grade Level"
                      value={form.gradeLevel}
                      onChange={(e) => setForm({ ...form, gradeLevel: e.target.value as 'Grade 11' | 'Grade 12' })}
                    >
                      <option value="Grade 11">Grade 11</option>
                      <option value="Grade 12">Grade 12</option>
                    </Select>
                  </div>
                )}
                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button onClick={handleSave} disabled={!form.name.trim() || !form.email.trim()}>
                    {editingUser ? 'Save Changes' : 'Add User'}
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
