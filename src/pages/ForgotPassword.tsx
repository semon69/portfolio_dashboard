/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiCheckCircle, FiMail } from "react-icons/fi";
import { useForgotPasswordMutation } from "../redux/api/authApi";
import { readError } from "../utils/runMutation";
import { LogoMark } from "../components/ui/Logo";
import Button from "../components/ui/Button";
import Field, { inputClass } from "../components/ui/Field";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const [sent, setSent] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ email: string }>();

  const onSubmit = async (values: { email: string }) => {
    setFormError("");
    const result: any = await forgotPassword({ email: values.email.trim() });

    if (result?.error) {
      setFormError(readError(result.error));
      return;
    }
    setSent(true);
  };

  return (
    <div className="grid min-h-screen place-items-center bg-bg px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <LogoMark className="h-12 w-12" />
          <h1 className="mt-5 text-2xl font-semibold">Reset your password</h1>
          <p className="mt-2 text-sm text-muted">
            We&rsquo;ll email you a link to choose a new one.
          </p>
        </div>

        {sent ? (
          <div className="rounded-xl border border-line bg-surface p-6 text-center shadow-soft">
            <FiCheckCircle
              className="mx-auto text-2xl text-success"
              aria-hidden="true"
            />
            <p className="mt-4 font-medium text-ink">Check your inbox</p>
            <p className="mt-2 text-sm text-muted">
              If an account exists for that address, a reset link is on its
              way. The link expires, so use it soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-5 rounded-xl border border-line bg-surface p-6 shadow-soft"
            noValidate
          >
            <Field
              label="Email"
              htmlFor="email"
              required
              error={errors.email?.message}
            >
              <div className="relative">
                <FiMail
                  aria-hidden="true"
                  className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
                />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={`${inputClass} pl-10`}
                  {...register("email", { required: "Email is required" })}
                />
              </div>
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
              {isLoading ? "Sending…" : "Send reset link"}
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

export default ForgotPassword;
