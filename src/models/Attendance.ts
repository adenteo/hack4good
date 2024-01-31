// src/models/Attendance.ts
import mongoose, { Document, Schema, Model } from 'mongoose';
import { AttendanceStatus } from './types';

export interface IAttendance extends Document {
  project: mongoose.Types.ObjectId; // References Activity model
  user: mongoose.Types.ObjectId; // References User model
  role: string; // The role could be detailed further based on your application logic
  status: AttendanceStatus;
}

const attendanceSchema: Schema<IAttendance> = new Schema({
  project: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  status: { 
    type: String, 
    enum: Object.values(AttendanceStatus), 
    default: AttendanceStatus.Unconfirmed 
  },
});

const Attendance: Model<IAttendance> = mongoose.model('Attendance', attendanceSchema);

export default Attendance;
