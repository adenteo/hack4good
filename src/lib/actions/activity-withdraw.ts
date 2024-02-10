'use server';
import Activity from '@/models/Activity';

/**
 * Withdraws a user from an activity.
 *
 * @param {string} activityId - The ID of the activity.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<{ message: string, activityId: string, userId: string }>} - A promise that resolves to an object containing a success message, activity ID, and user ID.
 * @throws {Error} - If the activity does not exist or the user is not signed up for the activity.
 */
export async function withdrawFromActivity(activityId: string, userId: string) {
  const activity = await Activity.findById(activityId);

  if (!activity) {
    throw new Error('Activity does not exist.');
  }

  const attendeeIndex = activity.attendees.findIndex(
    (attendee: any) => attendee.user.toString() === userId,
  );

  if (attendeeIndex === -1) {
    throw new Error('User is not signed up for this activity.');
  }

  activity.attendees.splice(attendeeIndex, 1);
  await activity.save();

  return {
    message: 'User successfully withdrawn from the activity.',
    activityId: activity._id.toString(),
    userId: userId,
  };
}
