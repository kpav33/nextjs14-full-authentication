// "use client";

// import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Image from "next/image";
import { redirect } from "next/navigation";

const ProfilePage = async () => {
  // With client components use useSession hook, with server getServerSession function
  // Client component, retrieves session client side
  //   const { data: session } = useSession();
  //   console.log(session);
  // Server component, retrieves session of next-auth server side
  // Without passing authOptions, we would get a null session, Netlify requires that you dont export this from api route, have to make a separate file or the build will fail
  const session = await getServerSession(authOptions);
  //   console.log("SESSION ", session);
  const user = session?.user;
  //   console.log("USER ", user);

  // Protecting pages in this way works, but it has to be done in every page file, that we want to protect
  // Instead we can use middleware to protect pages
  // Redirect non-authed user
  //   if (!session || !session.user) {
  //     redirect("/auth/signin");
  //   }

  return (
    <div>
      <Image
        height={300}
        width={300}
        src={user?.image ?? "/profile.png"}
        alt={user?.firstName ?? ""}
        className="rounded-full"
      />
      <div className="grid grid-cols-4 gap-y-4">
        <p>First Name:</p> <p className="col-span-3">{user?.firstName}</p>
        <p>Last Name:</p> <p className="col-span-3">{user?.lastName}</p>
        <p>Phone:</p> <p className="col-span-3">{user?.phone}</p>
        <p>Email:</p> <p className="col-span-3">{user?.email}</p>
      </div>
    </div>
  );
};

export default ProfilePage;
