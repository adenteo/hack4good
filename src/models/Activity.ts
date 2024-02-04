// src/models/Activity.ts
import {Schema, model, models } from 'mongoose';


const activitySchema = new Schema({
  title: { type: String, required: true }, 
  address: { type: String, required: true }, // haven use
  description: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  numPeopleJoined: { type: Number, required: true },
  pointOfContact: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // haven use
  signUpLimit: { type: Number, required: true }, // haven use
  image: { type: String, required: true },
  signUpDeadline: { type: Date, required: true }, // haven use
  tags: {type: Array, required: true},
  numHours: {type: Number, required:true},
  additionalDetails: { type: String, required: true },
})

const Activity = models.Activity ||  model('Activity', activitySchema);

export default Activity;