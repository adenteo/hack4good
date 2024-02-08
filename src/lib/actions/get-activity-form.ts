'use server';
import CustomForm from '@/models/Form';
import { connectToDB } from '../mongoose';

export async function getActivityForm() {
  await connectToDB();
  const forms = await CustomForm.find({}).lean();
  return JSON.stringify(forms, null, 2);
}
