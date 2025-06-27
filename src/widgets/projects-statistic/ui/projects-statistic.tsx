'use client';

import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

function generateDates(days: number) {
  const dates = [];
  const today = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d);
  }
  return dates;
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function generateRandomData(days: number) {
  return Array.from({ length: days }, () => Math.floor(Math.random() * 50) + 5);
}

function getWithAlpha(color: string, alpha: number) {
  const trimmed = color.trim();
  if (trimmed.startsWith('oklch')) {
    return trimmed.replace(')', ` / ${alpha})`);
  }
  if (trimmed.startsWith('rgb(')) {
    return trimmed.replace('rgb(', `rgba(`).replace(')', `, ${alpha})`);
  }
  return `rgba(139, 92, 246, ${alpha})`; // fallback
}

const allDates = generateDates(365);
const allLabels = allDates.map(formatDate);
const allData = generateRandomData(365);

const periodDays = {
  '7d': 7,
  '30d': 30,
  '182d': 182,
  '365d': 365,
};

export function ProjectsStatistic() {
  const [period, setPeriod] = useState<'7d' | '30d' | '182d' | '365d'>('7d');
  const [chartColors, setChartColors] = useState({
    line: 'oklch(0.828 0.189 84.429)',
    fill: 'oklch(0.828 0.189 84.429 / 0.2)',
    border: 'oklch(0.922 0 0)',
    ticks: 'oklch(0.556 0 0)',
  });

  const updateColors = () => {
    const style = getComputedStyle(document.documentElement);
    const line = style.getPropertyValue('--chart-1').trim();
    setChartColors({
      line,
      fill: getWithAlpha(line, 0.2),
      border: style.getPropertyValue('--sidebar-border').trim(),
      ticks: style.getPropertyValue('--muted-foreground').trim(),
    });
  };

  useEffect(() => {
    updateColors();

    const mql = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => updateColors();

    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  const daysCount = periodDays[period];
  const filteredLabels = allLabels.slice(-daysCount);
  const filteredData = allData.slice(-daysCount);

  const data = {
    labels: filteredLabels,
    datasets: [
      {
        label: 'Projects',
        data: filteredData,
        fill: true,
        tension: 0.4,
        borderColor: chartColors.line,
        backgroundColor: chartColors.fill,
        pointBackgroundColor: chartColors.line,
        pointRadius: 2,
        pointHoverRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      title: { display: false },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 60,
        ticks: {
          stepSize: 10,
          color: chartColors.ticks,
        },
        grid: { color: chartColors.border },
      },
      x: {
        grid: { display: false },
        ticks: {
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 10,
          color: chartColors.ticks,
        },
      },
    },
  };

  return (
    <section className="h-96 w-full">
      <header className="mb-6 flex items-center justify-between">
        <h3 className="text-left text-2xl font-semibold text-[var(--foreground)]">
          Projects Statistic
        </h3>
        <Select
          value={period}
          onValueChange={(value) => setPeriod(value as keyof typeof periodDays)}
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last week</SelectItem>
            <SelectItem value="30d">Last month</SelectItem>
            <SelectItem value="182d">Last 6 months</SelectItem>
            <SelectItem value="365d">Last year</SelectItem>
          </SelectContent>
        </Select>
      </header>

      <div className="relative h-[calc(100%-3.5rem)] w-full">
        <Line data={data} options={options} />
      </div>
    </section>
  );
}
