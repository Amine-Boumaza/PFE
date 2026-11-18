import jwk from "jsonwebtoken";
import { db } from "../Connect.js";

export const VerifyToken = (req, res) => {
  const token = req.cookies.AccessToken;
  if (!token) return res.status(401).json("you're not logged in");
  jwk.verify(token, "SecretKey", (err, UserData) => {
    if (err) return res.status(403).json("Token is not valid!");
    res.json(UserData);
  });
};
export const GetExports = (req, res) => {
  const { TenantID } = req.query;
  const q = `SELECT * FROM financialtransaction WHERE TenantID = ? AND Type = 'Export'`;

  db.query(q, [TenantID], (error, results) => {
    if (error)
      return res
        .status(500)
        .json({ error: "Database query failed", details: error });
    res.json(results);
  });
};
export const GetImports = (req, res) => {
  const { TenantID } = req.query;
  const q = `SELECT * FROM financialtransaction WHERE TenantID = ? AND Type = 'Import'`;

  db.query(q, [TenantID], (error, results) => {
    if (error)
      return res
        .status(500)
        .json({ error: "Database query failed", details: error });
    res.json(results);
  });
};
export const GetTransactions = (req, res) => {
  const { TenantID } = req.query;
  const q = `SELECT * FROM financialtransaction WHERE TenantID = ?`;

  db.query(q, [TenantID], (error, results) => {
    if (error)
      return res
        .status(500)
        .json({ error: "Database query failed", details: error });
    res.json(results);
  });
};

export const GetNBTransections = (req, res) => {
  const { TenantID } = req.query;
  const q = `SELECT COUNT(*) AS NBfinances FROM financialtransaction WHERE TenantID = ?`;
  db.query(q, [TenantID], (error, result) => {
    if (error) return res.status(500).json(error);
    res.json(result[0].NBfinances);
  });
};
export const GetNBImports = (req, res) => {
  const { TenantID } = req.query;
  const q = `SELECT SUM(Amount) AS Import FROM financialtransaction WHERE TenantID = ? AND Type = 'Import'`;
  db.query(q, [TenantID], (error, result) => {
    if (error) return res.status(500).json(error);
    res.json(result[0].Import);
  });
};

export const GetNBExports = (req, res) => {
  const { TenantID } = req.query;
  const q = `SELECT SUM(Amount) AS Exports FROM financialtransaction WHERE TenantID = ? AND Type = 'Export'`;
  db.query(q, [TenantID], (error, result) => {
    if (error) return res.status(500).json(error);
    res.json(result[0].Exports);
  });
};
// AddTransactions
export const AddTransactions = (req, res) => {
  const { TenantID, Date, Amount, Type, Description } = req.body;

  // Construct the query with correct placeholders
  const q = `INSERT INTO financialtransaction (TenantID, Date, Amount, Type, Description) VALUES (?, ?, ?, ?, ?)`;

  // Execute the query
  db.query(q, [TenantID, Date, Amount, Type, Description], (error, results) => {
    if (error) {
      console.error("Database query failed", error);
      return res
        .status(500)
        .json({ error: "Database query failed", details: error });
    }

    // Fetch the inserted record to send back as response
    const insertedTransactionID = results.insertId;
    const fetchQuery = `SELECT * FROM financialtransaction WHERE TransactionID = ?`;

    db.query(
      fetchQuery,
      [insertedTransactionID],
      (fetchError, fetchResults) => {
        if (fetchError) {
          console.error("Database fetch failed", fetchError);
          return res
            .status(500)
            .json({ error: "Database fetch failed", details: fetchError });
        }

        res.json({ financialTransaction: fetchResults[0] });
      }
    );
  });
};

// EditTransactions
export const EditTransactions = (req, res) => {
  const { TransactionID } = req.query;
  const { TenantID, Date, Amount, Type, Description } = req.body;

  const q = `
    UPDATE financialtransaction
    SET TenantID = ?, Date = ?, Amount = ?, Type = ?, Description = ?
    WHERE TransactionID = ?
  `;

  db.query(
    q,
    [TenantID, Date, Amount, Type, Description, TransactionID],
    (error, results) => {
      if (error) {
        console.error("Database query failed", error);
        return res
          .status(500)
          .json({ error: "Database query failed", details: error });
      }

      const fetchQuery = `SELECT * FROM financialtransaction WHERE TransactionID = ?`;

      db.query(fetchQuery, [TransactionID], (fetchError, fetchResults) => {
        if (fetchError) {
          console.error("Database fetch failed", fetchError);
          return res
            .status(500)
            .json({ error: "Database fetch failed", details: fetchError });
        }

        res.json({ updatedTransaction: fetchResults[0] });
      });
    }
  );
};
