// src/models/Activity.ts
import {Schema, model, models } from 'mongoose';
import { AttendanceStatus, volunteerTheme } from './types';

const attendeeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  signUpFormDetails: { type: Schema.Types.Mixed }, // Flexible field 
  attendanceStatus: { 
    type: String, 
    enum: Object.values(AttendanceStatus), 
    default: AttendanceStatus.Unconfirmed 
  },
});

const activitySchema = new Schema({
  title: { type: String, required: true }, 
  address: { type: String, required: true }, // haven use
  description: { type: String, required: true },
  additionalDescription: { type: String, required: false },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  volunteerCountNeeded: { type: Number, required: true },
  pointOfContact: { type: Schema.Types.ObjectId, ref: 'User'},
  signUpLimit: { type: Number, required: true },
  imgUrl: { type: String, required: true },
  signUpDeadline: { type: Date, required: true },
  activitySignupForm: { type: Schema.Types.ObjectId, ref: 'CustomForm'},
  attendees: [attendeeSchema],
  tags: { type: [String], enum: Object.values(volunteerTheme)},
});


const Activity = models.Activity ||  model('Activity', activitySchema);

export default Activity;