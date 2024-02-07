'use server';
import Activity from '@/models/Activity';

export async function withdrawFromActivity(activityId: string, userId: string) {
  const activity = await Activity.findById(activityId);

  if (!activity) {
    throw new Error('Activity does not exist.');
  }

  const attendeeIndex = activity.attendees.findIndex(
    (attendee : any) => attendee.user.toString() === userId
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
