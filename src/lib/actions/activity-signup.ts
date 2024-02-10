'use server';
import Activity from '@/models/Activity';
import User from '@/models/User';
import { AttendanceStatus } from '@/models/types';

/**
 * Signs up a user for an activity.
 * @param {string} activityId - The ID of the activity.
 * @param {string} userId - The ID of the user.
 * @param {object} formDetails - The form details for the user's sign-up.
 * @returns {Promise<object>} - A promise that resolves to an object containing the success message, activity ID, and user ID.
 * @throws {Error} - If the activity does not exist, the activity is full, the user is already signed up for the activity, the user does not exist, or the user is banned or inactive.
 */

export async function signUpForActivity(
  activityId: string,
  userId: string,
  formDetails: object,
) {
  const activity = await Activity.findById(activityId);

  if (!activity) {
    throw new Error('Activity does not exist.');
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
    message: 'Successfully signed up for the activity.',
    activityId: activity._id.toString(),
    userId: userId,
  };
}
