// src/models/User.ts
import {Schema, model, models } from 'mongoose';
import { RoleName, UserStatus } from './types';

const userSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userStatus: {
    type: String,
    enum: Object.values(UserStatus),
    default: UserStatus.Active,
  },
  createdAt: { type: Date, default: Date.now },
  title: String,
  roleId: { type: Schema.Types.ObjectId, ref: 'Role' },
});

const User = models.User || model('User', userSchema);

export default User;
