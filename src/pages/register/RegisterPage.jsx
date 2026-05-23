import { Link, useNavigate } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormErrorBanner from "../../components/errorMessages/FormErrorBanner";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../store/userSlice";
import { ClockLoader } from "react-spinners";
import { toast } from "react-toastify";
import InputField from "../../components/inputs/InputField";
import { useEffect } from "react";

const RegisterPage = () => {
  const registerFormSchema = z
    .object({
      first_name: z.string(),
      last_name: z.string(),
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
      confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerFormSchema),
    mode: "onBlur",
  });

  const { loading } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleRegister = async (data) => {
    try {
      await dispatch(registerUser(data)).unwrap();
      navigate("/dashboard/products");
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
        {/* Left Side: Branding */}
        <div className="hidden md:flex flex-1 bg-indigo-600 items-center justify-center p-12">
          <div className="text-white space-y-6">
            <h2 className="text-4xl font-bold">Join our POS system.</h2>
            <p className="text-indigo-100 text-lg">
              Create your account to start managing your inventory and tracking
              sales with precision.
            </p>
          </div>
        </div>

        {/* Right Side: Registration Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            <div className="space-y-2">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                Create an account
              </h1>
              <p className="text-gray-500">Sign up to get started.</p>
            </div>

            <form className="space-y-5" onSubmit={handleSubmit(handleRegister)}>
              <div className="grid grid-cols-2 gap-4">
                <InputField
                  label="First Name"
                  register={register("first_name")}
                  error={errors.first_name}
                  name="first_name"
                />
                <InputField
                  label="Last Name"
                  register={register("last_name")}
                  error={errors.last_name}
                  name="last_name"
                />
              </div>

              <InputField
                label="Username (Email)"
                register={register("username")}
                error={errors.username}
                name="username"
                type="email"
              />

              <InputField
                label="Password"
                type="password"
                register={register("password")}
                error={errors.password}
                name="password"
              />
              <InputField
                label="Confirm Password"
                type="password"
                register={register("confirmPassword")}
                error={errors.confirmPassword}
                name="confirmPassword"
              />

              <button
                type="submit"
                className="w-full bg-indigo-600 text-white font-bold py-3.5 rounded-xl hover:bg-indigo-700 transition shadow-lg shadow-indigo-200"
              >
                Create account
              </button>

              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-600 font-bold hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default RegisterPage;
