import React from 'react';
import { PageHeader, ApexChartCard, StatCard } from '../../../components/common';
import { CalendarCheck, Users, TrendingUp } from 'lucide-react';

export const AttendanceAnalyticsPage: React.FC = () => {
  const lineChartSeries = [
    {
      name: 'Attendance Rate (%)',
      data: [92, 94, 88, 95, 96, 91, 93, 97, 94, 95, 96, 98],
    },
  ];

  const lineChartOptions = {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
  };

  const donutSeries = [85, 10, 5];
  const donutOptions = {
    labels: ['Present', 'Absent', 'Late'],
    colors: ['#10b981', '#ef4444', '#f59e0b'],
  };

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Attendance Analytics & Reports"
        subtitle="Comprehensive monthly trends, class comparisons, and attendance summaries"
        breadcrumbs={[{ label: 'Academic' }, { label: 'Attendance Analytics' }]}
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Overall Attendance Rate" value="94.8%" icon={CalendarCheck} iconBgColor="bg-emerald-600" trend={{ value: '+2.4%', isUpward: true, label: 'this month' }} />
        <StatCard title="Total Days Logged" value="184 Days" icon={Users} iconBgColor="bg-blue-600" subtitle="Academic Year 2025" />
        <StatCard title="Best Performing Class" value="Class 5-A" icon={TrendingUp} iconBgColor="bg-violet-600" subtitle="98.2% attendance" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ApexChartCard
            title="Monthly Attendance Trend (2025)"
            subtitle="Percentage of present students across all classes"
            type="line"
            options={lineChartOptions}
            series={lineChartSeries}
            height={320}
          />
        </div>

        <div>
          <ApexChartCard
            title="Attendance Breakdown"
            subtitle="Ratio of Present, Absent, and Late entries"
            type="donut"
            options={donutOptions}
            series={donutSeries}
            height={320}
          />
        </div>
      </div>
    </div>
  );
};
