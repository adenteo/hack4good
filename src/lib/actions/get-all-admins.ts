'use server';
import User from '@/models/User';
import { connectToDB } from '../mongoose';

export async function getAllAdmins() {
  await connectToDB();
  const admins = await User.find({ isAdmin: true }).lean();
  return JSON.stringify(admins, null, 2);
}
