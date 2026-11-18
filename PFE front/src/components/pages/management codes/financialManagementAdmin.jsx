import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function FinancialTransactions() {
  const [CurrentTenant, setCurrentTenant] = useState(null);
  const [financialTransactions, setFinancialTransactions] = useState([]);
  const [newFinancialTransaction, setNewFinancialTransaction] = useState({
    TenantID: CurrentTenant,
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
  const [isEditing, setIsEditing] = useState(false);

  const [users, setUsers] = useState([]);

  useEffect(() => {
    Gettenants();
  }, []);

  useEffect(() => {
    if (CurrentTenant) {
      GetTransactions(CurrentTenant);
    }
  }, [CurrentTenant]);

  const Gettenants = () => {
    axios
      .get("http://localhost:8081/api/management/admin/GetTenents")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching session reports:", error);
      });
  };

  const handleSelectTenants = (ID) => {
    setCurrentTenant(ID);
  };

  const GetTransactions = (ID) => {
    axios
      .get(
        `http://localhost:8081/api/management/finance/GetTransactions?TenantID=${ID}`
      )
      .then((response) => {
        setFinancialTransactions(response.data);
        console.log("Fetched financial transactions:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching financial transactions:", error);
      });
  };

  const handleAddFinancialTransaction = () => {
    axios
      .post("http://localhost:8081/api/management/finance/AddTransactions", {
        ...newFinancialTransaction,
        TenantID: CurrentTenant,
      })
      .then((response) => {
        setFinancialTransactions([
          ...financialTransactions,
          response.data.financialTransaction,
        ]);
        Swal.fire({
          icon: "success",
          title: "Added Successfully",
        });
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
          TenantID: "",
          Date: "",
          Amount: "",
          Type: "",
          Description: "",
        });
        Swal.fire({
          icon: "success",
          title: "Edited Successfully",
        });
        setIsEditing(false);
      })
      .catch((error) => {
        console.error("Error updating financial transaction:", error);
      });
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-semibold my-4 text-center">Financial Transactions</h1>
      <div className="py-8">
        <div>
          <h2 className="text-3xl font-semibold leading-tight text-center">Tenants</h2>
        </div>

        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4">
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-gray-700 text-white">
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    TenantsID
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Contact Info
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-white uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.TenantID}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.AssociationName}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {user.ContactInfo}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                      <button
                        onClick={() => handleSelectTenants(user.TenantID)}
                        className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                      >
                        Select
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {CurrentTenant && (
        <div className="my-4">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Add New Financial Transaction
          </h2>
          <div className="flex justify-center items-center">
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
              value={
                newFinancialTransaction.Date
                  ? new Date(newFinancialTransaction.Date)
                    .toISOString()
                    .split("T")[0]
                  : ""
              }
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
      )}
      {financialTransactions.length > 0 && (
        <div className="my-8">
          <h2 className="text-3xl font-semibold mb-4 text-center">Financial Transactions List</h2>
          <table className="w-full border-collapse bg-white shadow-md rounded-lg overflow-hidden">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 border-b border-gray-200 text-left text-xs font-semibold uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {financialTransactions.map((transaction) => (
                <tr key={transaction.TransactionID} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">{transaction.Description}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">{transaction.Type}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">{transaction.Amount}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">{transaction.Date}</td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm">
                    <button
                      onClick={() => handleEditFinancialTransaction(transaction)}
                      className="bg-blue-500 text-white py-1 px-3 rounded mr-2 hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteFinancialTransaction(transaction.TransactionID)}
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
      )}

      {isEditing && (
        <div className="my-4">
          <h2 className="text-2xl font-semibold mb-2 text-center">
            Edit Financial Transaction
          </h2>
          <div className="flex justify-center items-center">
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
