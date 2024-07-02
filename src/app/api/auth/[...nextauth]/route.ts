import prisma from "@/lib/prisma";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from "bcrypt";
import NextAuth from "next-auth/next";
import { User } from "@prisma/client";

export const authOptions: AuthOptions = {
  // Add a route to the custom Sign In page, instead of using default next-auth sign in page
  pages: {
    signIn: "/auth/signin",
  },
  // To fix JEWDecryptionFailed error we need to specify the strategy of keeping session of nextauth and add secret to jwt, after this fix you should be able to access session by using the getServerSession function
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",

      // Describes what our credentials are (user and password...) and next-auth can create auto build sign in form with this object
      credentials: {
        username: {
          label: "User Name",
          type: "text",
          placeholder: "Your User Name",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      // Used to authorize the user, when they try to sign in, you could define a whitelist here, for user's that are allowed to sign in/register here
      async authorize(credentials) {
        const user = await prisma.user.findUnique({
          where: {
            email: credentials?.username,
          },
        });

        // Throw error if user not found in database (user does not exist)
        if (!user) {
          throw new Error("User name or password is not correct.");
        }

        // This is naive way of comparing passwords, without hashing
        // const isPasswordCorrect = (credentials?.password === user.password);

        if (!credentials?.password) {
          throw new Error("Please Provide Your Password");
        }

        // First argument needs to be unhashed user passed password, second argument is already hash of the password from database
        const isPasswordCorrect = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordCorrect) {
          throw new Error("User name or password is not correct");
        }

        if (!user.emailVerified) {
          throw new Error("Please verify your email first!");
        }

        // Extract password from user object and return user without the password, because it is not safe to include the password in the returning user object
        const { password, ...userWithoutPass } = user;
        // This returning object will be sent to next-auth session and we will be able to check it
        return userWithoutPass;
      },
    }),
  ],
  // Modify type of user in next auth session and fill out the session from user model from Prisma, also check types.d.ts file in lib folder
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user as User;
      return token;
    },

    async session({ token, session }) {
      session.user = token.user;
      return session;
    },
  },
};

// Don't export handler directly, export as GET and POST
// If you tried to pass handler instead of auth options to getServerSession you would get a null session
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
