import { Card, DonutChart, Title } from '@tremor/react';

export function Leaderboard({ demographics }: { demographics: any[] }) {
  if (!demographics?.[0]) {
    return null;
  }

  const area = [
    {
      name: 'Central',
      count: demographics?.[0].zone_Central,
    },
    {
      name: 'City',
      count: demographics?.[0].zone_City,
    },
    {
      name: 'East',
      count: demographics?.[0].zone_East,
    },
    {
      name: 'North',
      count: demographics?.[0].zone_North,
    },
    {
      name: 'South',
      count: demographics?.[0].zone_South,
    },
    {
      name: 'West',
      count: demographics?.[0].zone_West,
    },
  ];

  const gender = [
    {
      name: 'Male',
      count: demographics?.[0].gender_Male,
    },
    {
      name: 'Female',
      count: demographics?.[0].gender_Female,
    },
    {
      name: 'Other',
      count: demographics?.[0].gender_Other,
    },
  ];

  //   const DataRenderer = (data: any) => {
  //     const renderItemUntilAttendanceAbsent = () => {
  //       const items = [];
  //       for (let key in data) {
  //         if (key === 'attendance_Absent') break;
  //         items.push(
  //           <div key={key}>
  //             {key}: {data[key]}
  //           </div>,
  //         );
  //       }
  //       return items;
  //     };

  //     return <div>{renderItemUntilAttendanceAbsent()}</div>;
  //   };
  return (
    <div className="space-y-8">
      <div className="text-center font-bold">Region</div>
      <DonutChart
        variant="pie"
        className="mt-6"
        data={area}
        category="count"
        index="name"
        colors={['slate', 'violet', 'indigo', 'rose', 'cyan', 'amber']}
      />
      <div className="text-center font-bold">Gender</div>
      <DonutChart
        variant="pie"
        className="mt-6"
        data={gender}
        category="count"
        index="name"
        colors={['blue', 'red', 'gray']}
      />
    </div>
  );
}
