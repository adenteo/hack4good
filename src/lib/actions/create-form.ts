'use server';
import CustomForm from '@/models/Form';
import { FormField as FormFieldType } from '../../types/formTypes';
import { connectToDB } from '../mongoose';

export async function createForm(
  formFields: FormFieldType[],
  title: string,
  description: string,
) {
  await connectToDB();
  const existingForm = await CustomForm.findOne({ title: title });
  if (existingForm) {
    await CustomForm.updateOne({ title: title }, { fields: formFields });
    return { success: true };
  }
  const form = await CustomForm.create({
    title,
    description,
    fields: formFields,
  });
  if (form) return { success: true };
  return { error: 'Something went wrong' };
}
