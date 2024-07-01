import React from "react";
// import { sendMail } from "@/lib/mail";

// https://www.youtube.com/watch?v=Xa73Xr8PM2k => Tutorial
// https://github.com/vahid-nejad/Nextjs14-Comprehensive-authentication-Course => Original repo

// npx prisma init --datasource-provider sqlite => Setup Prisma with Sqlite as database
//  npx prisma migrate dev --name first migration => Don't forget to migrate prisma when adding changes to the schema!
// npx prisma studio => Open Prisma studio

export default async function Home() {
  // await sendMail({
  //   to: "klemenpavlovic@gmail.com",
  //   subject: "test",
  //   body: "hello world",
  // });

  return (
    <main>
      <div>Hello World!</div>
    </main>
  );
}
