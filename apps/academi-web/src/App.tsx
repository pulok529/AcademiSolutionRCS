import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';

// Auth
import { LoginPage } from './features/auth/LoginPage';

// Main Dashboard
import { AcademicDashboardPage } from './features/academic/dashboard/AcademicDashboardPage';

// Student Pages
import { StudentListPage } from './features/academic/students/StudentListPage';
import { AdmissionWizardPage } from './features/academic/students/AdmissionWizardPage';
import { StudentProfilePage } from './features/academic/students/StudentProfilePage';
import { PromotionTransferPage } from './features/academic/students/PromotionTransferPage';

// Structure Pages
import { ClassSectionSetupPage } from './features/academic/structure/ClassSectionSetupPage';
import { SubjectAllocationPage } from './features/academic/structure/SubjectAllocationPage';

// Exam Pages
import { ExamSetupPage } from './features/academic/exams/ExamSetupPage';
import { MarksEntryGridPage } from './features/academic/exams/MarksEntryGridPage';
import { ResultProcessingPage } from './features/academic/exams/ResultProcessingPage';
import { TabulationSheetPage } from './features/academic/exams/TabulationSheetPage';

// Attendance & Routine Pages
import { DailyAttendancePage } from './features/academic/attendance/DailyAttendancePage';
import { AttendanceAnalyticsPage } from './features/academic/attendance/AttendanceAnalyticsPage';
import { ClassRoutinePage } from './features/academic/routine/ClassRoutinePage';

// Fees Pages
import { FeeCollectionCounterPage } from './features/academic/fees/FeeCollectionCounterPage';
import { FeeCollectionReportPage } from './features/academic/fees/FeeCollectionReportPage';

import { Toaster } from 'sonner';

const AppLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/academic/dashboard" replace />} />
            <Route path="/academic" element={<Navigate to="/academic/dashboard" replace />} />
            
            {/* Main Academic Dashboard */}
            <Route path="/academic/dashboard" element={<AcademicDashboardPage />} />

            {/* Student Directory */}
            <Route path="/academic/students" element={<StudentListPage />} />
            <Route path="/academic/students/:id" element={<StudentProfilePage />} />
            <Route path="/academic/admission" element={<AdmissionWizardPage />} />
            <Route path="/academic/promotion" element={<PromotionTransferPage />} />

            {/* Structure */}
            <Route path="/academic/classes" element={<ClassSectionSetupPage />} />
            <Route path="/academic/subjects" element={<SubjectAllocationPage />} />

            {/* Exams */}
            <Route path="/academic/exams" element={<ExamSetupPage />} />
            <Route path="/academic/marks-entry" element={<MarksEntryGridPage />} />
            <Route path="/academic/result-processing" element={<ResultProcessingPage />} />
            <Route path="/academic/tabulation" element={<TabulationSheetPage />} />

            {/* Attendance & Routine */}
            <Route path="/academic/attendance" element={<DailyAttendancePage />} />
            <Route path="/academic/attendance-reports" element={<AttendanceAnalyticsPage />} />
            <Route path="/academic/routine" element={<ClassRoutinePage />} />

            {/* Fees */}
            <Route path="/accounts/fees" element={<FeeCollectionCounterPage />} />
            <Route path="/accounts/reports" element={<FeeCollectionReportPage />} />

            <Route path="*" element={<Navigate to="/academic/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage onLoginSuccess={() => setIsAuthenticated(true)} />} />
        <Route
          path="/*"
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />}
        />
      </Routes>
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
};

export default App;
