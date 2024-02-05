// src/models/Volunteer.ts
import { Schema, model, models } from 'mongoose';
import {
  Gender,
  VolunteerStatus,
  CitizenshipType,
  EmploymentStatus,
  DrivingLicence,
} from './types';

const volunteerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  volunteerStatus: {
    type: String,
    enum: Object.values(VolunteerStatus),
    default: VolunteerStatus.Active,
  },
  gender: {
    type: String,
    enum: Object.values(Gender),
    required: true,
  },
  updatedAt: { type: Date, default: Date.now },
  citizenshipType: {
    type: String,
    enum: Object.values(CitizenshipType),
    required: true,
  },
  emailAddress: { type: String, required: true },
  profilePictureUrl: String,
  lastFourDigitsOfNric: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  contactNumber: String,
  address: String,
  postalCode: String,
  employmentStatus: {
    type: String,
    enum: Object.values(EmploymentStatus),
    required: true,
  },
  occupation: String,
  drivingLicence: String,
  skills: String,
  declarations: String,
  remark: String,
  experienceWithPwid: String,
});

const Volunteer = models.Volunteer || model('Volunteer', volunteerSchema);

export default Volunteer;
