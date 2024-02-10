/**
 * Retrieves all feedback from the database.
 * @returns A JSON string representation of the feedbacks.
 */
'use server';
import Feedback from '@/models/Feedback';
import { connectToDB } from '../mongoose';

export async function getAllFeedback() {
  await connectToDB();
  const feedbacks = await Feedback.find({}).sort({ startTime: 1 }).lean();
  return JSON.stringify(feedbacks, null, 2);
}
