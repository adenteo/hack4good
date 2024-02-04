import * as React from 'react';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Link from 'next/link';

export interface Activity {
  image: string;
  title: string;
  numPeopleJoined: number;
  numHours: number;
  description: string;
  date: string;
  tags: string[];
}

interface ScrollAreaHorizontalDemoProps {
  activities: Activity[];
}

const avatarUrls = [
  'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
];

export const FeaturedScroll: React.FC<ScrollAreaHorizontalDemoProps> = ({
  activities,
}) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border-none">
      <div className="flex w-max space-x-4 md:space-x-6 lg:space-x-16">
        {activities.map((activity, index) => (
          <Link
            key={index}
            href={`/activities/${encodeURIComponent(activity.title)}`}
            passHref
          >
            <button key={index} className="rounded-xl relative shadow-md">
              <figure key={index} className="shrink-0">
                <div className="overflow-hidden lg:rounded-md">
                  <div className="relative shadow-lg">
                    <Image
                      src={activity.image}
                      alt={`Image for ${activity.title}`}
                      className="w-full h-72 md:h-80 lg:h-96 rounded-md filter brightness-75"
                      width={300}
                      height={600}
                    />
                    <div className="absolute top-[9.7rem] left-4 right-0 bottom-0 md:top-48 lg:top-60 ">
                      <div className="flex mb-1">
                        {Array.isArray(activity.tags) &&
                          activity.tags.map((tag, index) => (
                            <div
                              key={index}
                              className="text-[0.6rem] text-white border border-white rounded-md p-1 pl-2 pr-2 mr-2"
                            >
                              {tag}
                            </div>
                          ))}
                      </div>

                      <div>
                        <p className=" text-white text-lg font-medium pr-24 md:pr-40 lg:pr-44">
                          {activity.title}
                        </p>
                      </div>

                      <div className=" w-2">
                        <span className=" text-white text-xs font-light pl-[0.15rem] md:pl-0 lg:pl-0">
                          {activity.description.length > 30
                            ? `${activity.description.slice(0, 30)}...`
                            : activity.description}
                        </span>
                      </div>

                      <div className="mt-2">
                        <div
                          className="avatar-group bg-transparent -space-x-3  "
                          data-theme="light"
                        >
                          {avatarUrls.map((avatar, index) => (
                            <div key={index} className="avatar">
                              <div className="w-5 border-none lg:w-8">
                                <img src={avatar} alt={`Avatar ${index + 1}`} />
                              </div>
                            </div>
                          ))}
                          <div
                            className="avatar placeholder"
                            data-theme="light"
                          >
                            <div className="w-5 text-black lg:w-8">
                              <span className="text-[0.65rem] lg:text-xs">
                                +{activity.numPeopleJoined}
                              </span>
                            </div>
                          </div>
                        </div>

                        <br />
                      </div>
                    </div>
                  </div>
                </div>
              </figure>
            </button>
          </Link>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
