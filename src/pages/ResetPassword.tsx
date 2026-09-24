/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../redux/api/authApi";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const { register, handleSubmit } = useForm();

  const email = searchParams.get("email");
  const token = searchParams.get("token");

  const onSubmit = async (data: any) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match", { duration: 2000 });
      return;
    }

    try {
      const res = await resetPassword({
        email,
        token,
        newPassword: data.newPassword,
      }).unwrap();
      toast.success(res.message ?? "Password reset successfully", {
        duration: 3000,
      });
      navigate("/login");
    } catch (error: any) {
      toast.error(error?.data?.message ?? "Something went wrong", {
        duration: 3000,
      });
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
            Set a New Password
          </p>

          {!email || !token ? (
            <div className="mt-4">
              <p className="text-sm text-gray-700">
                This reset link is incomplete. Please request a new one.
              </p>
              <Link
                className="mt-4 inline-block text-sm font-bold text-orange-500 hover:underline"
                to="/forgot-password"
              >
                Request a new link
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className="my-3 text-sm text-gray-600">
                Resetting the password for <strong>{email}</strong>
              </p>
              <div style={{ marginBottom: "1.5rem" }}>
                <label className="font-bold" htmlFor="newPassword">
                  New Password:
                </label>
                <input
                  className="input input-bordered input-info w-full max-w-xs"
                  placeholder="At least 6 characters"
                  type="password"
                  id="newPassword"
                  required
                  minLength={6}
                  {...register("newPassword")}
                />
              </div>
              <div style={{ marginBottom: "1.5rem" }}>
                <label className="font-bold" htmlFor="confirmPassword">
                  Confirm Password:
                </label>
                <input
                  className="input input-bordered input-info w-full max-w-xs"
                  placeholder="Re-enter your new password"
                  type="password"
                  id="confirmPassword"
                  required
                  minLength={6}
                  {...register("confirmPassword")}
                />
              </div>
              <button
                className="cursor-pointer rounded bg-orange-500 py-2 px-4 text-white font-bold disabled:opacity-60"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : "Reset Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
