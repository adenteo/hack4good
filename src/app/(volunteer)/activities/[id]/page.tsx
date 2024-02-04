'use client';
import React from 'react';
import Image from 'next/image';
import ExpandableText from '@/components/ui/expandable-text';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';
import { Alert } from '@daisyui/react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from '@radix-ui/react-popover';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';

type Params = {
  params: {
    id: string;
  };
};

export default function ActivityPage({ params: { id } }: Params) {
  const activity = {
    image: 'https://placekitten.com/302/402', // Placeholder image URL
    registered: false,
    title: 'Purr Painting',
    numPeopleJoined: 25,
    numHours: 8,
    startTime: '08:00',
    endTime: '12:00',
    date: '02 March 2024',
    address: '25 Sengkang Road 239174',
    tags: ['Charity', 'Food', 'Elderly', 'Charity', 'Food', 'Elderly'],
    description:
      'This activity is meant for helping to clean up rescue cats and to allow them to reintegrate into society without the fear of abandonment and neglect. Participants in this heartwarming initiative engage in various tasks, such as grooming, feeding, and providing companionship to these feline friends. ',
    additionalDetails:
      'This activity is meant for helping to clean up rescue cats and to allow them to reintegrate into society without the fear of abandonment and neglect. Participants in this heartwarming initiative engage in various tasks, such as grooming, feeding, and providing companionship to these feline friends. By offering care and attention, volunteers contribute to the physical and emotional well-being of these rescued cats, helping them regain trust in humans.',
  };

  const [registered, setRegistered] = React.useState(activity.registered);

  const handleRegisterNow = () => {
    alert('Successfully registered!');
    setRegistered(true);
  };

  const handleWithdraw = () => {
    alert('You have been withdrawn.');
    setRegistered(false);
  };

  const avatarUrls = [
    'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
    // 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  ];

  return (
    <div className="min-h-screen p-6">
      <figure className="md:flex md:items-center lg:flex lg:items-center">
        <div className="md:mr-10 lg:mr-10">
          <div className="rounded-md flex justify-center">
            <Image
              src={activity.image}
              alt={`Image for ${activity.title}`}
              className="w-full h-[50vh] object-cover rounded-b-3xl lg:rounded-xl md:h-[80vh] md:w-[150vw] lg:h-[80vh] lg:w-[80vw]"
              width={300}
              height={200}
            />
          </div>

          <div className="flex ml-1 mt-1 md:justify-center lg:justify-center">
            {Array.isArray(activity.tags) &&
              activity.tags.slice(0, 3).map((tag, index) => (
                <div
                  key={index}
                  className={`text-[0.85rem] text-black ${
                    index % 3 === 0
                      ? 'bg-blue-100'
                      : index % 3 === 1
                      ? 'bg-red-100'
                      : 'bg-green-100'
                  } rounded-md p-[0.3rem] pl-4 pr-4 mr-3 mt-2`}
                >
                  {tag}
                </div>
              ))}
            {activity.tags.length > 3 && (
              <div className="text-[0.6rem] pt-6 text-black">...</div>
            )}
          </div>
        </div>
        <figcaption className="">
          <div className=" mt-4">
            <h1 className="text-3xl font-semibold text-slate-900">
              {activity.title}
            </h1>
            <div className="flex mt-1">
              <div className="mt-[0.35rem]">
                <Clock strokeWidth={1.5} size={22} />
              </div>

              <div className="ml-3 mt-1 text-[0.9rem]">
                <p>
                  {activity.date} |{' '}
                  <span>
                    {activity.startTime} - {activity.endTime}
                  </span>
                </p>
                <p className="mt-1">{activity.address}</p>
              </div>
            </div>
          </div>

          <div className="flex mt-4 items-center">
            <div
              className="avatar-group -space-x-4 rtl:space-x-reverse"
              data-theme="light"
            >
              {avatarUrls.map((avatar, index) => (
                <div key={index} className="avatar">
                  <div className="w-11 border-none">
                    <Image src={avatar} alt={`Avatar ${index + 1}`} fill />
                  </div>
                </div>
              ))}
              <div className="avatar placeholder" data-theme="light">
                <div className="w-11 bg-white border-2 rounded-full border-gray-200 text-black ">
                  <span className="text-[0.8rem]">
                    +{activity.numPeopleJoined}
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-1">
              <p className="text-gray-500 text-sm">Will be attending</p>
            </div>
          </div>

          <div className="mt-5">
            <h1 className="font-semibold text-lg mb-1">About the event</h1>
            <p className="text-[0.95rem]">{activity.description}</p>
          </div>

          <div className="mt-5">
            <h1 className="font-semibold text-lg mb-1">Additional Details</h1>
            <ExpandableText text={activity.description} />
          </div>

          <div className="flex justify-center mt-5">
            <div className="mr-4">
              {registered ? (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button className="bg-red-500 text-[0.85rem] hover:bg-red-900">
                      Withdraw
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-96 pb-44 pl-4 pr-6">
                    <div className=" bg-white border shadow-md flex flex-col justify-left p-6">
                      <h1 className="text-2xl font-medium mb-2">
                        {' '}
                        Are you absolutely sure?
                      </h1>
                      <p className="text-lg text-gray-600">
                        You will withdraw from the activity and will have to
                        sign up again
                      </p>
                      <div className="flex mt-5 justify-center">
                        <PopoverClose asChild>
                          <Button className="bg-gray-200 text-[0.9rem] text-black mr-4 hover:bg-gray-600">
                            Cancel
                          </Button>
                        </PopoverClose>
                        <PopoverClose asChild>
                          <Button
                            className="bg-red-500 text-[0.9rem] ml-4 hover:bg-red-900"
                            onClick={handleWithdraw}
                          >
                            Yes, Withdraw
                          </Button>
                        </PopoverClose>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              ) : (
                <Button
                  className="bg-gray-800 text-[0.8rem] hover:bg-gray-500"
                  onClick={handleRegisterNow}
                >
                  Register Now
                </Button>
              )}
            </div>

            <div className="ml-4">
              <Button
                variant="outline"
                className="border-gray-500 text-[0.8rem] hover:bg-gray-300"
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
