// DashboardStats.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { GrUserManager } from "react-icons/gr";
import { GiBabyfootPlayers } from "react-icons/gi";
import { MdIncompleteCircle } from "react-icons/md";
export default function DashboardStats() {
  const { CurrentUser } = useContext(AuthContext);
  const [NOUsers, setNOUsers] = useState([]);
  const [NOTeams, setNOTeams] = useState([]);
  const GetUsers = () => {
    axios
      .get(
        `http://localhost:8081/api/management/mannager/GetUsersNb?TenantID=${CurrentUser.TenantID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setNOUsers(response.data);
        console.log("GetUsersNb Fetch:", response.data); // Changed Teams to response.data
      })
      .catch((error) => {
        console.error("Error fetching GetUsersNb:", error);
      });
  };
  const GetTeams = () => {
    axios
      .get(
        `http://localhost:8081/api/management/mannager/GetUsersNb?TenantID=${CurrentUser.TenantID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setNOTeams(response.data);
        console.log("Fetched teamsNB:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching teamsNB:", error);
      });
  };

  useEffect(() => {
    // Fetch dashboard statistics from the backend
    GetTeams();
    GetUsers();
  }, []);

  return (
    <div className="flex gap-4">
      <BoxWrapper
        label="Number Of Users"
        value={NOUsers}
        icon={<GiBabyfootPlayers className="text-2xl text-white" />}
      />
      <BoxWrapper
        label="Number Of Teams"
        value={NOTeams}
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
