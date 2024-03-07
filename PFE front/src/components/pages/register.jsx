import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [values, setValues] = useState({
        username: '',
        email: '',
        password: '',
    });

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8081/register", values)
            .then(res => {
                if (res.data.status === "success") {
                    navigate("/login");
                } else {
                    alert("Registration failed. Please try again."); // Alert if registration failed
                }
            })
            .catch(error => {
                console.error("An error occurred during registration:", error); // Log any errors
                alert("An error occurred during registration. Please try again later."); // Alert for other errors
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
                            htmlFor="username"
                            className="block text-gray-300 text-sm font-bold mb-2"
                        >
                            Username
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Username"
                            required
                            onChange={(e) => setValues({ ...values, username: e.target.value })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label
                            htmlFor="email"
                            className="block text-gray-300 text-sm font-bold mb-2"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Email Address"
                            required
                            onChange={(e) => setValues({ ...values, email: e.target.value })}
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
                                setValues({ ...values, password: e.target.value })
                            }
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>

                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Register
                        </button>
                        <p className="text-sm text-gray-300">
                            Already have an account?{" "}
                            <Link to="/login" className="text-blue-400 hover:underline">
                                Login
                            </Link>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    );
}
