import React from "react";

// Sample data for employees and their monthly payments
const employees = [
  { name: "John", role: "Manager", amount: 5000 },
  { name: "Alice", role: "Developer", amount: 4000 },
  { name: "Bob", role: "Designer", amount: 3500 },
  // Add more employee data as needed
];

export default function MonthlyPayments() {
  // Calculate total payment for all employees
  const totalPayment = employees.reduce(
    (total, employee) => total + employee.amount,
    0
  );

  return (
    <div>
      <h2>Monthly Payments</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>${employee.amount}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">Total</td>
            <td>${totalPayment}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
