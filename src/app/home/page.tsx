import React from 'react';

import {
  Activity,
  ScrollAreaHorizontalDemo,
} from '@/components/ui/scroll-horizontal';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const dummyActivities: Activity[] = [
  {
    image: 'https://placekitten.com/300/400', // Placeholder image URL
    title: 'Kitten Yoga',
    numPeopleJoined: 20,
    numHours: 3,
    date: '02 March 2024',
  },
  {
    image: 'https://placekitten.com/301/401', // Placeholder image URL
    title: 'Meow Meditation',
    numPeopleJoined: 15,
    numHours: 2,
    date: '02 March 2024',
  },
  {
    image: 'https://placekitten.com/302/402', // Placeholder image URL
    title: 'Purr Painting',
    numPeopleJoined: 25,
    numHours: 8,
    date: '02 March 2024',
  },
  {
    image: 'https://placekitten.com/300/400', // Placeholder image URL
    title: 'Kitten Yoga',
    numPeopleJoined: 20,
    numHours: 5,
    date: '02 March 2024',
  },
  {
    image: 'https://placekitten.com/301/401', // Placeholder image URL
    title: 'Meow Meditation',
    numPeopleJoined: 15,
    numHours: 7,
    date: '02 March 2024',
  },
  {
    image: 'https://placekitten.com/302/402', // Placeholder image URL
    title: 'Purr Painting',
    numPeopleJoined: 25,
    numHours: 1,
    date: '02 March 2024',
  },
];

const activities = [
  { value: 'elderly', label: 'Elderly' },
  { value: 'children', label: 'Children' },
  { value: 'beach', label: 'Beach Clean Up' },
  { value: 'food clean up', label: 'Food Donation' },
  { value: 'food packing', label: 'Food Packing' },
];

export default function Home() {
  return (
    <div className="min-h-screen p-6">
      <div className="flex justify-center">
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Activity" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Activities</SelectLabel>
              {activities.map((activity) => (
                <SelectItem key={activity.value} value={activity.value}>
                  {activity.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className=" pb-1 pt-4">
        <p className="text-xs text-gray-500 lg:text-sm">Reccomended for you</p>
      </div>
      <div className="flex">
        <ScrollAreaHorizontalDemo activities={dummyActivities} />
      </div>
      <div className="pb-1 pt-4">
        <p className="text-xs text-gray-500 lg:text-sm">Upcoming for you</p>
      </div>
      <div className="flex">
        <ScrollAreaHorizontalDemo activities={dummyActivities} />
      </div>
    </div>
  );
}
