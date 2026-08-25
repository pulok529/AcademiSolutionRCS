import React from 'react';
import { Modal } from '../../../components/common';
import { TabulationRow } from './TabulationSheetPage';
import { Printer, Download, Award, CheckCircle2 } from 'lucide-react';

export interface StudentMarksheetModalProps {
  row: TabulationRow;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentMarksheetModal: React.FC<StudentMarksheetModalProps> = ({
  row,
  isOpen,
  onClose,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Official Academic Marksheet"
      subtitle={`Student: ${row.studentName} (${row.studentCode})`}
      maxWidth="2xl"
      footer={
        <>
          <button onClick={onClose} className="px-4 py-2 text-xs text-slate-600 bg-slate-100 rounded-lg">
            Close
          </button>
          <button onClick={() => window.print()} className="px-4 py-2 text-xs font-bold text-white bg-blue-600 rounded-lg flex items-center gap-2">
            <Printer className="w-4 h-4" />
            <span>Print Marksheet (PDF)</span>
          </button>
        </>
      }
    >
      <div className="space-y-6 p-4 bg-white border border-slate-200 rounded-xl">
        {/* Header Branding */}
        <div className="text-center space-y-1 border-b border-slate-200 pb-4">
          <h2 className="text-lg font-bold text-slate-900 uppercase tracking-wide">Bornomala International School</h2>
          <p className="text-xs text-slate-500">Official Student Performance Report Card</p>
          <p className="text-xs font-semibold text-blue-600">Mid-Term Examination 2025</p>
        </div>

        {/* Student Info Box */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-lg border border-slate-200 text-xs">
          <div>
            <p className="text-slate-400 font-medium">Student Name</p>
            <p className="font-bold text-slate-800 mt-0.5">{row.studentName}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Student Code</p>
            <p className="font-mono font-bold text-blue-600 mt-0.5">{row.studentCode}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Roll Number</p>
            <p className="font-bold text-slate-800 mt-0.5">#{row.rollNo}</p>
          </div>
          <div>
            <p className="text-slate-400 font-medium">Class Rank</p>
            <p className="font-bold text-amber-600 mt-0.5">Rank #{row.rank}</p>
          </div>
        </div>

        {/* Marks Table */}
        <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
          <thead className="bg-slate-100 text-slate-600 font-semibold uppercase">
            <tr>
              <th className="p-2.5">Subject</th>
              <th className="p-2.5">Full Mark</th>
              <th className="p-2.5">Pass Mark</th>
              <th className="p-2.5">Obtained</th>
              <th className="p-2.5">Grade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            <tr>
              <td className="p-2.5 font-semibold">English Language</td>
              <td className="p-2.5">100</td>
              <td className="p-2.5">33</td>
              <td className="p-2.5 font-bold text-slate-900">{row.english}</td>
              <td className="p-2.5 font-bold text-emerald-600">A</td>
            </tr>
            <tr>
              <td className="p-2.5 font-semibold">Mathematics</td>
              <td className="p-2.5">100</td>
              <td className="p-2.5">33</td>
              <td className="p-2.5 font-bold text-slate-900">{row.math}</td>
              <td className="p-2.5 font-bold text-emerald-600">A+</td>
            </tr>
            <tr>
              <td className="p-2.5 font-semibold">Bangla Literature</td>
              <td className="p-2.5">100</td>
              <td className="p-2.5">33</td>
              <td className="p-2.5 font-bold text-slate-900">{row.bangla}</td>
              <td className="p-2.5 font-bold text-emerald-600">A</td>
            </tr>
          </tbody>
        </table>

        {/* GPA Summary */}
        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200">
          <div>
            <p className="text-xs text-blue-600 font-medium">Final Outcome</p>
            <p className="text-xl font-extrabold text-blue-900">
              GPA: {row.gpa.toFixed(2)} ({row.status})
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">Total Score</p>
            <p className="text-lg font-bold text-slate-800">{row.totalMark} / 500</p>
          </div>
        </div>
      </div>
    </Modal>
  );
};
