// src/models/User.ts
import mongoose, { Document, Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import { RoleName, UserStatus } from './types';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  userStatus: UserStatus;
  createdAt: Date;
  title?: string;
  roleId: mongoose.Types.ObjectId; // Assuming Role is another collection
}

const userSchema: Schema<IUser> = new Schema({
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

// Password encryption
userSchema.pre<IUser>('save', async function (next) {
  // Only encrypt if the password is new or has been modified
  if (!this.isModified('password')) return next();

  // Generate salt and hash the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
