import * as React from 'react';
import Image from 'next/image';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

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
    <ScrollArea className="w-full whitespace-nowrap rounded-md border">
      <div className="flex w-max space-x-4 p-4">
        {activities.map((activity, index) => (
          <button key={index} className=" hover:background-green-100">
            <figure key={index} className="shrink-0">
              <div className="overflow-hidden rounded-md">
                <Image
                  src={activity.image}
                  alt={`Image for ${activity.title}`}
                  className="w-full h-[20vh] object-cover"
                  width={300}
                  height={200}
                />
              </div>
              <figcaption className="pt-2 text-xs text-muted-foreground">
                <span className="font-semibold text-foreground">
                  {activity.title}
                </span>
                <br />
                <div className="flex justify-between mt-1">
                  <div
                    className="avatar-group -space-x-3 rtl:space-x-reverse"
                    data-theme="light"
                  >
                    {avatarUrls.map((avatar, index) => (
                      <div key={index} className="avatar">
                        <div className="w-5 border-none">
                          <img src={avatar} alt={`Avatar ${index + 1}`} />
                        </div>
                      </div>
                    ))}
                    <div className="avatar placeholder" data-theme="light">
                      <div className="w-4 bg-blue-100 text-black ">
                        <span className="text-[0.5rem]">
                          +{activity.numPeopleJoined}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[0.35rem]">
                    <span className="text-[0.85rem] text-slate-500 font-medium ml-2">
                      {activity.numHours}h{' '}
                    </span>
                  </div>
                  <br />
                </div>
              </figcaption>
            </figure>
          </button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};
