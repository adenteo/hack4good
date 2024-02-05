'use server';
import Activity from '@/models/Activity';
import { connectToDB } from '../mongoose';

export async function getAllActivities() {
  await connectToDB();
  const activities = await Activity.find({}).lean();
  return JSON.stringify(activities, null, 2);
}
