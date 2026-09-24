/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { useForgotPasswordMutation } from "../redux/api/authApi";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [sent, setSent] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: any) => {
    try {
      const res = await forgotPassword({ email: data.email }).unwrap();
      setSent(true);
      toast.success(res.message ?? "Reset link sent", { duration: 4000 });
    } catch (error) {
      toast.error("Something went wrong", { duration: 2000 });
    }
  };

  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="md:flex md:justify-evenly items-center bg-gradient-to-br from-[#000428] to-[#01427a]"
    >
      <div>
        <div className="border-2 rounded-lg p-5 shadow-xl m-2 bg-white max-w-sm">
          <p className="text-xl font-bold text-center text-orange-500">
            Forgot Password
          </p>

          {sent ? (
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                If an account exists for that email, we&apos;ve sent a reset
                link. It expires in 15 minutes.
              </p>
              <Link
                className="mt-4 inline-block text-sm font-bold text-orange-500 hover:underline"
                to="/login"
              >
                Back to login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="my-3 text-sm text-gray-600">
                Enter your account email and we&apos;ll send you a link to
                choose a new password.
              </p>
              <div style={{ marginBottom: "1.5rem" }}>
                <label className="font-bold" htmlFor="email">
                  Email:
                </label>
                <input
                  className="input input-bordered input-info w-full max-w-xs"
                  placeholder="Enter your Email"
                  type="email"
                  id="email"
                  required
                  {...register("email")}
                />
              </div>
              <button
                className="cursor-pointer rounded bg-orange-500 py-2 px-4 text-white font-bold disabled:opacity-60"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </button>
              <Link
                className="block mt-4 text-sm font-bold text-orange-500 hover:underline"
                to="/login"
              >
                Back to login
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
