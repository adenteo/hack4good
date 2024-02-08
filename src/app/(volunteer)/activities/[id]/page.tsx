import React from 'react';
import getActivityById from '@/lib/actions/get-activity-by-id';
import { ExtendedActivityType } from '@/models/Activity';
import { getAuthSession } from '@/lib/auth';
import ActivityBody from './activity-body';

type Params = {
  params: {
    id: string;
  };
};

export default async function ActivityPage({ params: { id } }: Params) {
  const user = await getAuthSession();
  const activityString = await getActivityById(id);
  if (!activityString) {
    return <div>Activity not found</div>;
  }
  const activity: ExtendedActivityType = JSON.parse(activityString);

  return (
    <div className="min-h-screen">
      <ActivityBody activity={activity} user={user} activityId={id} />
    </div>
  );
}
