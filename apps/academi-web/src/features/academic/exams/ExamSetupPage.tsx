import React, { useState } from 'react';
import { PageHeader, StatCard, StatusBadge, Modal, FormInput, confirmDialog } from '../../../components/common';
import { Award, Plus, Calendar, CheckCircle2, Clock } from 'lucide-react';
import { toast } from 'sonner';

export interface ExamTerm {
  id: string;
  examName: string;
  academicYear: number;
  startDate: string;
  endDate: string;
  status: 'Upcoming' | 'Active' | 'Completed';
}

export const ExamSetupPage: React.FC = () => {
  const [exams, setExams] = useState<ExamTerm[]>([
    { id: '1', examName: 'First Term Examination 2025', academicYear: 2025, startDate: '2025-04-10', endDate: '2025-04-25', status: 'Completed' },
    { id: '2', examName: 'Mid-Term Examination 2025', academicYear: 2025, startDate: '2025-08-01', endDate: '2025-08-15', status: 'Active' },
    { id: '3', examName: 'Annual Final Examination 2025', academicYear: 2025, startDate: '2025-11-20', endDate: '2025-12-05', status: 'Upcoming' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examName, setExamName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleCreateExam = () => {
    if (!examName) {
      toast.error('Please enter exam name');
      return;
    }
    const newExam: ExamTerm = {
      id: Date.now().toString(),
      examName,
      academicYear: 2025,
      startDate: startDate || '2025-09-01',
      endDate: endDate || '2025-09-15',
      status: 'Upcoming',
    };
    setExams([...exams, newExam]);
    toast.success('Exam Term created successfully!');
    setIsModalOpen(false);
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Exam Terms & Grading Rules"
        subtitle="Manage academic terms, examination schedules, and grading policies"
        breadcrumbs={[{ label: 'Academic' }, { label: 'Exams & Grading' }]}
        action={
          <button
            onClick={() => {
              setExamName('');
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Create Exam Term</span>
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Exam Terms" value={exams.length} icon={Award} iconBgColor="bg-blue-600" />
        <StatCard title="Active Term" value="Mid-Term 2025" icon={CheckCircle2} iconBgColor="bg-emerald-600" subtitle="In Progress" />
        <StatCard title="Next Final Exam" value="Nov 20, 2025" icon={Calendar} iconBgColor="bg-amber-500" subtitle="Final Term" />
      </div>

      {/* Grading System Policy Reference */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Standard Board Grading Scale Reference</h3>
        <div className="grid grid-cols-2 sm:grid-cols-7 gap-2 text-center text-xs">
          <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-200">
            <p className="font-bold text-emerald-700 text-sm">A+</p>
            <p className="text-[10px] text-slate-500">80% - 100% (5.00)</p>
          </div>
          <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-200">
            <p className="font-bold text-blue-700 text-sm">A</p>
            <p className="text-[10px] text-slate-500">70% - 79% (4.00)</p>
          </div>
          <div className="bg-cyan-50 p-2.5 rounded-lg border border-cyan-200">
            <p className="font-bold text-cyan-700 text-sm">A-</p>
            <p className="text-[10px] text-slate-500">60% - 69% (3.50)</p>
          </div>
          <div className="bg-violet-50 p-2.5 rounded-lg border border-violet-200">
            <p className="font-bold text-violet-700 text-sm">B</p>
            <p className="text-[10px] text-slate-500">50% - 59% (3.00)</p>
          </div>
          <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200">
            <p className="font-bold text-amber-700 text-sm">C</p>
            <p className="text-[10px] text-slate-500">40% - 49% (2.00)</p>
          </div>
          <div className="bg-orange-50 p-2.5 rounded-lg border border-orange-200">
            <p className="font-bold text-orange-700 text-sm">D</p>
            <p className="text-[10px] text-slate-500">33% - 39% (1.00)</p>
          </div>
          <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-200">
            <p className="font-bold text-rose-700 text-sm">F</p>
            <p className="text-[10px] text-slate-500">0% - 32% (0.00)</p>
          </div>
        </div>
      </div>

      {/* Exam Terms List */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
            <tr>
              <th className="py-3.5 px-4">Exam Name</th>
              <th className="py-3.5 px-4">Academic Year</th>
              <th className="py-3.5 px-4">Start Date</th>
              <th className="py-3.5 px-4">End Date</th>
              <th className="py-3.5 px-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {exams.map((exam) => (
              <tr key={exam.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3.5 px-4 font-bold text-slate-900">{exam.examName}</td>
                <td className="py-3.5 px-4 font-semibold text-slate-700">{exam.academicYear}</td>
                <td className="py-3.5 px-4 font-mono">{exam.startDate}</td>
                <td className="py-3.5 px-4 font-mono">{exam.endDate}</td>
                <td className="py-3.5 px-4">
                  <StatusBadge
                    label={exam.status}
                    variant={exam.status === 'Completed' ? 'success' : exam.status === 'Active' ? 'info' : 'warning'}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Create Exam Term"
        subtitle="Set up exam term title and dates"
        footer={
          <>
            <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-xs text-slate-600 bg-slate-100 rounded-lg">
              Cancel
            </button>
            <button onClick={handleCreateExam} className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg">
              Create Term
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <FormInput label="Exam Name" value={examName} onChange={(e) => setExamName(e.target.value)} placeholder="e.g. Mid-Term 2025" required />
          <div className="grid grid-cols-2 gap-4">
            <FormInput label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <FormInput label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>
      </Modal>
    </div>
  );
};
