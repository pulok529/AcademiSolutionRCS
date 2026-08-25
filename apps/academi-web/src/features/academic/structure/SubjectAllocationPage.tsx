import React, { useState, useEffect } from 'react';
import { academicApi } from '../../../services/api';
import { ClassItem } from '../../../types/academic';
import { PageHeader, FormSelect, FormInput, Modal, confirmDialog } from '../../../components/common';
import { BookOpen, Plus, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';

export interface SubjectRule {
  id: string;
  subjectCode: string;
  subjectName: string;
  fullMark: number;
  passMark: number;
  isCompulsory: boolean;
}

export const SubjectAllocationPage: React.FC = () => {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [selectedClassId, setSelectedClassId] = useState('');
  const [subjects, setSubjects] = useState<SubjectRule[]>([
    { id: '1', subjectCode: 'ENG-101', subjectName: 'English Language', fullMark: 100, passMark: 33, isCompulsory: true },
    { id: '2', subjectCode: 'MATH-102', subjectName: 'General Mathematics', fullMark: 100, passMark: 33, isCompulsory: true },
    { id: '3', subjectCode: 'BAN-103', subjectName: 'Bangla Literature', fullMark: 100, passMark: 33, isCompulsory: true },
    { id: '4', subjectCode: 'SCI-104', subjectName: 'General Science', fullMark: 100, passMark: 33, isCompulsory: true },
    { id: '5', subjectCode: 'ICT-105', subjectName: 'Information Technology', fullMark: 50, passMark: 17, isCompulsory: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectName, setSubjectName] = useState('');
  const [subjectCode, setSubjectCode] = useState('');
  const [fullMark, setFullMark] = useState(100);
  const [passMark, setPassMark] = useState(33);

  useEffect(() => {
    academicApi.getClasses().then((data) => {
      setClasses(data);
      if (data.length > 0) setSelectedClassId(data[0].id);
    });
  }, []);

  const handleAddSubject = () => {
    if (!subjectName || !subjectCode) {
      toast.error('Please enter subject name and code');
      return;
    }
    const newSubject: SubjectRule = {
      id: Date.now().toString(),
      subjectCode,
      subjectName,
      fullMark,
      passMark,
      isCompulsory: true,
    };
    setSubjects([...subjects, newSubject]);
    toast.success('Subject added successfully!');
    setIsModalOpen(false);
  };

  const handleDeleteSubject = async (sub: SubjectRule) => {
    const confirmed = await confirmDialog({
      title: `Remove ${sub.subjectName}?`,
      text: 'This subject will be unassigned from this class.',
      icon: 'warning',
    });
    if (confirmed) {
      setSubjects(subjects.filter((s) => s.id !== sub.id));
      toast.success('Subject removed.');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Class Subject Allocation"
        subtitle="Configure subjects, pass marks, full marks, and compulsory rules per class"
        breadcrumbs={[{ label: 'Academic' }, { label: 'Subject Allocation' }]}
        action={
          <button
            onClick={() => {
              setSubjectName('');
              setSubjectCode('');
              setFullMark(100);
              setPassMark(33);
              setIsModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add Subject</span>
          </button>
        }
      />

      {/* Class Selector Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3 w-72">
          <label className="text-xs font-bold text-slate-500 uppercase">Selected Class:</label>
          <FormSelect
            label=""
            value={selectedClassId}
            onChange={(e) => setSelectedClassId(e.target.value)}
            options={classes.map((c) => ({ label: c.className, value: c.id }))}
          />
        </div>

        <div className="text-xs font-semibold text-slate-500">
          Total Assigned Subjects: <span className="text-blue-600 font-bold">{subjects.length}</span>
        </div>
      </div>

      {/* Subject Rules Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
            <tr>
              <th className="py-3.5 px-4">Subject Code</th>
              <th className="py-3.5 px-4">Subject Name</th>
              <th className="py-3.5 px-4">Full Mark</th>
              <th className="py-3.5 px-4">Pass Mark</th>
              <th className="py-3.5 px-4">Type</th>
              <th className="py-3.5 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {subjects.map((sub) => (
              <tr key={sub.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-3 px-4 font-mono font-bold text-blue-600">{sub.subjectCode}</td>
                <td className="py-3 px-4 font-semibold text-slate-900">{sub.subjectName}</td>
                <td className="py-3 px-4 font-bold text-slate-800">{sub.fullMark}</td>
                <td className="py-3 px-4 font-semibold text-emerald-600">{sub.passMark}</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold border ${
                      sub.isCompulsory
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-amber-50 text-amber-700 border-amber-200'
                    }`}
                  >
                    {sub.isCompulsory ? 'Compulsory' : 'Optional'}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDeleteSubject(sub)}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Subject Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Subject to Class"
        subtitle="Configure subject code, full mark, and pass mark"
        footer={
          <>
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleAddSubject}
              className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
            >
              Add Subject
            </button>
          </>
        }
      >
        <div className="space-y-4">
          <FormInput
            label="Subject Name"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
            placeholder="e.g. Mathematics"
            required
          />
          <FormInput
            label="Subject Code"
            value={subjectCode}
            onChange={(e) => setSubjectCode(e.target.value)}
            placeholder="e.g. MATH-101"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Full Mark"
              type="number"
              value={fullMark}
              onChange={(e) => setFullMark(parseInt(e.target.value) || 100)}
              required
            />
            <FormInput
              label="Pass Mark"
              type="number"
              value={passMark}
              onChange={(e) => setPassMark(parseInt(e.target.value) || 33)}
              required
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};
