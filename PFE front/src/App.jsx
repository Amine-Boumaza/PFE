import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/shared/layout";
import Dashboard from "./components/pages/dashboard";
import Category from "./components/pages/category";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="category" element={<Category />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
