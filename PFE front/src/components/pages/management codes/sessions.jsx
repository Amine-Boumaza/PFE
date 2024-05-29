import React, { useState, useEffect } from "react";
import axios from "axios";

import Sessions2 from "../sessions/sessions2.jsx";
import SessionReportTable from "../sessions/sessionreportfull.jsx";
import CoachFillForm from "../sessions/docformfill.jsx";


export default function Sessions() {
  const [sessions, setSessions] = useState([]);
  const [newSession, setNewSession] = useState({
    Date: "",
    Time: "",
    TeamID: ""
  });
  const [editedSession, setEditedSession] = useState({
    SessionID: "",
    Date: "",
    Time: "",
    TeamID: ""
  });
  const [isAdding, setIsAdding] = useState(false); // New state to control the visibility of the new row
  const [editingSession, setEditingSession] = useState(null); // Session being edited

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
  }, []);

  const handleAddSession = () => {
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
        });
        setIsAdding(false); // Hide new row after adding
      })
      .catch((error) => {
        console.error("Error adding session:", error);
      });
  };

  const handleDeleteSession = (sessionId) => {
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
      )
      .then((response) => {
        setSessions(
          sessions.map((s) =>
            s.SessionID === editingSession.SessionID
              ? response.data.session
              : s
          )
        );
        setEditingSession(null); // Clear the editing state
      })
      .catch((error) => {
        console.error("Error updating session:", error);
      });
  };

  return (
    <div>
      <div className="container mx-auto">
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
    </div>
  );
}
