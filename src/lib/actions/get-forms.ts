'use server';
import CustomForm from '@/models/Form';
import { connectToDB } from '../mongoose';

/**
 * Retrieves all forms from the database.
 * @returns A JSON string representation of the forms.
 */
export async function getForms() {
  await connectToDB();
  const forms = await CustomForm.find({}).lean();
  return JSON.stringify(forms, null, 2);
}
