'use server';
import Volunteer from '@/models/Volunteer';
import { connectToDB } from '../mongoose';

export async function getAllVolunteers() {
  await connectToDB();
  const volunteers = await Volunteer.find({}).populate('user').lean();
  return JSON.stringify(volunteers, null, 2);
}
