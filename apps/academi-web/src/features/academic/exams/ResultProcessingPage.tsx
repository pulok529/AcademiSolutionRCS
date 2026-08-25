import React, { useState } from 'react';
import { PageHeader, StatCard, FormSelect, confirmDialog } from '../../../components/common';
import { Cpu, CheckCircle2, Award, Zap, FileSpreadsheet } from 'lucide-react';
import { toast } from 'sonner';

export const ResultProcessingPage: React.FC = () => {
  const [examTerm, setExamTerm] = useState('Mid-Term Examination 2025');
  const [selectedClass, setSelectedClass] = useState('Class 1');
  const [processing, setProcessing] = useState(false);
  const [processed, setProcessed] = useState(false);

  const handleProcessResults = async () => {
    const confirmed = await confirmDialog({
      title: 'Run Result Processing Engine?',
      text: 'This will aggregate subject marks, compute GPA for all students, resolve fail conditions, and compute merit ranks.',
      confirmButtonText: 'Yes, Run Engine',
      icon: 'question',
    });

    if (confirmed) {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        setProcessed(true);
        toast.success('Result Processing Engine completed! All student GPAs & ranks generated.');
      }, 1500);
    }
  };

  return (
    <div className="p-6 space-y-6 max-w-5xl mx-auto">
      <PageHeader
        title="1-Click Result Processing Engine"
        subtitle="Automated background computation for Total Marks, GPA, Letter Grades, and Class Merit Ranks"
        breadcrumbs={[{ label: 'Academic' }, { label: 'Result Processing Engine' }]}
      />

      {/* Hero Control Banner */}
      <div className="bg-gradient-to-r from-[#1e3a5f] to-blue-700 p-8 rounded-2xl text-white shadow-xl space-y-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/30 text-blue-200 text-xs font-semibold backdrop-blur-sm border border-blue-400/30">
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              Automated Merit Calculator
            </div>
            <h2 className="text-2xl font-bold tracking-tight">Run Exam Result Processing</h2>
            <p className="text-xs text-blue-100 max-w-xl">
              Processes raw subject marks for all students in the selected class and generates final GPA, pass/fail status, and rank position.
            </p>
          </div>

          <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
            <Cpu className="w-8 h-8 text-blue-200" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/10">
          <FormSelect
            label="Exam Term"
            value={examTerm}
            onChange={(e) => setExamTerm(e.target.value)}
            options={[
              { label: 'Mid-Term Examination 2025', value: 'Mid-Term Examination 2025' },
              { label: 'Annual Final Examination 2025', value: 'Annual Final Examination 2025' },
            ]}
            className="text-slate-900"
          />

          <FormSelect
            label="Target Class"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            options={[
              { label: 'Class 1', value: 'Class 1' },
              { label: 'Class 2', value: 'Class 2' },
              { label: 'Class 3', value: 'Class 3' },
            ]}
            className="text-slate-900"
          />
        </div>

        <div className="flex items-center justify-between pt-2">
          <p className="text-xs text-blue-200">
            {processed ? '✅ Results processed & ready for Tabulation Sheet' : 'Status: Ready to compute'}
          </p>

          <button
            onClick={handleProcessResults}
            disabled={processing}
            className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-500/30 transition-all disabled:opacity-50"
          >
            <Cpu className={`w-4 h-4 ${processing ? 'animate-spin' : ''}`} />
            <span>{processing ? 'Calculating GPA & Merit Ranks...' : 'Execute Result Processing'}</span>
          </button>
        </div>
      </div>

      {/* Metrics after processing */}
      {processed && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-fade-in">
          <StatCard title="Processed Students" value="40 / 40" icon={CheckCircle2} iconBgColor="bg-emerald-600" subtitle="100% computed" />
          <StatCard title="Class Pass Rate" value="95.0%" icon={Award} iconBgColor="bg-blue-600" trend={{ value: '38 Passed', isUpward: true }} />
          <StatCard title="Failed Students" value="2" icon={FileSpreadsheet} iconBgColor="bg-rose-500" subtitle="2 failed subjects" />
        </div>
      )}
    </div>
  );
};
