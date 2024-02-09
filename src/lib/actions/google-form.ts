'use server';
import type { NextApiRequest, NextApiResponse } from 'next';
import { google } from 'googleapis';
import Volunteer from '@/models/Volunteer';
import User from '@/models/User';

type SheetForm = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export default async function googleForm(volunteerIds: string[]) {
  const users: any[] = [];
  for (const id of volunteerIds) {
    const volunteer = await Volunteer.findOne({ _id: id });
    const user = await User.findOne({ _id: volunteer!.user });
    if (volunteer && user) {
      console.log(volunteer);
      console.log(user);
      try {
        const auth = new google.auth.GoogleAuth({
          credentials: {
            client_email: process.env.GOOGLE_CLIENT_EMAIL,
            private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
          },
          scopes: [
            'https://www.googleapis.com/auth/drive',
            'https://www.googleapis.com/auth/drive.file',
            'https://www.googleapis.com/auth/spreadsheets',
          ],
        });
        const sheets = google.sheets({
          auth,
          version: 'v4',
        });
        const response = await sheets.spreadsheets.values.append({
          spreadsheetId: process.env.GOOGLE_SHEET_ID,
          range: 'A:C',
          valueInputOption: 'USER_ENTERED',
          requestBody: {
            values: [
              [
                volunteer.fullName,
                user.email,
                user.totalHours,
                user.totalEvents,
              ],
            ],
          },
        });
      } catch (e: any) {
        return { error: e.message };
      }
    }
  }
}

// export default async function handler(
//     req: NextApiRequest,
//     res: NextApiResponse
// ) {
//     if (req.method !== 'POST') {
//         return res.status(405).send({ message: 'Only POST requests allowed' })
//     }

//     const body = req.body as SheetForm

//     try {
//         const auth = new google.auth.GoogleAuth({
//             credentials: {
//                 client_email: process.env.GOOGLE_CLIENT_EMAIL,
//                 private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n')
//             },
//             scopes: [
//                 'https://www.googleapis.com/auth/drive',
//                 'https://www.googleapis.com/auth/drive.file',
//                 'https://www.googleapis.com/auth/spreadsheets'
//             ]
//         })

//         const sheets = google.sheets({
//             auth,
//             version: 'v4'
//         });

//         const response = await sheets.spreadsheets.values.append({
//             spreadsheetId: process.env.GOOGLE_SHEET_ID,
//             range: 'A1:D1',
//             valueInputOption: 'USER_ENTERED',
//             requestBody: {
//                 values: [
//                     [body.name, body.email, body.phone, body.message]
//                 ]
//             }
//         });

//         return res.status(201).json({
//             data: response.data
//         })
//     }catch (e) {
//         return res.status(e.code).send({message: e.message})
//     }

// }
