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
} from '@/models/types';

type UserData = {
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
  declarations: string;
  remark: string;
  pwdTrained: boolean;
};

// You can now use these functions to generate and save dummy data to MongoDB as shown previously.
function generateRandomUserData(): UserData {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    firstName: firstName,
    lastName: lastName,
    email: faker.internet.email({ firstName: firstName, lastName: lastName }),
    password: faker.internet.password(), // Remember to hash passwords in production
    userStatus: UserStatus.Active,
    title: faker.person.prefix(),
    isAdmin: Math.random() > 0.9, // 10% chance of being an admin
  };
}

// Function to generate random volunteer data
function generateRandomVolunteerData(
  userId: mongoose.Types.ObjectId,
): VolunteerData {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return {
    user: userId,
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
    postalCode: faker.location.zipCode(),
    employmentStatus: faker.helpers.arrayElement(
      Object.values(EmploymentStatus),
    ),
    occupation: faker.person.jobTitle(),
    drivingLicence: faker.datatype.boolean(),
    skills: faker.word.words(5),
    declarations: faker.lorem.sentence(),
    remark: faker.lorem.sentence(),
    pwdTrained: faker.datatype.boolean(),
  };
}

export async function generateAndSaveDummyData() {
  console.log('making data');
  await connectToDB(); // Replace with your connection string

  for (let i = 0; i < 1000; i++) {
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
