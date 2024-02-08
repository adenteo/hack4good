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
  FolderHeart,
} from 'lucide-react';
import { ProfileForm } from '@/components/profile-form';
import { getAuthSession } from '@/lib/auth';
import { getVolunteerByUserId } from '@/lib/actions/get-volunteer-by-id';
import { ExtendedVolunteerType } from '@/models/Volunteer';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { ExtendedActivityTypePastEvents } from '@/models/Activity';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Button } from '@/components/ui/button';
import ProfileTabs from '@/components/profile-tabs';

interface VolunteerPastEventProps {
  activities: ExtendedActivityTypePastEvents[];
}

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

  if (!volunteer) {
    return <div>Error getting profile.</div>;
  }
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
      <ProfileTabs volunteer={volunteer} />
    </div>
  );
}
