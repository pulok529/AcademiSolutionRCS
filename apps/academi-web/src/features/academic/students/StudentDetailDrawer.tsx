import React from 'react';
import { Drawer, StatusBadge } from '../../../components/common';
import { Student } from '../../../types/academic';
import { User, Phone, MapPin, Calendar, BookOpen, GraduationCap, FileText, CheckCircle2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export interface StudentDetailDrawerProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
}

export const StudentDetailDrawer: React.FC<StudentDetailDrawerProps> = ({
  student,
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();

  if (!student) return null;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`${student.firstName} ${student.lastName}`}
      subtitle={`Student Code: ${student.studentCode}`}
      width="lg"
      footer={
        <>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-all"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              navigate(`/academic/students/${student.id}`);
            }}
            className="px-4 py-2 text-xs font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm transition-all"
          >
            Full Profile View
          </button>
        </>
      }
    >
      <div className="space-y-6">
        {/* Header Avatar Card */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-blue-600 text-white font-bold text-xl flex items-center justify-center shadow-md shadow-blue-600/20">
            {student.firstName[0]}
            {student.lastName[0]}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">
                {student.firstName} {student.lastName}
              </h3>
              <StatusBadge label="Active" variant="success" icon={<CheckCircle2 className="w-3 h-3" />} />
            </div>
            <p className="text-xs text-slate-500 font-mono">Code: {student.studentCode}</p>
            <div className="flex items-center gap-2 text-xs text-blue-600 font-medium">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>
                {student.className || 'Class Unassigned'} - Section {student.sectionName || 'A'} (Roll #{student.rollNo || 1})
              </span>
            </div>
          </div>
        </div>

        {/* Academic Summary Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <p className="text-slate-400 font-medium">Academic Year</p>
            <p className="font-bold text-slate-800 text-sm mt-0.5">{student.academicYear || 2025}</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <p className="text-slate-400 font-medium">Admission Date</p>
            <p className="font-bold text-slate-800 text-sm mt-0.5">
              {new Date(student.admissionDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Personal Details */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Personal Information</h4>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-3 text-slate-600">
              <User className="w-4 h-4 text-slate-400" />
              <span className="font-medium">Gender:</span>
              <span className="capitalize text-slate-800">{student.gender}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span className="font-medium">Date of Birth:</span>
              <span className="text-slate-800">{new Date(student.dateOfBirth).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-3 text-slate-600">
              <Phone className="w-4 h-4 text-slate-400" />
              <span className="font-medium">Contact:</span>
              <span className="font-mono text-slate-800">{student.contactNo}</span>
            </div>
            <div className="flex items-start gap-3 text-slate-600">
              <MapPin className="w-4 h-4 text-slate-400 mt-0.5" />
              <span className="font-medium">Address:</span>
              <span className="text-slate-800 flex-1">{student.address}</span>
            </div>
          </div>
        </div>

        {/* Parent & Guardian Info */}
        <div className="space-y-3 pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Parent Details</h4>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
              <p className="text-slate-400 text-[11px]">Father's Name</p>
              <p className="font-semibold text-slate-800 mt-0.5">{student.fatherName}</p>
            </div>
            <div className="bg-slate-50 p-3 rounded-lg border border-slate-200/60">
              <p className="text-slate-400 text-[11px]">Mother's Name</p>
              <p className="font-semibold text-slate-800 mt-0.5">{student.motherName}</p>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-2 pt-2 border-t border-slate-100">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-all">
              <FileText className="w-4 h-4 text-blue-500" />
              <span>Print Admit Card</span>
            </button>
            <button className="flex items-center gap-2 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium transition-all">
              <BookOpen className="w-4 h-4 text-emerald-500" />
              <span>View Result Sheet</span>
            </button>
          </div>
        </div>
      </div>
    </Drawer>
  );
};
