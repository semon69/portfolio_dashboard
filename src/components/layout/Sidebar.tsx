import { Link, useLocation } from "react-router-dom";
import { FiX } from "react-icons/fi";
import Logo from "../ui/Logo";
import { navItems } from "./navItems";

const Sidebar = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { pathname } = useLocation();

  // Active state is computed rather than left to NavLink, so a section
  // stays highlighted while you're on its add or edit screen.
  const isActive = (item: (typeof navItems)[number]) => {
    if (item.end) return pathname === item.to;
    if (pathname.startsWith(item.to)) return true;
    return (item.alsoMatch ?? []).some((prefix) => pathname.startsWith(prefix));
  };

  return (
    <>
      {/* Mobile scrim */}
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-line bg-surface transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-line px-5">
          <Link to="/" className="rounded-lg">
            <Logo />
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-raised hover:text-ink lg:hidden"
          >
            <FiX />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const active = isActive(item);

              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                      active
                        ? "bg-accent-solid/15 font-medium text-accent"
                        : "text-muted hover:bg-raised hover:text-ink"
                    }`}
                  >
                    <item.icon
                      className="shrink-0 text-base"
                      aria-hidden="true"
                    />
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
