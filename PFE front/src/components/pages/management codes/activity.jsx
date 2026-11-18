import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CategoryTable from "../category/categoriesTable";
import axios from "axios";
import AttendanceList from "../attendance/attancdance.jsx";
<<<<<<< HEAD
=======

>>>>>>> origin/master
import ShowAttendanceList from "../attendance/showattendance.jsx";

export default function Activity() {
  const [sessionReports, setSessionReports] = useState([]);

  useEffect(() => {
    // Fetch session reports from the backend when component mounts
    axios
      .get("http://localhost:8081/management/activity")
      .then((response) => {
        setSessionReports(response.data.sessionReports);
        console.log("Fetched session reports:", response.data.sessionReports);
      })
      .catch((error) => {
        console.error("Error fetching session reports:", error);
      });
  }, []);

  return (
    <div>
      <div className="container mx-auto p-4">
        <div>
          <CategoryTable />
        </div>

        <div className="container mx-auto">
          <h1 className="text-2xl font-bold my-4">Session Reports</h1>

          {/* Session Reports Table */}
          <div className="my-8">
            <h2 className="text-xl font-bold mb-4">Session Reports List</h2>
            <table className="w-full border-collapse">
              <thead>
                <tr>
<<<<<<< HEAD
                  <th className="border border-gray-300 px-4 py-2">
                    Report Text
                  </th>
                  <th className="border border-gray-300 px-4 py-2">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {sessionReports.map((report) => (
                  <tr key={report.ReportID}>
                    <td className="border border-gray-300 px-4 py-2">
                      {report.ReportText}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {report.CreatedAt}
                    </td>
=======
                  <th className="border border-gray-300 px-4 py-2">Report Text</th>
                  <th className="border border-gray-300 px-4 py-2">Created At</th>
                </tr>
              </thead>
              <tbody>
                {sessionReports.map(report => (
                  <tr key={report.ReportID}>
                    <td className="border border-gray-300 px-4 py-2">{report.ReportText}</td>
                    <td className="border border-gray-300 px-4 py-2">{report.CreatedAt}</td>
>>>>>>> origin/master
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      <div>
        <AttendanceList />
      </div>
      <div>
        <ShowAttendanceList />
      </div>
=======
      <div><AttendanceList /></div>
      <div><ShowAttendanceList /></div>
>>>>>>> origin/master
      <div></div>
    </div>
  );
}
