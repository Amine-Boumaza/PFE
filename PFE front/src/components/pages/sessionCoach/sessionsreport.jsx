import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import SessionRapportFull from "./sessionreportfull";
import { AuthContext } from "../../../../Context/AuthContext";

export default function SessionReports(props) {
  const { CurrentUser } = useContext(AuthContext);
  const [IsEditing, SetIsEditing] = useState(false);
  const [sessionReports, setSessionReports] = useState([]);
  const [RapportDetails, setRapportDetails] = useState(null);
  const [newSessionReport, setNewSessionReport] = useState({
    ReportText: "",
    CreatedAt: new Date().toISOString().slice(0, 10), // Default to today's date
    InitialStage: "",
    InitialStageTime: "",
    InitialStageContent: "",
    InitialStageNotes: "",
    MainStage: "",
    MainStageTime: "",
    MainStageContent: "",
    MainStageNotes: "",
    FinalStage: "",
    FinalStageTime: "",
    FinalStageContent: "",
    FinalStageNotes: "",
  });
  const [editingReport, setEditingReport] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleEdit = (report) => {
    SetIsEditing(true);
    setRapportDetails(report);
  };

  const GetSessionRapport = (ID) => {
    axios
      .get(
        `http://localhost:8081/api/management/mannager/GetRapport?SessionID=${ID}`,
        { withCredentials: true }
      )
      .then((response) => {
        setSessionReports(response.data);
        console.log("Rapports Fetch:", response.data);
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
    if (RapportDetails && RapportDetails.ReportID) {
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
  };

  const handleAddSessionReport = () => {
    axios
      .post(
        `http://localhost:8081/api/management/coach/AddRapport?SessionID=${props.CurrentSes}&TennatID=${CurrentUser.TenantID}`,
        newSessionReport
      )
      .then((response) => {
        setSessionReports([response.data, ...sessionReports]);
        setNewSessionReport({
          ReportText: "",
          CreatedAt: new Date().toISOString().slice(0, 10),
          InitialStage: "",
          InitialStageTime: "",
          InitialStageContent: "",
          InitialStageNotes: "",
          MainStage: "",
          MainStageTime: "",
          MainStageContent: "",
          MainStageNotes: "",
          FinalStage: "",
          FinalStageTime: "",
          FinalStageContent: "",
          FinalStageNotes: "",
        });
        setIsAdding(false);
      })
      .catch((error) => {
        console.error("Error adding session report:", error);
      });
  };

  const handleDeleteSessionReport = (reportId) => {
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

  return (
    <>
      {props.CurrentSes && (
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold my-4">Session Reports</h1>
          {sessionReports.length === 0 ? (
            <>
              <h2 className="text-gray-900">There Is No Rapport Yet</h2>
              <div className="my-4">
                {!isAdding && (
                  <button
                    onClick={() => setIsAdding(true)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300"
                  >
                    Add New Session Report
                  </button>
                )}
              </div>
              {isAdding && (
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
                  <div>
                    <h2 className="text-2xl font-semibold leading-tight text-center text-gray-900">
                      Session Report
                    </h2>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleAddSessionReport();
                        }}
                      >
                        <table className="min-w-full leading-normal rounded-lg overflow-hidden">
                          <thead className="bg-gray-700 text-white">
                            <tr>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider">
                                Report Text
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider">
                                Created At
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider">
                                Initial Stage Content
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider">
                                Main Stage Content
                              </th>
                              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-700 text-left text-xs font-semibold uppercase tracking-wider">
                                Final Stage Content
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <input
                                  type="text"
                                  value={newSessionReport.ReportText}
                                  onChange={(e) =>
                                    setNewSessionReport({
                                      ...newSessionReport,
                                      ReportText: e.target.value,
                                    })
                                  }
                                  className="border border-gray-300 rounded-md px-3 py-1 w-full"
                                />
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <input
                                  type="date"
                                  value={newSessionReport.CreatedAt}
                                  onChange={(e) =>
                                    setNewSessionReport({
                                      ...newSessionReport,
                                      CreatedAt: e.target.value,
                                    })
                                  }
                                  className="border border-gray-300 rounded-md px-3 py-1 w-full"
                                />
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <input
                                  type="text"
                                  value={newSessionReport.InitialStageContent}
                                  onChange={(e) =>
                                    setNewSessionReport({
                                      ...newSessionReport,
                                      InitialStageContent: e.target.value,
                                    })
                                  }
                                  className="border border-gray-300 rounded-md px-3 py-1 w-full"
                                />
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <input
                                  type="text"
                                  value={newSessionReport.MainStageContent}
                                  onChange={(e) =>
                                    setNewSessionReport({
                                      ...newSessionReport,
                                      MainStageContent: e.target.value,
                                    })
                                  }
                                  className="border border-gray-300 rounded-md px-3 py-1 w-full"
                                />
                              </td>
                              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                <input
                                  type="text"
                                  value={newSessionReport.FinalStageContent}
                                  onChange={(e) =>
                                    setNewSessionReport({
                                      ...newSessionReport,
                                      FinalStageContent: e.target.value,
                                    })
                                  }
                                  className="border border-gray-300 rounded-md px-3 py-1 w-full"
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                        <div className="flex justify-end mt-4">
                          <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
                            Save Report
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="my-8">
              <h2 className="text-xl font-bold mb-4">Session Reports List</h2>
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b border-gray-200 bg-gray-700 text-white">
                      Stage
                    </th>
                    <th className="px-5 py-3 border-b border-gray-200 bg-gray-700 text-white">
                      Time
                    </th>
                    <th className="px-5 py-3 border-b border-gray-200 bg-gray-700 text-white">
                      Content
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {sessionReports.map((report) => (
                    <tr
                      key={report.ReportID}
                      className="hover:bg-gray-100"
                    >
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {report.ReportText}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {report.CreatedAt}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => HandelSelectRapport(report)}
                          className="bg-green-500 text-white py-1 px-3 rounded mr-2 hover:bg-green-700 transition duration-300"
                        >
                          Select
                        </button>
                        <button
                          onClick={() => handleEdit(report)}
                          className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-700 transition duration-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            handleDeleteSessionReport(report.ReportID)
                          }
                          className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-300"
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
      )}
    </>
  )
};