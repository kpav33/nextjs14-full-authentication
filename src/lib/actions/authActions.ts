// This way every function inside it is a server action
"use server";

import { User } from "@prisma/client";
import prisma from "../prisma";
import * as bcrypt from "bcrypt";
import { compileActivationTemplate, sendMail } from "../mail";

// Omit the id from the User type, since id is auto generated
export async function registerUser(
  user: Omit<User, "id" | "emailVerified" | "image">
) {
  const result = await prisma.user.create({
    data: { ...user, password: await bcrypt.hash(user.password, 10) },
  });

  // Not safe to pass id as part of url, will be fixed later
  const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${result.id}`;
  // const activationUrl = `${process.env.NEXTAUTH_URL}/auth/activation/${jwtUserId}`;
  const body = compileActivationTemplate(user.firstName, activationUrl);
  await sendMail({ to: user.email, subject: "Activate Your Account", body });
  return result;
}
