'use server';
import Activity from '@/models/Activity';
import { connectToDB } from '../mongoose';

/**
 * Retrieves a paginated list of all activities.
 *
 * @param page - The page number of the desired results.
 * @returns A JSON string representation of the activities.
 */

export async function getAllActivitiesPagination(page: number) {
  await connectToDB();
  const activities = await Activity.find({})
    .sort({ startTime: -1 })
    .skip(page * 10)
    .limit(10)
    .lean();
  return JSON.stringify(activities, null, 2);
}
