import React, { useState, useEffect } from "react";
import axios from "axios";

const showAttendanceList = (props) => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const GetSessionAttenance = () => {
    axios
      .get(
        `http://localhost:8081/api/management/mannager/GetAttenance?SessionID=${props.CurrentSes}`
      )
      .then((response) => {
        console.log("Attendance data:", response.data); // Add logging here
        setAttendanceData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching attendance data:", error);
        setError("Error fetching attendance data");
        setLoading(false);
      });
  };
  useEffect(() => {
    GetSessionAttenance();
  }, [props.CurrentSes]);

  if (loading) {
    return <div></div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {attendanceData.length > 0 ? (
        <>
          <h2 className="text-2xl font-bold my-4">Attendance List</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2">Attendance ID</th>
                  <th className="border border-gray-300 px-4 py-2">Session Date</th>
                  <th className="border border-gray-300 px-4 py-2">Player Name</th>
                  <th className="border border-gray-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {attendanceData.map((attendance) => (
                  <tr key={attendance.AttendanceID} className="hover:bg-gray-100">
                    <td className="border border-gray-300 px-4 py-2">{attendance.AttendanceID}</td>
                    <td className="border border-gray-300 px-4 py-2">{attendance.SessionDate}</td>
                    <td className="border border-gray-300 px-4 py-2">{attendance.PlayerName}</td>
                    <td className="border border-gray-300 px-4 py-2">{attendance.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <h6 className="text-xl font-bold mb-4 text-center">There is no Attendance Registered in this session</h6>
      )}
    </div>

  );
};

export default showAttendanceList;
