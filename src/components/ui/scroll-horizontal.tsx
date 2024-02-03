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
}

interface ScrollAreaHorizontalDemoProps {
  activities: Activity[];
}

const avatarUrls = [
  'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
];

export const ScrollAreaHorizontalDemo: React.FC<
  ScrollAreaHorizontalDemoProps
> = ({ activities }) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap rounded-md border lg:border-none">
      <div className="flex w-max space-x-4 lg:space-x-16 p-4">
        {activities.map((activity, index) => (
          <Link
            key={index}
            href={`/activities/${encodeURIComponent(activity.title)}`}
            passHref
          >
            <button key={index} className="lg:rounded-xl lg:shadow-lg">
              <figure key={index} className="shrink-0">
                <div className="overflow-hidden lg:rounded-md">
                  <Image
                    src={activity.image}
                    alt={`Image for ${activity.title}`}
                    className="w-full h-[20vh] object-cover rounded-t-md lg:h-72"
                    width={300}
                    height={200}
                  />
                </div>
                <figcaption className="pt-2 text-xs text-muted-foreground lg:text-lg">
                  <span className="font-semibold text-foreground lg:font-medium">
                    {activity.title}
                  </span>
                  <br />
                  <div className="flex justify-between mt-1">
                    <div
                      className="avatar-group -space-x-3 rtl:space-x-reverse lg:pl-4 lg:pb-4"
                      data-theme="light"
                    >
                      {avatarUrls.map((avatar, index) => (
                        <div key={index} className="avatar">
                          <div className="w-5 border-none lg:w-8">
                            <Image
                              src={avatar}
                              alt={`Avatar ${index + 1}`}
                              fill
                            />
                          </div>
                        </div>
                      ))}
                      <div className="avatar placeholder" data-theme="light">
                        <div className="w-5 bg-blue-100 text-black lg:w-8">
                          <span className="text-[0.5rem] lg:text-xs">
                            +{activity.numPeopleJoined}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-[0.35rem] lg:mt-2">
                      <span className="text-[0.85rem] text-slate-500 font-medium ml-2 lg:ml-none lg:text-base">
                        {activity.numHours}h{' '}
                      </span>
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
