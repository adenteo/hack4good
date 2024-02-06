'use client';
import React from 'react';
import { TextInput } from '@tremor/react';

import { ForYouScroll } from '@/components/ui/for-you-scroll';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchIcon } from 'lucide-react';
import { FeaturedScroll } from '@/components/ui/featured-scroll';
// import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addRoles } from '@/lib/actions/add-roles';
import { generateAndSaveDummyData } from '@/lib/actions/dummydata';
import {
  addDummyDataToAttendeeList,
  generateAndSaveDummyActivityData,
} from '@/lib/actions/dummyactivity';
import { getDocumentsByDateRange } from '@/lib/actions/get-monthly-reports';
import { getAllActivities } from '@/lib/actions/get-all-activities';
import { ActivityType, ExtendedActivityType } from '@/models/Activity';

// const dummyActivities: Activity[] = [
//   {
//     image: 'https://placekitten.com/300/400', // Placeholder image URL
//     title: 'Kitten Yoga',
//     numPeopleJoined: 20,
//     numHours: 3,
//     date: '02 March 2024',
//     tags: ['Charity', 'Food', 'Elderly', 'Charity', 'Food', 'Elderly'],
//     description: 'Helping animals in need is your passion? Come join us for ',
//   },
//   {
//     image: 'https://placekitten.com/302/402', // Placeholder image URL
//     title: 'Purr Painting',
//     numPeopleJoined: 25,
//     numHours: 8,
//     date: '02 March 2024',
//     tags: ['Charity', 'Food', 'Elderly'],
//     description:
//       'When you enter into any new area of science, you almost always find a new discovery hidden within every element that you see',
//   },
//   {
//     image: 'https://placekitten.com/300/400', // Placeholder image URL
//     title: 'Kitten Yoga',
//     numPeopleJoined: 20,
//     numHours: 5,
//     date: '02 March 2024',
//     tags: ['Charity'],
//     description:
//       'When you enter into any new area of science, you almost always find a new discovery hidden within every element that you see',
//   },
//   {
//     image: 'https://placekitten.com/301/401', // Placeholder image URL
//     title: 'Meow Meditation',
//     numPeopleJoined: 15,
//     numHours: 7,
//     date: '02 March 2024',
//     tags: ['Charity', 'Food', 'Elderly'],
//     description:
//       'When you enter into any new area of science, you almost always find a new discovery hidden within every element that you see',
//   },
//   {
//     image: 'https://placekitten.com/302/402', // Placeholder image URL
//     title: 'Purr Painting',
//     numPeopleJoined: 25,
//     numHours: 1,
//     date: '02 March 2024',
//     tags: ['Charity', 'Food', 'Elderly'],
//     description:
//       'When you enter into any new area of science, you almost always find a new discovery hidden within every element that you see',
//   },
// ];

const activities = [
  { value: 'elderly', label: 'Elderly' },
  { value: 'children', label: 'Children' },
  { value: 'beach', label: 'Beach Clean Up' },
  { value: 'food clean up', label: 'Food Donation' },
  { value: 'food packing', label: 'Food Packing' },
];

export default function Home() {
  const [activities, setActivities] = React.useState<ExtendedActivityType[]>(
    [],
  );
  React.useEffect(() => {
    const fetchActivities = async () => {
      const activities = await getAllActivities();
      const activitiesJson = JSON.parse(activities);
      setActivities(activitiesJson);
      console.log(activitiesJson);
    };
    fetchActivities();
  }, []);

  return (
    <div className="min-h-screen">
      {/* <Button
        onClick={() => {
          generateAndSaveDummyActivityData();
          addDummyDataToAttendeeList();
        }}
      >
        activity
      </Button> */}
      <div className="rounded-b-3xl bg-[#FC7869] text-white relative items-center lg:justify-center p-0 m-0">
        <div className="flex justify-between px-6 pb-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-white">
              Explore
            </h1>
            <p className="text-xs sm:text-base text-white">
              Activities for you
            </p>
          </div>
        </div>
        {/* <div>
          <TextInput
            className="bg-[#FC7869] mx-2 w-auto border-none text-white shadow-none"
            icon={SearchIcon}
            placeholder="Search..."
          />
        </div> */}
      </div>
      <div className="p-4">
        <div className="pb-1 pt-4">
          <p className="text-lg font-bold text-black">Featured</p>
        </div>
        {/* <div className="flex">
          <FeaturedScroll activities={activities} />
        </div>
        <div className="pb-1 pt-4">
          <p className="text-lg font-bold text-black">For You</p>
        </div>

        <ForYouScroll activities={activities} />

        <div className="pb-1 pt-4">
          <p className="text-lg font-bold text-black">Upcoming</p>
        </div>
        <div className="flex">
          <ForYouScroll activities={activities} />
        </div> */}
      </div>
    </div>
  );
}
