/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { toast } from "sonner";
import { useAppDispatch, useAppSelector } from "../redux/hook";
import { useLoginMutation } from "../redux/api/authApi";
import {
  TUser,
  setUser,
  useCurrentToken,
} from "../redux/features/authSlice";
import { verifyToken } from "../utils/verfyToken";
import { readError } from "../utils/runMutation";
import { LogoMark } from "../components/ui/Logo";
import Button from "../components/ui/Button";
import Field, { inputClass } from "../components/ui/Field";

type FormValues = { email: string; password: string };

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(useCurrentToken);
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  // The dashboard's own theme is applied on the layout; the login screen
  // sits outside it, so set the attribute here too.
  useEffect(() => {
    if (!document.documentElement.getAttribute("data-theme")) {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  if (token) return <Navigate to="/" replace />;

  const onSubmit = async (values: FormValues) => {
    setFormError("");

    const result: any = await login({
      email: values.email.trim(),
      password: values.password,
    });

    if (result?.error) {
      const message = readError(result.error);
      setFormError(message);
      toast.error(message);
      return;
    }

    try {
      const user = verifyToken(result.data.data.token) as TUser;
      dispatch(setUser({ user, token: result.data.data.token }));
      toast.success("Welcome back");
      navigate("/", { replace: true });
    } catch {
      const message = "Received an invalid token from the server.";
      setFormError(message);
      toast.error(message);
    }
  };

  return (
    <div className="grid min-h-screen place-items-center bg-bg px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex flex-col items-center text-center">
          <LogoMark className="h-12 w-12" />
          <h1 className="mt-5 text-2xl font-semibold">Dashboard</h1>
          <p className="mt-2 text-sm text-muted">
            Sign in to manage your portfolio content.
          </p>
        </div>

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

          <Field
            label="Password"
            htmlFor="password"
            required
            error={errors.password?.message}
          >
            <div className="relative">
              <FiLock
                aria-hidden="true"
                className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-faint"
              />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                placeholder="Your password"
                className={`${inputClass} px-10`}
                {...register("password", { required: "Password is required" })}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-faint transition-colors hover:text-ink"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
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

          <Button type="submit" className="w-full" size="lg" loading={isLoading}>
            {isLoading ? "Signing in…" : "Sign in"}
          </Button>

          <Link
            to="/forgot-password"
            className="block text-center text-sm text-muted transition-colors hover:text-accent"
          >
            Forgot your password?
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
