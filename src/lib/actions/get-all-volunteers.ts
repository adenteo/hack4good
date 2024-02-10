'use server';
import Volunteer from '@/models/Volunteer';
import { connectToDB } from '../mongoose';

/**
 * Retrieves all volunteers from the database.
 * @returns A JSON string representation of the volunteers.
 */
export async function getAllVolunteers() {
  await connectToDB();
  const volunteers = await Volunteer.find({}).populate('user').lean();
  return JSON.stringify(volunteers, null, 2);
}
