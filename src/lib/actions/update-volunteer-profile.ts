'use server';
import { feedbackFormSchema } from '@/components/feedback-form';
import { connectToDB } from '../mongoose';
import Feedback from '@/models/Feedback';
import Volunteer, { ExtendedVolunteerType } from '@/models/Volunteer'; // Import your Volunteer model
import { z } from 'zod';

export async function updateVolunteer(volunteer: ExtendedVolunteerType) {
  await connectToDB();

  // If a volunteer is provided, update their details
  if (volunteer) {
    try {
      const updatedVolunteer = await Volunteer.findOneAndUpdate(
        { _id: volunteer._id },
        {
          $set: {
            firstName: volunteer.firstName,
            lastName: volunteer.lastName,
            email: volunteer.email,
            contactNumber: volunteer.contactNumber,
            skills: volunteer.skills,
          },
        },
        { new: true },
      );
    } catch (error) {
      console.error('Error updating volunteer details:', error);
      throw new Error('Failed to update volunteer details');
    }
  }

  return {
    volunteer: volunteer._id.toString(),
  };
}
