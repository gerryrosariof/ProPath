import { Link } from 'react-router-dom';
import { GraduationCap, ClipboardList, BrainCircuit, TrendingUp, ArrowRight, ShieldCheck, Users, BarChart3 } from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-xl bg-teal-600 flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-lg text-slate-800">ProPath</span>
        </div>
        <Link
          to="/login"
          className="px-4 py-2 text-sm font-semibold text-teal-700 hover:text-teal-800 transition-colors"
        >
          Sign In
        </Link>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 border border-teal-200 mb-6">
          <ShieldCheck className="w-4 h-4 text-teal-600" />
          <span className="text-sm font-medium text-teal-700">For public Senior High Schools in the Philippines</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold text-slate-800 leading-tight max-w-3xl mx-auto">
          Find the college program that fits you best.
        </h1>
        <p className="text-lg text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed">
          ProPath uses a five-part career assessment and your academic record to recommend
          college programs with clear, confidence-based explanations — to support your
          Guidance Office, not replace it.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <Link
            to="/register"
            className="px-6 py-3 rounded-xl bg-teal-600 text-white font-semibold hover:bg-teal-700 transition-colors inline-flex items-center justify-center gap-2"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 font-semibold hover:bg-slate-50 transition-colors"
          >
            I already have an account
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-4">How ProPath works</h2>
          <p className="text-slate-500 text-center mb-12 max-w-xl mx-auto">Three simple steps from assessment to recommendation.</p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: ClipboardList,
                step: '01',
                title: 'Take the Assessment',
                desc: 'Complete five short instruments: Academic Aptitude, Program Aptitude, Interest Inventory (RIASEC), Skill Set & Readiness, and Personality (Big Five).',
              },
              {
                icon: BrainCircuit,
                step: '02',
                title: 'Enter Your Academic Record',
                desc: 'Provide your track, strand, GWA, and subject-area grades. ProPath combines this with your assessment results.',
              },
              {
                icon: TrendingUp,
                step: '03',
                title: 'Get Ranked Recommendations',
                desc: 'See college programs ranked by confidence, with a plain-language explanation of why each one fits you.',
              },
            ].map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.step} className="bg-white rounded-2xl border border-slate-200 p-6 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-teal-50 flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-7 h-7 text-teal-600" />
                  </div>
                  <p className="text-xs font-bold text-teal-600 mb-1">STEP {s.step}</p>
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{s.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Roles */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Built for everyone in the school</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: GraduationCap, title: 'Students', desc: 'Take assessments, enter grades, and view personalized program recommendations.' },
            { icon: Users, title: 'Guidance Counselors', desc: 'Review student results, track progress, and add advising notes.' },
            { icon: BarChart3, title: 'System Admins', desc: 'Manage programs, users, and assessment configurations.' },
          ].map((r) => {
            const Icon = r.icon;
            return (
              <div key={r.title} className="text-center">
                <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-6 h-6 text-slate-600" />
                </div>
                <h3 className="font-semibold text-slate-800 mb-1">{r.title}</h3>
                <p className="text-sm text-slate-500">{r.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-600 py-16">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to find your path?</h2>
          <p className="text-teal-50 mb-8">Create an account or sign in to get started with your assessment.</p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-teal-700 font-semibold hover:bg-teal-50 transition-colors"
          >
            Create Account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-teal-600 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-300">ProPath</span>
          </div>
          <p className="text-sm text-slate-400">
            Guidance Office support tool — not a replacement for professional counseling.
          </p>
        </div>
      </footer>
    </div>
  );
}
