import React, { useState, useEffect } from 'react';
import axios from 'axios';

const showAttendanceList = () => {
    const [attendanceData, setAttendanceData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:8081/management/attendance')
            .then(response => {
                console.log('Attendance data:', response.data); // Add logging here
                setAttendanceData(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching attendance data:', error);
                setError('Error fetching attendance data');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>Attendance List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Attendance ID</th>
                        <th>Session Date</th>
                        <th>Player Name</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {attendanceData.map(attendance => (
                        <tr key={attendance.AttendanceID}>
                            <td>{attendance.AttendanceID}</td>
                            <td>{attendance.SessionDate}</td>
                            <td>{attendance.PlayerName}</td>
                            <td>{attendance.Status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default showAttendanceList;
