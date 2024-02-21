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

export async function fetchVolunteersActivityHistory() {
  await connectToDB();
  try {
    const volunteerLifetimeData = await Activity.aggregate([
      {
        '$unwind': {
          'path': '$attendees'
        }
      }, {
        '$group': {
          '_id': '$attendees.user', 
          'totalHours': {
            '$sum': '$numHours'
          }, 
          'numberOfActivities': {
            '$sum': 1
          }, 
          'ElderlyCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Elderly', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'TeachingCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Teaching', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'EnvironmentCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Environment', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'AnimalsCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Animals', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'PlantsCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Plants', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'HeritageCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Heritage', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'HealthCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Health', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'LiteracyCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Literacy', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'RefugeesCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Refugees', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'FoodCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Food', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'CookingCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Cooking', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'ChildrenCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Children', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'EducationCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Education', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'RescueCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Rescue', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'ArtsCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Arts', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'AccessibilityCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Accessibility', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'SportsCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Sports', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'MedicalCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Medical', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'LegalCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Legal', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'IncomeCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Income', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'WaterCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Water', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'EnergyCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Energy', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'ParentingCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Parenting', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'FinanceCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Finance', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'RecoveryCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Recovery', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'RehabilitationCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Rehabilitation', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'DigitalCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Digital', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'CharityCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Charity', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'OverseasCount': {
            '$sum': {
              '$cond': [
                {
                  '$in': [
                    'Overseas', '$tags'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'attendancePresent': {
            '$sum': {
              '$cond': [
                {
                  '$eq': [
                    '$attendees.attendanceStatus', 'Present'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'attendanceAbsent': {
            '$sum': {
              '$cond': [
                {
                  '$eq': [
                    '$attendees.attendanceStatus', 'Absent'
                  ]
                }, 1, 0
              ]
            }
          }, 
          'attendanceUnconfirmed': {
            '$sum': {
              '$cond': [
                {
                  '$eq': [
                    '$attendees.attendanceStatus', 'Unconfirmed'
                  ]
                }, 1, 0
              ]
            }
          }
        }
      }, {
        '$lookup': {
          'from': 'volunteers', 
          'localField': '_id', 
          'foreignField': 'user', 
          'as': 'volunteerDetails'
        }
      }, {
        '$project': {
          '_id': 0, 
          'userId': '$_id', 
          'totalHours': 1, 
          'numberOfActivities': 1, 
          'ElderlyCount': 1, 
          'TeachingCount': 1, 
          'EnvironmentCount': 1, 
          'AnimalsCount': 1, 
          'PlantsCount': 1, 
          'HeritageCount': 1, 
          'HealthCount': 1, 
          'LiteracyCount': 1, 
          'RefugeesCount': 1, 
          'FoodCount': 1, 
          'CookingCount': 1, 
          'ChildrenCount': 1, 
          'EducationCount': 1, 
          'RescueCount': 1, 
          'ArtsCount': 1, 
          'AccessibilityCount': 1, 
          'SportsCount': 1, 
          'MedicalCount': 1, 
          'LegalCount': 1, 
          'IncomeCount': 1, 
          'WaterCount': 1, 
          'EnergyCount': 1, 
          'ParentingCount': 1, 
          'FinanceCount': 1, 
          'RecoveryCount': 1, 
          'RehabilitationCount': 1, 
          'DigitalCount': 1, 
          'CharityCount': 1, 
          'OverseasCount': 1, 
          'attendancePresent': 1, 
          'attendanceAbsent': 1, 
          'attendanceUnconfirmed': 1, 
          'fullName': {
            '$arrayElemAt': [
              '$volunteerDetails.fullName', 0
            ]
          }, 
          'email': {
            '$arrayElemAt': [
              '$volunteerDetails.email', 0
            ]
          }, 
          'volunteerStatus': {
            '$arrayElemAt': [
              '$volunteerDetails.volunteerStatus', 0
            ]
          }, 
          'gender': {
            '$arrayElemAt': [
              '$volunteerDetails.gender', 0
            ]
          }, 
          'updatedAt': {
            '$arrayElemAt': [
              '$volunteerDetails.updatedAt', 0
            ]
          }, 
          'citizenshipType': {
            '$arrayElemAt': [
              '$volunteerDetails.citizenshipType', 0
            ]
          }, 
          'dateOfBirth': {
            '$arrayElemAt': [
              '$volunteerDetails.dateOfBirth', 0
            ]
          }, 
          'contactNumber': {
            '$arrayElemAt': [
              '$volunteerDetails.contactNumber', 0
            ]
          }, 
          'address': {
            '$arrayElemAt': [
              '$volunteerDetails.address', 0
            ]
          }, 
          'postalCode': {
            '$arrayElemAt': [
              '$volunteerDetails.postalCode', 0
            ]
          }, 
          'employmentStatus': {
            '$arrayElemAt': [
              '$volunteerDetails.employmentStatus', 0
            ]
          }, 
          'occupation': {
            '$arrayElemAt': [
              '$volunteerDetails.occupation', 0
            ]
          }, 
          'drivingLicence': {
            '$arrayElemAt': [
              '$volunteerDetails.drivingLicence', 0
            ]
          }, 
          'pwdTrained': {
            '$arrayElemAt': [
              '$volunteerDetails.pwdTrained', 0
            ]
          }
        }
      }
    ]).exec();

    return volunteerLifetimeData;
  } catch (error) {
    console.error('Error fetching activities with volunteers:', error);
    throw error;
  }
}
