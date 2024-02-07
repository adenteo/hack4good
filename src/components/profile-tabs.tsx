'use client';
import { ScrollArea } from '@/components/ui/scroll-area';
import { TagColors } from '@/types/colors';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@tremor/react';
import { faker } from '@faker-js/faker';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { CalendarFold, FolderHeart, MessageCircleHeart } from 'lucide-react';
import { ExtendedVolunteerType } from '@/models/Volunteer';
import { ProfileForm } from './profile-form';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

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
    feedbacked: true,
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
    feedbacked: false,
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
    feedbacked: false,
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
    feedbacked: false,
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
    feedbacked: false,
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
    feedbacked: false,
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

export default function ProfileTabs({
  volunteer,
}: {
  volunteer: ExtendedVolunteerType;
}) {
  const router = useRouter();
  return (
    <div>
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
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {activities.map((activity, index) => {
                    const date = parseISO(activity.startTime.toISOString());
                    const formattedDate = format(date, 'MMMM d yyyy');
                    const isFeedbacked = activity.feedbacked;
                    return (
                      <div className="p-2" key={index}>
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
                                {isFeedbacked ? (
                                  <div>
                                    <Button
                                      variant="outline"
                                      className="h-7 px-2 lg:px-3 text-xs"
                                      disabled // Disable the button if feedback is received
                                    >
                                      Recieved Feedback
                                      <FolderHeart className="ml-2 h-4 w-4" />
                                    </Button>
                                  </div>
                                ) : (
                                  //   <Link href="/feedback-form">
                                  <div>
                                    <Button
                                      variant="outline"
                                      className="h-7 px-2 lg:px-3 text-xs"
                                      onClick={() => {
                                        router.push('/feedback-form');
                                        const activityIndex =
                                          activities.findIndex(
                                            (a) => a._id === activity._id
                                          );

                                        // Update the feedbacked property to true for the clicked activity
                                        if (activityIndex !== -1) {
                                          activities[activityIndex].feedbacked =
                                            true;
                                          // Optionally, you can perform other actions related to feedback here
                                          console.log(
                                            `Feedback submitted for activity with ID ${activity._id}`
                                          );
                                        }
                                      }}
                                    >
                                      Add Feedback
                                      <MessageCircleHeart className="ml-1 h-4 w-4" />
                                    </Button>
                                  </div>
                                )}
                              </div>
                            </figcaption>
                          </figure>
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </TabPanel>
            <TabPanel>
              <div className="">
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
              </div>
            </TabPanel>
            <TabPanel>
              <div className="flex flex-col justify-center items-center ">
                <ProfileForm volunteer={volunteer} />
              </div>
            </TabPanel>
          </TabPanels>
        </div>
      </TabGroup>
    </div>
  );
}
