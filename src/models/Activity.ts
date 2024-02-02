// src/models/Activity.ts
import {Schema, model, models } from 'mongoose';


const activitySchema = new Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  day: { type: Number, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  volunteerCountNeeded: { type: Number, required: true },
  pointOfContact: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  signUpLimit: { type: Number, required: true },
  url: { type: String, required: true },
  signUpDeadline: { type: Date, required: true },
});

const Activity = models.Activity ||  model('Activity', activitySchema);

export default Activity;