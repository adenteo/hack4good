'use server';
import mongoose, { Document } from 'mongoose';
import { connectToDB } from '../mongoose';
import Activity from '@/models/Activity';
import { startOfMonth, endOfMonth, addMonths, isAfter, isBefore } from 'date-fns';

interface IMonthlyDocuments {
  month: number;
  year: number;
  documents: Document[];
}

export async function getDocumentsByDateRange(startDate: Date, endDate: Date): Promise<IMonthlyDocuments[]> {
    await connectToDB(); 
    let monthlyDocuments: IMonthlyDocuments[] = [];
    let currentMonth = startOfMonth(startDate);
    let end = endOfMonth(endDate);

    while (isBefore(currentMonth, end)) {
        let nextMonth = addMonths(currentMonth, 1);
        if (isAfter(nextMonth, end)) {
            nextMonth = end;
        }

        try {
            const documents = await Activity.find({
                startTime: { 
                    $gte: currentMonth,
                    $lt: nextMonth
                }
            }).exec();

            monthlyDocuments.push({
                month: currentMonth.getMonth() + 1, // Month (1-12)
                year: currentMonth.getFullYear(),
                documents
            });

            currentMonth = nextMonth;
        } catch (error) {
            console.error(`Error fetching documents for month ${currentMonth.getMonth() + 1} of ${currentMonth.getFullYear()}:`, error);
            // Depending on your needs, you may decide to throw the error or simply log it and continue
        }
    }
    console.log('monthlyDocuments', monthlyDocuments);
    return monthlyDocuments;
}

// // Usage example with a specific date range
// getDocumentsByDateRange(new Date(2023, 0, 1), new Date(2023, 11, 31))
// .then(monthlyDocs => {
//     monthlyDocs.forEach(monthData => {
//         console.log(`Documents for ${monthData.month}/${monthData.year}:`, monthData.documents);
//     });
// })
// .catch(err => console.error(err));
