import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";

export default function Layout() {
  return (
    <div className="flex flex-col   md:flex-row bg-neutral-100 h-screen w-screen overflow-hidden">
      {/* Sidebar for desktop view */}
      <div className="md:w-60  flex-none bg-c1">
        <Sidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-4 overflow-y-auto">
          {/* Outlet for displaying nested routes */}
          {<Outlet />}
        </div>
      </div>

      {/* Desktop header */}
    </div>
  );
}
