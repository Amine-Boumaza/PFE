import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SessionReports() {
    const [sessionReports, setSessionReports] = useState([]);
    const [newSessionReport, setNewSessionReport] = useState({
        ReportText: "",
        CreatedAt: ""
    });
    const [editedSessionReport, setEditedSessionReport] = useState({
        ReportID: "",
        ReportText: "",
        CreatedAt: ""
    });

    useEffect(() => {
        // Fetch session reports from the backend when component mounts
        axios.get("http://localhost:8081/management/session-reports")
            .then(response => {
                setSessionReports(response.data.sessionReports);
                console.log("Fetched session reports:", response.data.sessionReports);
            })
            .catch(error => {
                console.error("Error fetching session reports:", error);
            });
    }, []);

    const handleAddSessionReport = () => {
        // Send a POST request to add a new session report
        axios.post("http://localhost:8081/management/session-reports", newSessionReport)
            .then(response => {
                setSessionReports([...sessionReports, response.data.sessionReport]);
                setNewSessionReport({ ReportText: "", CreatedAt: "" });
            })
            .catch(error => {
                console.error("Error adding session report:", error);
            });
    };

    const handleDeleteSessionReport = (reportId) => {
        // Send a DELETE request to delete a session report
        axios.delete(`http://localhost:8081/management/session-reports/${reportId}`)
            .then(() => {
                setSessionReports(sessionReports.filter(report => report.ReportID !== reportId));
            })
            .catch(error => {
                console.error("Error deleting session report:", error);
            });
    };

    const handleEditSessionReport = (report) => {
        // Set the session report to be edited
        setEditedSessionReport(report);
    };

    const handleSubmitEdit = () => {
        // Log the data being sent to the backend
        console.log("Edited session report data:", editedSessionReport);

        // Send a PUT request to update the edited session report
        axios.put(`http://localhost:8081/management/session-reports/${editedSessionReport.ReportID}`, editedSessionReport)
            .then(response => {
                // Update the session reports state with the edited session report
                setSessionReports(sessionReports.map(report => {
                    if (report.ReportID === editedSessionReport.ReportID) {
                        return response.data.sessionReport; // Update with the response from the server
                    }
                    return report;
                }));
                // Clear the edited session report state
                setEditedSessionReport({ ReportID: "", ReportText: "", CreatedAt: "" });
            })
            .catch(error => {
                console.error("Error updating session report:", error);
            });
    };


    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Session Reports</h1>

            {/* New Session Report Form */}
            <div className="my-4">
                <h2 className="text-xl font-semibold mb-2">Add New Session Report</h2>
                <div className="flex">
                    <input
                        type="text"
                        value={newSessionReport.ReportText}
                        onChange={(e) => setNewSessionReport({ ...newSessionReport, ReportText: e.target.value })}
                        placeholder="Report Text"
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                    <input
                        type="date"
                        value={newSessionReport.CreatedAt}
                        onChange={(e) => setNewSessionReport({ ...newSessionReport, CreatedAt: e.target.value })}
                        className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                    />
                    <button
                        onClick={handleAddSessionReport}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Add
                    </button>
                </div>
            </div>

            {/* Session Reports Table */}
            <div className="my-8">
                <h2 className="text-xl font-bold mb-4">Session Reports List</h2>
                <table className="w-full border-collapse">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Report Text</th>
                            <th className="border border-gray-300 px-4 py-2">Created At</th>
                            <th className="border border-gray-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sessionReports.map(report => (
                            <tr key={report.ReportID}>
                                <td className="border border-gray-300 px-4 py-2">{report.ReportText}</td>
                                <td className="border border-gray-300 px-4 py-2">{report.CreatedAt}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => handleEditSessionReport(report)}
                                        className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                                    >
                                        Edit
                                    </button>
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

            {/* Edit Session Report Form */}
            {editedSessionReport.ReportID !== "" && (
                <div className="my-4">
                    <h2 className="text-xl font-semibold mb-2">Edit Session Report</h2>
                    <div className="flex">
                        <input
                            type="text"
                            value={editedSessionReport.ReportText}
                            onChange={(e) => setEditedSessionReport({ ...editedSessionReport, ReportText: e.target.value })}
                            placeholder="Report Text"
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <input
                            type="date"
                            value={editedSessionReport.CreatedAt}
                            onChange={(e) => setEditedSessionReport({ ...editedSessionReport, CreatedAt: e.target.value })}
                            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
                        />
                        <button
                            onClick={handleSubmitEdit}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        >
                            Save
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
}
