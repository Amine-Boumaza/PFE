// Sidebar.js
import React, { useState, useEffect } from "react";
import { FcGlobe } from "react-icons/fc";
import {
  DASHBOARD_SIDEBAR_LINKS,
  DASHBOARD_SIDEBAR_BOTTOM_LINKS,
} from "../../lib/consts/navigation";

import { Link } from "react-router-dom";

export default function Sidebar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  function SidebarLinks(item) {
    return (
      <Link
        to={item.path}
        className="text-gray-950 hover:underline !important focus:underline !important focus:outline-none !important"
      >
        <span className="text-xl ">{}</span>
        {item.label}
      </Link>
    );
  }

  return (
    <div className="bg-c1 md:flex md:flex-col h-full ">
      <div className="header flex items-center justify-between gap-2 py-3 px-4">
        <div className="flex items-center gap-2">
          <FcGlobe />
          <span className="text-slate-950 text-lg">management</span>
        </div>
        <button className="block md:hidden" onClick={toggleMobileMenu}>
          ☰
        </button>
      </div>

      <div
        className={`links overflow-y-auto px-4 md:flex-1 ${
          isMobileMenuOpen ? "" : "hidden md:block"
        }`}
      >
        {DASHBOARD_SIDEBAR_LINKS.map((items) => (
          <div key={items.key}>
            {items.subcategories ? (
              <div>
                <div>{items.label}</div>
                <div className="pl-4">
                  {items.subcategories.map((subCategory) => (
                    <div key={subCategory.key}>
                      {subCategory.label}
                      {subCategory.subcategories && (
                        <div className="pl-4">
                          {subCategory.subcategories.map((team) => (
                            <div className="hover:no-underline" key={team.key}>
                              {SidebarLinks(team)}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div>{items.label}</div>
            )}
          </div>
        ))}
      </div>
      <div
        className={`bottom px-4 py-2 md:w-auto ${
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
