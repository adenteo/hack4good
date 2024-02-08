'use server';

import User from '@/models/User';
import Volunteer from '@/models/Volunteer';

export default async function getVolunteerReport(
  data: any,
  timeframe: string,
  userIds: string[], //this is the volunteer ids
) {
  const users: any[] = [];
  for (const id of userIds) {
    console.log(id);
    const volunteer = await Volunteer.findOne({ _id: id });
    if (volunteer) {
      users.push(volunteer.user.toString());
    }
  }
  console.log(
    JSON.stringify({
      data: data,
      user_ids: users,
      timeframe: timeframe,
    }),
  );
  const response = await fetch(
    'https://ldgq64kjgaptfznkajto4nooru0khzbm.lambda-url.ap-southeast-1.on.aws/',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: data,
        user_ids: users,
        timeframe: timeframe,
      }),
    },
  );
  console.log(response.status);
  if (response.status !== 200) {
    return null;
  }
  const res = await response.json();
  return res;
}
