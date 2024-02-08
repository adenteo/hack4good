import { InferSchemaType, Schema, model, models } from 'mongoose';
import {
  Gender,
  VolunteerStatus,
  CitizenshipType,
  EmploymentStatus,
  volunteerTheme,
  ProfilePictureUrl,
} from './types';

const volunteerSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  fullName: { type: String, required: true },
  email: { type: String, required: true },
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
  profilePictureUrl: {
    type: String,
    enum: Object.values(ProfilePictureUrl),
  },
  lastFourDigitsOfNric: { type: String },
  dateOfBirth: { type: Date, required: true },
  contactNumber: { type: String, required: true },
  address: String,
  postalCode: String,
  employmentStatus: {
    type: String,
    enum: Object.values(EmploymentStatus),
  },
  occupation: String,
  drivingLicence: { type: Boolean, default: false },
  skills: String,
  skillsTags: { type: [String], enum: Object.values(volunteerTheme) },
  declarations: String,
  remark: String,
  pwdTrained: { type: Boolean, default: false },
});

export interface ExtendedVolunteerType extends Omit<VolunteerType, '_id'> {
  _id: string;
}

type VolunteerType = InferSchemaType<typeof volunteerSchema>;

const Volunteer = models.Volunteer || model('Volunteer', volunteerSchema);

export default Volunteer;
export type { VolunteerType };
