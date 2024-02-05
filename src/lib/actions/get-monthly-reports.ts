'use server';
import mongoose, { Document } from 'mongoose';
import { connectToDB } from '../mongoose';
import Activity from '@/models/Activity';
import { startOfMonth, endOfMonth, addMonths, isAfter } from 'date-fns';

interface IMonthlyDocuments {
  month: number;
  year: number;
  documents: Document[];
}

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

  console.log('monthlyDocuments', monthlyDocuments);
  return monthlyDocuments;
}
