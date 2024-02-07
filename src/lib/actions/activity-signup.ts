//on signup form submission:
//fn takes in form details
//ensure activity exists
//ensure activity deadline has not passed
//ensure activity is not full (attendees.length < signUpLimit)
//ensure user is not already signed up for activity
//if user is volunteer and status is approved, then add user to activity.attendees
//form details will be added to activity.attendees
'use server';
import Activity from '@/models/Activity';
import User from '@/models/User';
import { AttendanceStatus } from '@/models/types';
import { Angry } from 'lucide-react';

export async function signUpForActivity(
  activityId: string,
  userId: string,
  formDetails: object,
) {
  const activity = await Activity.findById(activityId);

  if (!activity) {
    throw new Error('Activity does not exist.');
  }
  if (new Date() > activity.signUpDeadline) {
    throw new Error('The sign-up deadline for this activity has passed.');
  }
  if (activity.attendees && activity.attendees.length >= activity.signUpLimit) {
    throw new Error('The activity is full.');
  }
  const isAlreadySignedUp = activity.attendees.some(
    (attendee: any) => attendee.user.toString() === userId,
  );
  if (isAlreadySignedUp) {
    throw new Error('User is already signed up for this activity.');
  }

  // Check if user is a volunteer and if their status is approved
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User does not exist.');
  }
  if (user.userStatus !== 'Active') {
    throw new Error(
      'User is banned or inactive. Cannot sign up for activities.',
    );
  }
  const newAttendee = {
    user: userId,
    role: 'Volunteer', 
    attendanceStatus: AttendanceStatus.Unconfirmed,
    signUpFormDetails: formDetails,
  };

  activity.attendees.push(newAttendee);
  await activity.save();

  return {
    message: 'User successfully signed up for the activity.',
    activityId: activity._id.toString(),
    userId: userId,
  };
}

//// Example usage:
//const formDetails = {
//  userId: 'userIdHere', // Replace with the actual user ID
//  // ...other form fields
//};
//
//signUpForActivity('activityIdHere', formDetails) // Replace with the actual activity ID
//  .then(response => console.log(response.message))
//  .catch(error => console.error(error.message));
