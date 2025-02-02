"use client";

import { Button } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";

const SigninButton = () => {
  const { data: session } = useSession();
  // console.log(session);

  return (
    <div className="flex items-center gap-2">
      {session && session.user ? (
        <>
          <Link
            href={"/profile"}
          >{`${session.user.firstName} ${session.user.lastName}`}</Link>
          <Link
            className="tex-sky-500 hover:text-sky-600 transition-colors"
            href={"/api/auth/signout"}
          >
            Sign Out
          </Link>
        </>
      ) : (
        // <>
        //   <p>{`${session.user.firstName} ${session.user.lastName}`}</p>
        //   <Link
        //     className="tex-sky-500 hover:text-sky-600 transition-colors"
        //     href={"/api/auth/signout"}
        //   >
        //     Sign Out
        //   </Link>
        // </>
        <>
          {/* This will redirect us to sign in page, that we defined in catch all route */}
          <Button onClick={() => signIn()}>Sign In</Button>
          <Button as={Link} href={"/auth/signup"}>
            Sign Up
          </Button>
        </>
        // <>
        //   <Button as={Link} href="/api/auth/signin">
        //     Sign In
        //   </Button>
        //   <Button as={Link} href="/auth/signup">
        //     Sign Up
        //   </Button>
        // </>
      )}
    </div>
  );
};

export default SigninButton;
