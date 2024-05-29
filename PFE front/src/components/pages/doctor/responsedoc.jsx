import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorViewResponses = () => {
    const [forms, setForms] = useState([]);
    const [selectedForm, setSelectedForm] = useState('');
    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);

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
        // Fetch responses for the selected form
        fetchFormResponses(selectedFormName);
    };

    const fetchFormResponses = async (formName) => {
        try {
            const response = await axios.get(`http://localhost:8081/formresponses/${formName}`);
            setResponses(response.data.responses);
        } catch (error) {
            console.error(`Error fetching responses for form ${formName}:`, error);
        }
    };

    const handleDeleteResponse = async (responseId) => {
        try {
            await axios.delete(`http://localhost:8081/formresponses/${responseId}`);
            // Refetch the form responses after deletion
            fetchFormResponses(selectedForm);
            console.log('Response deleted successfully');
        } catch (error) {
            console.error('Error deleting response:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold mb-4">View Form Responses</h1>
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
                            <h2 className="text-xl font-bold mb-2">{selectedForm}</h2>
                            {responses.length > 0 ? (
                                <div>
                                    {responses.map((response, index) => (
                                        <div key={index} className="mb-4 p-4 border border-gray-300 rounded">
                                            <h3 className="text-lg font-semibold mb-2">Response {index + 1}</h3>
                                            <p className="font-medium">Player Name: {response.playerName}</p>
                                            {Object.keys(response).map((questionKey, qIndex) => {
                                                // Skip playerName key
                                                if (questionKey !== 'playerName') {
                                                    return (
                                                        <div key={qIndex} className="mb-2">
                                                            <p className="font-medium">{response[questionKey].text}</p>
                                                            <p>{response[questionKey].value}</p>
                                                        </div>
                                                    );
                                                }
                                                return null;
                                            })}
                                            <button
                                                onClick={() => handleDeleteResponse(response.ResponseID)}
                                                className="bg-red-500 text-white px-4 py-2 mt-2"
                                            >
                                                Delete Response
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>No responses found for this form.</p>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default DoctorViewResponses;
