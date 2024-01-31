// src/models/Role.ts
import mongoose, { Document, Schema, Model } from 'mongoose';
import { RoleName } from './types';

export interface IRole extends Document {
  roleName: RoleName;
}

const roleSchema: Schema<IRole> = new Schema({
  roleName: { 
    type: String, 
    enum: Object.values(RoleName), 
    required: true 
  },
});

const Role: Model<IRole> = mongoose.model<IRole>('Role', roleSchema);

export default Role;
