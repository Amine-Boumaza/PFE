import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/pages/login";
import Layout from "./components/shared/layout";
import Dashboard from "./components/pages/dashboard";
import DashboardCoach from "./components/pages/dashboardCoach";
import DashboardFnMannager from "./components/pages/dashboardFnMannager";
import DashboardDoctor from "./components/pages/dashboardDoctor";
import DashboardMannager from "./components/pages/dashboardMannager";

import FinancialManagement from "./components/pages/management codes/financialManagement";
import Activity from "./components/pages/management codes/activity";
import Sessions from "./components/pages/management codes/sessions";
import Register from "./components/pages/register";
import Team from "./components/pages/teams/team";
import Doctor from "./components/pages/doctor/doctor";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

function App() {
  const { CurrentUser } = useContext(AuthContext);
  axios.defaults.withCredentials = true;

  const ProtectedRoutes = ({ children }) => {
    if (!CurrentUser) {
      return <Navigate to="/login" />;
    }
    return children;
  };
  const RoutesControler = () => {
    if (!CurrentUser) {
      return (
        <Router>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/management/"
              element={
                <ProtectedRoutes>
                  <Layout />
                </ProtectedRoutes>
              }
            >
              <Route
                index
                element={
                  <ProtectedRoutes>
                    <Dashboard />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="activity"
                element={
                  <ProtectedRoutes>
                    <Activity />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="financialmanagement"
                element={
                  <ProtectedRoutes>
                    <FinancialManagement />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="sessions"
                element={
                  <ProtectedRoutes>
                    <Sessions />
                  </ProtectedRoutes>
                }
              />
              <Route
                path="team"
                element={
                  <ProtectedRoutes>
                    <Team />
                  </ProtectedRoutes>
                }
              />

              <Route
                path="doctorForm"
                element={
                  <ProtectedRoutes>
                    <Doctor />
                  </ProtectedRoutes>
                }
              />
            </Route>
          </Routes>
        </Router>
      );
    }
    switch (CurrentUser.Role) {
      case "admin":
        return (
          <Router>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/management/"
                element={
                  <ProtectedRoutes>
                    <Layout />
                  </ProtectedRoutes>
                }
              >
                <Route
                  index
                  element={
                    <ProtectedRoutes>
                      <Dashboard />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="activity"
                  element={
                    <ProtectedRoutes>
                      <Activity />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="financialmanagement"
                  element={
                    <ProtectedRoutes>
                      <FinancialManagement />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="sessions"
                  element={
                    <ProtectedRoutes>
                      <Sessions />
                    </ProtectedRoutes>
                  }
                />

                <Route
                  path="team"
                  element={
                    <ProtectedRoutes>
                      <Team />
                    </ProtectedRoutes>
                  }
                />

                <Route
                  path="doctorForm"
                  element={
                    <ProtectedRoutes>
                      <Doctor />
                    </ProtectedRoutes>
                  }
                />
              </Route>
            </Routes>
          </Router>
        );
      case "player":
        return (
          <Router>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/management/"
                element={
                  <ProtectedRoutes>
                    <Layout />
                  </ProtectedRoutes>
                }
              >
                {/* Player Dashboard  */}
              </Route>
            </Routes>
          </Router>
        );
      case "FinanceManager":
        return (
          <Router>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/management/"
                element={
                  <ProtectedRoutes>
                    <Layout />
                  </ProtectedRoutes>
                }
              >
                <Route
                  index
                  element={
                    <ProtectedRoutes>
                      <DashboardFnMannager />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="financialmanagement"
                  element={
                    <ProtectedRoutes>
                      <FinancialManagement />
                    </ProtectedRoutes>
                  }
                />
              </Route>
            </Routes>
          </Router>
        );
      case "doctor":
        return (
          <Router>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/management/"
                element={
                  <ProtectedRoutes>
                    <Layout />
                  </ProtectedRoutes>
                }
              >
                {/* Doctor Dashboard  */}
                <Route
                  index
                  element={
                    <ProtectedRoutes>
                      <DashboardDoctor />
                    </ProtectedRoutes>
                  }
                />
              </Route>
            </Routes>
          </Router>
        );
      case "coach":
        return (
          <Router>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/management/"
                element={
                  <ProtectedRoutes>
                    <Layout />
                  </ProtectedRoutes>
                }
              >

                <Route
                  path="activity"
                  element={
                    <ProtectedRoutes>
                      <Activity />
                    </ProtectedRoutes>
                  }
                />

                <Route
                  index
                  element={
                    <ProtectedRoutes>
                      <DashboardCoach />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="sessions"
                  element={
                    <ProtectedRoutes>
                      <Sessions />
                    </ProtectedRoutes>
                  }
                />

                <Route
                  path="team"
                  element={
                    <ProtectedRoutes>
                      <Team />
                    </ProtectedRoutes>
                  }
                />
              </Route>
            </Routes>
          </Router>
        );
      case "mannager":
        return (
          <Router>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
              <Route
                path="/management/"
                element={
                  <ProtectedRoutes>
                    <Layout />
                  </ProtectedRoutes>
                }
              >
                <Route
                  index
                  element={
                    <ProtectedRoutes>
                      <DashboardMannager />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="activity"
                  element={
                    <ProtectedRoutes>
                      <Activity />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="financialmanagement"
                  element={
                    <ProtectedRoutes>
                      <FinancialManagement />
                    </ProtectedRoutes>
                  }
                />
                <Route
                  path="sessions"
                  element={
                    <ProtectedRoutes>
                      <Sessions />
                    </ProtectedRoutes>
                  }
                />

                <Route
                  path="team"
                  element={
                    <ProtectedRoutes>
                      <Team />
                    </ProtectedRoutes>
                  }
                />

                <Route
                  path="doctorForm"
                  element={
                    <ProtectedRoutes>
                      <Doctor />
                    </ProtectedRoutes>
                  }
                />
              </Route>
            </Routes>
          </Router>
        );
      default:
        return (
          <Router>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route path="/register" element={<Register />}></Route>
            </Routes>
          </Router>
        );
    }
  };
  return RoutesControler();
}
export default App;
