'use client';
import React from 'react';
import { TextInput } from '@tremor/react';

import { ForYouScroll } from '@/components/ui/for-you-scroll';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { SearchIcon } from 'lucide-react';
import { FeaturedScroll } from '@/components/ui/featured-scroll';
// import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { addRoles } from '@/lib/actions/add-roles';
import { generateAndSaveDummyData } from '@/lib/actions/dummydata';
import {
  addDummyDataToAttendeeList,
  generateAndSaveDummyActivityData,
} from '@/lib/actions/dummyactivity';
import { getDocumentsByDateRange } from '@/lib/actions/get-monthly-reports';
import { getAllActivitiesPagination } from '@/lib/actions/get-all-activities-pagination';
import {
  fetchCompletedActivitiesWithVolunteers,
  saveActivitiesToCSV,
} from '@/lib/actions/get-reports';
import { ActivityType, ExtendedActivityType } from '@/models/Activity';
import { getUserUpcomingActivities } from '@/lib/actions/get-user-upcoming';
import { unparse } from 'papaparse';

export default function Home() {
  const [featuredActivities, setFeaturedActivities] = React.useState<
    ExtendedActivityType[]
  >([]);
  const [forYouActivities, setForYouActivities] = React.useState<
    ExtendedActivityType[]
  >([]);
  const [upcomingActivities, setUpcomingActivities] = React.useState<
    ExtendedActivityType[]
  >([]);
  const [featuredPage, setFeaturedPage] = React.useState(0);
  const [forYouPage, setForYouPage] = React.useState(0);
  //   const [forYouPage, setForYouPage] = React.useState(0);

  React.useEffect(() => {
    const fetchActivities = async () => {
      const activities = await getAllActivitiesPagination(featuredPage);
      const activitiesJson = JSON.parse(activities);
      setFeaturedActivities((prev) => [...prev, ...activitiesJson]);
    };
    fetchActivities();
  }, [featuredPage]);

  React.useEffect(() => {
    const fetchActivities = async () => {
      const activities = await getAllActivitiesPagination(forYouPage);
      const activitiesJson = JSON.parse(activities);
      setForYouActivities((prev) => [...prev, ...activitiesJson]);
    };
    fetchActivities();
  }, [forYouPage]);

  React.useEffect(() => {
    const fetchUpcoming = async () => {
      const activities = await getUserUpcomingActivities(
        '65c1c5a7919469d96a24fe53',
      );
      const activitiesJson = JSON.parse(activities);
      console.log(activitiesJson);
      setUpcomingActivities(activitiesJson);
    };
    fetchUpcoming();
  }, []);

  return (
    <div className="min-h-screen">
      <div className="rounded-b-3xl bg-[#FC7869] text-white relative items-center lg:justify-center p-0 m-0">
        <div className="flex justify-between px-6 pb-4">
          <div>
            <h1 className="text-lg sm:text-2xl font-semibold text-white">
              Explore
            </h1>
            <p className="text-xs sm:text-base text-white">
              Activities for you
            </p>
          </div>
        </div>
        {/* <div>
          <TextInput
            className="bg-[#FC7869] mx-2 w-auto border-none text-white shadow-none"
            icon={SearchIcon}
            placeholder="Search..."
          />
        </div> */}
      </div>
      <div className="p-4">
        <div className="pb-1 pt-4">
          <p className="text-lg font-bold text-black">Featured</p>
        </div>
        <div className="flex">
          <FeaturedScroll
            activities={featuredActivities}
            setPage={setFeaturedPage}
          />
        </div>
        <div className="pb-1 pt-4">
          <p className="text-lg font-bold text-black">For You</p>
        </div>

        <ForYouScroll activities={forYouActivities} setPage={setForYouPage} />

        <div className="pb-1 pt-4">
          <p className="text-lg font-bold text-black">Upcoming for you</p>
        </div>
        <div className="flex">
          <ForYouScroll
            activities={upcomingActivities}
            setPage={setForYouPage}
          />
        </div>
      </div>
    </div>
  );
}
