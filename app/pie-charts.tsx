'use client';

import { Pie, PieChart } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

// #region Sample data
const data01 = [
  { name: 'Verbal Agression', value: 400 },
  { name: 'Customer Hostility', value: 300 },
  { name: 'Assistant did not speak French', value: 300 },
  { name: 'Unsupported Language', value: 200 },
  { name: 'Assistant did not speak Spanish', value: 100 },
];
const data02 = [
  { name: 'User refused to confirm identity', value: 300 },
  { name: 'Caller identification', value: 100 },
  { name: 'Incorrect caller identity', value: 80 },
];

// #endregion
export default function TwoLevelPieChart({ isAnimationActive = true }: { isAnimationActive?: boolean }) {
  return (
    <PieChart
      style={{ width: '100%', height: '100%', maxWidth: '500px', maxHeight: '80vh', aspectRatio: 1 }}
      responsive
    >
      <Pie
        data={data01}
        dataKey="value"
        labelLine={true}
        cx="50%"
        cy="50%"
        outerRadius="50%"
        fill="var(--color-super-green)"
        isAnimationActive={isAnimationActive}
      />
      <Pie
        data={data02}
        dataKey="value"
        cx="50%"
        cy="50%"
        innerRadius="60%"
        outerRadius="80%"
        fill="var(--color-super-grey)"
        label
        isAnimationActive={isAnimationActive}
      />
    </PieChart>
  );
}
