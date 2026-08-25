import React from 'react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  Award, 
  DollarSign, 
  FileText, 
  ChevronRight,
  School,
  FileSpreadsheet,
  Cpu,
  Clock,
  BarChart3,
  CreditCard
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useThemeStore } from '../../stores/useThemeStore';

interface SidebarProps {
  currentPath: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const { sidenavColor, sidenavSize } = useThemeStore();

  const menuGroups = [
    {
      title: 'STUDENT & ADMISSIONS',
      items: [
        { label: 'Student Directory', path: '/academic/students', icon: Users },
        { label: 'New Admission', path: '/academic/admission', icon: GraduationCap },
        { label: 'Bulk Promotion', path: '/academic/promotion', icon: ChevronRight },
      ],
    },
    {
      title: 'ACADEMIC STRUCTURE',
      items: [
        { label: 'Classes & Sections', path: '/academic/classes', icon: School },
        { label: 'Subject Allocation', path: '/academic/subjects', icon: BookOpen },
        { label: 'Class Timetable', path: '/academic/routine', icon: Clock },
      ],
    },
    {
      title: 'EXAMS & GRADING',
      items: [
        { label: 'Exam Terms & Scales', path: '/academic/exams', icon: Award },
        { label: 'Spreadsheet Marks Entry', path: '/academic/marks-entry', icon: FileSpreadsheet },
        { label: '1-Click Result Engine', path: '/academic/result-processing', icon: Cpu },
        { label: 'Tabulation Sheet', path: '/academic/tabulation', icon: FileText },
      ],
    },
    {
      title: 'ATTENDANCE',
      items: [
        { label: 'Daily Register', path: '/academic/attendance', icon: CalendarCheck },
        { label: 'Attendance Analytics', path: '/academic/attendance-reports', icon: BarChart3 },
      ],
    },
    {
      title: 'FEES & FINANCIALS',
      items: [
        { label: 'Fee Counter & Receipt', path: '/accounts/fees', icon: CreditCard },
        { label: 'Fee Collection Report', path: '/accounts/reports', icon: DollarSign },
      ],
    },
  ];

  const getSidenavBgClass = () => {
    if (sidenavColor === 'light') return 'bg-white text-slate-800 border-r border-slate-200';
    if (sidenavColor === 'gray') return 'bg-slate-800 text-slate-200 border-r border-slate-700';
    if (sidenavColor === 'gradient') return 'bg-gradient-to-b from-[#1a365d] via-[#1e3a5f] to-[#0f172a] text-white';
    return 'bg-[#1e3a5f] text-slate-200 shadow-xl';
  };

  const getHeaderBgClass = () => {
    if (sidenavColor === 'light') return 'bg-slate-50 border-b border-slate-200 text-slate-900';
    if (sidenavColor === 'gray') return 'bg-slate-900/60 border-b border-slate-700 text-white';
    return 'bg-[#162a45] border-b border-slate-700/60 text-white';
  };

  const isCompact = sidenavSize === 'compact';
  const isOffcanvas = sidenavSize === 'offcanvas';

  if (isOffcanvas) return null;

  return (
    <aside
      className={`${
        isCompact ? 'w-20' : 'w-64'
      } ${getSidenavBgClass()} flex flex-col min-h-screen transition-all duration-300 z-20`}
    >
      {/* Brand Header */}
      <div className={`p-5 flex items-center ${isCompact ? 'justify-center' : 'gap-3'} ${getHeaderBgClass()}`}>
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30 flex-shrink-0">
          <GraduationCap className="w-6 h-6" />
        </div>
        {!isCompact && (
          <div>
            <h1 className="font-bold tracking-wide text-base leading-tight">Academi</h1>
            <p className="text-[10px] opacity-75 font-medium">School Management</p>
          </div>
        )}
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            {!isCompact && (
              <p className="text-[10px] font-bold opacity-60 tracking-wider px-3 mb-2 uppercase">
                {group.title}
              </p>
            )}
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    title={isCompact ? item.label : undefined}
                    className={`flex items-center ${
                      isCompact ? 'justify-center px-0 py-3' : 'justify-between px-3 py-2.5'
                    } rounded-xl text-xs font-semibold transition-all duration-150 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-bold'
                        : 'opacity-80 hover:opacity-100 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'opacity-70'}`} />
                      {!isCompact && <span>{item.label}</span>}
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Info */}
      {!isCompact && (
        <div className="p-4 border-t border-slate-700/30 text-xs opacity-75 text-center">
          <p className="font-semibold text-[11px]">Creatrix Soft Tech Ltd</p>
          <p className="text-[10px] mt-0.5 opacity-70">Paces Theme Engine</p>
        </div>
      )}
    </aside>
  );
};
