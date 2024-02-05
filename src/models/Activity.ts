// src/models/Activity.ts
import { Schema, model, models } from 'mongoose';
import { ActivityStatus, AttendanceStatus, volunteerTheme } from './types';

const attendeeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  signUpFormDetails: { type: Schema.Types.Mixed }, // Flexible field
  attendanceStatus: {
    type: String,
    enum: Object.values(AttendanceStatus),
    default: AttendanceStatus.Unconfirmed,
  },
});

const activitySchema = new Schema({
  title: { type: String, required: true },
  address: { type: String, required: true },
  description: { type: String, required: true },
  additionalDetails: { type: String, required: false },
  startTime: { type: Date, required: true }, // use this as start date for front end
  endTime: { type: Date, required: true },
  numPeopleJoined: { type: Number, required: false },
  volunteerCountNeeded: { type: Number, required: false },
  numHours: { type: Number, required: false },
  pointOfContact: { type: Schema.Types.ObjectId, ref: 'User' },
  signUpLimit: { type: Number, required: false },
  image: { type: String, required: false },
  signUpDeadline: { type: Date, required: true },
  activitySignupForm: { type: Schema.Types.ObjectId, ref: 'CustomForm' },
  attendees: [attendeeSchema],
  status: { type: String, enum: Object.values(ActivityStatus) },
  tags: { type: [String], enum: Object.values(volunteerTheme) },
});

const Activity = models.Activity || model('Activity', activitySchema);

export default Activity;
