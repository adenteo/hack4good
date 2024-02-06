'use server';
import Activity from '@/models/Activity';
import { connectToDB } from '../mongoose';
import { ObjectId } from 'mongodb';

export default async function linkFormToActivity(
  activityId: string,
  formId: string,
) {
  await connectToDB();
  const activity = await Activity.findById(activityId);
  if (!activity) {
    return { error: 'Activity not found.' };
  }
  activity.activitySignupForm = new ObjectId(formId);
  const response = await activity.save();
  if (response) {
    return { success: 200 };
  }
  return { error: 'Error linking form' };
}
