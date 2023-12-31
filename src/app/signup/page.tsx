"use client";

import Image from "next/image";
import Button from "@/components/Button";
import Link from "next/link";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import signUpValidationSchema from "@/schemas/SignUpValidation";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { AiOutlineWarning } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";

// Types for SignUpInputs
type Inputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUp = () => {
  // React Hook Form
  const form = useForm<Inputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onTouched",
    resolver: yupResolver(signUpValidationSchema), // yup resolver for validation
  });

  // Destructure functions and properties from form
  const { register, handleSubmit, reset, formState } = form;
  const { errors, isSubmitting, isValid, isSubmitSuccessful } = formState;

  // Reset Form
  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  // Session and Router
  const session = useSession();

  // If session is loading, show loading screen and if session is authenticated, redirect to profile page
  if (session.status === "loading") {
    return <LoadingScreen />;
  } else if (session.status === "authenticated") {
    redirect("/profile");
  }

  // Submit Handler
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const res = await response.json();

    // Message from server if success or error display to user
    const message = await res.message;

    // Notification Toast
    if (response.ok) {
      toast.success(`${message}`, {
        position: toast.POSITION.TOP_CENTER,
        draggable: false,
      });
    } else {
      toast.error(`${message}`, {
        position: toast.POSITION.TOP_CENTER,
        draggable: false,
      });
      console.log(message);
    }
  };

  return (
    <div className="h-full my-auto">
      <div className="my-4 dark:bg-zinc-800 bg-violet-100 max-w-lg w-full border-2 dark:border-zinc-700 border-violet-200 shadow-md p-3 rounded-md mx-auto">
        <ToastContainer />
        <h2 className="text-2xl text-center font-semibold">Sign Up</h2>
        <Image
          className="mx-auto w-14 h-14 mt-4"
          src={"/logo.png"}
          width={80}
          height={80}
          alt="LR Blog"
        />

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 max-w-md mx-auto my-4"
          noValidate
        >
          <div className="flex flex-col sm:flex-row w-full gap-3">
            <div className="flex flex-1 flex-col">
              <label className="text-lg" htmlFor="firstName">
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                placeholder="Enter your first name..."
                className={`border-2 dark:caret-zinc-100 outline-none px-2 py-1 rounded dark:text-zinc-200 text-zinc-800 ${
                  errors.firstName
                    ? "border-red-500"
                    : "dark:border-zinc-600 border-violet-200 focus:border-violet-500"
                }`}
                {...register("firstName")}
                disabled={isSubmitting}
              />
              {errors.firstName && (
                <p className="flex items-center gap-1 text-xs text-red-500">
                  <AiOutlineWarning />
                  {errors.firstName?.message}
                </p>
              )}
            </div>
            <div className="flex flex-1 flex-col">
              <label className="text-lg" htmlFor="lastName">
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                placeholder="Enter your last name..."
                className={`border-2 dark:caret-zinc-100 outline-none px-2 py-1 rounded dark:text-zinc-200 text-zinc-800 ${
                  errors.lastName
                    ? "border-red-500"
                    : "dark:border-zinc-600 border-violet-200 focus:border-violet-500"
                }`}
                {...register("lastName")}
                disabled={isSubmitting}
              />
              {errors.lastName && (
                <p className="flex items-center gap-1 text-xs text-red-500">
                  <AiOutlineWarning />
                  {errors.lastName?.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email address..."
              className={`border-2 dark:caret-zinc-100 outline-none px-2 py-1 rounded dark:text-zinc-200 text-zinc-800 ${
                errors.email
                  ? "border-red-500"
                  : "dark:border-zinc-600 border-violet-200 focus:border-violet-500"
              }`}
              {...register("email")}
              disabled={isSubmitting}
            />
            {errors.email && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AiOutlineWarning />
                {errors.email?.message}
              </p>
            )}
          </div>
          <div className="flex flex-col">
            <label className="text-lg" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password..."
              className={`border-2 dark:caret-zinc-100 outline-none px-2 py-1 rounded dark:text-zinc-200 text-zinc-800 ${
                errors.password
                  ? "border-red-500"
                  : "dark:border-zinc-600 border-violet-200 focus:border-violet-500"
              }`}
              {...register("password")}
              disabled={isSubmitting}
            />
            {errors.password && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AiOutlineWarning />
                {errors.password?.message}
              </p>
            )}
          </div>
          <div className="flex mb-4 flex-col">
            <label className="text-lg" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password..."
              className={`border-2 dark:caret-zinc-100 outline-none px-2 py-1 rounded dark:text-zinc-200 text-zinc-800 ${
                errors.confirmPassword
                  ? "border-red-500"
                  : "dark:border-zinc-600 border-violet-200 focus:border-violet-500"
              }`}
              {...register("confirmPassword")}
              disabled={isSubmitting}
            />
            {errors.confirmPassword && (
              <p className="flex items-center gap-1 text-xs text-red-500">
                <AiOutlineWarning />
                {errors.confirmPassword?.message}
              </p>
            )}
          </div>
          <Button
            type="submit"
            title={isSubmitting && isValid ? "Signing Up..." : "Sign Up"}
            priority="primary"
            isLoading={isSubmitting && isValid}
            spinner={true}
          />
          <span className="text-right text-sm mt-1">
            Already have an account?{" "}
            <Link className="text-blue-500" href={"/signin"}>
              Sign In
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
