import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

<<<<<<< HEAD
import Sessions2 from "../sessions/sessionsreports.jsx";
import SessionReportTable from "../sessions/sessionreportfull.jsx";
import ShowAttendanceList from "../attendance/showattendance.jsx";
=======
import Sessions2 from "../sessions/sessions2.jsx";
import SessionReportTable from "../sessions/sessionreportfull.jsx";
import CoachFillForm from "../sessions/docformfill.jsx";

>>>>>>> origin/master

export default function Sessions() {
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
  const [editedSession, setEditedSession] = useState({
<<<<<<< HEAD
    SessionID: 1,
=======
    SessionID: "",
>>>>>>> origin/master
    Date: "",
    Time: "",
    TeamID: 1,
  });
  const [isAdding, setIsAdding] = useState(false); // New state to control the visibility of the new row
  const [editingSession, setEditingSession] = useState(null); // Session being edited
<<<<<<< HEAD
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
  const handleSelectTenants = (ID) => {
    setCurrentTenant(ID);
  };

  const Gettenants = () => {
    axios
      .get("http://localhost:8081/api/management/admin/GetTenents")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching session reports:", error);
      });
  };

  useEffect(() => {
    Gettenants();
    handleSaveEdit();
=======

  useEffect(() => {
    axios
      .get("http://localhost:8081/management/sessions")
      .then((response) => {
        setSessions(response.data.sessions);
        console.log("Fetched sessions:", response.data.sessions);
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
>>>>>>> origin/master
  }, []);
  useEffect(() => {
    GetSessions(CurrentTenant);
    GetTeams(CurrentTenant);
  }, [CurrentTenant]);
  useEffect(() => {
    console.log(CurrentSes);
  }, [CurrentSes]);
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
<<<<<<< HEAD
    console.log("newSession", newSession);
    axios
      .post(
        `http://localhost:8081/api/management/mannager/AddSession?TenantID=${CurrentTenant}`,
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
=======
    axios
      .post(
        "http://localhost:8081/management/sessions",
        newSession
      )
      .then((response) => {
        setSessions([
          response.data.session,
          ...sessions, // Add new session to the beginning of the list
        ]);
        setNewSession({
          Date: "",
          Time: "",
          TeamID: ""
>>>>>>> origin/master
        });
        setIsAdding(false); // Hide new row after adding
      })
      .catch((error) => {
        console.error("Error adding session:", error);
      });
  };

  const handleDeleteSession = (sessionId) => {
<<<<<<< HEAD
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
        axios
          .delete(
            `http://localhost:8081/api/management/mannager/DeleteSession?SessionID=${sessionId}`
          )
          .then((response) => {
            console.log(response.data);
            setSessions(
              sessions.filter((session) => session.SessionID !== sessionId)
            );
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
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
=======
    axios
      .delete(
        `http://localhost:8081/management/sessions/${sessionId}`
      )
      .then(() => {
        setSessions(
          sessions.filter(
            (session) => session.SessionID !== sessionId
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting session:", error);
      });
  };

  const handleEdit = (session) => {
    setEditingSession(session); // Set the session being edited
  };

  const handleSaveEdit = () => {
    // Save the edited session
    axios
      .put(
        `http://localhost:8081/management/sessions/${editingSession.SessionID}`,
        editingSession
>>>>>>> origin/master
      )
      .then((response) => {
        setSessions(
          sessions.map((s) =>
<<<<<<< HEAD
            s.SessionID === editedSession.SessionID ? response.data.session : s
          )
        );
        setEditedSession(null); // Clear the editing state
=======
            s.SessionID === editingSession.SessionID
              ? response.data.session
              : s
          )
        );
        setEditingSession(null); // Clear the editing state
>>>>>>> origin/master
      })
      .catch((error) => {
        console.error("Error updating session:", error);
      });
  };

  return (
    <div>
      <div className="container mx-auto">
<<<<<<< HEAD
        <h1 className="text-3xl font-semibold my-4 text-center">Sessions</h1>
        <div className="py-8">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-center">Tenants</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-700 text-white">
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                      TenantID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.TenantID}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.AssociationName}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.ContactInfo}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => handleSelectTenants(user.TenantID)}
                          className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {CurrentTenant && (
          <>
            {Teams.length === 0 ? (
              <h6 className="text-2xl font-semibold mb-4 text-center">
                You Can't Session (Add Team Before)
              </h6>
            ) : (
              <div className="my-4">
                {!isAdding && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Add New Session
                  </button>
                )}
                {isAdding && (
                  <div className="my-8">
                    <h2 className="text-2xl font-semibold mb-4 text-center">Sessions List</h2>
                    <table className="w-full border-collapse">
                      <thead>
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
                              className="bg-blue-500 text-white px-4 py-2 rounded-md"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setIsAdding(false)}
                              className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
                            >
                              Cancel
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            {sessions.length === 0 ? (
              <h6 className="text-2xl font-semibold mb-4 text-center">There Is No Sessions Yet</h6>
            ) : (
              <div className="my-8">
                <h2 className="text-3xl font-semibold mb-4 text-center">Sessions List</h2>
                <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                  <thead >
                    <tr>
                      <th className="border border-gray-300 px-4 py-2">Date</th>
                      <th className="border border-gray-300 px-4 py-2">Time</th>
                      <th className="border border-gray-300 px-4 py-2">Team Name</th>
                      <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session) => (
                      <tr key={session.SessionID}>
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
                                className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditedSession(null)}
                                className="bg-gray-500 text-white py-1 px-3 rounded"
                              >
                                Cancel
                              </button>
                            </td>
                          </>
                        ) : (
                          <>
                            <td className="border border-gray-300 px-4 py-2">
                              {session.Date}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {session.Time}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              {session.Name}
                            </td>
                            <td className="border border-gray-300 px-4 py-2">
                              <button
                                onClick={() => SetCurrentSes(session.SessionID)}
                                className="bg-green-500 text-white py-1 px-3 rounded mr-2"
                              >
                                Select
                              </button>
                              <button
                                onClick={() => handleEdit(session)}
                                className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteSession(session.SessionID)}
                                className="bg-red-500 text-white py-1 px-3 rounded"
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

            )}
          </>
        )}
      </div>


      {CurrentTenant && (
        <div>
          {CurrentSes && (
            <>
              <Sessions2 CurrentSes={CurrentSes} />
              <ShowAttendanceList CurrentSes={CurrentSes} />
            </>
          )}
        </div>
      )}
=======
        <h1 className="text-2xl font-bold my-4">Sessions</h1>

        <div className="my-4">
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Add New Session
            </button>
          )}
        </div>

        <div className="my-8">
          <h2 className="text-xl font-bold mb-4">Sessions List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">TeamID</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {isAdding && (
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
                    <input
                      type="text"
                      value={newSession.TeamID}
                      onChange={(e) =>
                        setNewSession({
                          ...newSession,
                          TeamID: e.target.value,
                        })
                      }
                      placeholder="Team ID"
                      className="border border-gray-300 rounded-md px-3 py-1"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <button
                      onClick={handleAddSession}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsAdding(false)}
                      className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              )}
              {sessions.map((session) => (
                <tr key={session.SessionID}>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingSession === session ? (
                      <input
                        type="date"
                        value={session.Date}
                        onChange={(e) =>
                          setEditingSession({
                            ...session,
                            Date: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-1"
                      />
                    ) : (
                      session.Date
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingSession === session ? (
                      <input
                        type="time"
                        value={session.Time}
                        onChange={(e) =>
                          setEditingSession({
                            ...session,
                            Time: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-1"
                      />
                    ) : (
                      session.Time
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingSession === session ? (
                      <input
                        type="text"
                        value={session.TeamID}
                        onChange={(e) =>
                          setEditingSession({
                            ...session,
                            TeamID: e.target.value,
                          })
                        }
                        className="border border-gray-300 rounded-md px-3 py-1"
                      />
                    ) : (
                      session.TeamID
                    )}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {editingSession === session ? (
                      <button
                        onClick={handleSaveEdit}
                        className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(session)}
                        className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteSession(session.SessionID)}
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
      <div>
        <Sessions2 />
      </div>

      <div>
        <SessionReportTable />
      </div>

      <div>
        <CoachFillForm />
      </div>
>>>>>>> origin/master
    </div>
  );
}
