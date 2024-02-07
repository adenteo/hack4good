'use server';
import Activity, { ExtendedActivityType } from '@/models/Activity';
import mongoose from 'mongoose';
import { connectToDB } from '../mongoose';

export async function getUserUpcomingActivities(userId: string) {
  // Connect to the database if not already connected
  await connectToDB();

  // Ensure the userId is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new Error('Invalid user ID.');
  }

  try {
    // Query the database for activities where the userId is in the attendees.user array
    const activities = await Activity.find({
      'attendees.user': userId,
    }).lean(); // Use .lean() for faster execution if you only need plain JavaScript objects
    console.log(activities.length);
    console.log('THIS MANY ACTIVITIES');
    return JSON.stringify(activities, null, 2);
    // return activities.map(activity => ({
    //   ...activity,
    //   startTime: activity.startTime.toISOString(), // Convert Date to ISO string if necessary
    //   // Add any other transformations or additional data here
    // }));
  } catch (error) {
    console.error('Error finding activities by attendee:', error);
    throw error;
  }
}
