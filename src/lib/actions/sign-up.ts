'use server';

import { z } from 'zod';
import { signUpSchema } from '../validators/auth-validator';
import { connectToDB } from '../mongoose';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import Role from '@/models/Role';

export default async function onSignUp(values: z.infer<typeof signUpSchema>) {
  await connectToDB();
  const user = await User.findOne({ email: values.email });
  if (user) {
    return {
      error: 'Email already exists.',
    };
  }

  const defaultRole = await Role.findOne({ roleName: 'Volunteer' });
  if (!defaultRole) {
    return {
      error: 'Default role not found.',
    };
  }

  const hashedPassword = await bcrypt.hash(values.password, 10);
  const createdUser = await User.create({
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: hashedPassword,
    roleId: defaultRole._id,
  });

  if (createdUser) {
    return {
      user: createdUser,
    };
  }
  return {
    error: 'Something went wrong.',
  };
}
