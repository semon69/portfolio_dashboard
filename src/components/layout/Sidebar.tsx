import { NavLink } from "react-router-dom";
import { FiX } from "react-icons/fi";
import Logo from "../ui/Logo";
import { navGroups } from "./navItems";


const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors ${
    isActive
      ? "bg-accent-solid/15 font-medium text-accent"
      : "text-muted hover:bg-raised hover:text-ink"
  }`;

const Sidebar = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => (
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
        <Logo />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid h-8 w-8 place-items-center rounded-lg text-muted hover:bg-raised hover:text-ink lg:hidden"
        >
          <FiX />
        </button>
      </div>

      <nav className="flex-1 space-y-6 overflow-y-auto p-4">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 px-3 text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-faint">
              {group.label}
            </p>
            <ul className="space-y-1">
              {group.items.map((item) => (
                <li key={item.to}>
                  {/* NavLink derives active state from the URL. The old
                      sidebar tracked it in local state, so it was wrong
                      after a refresh or a direct visit. */}
                  <NavLink to={item.to} end={item.end} className={linkClass}>
                    <item.icon className="shrink-0 text-base" aria-hidden="true" />
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  </>
);

export default Sidebar;
