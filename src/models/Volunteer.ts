// src/models/Volunteer.ts
import mongoose, { Schema, Document, Model } from 'mongoose';
import { Gender, VolunteerStatus, CitizenshipType, EmploymentStatus, DrivingLicence } from './types';

export interface IVolunteer extends Document {
  user: mongoose.Types.ObjectId; // Inherit user ID
  volunteerStatus: VolunteerStatus;
  gender: Gender;
  updatedAt: Date;
  citizenshipType: CitizenshipType;
  emailAddress: string;
  profilePictureUrl?: string;
  lastFourDigitsOfNric: string;
  dateOfBirth: Date;
  contactNumber: number;
  address: string;
  postalCode: string;
  employmentStatus: EmploymentStatus;
  occupation: string;
  drivingLicence?: string;
  skills?: string;
  declarations?: string; // Assuming 'Declarations (medical records, criminal history)' is a single field
  remark?: string;
  experienceWithPwid?: string;
}

const volunteerSchema = new Schema<IVolunteer>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  volunteerStatus: { 
    type: String, 
    enum: Object.values(VolunteerStatus), 
    default: VolunteerStatus.Active 
  },
  gender: {
    type: String,
    enum: Object.values(Gender),
    required: true
  },
  updatedAt: { type: Date, default: Date.now },
  citizenshipType: {
    type: String,
    enum: Object.values(CitizenshipType),
    required: true
  },
  emailAddress: { type: String, required: true },
  profilePictureUrl: String,
  lastFourDigitsOfNric: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  contactNumber: Number,
  address: String,
  postalCode: String,
  employmentStatus: {
    type: String,
    enum: Object.values(EmploymentStatus),
    required: true
  },
  occupation: String,
  drivingLicence: String,
  skills: String,
  declarations: String,
  remark: String,
  experienceWithPwid: String,
});

const Volunteer: Model<IVolunteer> = mongoose.model('Volunteer', volunteerSchema);

export default Volunteer;
