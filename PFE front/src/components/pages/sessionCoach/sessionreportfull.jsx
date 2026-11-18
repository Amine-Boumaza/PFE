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
    <div className="antialiased font-sans">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-2xl font-semibold leading-tight">
              Session Report
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Report Text
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Created At
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Initial Stage
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Initial Stage Time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Initial Stage Content
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Initial Stage Notes
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Main Stage
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Main Stage Time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Main Stage Content
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Main Stage Notes
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Final Stage
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Final Stage Time
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Final Stage Content
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Final Stage Notes
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    {props.IsEditing ? (
                      <>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="text"
                            name="ReportText"
                            value={editedRapport.ReportText}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="date"
                            name="CreatedAt"
                            value={editedRapport.CreatedAt}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="text"
                            name="InitialStage"
                            value={editedRapport.InitialStage}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="text"
                            name="InitialStageTime"
                            value={editedRapport.InitialStageTime}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="text"
                            name="InitialStageContent"
                            value={editedRapport.InitialStageContent}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="text"
                            name="InitialStageNotes"
                            value={editedRapport.InitialStageNotes}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="text"
                            name="MainStage"
                            value={editedRapport.MainStage}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="text"
                            name="MainStageTime"
                            value={editedRapport.MainStageTime}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="text"
                            name="MainStageContent"
                            value={editedRapport.MainStageContent}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="text"
                            name="MainStageNotes"
                            value={editedRapport.MainStageNotes}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="text"
                            name="FinalStage"
                            value={editedRapport.FinalStage}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="text"
                            name="FinalStageTime"
                            value={editedRapport.FinalStageTime}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="text"
                            name="FinalStageContent"
                            value={editedRapport.FinalStageContent}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          <input
                            type="text"
                            name="FinalStageNotes"
                            value={editedRapport.FinalStageNotes}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-md px-3 py-1"
                          />
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.ReportText}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.CreatedAt}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.InitialStage}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.InitialStageTime}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.InitialStageContent}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.InitialStageNotes}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.MainStage}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.MainStageTime}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.MainStageContent}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.MainStageNotes}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.FinalStage}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.FinalStageTime}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.FinalStageContent}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {props.CurrentRapport.FinalStageNotes}
                        </td>
                      </>
                    )}
                  </tr>
                </tbody>
              </table>
              {props.IsEditing && (
                <div className="mt-4">
                  <button
                    onClick={handleSave}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SessionReportTable;
