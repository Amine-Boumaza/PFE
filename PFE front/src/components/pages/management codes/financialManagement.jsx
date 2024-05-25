import React, { useState, useEffect } from "react";
import axios from "axios";

export default function FinancialTransactions() {
  const [financialTransactions, setFinancialTransactions] = useState([]);
  const [newFinancialTransaction, setNewFinancialTransaction] = useState({
    TenantID: "",
    Date: "",
    Amount: "",
    Type: "",
    Description: "",
  });
  const [editedFinancialTransaction, setEditedFinancialTransaction] = useState({
    TenantID: "",
    Date: "",
    Amount: "",
    Type: "",
    Description: "",
  });
  const [isEditing, setIsEditing] = useState(false); // New state to control edit form visibility

  useEffect(() => {
    // Fetch financial transactions from the backend when component mounts
    axios
      .get("http://localhost:8081/management/financial-transactions")
      .then((response) => {
        setFinancialTransactions(response.data.financialTransactions);
        console.log(
          "Fetched financial transactions:",
          response.data.financialTransactions
        );
      })
      .catch((error) => {
        console.error("Error fetching financial transactions:", error);
      });
  }, []);

  const handleAddFinancialTransaction = () => {
    // Send a POST request to add a new financial transaction
    axios
      .post(
        "http://localhost:8081/management/financial-transactions",
        newFinancialTransaction
      )
      .then((response) => {
        setFinancialTransactions([
          ...financialTransactions,
          response.data.financialTransaction,
        ]);
        setNewFinancialTransaction({
          TenantID: "",
          Date: "",
          Amount: "",
          Type: "",
          Description: "",
        });
      })
      .catch((error) => {
        console.error("Error adding financial transaction:", error);
      });
  };

  const handleDeleteFinancialTransaction = (transactionId) => {
    // Send a DELETE request to delete a financial transaction
    axios
      .delete(
        `http://localhost:8081/management/financial-transactions/${transactionId}`
      )
      .then(() => {
        setFinancialTransactions(
          financialTransactions.filter(
            (transaction) => transaction.TransactionID !== transactionId
          )
        );
      })
      .catch((error) => {
        console.error("Error deleting financial transaction:", error);
      });
  };

  const handleEditFinancialTransaction = (transaction) => {
    // Set the financial transaction to be edited
    setEditedFinancialTransaction(transaction);
    setIsEditing(true); // Show edit form
  };

  const handleSubmitEdit = () => {
    // Log the data being sent to the backend
    console.log(
      "Edited financial transaction data:",
      editedFinancialTransaction
    );

    // Send a PUT request to update the edited financial transaction
    axios
      .put(
        `http://localhost:8081/management/financial-transactions/${editedFinancialTransaction.TransactionID}`,
        editedFinancialTransaction
      )
      .then((response) => {
        // Update the financial transactions state with the edited financial transaction
        setFinancialTransactions(
          financialTransactions.map((transaction) => {
            if (
              transaction.TransactionID ===
              editedFinancialTransaction.TransactionID
            ) {
              return response.data.financialTransaction; // Update with the response from the server
            }
            return transaction;
          })
        );
        // Clear the edited financial transaction state
        setEditedFinancialTransaction({
          TenantID: "",
          Date: "",
          Amount: "",
          Type: "",
          Description: "",
          FinanceManagerID: "",
        });
        setIsEditing(false); // Hide edit form after submission
      })
      .catch((error) => {
        console.error("Error updating financial transaction:", error);
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Financial Transactions</h1>

      {/* New Financial Transaction Form */}
      <div className="my-4">
        <h2 className="text-xl font-semibold mb-2">
          Add New Financial Transaction
        </h2>
        <div className="flex">
          <input
            type="text"
            value={newFinancialTransaction.Description}
            onChange={(e) =>
              setNewFinancialTransaction({
                ...newFinancialTransaction,
                Description: e.target.value,
              })
            }
            placeholder="Description"
            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
          />
          <select
            value={newFinancialTransaction.Type}
            onChange={(e) =>
              setNewFinancialTransaction({
                ...newFinancialTransaction,
                Type: e.target.value,
              })
            }
            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
          >
            <option value="">Select Type</option>
            <option value="Import">Import</option>
            <option value="Export">Export</option>
          </select>
          <input
            type="number"
            value={newFinancialTransaction.Amount}
            onChange={(e) =>
              setNewFinancialTransaction({
                ...newFinancialTransaction,
                Amount: e.target.value,
              })
            }
            placeholder="Amount"
            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
          />
          <input
            type="date"
            value={newFinancialTransaction.Date}
            onChange={(e) =>
              setNewFinancialTransaction({
                ...newFinancialTransaction,
                Date: e.target.value,
              })
            }
            className="border border-gray-300 rounded-md px-3 py-1 mr-2"
          />
          <button
            onClick={handleAddFinancialTransaction}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add
          </button>
        </div>
      </div>

      {/* Financial Transactions Table */}
      <div className="my-8">
        <h2 className="text-xl font-bold mb-4">Financial Transactions List</h2>
        <table className="w-full border-collapse">
          {/* Table header */}
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          {/* Table body */}
          <tbody>
            {financialTransactions.map((transaction) => (
              <tr key={transaction.TransactionID}>
                <td className="border border-gray-300 px-4 py-2">
                  {transaction.Description}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {transaction.Type}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {transaction.Amount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {transaction.Date}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={() => handleEditFinancialTransaction(transaction)}
                    className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() =>
                      handleDeleteFinancialTransaction(
                        transaction.TransactionID
                      )
                    }
                    className="bg-red-500 text-white py-1 px-3 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Financial Transaction Form */}
      {isEditing && (
        <div className="my-4">
          <h2 className="text-xl font-semibold mb-2">
            Edit Financial Transaction
          </h2>
          <div className="flex">
            <input
              type="text"
              value={editedFinancialTransaction.Description}
              onChange={(e) =>
                setEditedFinancialTransaction({
                  ...editedFinancialTransaction,
                  Description: e.target.value,
                })
              }
              placeholder="Description"
              className="border border-gray-300 rounded-md px-3 py-1 mr-2"
            />
            <select
              value={editedFinancialTransaction.Type}
              onChange={(e) =>
                setEditedFinancialTransaction({
                  ...editedFinancialTransaction,
                  Type: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-3 py-1 mr-2"
            >
              <option value="">Select Type</option>
              <option value="Import">Import</option>
              <option value="Export">Export</option>
            </select>
            <input
              type="number"
              value={editedFinancialTransaction.Amount}
              onChange={(e) =>
                setEditedFinancialTransaction({
                  ...editedFinancialTransaction,
                  Amount: e.target.value,
                })
              }
              placeholder="Amount"
              className="border border-gray-300 rounded-md px-3 py-1 mr-2"
            />
            <input
              type="date"
              value={editedFinancialTransaction.Date}
              onChange={(e) =>
                setEditedFinancialTransaction({
                  ...editedFinancialTransaction,
                  Date: e.target.value,
                })
              }
              className="border border-gray-300 rounded-md px-3 py-1 mr-2"
            />
            <button
              onClick={handleSubmitEdit}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
