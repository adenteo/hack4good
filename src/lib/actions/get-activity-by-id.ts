import Activity, { ActivityType } from '@/models/Activity';
import { connectToDB } from '../mongoose';

export default async function getActivityById(id: string) {
  await connectToDB();
  const activity = await Activity.findById(id).lean();
  if (activity) {
    return JSON.stringify(activity, null, 2);
  }
  return null;
}
