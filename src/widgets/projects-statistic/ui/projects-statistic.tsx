'use client';

import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { Card, CardContent, CardHeader } from '@/shared/ui/card';
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/shared/ui/chart';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/ui/select';
import { useState } from 'react';

const monthlyData = [
  { period: 'July', projects: 34 },
  { period: 'August', projects: 31 },
  { period: 'September', projects: 27 },
  { period: 'October', projects: 36 },
  { period: 'November', projects: 30 },
  { period: 'December', projects: 38 },
  { period: 'January', projects: 23 },
  { period: 'February', projects: 28 },
  { period: 'March', projects: 30 },
  { period: 'April', projects: 24 },
  { period: 'May', projects: 25 },
  { period: 'June', projects: 29 },
];

const dailyData = [
  { period: 'Jun 15', projects: 22 },
  { period: 'Jun 16', projects: 24 },
  { period: 'Jun 17', projects: 26 },
  { period: 'Jun 18', projects: 21 },
  { period: 'Jun 19', projects: 28 },
  { period: 'Jun 20', projects: 25 },
  { period: 'Jun 21', projects: 23 },
  { period: 'Jun 22', projects: 29 },
  { period: 'Jun 23', projects: 31 },
  { period: 'Jun 24', projects: 27 },
  { period: 'Jun 25', projects: 30 },
  { period: 'Jun 26', projects: 26 },
  { period: 'Jun 27', projects: 24 },
  { period: 'Jun 28', projects: 29 },
];

const chartConfig = {
  desktop: {
    label: 'projects',
    color: 'var(--chart-1)',
  },
} satisfies ChartConfig;

export function ProjectsStatistic() {
  const [period, setPeriod] = useState<'day' | 'year'>('year');

  const data = period === 'year' ? monthlyData : dailyData;

  return (
    <Card className="h-full border-0">
      <CardHeader className="mb-2 flex items-center justify-between">
        <h3 className="text-left text-2xl font-semibold text-[var(--foreground)]">
          Projects Statistic
        </h3>
        <Select value={period} onValueChange={(value) => setPeriod(value as 'day' | 'year')}>
          <SelectTrigger>
            <SelectValue placeholder="Select period" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Daily</SelectItem>
            <SelectItem value="year">Monthly</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>

      <CardContent className="overflow-hidden">
        <ChartContainer config={chartConfig} className="w-full h-[300px]">
          <AreaChart width={undefined} height={300} data={data}>
            <CartesianGrid vertical={false} />
            <YAxis
              width={30}
              tick={{ fill: 'var(--foreground)' }}
              axisLine={{ stroke: 'var(--muted)' }}
              type="number"
              domain={[0, 50]}
              tickCount={6}
              tickLine={false}
            />
            <XAxis
              dataKey="period"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => (period === 'year' ? value.slice(0, 3) : value)}
              tick={{ fill: 'var(--foreground)' }}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
            <Area
              dataKey="projects"
              type="natural"
              fill="var(--chart-1)"
              fillOpacity={0.4}
              stroke="var(--chart-1)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
