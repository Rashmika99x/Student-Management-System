// next-auth.config.js
import { GithubProvider } from '@next-auth/github';

export default {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    // Add other providers if needed
  ],
};
