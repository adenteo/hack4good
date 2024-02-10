'use server';
import Activity from '@/models/Activity';
import { AttendanceStatus } from '@/models/types';
import { connectToDB } from '../mongoose';

/**
 * Marks an attendee as present for a specific activity.
 * @param {string} activityId - The ID of the activity.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{ message: string, activityId: string, userId: string }>} - A promise that resolves to an object containing a success message, activity ID, and user ID.
 * @throws {Error} - If the activity does not exist or if the user has not signed up for the activity.
 */

export async function markAttendeePresent(activityId: string, userId: string) {
  await connectToDB();
  try {
    const activity = await Activity.findById(activityId);
    if (!activity) {
      throw new Error('Activity does not exist.');
    }
    // const attendeeIndex = activity.attendees.findIndex(
    //   (attendee: any) => attendee.user === userId,
    // );
    // if (attendeeIndex === -1) {
    //   throw new Error('User has not signed up for this activity.');
    // }
    activity.attendees.push({
      user: userId,
      attendanceStatus: AttendanceStatus.Present,
      role: 'volunteer',
    });

    // // Update the attendanceStatus to Present
    // activity.attendees[attendeeIndex].attendanceStatus =
    //   AttendanceStatus.Present;
    await activity.save();

    return {
      message: 'User successfully signed up for the activity.',
      activityId: activity._id.toString(),
      userId: userId,
    };
  } catch (error) {
    console.error('Error updating attendance status:', error);
    throw new Error('Failed to update attendance status');
  }
}
