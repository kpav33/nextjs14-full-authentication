import SignInForm from "@/app/components/SignInForm";
import Link from "next/link";

interface Props {
  searchParams: {
    callbackUrl?: string;
  };
}

const SigninPage = ({ searchParams }: Props) => {
  // Use callback url to get the home page url and pass it to SignInForm
  console.log({ searchParams });

  return (
    <div className="flex items-center justify-center flex-col ">
      <SignInForm callbackUrl={searchParams.callbackUrl} />
      <Link href={"/auth/forgotPassword"}>Forgot Your Password?</Link>
    </div>
  );
};

export default SigninPage;
