import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { FcBullish } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import {
  COACH_SIDEBAR_LINKS,
  MANAGER_SIDEBAR_LINKS,
  ADMIN_SIDEBAR_LINKS,
  DOCTOR_SIDEBAR_LINKS,
  FINANCE_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/consts/navigation";


const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { CurrentUser, logout } = useContext(AuthContext);

  const HandleLogout = () => {
    logout();
    return <Navigate to="/" />;
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const AccessCheck = () => {
    if (CurrentUser.Role === "admin")
      return (
        <div className="flex flex-col gap-0.5">
          {ADMIN_SIDEBAR_LINKS.map((link) => (
            <SidebarLink key={link.key} link={link} />
          ))}
        </div>
      );
    if (CurrentUser.Role === "coach")
      return (
        <div className="flex flex-col gap-0.5">
          {COACH_SIDEBAR_LINKS.map((link) => (
            <SidebarLink key={link.key} link={link} />
          ))}
        </div>
      );
    if (CurrentUser.Role === "player")
      return (
        <div className="flex flex-col gap-0.5">
          {COACH_SIDEBAR_LINKS.map((link) => (
            <SidebarLink key={link.key} link={link} />
          ))}
        </div>
      );
    if (CurrentUser.Role === "doctor")
      return (
        <div className="flex flex-col gap-0.5">
          {DOCTOR_SIDEBAR_LINKS.map((link) => (
            <SidebarLink key={link.key} link={link} />
          ))}
        </div>
      );
    if (CurrentUser.Role === "FinanceManager")
      return (
        <div className="flex flex-col gap-0.5">
          {FINANCE_SIDEBAR_LINKS.map((link) => (
            <SidebarLink key={link.key} link={link} />
          ))}
        </div>
      );
    if (CurrentUser.Role === "mannager")
      return (
        <div className="flex flex-col gap-0.5">
          {MANAGER_SIDEBAR_LINKS.map((link) => (
            <SidebarLink key={link.key} link={link} />
          ))}
        </div>
      );
  };

  return (
    <div className="bg-c1 md:flex md:flex-col h-full">
      <div className="flex items-center justify-between gap-2 px-1 py-3">
        <div className="flex items-center gap-2">
          <FcBullish fontSize={24} />
          <span className="text-neutral-200 text-lg">Management</span>
        </div>
        <button className="md:hidden" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>

      {AccessCheck()}

      <div className="flex flex-col gap-0.5 mt-auto">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <div
          className={classNames(linkClass, "cursor-pointer text-red-500")}
          onClick={HandleLogout}
        >
          <span className="text-xl">
            <HiOutlineLogout />
          </span>
          Logout
        </div>
      </div>
    </div>
  );
}

function SidebarLink({ link }) {
  const { pathname } = useLocation();

  return (
    <Link
      to={link.path}
      className={classNames(
        pathname === link.path
          ? "bg-neutral-700 text-white"
          : "text-neutral-400",
        linkClass
      )}
    >
      {link.label}
    </Link>
  );
}
