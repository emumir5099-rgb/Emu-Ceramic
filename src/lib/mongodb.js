
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is missing from environment variables.");
}

const options = {
  serverSelectionTimeoutMS: 15000,
  connectTimeoutMS: 15000,
  maxPoolSize: 10,
};

const globalForMongo = globalThis;

const client =
  globalForMongo.mongoClient ??
  new MongoClient(uri, options);

if (!globalForMongo.mongoClient) {
  globalForMongo.mongoClient = client;
}

const clientPromise =
  globalForMongo.mongoClientPromise ??
  client.connect();

if (!globalForMongo.mongoClientPromise) {
  globalForMongo.mongoClientPromise = clientPromise;
}

export { client };
export default clientPromise;
