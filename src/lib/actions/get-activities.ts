'use server';
import { connectToDB } from '../mongoose';
import Activity from '@/models/Activity';

interface SortOptions {
  sortBy: string;
  order: 'asc' | 'desc';
}

export async function getActivities(sortOptions: SortOptions) {
  await connectToDB();
  //TODO: let query = Activity.find(filters);

  // Handle sorting, including special handling for currentVolunteerCount
  if (sortOptions.sortBy === 'currentVolunteerCount') {
    const results = await Activity.aggregate([
      {
        $addFields: {
          currentVolunteerCount: { $size: { $ifNull: ['$attendees', []] } }, // Ensure null safety
        },
      },
      {
        $sort: { currentVolunteerCount: sortOptions.order === 'asc' ? 1 : -1 },
      },
      { $project: { _id: 1 } },
    ]);
    return results.map((result) => result._id.toString());
  } else {
    const sortOrder = sortOptions.order === 'asc' ? 1 : -1;
    const activities = await Activity.find({})
      .sort({ [sortOptions.sortBy]: sortOrder })
      .select('_id');
    return activities.map((activity) => activity._id.toString());
  }
}
interface PaginationOptions {
  pageNumber: number; // The current page number, starting from 1
  pageSize: number; // The number of items per page
}

export async function displayActivities(
  activityIds: string[],
  paginationOptions: PaginationOptions,
) {
  const { pageNumber, pageSize } = paginationOptions;

  // how many documents to skip
  const skip = (pageNumber - 1) * pageSize;

  const activities = await Activity.find({
    _id: { $in: activityIds },
  })
    .skip(skip)
    .limit(pageSize)
    .exec();

  const totalActivities = await Activity.countDocuments({
    _id: { $in: activityIds },
  });

  return {
    activities, // The paginated list of activities
    totalActivities, // The total number of activities matching the initial list of IDs
    currentPage: pageNumber,
    totalPages: Math.ceil(totalActivities / pageSize), //total number of pages
  };
}
