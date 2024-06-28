import { User } from "@prisma/client";

// Define next-auth session as model User from Prisma
declare module "next-auth" {
  interface Session {
    user: User;
  }
}

// Define type for JWT
declare module "next-auth/jwt" {
  interface JWT {
    user: User;
  }
}

// declare module NodeJS {
//   interface ProcessEnv {
//     SMPT_EMAIL: string;
//     SMTP_GMAIL_PASS: string;
//   }
// }
