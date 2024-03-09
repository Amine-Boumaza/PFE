import React, { useEffect, useState } from "react";
import { Route, Navigate } from "react-router-dom";
import Layout from "../shared/layout";
import Dashboard from "../pages/dashboard";
import FinancialManagement from "../pages/management codes/financialManagement";
import Activity from "../pages/management codes/activity";
import Sessions from "../pages/management codes/sessions";
import axios from "axios";

function ManagementRoutes() {
    const [auth, setAuth] = useState(false);

    useEffect(() => {
        axios.get("http://localhost:8081/management")
            .then((res) => {
                if (res.data.status === "success") {
                    setAuth(true);
                } else {
                    setAuth(false);
                }
            })
            .catch((err) => console.log(err));
    }, []);

    if (!auth) {
        return <Navigate to="/login" />;
    }

    return (
        <Layout>
            <Route index element={<Dashboard />} />
            <Route path="activity" element={<Activity />} />
            <Route path="financialmanagement" element={<FinancialManagement />} />
            <Route path="sessions" element={<Sessions />} />
        </Layout>
    );
}

export default ManagementRoutes;