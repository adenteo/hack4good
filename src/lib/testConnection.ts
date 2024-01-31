import 'dotenv/config';
import connectMongo, { db } from './mongoose';

async function testConnection() {
  try {
    await connectMongo();
    console.log('Database connection test completed.');
  } catch (error) {
    console.error('Database connection test failed:', error);
  } finally {
    await db.close();
  }
}

testConnection();
