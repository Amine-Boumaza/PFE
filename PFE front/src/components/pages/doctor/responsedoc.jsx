import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";

const DoctorViewResponses = () => {
  const { CurrentUser } = useContext(AuthContext);
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState("");
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch available forms from the backend when the component mounts
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/forms?TenantID=${CurrentUser.TenantID}`
      );
      setForms(response.data.forms);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };

  const handleFormSelect = (event) => {
    const selectedFormName = event.target.value;
    setSelectedForm(selectedFormName);
    // Fetch responses for the selected form
    fetchFormResponses(selectedFormName);
  };

  const fetchFormResponses = async (formName) => {
    console.log("Form resaults called");
    try {
      const response = await axios.get(
        `http://localhost:8081/formresponses/${formName}`
      );
      setResponses(response.data.responses);
      console.log("Form resaults", response.data.responses);
    } catch (error) {
      console.error(`Error fetching responses for form ${formName}:`, error);
    }
  };

  const handleDeleteResponse = async (responseId) => {
    try {
      await axios.delete(`http://localhost:8081/formresponses/${responseId}`);
      // Refetch the form responses after deletion
      fetchFormResponses(selectedForm);
      console.log("Response deleted successfully");
    } catch (error) {
      console.error("Error deleting response:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">View Form Responses</h1>
      {loading ? (
        <p className="text-center text-gray-500">Loading forms...</p>
      ) : (
        <div className="space-y-6">
          <select
            value={selectedForm}
            onChange={handleFormSelect}
            className="block w-full border border-gray-300 rounded px-4 py-2 bg-white text-gray-700 shadow-sm focus:ring focus:ring-blue-200"
          >
            <option value="">Select a form...</option>
            {forms.map((form, index) => (
              <option key={index} value={form.formName}>
                {form.formName}
              </option>
            ))}
          </select>
          {selectedForm && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">{selectedForm}</h2>
              {responses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {responses.map((response, index) => (
                    <div
                      key={index}
                      className="p-6 border border-gray-300 rounded-lg shadow-sm bg-white"
                    >
                      <h3 className="text-xl font-semibold mb-4 text-center text-gray-800">Response {index + 1}</h3>
                      <div className="mb-4">
                        <h4 className="text-lg font-semibold mb-2 text-center text-gray-700">Player Information</h4>
                        <table className="w-full text-left text-gray-700 mb-4">
                          <tbody>
                            <tr>
                              <th className="border-b border-gray-300 py-2 px-4">Player Name</th>
                              <td className="border-b border-gray-300 py-2 px-4">{response.Name}</td>
                            </tr>
                            <tr>
                              <th className="border-b border-gray-300 py-2 px-4">Player Sex</th>
                              <td className="border-b border-gray-300 py-2 px-4">{response.Sex}</td>
                            </tr>
                            <tr>
                              <th className="border-b border-gray-300 py-2 px-4">Blood Type</th>
                              <td className="border-b border-gray-300 py-2 px-4">{response.Blood_type}</td>
                            </tr>
                            <tr>
                              <th className="border-b border-gray-300 py-2 px-4">Parent Number</th>
                              <td className="border-b border-gray-300 py-2 px-4">{response.Parent_Number}</td>
                            </tr>
                            <tr>
                              <th className="border-b border-gray-300 py-2 px-4">Player Height</th>
                              <td className="border-b border-gray-300 py-2 px-4">{response.Height}</td>
                            </tr>
                            <tr>
                              <th className="border-b border-gray-300 py-2 px-4">Player Weight</th>
                              <td className="border-b border-gray-300 py-2 px-4">{response.Weight}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold mb-2 text-center text-gray-700">Form Response</h4>
                        <table className="w-full text-left text-gray-700">
                          <tbody>
                            {Object.keys(response).map((questionKey, qIndex) => {
                              if (
                                !["Name", "Sex", "Blood_type", "Parent_Number", "Height", "Weight", "ResponseID"].includes(
                                  questionKey
                                )
                              ) {
                                return (
                                  <tr key={qIndex}>
                                    <th className="border-b border-gray-300 py-2 px-4">
                                      {response[questionKey].text}
                                    </th>
                                    <td className="border-b border-gray-300 py-2 px-4">
                                      {response[questionKey].value}
                                    </td>
                                  </tr>
                                );
                              }
                              return null;
                            })}
                          </tbody>
                        </table>
                      </div>
                      <button
                        onClick={() => handleDeleteResponse(response.ResponseID)}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                      >
                        Delete Response
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">No responses found for this form.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DoctorViewResponses;
