import * as React from 'react';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Link from 'next/link';

export interface Activity {
  image: string;
  title: string;
  numPeopleJoined: number;
  numHours: number;
  date: string;
  tags: string[];
  description: string;
}

interface ScrollAreaHorizontalDemoProps {
  activities: Activity[];
}

const avatarUrls = [
  'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
];

export const ForYouScroll: React.FC<ScrollAreaHorizontalDemoProps> = ({
  activities,
}) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border-none">
      <div className="flex w-max space-x-4 md:space-x-6 lg:space-x-16 ">
        {activities.map((activity, index) => (
          <Link
            key={index}
            href={`/activities/${encodeURIComponent(activity.title)}`}
            passHref
          >
            <button key={index} className="border rounded-2xl shadow-md p-1">
              <figure key={index} className="">
                <div className=" overflow-hidden lg:rounded-md">
                  <Image
                    src={activity.image}
                    alt={`Image for ${activity.title}`}
                    className=" w-56 h-36 p-2 object-cover rounded-2xl lg:w-[17.5rem] lg:h-44"
                    width={300}
                    height={200}
                  />
                </div>
                <figcaption className="">
                  <div className="flex ml-1 mt-1">
                    {Array.isArray(activity.tags) &&
                      activity.tags.slice(0, 3).map((tag, index) => (
                        <div
                          key={index}
                          className={`text-[0.6rem] text-black ${
                            index % 3 === 0
                              ? 'bg-blue-100'
                              : index % 3 === 1
                              ? 'bg-red-100'
                              : 'bg-green-100'
                          } rounded-md p-1 pl-2 pr-2 ml-1 mr-1`}
                        >
                          {tag}
                        </div>
                      ))}
                    {activity.tags.length > 3 && (
                      <div className="text-[0.6rem] pl-1 pt-2 text-black">
                        ...
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-2 pl-3 pr-3">
                    <div className="text-left">
                      <p className="text-xs">{activity.date}</p>
                      <h1 className="font-semibold text-foreground text-lg">
                        {activity.title}
                      </h1>
                    </div>

                    <div className="bg-black text-[0.7rem] text-white font-medium p-[0.2rem] pl-3 pr-3 rounded-md">
                      <p>{activity.numHours}h</p>
                    </div>
                  </div>

                  <div className="text-left">
                    <span className=" text-gray-600 text-sm font-light pl-3">
                      {activity.description.length > 30
                        ? `${activity.description.slice(0, 30)}...`
                        : activity.description}
                    </span>
                  </div>

                  <div className="flex justify-between mt-1 mb-1 lg:mb-0">
                    <div
                      className="avatar-group -space-x-3 rtl:space-x-reverse pl-2 lg:pb-4"
                      data-theme="light"
                    >
                      {avatarUrls.map((avatar, index) => (
                        <div key={index} className="avatar">
                          <div className="w-6 border-none lg:w-8">
                            <img src={avatar} alt={`Avatar ${index + 1}`} />
                          </div>
                        </div>
                      ))}
                      <div className="avatar placeholder" data-theme="light">
                        <div className="w-6 bg-blue-100 text-black lg:w-8">
                          <span className="text-[0.6rem] lg:text-xs">
                            +{activity.numPeopleJoined}
                          </span>
                        </div>
                      </div>
                    </div>

                    <br />
                  </div>
                </figcaption>
              </figure>
            </button>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
