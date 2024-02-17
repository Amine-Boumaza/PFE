import React, { useState, useEffect } from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";
import { FcBullish } from "react-icons/fc";
import { HiOutlineLogout } from "react-icons/hi";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/consts/navigation";

const linkClass =
  "flex items-center gap-2 font-light px-3 py-2 hover:bg-neutral-700 hover:no-underline active:bg-neutral-600 rounded-sm text-base";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
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

      <div className="flex flex-col gap-0.5">
        {DASHBOARD_SIDEBAR_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
      </div>

      <div className="flex flex-col gap-0.5 mt-auto">
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((link) => (
          <SidebarLink key={link.key} link={link} />
        ))}
        <div className={classNames(linkClass, "cursor-pointer text-red-500")}>
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
