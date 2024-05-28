// DashboardStats.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

import { GrUserManager } from "react-icons/gr";
import { GiBabyfootPlayers } from "react-icons/gi";
import { MdIncompleteCircle } from "react-icons/md";
export default function DashboardStats() {
  const [NOTeams, setNOTeams] = useState([]);
  const [NOPlayers, setNOPlayers] = useState([]);
  const GetTeams = () => {
    axios
      .get("http://localhost:8081/api/management/admin/GetNbTenents")
      .then((response) => {
        setNOTeams(response.data);
        console.log("Fetched session reports:", NOTenants);
      })
      .catch((error) => {
        console.error("Error fetching session reports:", error);
      });
  };
  const GetPlayes = () => {
    axios
      .get("http://localhost:8081/api/management/admin/GetNbUsers")
      .then((response) => {
        setNOPlayers(response.data);
        console.log("Fetched session reports:", NOUsers);
      })
      .catch((error) => {
        console.error("Error fetching session reports:", error);
      });
  };

  useEffect(() => {
    // Fetch dashboard statistics from the backend
    GetTeams();
    GetPlayes();
  }, []);

  return (
    <div className="flex gap-4">
      <BoxWrapper
        label="Number Transactions"
        value={NOTeams}
        icon={<GiBabyfootPlayers className="text-2xl text-white" />}
      />
      <BoxWrapper
        label="Total Amount 'importaions'"
        value={`${NOPlayers} DZD`}
        icon={<MdIncompleteCircle className="text-2xl text-white" />}
      />
      <BoxWrapper
        label="Total Amount 'exportations'"
        value={`${NOPlayers} DZD`}
        icon={<MdIncompleteCircle className="text-2xl text-white" />}
      />
    </div>
  );
}

function BoxWrapper({ label, value, icon }) {
  return (
    <div className="flex-1 bg-white rounded-sm border border-gray-200 p-4 flex items-center">
      <div>
        <p className="text-sm text-gray-500 font-light mb-1">{label}</p>
        <div className="flex items-center">
          {icon}
          <strong className="text-xl text-gray-700 font-semibold">
            {value}
          </strong>
        </div>
      </div>
    </div>
  );
}
