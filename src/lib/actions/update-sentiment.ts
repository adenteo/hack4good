'use server';
import Activity from '@/models/Activity';
import { connectToDB } from '../mongoose';
import { Faker, faker } from '@faker-js/faker';

export default async function updateSentiment() {
  await connectToDB();
  const activities = await Activity.find();

  for (const activity of activities) {
    const randomSentiment = faker.datatype.number({ min: 1, max: 5 });
    await Activity.updateOne(
      { _id: activity._id },
      { averageSentiment: randomSentiment },
    );
  }
  console.log('updated');
}
