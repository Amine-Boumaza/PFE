import React, { useState } from 'react';
import axios from 'axios';

const SetPassword = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [userExists, setUserExists] = useState(false);
    const [userHasPassword, setUserHasPassword] = useState(true);

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordError(e.target.value !== password ? 'Passwords do not match' : '');
    };

    const checkUser = async () => {
        try {
            const response = await axios.post('http://localhost:8081/api/check-user', { email });
            setUserExists(response.data.exists);
            setUserHasPassword(response.data.hasPassword);
        } catch (error) {
            console.error('Error checking user:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://localhost:8081/api/set-password', { name, email, password });
            window.location.href = '/login';
        } catch (error) {
            console.error('Error setting password:', error);
        }
    };

    return (
        <div className="container mx-auto">
            <h2 className="text-2xl font-bold mb-4">Set Password</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email address
                    </label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        value={email}
                        onChange={handleEmailChange}
                    />
                </div>
                <button
                    type="button"
                    onClick={checkUser}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Check User
                </button>
                {userExists && !userHasPassword && (
                    <>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                id="confirmPassword"
                                className={`mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md ${passwordError && 'border-red-500'}`}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                            />
                            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
                        </div>
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                value={name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Set Password
                        </button>
                    </>
                )}
                {userExists && userHasPassword && <p className="text-red-500 text-sm">User already has a password.</p>}
                {!userExists && <p className="text-red-500 text-sm">User does not exist.</p>}
            </form>
        </div>
    );
};

export default SetPassword;
