import React from "react";
import Stock from "../financial/stock";
import MonthlyPayments from "../financial/payment";

export default function financialManagement() {
  return (
    <div>
      <div>
        <Stock />
      </div>
      <div>
        <MonthlyPayments />
      </div>
    </div>
  );
}
