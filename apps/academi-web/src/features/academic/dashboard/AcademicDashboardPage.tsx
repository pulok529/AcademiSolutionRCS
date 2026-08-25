import React, { useState, useEffect } from 'react';
import { PageHeader, StatCard, ApexChartCard } from '../../../components/common';
import { 
  Users, 
  School, 
  DollarSign, 
  CalendarCheck, 
  Plus, 
  CreditCard, 
  FileText, 
  TrendingUp, 
  Award, 
  BellRing, 
  Clock, 
  ArrowUpRight, 
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const AcademicDashboardPage: React.FC = () => {
  const [timeString, setTimeString] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Main Trend Spline Area Chart (Admissions vs Revenue)
  const mainTrendSeries = [
    { name: 'New Admissions', data: [45, 65, 80, 120, 150, 95, 110, 140, 180, 210, 190, 230] },
    { name: 'Fee Collection (৳ 10k)', data: [30, 40, 55, 75, 90, 85, 95, 120, 145, 165, 150, 185] },
  ];

  const mainTrendOptions: any = {
    chart: { toolbar: { show: false } },
    stroke: { curve: 'smooth', width: 3 },
    colors: ['#2563eb', '#10b981'],
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.4, opacityTo: 0.05 } },
  };

  // Attendance Donut Chart
  const attendanceSeries = [85, 10, 5];
  const attendanceOptions: any = {
    labels: ['Present', 'Absent', 'Late'],
    colors: ['#10b981', '#ef4444', '#f59e0b'],
    legend: { position: 'bottom' },
  };

  // Mock Recent Admissions
  const recentAdmissions = [
    { code: 'STU-100234', name: 'Rahul Islam', class: 'Class 1-A', date: 'Today, 09:30 AM', status: 'Enrolled' },
    { code: 'STU-100235', name: 'Nusrat Jahan', class: 'Class 2-B', date: 'Today, 10:15 AM', status: 'Enrolled' },
    { code: 'STU-100236', name: 'Tanvir Hossain', class: 'Class 5-A', date: 'Yesterday', status: 'Pending Verification' },
    { code: 'STU-100237', name: 'Amina Khatun', class: 'Class 3-A', date: 'Aug 24, 2026', status: 'Enrolled' },
  ];

  return (
    <div className="p-6 space-y-6 font-sans">
      {/* Hero Greeting Banner (Paces Dark Gradient Card) */}
      <div className="bg-gradient-to-r from-[#162a45] via-[#1e3a5f] to-[#254b85] p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-semibold border border-blue-400/20">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
              <span>Academi Management System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Welcome back, Admin User!
            </h1>
            <p className="text-xs text-blue-200/90 max-w-xl leading-relaxed">
              Here is your daily academic overview. Manage student admissions, track attendance analytics, and run result processing.
            </p>

            <div className="flex items-center gap-4 pt-2 text-xs font-mono text-blue-300">
              <span className="flex items-center gap-1.5 bg-black/20 px-3 py-1 rounded-lg border border-white/10">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                {timeString || 'Live Clock'}
              </span>
              <span>{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
          </div>

          {/* Quick Action Button Group */}
          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/academic/admission"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/30 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>New Admission</span>
            </Link>
            <Link
              to="/accounts/fees"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/30 transition-all"
            >
              <CreditCard className="w-4 h-4" />
              <span>Collect Fee</span>
            </Link>
            <Link
              to="/academic/marks-entry"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-all"
            >
              <FileText className="w-4 h-4" />
              <span>Enter Marks</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 4 KPI Stat Cards with Trend Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Enrolled Students"
          value="1,250"
          icon={Users}
          iconBgColor="bg-blue-600"
          trend={{ value: '+12%', isUpward: true, label: 'this academic year' }}
        />
        <StatCard
          title="Active Classes & Sections"
          value="32 Classes"
          icon={School}
          iconBgColor="bg-emerald-600"
          subtitle="Sections A, B, C (100% capacity)"
        />
        <StatCard
          title="Monthly Fee Collection"
          value="৳ 940,000"
          icon={DollarSign}
          iconBgColor="bg-amber-500"
          trend={{ value: '+8.5%', isUpward: true, label: 'vs last month' }}
        />
        <StatCard
          title="Overall Attendance Rate"
          value="94.8%"
          icon={CalendarCheck}
          iconBgColor="bg-violet-600"
          trend={{ value: '+2.4%', isUpward: true, label: 'today' }}
        />
      </div>

      {/* ApexCharts Visual Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Spline Area Trend Chart (2 Columns) */}
        <div className="lg:col-span-2">
          <ApexChartCard
            title="Student Enrollment & Revenue Growth (2025)"
            subtitle="Monthly comparison of new student admissions vs total fee collections"
            type="area"
            options={mainTrendOptions}
            series={mainTrendSeries}
            height={330}
          />
        </div>

        {/* Attendance Ratio Donut Chart (1 Column) */}
        <div>
          <ApexChartCard
            title="Daily Attendance Ratio"
            subtitle="Today's breakdown of Present, Absent, and Late students"
            type="donut"
            options={attendanceOptions}
            series={attendanceSeries}
            height={330}
          />
        </div>
      </div>

      {/* Widgets Row: Notice Board & Recent Student Admissions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Notice Board & Announcements (1 Column) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <BellRing className="w-5 h-5 text-amber-500" />
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Notice Board</h3>
            </div>
            <span className="text-[10px] font-bold bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 px-2 py-0.5 rounded-full">
              3 Active
            </span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border-l-4 border-blue-500 space-y-1">
              <p className="font-bold text-slate-900 dark:text-slate-100">First Term Examination Schedule</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Exam schedules published for Class 1 to 10 starting April 10, 2025.</p>
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-semibold">Posted 2 hours ago</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border-l-4 border-emerald-500 space-y-1">
              <p className="font-bold text-slate-900 dark:text-slate-100">Tuition Fee Payment Due Reminder</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Monthly tuition fees due by 10th of this month to avoid late fine.</p>
              <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-semibold">Posted Yesterday</span>
            </div>

            <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border-l-4 border-amber-500 space-y-1">
              <p className="font-bold text-slate-900 dark:text-slate-100">Annual Sports Meet Announcement</p>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">Student sports registration open until Friday.</p>
              <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400 font-semibold">Posted Aug 22, 2026</span>
            </div>
          </div>
        </div>

        {/* Recent Student Admissions Feed (2 Columns) */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">Recent Student Admissions</h3>
            </div>
            <Link to="/academic/students" className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1">
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold uppercase">
                <tr>
                  <th className="p-3">Student ID</th>
                  <th className="p-3">Student Name</th>
                  <th className="p-3">Class & Section</th>
                  <th className="p-3">Admission Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {recentAdmissions.map((row) => (
                  <tr key={row.code} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">{row.code}</td>
                    <td className="p-3 font-semibold text-slate-900 dark:text-slate-100">{row.name}</td>
                    <td className="p-3 font-medium">{row.class}</td>
                    <td className="p-3 text-slate-500 dark:text-slate-400">{row.date}</td>
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        row.status === 'Enrolled'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300 border border-amber-200'
                      }`}>
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
