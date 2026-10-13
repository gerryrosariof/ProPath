import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, GraduationCap as StudentIcon, Users as CounselorIcon, Shield as AdminIcon } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import type { Role } from '@/types';

const ROLE_OPTIONS: { role: Role; label: string; desc: string; icon: typeof StudentIcon }[] = [
  { role: 'student', label: 'Student', desc: 'Take assessments and get recommendations', icon: StudentIcon },
  { role: 'counselor', label: 'Guidance Counselor', desc: 'Review students and add advising notes', icon: CounselorIcon },
  { role: 'admin', label: 'System Admin', desc: 'Manage programs, users, and settings', icon: AdminIcon },
];

export function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>('student');
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: { name?: string; email?: string } = {};
    if (!name.trim()) next.name = 'Please enter your name.';
    if (!email.trim()) next.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = 'Please enter a valid email.';
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    register({ name, email, role });
    const home = role === 'student' ? '/student/dashboard' : role === 'counselor' ? '/counselor/dashboard' : '/admin/dashboard';
    navigate(home);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-800">ProPath</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Create your account</h1>
          <p className="text-slate-500 text-sm mb-6">Choose your role and fill in your details.</p>

          {/* Role selector */}
          <div className="mb-5">
            <p className="text-sm font-semibold text-slate-700 mb-2">I am a...</p>
            <div className="space-y-2">
              {ROLE_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const active = role === opt.role;
                return (
                  <button
                    key={opt.role}
                    type="button"
                    onClick={() => setRole(opt.role)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                      active
                        ? 'border-teal-500 bg-teal-50 ring-2 ring-teal-500/20'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${active ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className={`text-sm font-semibold ${active ? 'text-teal-800' : 'text-slate-700'}`}>{opt.label}</p>
                      <p className="text-xs text-slate-400">{opt.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              placeholder="Juan Dela Cruz"
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((p) => ({ ...p, name: undefined })); }}
              error={errors.name}
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@school.ph"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
              error={errors.email}
            />
            <Button type="submit" size="lg" className="w-full">
              Create Account
            </Button>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-teal-600 hover:text-teal-700">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
