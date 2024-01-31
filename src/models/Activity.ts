// src/models/Activity.ts
import mongoose, { Document, Schema, Model } from 'mongoose';

export interface IActivity extends Document {
  name: string;
  address: string;
  description: string;
  day: number;
  startTime: Date;
  endTime: Date;
  volunteerCountNeeded: number;
  pointOfContact: mongoose.Types.ObjectId; // References User ID of an Admin
  signUpLimit: number;
  url: string;
  signUpDeadline: Date;
}

const activitySchema = new Schema<IActivity>({
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

const Activity: Model<IActivity> = mongoose.model('Activity', activitySchema);

export default Activity;