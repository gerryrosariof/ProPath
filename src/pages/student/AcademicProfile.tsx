import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, Save, AlertCircle, CheckCircle2 } from 'lucide-react';
import { AppShell } from '@/components/layout/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input, Select } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { useAuth } from '@/context/AuthContext';
import { useProfile } from '@/context/ProfileContext';
import { STRANDS_BY_TRACK, STRAND_LABELS, TRACK_LABELS, ACADEMIC_SUBJECTS, PHILIPPINE_UNIVERSITIES } from '@/data/constants';
import type { Track, Strand, SubjectGrade } from '@/utils/types';

export function AcademicProfile() {
  const navigate = useNavigate();
  const { updateProfileStatus, user } = useAuth();
  const { saveProfile, profile } = useProfile();

  const [track, setTrack] = useState<Track>(profile?.track ?? user?.track ?? 'Academic');
  const [strand, setStrand] = useState<Strand>(profile?.strand ?? user?.strand ?? 'STEM');
  const [gradeLevel, setGradeLevel] = useState<'Grade 11' | 'Grade 12'>(profile?.gradeLevel ?? user?.gradeLevel ?? 'Grade 12');
  const [gwa, setGwa] = useState<string>(profile ? String(profile.gwa) : '');
  const [subjectGrades, setSubjectGrades] = useState<SubjectGrade[]>(
    profile?.subjectGrades ??
      ACADEMIC_SUBJECTS[track].map((s) => ({ subject: s, grade: 0 })),
  );
  const [selectedSchools, setSelectedSchools] = useState<string[]>(profile?.targetSchools ?? []);
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [saved, setSaved] = useState(false);

  const availableStrands = STRANDS_BY_TRACK[track];
  const subjects = ACADEMIC_SUBJECTS[track];

  const handleTrackChange = (newTrack: Track) => {
    setTrack(newTrack);
    const newStrands = STRANDS_BY_TRACK[newTrack];
    if (!newStrands.includes(strand)) {
      setStrand(newStrands[0]);
    }
    setSubjectGrades(ACADEMIC_SUBJECTS[newTrack].map((s) => ({ subject: s, grade: 0 })));
    setErrors((p) => ({ ...p, gwa: undefined }));
  };

  const handleSubjectGrade = (subject: string, value: string) => {
    const num = value === '' ? 0 : Number(value);
    setSubjectGrades((prev) => prev.map((sg) => (sg.subject === subject ? { ...sg, grade: num } : sg)));
    setErrors((p) => ({ ...p, [`subject-${subject}`]: undefined }));
  };

  const toggleSchool = (school: string) => {
    setSelectedSchools((prev) =>
      prev.includes(school) ? prev.filter((s) => s !== school) : [...prev, school],
    );
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (!gwa.trim()) {
      next.gwa = 'GWA is required.';
    } else {
      const gwaNum = Number(gwa);
      if (Number.isNaN(gwaNum)) next.gwa = 'GWA must be a number.';
      else if (gwaNum < 60 || gwaNum > 99) next.gwa = 'GWA must be between 60 and 99.';
    }

    for (const sg of subjectGrades) {
      if (sg.grade === 0) {
        next[`subject-${sg.subject}`] = `${sg.subject} grade is required.`;
      } else if (sg.grade < 60 || sg.grade > 99) {
        next[`subject-${sg.subject}`] = `${sg.subject} grade must be between 60 and 99.`;
      }
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    saveProfile({
      track,
      strand,
      gradeLevel,
      gwa: Number(gwa),
      subjectGrades,
      targetSchools: selectedSchools,
    });
    updateProfileStatus('hasProfile', true);
    setSaved(true);
    setTimeout(() => navigate('/student/dashboard'), 1200);
  };

  const errorCount = useMemo(() => Object.keys(errors).length, [errors]);

  return (
    <AppShell title="Academic Profile">
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Academic Profile</h2>
          <p className="text-slate-500 mt-1">
            Enter your track, strand, grades, and target universities. This information is used alongside your assessment results.
          </p>
        </div>

        {saved && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <p className="text-sm text-emerald-800 font-medium">Profile saved! Redirecting to dashboard...</p>
          </div>
        )}

        {errorCount > 0 && !saved && (
          <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-200">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <p className="text-sm text-red-700">
              Please fix {errorCount} field{errorCount > 1 ? 's' : ''} below before saving.
            </p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Track & Strand */}
          <Card>
            <CardHeader title="Track & Strand" subtitle="Choose your Senior High School track and strand" icon={<BookOpen className="w-5 h-5" />} />
            <div className="p-5 grid sm:grid-cols-2 gap-4">
              <Select
                label="Track"
                value={track}
                onChange={(e) => handleTrackChange(e.target.value as Track)}
              >
                {(Object.keys(TRACK_LABELS) as Track[]).map((t) => (
                  <option key={t} value={t}>{TRACK_LABELS[t]}</option>
                ))}
              </Select>
              <Select
                label="Strand / Specialization"
                value={strand}
                onChange={(e) => setStrand(e.target.value as Strand)}
              >
                {availableStrands.map((s) => (
                  <option key={s} value={s}>{STRAND_LABELS[s]}</option>
                ))}
              </Select>
              <Select
                label="Grade Level"
                value={gradeLevel}
                onChange={(e) => setGradeLevel(e.target.value as 'Grade 11' | 'Grade 12')}
              >
                <option value="Grade 11">Grade 11</option>
                <option value="Grade 12">Grade 12</option>
              </Select>
              <Input
                label="General Weighted Average (GWA)"
                type="number"
                step="0.01"
                min="60"
                max="99"
                placeholder="e.g. 88.50"
                value={gwa}
                onChange={(e) => { setGwa(e.target.value); setErrors((p) => ({ ...p, gwa: undefined })); }}
                error={errors.gwa}
                hint="Enter your current GWA (60–99)."
              />
            </div>
          </Card>

          {/* Subject Grades */}
          <Card>
            <CardHeader
              title="Subject-Area Grades"
              subtitle={`Enter grades for your ${TRACK_LABELS[track]} subjects (60–99)`}
              icon={<BookOpen className="w-5 h-5" />}
            />
            <div className="p-5 grid sm:grid-cols-2 gap-4">
              {subjects.map((subject) => {
                const sg = subjectGrades.find((s) => s.subject === subject);
                const errKey = `subject-${subject}`;
                return (
                  <Input
                    key={subject}
                    label={subject}
                    type="number"
                    min="60"
                    max="99"
                    step="0.01"
                    placeholder="e.g. 90"
                    value={sg?.grade ? String(sg.grade) : ''}
                    onChange={(e) => handleSubjectGrade(subject, e.target.value)}
                    error={errors[errKey]}
                  />
                );
              })}
            </div>
          </Card>

          {/* Target Schools */}
          <Card>
            <CardHeader
              title="Target Universities"
              subtitle="Select schools you're interested in (optional)"
              icon={<BookOpen className="w-5 h-5" />}
              action={selectedSchools.length > 0 ? <Badge tone="teal">{selectedSchools.length} selected</Badge> : undefined}
            />
            <div className="p-5">
              <div className="grid sm:grid-cols-2 gap-2">
                {PHILIPPINE_UNIVERSITIES.map((school) => {
                  const selected = selectedSchools.includes(school);
                  return (
                    <button
                      key={school}
                      type="button"
                      onClick={() => toggleSchool(school)}
                      className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm text-left transition-all ${
                        selected
                          ? 'border-teal-500 bg-teal-50 text-teal-800 font-medium'
                          : 'border-slate-200 text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded border flex-shrink-0 flex items-center justify-center ${selected ? 'bg-teal-600 border-teal-600' : 'border-slate-300'}`}>
                        {selected && <CheckCircle2 className="w-3 h-3 text-white" />}
                      </div>
                      {school}
                    </button>
                  );
                })}
              </div>
            </div>
          </Card>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="secondary" onClick={() => navigate('/student/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" size="lg">
              <Save className="w-4 h-4 mr-1.5" />
              Save Profile
            </Button>
          </div>
        </form>
      </div>
    </AppShell>
  );
}
