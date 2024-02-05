import mongoose from 'mongoose';
import { connectToDB } from '../mongoose';
import Activity from '@/models/Activity'; // Assuming you have an Activity model
import { faker } from '@faker-js/faker';
import { volunteerTheme } from '@/models/types';
import { addHours, subWeeks } from 'date-fns';

async function generateAndSaveDummyActivityData() {
    await connectToDB(); // Replace with your connection string
    for (let i = 0; i < 10; i++) { // Generate 10 activities
        const date = subWeeks(Date.now(), i);
        const activityData = {
            title: faker.lorem.words(3),
            address: faker.location.streetAddress(),
            description: faker.lorem.sentences(2),
            date: date,
            startTime: date,
            endTime: addHours(date, 2), // Ensure endTime is after startTime
            volunteerCountNeeded: faker.number.int({ min: 5, max: 20 }),
            signUpLimit: faker.number.int({ min: 20, max: 50 }),
            imgUrl: "hi",
            signUpDeadline: faker.date.soon(15),
            attendees: [], // Initially empty
            tags: [faker.helpers.arrayElement(Object.values(volunteerTheme))],
        };

        const newActivity = new Activity(activityData);
        await newActivity.save();
    }

    mongoose.disconnect();
}

generateAndSaveDummyActivityData().then(() => {
  console.log('Dummy activity data generated successfully');
}).catch((error) => {
  console.error('Failed to generate dummy activity data', error);
});
