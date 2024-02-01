import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "dashboard",
    label: "Dashboard",
    path: "",
    // icon: <HiOutlineViewGrid />,
  },
  {
    key: "category",
    label: "Category",
    icon: <HiOutlineCube />,
    subcategories: [
      {
        key: "categoryKey1",
        label: "CategoryName1",
        path: "/CategoryName1",
        subcategories: [
          {
            key: "teamKey1",
            label: "TeamName1",
            path: "/CategoryName1/TeamName1",
          },
          {
            key: "teamKey2",
            label: "TeamName2",
            path: "/CategoryName1/TeamName2",
          },
        ],
      },
      {
        key: "categoryKey2",
        label: "CategoryName2",
        path: "/CategoryName2",
        subcategories: [
          {
            key: "teamKey2",
            label: "TeamName2",
            path: "/CategoryName2/TeamName2",
          },
        ],
      },
      // Add more subcategories as needed
    ],
  },
  {
    key: "Financial Management",
    label: "Financial Management",
    path: "/financialManagement",
    icon: <HiOutlineUsers />,
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
