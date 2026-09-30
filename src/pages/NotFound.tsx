import { useRouteError, Link } from "react-router-dom";
import { LogoMark } from "../components/ui/Logo";
import Button from "../components/ui/Button";

const NotFound = () => {
  const error = useRouteError() as { status?: number } | null;
  const status = error?.status ?? 404;

  return (
    <div className="grid min-h-[70vh] place-items-center px-4 py-16 text-center">
      <div>
        <LogoMark className="mx-auto h-12 w-12" />
        <p className="mt-6 font-display text-6xl font-semibold text-accent">
          {status}
        </p>
        <h1 className="mt-4 text-xl font-semibold">
          {status === 404 ? "Page not found" : "Something went wrong"}
        </h1>
        <p className="mt-2 text-sm text-muted">
          {status === 404
            ? "That page doesn't exist in the dashboard."
            : "An unexpected error occurred while loading this page."}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Button to="/">Back to dashboard</Button>
          <Link
            to="/manage-blogs"
            className="inline-flex items-center rounded-lg px-4 py-2 text-sm text-muted transition-colors hover:text-accent"
          >
            View posts
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
