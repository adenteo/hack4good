'use server';
import mongoose from 'mongoose';
import Activity from '@/models/Activity'; // Assuming you have an Activity model
import { faker } from '@faker-js/faker';
import {
  ActivityStatus,
  AttendanceStatus,
  volunteerTheme,
} from '@/models/types';
import { addHours, subWeeks } from 'date-fns';
import { connectToDB } from '../mongoose';
import Volunteer from '@/models/Volunteer';
import User from '@/models/User';

function getRandomActivityStatus() {
  const rand = Math.random() * 100;
    if (rand < 70) {
    return 'Completed';
  }
  const remainingStatuses = ['Upcoming', 'Ongoing', 'Cancelled'];
  const index = Math.floor((rand - 70) / 10);
  return remainingStatuses[index];
}

export async function generateAndSaveDummyActivityData() {
  console.log('hi');
  await connectToDB(); // Replace with your connection string
  const dateRangeStart = new Date(2022, 0, 1); // Jan 1, 2022
  const dateRangeEnd = new Date(2024, 0, 1); // Jan 1, 2024
  for (let i = 0; i < 300; i++) {
    // Generate 10 activities
    const date = new Date(dateRangeStart.getTime() + Math.random() * (dateRangeEnd.getTime() - dateRangeStart.getTime()));
    const activityData = {
      title: faker.word.words(3),
      address: faker.location.streetAddress(),
      description: faker.lorem.sentences(2),
      additionalDetails: faker.lorem.sentences(5),
      startTime: date,
      endTime: addHours(date, 2), // Ensure endTime is after startTime
      volunteerCountNeeded: faker.number.int({ min: 20, max: 50 }),
      signUpLimit: faker.number.int({ min: 50, max: 100 }),
      numHours: faker.number.int({ min: 1, max: 5 }),
      image: faker.image.url(),
      signUpDeadline: subWeeks(date, 1),
      status: getRandomActivityStatus(),
      attendees: [], // Initially empty
      tags: [
        faker.helpers.arrayElement(Object.values(volunteerTheme)),
        faker.helpers.arrayElement(Object.values(volunteerTheme)),
        faker.helpers.arrayElement(Object.values(volunteerTheme)),
        faker.helpers.arrayElement(Object.values(volunteerTheme)),
      ],
      averageSentiment: faker.number.float({ min: -1, max: 1 }), 
    };

    const newActivity = new Activity(activityData);
    await newActivity.save();
  }
}

export async function addDummyDataToAttendeeList() {
  await connectToDB(); // Ensure you're connected to the database
  const users = await User.find({}).select('_id').exec();
  const volunteerIds = users.map((user) => user._id);
  const activities = await Activity.find({}).exec();

  for (const activity of activities) {
    // Ensure we do not add more attendees than volunteerCountNeeded
    const attendeesToAdd = Math.min(
      activity.volunteerCountNeeded,
      volunteerIds.length,
    );
    const shuffledVolunteerIds = volunteerIds.sort(() => 0.5 - Math.random());
    const selectedVolunteerIds = shuffledVolunteerIds.slice(0, attendeesToAdd);
    const attendees = selectedVolunteerIds.map((userId) => ({
      user: userId,
      role: faker.helpers.arrayElement([
        'Participant',
        'Helper',
        'Coordinator',
      ]),
      signUpFormDetails: {}, // Assuming details are not required for dummy data
      attendanceStatus: faker.helpers.arrayElement(
        Object.values(AttendanceStatus),
      ),
    }));
    activity.attendees.push(...attendees);
    await activity.save();
  }
  console.log('Dummy data added to attendee list successfully');
}

// generateAndSaveDummyActivityData().then(() => {
//   console.log('Dummy activity data generated successfully');
// }).catch((error) => {
//   console.error('Failed to generate dummy activity data', error);
// });
