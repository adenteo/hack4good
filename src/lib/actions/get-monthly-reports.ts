'use server';
import { Document } from 'mongoose';
import { connectToDB } from '../mongoose';
import Activity from '@/models/Activity';
import { startOfMonth, endOfMonth, addMonths, isAfter } from 'date-fns';

interface IMonthlyDocuments {
  month: number;
  year: number;
  documents: Document[];
}

/**
 * Retrieves monthly documents within a specified date range.
 * @param startDate The start date of the range.
 * @param endDate The end date of the range.
 * @returns A promise that resolves to an array of monthly documents.
 */
export async function getDocumentsByDateRange(
  startDate: Date,
  endDate: Date,
): Promise<IMonthlyDocuments[]> {
  await connectToDB();

  const monthlyDocuments: any[] = [];
  let currentMonth = startOfMonth(startDate);
  const end = endOfMonth(endDate);

  for (;;) {
    if (isAfter(currentMonth, end)) {
      break;
    }

    const nextMonth = addMonths(currentMonth, 1);
    const documents = await Activity.find({
      startTime: {
        $gte: currentMonth,
        $lt: nextMonth,
      },
    }).exec();
    const documentsString = JSON.stringify(documents);
    monthlyDocuments.push({
      month: currentMonth.getMonth() + 1, // Month (1-12)
      year: currentMonth.getFullYear(),
      documents: JSON.parse(documentsString),
    });

    currentMonth = nextMonth;
  }

  return monthlyDocuments;
}
