
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { admin } from "better-auth/plugins";
import { client } from "@/lib/mongodb";

const authSecret = process.env.BETTER_AUTH_SECRET;
const authUrl = process.env.BETTER_AUTH_URL;

if (!authSecret) {
  throw new Error("BETTER_AUTH_SECRET is missing");
}

if (!authUrl) {
  throw new Error("BETTER_AUTH_URL is missing");
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
    "http://localhost:3000",
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
