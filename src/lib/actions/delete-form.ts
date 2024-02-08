'use server';
import CustomForm from '@/models/Form';
import { connectToDB } from '../mongoose';

export async function deleteForm(title: string) {
  await connectToDB();
  const matchingForm = await CustomForm.findOne({ title: title });
  if (!matchingForm) {
    return { error: 'Form not found.' };
  }
  const response = await CustomForm.deleteOne({ title: title });
  if (response.acknowledged) {
    return { success: true };
  }
  return { error: 'Error deleting form.' };
}
