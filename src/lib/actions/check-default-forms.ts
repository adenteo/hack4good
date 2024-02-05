// src/models/defaultForms.ts
'use server';
import { connectToDB } from '../mongoose';
import CustomForm from '@/models/Form';

async function checkDefaultActivityForm() {
  await connectToDB();
  const existingForm = await CustomForm.findOne({ title: 'Activity Creation' });
  if (existingForm) {
    console.log('Default Activity Form already exists.');
    return existingForm;
  } else {
    const form = new CustomForm({
      title: 'Activity Creation',
      description: 'This is the default form to create new activities.',
      fields: defaultActivityFormFields,
    });
    await form.save();
    console.log('Default Activity Form created with id:', form._id);
    return form;
  }
}
const defaultActivityFormFields = [
    {
      id: 'title',
      label: 'Activity Name',
      type: 'text',
      placeholder: 'Enter the name of the activity',
      required: true,
    },
    {
      id: 'address',
      label: 'Address',
      type: 'text',
      placeholder: 'Enter the address where the activity will take place',
      required: true,
    },
    {
      id: 'description',
      label: 'Description',
      type: 'text',
      placeholder: 'Describe the activity details',
      required: true,
    },
    {
      id: 'additionalDetails',
      label: 'Additional Details',
      type: 'text',
      placeholder: 'Any further details about the activity',
      required: true,
    },
    // {
    //   id: 'day',
    //   label: 'Day of the Week',
    //   type: 'text',
    //   placeholder: 'Enter the day of the week as a number (0=Sunday, 6=Saturday)',
    //   required: true,
    // },
    {
      id: 'startTime',
      label: 'Start Time',
      type: 'date',
      placeholder: 'Enter the start time for the activity',
      required: true,
    },
    {
      id: 'endTime',
      label: 'End Time',
      type: 'date',
      placeholder: 'Enter the end time for the activity',
      required: true,
    },
    {
      id: 'numHours',
      label: 'Duration of activity',
      type: 'number',
      placeholder: 'Enter the total duration for the activity',
      required: true,
    },
    {
      id: 'volunteerCountNeeded',
      label: 'Volunteer Count Needed',
      type: 'text',
      placeholder: 'Enter the number of volunteers needed',
      required: true,
    },
    {
      id: 'signUpLimit',
      label: 'Sign-Up Limit',
      type: 'text',
      placeholder: 'Enter the limit for how many people can sign up',
      required: true,
    },
    {
      id: 'image',
      label: 'Image URL',
      type: 'url',
      placeholder: 'Enter the URL for the activity image',
      required: true,
    },
    {
      id: 'signUpDeadline',
      label: 'Sign-Up Deadline',
      type: 'date',
      placeholder: 'Enter the deadline for signing up for the activity',
      required: true,
    },
    {
      id: 'tags',
      label: 'Category of activity',
      type: 'checkbox',
      placeholder: 'Select all categories that are related to your activity',
      required: true,
    },
    {
      id: 'contactUs',
      label: 'Point of contact',
      type: 'email',
      placeholder: 'Please provide your email address for volunteers to contact',
      required: true,
    },
    // point of contact, activity signup form will be added as selectable items?
    //

  ];
  
checkDefaultActivityForm().catch(error => console.error('Error creating default activity form:', error));

