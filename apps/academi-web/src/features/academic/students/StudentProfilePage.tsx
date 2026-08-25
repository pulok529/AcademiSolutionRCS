import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { academicApi } from '../../../services/api';
import { Student } from '../../../types/academic';
import { PageHeader, StatusBadge } from '../../../components/common';
import { ArrowLeft, User, GraduationCap, Award, CalendarCheck, DollarSign, CheckCircle2 } from 'lucide-react';

export const StudentProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'marks' | 'attendance' | 'fees'>('overview');

  useEffect(() => {
    // Load student by ID
    academicApi.getStudents().then((data) => {
      const s = data.items.find((x) => x.id === id) || data.items[0];
      setStudent(s || null);
    });
  }, [id]);

  if (!student) {
    return (
      <div className="p-12 text-center text-slate-400">
        <p>Loading student profile...</p>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview & Profile', icon: User },
    { id: 'marks', label: 'Academic Marks & Grades', icon: Award },
    { id: 'attendance', label: 'Attendance Record', icon: CalendarCheck },
    { id: 'fees', label: 'Fee Payment History', icon: DollarSign },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <PageHeader
        title={`${student.firstName} ${student.lastName}`}
        subtitle={`Student Profile 360° View — Code: ${student.studentCode}`}
        breadcrumbs={[
          { label: 'Academic', path: '/academic/students' },
          { label: 'Student Directory', path: '/academic/students' },
          { label: `${student.firstName} ${student.lastName}` },
        ]}
        action={
          <button
            onClick={() => navigate('/academic/students')}
            className="px-3 py-2 text-xs font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Directory</span>
          </button>
        }
      />

      {/* Header Profile Card */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="w-24 h-24 rounded-2xl bg-blue-600 text-white font-bold text-3xl flex items-center justify-center shadow-lg shadow-blue-600/20">
          {student.firstName[0]}
          {student.lastName[0]}
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col md:flex-row items-center gap-3">
            <h2 className="text-xl font-bold text-slate-900">{student.firstName} {student.lastName}</h2>
            <StatusBadge label="Active Enrollment" variant="success" icon={<CheckCircle2 className="w-3.5 h-3.5" />} />
          </div>
          <p className="text-xs font-mono text-slate-500">Student Code: {student.studentCode}</p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs font-medium text-slate-600 pt-2">
            <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              <GraduationCap className="w-4 h-4 text-blue-600" />
              {student.className || 'Class 1'} - Section {student.sectionName || 'A'}
            </span>
            <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Roll #{student.rollNo || 1}
            </span>
            <span className="bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              Year {student.academicYear || 2025}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-slate-200 bg-white px-4 rounded-xl border shadow-sm">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition-all ${
                isActive
                  ? 'border-blue-600 text-blue-600 bg-blue-50/50'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Personal Details</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Gender</span>
                <span className="font-semibold text-slate-800 capitalize">{student.gender}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Date of Birth</span>
                <span className="font-semibold text-slate-800">{new Date(student.dateOfBirth).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Admission Date</span>
                <span className="font-semibold text-slate-800">{new Date(student.admissionDate).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-medium">Address</span>
                <span className="font-semibold text-slate-800 text-right">{student.address}</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Parent & Contact Info</h3>
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Father's Name</span>
                <span className="font-semibold text-slate-800">{student.fatherName}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Mother's Name</span>
                <span className="font-semibold text-slate-800">{student.motherName}</span>
              </div>
              <div className="flex justify-between py-1.5">
                <span className="text-slate-500 font-medium">Emergency Phone</span>
                <span className="font-mono font-semibold text-slate-800">{student.contactNo}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'marks' && (
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4 text-xs">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Academic Term Performance</h3>
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b text-slate-500 font-semibold uppercase">
              <tr>
                <th className="py-2.5 px-3">Subject</th>
                <th className="py-2.5 px-3">CQ</th>
                <th className="py-2.5 px-3">MCQ</th>
                <th className="py-2.5 px-3">Practical</th>
                <th className="py-2.5 px-3">Total</th>
                <th className="py-2.5 px-3">Grade</th>
                <th className="py-2.5 px-3">GPA</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-800">English Language</td>
                <td className="py-2.5 px-3">45</td>
                <td className="py-2.5 px-3">28</td>
                <td className="py-2.5 px-3">—</td>
                <td className="py-2.5 px-3 font-bold text-slate-900">73</td>
                <td className="py-2.5 px-3 font-bold text-emerald-600">A</td>
                <td className="py-2.5 px-3 font-bold">4.00</td>
              </tr>
              <tr>
                <td className="py-2.5 px-3 font-semibold text-slate-800">Mathematics</td>
                <td className="py-2.5 px-3">52</td>
                <td className="py-2.5 px-3">30</td>
                <td className="py-2.5 px-3">—</td>
                <td className="py-2.5 px-3 font-bold text-slate-900">82</td>
                <td className="py-2.5 px-3 font-bold text-emerald-600">A+</td>
                <td className="py-2.5 px-3 font-bold">5.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
