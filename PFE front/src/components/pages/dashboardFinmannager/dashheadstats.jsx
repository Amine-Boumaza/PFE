// DashboardStats.jsx
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthContext";
import { GrUserManager } from "react-icons/gr";
import { GiBabyfootPlayers } from "react-icons/gi";
import { MdIncompleteCircle } from "react-icons/md";
export default function DashboardStats() {
  const { CurrentUser } = useContext(AuthContext);
  const [NOTransactions, setNOTransactions] = useState([]);
  const [ExportsVal, setExportsVal] = useState([]);
  const [ImportsVal, setImportsVal] = useState([]);
  const GetNTransactions = () => {
    axios
      .get(
        `http://localhost:8081/api/management/finance/NBtransections?TenantID=${CurrentUser.TenantID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setNOTransactions(response.data);
        console.log("GetTransactionsNB Fetch:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching GetTransactionsNB:", error);
      });
  };
  const GetImportsVal = () => {
    axios
      .get(
        `http://localhost:8081/api/management/finance/GetImportsVal?TenantID=${CurrentUser.TenantID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setImportsVal(response.data);
        console.log("GetImportsN Fetch:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching GetImportsN:", error);
      });
  };
  const GetexportsVal = () => {
    axios
      .get(
        `http://localhost:8081/api/management/finance/GetExportsVal?TenantID=${CurrentUser.TenantID}`,
        {
          withCredentials: true,
        }
      )
      .then((response) => {
        setExportsVal(response.data);
        console.log("GetExportsN Fetch:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching GetExportsN:", error);
      });
  };

  useEffect(() => {
    // Fetch dashboard statistics from the backend
    GetNTransactions();
    GetImportsVal();
    GetexportsVal();
  }, []);

  return (
    <div className="flex justify-around">
      <BoxWrapper
        label="Number Transactions"
        value={NOTransactions}
        icon={<GiBabyfootPlayers className="text-2xl text-white" />}
      />
      <BoxWrapper
        label="Total Amount 'importaions'"
        value={`${ExportsVal} DZD`}
        icon={<MdIncompleteCircle className="text-2xl text-white" />}
      />
      <BoxWrapper
        label="Total Amount 'exportations'"
        value={`${ImportsVal} DZD`}
        icon={<MdIncompleteCircle className="text-2xl text-white" />}
      />
    </div>
  );
}

function BoxWrapper({ label, value, icon }) {
  return (
    <div className="w-96 bg-blue-500 rounded-lg p-4 flex items-center justify-center flex-col">
      <div className="flex flex-col justify-center">
        <h3 className="text-white text-xl font-bold mb-1">{label}</h3>
        <div className="flex items-center justify-center">
          {icon}
          <strong className="text-white text-4xl font-bold ml-2">
            {value}
          </strong>
        </div>
      </div>
    </div>
  );
}
