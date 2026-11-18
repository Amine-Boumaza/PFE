import React, { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";

import DoctorViewResponses from "./responsedoc";

const DoctorCreateForm = () => {
  const { CurrentUser } = useContext(AuthContext);
  const [formName, setFormName] = useState("");
  const [formData, setFormData] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState("text");
  const [submittingForm, setSubmittingForm] = useState(false); // To track form submission state

  const addQuestion = () => {
    if (questionText.trim() === "") return;
    const newQuestion = {
      text: questionText,
      type: questionType === "checkmark" ? "checkmark" : "text",
      options: questionType === "checkmark" ? ["Yes", "No"] : null,
    };
    setFormData([...formData, newQuestion]);
    setQuestionText("");
  };

  const removeQuestion = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };

  const handleFormSubmit = async () => {
    if (formName.trim() === "" || formData.length === 0) return;

    try {
      setSubmittingForm(true); // Set submittingForm to true when form submission starts
      console.log("Submitting form:", { formName, formData }); // Log data being sent to the backend
      const response = await axios.post(
        "http://localhost:8081/management/doctor",
        {
          formName: formName,
          formData: formData,
          TenantID: CurrentUser.TenantID, // Corrected formData key
        }
      );
      console.log("Form submitted successfully:", response.data);
      // Clear form data after successful submission
      setFormName("");
      setFormData([]);
    } catch (error) {
      console.error("Error creating form:", error);
    } finally {
      setSubmittingForm(false); // Reset submittingForm to false after form submission completes
    }
  };

  return (
    <div>
      <DoctorViewResponses />
    </div>
  );
};

export default DoctorCreateForm;
