'use server';
import { activityFormSchema } from '@/components/activity-creation-form';
import { connectToDB } from '../mongoose';
import Activity from '@/models/Activity';
import { z } from 'zod';

// Function to create an Activity
export async function addActivity(
  activityData: z.infer<typeof activityFormSchema>,
) {
  // Create a new Activity document
  await connectToDB();
  const existingActivity = await Activity.findOne({
    title: activityData.title,
  });
  if (existingActivity) {
    return {
      error: 'Activity with the same name already exists.',
    };
  } else {
    const newActivity = new Activity(activityData);
    await newActivity.save();
    return {
      activity: newActivity._id.toString(),
    };
  }
}
