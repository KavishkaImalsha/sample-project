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
import InputField from "../../components/inputs/InputField";

const LoginPage = () => {
  const loginFormSchema = z.object({
    username: z.string().email("Invalid email address"),
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

  const handleLogin = async (data) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      toast.success(result?.message || "User Login successful");
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
      <section className="min-h-screen flex flex-col md:flex-row bg-gray-50">
        {/* Left Side: Branding / Marketing */}
        <div className="hidden md:flex flex-1 bg-indigo-600 items-center justify-center p-12">
          <div className="text-white space-y-6">
            <h2 className="text-4xl font-bold">
              Manage your inventory with ease.
            </h2>
            <p className="text-indigo-100 text-lg">
              The most efficient way to track your stock, manage costs, and
              scale your business operations.
            </p>
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-sm space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-gray-500">
                Please enter your details to sign in.
              </p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
              <div className="space-y-4">
                <InputField
                  label="Username"
                  register={register("username")}
                  error={errors.username}
                  type="email"
                  name="username"
                />
                <InputField
                  label="password"
                  register={register("password")}
                  error={errors.password}
                  type="password"
                  name="password"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
              >
                Sign in
              </button>

              <p className="text-center text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoginPage;
