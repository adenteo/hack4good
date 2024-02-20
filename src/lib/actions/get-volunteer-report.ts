'use server';

import User from '@/models/User';
import Volunteer from '@/models/Volunteer';
import { connectToDB } from '../mongoose';
import Activity from '@/models/Activity';

/**
 * Retrieves a volunteer report based on the provided parameters.
 * @param data - The data to be included in the report.
 * @param timeframe - The timeframe for the report.
 * @param userIds - An array of volunteer IDs.
 * @returns The volunteer report.
 */
export default async function getVolunteerReport(
  data: any,
  timeframe: string,
  userIds: string[], //this is the volunteer ids
) {
  const users: any[] = [];
  for (const id of userIds) {
    const volunteer = await Volunteer.findOne({ _id: id });
    if (volunteer) {
      users.push(volunteer.user.toString());
    }
  }
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
  if (response.status !== 200) {
    return null;
  }
  const res = await response.json();
  return res;
}

export async function fetchVolunteersActivityHistory(
  startDate: Date,
  endDate: Date,
) {
  await connectToDB();
  try {
    const volunteerAndActivities = await Activity.aggregate([
      {
        $match: {
          startTime: { $gte: startDate, $lte: endDate },
          status: 'Completed',
        },
      },
      {
        $unwind: {
          path: '$attendees',
          includeArrayIndex: 'string',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: 'volunteers',
          localField: 'attendees.user',
          foreignField: 'user',
          as: 'attendeeDetails',
        },
      },
      {
        $unwind: {
          path: '$attendeeDetails',
          includeArrayIndex: 'string',
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $project: {
          _id: 0,
          activityId: { $toString: '$_id' },
          title: 1,
          //   numHours: 1,
          startTime: {
            $dateToString: {
              format: '%Y-%m-%dT%H:%M:%S.%LZ',
              date: '$startTime',
            },
          },
          endTime: {
            $dateToString: {
              format: '%Y-%m-%dT%H:%M:%S.%LZ',
              date: '$endTime',
            },
          },
          tags: 1,
          attendanceStatus: '$attendees.attendanceStatus',
          userId: { $toString: '$attendees.user' },
          volunteerStatus: '$attendeeDetails.volunteerStatus',
          citizenshipType: '$attendeeDetails.citizenshipType',
          lastFourDigitsOfNric: '$attendeeDetails.lastFourDigitsOfNric',
          dateOfBirth: '$attendeeDetails.dateOfBirth',
          address: '$attendeeDetails.address',
          drivingLicence: '$attendeeDetails.drivingLicence',
          pwdTrained: '$attendeeDetails.pwdTrained',
          skills: '$attendeeDetails.skills',
          declarations: '$attendeeDetails.declarations',
          fullName: '$attendeeDetails.fullName',
          employmentStatus: '$attendeeDetails.employmentStatus',
          updatedAt: '$attendeeDetails.updatedAt',
          profilePictureUrl: '$attendeeDetails.profilePictureUrl',
          contactNumber: '$attendeeDetails.contactNumber',
          postalCode: '$attendeeDetails.postalCode',
          gender: '$attendeeDetails.gender',
          occupation: '$attendeeDetails.occupation',
          averageSentiment: 1,
        },
      },
    ]).exec();

    return volunteerAndActivities;
  } catch (error) {
    console.error('Error fetching activities with volunteers:', error);
    throw error;
  }
}