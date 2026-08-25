import React from 'react';
import { PageHeader, StatCard, ApexChartCard } from '../../../components/common';
import { DollarSign, Download, TrendingUp, CreditCard } from 'lucide-react';

export const FeeCollectionReportPage: React.FC = () => {
  const chartOptions = {
    xaxis: {
      categories: ['Tuition Fee', 'Exam Fee', 'Admission Fee', 'Library Fee', 'Transport Fee'],
    },
  };

  const chartSeries = [
    {
      name: 'Collection (৳)',
      data: [450000, 120000, 250000, 35000, 85000],
    },
  ];

  return (
    <div className="p-6 space-y-6">
      <PageHeader
        title="Fee Collection Summary Report"
        subtitle="Head-wise daily and monthly financial collection breakdown"
        breadcrumbs={[{ label: 'Accounts' }, { label: 'Fee Collection Reports' }]}
        action={
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold text-xs rounded-lg shadow-sm">
            <Download className="w-4 h-4" />
            <span>Export Excel</span>
          </button>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="Total Monthly Collection" value="৳ 940,000" icon={DollarSign} iconBgColor="bg-emerald-600" trend={{ value: '+8.5%', isUpward: true }} />
        <StatCard title="Today's Receipts" value="৳ 45,500" icon={CreditCard} iconBgColor="bg-blue-600" subtitle="32 receipts issued" />
        <StatCard title="Pending Dues" value="৳ 65,000" icon={TrendingUp} iconBgColor="bg-rose-500" subtitle="5 students overdue" />
      </div>

      <ApexChartCard
        title="Head-wise Fee Collection Breakdown (2025)"
        subtitle="Total revenue generated per fee category"
        type="bar"
        options={chartOptions}
        series={chartSeries}
        height={320}
      />
    </div>
  );
};
