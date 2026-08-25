import React from 'react';
import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

export interface ApexChartCardProps {
  title: string;
  subtitle?: string;
  type: 'line' | 'bar' | 'area' | 'pie' | 'donut' | 'radialBar';
  options: ApexOptions;
  series: any;
  height?: number | string;
  action?: React.ReactNode;
}

export const ApexChartCard: React.FC<ApexChartCardProps> = ({
  title,
  subtitle,
  type,
  options,
  series,
  height = 320,
  action,
}) => {
  const defaultOptions: ApexOptions = {
    chart: {
      toolbar: { show: false },
      fontFamily: 'Inter, sans-serif',
    },
    colors: ['#2563eb', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'],
    dataLabels: { enabled: false },
    stroke: { curve: 'smooth', width: 2 },
    grid: { borderColor: '#f1f5f9' },
    xaxis: {
      labels: { style: { colors: '#64748b', fontSize: '11px' } },
      axisBorder: { color: '#e2e8f0' },
    },
    yaxis: {
      labels: { style: { colors: '#64748b', fontSize: '11px' } },
    },
    legend: {
      position: 'bottom',
      labels: { colors: '#475569' },
      fontSize: '12px',
    },
    ...options,
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-bold text-slate-800 tracking-tight">{title}</h3>
          {subtitle && <p className="text-[11px] text-slate-400">{subtitle}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>

      <div className="w-full">
        <Chart options={defaultOptions} series={series} type={type} height={height} />
      </div>
    </div>
  );
};
