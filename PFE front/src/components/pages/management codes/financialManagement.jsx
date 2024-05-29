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
  const [isAdding, setIsAdding] = useState(false); // New state to control the visibility of the new row
  const [editingTransaction, setEditingTransaction] = useState(null); // Transaction being edited

  useEffect(() => {
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
    axios
      .post(
        "http://localhost:8081/management/financial-transactions",
        newFinancialTransaction
      )
      .then((response) => {
        setFinancialTransactions([
          response.data.financialTransaction,
          ...financialTransactions, // Add new transaction to the beginning of the list
        ]);
        setNewFinancialTransaction({
          TenantID: "",
          Date: "",
          Amount: "",
          Type: "",
          Description: "",
        });
        setIsAdding(false); // Hide new row after adding
      })
      .catch((error) => {
        console.error("Error adding financial transaction:", error);
      });
  };

  const handleDeleteFinancialTransaction = (transactionId) => {
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

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction); // Set the transaction being edited
  };

  const handleSaveEdit = () => {
    // Save the edited transaction
    axios
      .put(
        `http://localhost:8081/management/financial-transactions/${editingTransaction.TransactionID}`,
        editingTransaction
      )
      .then((response) => {
        setFinancialTransactions(
          financialTransactions.map((t) =>
            t.TransactionID === editingTransaction.TransactionID
              ? response.data.financialTransaction
              : t
          )
        );
        setEditingTransaction(null); // Clear the editing state
      })
      .catch((error) => {
        console.error("Error updating financial transaction:", error);
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Financial Transactions</h1>

      <div className="my-4">
        {!isAdding && (
          <button
            onClick={() => setIsAdding(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Add New Financial Transaction
          </button>
        )}
      </div>

      <div className="my-8">
        <h2 className="text-xl font-bold mb-4">Financial Transactions List</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Type</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Date</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isAdding && (
              <tr>
                <td className="border border-gray-300 px-4 py-2">
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
                    className="border border-gray-300 rounded-md px-3 py-1"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <select
                    value={newFinancialTransaction.Type}
                    onChange={(e) =>
                      setNewFinancialTransaction({
                        ...newFinancialTransaction,
                        Type: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-md px-3 py-1"
                  >
                    <option value="">Select Type</option>
                    <option value="Import">Import</option>
                    <option value="Export">Export</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-4 py-2">
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
                    className="border border-gray-300 rounded-md px-3 py-1"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <input
                    type="date"
                    value={newFinancialTransaction.Date}
                    onChange={(e) =>
                      setNewFinancialTransaction({
                        ...newFinancialTransaction,
                        Date: e.target.value,
                      })
                    }
                    className="border border-gray-300 rounded-md px-3 py-1"
                  />
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    onClick={handleAddFinancialTransaction}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsAdding(false)}
                    className="bg-gray-500 text-white px-4 py-2 rounded-md ml-2"
                  >
                    Cancel
                  </button>
                </td>
              </tr>
            )}
            {financialTransactions.map((transaction) => (
              <tr key={transaction.TransactionID}>
                <td className="border border-gray-300 px-4 py-2">
                  {editingTransaction === transaction ? (
                    <input
                      type="text"
                      value={transaction.Description}
                      onChange={(e) =>
                        setEditingTransaction({
                          ...transaction,
                          Description: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-3 py-1"
                    />
                  ) : (
                    transaction.Description
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingTransaction === transaction ? (
                    <select
                      value={transaction.Type}
                      onChange={(e) =>
                        setEditingTransaction({
                          ...transaction,
                          Type: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-3 py-1"
                    >
                      <option value="Import">Import</option>
                      <option value="Export">Export</option>
                    </select>
                  ) : (
                    transaction.Type
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingTransaction === transaction ? (
                    <input
                      type="number"
                      value={transaction.Amount}
                      onChange={(e) =>
                        setEditingTransaction({
                          ...transaction,
                          Amount: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-3 py-1"
                    />
                  ) : (
                    transaction.Amount
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingTransaction === transaction ? (
                    <input
                      type="date"
                      value={transaction.Date}
                      onChange={(e) =>
                        setEditingTransaction({
                          ...transaction,
                          Date: e.target.value,
                        })
                      }
                      className="border border-gray-300 rounded-md px-3 py-1"
                    />
                  ) : (
                    transaction.Date
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {editingTransaction === transaction ? (
                    <button
                      onClick={handleSaveEdit}
                      className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => handleEdit(transaction)}
                      className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
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
    </div>
  );
}
