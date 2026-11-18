import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";

export default function FinancialTransactions() {
  const { CurrentUser } = useContext(AuthContext);
  const [isAdding, setIsAdding] = useState(false);
  const [financialTransactions, setFinancialTransactions] = useState([]);
  const [newFinancialTransaction, setNewFinancialTransaction] = useState({
    TenantID: CurrentUser.TenantID,
    Date: "",
    Amount: "",
    Type: "",
    Description: "",
  });
<<<<<<< HEAD
  const [editedFinancialTransaction, setEditedFinancialTransaction] = useState({
    TenantID: CurrentUser.TenantID,
    Date: "",
    Amount: "",
    Type: "",
    Description: "",
  });
  const [isEditing, setIsEditing] = useState(false);
=======
  const [isAdding, setIsAdding] = useState(false); // New state to control the visibility of the new row
  const [editingTransaction, setEditingTransaction] = useState(null); // Transaction being edited
>>>>>>> origin/master

  useEffect(() => {
    axios
      .get(
        `http://localhost:8081/api/management/finance/GetTransactions?TenantID=${CurrentUser.TenantID}`
      )
      .then((response) => {
        setFinancialTransactions(response.data);
        console.log("Fetched financial transactions:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching financial transactions:", error);
      });
  }, [CurrentUser.TenantID]);

  const handleAddFinancialTransaction = () => {
    axios
      .post(
        "http://localhost:8081/api/management/finance/AddTransactions",
        newFinancialTransaction
      )
      .then((response) => {
        setFinancialTransactions([
          response.data.financialTransaction,
          ...financialTransactions, // Add new transaction to the beginning of the list
        ]);
        setNewFinancialTransaction({
          TenantID: CurrentUser.TenantID,
          Date: "",
          Amount: "",
          Type: "",
          Description: "",
        });
<<<<<<< HEAD
        setIsAdding(false);
=======
        setIsAdding(false); // Hide new row after adding
>>>>>>> origin/master
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

<<<<<<< HEAD
  const handleEditFinancialTransaction = (transaction) => {
    setEditedFinancialTransaction(transaction);
    setIsEditing(true);
  };

  const handleSubmitEdit = () => {
    axios
      .put(
        `http://localhost:8081/api/management/finance/EditTransactions?TransactionID=${editedFinancialTransaction.TransactionID}`,
        editedFinancialTransaction
      )
      .then((response) => {
        setFinancialTransactions(
          financialTransactions.map((transaction) =>
            transaction.TransactionID ===
              editedFinancialTransaction.TransactionID
              ? response.data.updatedTransaction
              : transaction
          )
        );
        setEditedFinancialTransaction({
          TenantID: CurrentUser.TenantID,
          Date: "",
          Amount: "",
          Type: "",
          Description: "",
        });
        setIsEditing(false);
=======
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
>>>>>>> origin/master
      })
      .catch((error) => {
        console.error("Error updating financial transaction:", error);
      });
  };

  return (
<<<<<<< HEAD
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-4 text-center">Financial Transactions</h1>
=======
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold my-4">Financial Transactions</h1>

>>>>>>> origin/master
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
<<<<<<< HEAD
        <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-700 text-white">
=======
        <table className="w-full border-collapse">
          <thead>
>>>>>>> origin/master
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
<<<<<<< HEAD
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
                  {isEditing &&
                    editedFinancialTransaction.TransactionID ===
                    transaction.TransactionID ? (
                    <input
                      type="text"
                      value={editedFinancialTransaction.Description}
                      onChange={(e) =>
                        setEditedFinancialTransaction({
                          ...editedFinancialTransaction,
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
                  {isEditing &&
                    editedFinancialTransaction.TransactionID ===
                    transaction.TransactionID ? (
                    <select
                      value={editedFinancialTransaction.Type}
                      onChange={(e) =>
                        setEditedFinancialTransaction({
                          ...editedFinancialTransaction,
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
                  {isEditing &&
                    editedFinancialTransaction.TransactionID ===
                    transaction.TransactionID ? (
                    <input
                      type="number"
                      value={editedFinancialTransaction.Amount}
                      onChange={(e) =>
                        setEditedFinancialTransaction({
                          ...editedFinancialTransaction,
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
                  {isEditing &&
                    editedFinancialTransaction.TransactionID ===
                    transaction.TransactionID ? (
                    <input
                      type="date"
                      value={editedFinancialTransaction.Date}
                      onChange={(e) =>
                        setEditedFinancialTransaction({
                          ...editedFinancialTransaction,
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
                  {isEditing &&
                    editedFinancialTransaction.TransactionID ===
                    transaction.TransactionID ? (
                    <button
                      onClick={handleSubmitEdit}
                      className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleEditFinancialTransaction(transaction)
                      }
                      className="bg-blue-500 text-white py-1 px-3 rounded mr-2"
                    >
                      Edit
                    </button>
                  )}
=======
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
>>>>>>> origin/master
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
                      handleDeleteFinancialTransaction(transaction.TransactionID)
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
