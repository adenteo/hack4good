import * as React from 'react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import {
  Pencil,
  PhoneCall,
  MailMinus,
  CalendarHeart,
  Timer,
} from 'lucide-react';
import { ProfileForm } from '@/components/profile-form';

const activities = [
  {
    id: 1,
    title: 'Community Cleanup',
    imageUrl: 'https://placekitten.com/300/200',
    date: '2024-02-15',
    hours: 3,
  },
  {
    id: 2,
    title: 'Animal Shelter Support',
    imageUrl: 'https://placekitten.com/300/201',
    date: '2024-02-20',
    hours: 5,
  },
  {
    id: 3,
    title: 'Food Drive',
    imageUrl: 'https://placekitten.com/300/202',
    date: '2024-03-05',
    hours: 4,
  },
  {
    id: 4,
    title: 'Teaching and Tutoring',
    imageUrl: 'https://placekitten.com/300/203',
    date: '2024-03-10',
    hours: 6,
  },
  {
    id: 5,
    title: 'Elderly Care',
    imageUrl: 'https://placekitten.com/300/204',
    date: '2024-03-18',
    hours: 3,
  },
  {
    id: 6,
    title: 'Environmental Conservation',
    imageUrl: 'https://placekitten.com/300/205',
    date: '2024-04-02',
    hours: 5,
  },
];

const certificates = [
  'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=&q=80',
  'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=&q=80',
  'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=&q=80',
  'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1465869185982-5a1a7522cbcb?auto=format&fit=crop&w=&q=80',
  'https://images.unsplash.com/photo-1548516173-3cabfa4607e9?auto=format&fit=crop&w=300&q=80',
  'https://images.unsplash.com/photo-1494337480532-3725c85fd2ab?auto=format&fit=crop&w=300&q=80',
];

export default function VolunteerProfile() {
  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="flex justify-between pl-6 pr-6 rounded-b-3xl bg-black text-white relative z-10 h-52 items-center lg:justify-center">
          <div className="avatar">
            {/* <div className=" w-24 h-24 rounded-full">
              <Image
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="user"
                fill
              />
            </div> */}
          </div>
          <div className=" pl-8">
            <h1 className="text-lg font-semibold">Amy Tan</h1>
            <p className="text-sm flex mt-[0.2rem]">
              <span className="mt-[0.2rem] mr-1">
                <PhoneCall size={16} />
              </span>
              <span className="text-sm">9126 3728</span>
            </p>
            <p className="text-sm flex mt-[0.2rem]">
              <span className="mt-[0.2rem] mr-1">
                <MailMinus size={16} />
              </span>
              <span className="text-sm">amytan@gmail.com</span>
            </p>
          </div>
          <div className="absolute top-8 right-5 lg:right-20">
            <button className="rounded-full">
              <Pencil size={18} />
            </button>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-between rounded-xl shadow-lg mt-[-1.5rem] bg-white relative z-20 p-4 w-4/5 lg:w-1/2 lg:justify-center">
            <div className="flex items-center lg:mr-14">
              <CalendarHeart size={20} />
              <div className="ml-1">
                <h1 className="text-[1.2rem] font-medium leading-none">42</h1>
                <p className="text-[0.6rem] text-gray-400">Events Attended</p>
              </div>
            </div>
            <div className="flex items-center lg:ml-14">
              <Timer size={20} />
              <div className="ml-1">
                <h1 className="text-[1.2rem] font-medium leading-none">
                  256hrs
                </h1>
                <p className="text-[0.6rem] text-gray-400">Volunteered</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <TabGroup defaultIndex={1}>
        <TabList
          className="mt-8 flex justify-center items-center"
          color="black"
        >
          <Tab>Past Events</Tab>
          <Tab>Certificates</Tab>
          <Tab>About Me</Tab>
        </TabList>
        {/* <div className="h-[60vh] lg:h-96 overflow-y-auto"> */}
        <div className="overflow-y-auto p-6">
          <TabPanels>
            <TabPanel>
              <div className="">
                {/* <ScrollArea> */}
                <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {activities.map((activity, index) => (
                    <figure
                      key={index}
                      className="shrink-0 w-full lg:w-64 hover:drop-shadow-md cursor-pointer"
                    >
                      <div className="relative overflow-hidden rounded-tl-md rounded-tr-md">
                        <Image
                          priority
                          src={activity.imageUrl}
                          alt={activity.title}
                          className="aspect-square h-32 w-full md:h-56 lg:h-64 object-cover"
                          width={1000}
                          height={1000}
                        ></Image>
                      </div>
                      <figcaption className="flex flex-col justify-between p-2 text-xs text-muted-foreground bg-gray-100 h-auto whitespace-normal rounded-b-md">
                        <div className=" items-center ">
                          <span className="text-gray-600 font-medium text-sm lg:text-lg line-clamp-1">
                            {activity.title}
                          </span>
                        </div>

                        <div className="flex justify-between">
                          <p className="mt-1 text-gray-700 line-clamp-3 lg:mb-1 lg:text-sm">
                            {activity.date}
                          </p>
                          <p className="mt-1 text-black font-semibold line-clamp-3 text-[0.85rem]">
                            {activity.hours}hrs
                          </p>
                        </div>
                      </figcaption>
                    </figure>
                  ))}
                </div>
                {/* </ScrollArea> */}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="">
                {/* <ScrollArea> */}
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {certificates.map((certificates, index) => (
                    <figure
                      key={index}
                      className="shrink-0 w-full lg:w-64 hover:drop-shadow-md cursor-pointer"
                    >
                      <div className="flex justify-center">
                        <Image
                          priority
                          src={certificates}
                          alt={certificates}
                          className="h-44 w-full rounded overflow-hidden"
                          width={1000}
                          height={1000}
                        ></Image>
                      </div>
                    </figure>
                  ))}
                </div>
                {/* </ScrollArea> */}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col justify-center items-center ">
                <ProfileForm />
              </div>
            </TabPanel>
          </TabPanels>
        </div>
      </TabGroup>
    </div>
  );
}
