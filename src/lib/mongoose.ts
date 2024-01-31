import { MongoClient, MongoClientOptions } from 'mongodb';

// Check for the MongoDB URI
if (!process.env.MONGO_URL) {
  throw new Error('Please define the MONGO_URL environment variable inside .env.local');
}

const uri: string = process.env.MONGO_URL;
const options: MongoClientOptions = {};

// Define a variable for the client
let client: MongoClient;
let clientPromise: Promise<MongoClient>;

// Add typings for the NodeJS global type to add TypeScript support for custom globals
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production mode, it's best to not use a global variable.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export default clientPromise;
