'use client';

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { useMemo, useState } from 'react';
import { UserProjectStatEntry } from '@/entities/user-project-stat/domain';

const chartConfig = {
  desktop: {
    label: 'projects',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

type ChartPoint = { period: string; projects: number };

function formatMonth(date: Date) {
  return date.toLocaleString('ru-RU', { month: 'long' });
}

function formatDay(date: Date) {
  return date.toLocaleString('ru-RU', { month: 'short', day: '2-digit' });
}

function groupStatsByMonth(stats: UserProjectStatEntry[]): ChartPoint[] {
  const monthMap = new Map<string, number>();

  for (const stat of stats) {
    const label = formatMonth(stat.date);
    monthMap.set(label, (monthMap.get(label) ?? 0) + stat.projects);
  }

  return Array.from(monthMap.entries()).map(([period, projects]) => ({ period, projects }));
}

function groupStatsByDay(stats: UserProjectStatEntry[]): ChartPoint[] {
  return stats.map((stat) => ({
    period: formatDay(stat.date),
    projects: stat.projects,
  }));
}

export function ProjectsStatistic({ stats }: { stats: UserProjectStatEntry[] }) {
  const [period, setPeriod] = useState<'day' | 'month'>('month');

  const chartData: ChartPoint[] = useMemo(() => {
    return period === 'month' ? groupStatsByMonth(stats) : groupStatsByDay(stats);
  }, [stats, period]);

  return (
    <Card className="h-full w-full border-0">
      <CardHeader className="mb-2 flex items-center justify-between">
        <h3 className="text-left text-3xl font-semibold text-[var(--foreground)]">
          Статистика проектов
        </h3>
        <Select value={period} onValueChange={(value) => setPeriod(value as 'day' | 'month')}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите период" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">По дням</SelectItem>
            <SelectItem value="month">По месяцам</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="overflow-hidden">
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <ResponsiveContainer width="100%">
            <AreaChart data={chartData}>
              <CartesianGrid vertical={false} />
              <YAxis
                width={20}
                tick={{ fill: 'var(--foreground)' }}
                axisLine={{ stroke: 'var(--muted)' }}
                type="number"
                domain={[0, 'auto']}
                tickCount={6}
                tickLine={false}
              />
              <XAxis
                dataKey="period"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tick={{ fill: 'var(--foreground)' }}
              />
              <ChartTooltip
                cursor={true}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    className="bg-chart-1 text-white [&_*]:text-white"
                    hideIndicator
                    hideLabel
                  />
                }
              />
              <Area
                dataKey="projects"
                type="natural"
                fill="var(--chart-1)"
                fillOpacity={0.4}
                stroke="var(--chart-1)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
