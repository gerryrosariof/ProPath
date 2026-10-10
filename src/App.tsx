import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '@/context/AuthContext';
import { ProfileProvider } from '@/context/ProfileContext';
import { AssessmentProvider } from '@/context/AssessmentContext';
import { ThresholdProvider } from '@/context/ThresholdContext';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { Landing } from '@/routes/Landing';
import { Login } from '@/routes/Login';
import { Register } from '@/routes/Register';
import { StudentDashboard } from '@/routes/student/StudentDashboard';
import { AcademicProfile } from '@/routes/student/AcademicProfile';
import { AssessmentHub } from '@/routes/student/AssessmentHub';
import { TestPlayer } from '@/routes/student/TestPlayer';
import { AssessmentConfirmation } from '@/routes/student/AssessmentConfirmation';
import { ProfileCategory } from '@/routes/student/ProfileCategory';
import { Results } from '@/routes/student/Results';
import { ProgramExplanation } from '@/routes/student/ProgramExplanation';
import { AdminSettings } from '@/routes/admin/AdminSettings';
import { TrainingData } from '@/routes/admin/TrainingData';
import { ModelPage } from '@/routes/admin/ModelPage';
import { DecisionTreeViewer } from '@/routes/admin/DecisionTreeViewer';
import { AdminDashboard } from '@/routes/admin/AdminDashboard';
import { UserManagement } from '@/routes/admin/UserManagement';
import { AssessmentItemManagement } from '@/routes/admin/AssessmentItemManagement';
import { ProgramCatalog } from '@/routes/admin/ProgramCatalog';
import { CounselorDashboard } from '@/routes/counselor/CounselorDashboard';
import { CounselorStudentList } from '@/routes/counselor/CounselorStudentList';
import { CounselorStudentProfile } from '@/routes/counselor/CounselorStudentProfile';
import { CounselorProgramExplanation } from '@/routes/counselor/CounselorProgramExplanation';
import { Placeholder } from '@/routes/Placeholder';
import { BarChart3, MessageSquare } from 'lucide-react';

export default function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <AssessmentProvider>
          <ThresholdProvider>
            <BrowserRouter>
              <Routes>
                {/* Public */}
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Student */}
                <Route path="/student/dashboard" element={<ProtectedRoute roles={['student']}><StudentDashboard /></ProtectedRoute>} />
                <Route path="/student/profile" element={<ProtectedRoute roles={['student']}><AcademicProfile /></ProtectedRoute>} />
                <Route path="/student/assessment" element={<ProtectedRoute roles={['student']}><AssessmentHub /></ProtectedRoute>} />
                <Route path="/student/assessment/:instrumentId" element={<ProtectedRoute roles={['student']}><TestPlayer /></ProtectedRoute>} />
                <Route path="/student/assessment/confirm" element={<ProtectedRoute roles={['student']}><AssessmentConfirmation /></ProtectedRoute>} />
                <Route path="/student/profile-category" element={<ProtectedRoute roles={['student']}><ProfileCategory /></ProtectedRoute>} />
                <Route path="/student/results" element={<ProtectedRoute roles={['student']}><Results /></ProtectedRoute>} />
                <Route path="/student/results/:rank" element={<ProtectedRoute roles={['student']}><ProgramExplanation /></ProtectedRoute>} />

                {/* Counselor */}
                <Route path="/counselor/dashboard" element={<ProtectedRoute roles={['counselor']}><CounselorDashboard /></ProtectedRoute>} />
                <Route path="/counselor/students" element={<ProtectedRoute roles={['counselor']}><CounselorStudentList /></ProtectedRoute>} />
                <Route path="/counselor/students/:studentId" element={<ProtectedRoute roles={['counselor']}><CounselorStudentProfile /></ProtectedRoute>} />
                <Route path="/counselor/students/:studentId/results/:rank" element={<ProtectedRoute roles={['counselor']}><CounselorProgramExplanation /></ProtectedRoute>} />
                <Route path="/counselor/reports" element={<ProtectedRoute roles={['counselor']}><Placeholder title="Reports" icon={BarChart3} /></ProtectedRoute>} />
                <Route path="/counselor/notes" element={<ProtectedRoute roles={['counselor']}><Placeholder title="Advising Notes" icon={MessageSquare} /></ProtectedRoute>} />

                {/* Admin */}
                <Route path="/admin/dashboard" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
                <Route path="/admin/training-data" element={<ProtectedRoute roles={['admin']}><TrainingData /></ProtectedRoute>} />
                <Route path="/admin/model" element={<ProtectedRoute roles={['admin']}><ModelPage /></ProtectedRoute>} />
                <Route path="/admin/model/tree" element={<ProtectedRoute roles={['admin']}><DecisionTreeViewer /></ProtectedRoute>} />
                <Route path="/admin/programs" element={<ProtectedRoute roles={['admin']}><ProgramCatalog /></ProtectedRoute>} />
                <Route path="/admin/assessment-items" element={<ProtectedRoute roles={['admin']}><AssessmentItemManagement /></ProtectedRoute>} />
                <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><UserManagement /></ProtectedRoute>} />
                <Route path="/admin/settings" element={<ProtectedRoute roles={['admin']}><AdminSettings /></ProtectedRoute>} />

                {/* Fallback */}
                <Route path="*" element={<Landing />} />
              </Routes>
            </BrowserRouter>
          </ThresholdProvider>
        </AssessmentProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}
