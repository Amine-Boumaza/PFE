import React, { useState } from "react";
import { Link } from "react-router-dom";
import CategoryTable from "../category/categoriesTable";

export default function Activity() {
  // Dummy data for demonstration
  const [coaches] = useState([
    {
      id: 1,
      name: "John Doe",
      specialty: "Football",
      reports: [
        {
          id: 1,
          title: "Training Session 1",
          details: "Reviewed tactics and practiced set pieces.",
          date: "2024-02-17"
        },
        {
          id: 2,
          title: "Match Analysis",
          details: "Analyzed the performance of the team in the recent match.",
          date: "2024-02-15"
        }
      ]
    },
    {
      id: 2,
      name: "Jane Smith",
      specialty: "Basketball",
      reports: [
        {
          id: 3,
          title: "Skills Development",
          details: "Focused on improving dribbling and shooting techniques.",
          date: "2024-02-16"
        },
        {
          id: 4,
          title: "Game Strategy",
          details: "Discussed offensive and defensive strategies for the upcoming game.",
          date: "2024-02-14"
        }
      ]
    },
    {
      id: 3,
      name: "Michael Johnson",
      specialty: "Tennis",
      reports: [
        {
          id: 5,
          title: "Serve Practice",
          details: "Worked on improving the accuracy and power of serves.",
          date: "2024-02-18"
        },
        {
          id: 6,
          title: "Match Review",
          details: "Reviewed the performance in the recent tournament match.",
          date: "2024-02-12"
        }
      ]
    }
  ]);

  const [showReports, setShowReports] = useState(false);
  const [selectedCoach, setSelectedCoach] = useState(null);

  const toggleReports = (coachId) => {
    setShowReports(!showReports);
    setSelectedCoach(coachId);
  };

  return (
    <div className="container mx-auto p-4">
      <div>
        <CategoryTable />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Coaches</h2>
        <table className="w-full border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2">Name</th>
              <th className="border border-gray-200 px-4 py-2">Specialty</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coaches.map((coach) => (
              <tr key={coach.id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">{coach.name}</td>
                <td className="border border-gray-200 px-4 py-2">{coach.specialty}</td>
                <td className="border border-gray-200 px-4 py-2">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => toggleReports(coach.id)}
                  >
                    {selectedCoach === coach.id && showReports ? "Hide Reports" : "View Reports"}
                  </button>
                  {selectedCoach === coach.id && showReports && (
                    <div className="mt-2">
                      <h3 className="text-lg font-semibold">{coach.name}'s Reports</h3>
                      <table className="w-full border-collapse border border-gray-200 mt-2">
                        <thead>
                          <tr className="bg-gray-100">
                            <th className="border border-gray-200 px-4 py-2">Title</th>
                            <th className="border border-gray-200 px-4 py-2">Date</th>
                            <th className="border border-gray-200 px-4 py-2">Details</th>
                          </tr>
                        </thead>
                        <tbody>
                          {coach.reports.map((report) => (
                            <tr key={report.id} className="hover:bg-gray-50">
                              <td className="border border-gray-200 px-4 py-2">{report.title}</td>
                              <td className="border border-gray-200 px-4 py-2">{report.date}</td>
                              <td className="border border-gray-200 px-4 py-2">{report.details}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
