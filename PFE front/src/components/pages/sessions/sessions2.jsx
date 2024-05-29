import React, { useState, useEffect } from "react";
import axios from "axios";

export default function SessionReports() {
    const [sessionReports, setSessionReports] = useState([]);
    const [newSessionReport, setNewSessionReport] = useState({
        ReportText: "",
        CreatedAt: ""
    });
    const [editingReport, setEditingReport] = useState(null); // Session report being edited
    const [isAdding, setIsAdding] = useState(false); // State to control the visibility of the new report form

    useEffect(() => {
        // Fetch session reports from the backend when component mounts
        axios
            .get("http://localhost:8081/management/session-reports")
            .then((response) => {
                setSessionReports(response.data.sessionReports);
                console.log("Fetched session reports:", response.data.sessionReports);
            })
            .catch((error) => {
                console.error("Error fetching session reports:", error);
            });
    }, []);

    const handleAddSessionReport = () => {
        // Send a POST request to add a new session report
        axios
            .post("http://localhost:8081/management/session-reports", newSessionReport)
            .then((response) => {
                setSessionReports([
                    response.data.sessionReport,
                    ...sessionReports
                ]);
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
                setSessionReports(sessionReports.filter(report => report.ReportID !== reportId));
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
            .put(`http://localhost:8081/management/session-reports/${editingReport.ReportID}`, editingReport)
            .then((response) => {
                setSessionReports(sessionReports.map((report) =>
                    report.ReportID === editingReport.ReportID ? response.data.sessionReport : report
                ));
                setEditingReport(null); // Clear the editing state
            })
            .catch((error) => {
                console.error("Error updating session report:", error);
            });
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-2xl font-bold my-4">Session Reports</h1>

            <div className="my-4">
                {!isAdding && (
                    <button
                        onClick={() => setIsAdding(true)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Add New Session Report
                    </button>
                )}
            </div>

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
                        {isAdding && (
                            <tr>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="text"
                                        value={newSessionReport.ReportText}
                                        onChange={(e) => setNewSessionReport({ ...newSessionReport, ReportText: e.target.value })}
                                        placeholder="Report Text"
                                        className="border border-gray-300 rounded-md px-3 py-1"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <input
                                        type="date"
                                        value={newSessionReport.CreatedAt}
                                        onChange={(e) => setNewSessionReport({ ...newSessionReport, CreatedAt: e.target.value })}
                                        className="border border-gray-300 rounded-md px-3 py-1"
                                    />
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={handleAddSessionReport}
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
                                    {editingReport === report ? (
                                        <button
                                            onClick={handleSaveEdit}
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
        </div>
    );
}
