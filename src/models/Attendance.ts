// src/models/Attendance.ts
import {Schema, model, models } from 'mongoose';
import { AttendanceStatus } from './types';


const attendanceSchema = new Schema({
  project: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  role: { type: String, required: true },
  status: { 
    type: String, 
    enum: Object.values(AttendanceStatus), 
    default: AttendanceStatus.Unconfirmed 
  },
});

const Attendance = models.Attendance || model('Attendance', attendanceSchema);

export default Attendance;
