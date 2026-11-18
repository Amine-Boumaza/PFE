import {
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";

export const ADMIN_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/management",
    // icon: <HiOutlineViewGrid />,
  },
  {
    key: "Financial Management",
    label: "Financial Management",
    path: "/management/financialmanagement",
  },
  {
    key: "sessions",
    label: "Sessions",
    path: "/management/sessions",
    // sessions
  },
  {
    key: "team",
    label: "Team",
    path: "/management/team",
  },
  {
    key: "doctor form",
    label: "Doctor Form",
    path: "/management/doctorForm",
  },
];
export const COACH_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/management",
    // icon: <HiOutlineViewGrid />,
  },
  {
    key: "sessions",
    label: "Sessions",
    path: "/management/sessions",
    // sessions
  },
  {
    key: "team",
    label: "Team",
    path: "/management/team",
  },
  {
    key: "doctor form",
    label: "Doctor Form",
  },
  {
    key: "Financial Management",
    label: "Financial Management",
  },
];

export const MANAGER_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/management",
    // icon: <HiOutlineViewGrid />,
  },

  {
    key: "Financial Management",
    label: "Financial Management",
    path: "/management/financialmanagement",
  },
  {
    key: "sessions",
    label: "Sessions",
    path: "/management/sessions",
    // sessions
  },
  {
    key: "team",
    label: "Team",
    path: "/management/team",
  },
  {
    key: "doctor form",
    label: "Doctor Form",
    path: "/management/doctorForm",
  },
];

export const DOCTOR_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/management",
    // icon: <HiOutlineViewGrid />,
  },
  {
    key: "doctor form",
    label: "Doctor Form",
    path: "/management/doctorForm",
  },
  {
    key: "Activity",
    label: "Activity",
    // icon: <HiOutlineCube />,

    // Add more subcategories as needed
  },
  {
    key: "Financial Management",
    label: "Financial Management",
  },
  {
    key: "sessions",
    label: "Sessions",
    // sessions
  },
  {
    key: "team",
    label: "Team",
  },
];

export const FINANCE_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/management",
    // icon: <HiOutlineViewGrid />,
  },
  {
    key: "Financial Management",
    label: "Financial Management",
    path: "/management/financialmanagement",
  },
  {
    key: "Activity",
    label: "Activity",
    // icon: <HiOutlineCube />,

    // Add more subcategories as needed
  },
  {
    key: "sessions",
    label: "Sessions",
    // sessions
  },
  {
    key: "team",
    label: "Team",
  },
  {
    key: "doctor form",
    label: "Doctor Form",
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/management/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
