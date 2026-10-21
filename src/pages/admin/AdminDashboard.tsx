import { Link } from 'react-router-dom';
import { Users, Database, Cpu, BookOpen, Settings, ArrowRight, TrendingUp, Info, ClipboardList, FileSpreadsheet } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { MOCK_MANAGED_USERS, MOCK_STUDENTS } from '@/data/users';
import { MOCK_PROGRAMS } from '@/data/programs';
import { ASSESSMENT_INSTRUMENTS } from '@/data/assessments';

export function AdminDashboard() {
  const totalUsers = MOCK_MANAGED_USERS.length;
  const activeUsers = MOCK_MANAGED_USERS.filter((u) => u.status === 'active').length;
  const totalStudents = MOCK_STUDENTS.length;
  const completedAssessments = MOCK_STUDENTS.filter((s) => s.hasAssessment).length;
  const totalPrograms = MOCK_PROGRAMS.length;
  const totalQuestions = ASSESSMENT_INSTRUMENTS.reduce((sum, i) => sum + i.questions.length, 0);

  const stats = [
    { label: 'Total Users', value: totalUsers, sub: `${activeUsers} active`, icon: Users, color: 'teal', to: '/admin/users' },
    { label: 'Programs', value: totalPrograms, sub: 'in catalog', icon: BookOpen, color: 'blue', to: '/admin/programs' },
    { label: 'Training Records', value: 32, sub: 'mock dataset', icon: Database, color: 'amber', to: '/admin/training-data' },
    { label: 'Assessment Items', value: totalQuestions, sub: 'across 5 instruments', icon: ClipboardList, color: 'slate', to: '/admin/assessment-items' },
  ];

  const colorMap: Record<string, string> = {
    teal: 'bg-teal-50 text-teal-600',
    blue: 'bg-blue-50 text-blue-600',
    amber: 'bg-amber-50 text-amber-600',
    slate: 'bg-slate-100 text-slate-500',
  };

  const quickLinks = [
    { label: 'Training Data', desc: 'View and manage historical records', to: '/admin/training-data', icon: Database },
    { label: 'Model Training', desc: 'Train and evaluate the C4.5 model', to: '/admin/model', icon: Cpu },
    { label: 'Program Catalog', desc: 'Add and edit college programs', to: '/admin/programs', icon: BookOpen },
    { label: 'User Management', desc: 'Add, edit, and disable users', to: '/admin/users', icon: Users },
    { label: 'Assessment Items', desc: 'Manage questions per instrument', to: '/admin/assessment-items', icon: ClipboardList },
    { label: 'Threshold Settings', desc: 'Configure score categories', to: '/admin/settings', icon: Settings },
  ];

  return (
    <AppShell title="Admin Dashboard">
      <div className="max-w-5xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">System Overview</h2>
          <p className="text-slate-500 mt-1">Manage users, programs, assessments, and the recommendation model.</p>
        </div>

        <div className="flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-200">
          <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Simulation Notice:</span> All data shown here is mock data for the prototype.
            Changes made in admin pages are not persisted.
          </p>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <Link key={stat.label} to={stat.to}>
                <Card className="p-5 hover:shadow-md transition-shadow cursor-pointer h-full">
                  <div className={`w-11 h-11 rounded-xl ${colorMap[stat.color]} flex items-center justify-center mb-3`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-3xl font-bold text-slate-800">{stat.value}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{stat.label}</p>
                  <p className="text-xs text-slate-400 mt-1">{stat.sub}</p>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Student completion progress */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              <h3 className="font-semibold text-slate-700">Student Assessment Completion</h3>
            </div>
            <Badge tone={completedAssessments / totalStudents >= 0.5 ? 'green' : 'amber'}>
              {Math.round((completedAssessments / totalStudents) * 100)}%
            </Badge>
          </div>
          <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-teal-500 rounded-full transition-all"
              style={{ width: `${(completedAssessments / totalStudents) * 100}%` }}
            />
          </div>
          <p className="text-sm text-slate-500 mt-2">
            {completedAssessments} of {totalStudents} students have completed their assessments.
          </p>
        </Card>

        {/* Quick links */}
        <div>
          <h3 className="text-lg font-bold text-slate-800 mb-3">Quick Actions</h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {quickLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className="group"
                >
                  <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer h-full">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-500 group-hover:bg-teal-50 group-hover:text-teal-600 flex items-center justify-center flex-shrink-0 transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-800 text-sm">{link.label}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{link.desc}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-teal-500 flex-shrink-0 transition-colors" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
