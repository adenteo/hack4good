'use server';
import CustomForm from '@/models/Form';
import { connectToDB } from '../mongoose';

export async function deleteForm(title: string) {
  await connectToDB();
  const matchingForm = await CustomForm.findOne({ title: title });
  if (!matchingForm) {
    return { error: 'Form not found' };
  }
  CustomForm.deleteOne({ title: title });
  return { success: true };
}
