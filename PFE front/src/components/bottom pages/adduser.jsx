import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddUser = () => {
    const [formData, setFormData] = useState({
        email: '',
        role: '',
        sport: '',
    });

    const [sports, setSports] = useState([]);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    useEffect(() => {
        const fetchSports = async () => {
            try {
                const response = await axios.get('http://localhost:8081/api/sports');
                setSports(response.data);
            } catch (error) {
                console.error('Error fetching sports:', error);
            }
        };
        fetchSports();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/users', {
                email: formData.email,
                role: formData.role,
                sport: formData.role === 'coach' ? formData.sport : null,
            });
            setSubmitSuccess(true);
            setSubmitError('');
            setFormData({
                email: '',
                role: '',
                sport: '',
            });
        } catch (error) {
            setSubmitSuccess(false);
            setSubmitError('Error adding user');
            console.error('Error adding user:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Add User</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        autoComplete="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <select
                        name="role"
                        id="role"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={formData.role}
                        onChange={handleChange}
                    >
                        <option value="">Select a role</option>
                        <option value="coach">Coach</option>
                        <option value="player">Player</option>
                        <option value="FinanceManager">Finance Manager</option>
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>
                {formData.role === 'coach' && (
                    <div>
                        <label htmlFor="sport" className="block text-sm font-medium text-gray-700">
                            Sport
                        </label>
                        <select
                            name="sport"
                            id="sport"
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            value={formData.sport}
                            onChange={handleChange}
                        >
                            <option value="">Select a sport</option>
                            {sports.map(sport => (
                                <option key={sport.SportID} value={sport.SportID}>{sport.Name}</option>
                            ))}
                        </select>
                    </div>
                )}
                <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Add User
                </button>
                {submitSuccess && <p className="text-green-500">User added successfully!</p>}
                {submitError && <p className="text-red-500">{submitError}</p>}
            </form>
        </div>
    );
};

export default AddUser;
