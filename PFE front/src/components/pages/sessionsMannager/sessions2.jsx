import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SessionRapportFull from "./sessionreportfull";
import { AuthContext } from "../../../../Context/AuthContext";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export default function SessionReports(props) {
  const { CurrentUser } = useContext(AuthContext);
  const queryParams = new URLSearchParams(location.search);
  const SessionDash = queryParams.get("Repport");
  const [CurrentSession, SetCurrentSession] = useState(null);
  const [sessionReports, setSessionReports] = useState([]);
  const [RapportDetails, setRapportDetails] = useState([]);
  const [newSessionReport, setNewSessionReport] = useState({
    ReportText: "",
    CreatedAt: "",
  });
  const [editingReport, setEditingReport] = useState(null); // Session report being edited
  const [isAdding, setIsAdding] = useState(false);
  const [IsEditing, SetIsEditing] = useState(false); // State to control the visibility of the new report form
  const CheckSelectedTeam = () => {
    if (SessionDash) {
      SetCurrentSession(SessionDash);
    } else {
      SetCurrentSession(props.CurrentSes);
    }
  };
  const GetSessionRapport = (ID) => {
    axios
      .get(
        `http://localhost:8081/api/management/mannager/GetRapport?SessionID=${ID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setSessionReports(response.data);
        console.log("Rapports Fetch:", response.data); // Changed Teams to response.data
      })
      .catch((error) => {
        console.error("Error fetching Rapports:", error);
      });
  };
  useEffect(() => {
    CheckSelectedTeam();
  }, []);
  useEffect(() => {
    if (CurrentSession) {
      GetSessionRapport(CurrentSession);
    }
  }, [CurrentSession]);
  useEffect(() => {
    if (props.CurrentSes) {
      GetSessionRapport(props.CurrentSes);
    }
  }, [props.CurrentSes]);
  const HandelSelectRapport = (rep) => {
    setRapportDetails(rep);
  };
  const HandleDetail = () => {
    if (sessionReports.length > 0) {
      if (RapportDetails.ReportID) {
        return (
          <>
            <SessionRapportFull
              CurrentRapport={RapportDetails}
              IsEditing={IsEditing}
              SetIsEditing={SetIsEditing}
              SetCurrentRapport={setRapportDetails}
            />
          </>
        );
      }
    }
  };
  const handleAddSessionReport = () => {
    // Send a POST request to add a new session report
    axios
      .post(
        `http://localhost:8081/api/management/mannager/AddSession?TenantID=${CurrentUser}`,
        newSessionReport
      )
      .then((response) => {
        setSessionReports([response.data, ...sessionReports]);
        setNewSessionReport({ ReportText: "", CreatedAt: "" });
        setIsAdding(false); // Hide new row after adding
      })
      .catch((error) => {
        console.error("Error adding session report:", error);
      });
  };

  const handleDeleteSessionReport = (reportId) => {
    // Send a DELETE request to delete a session report
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
        axios
          .delete(
            `http://localhost:8081/management/session-reports/${reportId}`
          )
          .then(() => {
            setSessionReports(
              sessionReports.filter((report) => report.ReportID !== reportId)
            );
          })
          .catch((error) => {
            console.error("Error deleting session report:", error);
          });
      }
    });
  };

  const handleEdit = (report) => {
    SetIsEditing(true); // Set the session report being edited#
    setRapportDetails(report);
  };

  const handleSaveEdit = () => {
    // Save the edited session report
    axios
      .put(
        `http://localhost:8081/management/session-reports/${editingReport.ReportID}`,
        editingReport
      )
      .then((response) => {
        setSessionReports(
          sessionReports.map((report) =>
            report.ReportID === editingReport.ReportID
              ? response.data.sessionReport
              : report
          )
        );
        setEditingReport(null); // Clear the editing state
      })
      .catch((error) => {
        console.error("Error updating session report:", error);
      });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-4 text-center">Session Reports</h1>
      {sessionReports.length === 0 ? (
        <h2 className="text-center">There Is No Report Yet</h2>
      ) : (
        <div className="my-8">
          <h2 className="text-2xl font-bold mb-4 text-center">Session Reports List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Stage</th>
                  <th className="border border-gray-300 px-4 py-2">Time</th>
                  <th className="border border-gray-300 px-4 py-2">Content</th>
                </tr>
              </thead>
              <tbody>
                {sessionReports.map((report) => (
                  <tr key={report.ReportID} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">
                      {editingReport === report ? (
                        <input
                          type="text"
                          value={report.ReportText}
                          onChange={(e) =>
                            setEditingReport({
                              ...report,
                              ReportText: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-md px-3 py-1"
                        />
                      ) : (
                        report.ReportText
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {editingReport === report ? (
                        <input
                          type="date"
                          value={report.CreatedAt}
                          onChange={(e) =>
                            setEditingReport({
                              ...report,
                              CreatedAt: e.target.value,
                            })
                          }
                          className="border border-gray-300 rounded-md px-3 py-1"
                        />
                      ) : (
                        report.CreatedAt
                      )}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <button
                        onClick={() => HandelSelectRapport(report)}
                        className="bg-green-500 text-white py-1 px-3 rounded mr-2 hover:bg-green-600"
                      >
                        Select
                      </button>
                      {editingReport === report ? (
                        <button
                          onClick={Set}
                          className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEdit(report)}
                          className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                        >
                          Edit
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteSessionReport(report.ReportID)}
                        className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
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
      )}
      {HandleDetail()}
    </div>
  );
}
