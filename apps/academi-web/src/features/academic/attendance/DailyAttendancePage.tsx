import React, { useState, useEffect } from 'react';
import { academicApi } from '../../../services/api';
import { ClassItem, Student } from '../../../types/academic';
import { PageHeader, FormSelect, StatCard } from '../../../components/common';
import { CalendarCheck, Save, CheckCircle2, XCircle, Clock } from 'lucide-react';
import { toast } from 'sonner';

export interface AttendanceEntry {
  studentId: string;
  studentCode: string;
  studentName: string;
  rollNo: number;
  status: 'Present' | 'Absent' | 'Late';
}

export const DailyAttendancePage: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [entries, setEntries] = useState<AttendanceEntry[]>([]);
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
        setEntries(
          res.items.map((s, idx) => ({
            studentId: s.id,
            studentCode: s.studentCode,
            studentName: `${s.firstName} ${s.lastName}`,
            rollNo: s.rollNo || idx + 1,
            status: 'Present',
          }))
        );
      });
    }
  }, [selectedClass]);

  const handleStatusChange = (id: string, status: 'Present' | 'Absent' | 'Late') => {
    setEntries((prev) => prev.map((e) => (e.studentId === id ? { ...e, status } : e)));
  };

  const handleSaveAttendance = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast.success(`Attendance saved for ${date}!`);
    }, 800);
  };

  const presentCount = entries.filter((e) => e.status === 'Present').length;
  const absentCount = entries.filter((e) => e.status === 'Absent').length;
  const lateCount = entries.filter((e) => e.status === 'Late').length;

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Daily Student Attendance Register"
        subtitle="Record and monitor daily attendance status per class section"
        breadcrumbs={[{ label: 'Academic' }, { label: 'Daily Attendance' }]}
        action={
          <button
            onClick={handleSaveAttendance}
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-md shadow-emerald-600/20 transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Attendance Register'}</span>
          </button>
        }
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Present Students" value={presentCount} icon={CheckCircle2} iconBgColor="bg-emerald-600" subtitle={`${entries.length > 0 ? ((presentCount / entries.length) * 100).toFixed(1) : 0}% Attendance Rate`} />
        <StatCard title="Absent Students" value={absentCount} icon={XCircle} iconBgColor="bg-rose-600" subtitle="Requires follow-up" />
        <StatCard title="Late Arrivals" value={lateCount} icon={Clock} iconBgColor="bg-amber-500" subtitle="Marked late" />
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormSelect
          label="Select Class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          options={classes.map((c) => ({ label: c.className, value: c.id }))}
        />

        <div className="space-y-1">
          <label className="block text-xs font-semibold text-slate-700">Attendance Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold"
          />
        </div>
      </div>

      {/* Attendance Register Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
            <tr>
              <th className="py-3.5 px-4">Roll</th>
              <th className="py-3.5 px-4">Student ID</th>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4 text-center">Attendance Toggle</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {entries.map((entry) => (
              <tr key={entry.studentId} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-bold text-slate-900">#{entry.rollNo}</td>
                <td className="py-3 px-4 font-mono font-bold text-blue-600">{entry.studentCode}</td>
                <td className="py-3 px-4 font-semibold text-slate-800">{entry.studentName}</td>
                <td className="py-3 px-4">
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => handleStatusChange(entry.studentId, 'Present')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        entry.status === 'Present'
                          ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/30'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Present
                    </button>
                    <button
                      onClick={() => handleStatusChange(entry.studentId, 'Absent')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        entry.status === 'Absent'
                          ? 'bg-rose-600 text-white shadow-sm shadow-rose-600/30'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Absent
                    </button>
                    <button
                      onClick={() => handleStatusChange(entry.studentId, 'Late')}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        entry.status === 'Late'
                          ? 'bg-amber-500 text-white shadow-sm shadow-amber-500/30'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      Late
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
