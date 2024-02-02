// src/models/Certificate.ts
import {Schema, model, models } from 'mongoose';
import { CertificateType } from './types';

const certificateSchema = new Schema({
  volunteer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  project: { type: Schema.Types.ObjectId, ref: 'Activity', required: true },
  type: { 
    type: String, 
    enum: Object.values(CertificateType), 
    required: true 
  },
  issuedDate: { type: Date, default: Date.now },
});

const Certificate = models.Certificate || model('Certificate', certificateSchema);

export default Certificate;
