import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";

export default function SessionTable() {
  const [Imports, setImports] = useState([]);
  const { CurrentUser } = useContext(AuthContext);

  const GetImports = () => {
    axios
      .get(
        `http://localhost:8081/api/management/finance/GetImports?TenantID=${CurrentUser.TenantID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setImports(response.data);
        console.log("GetImports Fetch:", response.data);
      })
      .catch((error) => {
        console.error("Error GetImports:", error);
      });
  };

  useEffect(() => {
    // Fetch session data from the backend
    GetImports();
  }, []);

  return (
    <div className="antialiased font-sans">
      <div className="container mx-auto px-4 sm:px-8">
        <div className="py-8">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-center">
              Imports
            </h2>
          </div>
          <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
            {/* Add max-h-[YOUR_HEIGHT] and overflow-y-auto to make the table scrollable */}
            <div className="max-h-96 overflow-y-auto">
              <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                <table className="min-w-full leading-normal">
                  <thead>
                    <tr>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                        Description
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Imports.map((imports, index) => (
                      <tr key={index}>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {imports.Date}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {imports.Amount}
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                          {imports.Description}
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
