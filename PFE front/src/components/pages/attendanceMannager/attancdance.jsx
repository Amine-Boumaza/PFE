import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AttendanceList = () => {
  const [players, setPlayers] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [playerAttendance, setPlayerAttendance] = useState({});

  const query = new URLSearchParams(useLocation().search);
  const teamName = query.get("teamName");
  const sessionId = query.get("sessionId");

  useEffect(() => {
    if (teamName && sessionId) {
      axios
        .get(
          `http://localhost:8081/api/management/activity?teamName=${teamName}&sessionId=${sessionId}`
        )
        .then((response) => {
          const { players, sessionDate } = response.data;
          setPlayers(players);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching players:", error);
          setError("Error fetching players");
          setLoading(false);
        });
    } else {
      setError("Team name and session ID are required");
      setLoading(false);
    }
  }, [teamName, sessionId]);

  const handleAttendanceChange = (playerId, status) => {
    setPlayerAttendance({
      ...playerAttendance,
      [playerId]: status,
    });
  };

  const handleSaveAttendance = () => {
    const attendanceData = players.map((player) => ({
      playerId: player.PlayerID,
      sessionId: sessionId,
      status: playerAttendance[player.PlayerID] || "Absent", // Default to 'Absent' if no status is selected
    }));
    console.log("Attendance data:", attendanceData);

    axios
      .post("http://localhost:8081/api/attendance", {
        attendance: attendanceData,
      })
      .then(() => {
        console.log("Attendance saved successfully");
        // Optionally, you can reset the playerAttendance state here
      })
      .catch((error) => {
        console.error("Error saving attendance:", error);
        // Handle error saving attendance
      });
  };
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="antialiased font-sans">
      {players.length > 0 && (
        <>
          <div className="container mx-auto px-4 sm:px-8">
            <div className="py-8">
              <div>
                <h2 className="text-2xl font-semibold leading-tight text-center">
                  Attendance List
                </h2>
              </div>
              <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
                <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
                  <table className="min-w-full leading-normal">
                    <thead>
                      <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Player Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-300 bg-gray-700 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Attendance Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {players.map((player) => (
                        <tr key={player.PlayerID} className="hover:bg-gray-100">
                          <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
                            {player.Name}
                          </td>
                          <td className="px-5 py-5 border-b border-gray-300 bg-white text-sm">
                            <div className="flex items-center space-x-4">
                              <div>
                                <input
                                  type="checkbox"
                                  id={`present-${player.PlayerID}`}
                                  checked={playerAttendance[player.PlayerID] === "Present"}
                                  onChange={() =>
                                    handleAttendanceChange(player.PlayerID, "Present")
                                  }
                                  className="mr-2"
                                />
                                <label htmlFor={`present-${player.PlayerID}`}>Present</label>
                              </div>
                              <div>
                                <input
                                  type="checkbox"
                                  id={`absent-${player.PlayerID}`}
                                  checked={playerAttendance[player.PlayerID] === "Absent"}
                                  onChange={() =>
                                    handleAttendanceChange(player.PlayerID, "Absent")
                                  }
                                  className="mr-2"
                                />
                                <label htmlFor={`absent-${player.PlayerID}`}>Absent</label>
                              </div>
                              <div>
                                <input
                                  type="checkbox"
                                  id={`excused-${player.PlayerID}`}
                                  checked={playerAttendance[player.PlayerID] === "Excused"}
                                  onChange={() =>
                                    handleAttendanceChange(player.PlayerID, "Excused")
                                  }
                                  className="mr-2"
                                />
                                <label htmlFor={`excused-${player.PlayerID}`}>Excused</label>
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {successMessage && (
                <div className="text-center text-green-500 mt-4">
                  {successMessage}
                </div>
              )}
              <div className="flex justify-center mt-4">
                <button
                  onClick={handleSaveAttendance}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Save Attendance
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AttendanceList;
``;
