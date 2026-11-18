import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext.jsx";
import Sessions2 from "../sessionsMannager/sessions2.jsx";
import ShowAttendanceList from "../attendanceMannager/showattendance.jsx";
import Swal from "sweetalert2";

export default function Sessions() {
  const { CurrentUser } = useContext(AuthContext);
  const [sessions, setSessions] = useState([]);
  const [CurrentTenant, setCurrentTenant] = useState(null);
  const [CurrentSes, SetCurrentSes] = useState(null);
  const [users, setUsers] = useState([]);
  const [Teams, setTeams] = useState([]);
  const [newSession, setNewSession] = useState({
    Date: "",
    Time: "",
    TeamID: "",
  });
  const [editedSession, setEditedSession] = useState(null); // Session being edited
  const [isAdding, setIsAdding] = useState(false); // New state to control the visibility of the new row

  const GetTeams = (ID) => {
    axios
      .get(
        `http://localhost:8081/api/management/mannager/GetAllTeams?TenantID=${ID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setTeams(response.data);
        console.log("Teams Fetch:", response.data); // Changed Teams to response.data
      })
      .catch((error) => {
        console.error("Error fetching Teams:", error);
      });
  };

  useEffect(() => {
    GetSessions(CurrentUser.TenantID);
    GetTeams(CurrentUser.TenantID);
  }, [CurrentUser.TenantID]);

  const GetSessions = (ID) => {
    axios
      .get(
        `http://localhost:8081/api/management/mannager/GetAllSessions?TenantID=${ID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setSessions(response.data);
        console.log("Session Fetch:", response.data); // Changed Teams to response.data
      })
      .catch((error) => {
        console.error("Error fetching Session:", error);
      });
  };

  const handleAddSession = () => {
    console.log("newSession", newSession);
    axios
      .post(
        `http://localhost:8081/api/management/mannager/AddSession?TenantID=${CurrentUser.TenantID}`,
        newSession
      )
      .then((response) => {
        console.log(response.data);
        setSessions([
          response.data,
          ...sessions, // Add new session to the beginning of the list
        ]);
        Swal.fire({
          icon: "success",
          title: "Added Successfully",
        });
        setNewSession({
          Date: "",
          Time: "",
          TeamID: "",
        });
        setIsAdding(false); // Hide new row after adding
      })
      .catch((error) => {
        console.error("Error adding session:", error);
      });
  };

  const handleDeleteSession = (sessionId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
        console.log(`Deleting session with ID: ${sessionId}`);
        axios
          .delete(
            `http://localhost:8081/api/management/mannager/DeleteSession?SessionID=${sessionId}`
          )
          .then((response) => {
            console.log(response.data);
            setSessions(
              sessions.filter((session) => session.SessionID !== sessionId)
            );
          })
          .catch((error) => {
            console.error("Error deleting session:", error);
          });
      }
    });
  };

  const handleEdit = (session) => {
    setEditedSession({ ...session }); // Set the session being edited
  };

  const handleSaveEdit = () => {
    console.log("editedSession", editedSession);
    axios
      .put(
        `http://localhost:8081/api/management/mannager/EditSession?SessionID=${editedSession.SessionID}`,
        {
          Date: editedSession.Date,
          Time: editedSession.Time,
          TeamID: editedSession.TeamID,
        }
      )
      .then((response) => {
        setSessions(
          sessions.map((s) =>
            s.SessionID === editedSession.SessionID ? response.data.session : s
          )
        );
        setEditedSession(null); // Clear the editing state
      })
      .catch((error) => {
        console.error("Error updating session:", error);
      });
  };

  return (
    <div>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold my-4 text-center">Sessions</h1>
        {Teams.length === 0 ? (
          <h6 className="text-xl font-bold mb-4 text-center">You Can't Session (Add Team Before)</h6>
        ) : (
          <div className="my-4 text-center">
            {!isAdding && (
              <button
                onClick={() => setIsAdding(true)}
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Add New Session
              </button>
            )}
            {isAdding && (
              <div className="my-8">
                <h2 className="text-2xl font-bold mb-4 text-center">Add New Session</h2>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                    <thead className="bg-gray-700 text-white">
                      <tr>
                        <th className="border border-gray-300 px-4 py-2">Date</th>
                        <th className="border border-gray-300 px-4 py-2">Time</th>
                        <th className="border border-gray-300 px-4 py-2">Team Name</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="date"
                            value={newSession.Date}
                            onChange={(e) =>
                              setNewSession({
                                ...newSession,
                                Date: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <input
                            type="time"
                            value={newSession.Time}
                            onChange={(e) =>
                              setNewSession({
                                ...newSession,
                                Time: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <select
                            id="dataSelect"
                            value={newSession.TeamID}
                            onChange={(e) =>
                              setNewSession({
                                ...newSession,
                                TeamID: e.target.value,
                              })
                            }
                            className="border border-gray-300 rounded-md px-3 py-1"
                          >
                            <option value="">--Select--</option>
                            {Teams.map((team) => (
                              <option key={team.TeamID} value={team.TeamID}>
                                {team.Name}
                              </option>
                            ))}
                          </select>
                        </td>
                        <td className="border border-gray-300 px-4 py-2">
                          <button
                            onClick={handleAddSession}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setIsAdding(false)}
                            className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2 hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
        {sessions.length === 0 ? (
          <h6 className="text-xl font-bold mb-4 text-center">There Is No Sessions Yet</h6>
        ) : (
          <div className="my-8">
            <h2 className="text-2xl font-bold mb-4 text-center">Sessions List</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="border border-gray-300 px-4 py-2">Date</th>
                    <th className="border border-gray-300 px-4 py-2">Time</th>
                    <th className="border border-gray-300 px-4 py-2">Team Name</th>
                    <th className="border border-gray-300 px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((session) => (
                    <tr key={session.SessionID} className="hover:bg-gray-100">
                      {editedSession && editedSession.SessionID === session.SessionID ? (
                        <>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="date"
                              value={editedSession.Date}
                              onChange={(e) =>
                                setEditedSession({
                                  ...editedSession,
                                  Date: e.target.value,
                                })
                              }
                              className="border border-gray-300 rounded-md px-3 py-1"
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <input
                              type="time"
                              value={editedSession.Time}
                              onChange={(e) =>
                                setEditedSession({
                                  ...editedSession,
                                  Time: e.target.value,
                                })
                              }
                              className="border border-gray-300 rounded-md px-3 py-1"
                            />
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <select
                              value={editedSession.TeamID}
                              onChange={(e) =>
                                setEditedSession({
                                  ...editedSession,
                                  TeamID: e.target.value,
                                })
                              }
                              className="border border-gray-300 rounded-md px-3 py-1"
                            >
                              <option value="">--Select--</option>
                              {Teams.map((team) => (
                                <option key={team.TeamID} value={team.TeamID}>
                                  {team.Name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="border border-gray-300 px-4 py-2">
                            <button
                              onClick={handleSaveEdit}
                              className="bg-green-500 text-white py-1 px-3 rounded mr-2 hover:bg-green-600"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setEditedSession(null)}
                              className="bg-gray-500 text-white py-1 px-3 rounded hover:bg-gray-600"
                            >
                              Cancel
                            </button>
                          </td>
                        </>
                      ) : (
                        <>
                          <td className="border border-gray-300 px-4 py-2">{session.Date}</td>
                          <td className="border border-gray-300 px-4 py-2">{session.Time}</td>
                          <td className="border border-gray-300 px-4 py-2">{session.Name}</td>
                          <td className="border border-gray-300 px-4 py-2">
                            <button
                              onClick={() => SetCurrentSes(session.SessionID)}
                              className="bg-green-500 text-white py-1 px-3 rounded mr-2 hover:bg-green-600"
                            >
                              Select
                            </button>
                            <button
                              onClick={() => handleEdit(session)}
                              className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteSession(session.SessionID)}
                              className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                            >
                              Delete
                            </button>
                          </td>
                        </>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div>
        {sessions.length > 0 && (
          <>
            <Sessions2 CurrentSes={CurrentSes} />
            <ShowAttendanceList CurrentSes={CurrentSes} />
          </>
        )}
      </div>
    </div>
  );
}
