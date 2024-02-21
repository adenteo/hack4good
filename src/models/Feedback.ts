// src/models/Certificate.ts
import { InferSchemaType, Schema, model, models } from 'mongoose';

const feedbackSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  rating: { type: Number, required: true },
  email: { type: String, required: true },
  name: { type: String, required: true },
});

type FeedbackType = InferSchemaType<typeof feedbackSchema>;

const Feedback = models.Feedback || model('Feedback', feedbackSchema);

export default Feedback;
export type { FeedbackType };
