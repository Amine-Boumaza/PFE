import React, { useState } from "react";
import Dashheadstats from "./dashboard/dashheadstats";
import UserTable from "./dashboard/usertable";
import SessionTable from "./dashboard/SessionTable";

export default function Dashboard() {
  const [selectedTenantID, setSelectedTenantID] = useState(null);

  const handleSelectTenant = (TenantID) => {
    setSelectedTenantID(TenantID);
  };

  return (
    <div className="flex flex-col gap-4">
      <Dashheadstats />
      <div className="flex gap-4 h-96">
        <div className="flex-1">
          <UserTable onSelectTenant={handleSelectTenant} />
        </div>
        <div className="flex-1">
          {selectedTenantID && <SessionTable TenantID={selectedTenantID} />}
        </div>
      </div>
    </div>
  );
}
