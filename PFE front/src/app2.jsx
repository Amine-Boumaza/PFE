import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/login";
import Layout from "./components/shared/layout";
import Dashboard from "./components/pages/dashboard";
import FinancialManagement from "./components/pages/management codes/financialManagement";
import Activity from "./components/pages/management codes/activity";
import Sessions from "./components/pages/management codes/sessions";
import Register from "./components/pages/register";
import axios from "axios";

function App() {
    const [auth, setauth] = useState(false);
    const [message, setMessage] = useState("");
    const [Email, setEmail] = useState("");
    axios.defaults.withCredentials = true;

    useEffect(() => {
        axios.get("http://localhost:8081/management")
            .then((res) => {
                if (res.data.status === "success") {
                    setauth(true)
                    setEmail(res.data.Email)
                } else {
                    console.log("I m here");
                    setauth(false)
                    setMessage(res.data.Error)
                }

            })
            .then((err) => console.log(err))
    }, []);
    console.log(auth)
    return (
        <Router>
            {auth ?
                <Routes>
                    <Route path="/management/" element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="activity" element={<Activity />} />
                        <Route path="financialmanagement" element={<FinancialManagement />} />
                        <Route path="sessions" element={<Sessions />} />
                    </Route>
                </Routes>
                :
                <Routes>
                    <Route path="/login" element={<Login setauth={setauth} />}></Route>
                    <Route path="/register" element={<Register />}></Route>
                </Routes>
            }
        </Router >
    );
}
export default App;