import React, { useState, useEffect } from "react";
import axios from "axios";
import CoachFillForm from "./docformfill.jsx";

export default function Player(props) {
  const [players, setPlayers] = useState([]);
  const [CurrentPlayer, SetCurrentPlayer] = useState(null);
  const [newPlayer, setNewPlayer] = useState({
    TenantID: props.CurrentTenant,
    Name: "",
    TeamID: props.CurrentTeam,
    Date_of_Birth: "",
    Place_of_birth: "",
    Blood_type: "",
    Height: "",
    weight: "",
    ph_Number: "",
    Parent_Number: "",
    Sex: "",
  });
  const [editedPlayer, setEditedPlayer] = useState({
    TenantID: props.CurrentTenant,
    Name: "",
    TeamID: props.CurrentTeam,
    Date_of_Birth: "",
    Place_of_birth: "",
    Blood_type: "",
    Height: "",
    weight: "",
    ph_Number: "",
    Parent_Number: "",
    Sex: "",
  });

  useEffect(() => {
    if (props.CurrentTeam) {
      fetchPlayers(props.CurrentTeam);
    }
  }, [props.CurrentTeam]);
  const fetchPlayers = (TeamID) => {
    axios
      .get(
        `http://localhost:8081/api/management/mannager/GetTeamsPlayers?TeamID=${TeamID}`
      )
      .then((response) => {
        setPlayers(response.data);
        console.log("Players fetch", response.data);
      })
      .catch((error) => {
        console.error("Error fetching players:", error);
      });
  };

  const handleSelectPlayer = (playerID) => {
    SetCurrentPlayer(playerID);
  };

  return (
    <div>
      {props.CurrentTeam && (
        <div className="my-8">
          <h2 className="text-3xl font-bold my-4 text-center">Players List</h2>
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-white">
              <tr >
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Phone Number (+213)</th>
                <th className="border border-gray-300 px-4 py-2">Date Of Birth</th>
                <th className="border border-gray-300 px-4 py-2">Sex</th>
                <th className="border border-gray-300 px-4 py-2">Height (Cm)</th>
                <th className="border border-gray-300 px-4 py-2">Weight (Kg)</th>
                <th className="border border-gray-300 px-4 py-2">Blood Type</th>
                <th className="border border-gray-300 px-4 py-2">Parent Number (+213)</th>
                <th className="border border-gray-300 px-4 py-2">Add Injury Repport</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player) => (
                <tr key={player.PlayerID} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{player.Name}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.ph_Number}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.Date_of_Birth}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.Sex}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.Height}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.weight}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.Blood_type}</td>
                  <td className="border border-gray-300 px-4 py-2">{player.Parent_Number}</td>
                  <td className="border border-gray-300 px-4 py-2"><button
                    onClick={() => handleSelectPlayer(player.PlayerID)}
                    className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                  >
                    Select
                  </button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {CurrentPlayer && (
        <>
          <CoachFillForm
            CurrentPlayer={CurrentPlayer}
            SetCurrentPlayer={SetCurrentPlayer}
          />
        </>
      )}
    </div>
  );
}
