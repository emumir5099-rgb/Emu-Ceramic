import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing from environment variables.");
}

const options = {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
  maxPoolSize: 10,
};

const globalWithMongo = globalThis;

const clientPromise =
  globalWithMongo.mongoClientPromise ||
  new MongoClient(uri, options).connect();

if (process.env.NODE_ENV !== "production") {
  globalWithMongo.mongoClientPromise = clientPromise;
}

export default clientPromise;