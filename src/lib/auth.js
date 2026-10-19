
import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";

const mongoUri = process.env.MONGODB_URI;
const authSecret = process.env.BETTER_AUTH_SECRET;
const authUrl = process.env.BETTER_AUTH_URL;

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing");
}

if (!authSecret) {
  throw new Error("BETTER_AUTH_SECRET is missing");
}

if (!authUrl) {
  throw new Error("BETTER_AUTH_URL is missing");
}

const globalForAuthMongo = globalThis;

const client =
  globalForAuthMongo.authMongoClient ??
  new MongoClient(mongoUri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    maxPoolSize: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalForAuthMongo.authMongoClient = client;
}

const db = client.db();

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  secret: authSecret,
  baseURL: authUrl,

  trustedOrigins: [
    "https://emu-ceramic.vercel.app",
    "https://emu-ceramic-git-main-emu-mirs-projects.vercel.app",
    "https://emu-ceramic-l9qsuf364-emu-mirs-projects.vercel.app",
    "http://localhost:3000"
  ],

  emailAndPassword: {
    enabled: true,
  },

  plugins: [
    admin({
      defaultRole: "user",
    }),
  ],
});
