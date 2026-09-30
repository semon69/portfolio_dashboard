import {
  FiBookOpen,
  FiBriefcase,
  FiCpu,
  FiFolder,
  FiGrid,
  FiPlus,
} from "react-icons/fi";
import type { IconType } from "react-icons";

type NavItem = {
  to: string;
  label: string;
  icon: IconType;
  end?: boolean;
};

export const navGroups: { label: string; items: NavItem[] }[] = [
  {
    label: "Overview",
    items: [{ to: "/", label: "Dashboard", icon: FiGrid, end: true }],
  },
  {
    label: "Projects",
    items: [
      { to: "/manage-projects", label: "All projects", icon: FiFolder },
      { to: "/add-project", label: "Add project", icon: FiPlus },
    ],
  },
  {
    label: "Skills",
    items: [
      { to: "/manage-skills", label: "All skills", icon: FiCpu },
      { to: "/add-skill", label: "Add skill", icon: FiPlus },
    ],
  },
  {
    label: "Experience",
    items: [
      { to: "/manage-experience", label: "All experience", icon: FiBriefcase },
      { to: "/add-experience", label: "Add experience", icon: FiPlus },
    ],
  },
  {
    label: "Blog",
    items: [
      { to: "/manage-blogs", label: "All posts", icon: FiBookOpen },
      { to: "/write-blog", label: "Write post", icon: FiPlus },
    ],
  },
];
