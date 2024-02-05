import mongoose, { Document } from 'mongoose';
import { connectToDB } from '../mongoose';
import Activity from '@/models/Activity';

interface IMonthlyDocuments {
  month: number;
  year: number;
  documents: Document[];
}

async function getDocumentsByDateRange(startDate: Date, endDate: Date): Promise<IMonthlyDocuments[]> {
    await connectToDB(); // Assume this connects your database correctly

    let monthlyDocuments: IMonthlyDocuments[] = [];
    let currentMonth = startDate.getMonth();
    let currentYear = startDate.getFullYear();

    while (currentYear < endDate.getFullYear() || (currentYear === endDate.getFullYear() && currentMonth <= endDate.getMonth())) {
        // Define start of the month
        let monthStart = new Date(currentYear, currentMonth, 1);

        // Define end of the month
        let monthEnd = new Date(currentYear, currentMonth + 1, 1);
        if (monthEnd > endDate) monthEnd = endDate;

        try {
            const documents = await Activity.find({
                date: { 
                    $gte: monthStart,
                    $lt: monthEnd
                }
            }).exec();

            monthlyDocuments.push({
                month: currentMonth + 1, // Month (1-12)
                year: currentYear,
                documents
            });

            // Move to the next month
            currentMonth++;
            if (currentMonth > 11) {
                currentMonth = 0;
                currentYear++;
            }
        } catch (error) {
            console.error(`Error fetching documents for month ${currentMonth + 1} of ${currentYear}:`, error);
            // Depending on your needs, you may decide to throw the error or simply log it and continue
        }
    }
    return monthlyDocuments;
}

// Usage example with a specific date range
getDocumentsByDateRange(new Date(2023, 0, 1), new Date(2023, 11, 31))
.then(monthlyDocs => {
    monthlyDocs.forEach(monthData => {
        console.log(`Documents for ${monthData.month}/${monthData.year}:`, monthData.documents);
    });
})
.catch(err => console.error(err));
