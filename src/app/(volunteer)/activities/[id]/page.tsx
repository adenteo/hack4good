'use client';
import React from 'react';
import Image from 'next/image';
import ExpandableText from '@/components/ui/expandable-text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type Params = {
  params: {
    id: string;
  };
};

export default function ActivityPage({ params: { id } }: Params) {
  const activity = {
    image: 'https://placekitten.com/300/400', // Placeholder image URL
    title: 'Purr Painting',
    date: '02 March 2024',
    numPeopleJoined: 25,
    numHours: 1,
  };

  const avatarUrls = [
    'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    // 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  ];

  const description =
    'This activity is meant for helping to clean up rescue cats and to allow them to reintegrate into society without the fear of abandonment and neglect. Participants in this heartwarming initiative engage in various tasks, such as grooming, feeding, and providing companionship to these feline friends. By offering care and attention, volunteers contribute to the physical and emotional well-being of these rescued cats, helping them regain trust in humans.';

  return (
    <div className="min-h-screen p-6">
      <figure className="shrink-0">
        <div className="">
          <div className="rounded-md flex justify-center">
            <Image
              src={activity.image}
              alt={`Image for ${activity.title}`}
              className="w-full h-[50vh] object-cover rounded-3xl lg:w-auto lg:h-[55vh] lg:rounded-xl"
              width={300}
              height={200}
            />
          </div>
        </div>
        <figcaption className="">
          <div className="flex justify-between mt-4">
            <h1 className="text-2xl font-semibold text-slate-900">
              {activity.title}
            </h1>
            <div className="">
              <Badge className="text-base font-medium pr-4 pl-4">
                {activity.numHours}h{' '}
              </Badge>
            </div>
          </div>

          <div className="flex justify-between mt-6 ">
            <div>
              <div className="flex justify-right">
                <h1 className="text-xs font-medium text-gray-600">
                  Starts On:
                </h1>
              </div>
              <span className=" text-sm font-semibold text-slate-800">
                {activity.date}
              </span>
            </div>
            <div
              className="avatar-group -space-x-4 rtl:space-x-reverse"
              data-theme="light"
            >
              {avatarUrls.map((avatar, index) => (
                <div key={index} className="avatar">
                  <div className="w-10 border-none">
                    <Image src={avatar} alt={`Avatar ${index + 1}`} fill />
                  </div>
                </div>
              ))}
              <div className="avatar placeholder" data-theme="light">
                <div className="w-10 bg-blue-100 text-black ">
                  <span className="text-[0.8rem]">
                    +{activity.numPeopleJoined}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <ExpandableText text={description} />
          </div>

          <div className="flex justify-center mt-5">
            <div className="mr-4">
              <Button className="bg-gray-600 text-[0.8rem]">
                Register Now
              </Button>
            </div>
            <div className="ml-4">
              <Button
                variant="outline"
                className="border-gray-500 text-[0.8rem]"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </figcaption>
      </figure>
    </div>
  );
}
