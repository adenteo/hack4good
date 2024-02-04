'use server';
// Import the Activity model
import { connectToDB } from '../mongoose';
import Activity from '@/models/Activity';

// Function to create an Activity
export async function addActivity(activityData: object) {
  // Create a new Activity document
  await connectToDB();
  const existingActivity = await Activity.findOne({ name: activityData.name});
  if (existingActivity) {
    throw new Error('Activity with the same name already exists.');
  } else {
    const newActivity = new Activity(activityData);
    await newActivity.save();
    console.log('Activity created with id:', newActivity._id);
    return {
      activity: newActivity,
    };
  }
}

//const newActivityData = { //example data
//  name: 'Community Cooking Event',
//  address: '123 Main St, Cookville',
//  description: 'Join us as we prepare warm meals for the elderly in our community.',
//  day: 6, 
//  startTime: new Date('2024-04-01T09:00:00'),
//  endTime: new Date('2024-04-01T15:00:00'),
//  volunteerCountNeeded: 10,
//  pointOfContact: 'ObjectIdOfTheUser', // Replace with actual ObjectId
//  signUpLimit: 20,
//  imgUrl: 'urlToTheImageForTheEvent',
//  signUpDeadline: new Date('2024-03-25T23:59:59'),
//  attendees: [],
//};
//
//addActivity(newActivityData)
//  .catch(error => console.error('Error creating activity:', error));
