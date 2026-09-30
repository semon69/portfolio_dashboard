/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { FiAlertTriangle, FiArrowLeft, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { toast } from "sonner";
import { useResetPasswordMutation } from "../redux/api/authApi";
import { readError } from "../utils/runMutation";
import { LogoMark } from "../components/ui/Logo";
import Button from "../components/ui/Button";
import Field, { inputClass } from "../components/ui/Field";

type FormValues = { newPassword: string; confirmPassword: string };

const ResetPassword = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const [show, setShow] = useState(false);
  const [formError, setFormError] = useState("");

  // Both arrive in the emailed link.
  const email = params.get("email") ?? "";
  const token = params.get("token") ?? "";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (values: FormValues) => {
    setFormError("");

    const result: any = await resetPassword({
      email,
      newPassword: values.newPassword,
      token,
    });

    if (result?.error) {
      setFormError(readError(result.error));
      return;
    }

    toast.success("Password updated. Please sign in.");
    navigate("/login", { replace: true });
  };

  const linkIsBroken = !email || !token;

  return (
    <div className="grid min-h-screen place-items-center bg-bg px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <LogoMark className="h-12 w-12" />
          <h1 className="mt-5 text-2xl font-semibold">Choose a new password</h1>
          {email && !linkIsBroken && (
            <p className="mt-2 break-all text-sm text-muted">for {email}</p>
          )}
        </div>

        {linkIsBroken ? (
          <div className="rounded-xl border border-danger/30 bg-danger/5 p-6 text-center">
            <FiAlertTriangle
              className="mx-auto text-2xl text-danger"
              aria-hidden="true"
            />
            <p className="mt-4 font-medium text-ink">This link is incomplete</p>
            <p className="mt-2 text-sm text-muted">
              Open the reset link from your email exactly as it was sent, or
              request a new one.
            </p>
            <Button to="/forgot-password" variant="outline" className="mt-5">
              Request a new link
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-xl border border-line bg-surface p-6 shadow-soft"
            noValidate
          >
            <Field
              label="New password"
              htmlFor="newPassword"
              required
              hint="At least 6 characters."
              error={errors.newPassword?.message}
            >
              <div className="relative">
                <FiLock
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
                />
                <input
                  id="newPassword"
                  type={show ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="New password"
                  className={`${inputClass} px-10`}
                  {...register("newPassword", {
                    required: "A new password is required",
                    minLength: {
                      value: 6,
                      message: "Must be at least 6 characters",
                    },
                  })}
                />
                <button
                  type="button"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? "Hide password" : "Show password"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-faint transition-colors hover:text-ink"
                >
                  {show ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </Field>

            <Field
              label="Confirm password"
              htmlFor="confirmPassword"
              required
              error={errors.confirmPassword?.message}
            >
              <input
                id="confirmPassword"
                type={show ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat the password"
                className={inputClass}
                {...register("confirmPassword", {
                  required: "Please confirm the password",
                  validate: (value) =>
                    value === watch("newPassword") ||
                    "The two passwords don't match",
                })}
              />
            </Field>

            {formError && (
              <p
                role="alert"
                className="rounded-lg border border-danger/30 bg-danger/10 px-3.5 py-2.5 text-sm text-danger"
              >
                {formError}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              size="lg"
              loading={isLoading}
            >
              {isLoading ? "Updating…" : "Update password"}
            </Button>
          </form>
        )}

        <Link
          to="/login"
          className="mt-6 inline-flex w-full items-center justify-center gap-2 text-sm text-muted transition-colors hover:text-accent"
        >
          <FiArrowLeft aria-hidden="true" />
          Back to sign in
        </Link>
      </div>
    </div>
  );
};

export default ResetPassword;
