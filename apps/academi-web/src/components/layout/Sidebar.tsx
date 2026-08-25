import React from 'react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  Award, 
  DollarSign, 
  FileText, 
  Settings, 
  ChevronRight,
  School
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface SidebarProps {
  currentPath: string;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const menuGroups = [
    {
      title: 'ACADEMIC',
      items: [
        { label: 'Student Directory', path: '/academic/students', icon: Users },
        { label: 'New Admission', path: '/academic/admission', icon: GraduationCap },
        { label: 'Classes & Sections', path: '/academic/classes', icon: School },
        { label: 'Subjects & Routine', path: '/academic/subjects', icon: BookOpen },
        { label: 'Attendance', path: '/academic/attendance', icon: CalendarCheck },
        { label: 'Exam & Grading', path: '/academic/exams', icon: Award },
      ],
    },
    {
      title: 'ACCOUNTS & FINANCE',
      items: [
        { label: 'Fee Collection', path: '/accounts/fees', icon: DollarSign },
        { label: 'Financial Reports', path: '/accounts/reports', icon: FileText },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { label: 'Settings & Rules', path: '/settings', icon: Settings },
      ],
    },
  ];

  return (
    <aside className="w-64 bg-[#1e3a5f] text-slate-200 flex flex-col min-h-screen shadow-xl">
      {/* Brand Header */}
      <div className="p-6 flex items-center gap-3 border-b border-slate-700/60 bg-[#162a45]">
        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/30">
          <GraduationCap className="w-6 h-6" />
        </div>
        <div>
          <h1 className="font-bold text-white tracking-wide text-lg leading-tight">Academi</h1>
          <p className="text-[11px] text-blue-300 font-medium">School Management</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-6 space-y-6 overflow-y-auto">
        {menuGroups.map((group, idx) => (
          <div key={idx}>
            <p className="text-[10px] font-bold text-slate-400 tracking-wider px-3 mb-2 uppercase">
              {group.title}
            </p>
            <div className="space-y-1">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPath === item.path || currentPath.startsWith(item.path + '/');
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-md shadow-blue-600/20 font-semibold'
                        : 'text-slate-300 hover:bg-slate-700/50 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {isActive && <ChevronRight className="w-4 h-4 text-blue-200" />}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Info */}
      <div className="p-4 border-t border-slate-700/50 text-xs text-slate-400 text-center bg-[#162a45]/50">
        <p className="font-medium text-slate-300">Creatrix Soft Tech Ltd</p>
        <p className="text-[10px] mt-0.5">v1.0.0 Microservices</p>
      </div>
    </aside>
  );
};
