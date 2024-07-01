"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/20/solid";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn } from "next-auth/react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";
// import NextAuthProviders from "./NextAuthProviders";

// Interface for component props, which will be callback url of String type
interface Props {
  callbackUrl?: string;
}

// Setup zod for schema
const FormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string({
    required_error: "Please enter your password",
  }),
});

// Infer types from FormSchema
type InputType = z.infer<typeof FormSchema>;

const SignInForm = (props: Props) => {
  //   console.log(props);
  const router = useRouter();
  // Change password visibility button
  const [visiblePass, setVisiblePass] = useState(false);
  // Use InputType as type for the form, pass zod resolver as resolver of the form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InputType>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit: SubmitHandler<InputType> = async (data) => {
    // Specify provider for sign in!
    // When this function is executed, it passes the data and calls the authorize function, which is defined in nextauth catch all route, so any changes in sign in behavior can be setup there
    const result = await signIn("credentials", {
      redirect: false,
      username: data.email,
      password: data.password,
    });
    if (!result?.ok) {
      toast.error(result?.error);
      return;
    }
    toast.success("Welcome To Next Auth!");
    // Redirect the user
    router.push(props.callbackUrl ? props.callbackUrl : "/");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 border rounded-md shadow overflow-hidden w-full"
    >
      <div className="bg-gradient-to-b from-white to-slate-200 dark:from-slate-700 dark:to-slate-900 p-2 text-center">
        Sign In Form
      </div>
      <div className="p-2 flex flex-col gap-2">
        <Input
          label="Email"
          {...register("email")}
          errorMessage={errors.email?.message}
        />
        <Input
          label="Password"
          {...register("password")}
          type={visiblePass ? "text" : "password"}
          errorMessage={errors.password?.message}
          endContent={
            <button
              type="button"
              onClick={() => setVisiblePass((prev) => !prev)}
            >
              {visiblePass ? (
                <EyeSlashIcon className="w-4" />
              ) : (
                <EyeIcon className="w-4" />
              )}
            </button>
          }
        />
        <div className="flex items-center justify-center gap-2">
          <Button
            color="primary"
            type="submit"
            disabled={isSubmitting}
            isLoading={isSubmitting}
          >
            {isSubmitting ? "Signing In..." : "Sign In"}
          </Button>
          <Button as={Link} href="/auth/signup">
            Sign Up
          </Button>
        </div>
      </div>
      {/* <NextAuthProviders /> */}
    </form>
  );
};

export default SignInForm;
