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
import { TabExample } from './test';
import cleanupImage from '../assets/cleanup.jpg';
import foodDrive from '../assets/fooddrive.jpg';
import elderly from '../assets/elderly.jpg';
import environment from '../assets/environment.jpg';
import tutor from '../assets/tutor.jpg';
import animal from '../assets/animal.jpg';
import cert1 from '../assets/cert1.jpg';
import cert2 from '../assets/cert2.jpg';

const activities = [
  {
    _id: 1,
    title: 'Community Cleanup',
    imageUrl: cleanupImage,
    date: '2024-02-15',
    hours: 3,
    description:
      'We are fervent about helping out the community and the people all around us',
    startTime: new Date('2024-02-01T11:30:00'),
    tags: ['charity', 'love', 'care'],
    feedbacked: true,
  },
  {
    _id: 2,
    title: 'Animal Shelter Support',
    imageUrl: animal,
    date: '2024-02-20',
    hours: 5,
    description:
      'Animals are our life long companions who deserve to be treated with respect',
    startTime: new Date('2024-01-20T11:30:00'),
    tags: ['charity', 'love', 'care'],
    feedbacked: false,
  },
  {
    _id: 3,
    title: 'Food Drive',
    imageUrl: foodDrive,
    date: '2024-03-05',
    hours: 4,
    description:
      'Ensuring that everyone has the right nutrients regardless of our backgrounds',
    startTime: new Date('2024-01-12T11:30:00'),
    tags: ['charity', 'love', 'care'],
    feedbacked: false,
  },
  {
    _id: 4,
    title: 'Teaching and Tutoring',
    imageUrl: tutor,
    date: '2024-03-10',
    hours: 6,
    description:
      'Nurture the future generation and work with young, brilliant minds',
    startTime: new Date('2024-01-10T11:30:00'),
    tags: ['charity', 'love', 'care'],
    feedbacked: false,
  },
  {
    _id: 5,
    title: 'Elderly Care',
    imageUrl: elderly,
    date: '2024-03-18',
    hours: 3,
    description:
      'Placing importance on our pioneer generation who shaped us today',
    startTime: new Date('2024-01-09T11:30:00'),
    tags: ['charity', 'love', 'care'],
    feedbacked: false,
  },
  {
    _id: 6,
    title: 'Green Living',
    imageUrl: environment,
    date: '2024-04-02',
    hours: 5,
    description:
      'This activity is about helping out our environment before it gets too late',
    startTime: new Date('2024-01-07T11:30:00'),
    tags: ['charity', 'love', 'care'],
    feedbacked: false,
  },
];
const certificates = [cert1, cert2, cert1, cert2];

export default function ProfileTabs({
  volunteer,
}: {
  volunteer: ExtendedVolunteerType;
}) {
  const router = useRouter();
  return (
    <div>
      <TabGroup>
        <TabList className="mt-8 flex justify-center items-center">
          <Tab>Past Events</Tab>
          <Tab>Certificates</Tab>
          <Tab>About Me</Tab>
        </TabList>
        <div className="overflow-y-auto p-6">
          <TabPanels>
            <TabPanel>
              <div className="w-full flex flex-col justify-center items-center md:flex-row md:grid md:grid-cols-3 lg:grid-cols-4 gap-5">
                {activities.map((activity, index) => {
                  const date = parseISO(activity.startTime.toISOString());
                  const formattedDate = format(date, 'MMMM d yyyy');
                  const isFeedbacked = activity.feedbacked;
                  return (
                    <div className="p-2" key={index}>
                      <figure
                        key={index}
                        className="w-[85vw] md:w-[280px] border rounded-2xl shadow-md"
                      >
                        <div className="overflow-hidden rounded-t-md mb-2">
                          <AspectRatio ratio={16 / 9} className="bg-muted">
                            <Image
                              src={activity.imageUrl}
                              alt={`Image for ${activity.title}`}
                              fill
                              className="rounded-t-md object-cover"
                            />
                          </AspectRatio>
                        </div>
                        <figcaption className="px-4">
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
                                    const activityIndex = activities.findIndex(
                                      (a) => a._id === activity._id,
                                    );

                                    if (activityIndex !== -1) {
                                      activities[activityIndex].feedbacked =
                                        true;
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
                    </div>
                  );
                })}
              </div>
            </TabPanel>
            <TabPanel>
              <h1 className="text-center text-xs text-gray-500 mb-5">
                Click on your certificate to download!
              </h1>
              <div className="flex flex-col items-center justify-center  md:flex-row md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-7">
                {certificates.map((certificates, index) => (
                  <figure
                    key={index}
                    className="shrink-0 w-full hover:drop-shadow-md cursor-pointer"
                  >
                    <div className="flex justify-center mb-4 md:mb-0">
                      <a
                        href={certificates.src || ''}
                        download={`certificate-${index + 1}.jpeg`}
                        className="flex justify-center border"
                      >
                        <div className="border border-gray-300 shadow-lg w-fit">
                          <Image
                            priority
                            src={certificates}
                            alt={'certificate'}
                            className="h-60 w-auto md:h-auto"
                          ></Image>
                        </div>
                      </a>
                    </div>
                  </figure>
                ))}
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
