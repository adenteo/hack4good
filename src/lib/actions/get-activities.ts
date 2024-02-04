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
            { $addFields: { 
                currentVolunteerCount: { $size: { $ifNull: ["$attendees", []] } } // Ensure null safety 
                } },
            { $sort: { currentVolunteerCount: sortOptions.order === 'asc' ? 1 : -1 } },
            { $project: { _id: 1 } }
        ]);
        return results.map(result => result._id.toString());
    } else {
        const sortOrder = sortOptions.order === 'asc' ? 1 : -1;
        const activities = await Activity.find({})
                                        .sort({ [sortOptions.sortBy]: sortOrder })
                                        .select('_id');
    return activities.map(activity => activity._id.toString());
    }
}

//// Example usage
//const filters = {}; // Add any filters you want to apply
//const sortOptions = {
//sortBy: 'name', // or any other field like 'day', 'startTime', etc.
//order: 'asc' // or 'desc'
//};
//
//getActivities(filters, sortOptions)
//.then(activityIds => console.log(activityIds))
//.catch(error => console.error(error));

interface PaginationOptions {
    pageNumber: number; // The current page number, starting from 1
    pageSize: number; // The number of items per page
}
  
export async function displayActivities(activityIds: string[], paginationOptions: PaginationOptions) {
const { pageNumber, pageSize } = paginationOptions;

// how many documents to skip
const skip = (pageNumber - 1) * pageSize;

const activities = await Activity.find({
    '_id': { $in: activityIds }
})
.skip(skip)
.limit(pageSize)
.exec();

const totalActivities = await Activity.countDocuments({
    '_id': { $in: activityIds }
});

return {
    activities, // The paginated list of activities
    totalActivities, // The total number of activities matching the initial list of IDs
    currentPage: pageNumber,
    totalPages: Math.ceil(totalActivities / pageSize), //total number of pages
};
}

//// Example usage
//const activityIds = ['601d...','602e...', '603f...']; // List of activity IDs you've got from getActivities
//const paginationOptions = {
//pageNumber: 1, // e.g., page 1
//pageSize: 10 // e.g., 10 results per page
//};
//
//displayActivities(activityIds, paginationOptions)
//.then(result => {
//    console.log('Paginated Activities:', result.activities);
//    console.log(`Page ${result.currentPage} of ${result.totalPages}`);
//})
//.catch(error => console.error(error));

