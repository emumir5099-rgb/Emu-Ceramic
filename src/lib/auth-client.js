import { createAuthClient } from "better-auth/react";
import { adminClient } from "better-auth/client/plugins";

export const authClient = createAuthClient({
  baseURL: "https://emu-ceramic.vercel.app",
  plugins: [adminClient()],
});
