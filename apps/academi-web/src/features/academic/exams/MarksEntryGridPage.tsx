import React, { useState, useEffect } from 'react';
import { academicApi } from '../../../services/api';
import { ClassItem, Student } from '../../../types/academic';
import { PageHeader, FormSelect } from '../../../components/common';
import { Save, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export interface StudentMarkRow {
  studentId: string;
  studentCode: string;
  studentName: string;
  rollNo: number;
  cq: number;
  mcq: number;
  practical: number;
}

export const MarksEntryGridPage: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [subject, setSubject] = useState('General Mathematics');
  const [markRows, setMarkRows] = useState<StudentMarkRow[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    academicApi.getClasses().then((data) => {
      setClasses(data);
      if (data.length > 0) setSelectedClass(data[0].id);
    });
  }, []);

  useEffect(() => {
    if (selectedClass) {
      academicApi.getStudents({ classId: selectedClass, pageSize: 50 }).then((res) => {
        const rows: StudentMarkRow[] = res.items.map((s, idx) => ({
          studentId: s.id,
          studentCode: s.studentCode,
          studentName: `${s.firstName} ${s.lastName}`,
          rollNo: s.rollNo || idx + 1,
          cq: Math.floor(35 + Math.random() * 30),
          mcq: Math.floor(15 + Math.random() * 15),
          practical: 0,
        }));
        setMarkRows(rows);
      });
    }
  }, [selectedClass]);

  const handleMarkChange = (id: string, field: 'cq' | 'mcq' | 'practical', val: number) => {
    setMarkRows((prev) =>
      prev.map((row) => (row.studentId === id ? { ...row, [field]: Math.max(0, val) } : row))
    );
  };

  const handleSaveMarks = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success('Marks saved successfully!');
    }, 800);
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Spreadsheet Marks Entry Grid"
        subtitle="Fast multi-student marks entry interface for Creative (CQ), MCQ, and Practical components"
        breadcrumbs={[{ label: 'Academic' }, { label: 'Marks Entry' }]}
        action={
          <button
            onClick={handleSaveMarks}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Marks...' : 'Save All Marks'}</span>
          </button>
        }
      />

      {/* Class & Subject Selector */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-3 gap-4">
        <FormSelect
          label="Select Class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          options={classes.map((c) => ({ label: c.className, value: c.id }))}
        />

        <FormSelect
          label="Select Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          options={[
            { label: 'General Mathematics', value: 'General Mathematics' },
            { label: 'English Language', value: 'English Language' },
            { label: 'Bangla Literature', value: 'Bangla Literature' },
            { label: 'General Science', value: 'General Science' },
          ]}
        />

        <div className="flex items-center justify-end text-xs font-semibold text-slate-500 pt-5">
          <span className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-lg">
            Full Mark: 100 | Pass Mark: 33
          </span>
        </div>
      </div>

      {/* Spreadsheet Marks Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
            <tr>
              <th className="py-3.5 px-4">Roll</th>
              <th className="py-3.5 px-4">Student ID</th>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4 w-28">CQ (Max 70)</th>
              <th className="py-3.5 px-4 w-28">MCQ (Max 30)</th>
              <th className="py-3.5 px-4 w-28">Practical</th>
              <th className="py-3.5 px-4 font-bold">Total Mark</th>
              <th className="py-3.5 px-4 font-bold">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {markRows.map((row) => {
              const total = row.cq + row.mcq + row.practical;
              const isPass = total >= 33;
              const grade =
                total >= 80 ? 'A+' : total >= 70 ? 'A' : total >= 60 ? 'A-' : total >= 50 ? 'B' : total >= 40 ? 'C' : total >= 33 ? 'D' : 'F';

              return (
                <tr key={row.studentId} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">#{row.rollNo}</td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">{row.studentCode}</td>
                  <td className="py-3 px-4 font-semibold text-slate-800">{row.studentName}</td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={row.cq}
                      onChange={(e) => handleMarkChange(row.studentId, 'cq', parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 bg-slate-50 border border-slate-200 rounded font-semibold text-center focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={row.mcq}
                      onChange={(e) => handleMarkChange(row.studentId, 'mcq', parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 bg-slate-50 border border-slate-200 rounded font-semibold text-center focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </td>
                  <td className="py-2 px-4">
                    <input
                      type="number"
                      value={row.practical}
                      onChange={(e) => handleMarkChange(row.studentId, 'practical', parseInt(e.target.value) || 0)}
                      className="w-20 px-2 py-1 bg-slate-50 border border-slate-200 rounded font-semibold text-center focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                  </td>
                  <td className="py-3 px-4 font-bold text-sm text-slate-900">{total}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-extrabold ${
                        isPass ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                      }`}
                    >
                      {grade}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
