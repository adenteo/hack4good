'use server';
import Activity from '@/models/Activity';
import { connectToDB } from '../mongoose';
import { ObjectId } from 'mongodb';

/**
 * Links a form to an activity.
 * @param activityId - The ID of the activity.
 * @param formId - The ID of the form to link.
 * @returns An object indicating the success or error status of the operation.
 */
export default async function linkFormToActivity(
  activityId: string,
  formId: string,
) {
  await connectToDB();
  const activity = await Activity.findById(activityId);
  if (!activity) {
    return { error: 'Activity not found.' };
  }

  activity.customSignUpForm = new ObjectId(formId);
  const response = await activity.save();
  if (response) {
    return { success: 200 };
  }
  return { error: 'Error linking form' };
}
