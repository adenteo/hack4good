'use server';
import Volunteer from '@/models/Volunteer';
import { connectToDB } from '../mongoose';
import { z } from 'zod';
import { onboardingFormSchema } from '@/components/signup-form';
import { EmploymentStatus } from '@/models/types';

export async function addVolunteer(
  userId: string,
  data: z.infer<typeof onboardingFormSchema>,
) {
  await connectToDB();
  const volunteerData = {
    user: userId,
    firstName: data.firstName,
    lastName: data.lastName,
    fullName: data.firstName + ' ' + data.lastName,
    volunteerStatus: 'Active',
    email: data.email,
    gender: data.gender,
    updatedAt: Date.now(),
    citizenshipType: data.residentialStatus,
    profilePictureUrl: '',
    lastFourDigitsOfNric: '',
    dateOfBirth: data.dateOfBirth,
    contactNumber: data.phoneNumber,
    address: '',
    postalCode: '',
    occupation: '',
    drivingLicence: false,
    skills: data.skills,
    declarations: '',
    remark: '',
    pwdTrained: false,
  };
  const volunteer = new Volunteer(volunteerData);
  const response = await volunteer.save();
  if (response) {
    return { success: 200 };
  }
  return false;
}
