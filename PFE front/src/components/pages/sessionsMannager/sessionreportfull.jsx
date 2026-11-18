import React, { useState } from "react";
import axios from "axios";

const SessionReportTable = (props) => {
  const [editedRapport, setEditedRapport] = useState({
    ...props.CurrentRapport,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedRapport({
      ...editedRapport,
      [name]: value,
    });
  };

  const handleSave = () => {
    axios
      .put(
        `http://localhost:8081/api/management/mannager/EditRapport`,
        editedRapport
      )
      .then((response) => {
        props.SetCurrentRapport(response.data); // Update the current report with the response data
        props.SetIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating session report:", error);
      });
  };

  const handleCancel = () => {
    props.SetIsEditing(false);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-4 text-center text-gray-800">Session Report</h1>
      <div className="my-8">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Report Details</h2>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Report Text</th>
                <th className="border border-gray-300 px-4 py-2">Created At</th>
                <th className="border border-gray-300 px-4 py-2">Initial Stage</th>
                <th className="border border-gray-300 px-4 py-2">Main Stage</th>
                <th className="border border-gray-300 px-4 py-2">Final Stage</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                  {props.IsEditing ? (
                    <input
                      type="text"
                      name="ReportText"
                      value={editedRapport.ReportText}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-1 w-full"
                    />
                  ) : (
                    props.CurrentRapport.ReportText
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                  {props.IsEditing ? (
                    <input
                      type="date"
                      name="CreatedAt"
                      value={editedRapport.CreatedAt}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-1"
                    />
                  ) : (
                    props.CurrentRapport.CreatedAt
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                  {props.IsEditing ? (
                    <input
                      type="text"
                      name="InitialStage"
                      value={editedRapport.InitialStageContent}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-1"
                    />
                  ) : (
                    props.CurrentRapport.InitialStageContent
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                  {props.IsEditing ? (
                    <input
                      type="text"
                      name="MainStage"
                      value={editedRapport.MainStageContent}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-1"
                    />
                  ) : (
                    props.CurrentRapport.MainStageContent
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 text-gray-800">
                  {props.IsEditing ? (
                    <input
                      type="text"
                      name="FinalStage"
                      value={editedRapport.FinalStageContent}
                      onChange={handleChange}
                      className="border border-gray-300 rounded-md px-3 py-1"
                    />
                  ) : (
                    props.CurrentRapport.FinalStageContent
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        {props.IsEditing && (
          <div className="mt-4 flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-blue-600"
            >
              Save
            </button>
            <button
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionReportTable;
