import {
  FiBookOpen,
  FiBriefcase,
  FiCpu,
  FiFolder,
  FiGrid,
} from "react-icons/fi";
import type { IconType } from "react-icons";

export type NavItem = {
  to: string;
  label: string;
  icon: IconType;
  /** Exact match only — used for the dashboard root. */
  end?: boolean;
  /**
   * Extra path prefixes that belong to this section. Without these the
   * sidebar would show nothing highlighted while adding or editing,
   * since those routes don't sit under the list URL.
   */
  alsoMatch?: string[];
};

export const navItems: NavItem[] = [
  { to: "/", label: "Dashboard", icon: FiGrid, end: true },
  {
    to: "/manage-projects",
    label: "Projects",
    icon: FiFolder,
    alsoMatch: ["/add-project", "/update-project"],
  },
  {
    to: "/manage-skills",
    label: "Skills",
    icon: FiCpu,
    alsoMatch: ["/add-skill", "/update-skill"],
  },
  {
    to: "/manage-experience",
    label: "Experience",
    icon: FiBriefcase,
    alsoMatch: ["/add-experience", "/update-experience"],
  },
  {
    to: "/manage-blogs",
    label: "Blog",
    icon: FiBookOpen,
    alsoMatch: ["/write-blog", "/update-blog"],
  },
];
