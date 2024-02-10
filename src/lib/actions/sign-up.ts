'use server';

import { z } from 'zod';
import { signUpSchema } from '../validators/auth-validator';
import { connectToDB } from '../mongoose';
import User from '@/models/User';
import bcrypt from 'bcrypt';
import Role from '@/models/Role';

/**
 * Handles the sign-up process for a user.
 * @param values - The sign-up form values.
 * @returns An object containing either the created user or an error message.
 */
export default async function onSignUp(values: z.infer<typeof signUpSchema>) {
  await connectToDB();
  const user = await User.findOne({ email: values.email });
  if (user) {
    return {
      error: 'Email already exists.',
    };
  }

  const hashedPassword = await bcrypt.hash(values.password, 10);
  const createdUser = await User.create({
    firstName: values.firstName,
    lastName: values.lastName,
    email: values.email,
    password: hashedPassword,
    isAdmin: false,
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
