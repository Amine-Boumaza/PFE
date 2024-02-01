import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/layout";
import Dashboard from "./components/pages/dashboard";
import Category from "./components/pages/category";

function App() {
  const [activeLink, setActiveLink] = useState(null);

  useEffect(() => {
    const storedActiveLink = localStorage.getItem("activeLink");
    setActiveLink(storedActiveLink || null);
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout activeLink={activeLink} setActiveLink={setActiveLink} />
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="category" element={<Category />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
