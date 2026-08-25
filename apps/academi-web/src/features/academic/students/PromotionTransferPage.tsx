import React, { useState, useEffect } from 'react';
import { academicApi } from '../../../services/api';
import { ClassItem, Student } from '../../../types/academic';
import { PageHeader, FormSelect, confirmDialog } from '../../../components/common';
import { ArrowRight, RefreshCw, ArrowLeftRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const PromotionTransferPage: React.FC = () => {
  const navigate = useNavigate();
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [sourceClass, setSourceClass] = useState('');
  const [targetClass, setTargetClass] = useState('');
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    academicApi.getClasses().then((data) => {
      setClasses(data);
      if (data.length > 0) {
        setSourceClass(data[0].id);
        if (data.length > 1) setTargetClass(data[1].id);
      }
    });
  }, []);

  useEffect(() => {
    if (sourceClass) {
      academicApi.getStudents({ classId: sourceClass, pageSize: 50 }).then((res) => {
        setStudents(res.items);
        setSelectedStudentIds(res.items.map((s) => s.id));
      });
    }
  }, [sourceClass]);

  const handlePromote = async () => {
    const confirmed = await confirmDialog({
      title: 'Confirm Bulk Promotion?',
      text: `Promote ${selectedStudentIds.length} selected students to the target class?`,
      confirmButtonText: 'Yes, Promote All',
    });

    if (confirmed) {
      setProcessing(true);
      setTimeout(() => {
        setProcessing(false);
        toast.success(`Successfully promoted ${selectedStudentIds.length} students!`);
        navigate('/academic/students');
      }, 1000);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <PageHeader
        title="Student Promotion & Section Transfer"
        subtitle="Bulk promote students to next academic year or transfer between sections"
        breadcrumbs={[
          { label: 'Academic', path: '/academic/students' },
          { label: 'Student Directory', path: '/academic/students' },
          { label: 'Bulk Promotion & Transfer' },
        ]}
      />

      {/* Class Selection Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <FormSelect
          label="From Source Class"
          value={sourceClass}
          onChange={(e) => setSourceClass(e.target.value)}
          options={classes.map((c) => ({ label: c.className, value: c.id }))}
        />

        <div className="hidden md:flex items-center justify-center">
          <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center">
            <ArrowRight className="w-5 h-5" />
          </div>
        </div>

        <FormSelect
          label="To Target Class"
          value={targetClass}
          onChange={(e) => setTargetClass(e.target.value)}
          options={classes.map((c) => ({ label: c.className, value: c.id }))}
        />
      </div>

      {/* Student List Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={selectedStudentIds.length === students.length && students.length > 0}
              onChange={(e) => {
                if (e.target.checked) setSelectedStudentIds(students.map((s) => s.id));
                else setSelectedStudentIds([]);
              }}
              className="w-4 h-4 text-blue-600 rounded"
            />
            <span className="text-xs font-bold text-slate-800">
              Select All ({selectedStudentIds.length} of {students.length} Selected)
            </span>
          </div>

          <button
            onClick={handlePromote}
            disabled={selectedStudentIds.length === 0 || processing}
            className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm shadow-blue-600/30 disabled:opacity-50 transition-all"
          >
            {processing ? <RefreshCw className="w-4 h-4 animate-spin" /> : <ArrowLeftRight className="w-4 h-4" />}
            <span>Promote Selected Students</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {students.map((s) => {
            const isSelected = selectedStudentIds.includes(s.id);
            return (
              <div
                key={s.id}
                onClick={() => {
                  if (isSelected) setSelectedStudentIds(selectedStudentIds.filter((id) => id !== s.id));
                  else setSelectedStudentIds([...selectedStudentIds, s.id]);
                }}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                  isSelected
                    ? 'border-blue-500 bg-blue-50/40 ring-2 ring-blue-500/20'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <input type="checkbox" checked={isSelected} readOnly className="w-4 h-4 text-blue-600 rounded" />
                <div className="flex-1">
                  <p className="text-xs font-bold text-slate-800">{s.firstName} {s.lastName}</p>
                  <p className="text-[11px] text-slate-400 font-mono">Roll #{s.rollNo || 1} • {s.studentCode}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
