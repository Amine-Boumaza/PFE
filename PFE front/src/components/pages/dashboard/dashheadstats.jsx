// DashboardStats.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

import { GrUserManager } from "react-icons/gr";
import { GiBabyfootPlayers } from "react-icons/gi";
import { MdIncompleteCircle } from "react-icons/md";

export default function DashboardStats() {
  const [adminCount, setAdminCount] = useState(0);
  const [playerCount, setPlayerCount] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);

  useEffect(() => {
    // Fetch dashboard statistics from the backend
    axios.get("http://localhost:8081/management", { withCredentials: true })
      .then((res) => {
        const { adminCount, playerCount, monthlyRevenue } = res.data;
        setAdminCount(adminCount);
        setPlayerCount(playerCount);
        setMonthlyRevenue(monthlyRevenue);
      })
      .catch((error) => {
        console.error("Error fetching dashboard stats:", error);
      });
  }, []);

  return (
    <div className="flex gap-4">
      <BoxWrapper label="Number of Admins" value={adminCount} icon={<GrUserManager className="text-2xl text-white" />} />
      <BoxWrapper label="Total Players" value={playerCount} icon={<GiBabyfootPlayers className="text-2xl text-white" />} />
      <BoxWrapper label="Monthly Revenue" value={`${monthlyRevenue} DZD`} icon={<MdIncompleteCircle className="text-2xl text-white" />} />
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
          <strong className="text-xl text-gray-700 font-semibold">{value}</strong>
        </div>
      </div>
    </div>
  );
}
