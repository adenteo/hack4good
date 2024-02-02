import { BarChart, Card, Title } from '@tremor/react';

const chartdata2 = [
  {
    name: 'Topic 1',
    'Group A': 890,
    'Group B': 338,
    'Group C': 538,
    'Group D': 396,
    'Group E': 138,
    'Group F': 436,
  },
  {
    name: 'Topic 2',
    'Group A': 289,
    'Group B': 233,
    'Group C': 253,
    'Group D': 333,
    'Group E': 133,
    'Group F': 533,
  },
  {
    name: 'Topic 3',
    'Group A': 380,
    'Group B': 535,
    'Group C': 352,
    'Group D': 718,
    'Group E': 539,
    'Group F': 234,
  },
  {
    name: 'Topic 4',
    'Group A': 90,
    'Group B': 98,
    'Group C': 28,
    'Group D': 33,
    'Group E': 61,
    'Group F': 53,
  },
];

const valueFormatter = (number: number) =>
  `$ ${new Intl.NumberFormat('us').format(number).toString()}`;

export default function ExampleChart() {
  return (
    <Card>
      <Title>Volunteer Activity</Title>
      <BarChart
        className="mt-6"
        data={chartdata2}
        index="name"
        categories={[
          'Group A',
          'Group B',
          'Group C',
          'Group D',
          'Group E',
          'Group F',
        ]}
        colors={['blue', 'teal', 'amber', 'rose', 'indigo', 'emerald']}
        // valueFormatter={valueFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
}
