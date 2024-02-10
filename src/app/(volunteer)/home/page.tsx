'use client';
import React from 'react';
import { ForYouScroll } from '@/components/ui/for-you-scroll';
import { FeaturedScroll } from '@/components/ui/featured-scroll';
import { getAllActivitiesPagination } from '@/lib/actions/get-all-activities-pagination';
import { ExtendedActivityType } from '@/models/Activity';
import { getUserUpcomingActivities } from '@/lib/actions/get-user-upcoming';
import { useSession } from 'next-auth/react';
import { getAllFeaturedActivitiesPagination } from '@/lib/actions/get-all-featured-activities-pagination';

/**
 * Represents the home page component.
 *
 * This component displays featured activities, activities for the user, and upcoming activities.
 * It fetches the activities data from the server and renders the appropriate UI components.
 */

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
  const session = useSession();
  const userId = session.data?.user.id;

  React.useEffect(() => {
    const fetchActivities = async () => {
      const activities = await getAllFeaturedActivitiesPagination(featuredPage);
      const activitiesJson = JSON.parse(activities);
      console.log(activitiesJson);
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
    if (!userId) return;
    const fetchUpcoming = async () => {
      const activities = await getUserUpcomingActivities(userId);
      const activitiesJson = JSON.parse(activities);
      setUpcomingActivities(activitiesJson);
    };
    fetchUpcoming();
  }, [userId]);

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
      </div>
      <div className="p-6">
        <div className="pb-1 pt-4">
          <p className="text-lg font-bold text-black">Featured</p>
        </div>
        <div className="flex">
          {featuredActivities.length > 0 ? (
            <FeaturedScroll
              activities={featuredActivities}
              setPage={setFeaturedPage}
            />
          ) : (
            <div className="flex w-screen p-6 space-x-10">
              <div className="flex-auto w-5/6 h-72 skeleton"></div>
            </div>
          )}
        </div>
        <div className="pb-1 pt-4">
          <p className="text-lg font-bold text-black">For You</p>
        </div>
        {forYouActivities.length > 0 ? (
          <ForYouScroll activities={forYouActivities} setPage={setForYouPage} />
        ) : (
          <div className="flex w-screen p-6 space-x-10">
            <div className="flex-auto w-5/6 h-72 skeleton"></div>
          </div>
        )}
        {upcomingActivities.length > 0 && (
          <>
            <div className="pb-1 pt-4">
              <p className="text-lg font-bold text-black">Upcoming for you</p>
            </div>
            <div className="flex">
              <ForYouScroll
                activities={upcomingActivities}
                setPage={setForYouPage}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
