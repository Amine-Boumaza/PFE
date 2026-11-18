import React, { useState, useEffect } from "react";
import axios from "axios";

export default function UserTable() {
  const [users, setUsers] = useState([]);
<<<<<<< HEAD
  const [sessions, setSessions] = useState([]);
  const [SelectedTenant, setSelectedTenant] = useState(null);

=======
>>>>>>> origin/master
  const Gettenants = () => {
    axios
      .get("http://localhost:8081/api/management/admin/GetTenents")
      .then((response) => {
        setUsers(response.data);
<<<<<<< HEAD
        console.log("Fetched Tenants:", users);
      })
      .catch((error) => {
        console.error("Error fetching Tenants:", error);
      });
  };
  const GetEmployees = async (TenantID) => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/management/admin/GetUsers",
        {
          params: { TenantID }, // Correctly passing the TenantID as a query parameter
          withCredentials: true,
        }
      );
      setSessions(response.data);
    } catch (error) {
      console.error("Error fetching Employees:", error);
    }
  };
  const handleSelectTenants = (TenID) => {
    setSelectedTenant(TenID);
  };
=======
        console.log("Fetched session reports:", adminCount);
      })
      .catch((error) => {
        console.error("Error fetching session reports:", error);
      });
  };
  const handleSelectTenants = (TenID) => {};
>>>>>>> origin/master
  useEffect(() => {
    Gettenants();
  }, []);
  useEffect(() => {
    GetEmployees(SelectedTenant);
  }, [SelectedTenant]);

  console.log("Users:", users); // Log the users state

  return (
    <div className="antialiased font-sans">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
<<<<<<< HEAD
            <h2 className="text-3xl font-semibold leading-tight text-center">Tenants</h2>
=======
            <h2 className="text-2xl font-semibold leading-tight">Tenants</h2>
>>>>>>> origin/master
          </div>

          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="max-h-96 overflow-y-auto">
              <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-gray-700 text-white">
                  <tr>
<<<<<<< HEAD
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      TenantsID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
=======
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      TenantsID
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                      Contact Info
                    </th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
>>>>>>> origin/master
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={index}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.TenantID}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          {user.AssociationName}
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
<<<<<<< HEAD
                          {user.ContactInfo}
=======
                          {user.AssociationName}
>>>>>>> origin/master
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => handleSelectTenants(user.TenantID)}
<<<<<<< HEAD
                          className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
=======
                          className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
>>>>>>> origin/master
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="py-8">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-center">Employees</h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            <div className="max-h-96 overflow-y-auto">
              <div className="inline-block min-w-full shadow-lg rounded-lg overflow-hidden">
                <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
                  <thead className="bg-gray-700 text-white">
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        User ID
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Role
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {sessions.map((session, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {session.UserID}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {session.Email}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {session.Role}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
