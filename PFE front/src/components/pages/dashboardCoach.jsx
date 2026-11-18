import React from "react";
import { Link } from "react-router-dom";
import Dashheadstats from "./dashboard/dashheadstats";
import UserTable from "./dashboard/usertable";
import SessionTable from "./dashboard/SessionTable";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4">
      <Dashheadstats />
      <div className="flex gap-4 h-96">
        <div className="flex-1">
          <UserTable />
        </div>
        <div className="flex-1">
          <SessionTable />
        </div>
      </div>
    </div>
  );
}
