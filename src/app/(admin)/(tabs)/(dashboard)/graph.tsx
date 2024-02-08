'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export function Graph({ demographics }: { demographics: any[] }) {
  const data = [
    {
      name: '0-12',
      total: demographics[0].under13,
    },
    {
      name: '13-20',
      total: demographics[0].under21,
    },
    {
      name: '21-49',
      total: demographics[0].under50,
    },
    {
      name: '50-64',
      total: demographics[0].under65,
    },
    {
      name: '>65',
      total: demographics[0].over65,
    },
  ];
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
