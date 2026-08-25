import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  BookOpen, 
  CalendarCheck, 
  Award, 
  DollarSign, 
  FileText, 
  ChevronDown,
  ChevronRight,
  School,
  FileSpreadsheet,
  Cpu,
  Clock,
  BarChart3,
  CreditCard,
  Target,
  Mail,
  HelpCircle,
  Percent,
  Grid,
  ShieldCheck,
  FolderOpen
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useThemeStore } from '../../stores/useThemeStore';

interface SidebarProps {
  currentPath: string;
}

interface MenuItem {
  label: string;
  path?: string;
  icon?: any;
  badge?: string;
  children?: { label: string; path: string; badge?: string }[];
}

interface MenuGroup {
  category?: string;
  items: MenuItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({ currentPath }) => {
  const { sidenavColor, sidenavSize, isPinned, togglePinned } = useThemeStore();
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({
    'Student Management': true,
    'Academic Structure': true,
    'Exams & Grading': true,
    'Attendance': false,
    'Fees & Financials': false,
  });

  const toggleMenu = (title: string) => {
    setOpenMenus((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const menuGroups: MenuGroup[] = [
    {
      category: 'MAIN DASHBOARD',
      items: [
        {
          label: 'Student Management',
          icon: Users,
          children: [
            { label: 'Student Directory', path: '/academic/students' },
            { label: 'New Admission', path: '/academic/admission', badge: 'New' },
            { label: 'Bulk Promotion', path: '/academic/promotion' },
          ],
        },
        {
          label: 'Academic Structure',
          icon: School,
          children: [
            { label: 'Classes & Sections', path: '/academic/classes' },
            { label: 'Subject Allocation', path: '/academic/subjects' },
            { label: 'Class Routine', path: '/academic/routine' },
          ],
        },
        {
          label: 'Exams & Grading',
          icon: Award,
          children: [
            { label: 'Exam Terms & Scales', path: '/academic/exams' },
            { label: 'Spreadsheet Marks Entry', path: '/academic/marks-entry' },
            { label: '1-Click Result Engine', path: '/academic/result-processing', badge: 'Pro' },
            { label: 'Tabulation Sheet', path: '/academic/tabulation' },
          ],
        },
        {
          label: 'Attendance',
          icon: CalendarCheck,
          children: [
            { label: 'Daily Register', path: '/academic/attendance' },
            { label: 'Attendance Analytics', path: '/academic/attendance-reports' },
          ],
        },
        {
          label: 'Fees & Financials',
          icon: CreditCard,
          children: [
            { label: 'Fee Counter & Receipt', path: '/accounts/fees', badge: 'POS' },
            { label: 'Fee Collection Report', path: '/accounts/reports' },
          ],
        },
      ],
    },
    {
      category: 'PACES TEMPLATE SUITE',
      items: [
        { label: 'Users & Roles', icon: Users, children: [{ label: 'User Directory', path: '#' }, { label: 'Permissions', path: '#' }] },
        { label: 'Finance Accounts', icon: DollarSign, children: [{ label: 'Transactions', path: '#' }, { label: 'Invoices', path: '#' }] },
        { label: 'HRM Payroll', icon: Target, children: [{ label: 'Staff List', path: '#' }, { label: 'Salary Slip', path: '#' }] },
        { label: 'Email Portal', icon: Mail, badge: 'New', path: '#' },
        { label: 'Support Center', icon: HelpCircle, path: '#' },
        { label: 'More Apps', icon: Grid, path: '#' },
      ],
    },
    {
      category: 'CUSTOM PAGES',
      items: [
        { label: 'Pages', icon: FolderOpen, children: [{ label: 'Profile', path: '#' }, { label: 'Settings', path: '#' }] },
        { label: 'Authentication', icon: ShieldCheck, children: [{ label: 'Sign In', path: '/login' }] },
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
      } ${getSidenavBgClass()} flex flex-col min-h-screen transition-all duration-300 z-20 font-sans`}
    >
      {/* Paces Logo Header with Pin Button ⊙ (Matching Screenshot) */}
      <div className={`p-4 flex items-center justify-between ${getHeaderBgClass()}`}>
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-pink-500 via-purple-600 to-blue-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md">
            Hı
          </div>
          {!isCompact && (
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold tracking-tight text-lg leading-none">Paces</span>
              <span className="text-[10px] font-semibold bg-blue-500/20 text-blue-300 px-1.5 py-0.5 rounded">
                PRO
              </span>
            </div>
          )}
        </div>

        {!isCompact && (
          <button
            onClick={togglePinned}
            className={`w-6 h-6 rounded-full border border-slate-500/30 flex items-center justify-center text-xs transition-colors hover:border-white ${
              isPinned ? 'text-blue-400 font-bold' : 'text-slate-400'
            }`}
            title="Toggle Pin Sidebar"
          >
            ⊙
          </button>
        )}
      </div>

      {/* Navigation Accordion List */}
      <nav className="flex-1 px-3 py-4 space-y-4 overflow-y-auto">
        {menuGroups.map((group, idx) => (
          <div key={idx} className="space-y-1">
            {group.category && !isCompact && (
              <p className="text-[10px] font-bold opacity-50 tracking-wider px-3 mb-2 uppercase">
                {group.category}
              </p>
            )}

            {group.items.map((item) => {
              const Icon = item.icon;
              const hasChildren = item.children && item.children.length > 0;
              const isOpen = !!openMenus[item.label];
              const isChildActive = item.children?.some((c) => c.path === currentPath);

              if (!hasChildren) {
                const isActive = item.path === currentPath;
                return (
                  <Link
                    key={item.label}
                    to={item.path || '#'}
                    title={isCompact ? item.label : undefined}
                    className={`flex items-center ${
                      isCompact ? 'justify-center px-0 py-2.5' : 'justify-between px-3 py-2'
                    } rounded-xl text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30'
                        : 'opacity-80 hover:opacity-100 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {Icon && <Icon className="w-4 h-4 opacity-80" />}
                      {!isCompact && <span>{item.label}</span>}
                    </div>
                    {item.badge && !isCompact && (
                      <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              }

              return (
                <div key={item.label} className="space-y-1">
                  <button
                    onClick={() => toggleMenu(item.label)}
                    title={isCompact ? item.label : undefined}
                    className={`w-full flex items-center ${
                      isCompact ? 'justify-center px-0 py-2.5' : 'justify-between px-3 py-2'
                    } rounded-xl text-xs font-semibold transition-all ${
                      isChildActive
                        ? 'text-blue-400 font-bold bg-white/5'
                        : 'opacity-80 hover:opacity-100 hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {Icon && <Icon className="w-4 h-4 opacity-80" />}
                      {!isCompact && <span>{item.label}</span>}
                    </div>
                    {!isCompact && (
                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span className="bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                            {item.badge}
                          </span>
                        )}
                        <ChevronDown
                          className={`w-3.5 h-3.5 opacity-60 transition-transform duration-200 ${
                            isOpen ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    )}
                  </button>

                  {/* Expanded Sub-items (Accordion) */}
                  {isOpen && !isCompact && (
                    <div className="pl-9 pr-2 space-y-1 border-l-2 border-slate-700/40 ml-4 py-1">
                      {item.children?.map((child) => {
                        const isSubActive = child.path === currentPath;
                        return (
                          <Link
                            key={child.path}
                            to={child.path}
                            className={`flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                              isSubActive
                                ? 'text-white font-bold bg-blue-600/30 border border-blue-500/40'
                                : 'opacity-70 hover:opacity-100 hover:text-white'
                            }`}
                          >
                            <span>{child.label}</span>
                            {child.badge && (
                              <span className="bg-blue-500/30 text-blue-300 text-[9px] font-bold px-1 rounded">
                                {child.badge}
                              </span>
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Footer Branding */}
      {!isCompact && (
        <div className="p-4 border-t border-slate-700/30 text-xs opacity-70 text-center">
          <p className="font-bold text-[11px]">Creatrix Soft Tech Ltd</p>
          <p className="text-[10px] opacity-60 mt-0.5">Paces Admin Suite v1.0</p>
        </div>
      )}
    </aside>
  );
};
