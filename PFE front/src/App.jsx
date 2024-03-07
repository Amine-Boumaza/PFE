import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/login";
import Layout from "./components/shared/layout";
import Dashboard from "./components/pages/dashboard";
import FinancialManagement from "./components/pages/management codes/financialManagement";
import Activity from "./components/pages/management codes/activity";
import Sessions from "./components/pages/management codes/sessions";
import Register from "./components/pages/register";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/management/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="activity" element={<Activity />} />
          <Route path="financialmanagement" element={<FinancialManagement />} />
          <Route path="sessions" element={<Sessions />} />
        </Route>
      </Routes>
    </Router>
  );
}
export default App;
