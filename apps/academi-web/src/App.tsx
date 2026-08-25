import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { StudentListPage } from './features/academic/students/StudentListPage';
import { AdmissionWizardPage } from './features/academic/students/AdmissionWizardPage';
import { StudentProfilePage } from './features/academic/students/StudentProfilePage';
import { PromotionTransferPage } from './features/academic/students/PromotionTransferPage';
import { Toaster } from 'sonner';

const AppLayout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar currentPath={location.pathname} />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Navigate to="/academic/students" replace />} />
            <Route path="/academic/students" element={<StudentListPage />} />
            <Route path="/academic/students/:id" element={<StudentProfilePage />} />
            <Route path="/academic/admission" element={<AdmissionWizardPage />} />
            <Route path="/academic/promotion" element={<PromotionTransferPage />} />
            <Route path="*" element={<Navigate to="/academic/students" replace />} />
          </Routes>
        </main>
      </div>
      <Toaster position="top-right" richColors />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
