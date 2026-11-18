import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CoachFillForm = () => {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState('');
    const [formResponses, setFormResponses] = useState({});
    const [loading, setLoading] = useState(true);
    const [submittingForm, setSubmittingForm] = useState(false);
    const [yesNoOptions, setYesNoOptions] = useState({}); // State to store selected options for "Yes/No" questions
    const [submittedSuccessfully, setSubmittedSuccessfully] = useState(false);
    const [playerName, setPlayerName] = useState(''); // State to store the player name

    useEffect(() => {
        // Fetch available forms from the backend when the component mounts
        fetchForms();
    }, []);

    const fetchForms = async () => {
        try {
            const response = await axios.get('http://localhost:8081/forms');
            setForms(response.data.forms);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching forms:', error);
        }
    };

    const handleFormSelect = (event) => {
        const selectedFormName = event.target.value;
        setSelectedForm(selectedFormName);
        // Fetch form data for the selected form
        fetchFormResponses(selectedFormName);
    };

    const fetchFormResponses = async (formName) => {
        try {
            const response = await axios.get(`http://localhost:8081/forms/${formName}/responses`);
            setFormResponses(response.data.formResponses);
            // Reset yesNoOptions state when selecting a new form
            setYesNoOptions({});
        } catch (error) {
            console.error(`Error fetching responses for form ${formName}:`, error);
        }
    };

    const handleInputChange = (questionId, value) => {
        // Update the formResponses object with the new input value
        setFormResponses({
            ...formResponses,
            [questionId]: {
                ...formResponses[questionId],
                value: value
            }
        });
        // Update yesNoOptions for "Yes/No" questions
        if (formResponses[questionId].type === 'checkmark') {
            setYesNoOptions(prevOptions => ({
                ...prevOptions,
                [questionId]: value
            }));
        }
    };

    const handleSubmitForm = async () => {
        try {
            setSubmittingForm(true);
            console.log('Player Name:', playerName); // Log playerName
            console.log('Form Responses:', formResponses); // Log formResponses
            // Submit form responses to the backend
            await axios.post('http://localhost:8081/submit-form', {
                formName: selectedForm,
                playerName: playerName,
                responses: formResponses
            });
            console.log('Form submitted successfully');
            setSubmittedSuccessfully(true); // Set the submittedSuccessfully state to true
        } catch (error) {
            console.error('Error submitting form:', error);
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
                    <select value={selectedForm} onChange={handleFormSelect} className="border border-gray-300 px-2 py-1 mb-4">
                        <option value="">Select a form...</option>
                        {forms.map((form, index) => (
                            <option key={index} value={form.formName}>{form.formName}</option>
                        ))}
                    </select>
                    {selectedForm && (
                        <div>
                            {/* Add input field for player name */}
                            <input
                                type="text"
                                value={playerName}
                                onChange={(e) => setPlayerName(e.target.value)}
                                placeholder="Enter player name"
                                className="border border-gray-300 px-2 py-1 mb-4"
                            />
                            {formResponses && Object.keys(formResponses).length > 0 && (
                                <div>
                                    <h2 className="text-xl font-bold mb-2">{selectedForm}</h2>
                                    {Object.keys(formResponses).map((questionId, index) => (
                                        <div key={index} className="mb-4">
                                            <label className="block mb-2">{formResponses[questionId].text}</label>
                                            {formResponses[questionId].type === 'checkmark' ? (
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        id={`${questionId}-yes`}
                                                        checked={yesNoOptions[questionId] === 'Yes'}
                                                        onChange={() => handleInputChange(questionId, 'Yes')}
                                                        className="mr-1"
                                                    />
                                                    <label htmlFor={`${questionId}-yes`} className="mr-3">Yes</label>
                                                    <input
                                                        type="checkbox"
                                                        id={`${questionId}-no`}
                                                        checked={yesNoOptions[questionId] === 'No'}
                                                        onChange={() => handleInputChange(questionId, 'No')}
                                                        className="mr-1"
                                                    />
                                                    <label htmlFor={`${questionId}-no`}>No</label>
                                                </div>
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={formResponses[questionId].value}
                                                    onChange={(e) => handleInputChange(questionId, e.target.value)}
                                                    className="border border-gray-300 px-2 py-1 w-full"
                                                />
                                            )}
                                        </div>
                                    ))}
                                    <button onClick={handleSubmitForm} className="bg-blue-500 text-white px-4 py-2" disabled={submittingForm}>
                                        {submittingForm ? 'Submitting...' : 'Submit Form'}
                                    </button>
                                    {submittedSuccessfully && <p className="text-green-500">Submitted successfully</p>}
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
