import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const AttendanceList = () => {
    const [players, setPlayers] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [playerAttendance, setPlayerAttendance] = useState({});

    const query = new URLSearchParams(useLocation().search);
    const teamName = query.get('teamName');
    const sessionId = query.get('sessionId');

    useEffect(() => {
        if (teamName && sessionId) {
            axios
                .get(`http://localhost:8081/api/management/activity?teamName=${teamName}&sessionId=${sessionId}`)
                .then((response) => {
                    const { players, sessionDate } = response.data;
                    setPlayers(players);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error('Error fetching players:', error);
                    setError('Error fetching players');
                    setLoading(false);
                });
        } else {
            setError('Team name and session ID are required');
            setLoading(false);
        }
    }, [teamName, sessionId]);

    const handleAttendanceChange = (playerId, status) => {
        setPlayerAttendance({
            ...playerAttendance,
            [playerId]: status
        });
    };

    const handleSaveAttendance = () => {
        const attendanceData = players.map(player => ({
            playerId: player.PlayerID,
            sessionId: sessionId,
            status: playerAttendance[player.PlayerID] || 'Absent' // Default to 'Absent' if no status is selected
        }));
        console.log('Attendance data:', attendanceData);

        axios.post('http://localhost:8081/api/attendance', { attendance: attendanceData })
            .then(() => {
                console.log('Attendance saved successfully');
                // Optionally, you can reset the playerAttendance state here
            })
            .catch((error) => {
                console.error('Error saving attendance:', error);
                // Handle error saving attendance
            });
    };
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="antialiased font-sans">
            <div className="container mx-auto px-4 sm:px-8">
                <div className="py-8">
                    <div>
                        <h2 className="text-2xl font-semibold leading-tight">Attendance List</h2>
                    </div>
                    <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
                        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                            <table className="min-w-full leading-normal">
                                <thead>
                                    <tr>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Player Name
                                        </th>
                                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Attendance Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {players.map((player) => (
                                        <tr key={player.PlayerID}>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                {player.Name}
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        checked={playerAttendance[player.PlayerID] === 'Present'}
                                                        onChange={() => handleAttendanceChange(player.PlayerID, 'Present')}
                                                    />
                                                    <label htmlFor="present">Present</label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        checked={playerAttendance[player.PlayerID] === 'Absent'}
                                                        onChange={() => handleAttendanceChange(player.PlayerID, 'Absent')}
                                                    />
                                                    <label htmlFor="absent">Absent</label>
                                                </div>
                                                <div>
                                                    <input
                                                        type="checkbox"
                                                        checked={playerAttendance[player.PlayerID] === 'Excused'}
                                                        onChange={() => handleAttendanceChange(player.PlayerID, 'Excused')}
                                                    />
                                                    <label htmlFor="excused">Excused</label>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div>
                        <button onClick={handleSaveAttendance}>Save Attendance</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendanceList;
``
