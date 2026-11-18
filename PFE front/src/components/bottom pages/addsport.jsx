import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddSport = () => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
    });

    const [sports, setSports] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        fetchSports();
    }, []);

    const fetchSports = async () => {
        try {
            const response = await axios.get('http://localhost:8081/api/sports');
            setSports(response.data);
        } catch (error) {
            console.error('Error fetching sports:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name) {
            setSubmitError('Name is required');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8081/api/add-sport', {
                name: formData.name,
                description: formData.description,
            });
            setSubmitSuccess(true);
            setSubmitError('');
            setFormData({
                name: '',
                description: '',
            });
            fetchSports();  // Refresh the list of sports after adding a new one
        } catch (error) {
            setSubmitSuccess(false);
            setSubmitError('Error adding sport');
            console.error('Error adding sport:', error);
        }
    };

    const handleDelete = async (sportId) => {
        try {
            await axios.delete(`http://localhost:8081/api/delete-sport/${sportId}`);
            fetchSports();  // Refresh the list of sports after deletion
        } catch (error) {
            console.error('Error deleting sport:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add Sport</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={formData.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        name="description"
                        id="description"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add Sport
                </button>
                {submitSuccess && <p className="text-green-500">Sport added successfully!</p>}
                {submitError && <p className="text-red-500">{submitError}</p>}
            </form>

            <h2 className="text-2xl font-bold mt-8 mb-4">Existing Sports</h2>
            <table className="min-w-full bg-white">
                <thead>
                    <tr>
                        <th className="px-6 py-2 text-xs text-gray-500">
                            Name
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                            Description
                        </th>
                        <th className="px-6 py-2 text-xs text-gray-500">
                            Actions
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white">
                    {sports.map((sport) => (
                        <tr key={sport.SportID} className="whitespace-nowrap">
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {sport.Name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                {sport.Description}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                                <button
                                    onClick={() => handleDelete(sport.SportID)}
                                    className="text-red-600 hover:text-red-900"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddSport;
