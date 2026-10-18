
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing from .env.local");
}

const globalWithMongo = globalThis;

const clientPromise =
  globalWithMongo.mongoClientPromise ||
  new MongoClient(uri).connect();

if (process.env.NODE_ENV !== "production") {
  globalWithMongo.mongoClientPromise = clientPromise;
}

export default clientPromise;
