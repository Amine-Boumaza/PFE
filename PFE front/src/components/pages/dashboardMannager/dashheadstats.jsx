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
    <div className="flex justify-around gap-4">
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

  function BoxWrapper({ label, value, icon }) {
    return (
      <div className="w-96 bg-blue-500 rounded-lg p-4 flex items-center justify-center flex-col">
        <div className="flex flex-col justify-center">
          <h3 className="text-white text-xl font-bold mb-1">{label}</h3>
          <div className="flex items-center justify-center">
            {icon}
            <strong className="text-white text-4xl font-bold ml-2">{value}</strong>
          </div>
        </div>
      </div>
    );
  }
}  
