'use server';
import Activity from '@/models/Activity';
import { connectToDB } from '../mongoose';

export async function getAllActivities() {
  await connectToDB();
  const activities = await Activity.find({}).sort({ startTime: -1 }).lean();
  return JSON.stringify(activities, null, 2);
}
