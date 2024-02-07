// src/models/Certificate.ts
import {Schema, model, models } from 'mongoose';

const feedbackSchema = new Schema({
  title: { type: String, required: true },
  description:  { type: String, required: true },
  image: { type: String, required: false },
});

const Feedback = models.Feedback || model('Feedback', feedbackSchema);

export default Feedback;
