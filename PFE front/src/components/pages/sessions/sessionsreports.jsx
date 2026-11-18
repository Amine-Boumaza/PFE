import React, { useState, useEffect } from "react";
import axios from "axios";
import SessionRapportFull from "./sessionreportfull";

export default function SessionReports(props) {
  const [sessionReports, setSessionReports] = useState([]);
  const [RapportDetails, setRapportDetails] = useState([]);
  const [newSessionReport, setNewSessionReport] = useState({
    ReportText: "",
    CreatedAt: "",
  });
  const [editingReport, setEditingReport] = useState(null); // Session report being edited
  const [isAdding, setIsAdding] = useState(false); // State to control the visibility of the new report form
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
    if (props.CurrentSes) {
      GetSessionRapport(props.CurrentSes);
    }
  }, [props.CurrentSes]);
  const HandelSelectRapport = (rep) => {
    setRapportDetails(rep);
  };
  const HandleDetail = () => {
    if (RapportDetails.ReportID) {
      return (
        <>
          <SessionRapportFull CurrentRapport={RapportDetails} />
        </>
      );
    }
  };
  const handleAddSessionReport = () => {
    // Send a POST request to add a new session report
    axios
      .post(
        "http://localhost:8081/management/session-reports",
        newSessionReport
      )
      .then((response) => {
        setSessionReports([response.data.sessionReport, ...sessionReports]);
        setNewSessionReport({ ReportText: "", CreatedAt: "" });
        setIsAdding(false); // Hide new row after adding
      })
      .catch((error) => {
        console.error("Error adding session report:", error);
      });
  };

  const handleDeleteSessionReport = (reportId) => {
    // Send a DELETE request to delete a session report
    axios
      .delete(`http://localhost:8081/management/session-reports/${reportId}`)
      .then(() => {
        setSessionReports(
          sessionReports.filter((report) => report.ReportID !== reportId)
        );
      })
      .catch((error) => {
        console.error("Error deleting session report:", error);
      });
  };

  const handleEdit = (report) => {
    setEditingReport(report); // Set the session report being edited
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
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Session Reports</h1>
      {sessionReports.length === 0 ? (
        <h2>There Is No Rapport Yet</h2>
      ) : (
        <div className="my-8">
          <h2 className="text-xl font-bold mb-4">Session Reports List</h2>
          <table className="w-full border-collapse">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Stage</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Content</th>
              </tr>
            </thead>
            <tbody>
              {sessionReports.map((report) => (
                <tr key={report.ReportID}>
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
                      className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                    >
                      Select
                    </button>
                    {editingReport === report ? (
                      <button
                        onClick={Set}
                        className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(report)}
                        className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteSessionReport(report.ReportID)}
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
      )}
      {HandleDetail()}
    </div>
  );
}
