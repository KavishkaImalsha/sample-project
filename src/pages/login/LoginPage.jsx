import React, { useEffect, useState } from "react";
import SubmitBtn from "../../components/buttons/SubmitBtn";
import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormErrorBanner from "../../components/errorMessages/FormErrorBanner";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/userSlice";
import { toast } from "react-toastify";
import { ClockLoader } from "react-spinners";

const LoginPage = () => {
  const loginFormSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters long")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[@$!%*?&]/,
        "Password must contain at least one special character",
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginFormSchema),
    mode: "onBlur",
  });

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const firstErrorMessage = Object.values(errors)[0]?.message;

  const handleLogin = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate("/dashboard");
    } catch (error) {
      toast.error(error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClockLoader />
      </div>
    );
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Sign in to your account
              </h1>
              {firstErrorMessage && (
                <FormErrorBanner errors={{ message: firstErrorMessage }} />
              )}

              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSubmit(handleLogin)}
              >
                <div>
                  <label
                    for="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="inputField"
                    placeholder="name@company.com"
                    required=""
                    {...register("email")}
                  />
                </div>
                <div>
                  <label
                    for="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="inputField"
                    required=""
                    {...register("password")}
                  />
                </div>
                <div className="flex items-center justify-end">
                  <a
                    href="#"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-white"
                  >
                    Forgot password?
                  </a>
                </div>
                <SubmitBtn type="submit" btnName="Sign in" />

                <p className="text-sm font-light text-gray-500 dark:text-white">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
