'use server';
import Activity, { ActivityType } from '@/models/Activity';
import CustomForm from '@/models/Form';
import { connectToDB } from '../mongoose';
import mongoose from 'mongoose';

export default async function getActivityById(id: string) {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return null;
  }
  await connectToDB();
  await CustomForm.init();
  const activity = await Activity.findById(id)
  .populate([{path: 'activitySignupForm', strictPopulate: false}])
    .lean();
  if (activity) {
    return JSON.stringify(activity, null, 2);
  }
  return null;
}
