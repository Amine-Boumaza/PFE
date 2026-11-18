import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";

const CoachFillForm = (props) => {
  const { CurrentUser } = useContext(AuthContext);
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState("");
  const [formResponses, setFormResponses] = useState({});
  const [loading, setLoading] = useState(true);
  const [submittingForm, setSubmittingForm] = useState(false);
  const [yesNoOptions, setYesNoOptions] = useState({});
  const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
  const [playerName, setPlayerName] = useState("");

  useEffect(() => {
    fetchForms();
  }, []);

  useEffect(() => {
    if (props.CurrentPlayer) {
      setPlayerName(props.CurrentPlayer);
    }
  }, [props.CurrentPlayer]);

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
    fetchFormResponses(selectedFormName);
  };

  const fetchFormResponses = async (formName) => {
    try {
      const response = await axios.get(
        `http://localhost:8081/forms/${formName}/responses`
      );
      setFormResponses(response.data.formResponses);
      setYesNoOptions({});
    } catch (error) {
      console.error(`Error fetching responses for form ${formName}:`, error);
    }
  };

  const handleInputChange = (questionId, value) => {
    setFormResponses({
      ...formResponses,
      [questionId]: {
        ...formResponses[questionId],
        value: value,
      },
    });
    if (formResponses[questionId].type === "checkmark") {
      setYesNoOptions((prevOptions) => ({
        ...prevOptions,
        [questionId]: value,
      }));
    }
  };

  const handleSubmitForm = async () => {
    try {
      setSubmittingForm(true);
      console.log("Player Name:", playerName);
      console.log("Form Responses:", formResponses);
      await axios.post("http://localhost:8081/submit-form", {
        formName: selectedForm,
        playerName: playerName,
        responses: formResponses,
        TenantID: CurrentUser.TenantID,
      });
      console.log("Form submitted successfully");
      setSubmittedSuccessfully(true);
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setSubmittingForm(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-4">Fill Form</h1>
      {loading ? (
        <p>Loading forms...</p>
      ) : (
        <div>
          <select
            value={selectedForm}
            onChange={handleFormSelect}
            className="border border-gray-300 px-2 py-1 mb-4"
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
              {formResponses && Object.keys(formResponses).length > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-2">{selectedForm}</h2>
                  {Object.keys(formResponses).map((questionId, index) => (
                    <div key={index} className="mb-4">
                      <label className="block mb-2">
                        {formResponses[questionId].text}
                      </label>
                      {formResponses[questionId].type === "checkmark" ? (
                        <div>
                          <input
                            type="checkbox"
                            id={`${questionId}-yes`}
                            checked={yesNoOptions[questionId] === "Yes"}
                            onChange={() =>
                              handleInputChange(questionId, "Yes")
                            }
                            className="mr-1"
                          />
                          <label htmlFor={`${questionId}-yes`} className="mr-3">
                            Yes
                          </label>
                          <input
                            type="checkbox"
                            id={`${questionId}-no`}
                            checked={yesNoOptions[questionId] === "No"}
                            onChange={() => handleInputChange(questionId, "No")}
                            className="mr-1"
                          />
                          <label htmlFor={`${questionId}-no`}>No</label>
                        </div>
                      ) : (
                        <input
                          type="text"
                          value={formResponses[questionId].value}
                          onChange={(e) =>
                            handleInputChange(questionId, e.target.value)
                          }
                          className="border border-gray-300 px-2 py-1 w-full"
                        />
                      )}
                    </div>
                  ))}

                  <button
                    onClick={handleSubmitForm}
                    className="bg-blue-500 text-white px-4 py-2"
                    disabled={submittingForm}
                  >
                    {submittingForm ? "Submitting..." : "Submit Form"}
                  </button>
                  {submittedSuccessfully && (
                    <p className="text-green-500">Submitted successfully</p>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CoachFillForm;
