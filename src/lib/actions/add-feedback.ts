'use server';
import { feedbackFormSchema } from '@/components/feedback-form';
import { connectToDB } from '../mongoose';
import Feedback from '@/models/Feedback';
import { z } from 'zod';

// Function to create an Activity
export async function addFeedback(
  feedbackData: z.infer<typeof feedbackFormSchema>,
) {
  // Create a new Activity document
  await connectToDB();
  const newFeedback = new Feedback(feedbackData);
  await newFeedback.save();
  return {
    activity: newFeedback._id.toString(),
  };
}
