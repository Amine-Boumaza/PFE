import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";

import { GiBabyfootPlayers } from "react-icons/gi";
import { MdIncompleteCircle } from "react-icons/md";

export default function DashboardStats() {
  const { CurrentUser } = useContext(AuthContext);
  const [NOTeams, setNOTeams] = useState(0);
  const [NOPlayers, setNOPlayers] = useState(0);

  const GetTeams = () => {
    axios
      .get(
        `http://localhost:8081/api/management/coach/TeamsNB?TenantID=${CurrentUser.TenantID}&UserID=${CurrentUser.UserID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setNOTeams(response.data);
        console.log("GetTeamsNB Fetch:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching GetTeamsNB:", error);
      });
  };

  const GetPlayersNB = () => {
    axios
      .get(
        `http://localhost:8081/api/management/coach/GetPlayersNB?TenantID=${CurrentUser.TenantID}&UserID=${CurrentUser.UserID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setNOPlayers(response.data);
        console.log("PlayersNB Fetch:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching PlayersNB:", error);
      });
  };

  useEffect(() => {
    GetTeams();
    GetPlayersNB();
  }, []);

  return (
<<<<<<< HEAD
    <div className="flex gap-4">
=======
    <div className="flex justify-around text-center">
>>>>>>> origin/master
      <BoxWrapper
        label="Number of Teams"
        value={NOTeams}
        icon={<GiBabyfootPlayers className="text-2xl text-white" />}
      />
      <BoxWrapper
        label="Number of Players"
        value={NOPlayers}
        icon={<MdIncompleteCircle className="text-2xl text-white" />}
      />
    </div>
  );
<<<<<<< HEAD
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
=======

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
>>>>>>> origin/master
