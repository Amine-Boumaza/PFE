import React from "react";
import { Link } from "react-router-dom";
import Dashheadstats from "./dashboardMannager/dashheadstats";
import UserTable from "./dashboardMannager/usertable";
import SessionTable from "./dashboardMannager/SessionTable";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <Dashheadstats />
      <div className="flex gap-4 h-96">
        <div className="flex-1">
          <UserTable />
        </div>
        <div className="flex-2">
          <SessionTable />
        </div>
      </div>
    </div>
  );
}
