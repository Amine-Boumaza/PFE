import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function login() {
    const [values, setvalues] = useState({
        email: "",
        password: "",
    });
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/login", values)
            .then((res) => {
                console.log(res.data); // Log the response from the server
                if (res.data.status === "success") {
                    navigate("/management");
                    axios.defaults.withCredentials = true;
                } else {
                    alert("Login failed. Please check your credentials.");
                }
            })
            .catch((error) => {
                console.log(error); // Log any errors
                alert("An error occurred while logging in. Please try again later.");
            });
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-xs">
                <form
                    onSubmit={handleSubmit}
                    className="bg-gray-700 shadow-md rounded px-8 pt-6 pb-8 mb-4"
                >
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-300 text-sm font-bold mb-2"
                        >
                            e-mail
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="E-mail Address"
                            required
                            onChange={(e) => setvalues({ ...values, email: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <label
                            htmlFor="password"
                            className="block text-gray-300 text-sm font-bold mb-2"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Password"
                            required
                            onChange={(e) =>
                                setvalues({ ...values, password: e.target.value })
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="checkbox"
                            id="remember-me"
                            className="mr-2 leading-tight"
                        />
                        <label htmlFor="remember-me" className="text-sm text-gray-300">
                            Remember me
                        </label>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
