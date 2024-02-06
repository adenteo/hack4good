'use server';
import Volunteer from '@/models/Volunteer';
import { connectToDB } from '../mongoose';
import User from '@/models/User';

export async function getVolunteerByUserId(id: string) {
  await connectToDB();
  const user = await User.findById(id).lean();
  const volunteer = await Volunteer.find({}).populate('user').lean();
  return JSON.stringify(volunteer, null, 2);
}
