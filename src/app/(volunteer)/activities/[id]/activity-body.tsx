'use client';
import { format, parseISO } from 'date-fns';
import { faker } from '@faker-js/faker';
import { TagColors } from '@/types/colors';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ExtendedActivityType } from '@/models/Activity';
import { Session } from 'next-auth';
import Image from 'next/image';
import ExpandableText from '@/components/ui/expandable-text';
import { Button } from '@/components/ui/button';
import { CalendarFold, Info, MapPin } from 'lucide-react';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverClose,
} from '@radix-ui/react-popover';
import Link from 'next/link';
import { withdrawFromActivity } from '@/lib/actions/activity-withdraw';
import { toast } from '@/components/ui/use-toast';

interface ActivityBodyProps {
  activity: ExtendedActivityType;
  user: Session | null;
}

const avatarUrls = [
  'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
];

const ActivityBody: React.FC<ActivityBodyProps> = ({
  activity,
  user,
}: ActivityBodyProps) => {
  const isUserAttending = activity.attendees.some(
    (attendee) => attendee.user === user?.user.id
  );
  const date = parseISO(activity.startTime);
  const formattedDate = format(date, 'MMMM d yyyy');

  const handleWithdraw = async () => {
    if (user) {
      await withdrawFromActivity(activity._id, user?.user.id);
      toast({
        title: 'You have been withdrawn',
        description: 'we are sad to see you go :(',
      });
    }
  };

  return (
    <figure className="sm:p-20 sm:flex">
      {activity.image ? (
        <AspectRatio ratio={4 / 3} className="bg-muted">
          <Image
            src={activity.image}
            alt={`Image for ${activity.title}`}
            fill
            className="rounded-b-2xl sm:rounded-2xl object-cover"
          />
        </AspectRatio>
      ) : (
        <div>Image not found</div>
      )}

      <figcaption className="px-10 mt-2 pb-6 flex flex-col justify-center items-start ">
        <div className="flex justify-center items-center md:justify-center lg:justify-center flex-wrap">
          {Array.isArray(activity.tags) &&
            activity.tags.map((tag, index) => (
              <div
                key={index}
                className={`text-xs text-black rounded-md p-1 px-4 font-semibold mx-2 my-1 sm:text-lg ${faker.helpers.enumValue(
                  TagColors
                )}`}
              >
                {tag}
              </div>
            ))}
        </div>
        <div className="mt-2">
          <h1 className="text-3xl mb-2 font-semibold">{activity.title}</h1>
          <div className="flex items-center mt-1">
            <CalendarFold strokeWidth={3} size={15} />
            <p className="ml-1">{formattedDate}</p>
          </div>
          <div className="flex items-center mt-1">
            <MapPin strokeWidth={3} size={15} />
            <p className="ml-1">{activity.address}</p>
          </div>
        </div>

        {activity.attendees.length - 2 > 0 && (
          <div className="flex items-center mt-4">
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
                <div className="w-11 bg-white border-2 rounded-full border-gray-200 text-black">
                  <span className="text-[0.8rem]">
                    +{activity.attendees.length - 2}
                  </span>
                </div>
              </div>
            </div>
            <div className="ml-1">
              <p className="text-gray-500 text-sm">Will be attending</p>
            </div>
          </div>
        )}

        <div className="mt-4">
          <h1 className="font-semibold text-lg mb-1">About the event</h1>
          <p className="text-[0.95rem]">{activity.description}</p>
        </div>

        {activity.additionalDetails && (
          <div className="mt-5">
            <h1 className="font-semibold text-lg mb-1">Additional Details</h1>
            <ExpandableText text={activity.description} />
          </div>
        )}
        {!user?.user.isOnboarded && (
          <div className="flex items-center justify-center mt-14">
            <Info className="text-gray-500" />
            <p className="ml-2 text-xs sm:text-base text-gray-500">
              You are not a verified volunteer yet. Click{' '}
              <span
                onClick={() => {
                  window.open('/onboarding', '_blank');
                }}
                className="underline cursor-pointer"
              >
                here
              </span>{' '}
              to onboard.
            </p>
          </div>
        )}

        <div className="flex mx-auto mt-5">
          <div className="mr-4">
            {isUserAttending ? (
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="bg-red-500 text-[0.85rem] hover:bg-red-900">
                    Withdraw
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-96 pb-44 pl-4 pr-6">
                  <div className=" bg-white border shadow-md flex flex-col justify-left p-6">
                    <h1 className="text-xl font-medium mb-2">
                      Are you absolutely sure?
                    </h1>
                    <p className="text-md text-gray-600">
                      You will withdraw from the activity and will have to sign
                      up again
                    </p>
                    <div className="flex mt-5 justify-center">
                      <PopoverClose asChild>
                        <Button className="bg-gray-200 text-[0.9rem] text-black mr-4 hover:bg-gray-600">
                          Cancel
                        </Button>
                      </PopoverClose>
                      <PopoverClose asChild>
                        <Link href={'/'}>
                          <Button
                            onClick={handleWithdraw}
                            className="bg-red-500 text-[0.9rem] ml-4 hover:bg-red-900"
                          >
                            Yes, Withdraw
                          </Button>
                        </Link>
                      </PopoverClose>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ) : (
              <Link href={`/register/${activity._id}`}>
                <Button
                  className="text-[0.8rem]"
                  disabled={!user?.user.isOnboarded}
                >
                  Register Now
                </Button>
              </Link>
            )}
          </div>

          <div className="ml-4">
            <a href={`mailto:${activity.contactUs}`}>
              <Button
                variant="outline"
                className="border-gray-500 text-[0.8rem] hover:bg-gray-300"
              >
                Contact Us
              </Button>
            </a>
          </div>
        </div>
      </figcaption>
    </figure>
  );
};

export default ActivityBody;
