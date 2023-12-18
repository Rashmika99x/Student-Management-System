import NextAuth, { Session, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import clientPromise from "../../../lib/mongodb";
import bcrypt from "bcrypt";    

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string
    }),
    // CredentialsProvider({
    //     name: 'Credentials',
    //     authorize: async (credentials) => {
    //     const { email, password } = credentials;
    //     const client = await clientPromise;
    //     const db = client.db();
    //     const studentsCollection = db.collection("students");

    //     // Fetch user from database by email
    //     const user = await studentsCollection.findOne({ email })

    //     if (!user) {
    //         // User not found
    //         return null
    //     }

    //     // Compare user-provided password with stored hash
    //     const isMatch = await bcrypt.compare(password, user.password)
  
    //       if (!isMatch) {
    //         // Invalid password
    //         return null
    //       }
  
    //       // Successful login - return user data
    //       return user;
    //     },
    //   }),
  ],
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
    newUser: "",
  },
  callbacks: {
    async jwt(params) {
      const { token, user, account, profile, isNewUser } = params;
      // Add user id from the database to the token
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
  }
});
