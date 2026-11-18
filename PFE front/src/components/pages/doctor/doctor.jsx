import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from "../../../../Context/AuthContext";

import DoctorViewResponses from './responsedoc';

const DoctorCreateForm = () => {
  const { CurrentUser } = useContext(AuthContext);
  const [formName, setFormName] = useState('');
  const [formData, setFormData] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('text');
  const [submittingForm, setSubmittingForm] = useState(false); // To track form submission state
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch available forms from the backend when the component mounts
    fetchForms();
  }, []);

  const fetchForms = async () => {
    try {
      const response = await axios.get('http://localhost:8081/forms', {
        params: {
          TenantID: CurrentUser.TenantID
        }
      });
      console.log('Forms data:', response.data.forms); // Log forms data
      setForms(response.data.forms);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching forms:', error);
    }
  };

  const addQuestion = () => {
    if (questionText.trim() === '') return;
    const newQuestion = {
      text: questionText,
      type: questionType === 'checkmark' ? 'checkmark' : 'text',
      options: questionType === 'checkmark' ? ['Yes', 'No'] : null
    };
    setFormData([...formData, newQuestion]);
    setQuestionText('');
  };

  const removeQuestion = (index) => {
    const updatedFormData = [...formData];
    updatedFormData.splice(index, 1);
    setFormData(updatedFormData);
  };

  const handleFormSubmit = async () => {
    if (formName.trim() === '' || formData.length === 0) return;

    try {
      setSubmittingForm(true); // Set submittingForm to true when form submission starts
      console.log('Submitting form:', { formName, formData }); // Log data being sent to the backend
      const response = await axios.post('http://localhost:8081/management/doctor', {
        formName: formName,
        formData: formData,
        TenantID: CurrentUser.TenantID // Include TenantID in the request
      });
      console.log('Form submitted successfully:', response.data);
      // Clear form data after successful submission
      setFormName('');
      setFormData([]);
      // Refetch the list of forms after submission
      fetchForms();
    } catch (error) {
      console.error('Error creating form:', error);
    } finally {
      setSubmittingForm(false); // Reset submittingForm to false after form submission completes
    }
  };

  const deleteForm = async (formName) => {
    try {
      await axios.delete('http://localhost:8081/forms', {
        data: {
          formName: formName,
          TenantID: CurrentUser.TenantID // Include TenantID in the request body
        }
      });
      // Refetch the list of forms after deletion
      fetchForms();
      console.log('Form deleted successfully');
    } catch (error) {
      console.error('Error deleting form:', error);
    }
  };

  return (
    <div>
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Create Form</h1>
        <div className="mb-4">
          <label htmlFor="formName" className="block mb-2">Form Name:</label>
          <input type="text" id="formName" value={formName} onChange={(e) => setFormName(e.target.value)} className="border border-gray-300 px-2 py-1 w-full" required />
        </div>
        <div className="mb-4">
          <label htmlFor="questionText" className="block mb-2">Question Text:</label>
          <input type="text" id="questionText" value={questionText} required onChange={(e) => setQuestionText(e.target.value)} className="border border-gray-300 px-2 py-1 w-full" />
        </div>
        <div className="mb-4">
          <label htmlFor="questionType" className="block mb-2">Question Type:</label>
          <select id="questionType" value={questionType} required onChange={(e) => setQuestionType(e.target.value)} className="border border-gray-300 px-2 py-1 w-full">
            <option value="text">Text</option>
            <option value="checkmark">Checkmark</option>
          </select>
        </div>
        <div className="mb-4 text-center">
          <button onClick={addQuestion} className="bg-blue-500 text-white px-4 py-2 mr-2">Add Question</button>
        </div>
        {formData.length > 0 && (
          <div className="mb-4">
            <table className="w-full border-collapse border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-400 px-4 py-2">Question</th>
                  <th className="border border-gray-400 px-4 py-2">Type</th>
                  <th className="border border-gray-400 px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {formData.map((question, index) => (
                  <tr key={index}>
                    <td className="border border-gray-400 px-4 py-2">{question.text}</td>
                    <td className="border border-gray-400 px-4 py-2">
                      {question.type === 'checkmark' ? 'Yes/No' : 'Text'}
                    </td>
                    <td className="border border-gray-400 px-4 py-2">
                      <button onClick={() => removeQuestion(index)} className="bg-red-500 text-white px-2 py-1 mr-2">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <div className='text-center'>
          <button onClick={handleFormSubmit} className="bg-indigo-500 text-white px-4 py-2" disabled={submittingForm}>
            {submittingForm ? 'Submitting...' : 'Save Form'}
          </button>
        </div>
      </div>

      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4">Existing Forms</h1>
        {loading ? (
          <p>Loading forms...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-400 mb-4">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-400 px-4 py-2">Form Name</th>
                <th className="border border-gray-400 px-4 py-2">Questions</th>
                <th className="border border-gray-400 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form, index) => (
                <tr key={index}>
                  <td className="border border-gray-400 px-4 py-2">{form.formName}</td>
                  <td className="border border-gray-400 px-4 py-2">
                    <ul>
                      {form.formData && form.formData.length > 0 && form.formData.map((question, qIndex) => (
                        <li key={qIndex}>{question.text} - {question.type === 'checkmark' ? 'Yes/No' : 'Text'}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border border-gray-400 px-4 py-2">
                    <button onClick={() => deleteForm(form.formName)} className="bg-red-500 text-white px-2 py-1 mr-2">Delete</button>
                    {/* Add edit functionality here */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div><DoctorViewResponses /></div>

    </div>
  );
};

export default DoctorCreateForm;
