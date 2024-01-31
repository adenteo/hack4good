// src/models/Certificate.ts
import mongoose, { Document, Schema, Model } from 'mongoose';
import { CertificateType } from './types';

export interface ICertificate extends Document {
  volunteer: mongoose.Types.ObjectId; // References User model
  project: mongoose.Types.ObjectId; // References Activity model
  type: CertificateType;
  issuedDate: Date;
}

const certificateSchema: Schema<ICertificate> = new Schema({
  volunteer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
  type: { 
    type: String, 
    enum: Object.values(CertificateType), 
    required: true 
  },
  issuedDate: { type: Date, default: Date.now },
});

const Certificate: Model<ICertificate> = mongoose.model('Certificate', certificateSchema);

export default Certificate;
