'use server';
import Activity, { ActivityType } from '@/models/Activity';
import { connectToDB } from '../mongoose';
import mongoose from 'mongoose';

export default async function getActivityById(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  await connectToDB();
  console.log('id', id);
  console.log('here');
  const activity = await Activity.findById(id)
    .populate('activitySignupForm')
    .lean();
  if (activity) {
    return JSON.stringify(activity, null, 2);
  }
  return null;
}
