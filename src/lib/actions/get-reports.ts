'use server';
import { connectToDB } from '../mongoose';
import Activity from '@/models/Activity';

/**
 * Fetches completed activities with volunteers within a specified date range.
 * @param startDate The start date of the range.
 * @param endDate The end date of the range.
 * @returns A promise that resolves to an array of activities with volunteer details.
 * @throws If there is an error fetching the activities with volunteers.
 */
export async function fetchCompletedActivitiesWithVolunteers(
  startDate: Date,
  endDate: Date,
) {
  await connectToDB();
  try {
    const activitiesWithVolunteers = await Activity.aggregate([
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

    return activitiesWithVolunteers;
  } catch (error) {
    console.error('Error fetching activities with volunteers:', error);
    throw error;
  }
}

import { unparse } from 'papaparse';
import { writeFile } from 'fs';
import { promisify } from 'util';

// Convert writeFile into a promise so we can use it with async/await
const writeFileAsync = promisify(writeFile);
export async function saveActivitiesToCSV(
  activitiesWithVolunteers: any[],
  filePath: string,
): Promise<void> {
  try {
    // Convert JSON to CSV
    const csvResult = unparse(activitiesWithVolunteers);
    await writeFileAsync(filePath, csvResult);
  } catch (error) {
    console.error('Error saving CSV:', error);
    throw error;
  }
}
