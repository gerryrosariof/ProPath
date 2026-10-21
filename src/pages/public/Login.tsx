import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GraduationCap, Mail, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useAuth } from '@/context/AuthContext';
import { SEED_USERS } from '@/data/users';

export function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setError('Please enter your email.');
      return;
    }
    const ok = login(email);
    if (!ok) {
      setError('No account found with that email. Try a demo account below.');
      return;
    }
    const user = SEED_USERS.find((u) => u.email.toLowerCase() === email.toLowerCase());
    const home = user?.role === 'student' ? '/student/dashboard' : user?.role === 'counselor' ? '/counselor/dashboard' : '/admin/dashboard';
    navigate(home);
  };

  const fillDemo = (demoEmail: string) => {
    setEmail(demoEmail);
    setError('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 rounded-xl bg-teal-600 flex items-center justify-center">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-800">ProPath</span>
        </Link>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-slate-800 mb-1">Welcome back</h1>
          <p className="text-slate-500 text-sm mb-6">Sign in to continue to ProPath.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Input
                label="Email"
                type="email"
                placeholder="you@school.ph"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                error={error}
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Sign In
            </Button>
          </form>

          {error && (
            <div className="flex items-start gap-2 mt-4 p-3 rounded-lg bg-red-50 border border-red-200">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-slate-100">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-3">Demo accounts — click to fill</p>
            <div className="space-y-2">
              {SEED_USERS.map((u) => (
                <button
                  key={u.id}
                  onClick={() => fillDemo(u.email)}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 transition-colors text-left"
                >
                  <Mail className="w-4 h-4 text-slate-400" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">{u.email}</p>
                    <p className="text-xs text-slate-400 capitalize">{u.role} — {u.name}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-sm text-slate-500 mt-6">
            New to ProPath?{' '}
            <Link to="/register" className="font-semibold text-teal-600 hover:text-teal-700">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
