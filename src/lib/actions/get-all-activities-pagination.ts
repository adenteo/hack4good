'use server';
import Activity from '@/models/Activity';
import { connectToDB } from '../mongoose';

export async function getAllActivitiesPagination(page: number) {
  await connectToDB();
  const activities = await Activity.find({})
    .sort({ startTime: -1 })
    .skip(page * 10)
    .limit(10)
    .lean();
  return JSON.stringify(activities, null, 2);
}
