// Sidebar.js
import React, { useState, useEffect } from "react";
import { FcGlobe } from "react-icons/fc";
import { IoMdArrowDropdown } from "react-icons/io";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/consts/navigation";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubcategory, setOpenSubcategory] = useState(null);

  const toggleDropdown = (index) => {
    setOpenDropdown((prev) => (prev === index ? null : index));
    setOpenSubcategory(null);
  };

  const toggleSubcategory = (index) => {
    setOpenSubcategory((prev) => (prev === index ? null : index));
  };

  const linkClass =
    "flex item-center gap-2 font- px-1 py-2 mt-2 hover:bg-hover rounded hover:no-underline active:bg-hover rounded text-lg text-right";

  // const activeLinkClass = "bg-hover rounded ";

  function SidebarLinks(item, parentIndex, subcategoryIndex) {
    const path = useLocation();
    const hasSubcategories =
      item.subcategories && item.subcategories.length > 0;

    return (
      <Link
        to={item.path}
        className={
          `text-gray-950  ${
            // openDropdown === parentIndex ||
            // openSubcategory === subcategoryIndex ||
            path.pathname === item.path ? "text-white" : ""
          }` + linkClass
        }
      >
        <span className="text-xl">
          {hasSubcategories && <IoMdArrowDropdown />}
        </span>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="bg-c1 md:flex md:flex-col h-full duration-500 ease-out">
      <div className="header flex items-center justify-between gap-2 py-3 px-4">
        <div className="flex items-center gap-2">
          <FcGlobe fontSize={24} />
          <span className="text-slate-950 text-lg">management</span>
        </div>
        <button className="block md:hidden" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>

      <div
        className={`links overflow-y-auto px-4 py-8 md:flex-1 flex flex-col  items-center justify-center ${
          isMobileMenuOpen ? "justify-center" : "hidden md:block"
        } md:justify-start`}
      >
        {DASHBOARD_SIDEBAR_LINKS.map((items, index) => (
          <div key={items.key} className="relative group">
            {items.subcategories ? (
              <div>
                <div
                  className={`${linkClass} cursor-pointer ${
                    openDropdown === index ? activeLinkClass : ""
                  }`}
                  onClick={() => toggleDropdown(index)}
                >
                  {items.label}
                  {items.subcategories && <IoMdArrowDropdown />}
                </div>
                <div>
                  {items.subcategories && openDropdown === index && (
                    <div className="pl-4">
                      {items.subcategories.map((subCategory, subIndex) => (
                        <div key={subCategory.key} className="relative group">
                          <div
                            className={`${linkClass} cursor-pointer mt-1 ${
                              openSubcategory === subIndex
                                ? activeLinkClass
                                : ""
                            }`}
                            onClick={() => toggleSubcategory(subIndex)}
                          >
                            {subCategory.label}
                            {subCategory.subcategories && <IoMdArrowDropdown />}
                          </div>
                          {subCategory.subcategories &&
                            openSubcategory === subIndex && (
                              <div className="pl-4 bg-transparent">
                                {subCategory.subcategories.map((team) => (
                                  <div
                                    className="hover:no-underline transparent"
                                    key={team.key}
                                  >
                                    {SidebarLinks(team, index, subIndex)}
                                  </div>
                                ))}
                              </div>
                            )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className={{ linkClass }}>{SidebarLinks(items, index)}</div>
            )}
          </div>
        ))}
      </div>

      <div
        className={`bottom px-4 py-2 md:w-auto flex flex-col items-center justify-center text-lg${
          isMobileMenuOpen ? "" : "hidden md:block"
        }`}
      >
        {DASHBOARD_SIDEBAR_BOTTOM_LINKS.map((item) => (
          <div key={item.key}>{item.label}</div>
        ))}
        bottom
      </div>
    </div>
  );
}
