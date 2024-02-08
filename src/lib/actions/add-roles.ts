'use server';
import { RoleName } from '@/models/types';
import { connectToDB } from '../mongoose';
import Role from '@/models/Role';

export async function addRoles() {
  await connectToDB();

  // List of roles to add
  const roles = [
    { roleName: RoleName.Admin },
    { roleName: RoleName.Volunteer },
    // ... add other roles here
  ];

  // Add each role to the database
  for (const role of roles) {
    const roleDoc = new Role(role);
    await roleDoc.save();
  }
}

addRoles().catch(console.error);
