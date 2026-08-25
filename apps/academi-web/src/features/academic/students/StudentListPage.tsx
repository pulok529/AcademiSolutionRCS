import React, { useState, useEffect } from 'react';
import { academicApi } from '../../../services/api';
import { Student, ClassItem } from '../../../types/academic';
import { PageHeader, StatCard, DataTable, StatusBadge, Column } from '../../../components/common';
import { StudentDetailDrawer } from './StudentDetailDrawer';
import { Users, GraduationCap, UserCheck, Plus, Eye, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const StudentListPage: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const [studentsData, classesData] = await Promise.all([
        academicApi.getStudents({
          search: search || undefined,
          classId: selectedClass || undefined,
          page: currentPage,
          pageSize: 10,
        }),
        academicApi.getClasses(),
      ]);
      setStudents(studentsData.items);
      setTotalCount(studentsData.totalCount);
      setClasses(classesData);
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedClass, currentPage, search]);

  const columns: Column<Student>[] = [
    {
      header: 'Student ID',
      accessor: (s) => <span className="font-mono font-bold text-blue-600">{s.studentCode}</span>,
    },
    {
      header: 'Student Name',
      accessor: (s) => (
        <div>
          <p className="font-bold text-slate-800">{s.firstName} {s.lastName}</p>
          <p className="text-[11px] text-slate-400">Father: {s.fatherName}</p>
        </div>
      ),
    },
    {
      header: 'Class & Section',
      accessor: (s) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200">
          {s.className || 'Class 1'} - {s.sectionName || 'A'}
        </span>
      ),
    },
    {
      header: 'Roll',
      accessor: (s) => <span className="font-bold text-slate-800">#{s.rollNo || 1}</span>,
    },
    {
      header: 'Contact',
      accessor: (s) => <span className="font-mono text-slate-600">{s.contactNo}</span>,
    },
    {
      header: 'Status',
      accessor: () => <StatusBadge label="Active" variant="success" icon={<UserCheck className="w-3 h-3" />} />,
    },
    {
      header: 'Actions',
      accessor: (s) => (
        <button
          onClick={() => {
            setSelectedStudent(s);
            setIsDrawerOpen(true);
          }}
          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-1 font-medium text-xs"
        >
          <Eye className="w-4 h-4" />
          <span>View</span>
        </button>
      ),
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Student Directory"
        subtitle="Manage enrolled student records, class assignments, and profile details"
        breadcrumbs={[{ label: 'Academic' }, { label: 'Student Directory' }]}
        action={
          <Link
            to="/academic/admission"
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium text-xs rounded-lg shadow-sm shadow-blue-600/30 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Admission</span>
          </Link>
        }
      />

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={totalCount}
          icon={Users}
          iconBgColor="bg-blue-600"
          trend={{ value: '+12%', isUpward: true, label: 'this year' }}
        />
        <StatCard
          title="Active Classes"
          value={classes.length}
          icon={GraduationCap}
          iconBgColor="bg-emerald-600"
          subtitle="Classes 1 to 10"
        />
        <StatCard
          title="Active Sections"
          value={classes.reduce((acc, c) => acc + c.sections.length, 0)}
          icon={UserCheck}
          iconBgColor="bg-violet-600"
          subtitle="Sections A, B, C"
        />
        <StatCard
          title="Avg Pass Rate"
          value="94.2%"
          icon={Award}
          iconBgColor="bg-amber-500"
          trend={{ value: '+3.1%', isUpward: true, label: 'vs last term' }}
        />
      </div>

      {/* Main Data Table */}
      <DataTable
        columns={columns}
        data={students}
        keyExtractor={(s) => s.id}
        loading={loading}
        searchPlaceholder="Search student name, ID, contact..."
        onSearchChange={(val) => setSearch(val)}
        filterComponent={
          <div className="flex items-center gap-2">
            <label className="text-xs font-semibold text-slate-500">Filter Class:</label>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="bg-white border border-slate-200 text-xs rounded-lg px-3 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">All Classes</option>
              {classes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.className}
                </option>
              ))}
            </select>
          </div>
        }
        pagination={{
          currentPage,
          totalCount,
          pageSize: 10,
          onPageChange: (p) => setCurrentPage(p),
        }}
        emptyMessage="No students found matching your search"
      />

      {/* Student 360 Drawer */}
      <StudentDetailDrawer
        student={selectedStudent}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
