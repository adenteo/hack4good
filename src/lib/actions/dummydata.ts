'use server';
import { faker } from '@faker-js/faker';
import { connectToDB } from '../mongoose';
import mongoose from 'mongoose';
import User from '@/models/User';
import Volunteer from '@/models/Volunteer';
import {
  UserStatus,
  VolunteerStatus,
  Gender,
  CitizenshipType,
  EmploymentStatus,
  volunteerTheme,
} from '@/models/types';

type UserData = {
  totalHours: number;
  totalEvents: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userStatus: UserStatus;
  title: string;
  isAdmin: boolean;
};

type VolunteerData = {
  user: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  fullName: string;
  volunteerStatus: VolunteerStatus;
  gender: Gender;
  updatedAt: Date;
  citizenshipType: CitizenshipType;
  profilePictureUrl: string;
  lastFourDigitsOfNric: string;
  dateOfBirth: Date;
  contactNumber: string;
  address: string;
  postalCode: string;
  employmentStatus: EmploymentStatus;
  occupation: string;
  drivingLicence: boolean;
  skills: string;
  skillsTags: string[];
  declarations: string;
  remark: string;
  pwdTrained: boolean;
};

// You can now use these functions to generate and save dummy data to MongoDB as shown previously.
function generateRandomUserData(): UserData {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    totalHours: faker.number.int({ min: 0, max: 500 }),
    totalEvents: faker.number.int({ min: 0, max: 50 }),
    firstName: firstName,
    lastName: lastName,
    email: faker.internet.email({ firstName: firstName, lastName: lastName }),
    password: faker.internet.password(), // Remember to hash passwords in production
    userStatus: UserStatus.Active,
    title: faker.person.prefix(),
    isAdmin: Math.random() > 0.95, // 10% chance of being an admin
  };
}

function generateSGPostalCode(): string {
  // Array of valid first two digits (01 to 82 excluding 74)
  const validFirstTwoDigits = Array.from({ length: 82 }, (_, i) => {
    const prefix = (i + 1).toString().padStart(2, '0');
    return prefix !== '74' ? prefix : null;
  }).filter(Boolean);

  // Select a random prefix from the valid first two digits
  const randomPrefix =
    validFirstTwoDigits[Math.floor(Math.random() * validFirstTwoDigits.length)];

  // Generate a random number between 0 and 9999 for the last four digits
  const lastFourDigits = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');

  // Combine to form a full 6-digit postal code
  const postalCode = `${randomPrefix}${lastFourDigits}`;

  return postalCode;
}

// Function to generate random volunteer data
function generateRandomVolunteerData(
  userId: mongoose.Types.ObjectId,
): VolunteerData {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postalCode = generateSGPostalCode();
  return {
    user: userId,
    firstName: firstName,
    lastName: lastName,
    fullName: firstName + ' ' + lastName,
    volunteerStatus: VolunteerStatus.Active,
    gender: faker.helpers.arrayElement(Object.values(Gender)),
    updatedAt: faker.date.past(),
    citizenshipType: faker.helpers.arrayElement(Object.values(CitizenshipType)),
    profilePictureUrl: faker.image.avatar(),
    lastFourDigitsOfNric: ('000' + faker.number.int(9999)).slice(-4),

    dateOfBirth: faker.date.past({
      years: 20,
      refDate: '2020-01-01T00:00:00.000Z',
    }),
    contactNumber: faker.string.numeric(5),
    address: faker.location.streetAddress(),
    postalCode: postalCode,
    employmentStatus: faker.helpers.arrayElement(
      Object.values(EmploymentStatus),
    ),
    occupation: faker.person.jobTitle(),
    drivingLicence: faker.datatype.boolean(),
    skills: faker.word.words(5),
    skillsTags: [
      faker.helpers.arrayElement(Object.values(volunteerTheme)),
      faker.helpers.arrayElement(Object.values(volunteerTheme)),
      faker.helpers.arrayElement(Object.values(volunteerTheme)),
    ],
    declarations: faker.lorem.sentence(),
    remark: faker.lorem.sentence(),
    pwdTrained: faker.datatype.boolean(),
  };
}

export async function generateAndSaveDummyData() {
  console.log('making data');
  await connectToDB(); // Replace with your connection string

  for (let i = 0; i < 2000; i++) {
    // Generate 100 users
    const randomUserData = generateRandomUserData();
    const newUser = new User(randomUserData);
    await newUser.save();

    if (!newUser.isAdmin) {
      // If not admin, also create a volunteer
      const randomVolunteerData = generateRandomVolunteerData(newUser._id);
      const newVolunteer = new Volunteer(randomVolunteerData);
      await newVolunteer.save();
    }
  }
}

//   generateAndSaveDummyData().then(() => {
//     console.log('Dummy data generated successfully');
//   }).catch((error) => {
//     console.error('Failed to generate dummy data', error);
//   });
