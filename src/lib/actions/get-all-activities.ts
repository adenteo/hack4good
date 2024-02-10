'use server';
import Activity from '@/models/Activity';
import { connectToDB } from '../mongoose';

/**
 * Retrieves all activities from the database.
 * @returns A JSON string representation of the activities.
 */
export async function getAllActivities() {
  await connectToDB();
  const activities = await Activity.find({}).sort({ startTime: -1 }).lean();
  return JSON.stringify(activities, null, 2);
}
