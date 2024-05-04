import {
  HiOutlineCube,
  HiOutlineUsers,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "/management",
    // icon: <HiOutlineViewGrid />,
  },
  {
    key: "Activity",
    label: "Activity",
    path: "/management/activity",
    // icon: <HiOutlineCube />,

    // Add more subcategories as needed
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
    path: "/management/teams",
    // team
  }
  ,
  {
    key: "doctor form",
    label: "Doctor Form",
    path: "/doctorForm",
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
