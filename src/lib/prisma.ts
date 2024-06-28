// Everytime we need to run CRUD operation, we need to instantiate a new instance of Prisma client, with frequent operations, this is a bad idea, to keep on creating new instances
// Better to create a single global Prisma client and keep using it all over in our app

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
};

// Check for global prisma client first, if not make a new one
export const prisma = globalForPrisma.prisma || new PrismaClient();

// If not in production, we keep that prisma instance in global prisma object
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export default prisma;
