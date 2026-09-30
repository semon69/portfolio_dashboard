import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FiExternalLink, FiLogOut, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { toast } from "sonner";
import Sidebar from "./Sidebar";
import Button from "../ui/Button";
import useTheme from "../../hooks/useTheme";
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { logout, useCurrentUser } from "../../redux/features/authSlice";

const SITE_URL = "https://emon69.netlify.app";

const MainLayout = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(useCurrentUser);
  const { theme, toggleTheme } = useTheme();
  const { pathname } = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => setMenuOpen(false), [pathname]);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Signed out");
  };

  return (
    <div className="min-h-screen bg-bg">
      <Sidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 border-b border-line bg-bg/80 px-4 backdrop-blur-xl sm:px-6">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted hover:border-accent hover:text-accent lg:hidden"
          >
            <FiMenu />
          </button>

          <div className="ml-auto flex items-center gap-2">
            <a
              href={SITE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-accent sm:inline-flex"
            >
              View site
              <FiExternalLink aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="grid h-9 w-9 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-accent hover:text-accent"
            >
              {theme === "dark" ? <FiSun /> : <FiMoon />}
            </button>

            {user?.email && (
              <span
                title={user.email}
                className="hidden max-w-[14rem] truncate rounded-lg border border-line bg-surface px-3 py-2 text-xs text-muted md:block"
              >
                {user.email}
              </span>
            )}

            <Button variant="outline" size="md" onClick={handleLogout}>
              <FiLogOut aria-hidden="true" />
              <span className="hidden sm:inline">Sign out</span>
            </Button>
          </div>
        </header>

        <main className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-6xl animate-fade-up">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
