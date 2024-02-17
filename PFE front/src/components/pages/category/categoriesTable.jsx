import React from "react";

const categoryData = [
  { id: 1, category: "ballon", teams: "team 1", players: "12" },
  { id: 2, category: "ballon", teams: "team 1", players: "12" },
  { id: 3, category: "ballon", teams: "team 1", players: "12" },
  { id: 4, category: "ballon", teams: "team 1", players: "12" },
  { id: 5, category: "ballon", teams: "team 1", players: "12" },
];

export default function CategoryTable() {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="bg-white border-b">
                <tr>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    ID
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Sport
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                  >
                    Number of Players
                  </th>
                </tr>
              </thead>
              <tbody>
                {categoryData.map((item) => (
                  <tr
                    key={item.id}
                    className={
                      item.id % 2 === 0 ? "bg-white" : "bg-gray-100 border-b"
                    }
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.id}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.category}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.teams}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                      {item.players}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
