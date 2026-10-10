import { NavLink, useLocation } from 'react-router-dom';
import { GraduationCap, LayoutDashboard, ClipboardList, FileText, Users, Settings, BookOpen, BarChart3, MessageSquare, ChevronLeft, PieChart, Database, Cpu, ClipboardCheck } from 'lucide-react';
import type { Role } from '@/types';
import { useAuth } from '@/context/AuthContext';

interface NavItem {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const NAV_BY_ROLE: Record<Role, NavItem[]> = {
  student: [
    { to: '/student/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/student/assessment', label: 'Assessment', icon: ClipboardList },
    { to: '/student/profile', label: 'Academic Profile', icon: BookOpen },
    { to: '/student/profile-category', label: 'My Profile', icon: PieChart },
    { to: '/student/results', label: 'My Results', icon: FileText },
  ],
  counselor: [
    { to: '/counselor/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/counselor/students', label: 'Students', icon: Users },
    { to: '/counselor/reports', label: 'Reports', icon: BarChart3 },
    { to: '/counselor/notes', label: 'Advising Notes', icon: MessageSquare },
  ],
  admin: [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/training-data', label: 'Training Data', icon: Database },
    { to: '/admin/model', label: 'Model', icon: Cpu },
    { to: '/admin/programs', label: 'Programs', icon: BookOpen },
    { to: '/admin/assessment-items', label: 'Assessment Items', icon: ClipboardCheck },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
  ],
};

const ROLE_LABELS: Record<Role, string> = {
  student: 'Student',
  counselor: 'Guidance Counselor',
  admin: 'System Admin',
};

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export function Sidebar({ open, onClose }: SidebarProps) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const items = NAV_BY_ROLE[user.role];
  const roleColor: Record<Role, string> = {
    student: 'text-teal-600',
    counselor: 'text-blue-600',
    admin: 'text-amber-600',
  };

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-slate-900/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-200 ${
          open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between px-5 h-16 border-b border-slate-100">
          <NavLink to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-lg text-slate-800">ProPath</span>
          </NavLink>
          <button onClick={onClose} className="lg:hidden text-slate-500">
            <ChevronLeft className="w-5 h-5" />
          </button>
        </div>

        <div className="px-4 py-3 border-b border-slate-100">
          <p className={`text-xs font-semibold uppercase tracking-wide ${roleColor[user.role]}`}>
            {ROLE_LABELS[user.role]}
          </p>
          <p className="text-sm text-slate-700 font-medium truncate">{user.name}</p>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const active = location.pathname.startsWith(item.to);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  active
                    ? 'bg-teal-50 text-teal-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="px-4 py-3 border-t border-slate-100">
          <p className="text-xs text-slate-400">ProPath Prototype v1.0</p>
          <p className="text-xs text-slate-400">Guidance Office Support Tool</p>
        </div>
      </aside>
    </>
  );
}
