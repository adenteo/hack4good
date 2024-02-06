'use server';
import * as React from 'react';
import Image from 'next/image';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TagColors } from '@/types/colors';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { faker } from '@faker-js/faker';
import {
  Pencil,
  PhoneCall,
  MailMinus,
  CalendarHeart,
  Timer,
  CalendarFold,
  MessageCircleHeart,
} from 'lucide-react';
import { ProfileForm } from '@/components/profile-form';
import { getAuthSession } from '@/lib/auth';
import { getVolunteerByUserId } from '@/lib/actions/get-volunteer-by-id';
import { ExtendedVolunteerType } from '@/models/Volunteer';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ExtendedActivityType } from '@/models/Activity';
import { useEffect, useState } from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';

interface VolunteerPastEventProps {
  activities: ExtendedActivityType[];
}

const activities = [
  {
    _id: 1,
    title: 'Community Cleanup',
    imageUrl: 'https://placekitten.com/300/200',
    date: '2024-02-15',
    hours: 3,
    description:
      'This activity is about helping out the community and the poeple all around us',
    startTime: new Date(),
    tags: ['charity', 'love', 'care'],
  },
  {
    _id: 2,
    title: 'Animal Shelter Support',
    imageUrl: 'https://placekitten.com/300/201',
    date: '2024-02-20',
    hours: 5,
    description:
      'This activity is about helping out the community and the poeple all around us',
    startTime: new Date(),
    tags: ['charity', 'love', 'care'],
  },
  {
    _id: 3,
    title: 'Food Drive',
    imageUrl: 'https://placekitten.com/300/202',
    date: '2024-03-05',
    hours: 4,
    description:
      'This activity is about helping out the community and the poeple all around us',
    startTime: new Date(),
    tags: ['charity', 'love', 'care'],
  },
  {
    _id: 4,
    title: 'Teaching and Tutoring',
    imageUrl: 'https://placekitten.com/300/203',
    date: '2024-03-10',
    hours: 6,
    description:
      'This activity is about helping out the community and the poeple all around us',
    startTime: new Date(),
    tags: ['charity', 'love', 'care'],
  },
  {
    _id: 5,
    title: 'Elderly Care',
    imageUrl: 'https://placekitten.com/300/204',
    date: '2024-03-18',
    hours: 3,
    description:
      'This activity is about helping out the community and the poeple all around us',
    startTime: new Date(),
    tags: ['charity', 'love', 'care'],
  },
  {
    _id: 6,
    title: 'Environmental Conservation',
    imageUrl: 'https://placekitten.com/300/205',
    date: '2024-04-02',
    hours: 5,
    description:
      'This activity is about helping out the community and the poeple all around us',
    startTime: new Date(),
    tags: ['charity', 'love', 'care'],
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

export default async function VolunteerProfile() {
  // export const VolunteerProfile: React.FC<VolunteerPastEventProps> = ({
  //   activities,
  // }) => {
  // export default async function VolunteerProfile({ activities }) {

  const user = await getAuthSession();
  if (!user) {
    return <div>Error getting profile.</div>;
  }
  const volunteerString = await getVolunteerByUserId(user.user.id);
  const volunteer: ExtendedVolunteerType = JSON.parse(volunteerString);

  // const [volunteer, setVolunteer] = useState<ExtendedVolunteerType | null>(
  //   null
  // );

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const user = await getAuthSession();
  //       if (!user) {
  //         throw new Error('Error getting profile.');
  //       }

  //       const volunteerString = await getVolunteerByUserId(user.user.id);
  //       const parsedVolunteer: ExtendedVolunteerType =
  //         JSON.parse(volunteerString);
  //       if (!parsedVolunteer) {
  //         throw new Error('Error getting profile.');
  //       }

  //       setVolunteer(parsedVolunteer);
  //     } catch (error) {
  //       console.error(error);
  //       // Handle the error (e.g., show an error message)
  //     }
  //   };

  //   fetchData(); // Call the asynchronous function
  // }, [activities]);

  if (!volunteer) {
    return <div>Error getting profile.</div>;
  }
  console.log(volunteer);
  return (
    <div className="min-h-screen">
      <div className="relative">
        <div className="flex justify-evenly pl-6 pr-6 rounded-b-3xl bg-[#FC7869] text-white relative z-10 h-52 items-center lg:justify-center">
          <div className="avatar">
            <div className="w-24 h-24">
              <Image
                className="rounded-full"
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="user"
                fill
              />
            </div>
          </div>
          <div className=" pl-8">
            <h1 className="text-lg font-semibold">{volunteer.fullName}</h1>
            <p className="text-sm flex mt-[0.2rem]">
              <span className="mt-[0.2rem] mr-1">
                <PhoneCall size={16} />
              </span>
              <span className="text-sm">{volunteer.contactNumber}</span>
            </p>
            <p className="text-sm flex mt-[0.2rem]">
              <span className="mt-[0.2rem] mr-1">
                <MailMinus size={16} />
              </span>
              <span className="text-sm">{volunteer.email}</span>
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
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {activities.map((activity, index) => {
                    const date = parseISO(activity.startTime.toISOString());
                    const formattedDate = format(date, 'MMMM d yyyy');
                    return (
                      <Link
                        className="p-2"
                        key={index}
                        href={`/activities/${encodeURIComponent(activity._id)}`}
                        passHref
                      >
                        <button
                          key={index}
                          className="border rounded-2xl shadow-md"
                        >
                          <figure key={index} className="w-[280px]">
                            <div className="overflow-hidden rounded-t-md mb-2">
                              <AspectRatio ratio={16 / 9} className="bg-muted">
                                <Image
                                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                                  alt={`Image for ${activity.title}`}
                                  fill
                                  className="rounded-t-md object-cover"
                                />
                              </AspectRatio>
                            </div>
                            <figcaption className="px-2">
                              <div className="flex justify-between items-center mt-4">
                                <div className="text-left">
                                  <div className="flex justify-start items-center">
                                    <CalendarFold size={15} />
                                    <p className="text-xs font-semibold ml-1">
                                      {formattedDate}
                                    </p>
                                  </div>
                                  <p className="font-semibold text-foreground text-lg mt-1">
                                    {activity.title}
                                  </p>
                                </div>
                              </div>
                              <p className="text-gray-600 text-xs font-light overflow-hidden text-ellipsis text-start">
                                {activity.description}
                              </p>

                              <div className="flex space-x-2 mt-2 mb-4">
                                <Link href="/feedback-form">
                                  <Button
                                    variant="outline"
                                    className="h-7 px-2 lg:px-3 text-xs"
                                  >
                                    Add Feedback
                                    <MessageCircleHeart className="ml-1 h-4 w-4" />
                                  </Button>
                                </Link>
                              </div>
                            </figcaption>
                          </figure>
                        </button>
                      </Link>
                    );
                  })}
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
                {/* need to get volunteer with user id. */}
                <ProfileForm volunteer={volunteer} />
              </div>
            </TabPanel>
          </TabPanels>
        </div>
      </TabGroup>
    </div>
  );
}
