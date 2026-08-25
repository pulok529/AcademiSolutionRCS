import React, { useState } from 'react';
import { PageHeader, FormSelect } from '../../../components/common';
import { StudentMarksheetModal } from './StudentMarksheetModal';
import { Award, Printer, Download, Eye } from 'lucide-react';

export interface TabulationRow {
  rollNo: number;
  studentCode: string;
  studentName: string;
  english: number;
  math: number;
  bangla: number;
  science: number;
  ict: number;
  totalMark: number;
  gpa: number;
  rank: number;
  status: 'Passed' | 'Failed';
}

export const TabulationSheetPage: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState('Class 1');
  const [selectedExam, setSelectedExam] = useState('Mid-Term Examination 2025');
  const [selectedStudentForModal, setSelectedStudentForModal] = useState<TabulationRow | null>(null);

  const mockRows: TabulationRow[] = [
    { rollNo: 1, studentCode: 'STU-100234', studentName: 'Rahul Islam', english: 85, math: 92, bangla: 78, science: 88, ict: 45, totalMark: 388, gpa: 5.0, rank: 1, status: 'Passed' },
    { rollNo: 2, studentCode: 'STU-100235', studentName: 'Nusrat Jahan', english: 78, math: 85, bangla: 80, science: 82, ict: 42, totalMark: 367, gpa: 4.67, rank: 2, status: 'Passed' },
    { rollNo: 3, studentCode: 'STU-100236', studentName: 'Tanvir Hossain', english: 65, math: 70, bangla: 68, science: 72, ict: 38, totalMark: 313, gpa: 3.83, rank: 3, status: 'Passed' },
    { rollNo: 4, studentCode: 'STU-100237', studentName: 'Amina Khatun', english: 28, math: 45, bangla: 52, science: 40, ict: 30, totalMark: 195, gpa: 0.0, rank: 4, status: 'Failed' },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Class Tabulation Sheet"
        subtitle="Complete subject-wise marks matrix, total scores, calculated GPA, and class merit ranks"
        breadcrumbs={[{ label: 'Academic' }, { label: 'Tabulation Sheet' }]}
        action={
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs rounded-lg shadow-sm">
              <Printer className="w-4 h-4" />
              <span>Print Sheet</span>
            </button>
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs rounded-lg shadow-sm">
              <Download className="w-4 h-4" />
              <span>Export Excel</span>
            </button>
          </div>
        }
      />

      {/* Filter Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 sm:grid-cols-2 gap-4">
        <FormSelect
          label="Select Class"
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          options={[
            { label: 'Class 1', value: 'Class 1' },
            { label: 'Class 2', value: 'Class 2' },
          ]}
        />

        <FormSelect
          label="Select Exam Term"
          value={selectedExam}
          onChange={(e) => setSelectedExam(e.target.value)}
          options={[
            { label: 'Mid-Term Examination 2025', value: 'Mid-Term Examination 2025' },
            { label: 'Annual Final Examination 2025', value: 'Annual Final Examination 2025' },
          ]}
        />
      </div>

      {/* Tabulation Matrix Grid */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase font-semibold">
              <tr>
                <th className="py-3.5 px-4">Rank</th>
                <th className="py-3.5 px-4">Roll</th>
                <th className="py-3.5 px-4">Student ID</th>
                <th className="py-3.5 px-4">Student Name</th>
                <th className="py-3.5 px-4">English</th>
                <th className="py-3.5 px-4">Math</th>
                <th className="py-3.5 px-4">Bangla</th>
                <th className="py-3.5 px-4">Science</th>
                <th className="py-3.5 px-4">ICT</th>
                <th className="py-3.5 px-4 font-bold">Total</th>
                <th className="py-3.5 px-4 font-bold">GPA</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4">Marksheet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {mockRows.map((row) => (
                <tr key={row.studentCode} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 font-bold text-slate-900">
                    <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${
                      row.rank === 1 ? 'bg-amber-100 text-amber-800 border border-amber-300' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {row.rank}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-800">#{row.rollNo}</td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-600">{row.studentCode}</td>
                  <td className="py-3 px-4 font-semibold text-slate-900">{row.studentName}</td>
                  <td className={`py-3 px-4 font-medium ${row.english < 33 ? 'text-rose-600 font-bold' : ''}`}>{row.english}</td>
                  <td className={`py-3 px-4 font-medium ${row.math < 33 ? 'text-rose-600 font-bold' : ''}`}>{row.math}</td>
                  <td className={`py-3 px-4 font-medium ${row.bangla < 33 ? 'text-rose-600 font-bold' : ''}`}>{row.bangla}</td>
                  <td className={`py-3 px-4 font-medium ${row.science < 33 ? 'text-rose-600 font-bold' : ''}`}>{row.science}</td>
                  <td className={`py-3 px-4 font-medium ${row.ict < 17 ? 'text-rose-600 font-bold' : ''}`}>{row.ict}</td>
                  <td className="py-3 px-4 font-bold text-slate-900 text-sm">{row.totalMark}</td>
                  <td className="py-3 px-4 font-bold text-blue-600 text-sm">{row.gpa.toFixed(2)}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold ${
                      row.status === 'Passed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => setSelectedStudentForModal(row)}
                      className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg font-medium text-xs flex items-center gap-1"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Card</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Student Marksheet Modal */}
      {selectedStudentForModal && (
        <StudentMarksheetModal
          row={selectedStudentForModal}
          isOpen={!!selectedStudentForModal}
          onClose={() => setSelectedStudentForModal(null)}
        />
      )}
    </div>
  );
};
