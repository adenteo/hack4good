// src/models/Role.ts
import {Schema, model, models } from 'mongoose';
import { RoleName } from './types';


const roleSchema = new Schema({
  roleName: { 
    type: String, 
    enum: Object.values(RoleName), 
    required: true 
  },
});

const Role = models.Role || model('Role', roleSchema);

export default Role;
