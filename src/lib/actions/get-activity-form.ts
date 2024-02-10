'use server';
import CustomForm from '@/models/Form';
import { connectToDB } from '../mongoose';

/**
 * Retrieves the activity form from the database.
 * @returns A stringified JSON representation of the activity forms.
 */
export async function getActivityForm() {
  await connectToDB();
  const forms = await CustomForm.find({}).lean();
  return JSON.stringify(forms, null, 2);
}
