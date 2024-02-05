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
import { Activity, FeaturedScroll } from '@/components/ui/featured-scroll';
// import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addRoles } from '@/lib/actions/add-roles';
import { generateAndSaveDummyData } from '@/lib/actions/dummydata';
import { addDummyDataToAttendeeList, generateAndSaveDummyActivityData } from '@/lib/actions/dummyactivity';
import { getDocumentsByDateRange } from '@/lib/actions/get-monthly-reports';

const dummyActivities: Activity[] = [
  {
    image: 'https://placekitten.com/300/400', // Placeholder image URL
    title: 'Kitten Yoga',
    numPeopleJoined: 20,
    numHours: 3,
    date: '02 March 2024',
    tags: ['Charity', 'Food', 'Elderly', 'Charity', 'Food', 'Elderly'],
    description: 'Helping animals in need is your passion? Come join us for ',
  },
  {
    image: 'https://placekitten.com/302/402', // Placeholder image URL
    title: 'Purr Painting',
    numPeopleJoined: 25,
    numHours: 8,
    date: '02 March 2024',
    tags: ['Charity', 'Food', 'Elderly'],
    description:
      'When you enter into any new area of science, you almost always find a new discovery hidden within every element that you see',
  },
  {
    image: 'https://placekitten.com/300/400', // Placeholder image URL
    title: 'Kitten Yoga',
    numPeopleJoined: 20,
    numHours: 5,
    date: '02 March 2024',
    tags: ['Charity'],
    description:
      'When you enter into any new area of science, you almost always find a new discovery hidden within every element that you see',
  },
  {
    image: 'https://placekitten.com/301/401', // Placeholder image URL
    title: 'Meow Meditation',
    numPeopleJoined: 15,
    numHours: 7,
    date: '02 March 2024',
    tags: ['Charity', 'Food', 'Elderly'],
    description:
      'When you enter into any new area of science, you almost always find a new discovery hidden within every element that you see',
  },
  {
    image: 'https://placekitten.com/302/402', // Placeholder image URL
    title: 'Purr Painting',
    numPeopleJoined: 25,
    numHours: 1,
    date: '02 March 2024',
    tags: ['Charity', 'Food', 'Elderly'],
    description:
      'When you enter into any new area of science, you almost always find a new discovery hidden within every element that you see',
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
      <Button onClick={() => {
        generateAndSaveDummyData();
      }}>user</Button>
      <Button onClick={() => {
        generateAndSaveDummyActivityData();
        addDummyDataToAttendeeList();
      }}>activity</Button>
      <Button onClick={() => {
        getDocumentsByDateRange(new Date(2023, 6, 1), new Date(2023, 10, 31));
      }}>get monthly</Button>
      <div className="rounded-b-3xl border bg-black text-white relative h-32 items-center lg:justify-center">
        <div className="flex justify-between p-6 pb-2 ">
          <div>
            <h1 className="text-lg font-semibold">Explore</h1>
            <p className="text-xs">Activities for you</p>
          </div>
          <div className="avatar">
            <div className=" w-10 h-10 rounded-full">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>
        </div>

        <div>
          <TextInput
            className="bg-black border-none hover:bg-black hover:border-none ml-2 mr-2 w-auto"
            icon={SearchIcon}
            placeholder="Search..."
          />
        </div>
      </div>
      <div className=" pb-1 pt-4">
        <p className="text-lg font-semibold text-black">Featured</p>
      </div>
      <div className="flex">
        <FeaturedScroll activities={dummyActivities} />
      </div>
      <div className="pb-1 pt-4">
        <p className="text-lg font-semibold text-black">For You</p>
      </div>
      <div className="flex">
        <ForYouScroll activities={dummyActivities} />
      </div>

      <div className="pb-1 pt-4">
        <p className="text-lg font-semibold text-black">Upcoming</p>
      </div>
      <div className="flex">
        <ForYouScroll activities={dummyActivities} />
      </div>
    </div>
  );
}
