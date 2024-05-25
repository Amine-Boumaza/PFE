import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { db } from "./Connect.js";
import AuthRoutes from "../bakend/Routes/Auth.js";
import MannageRoutes from "../bakend/Routes/Mannagment.js";

const app = express();
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(cookieParser());

app.use("/api/auth", AuthRoutes);
app.use("/api/management", MannageRoutes);

app.get("/management", (req, res) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(400).json({ Error: "you are not authenticated" });
  }
  jwt.verify(token, "SecretKey", (err, decoded) => {
    if (err) {
      return res.json({ Error: "token not correct" });
    } else {
      const email = decoded.Email;

      // Define all SQL queries
      const sqlAdminCount = `SELECT COUNT(*) AS adminCount FROM user`;
      const sqlPlayerCount = `SELECT COUNT(*) AS playerCount FROM player`;
      const sqlMonthlyRevenue = `SELECT SUM(Amount) AS monthlyRevenue FROM financialtransaction WHERE MONTH(date) = MONTH(NOW())`;
      const next7DaysSessionsSql = `SELECT SessionID, Date, Time, TeamID FROM trainingsession`;
      const usersSql = `SELECT * FROM user`;

      // Execute all SQL queries in parallel
      db.query(sqlAdminCount, (err, adminCountResult) => {
        if (err) {
          console.error("Error fetching admin count:", err);
          return res
            .status(500)
            .json({ status: "error", message: "Error fetching admin count" });
        }
        console.log("admincount query result:", adminCountResult[0].adminCount);
        const adminCount = adminCountResult[0].adminCount;

        db.query(sqlPlayerCount, (err, playerCountResult) => {
          if (err) {
            console.error("Error fetching player count:", err);
            return res.status(500).json({
              status: "error",
              message: "Error fetching player count",
            });
          }
          console.log("player query result:", playerCountResult[0].playerCount);
          const playerCount = playerCountResult[0].playerCount;

          db.query(sqlMonthlyRevenue, (err, monthlyRevenueResult) => {
            if (err) {
              console.error("Error fetching monthly revenue:", err);
              return res.status(500).json({
                status: "error",
                message: "Error fetching monthly revenue",
              });
            }
            console.log(
              "revenu query result:",
              monthlyRevenueResult[0].monthlyRevenue
            );
            const monthlyRevenue = monthlyRevenueResult[0].monthlyRevenue;

            db.query(next7DaysSessionsSql, (err, next7DaysSessionsResult) => {
              if (err) {
                console.error("Error fetching next 7 days sessions:", err);
                return res.status(500).json({
                  status: "error",
                  message: "Error fetching next 7 days sessions",
                });
              }
              console.log("sessions query result:", next7DaysSessionsResult);
              const next7DaysSessions = next7DaysSessionsResult;

              db.query(usersSql, (err, usersResult) => {
                if (err) {
                  console.error("Error fetching users:", err);
                  return res
                    .status(500)
                    .json({ status: "error", message: "Error fetching users" });
                }
                console.log("Users query result:", usersResult); // Log the query result
                const users = usersResult;

                // Combine all results into a single response object
                const responseData = {
                  adminCount,
                  playerCount,
                  monthlyRevenue,
                  next7DaysSessions,
                  users,
                };
                res.json(responseData);
              });
            });
          });
        });
      });
    }
  });
});

app.get("/management/activity", (req, res) => {
  // Fetch session reports from the database
  db.query("SELECT * FROM SessionReport", (err, results) => {
    if (err) {
      console.error("Error fetching session reports:", err);
      return res
        .status(500)
        .json({ status: "error", message: "Error fetching session reports" });
    }
    res.json({ sessionReports: results });
  });
});

app.get("/management/financial-transactions", (req, res) => {
  // Fetch all financial transactions from the database
  db.query("SELECT * FROM financialtransaction", (err, results) => {
    if (err) {
      console.error("Error fetching financial transactions:", err);
      return res.status(500).json({
        status: "error",
        message: "Error fetching financial transactions",
      });
    }
    res.json({ financialTransactions: results });
  });
});

app.post("/management/financial-transactions", (req, res) => {
  console.log("Received POST request to manage financial transactions.");
  const { TenantID, Date, Amount, Type, Description, FinanceManagerID } =
    req.body;

  console.log("TenantID:", TenantID);
  console.log("Date:", Date);
  console.log("Amount:", Amount);
  console.log("Type:", Type);
  console.log("Description:", Description);
  console.log("FinanceManagerID:", FinanceManagerID);

  // Add validation if needed

  console.log("Adding a new financial transaction...");
  db.query(
    "INSERT INTO financialtransaction (TenantID, Date, Amount, Type, Description, FinanceManagerID) VALUES (?, ?, ?, ?, ?, ?)",
    [TenantID, Date, Amount, Type, Description, FinanceManagerID],
    (err, result) => {
      if (err) {
        console.error("Error adding financial transaction:", err);
        return res.status(500).json({
          status: "error",
          message: "Error adding financial transaction",
        });
      }
      const newFinancialTransaction = {
        TenantID,
        Date,
        Amount,
        Type,
        Description,
        FinanceManagerID,
      };
      console.log(
        "Financial transaction added successfully:",
        newFinancialTransaction
      );
      res.status(201).json({
        status: "success",
        financialTransaction: newFinancialTransaction,
      });
    }
  );
});

app.delete("/management/financial-transactions/:transactionId", (req, res) => {
  const transactionId = req.params.transactionId;

  console.log(
    "Received DELETE request to manage financial transactions. Transaction ID:",
    transactionId
  );

  console.log("Deleting a financial transaction...");
  db.query(
    "DELETE FROM financialtransaction WHERE TransactionID=?",
    [transactionId],
    (err, result) => {
      if (err) {
        console.error("Error deleting financial transaction:", err);
        return res.status(500).json({
          status: "error",
          message: "Error deleting financial transaction",
        });
      }
      if (result.affectedRows === 0) {
        console.log("Financial transaction not found.");
        return res.status(404).json({
          status: "error",
          message: "Financial transaction not found",
        });
      }
      console.log("Financial transaction deleted successfully.");
      res.json({
        status: "success",
        message: "Financial transaction deleted successfully",
      });
    }
  );
});

app.put("/management/financial-transactions/:transactionId", (req, res) => {
  const { TenantID, Date, Amount, Type, Description, FinanceManagerID } =
    req.body;
  const transactionId = req.params.transactionId;

  console.log(
    "Received PUT request to update financial transaction:",
    req.body
  );

  db.query(
    "UPDATE financialtransaction SET TenantID=?, Date=?, Amount=?, Type=?, Description=?, FinanceManagerID=? WHERE TransactionID=?",
    [
      TenantID,
      Date,
      Amount,
      Type,
      Description,
      FinanceManagerID,
      transactionId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error updating financial transaction:", err);
        return res.status(500).json({
          status: "error",
          message: "Error updating financial transaction",
        });
      }
      if (result.affectedRows === 0) {
        console.log(
          "Financial transaction not found for update:",
          transactionId
        );
        return res.status(404).json({
          status: "error",
          message: "Financial transaction not found",
        });
      }
      const updatedFinancialTransaction = {
        TransactionID: transactionId,
        TenantID,
        Date,
        Amount,
        Type,
        Description,
        FinanceManagerID,
      };
      console.log(
        "Financial transaction updated successfully:",
        updatedFinancialTransaction
      );
      res.json({
        status: "success",
        financialTransaction: updatedFinancialTransaction,
      });
    }
  );
});

// Fetch sessions from the database
app.get("/management/sessions", (req, res) => {
  // Fetch only Date, Time, and TeamID from the database
  db.query("SELECT * FROM trainingsession", (err, results) => {
    if (err) {
      console.error("Error fetching sessions:", err);
      return res
        .status(500)
        .json({ status: "error", message: "Error fetching sessions" });
    }
    res.json({ sessions: results });
  });
});

// Add session to the database
app.post("/management/sessions:sessionId", (req, res) => {
  console.log("Received POST request to manage sessions.");
  const { action, SessionID, TenantID, Date, Time, TeamID } = req.body;

  console.log("Action:", action);
  console.log("SessionID:", SessionID);

  switch (action) {
    case "add":
      console.log("Adding a new session...");
      db.query(
        "INSERT INTO trainingsession (SessionID, TenantID, Date, Time, TeamID) VALUES (?, ?, ?, ?, ?)",
        [SessionID, TenantID, Date, Time, TeamID],
        (err, result) => {
          if (err) {
            console.error("Error adding session:", err);
            return res
              .status(500)
              .json({ status: "error", message: "Error adding session" });
          }
          const newSession = { SessionID, TenantID, Date, Time, TeamID };
          console.log("Session added successfully:", newSession);
          res.status(201).json({ status: "success", session: newSession });
        }
      );
      break;
    case "delete":
      console.log("Deleting a session...");
      db.query(
        "DELETE FROM trainingsession WHERE SessionID=?",
        [SessionID],
        (err, result) => {
          if (err) {
            console.error("Error deleting session:", err);
            return res
              .status(500)
              .json({ status: "error", message: "Error deleting session" });
          }
          if (result.affectedRows === 0) {
            console.log("Session not found.");
            return res
              .status(404)
              .json({ status: "error", message: "Session not found" });
          }
          console.log("Session deleted successfully.");
          res.json({
            status: "success",
            message: "Session deleted successfully",
          });
        }
      );
      break;
    default:
      console.log("Invalid action:", action);
      return res
        .status(400)
        .json({ status: "error", message: "Invalid action" });
  }
});

app.delete("/management/sessions/:sessionId", (req, res) => {
  const SessionID = req.params.sessionId; // Use 'sessionId' here to match the parameter name in the route
  console.log("Received DELETE request to manage sessions.");
  const { action } = req.body; // No need to extract SessionID from the body since it's already in the URL parameter

  console.log("Action:", action);
  console.log("SessionID:", SessionID);

  console.log("Deleting a session...");
  db.query(
    "DELETE FROM trainingsession WHERE SessionID=?",
    [SessionID],
    (err, result) => {
      if (err) {
        console.error("Error deleting session:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Error deleting session" });
      }
      if (result.affectedRows === 0) {
        console.log("Session not found.");
        return res
          .status(404)
          .json({ status: "error", message: "Session not found" });
      }
      console.log("Session deleted successfully.");
      res.json({ status: "success", message: "Session deleted successfully" });
    }
  );
});

// Update session in the database
app.put("/management/sessions/:sessionId", (req, res) => {
  const { TenantID, Date, Time, TeamID } = req.body;
  const sessionId = req.params.sessionId;

  console.log("Received PUT request to update session:", req.body);

  db.query(
    "UPDATE trainingsession SET TenantID=?, Date=?, Time=?, TeamID=? WHERE SessionID=?",
    [TenantID, Date, Time, TeamID, sessionId],
    (err, result) => {
      if (err) {
        console.error("Error updating session:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Error updating session" });
      }
      if (result.affectedRows === 0) {
        console.log("Session not found for update:", sessionId);
        return res
          .status(404)
          .json({ status: "error", message: "Session not found" });
      }
      const updatedSession = {
        SessionID: sessionId,
        TenantID,
        Date,
        Time,
        TeamID,
      };
      console.log("Session updated successfully:", updatedSession);
      res.json({ status: "success", session: updatedSession });
    }
  );
});

app.get("/management/session-reports", (req, res) => {
  // Fetch all session reports from the database
  db.query("SELECT * FROM SessionReport", (err, results) => {
    if (err) {
      console.error("Error fetching session reports:", err);
      return res
        .status(500)
        .json({ status: "error", message: "Error fetching session reports" });
    }
    res.json({ sessionReports: results });
  });
});

app.post("/management/session-reports", (req, res) => {
  console.log("Received POST request to manage session reports.");
  const { ReportText, CreatedAt } = req.body;

  console.log("Report Text:", ReportText);
  console.log("Created At:", CreatedAt);

  // Assuming SessionID and TenantID are also provided in the request
  const { SessionID, TenantID } = req.body;

  console.log("SessionID:", SessionID);
  console.log("TenantID:", TenantID);

  // Add validation for SessionID and TenantID if needed

  console.log("Adding a new session report...");
  db.query(
    "INSERT INTO SessionReport (SessionID, TenantID, ReportText, CreatedAt) VALUES (?, ?, ?, ?)",
    [SessionID, TenantID, ReportText, CreatedAt],
    (err, result) => {
      if (err) {
        console.error("Error adding session report:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Error adding session report" });
      }
      const newSessionReport = { ReportText, CreatedAt };
      console.log("Session report added successfully:", newSessionReport);
      res
        .status(201)
        .json({ status: "success", sessionReport: newSessionReport });
    }
  );
});

app.delete("/management/session-reports/:reportId", (req, res) => {
  const reportId = req.params.reportId;

  console.log(
    "Received DELETE request to manage session reports. Report ID:",
    reportId
  );

  console.log("Deleting a session report...");
  db.query(
    "DELETE FROM SessionReport WHERE ReportID=?",
    [reportId],
    (err, result) => {
      if (err) {
        console.error("Error deleting session report:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Error deleting session report" });
      }
      if (result.affectedRows === 0) {
        console.log("Session report not found.");
        return res
          .status(404)
          .json({ status: "error", message: "Session report not found" });
      }
      console.log("Session report deleted successfully.");
      res.json({
        status: "success",
        message: "Session report deleted successfully",
      });
    }
  );
});

app.put("/management/session-reports/:reportId", (req, res) => {
  const { ReportText, CreatedAt } = req.body;
  const reportId = req.params.reportId;

  console.log("Received PUT request to update session report:", req.body);

  db.query(
    "UPDATE SessionReport SET ReportText=?, CreatedAt=? WHERE ReportID=?",
    [ReportText, CreatedAt, reportId],
    (err, result) => {
      if (err) {
        console.error("Error updating session report:", err);
        return res
          .status(500)
          .json({ status: "error", message: "Error updating session report" });
      }
      if (result.affectedRows === 0) {
        console.log("Session report not found for update:", reportId);
        return res
          .status(404)
          .json({ status: "error", message: "Session report not found" });
      }
      const updatedSessionReport = {
        ReportID: reportId,
        ReportText,
        CreatedAt,
      };
      console.log("Session report updated successfully:", updatedSessionReport);
      res.json({ status: "success", sessionReport: updatedSessionReport });
    }
  );
});


// Get all teams
app.get('/management/teams', (req, res) => {
  db.query('SELECT * FROM team', (error, results) => {
    if (error) {
      console.error("Error fetching teams:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ teams: results });
    }
  });
});

// Add a new team
app.post('/management/teams', (req, res) => {
  const newTeam = req.body;
  db.query('INSERT INTO team SET ?', newTeam, (error, results) => {
    if (error) {
      console.error("Error adding team:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      newTeam.TeamID = results.insertId;
      res.json({ team: newTeam });
    }
  });
});

// Delete a team by ID
app.delete('/management/teams/:id', (req, res) => {
  const teamId = req.params.id;
  db.query('DELETE FROM team WHERE TeamID = ?', teamId, (error) => {
    if (error) {
      console.error("Error deleting team:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.sendStatus(200);
    }
  });
});

// Update a team by ID
app.put('/management/teams/:id', (req, res) => {
  const teamId = req.params.id;
  const updatedTeam = req.body;
  db.query('UPDATE team SET ? WHERE TeamID = ?', [updatedTeam, teamId], (error) => {
    if (error) {
      console.error("Error updating team:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ team: updatedTeam });
    }
  });
});

app.get('/management/players', (req, res) => {
  db.query('SELECT * FROM player', (error, results) => {
    if (error) {
      console.error("Error fetching players:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ players: results });
    }
  });
});

// Add a new player
app.post('/management/players', (req, res) => {
  const newPlayer = req.body;
  db.query('INSERT INTO player SET ?', newPlayer, (error, results) => {
    if (error) {
      console.error("Error adding player:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      newPlayer.PlayerID = results.insertId;
      res.json({ player: newPlayer });
    }
  });
});

// Delete a player by ID
app.delete('/management/players/:id', (req, res) => {
  const playerId = req.params.id;
  db.query('DELETE FROM player WHERE PlayerID = ?', playerId, (error) => {
    if (error) {
      console.error("Error deleting player:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.sendStatus(200);
    }
  });
});

// Update a player by ID
app.put('/management/players/:id', (req, res) => {
  const playerId = req.params.id;
  const updatedPlayer = req.body;
  db.query('UPDATE player SET ? WHERE PlayerID = ?', [updatedPlayer, playerId], (error) => {
    if (error) {
      console.error("Error updating player:", error);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ player: updatedPlayer });
    }
  });
});





app.post('/management/doctor', (req, res) => {
  const { formName, formData } = req.body;

  console.log('Received form data:', { formName, formData }); // Log data received from the frontend

  const TenantID = 1; // Assuming TenantID is fixed or comes from somewhere else

  const insertFormQuery = `
      INSERT INTO FormData (TenantID, FormName, FormData)
      VALUES (?, ?, ?)
  `;
  const values = [TenantID, formName, JSON.stringify(formData)]; // Stringify formData before insertion

  db.query(insertFormQuery, values, (err, result) => {
    if (err) {
      console.error('Error creating form:', err);
      res.status(500).json({ message: 'Error creating form' });
    } else {
      console.log('Form data stored successfully:', { formName, formData }); // Log data stored in the database
      res.status(200).json({ message: 'Form created successfully' });
    }
  });
});



// Endpoint to fetch available forms
app.get('/forms', async (req, res) => {
  try {
    // Query to fetch available forms from the database
    const query = 'SELECT DISTINCT FormName FROM FormData';
    db.query(query, (err, result) => {
      if (err) {
        console.error('Error fetching forms:', err);
        res.status(500).json({ error: 'Error fetching forms' });
      } else {
        const forms = result.map(row => ({ formName: row.FormName }));
        res.status(200).json({ forms });
      }
    });
  } catch (error) {
    console.error('Error fetching forms:', error);
    res.status(500).json({ error: 'Error fetching forms' });
  }
});

// Endpoint to fetch form responses for a specific form
app.get('/forms/:formName/responses', async (req, res) => {
  const formName = req.params.formName;
  try {
    // Query to fetch form responses for the specified form
    const query = 'SELECT * FROM FormData WHERE FormName = ?';
    db.query(query, [formName], (err, result) => {
      if (err) {
        console.error(`Error fetching responses for form ${formName}:`, err);
        res.status(500).json({ error: `Error fetching responses for form ${formName}` });
      } else {
        // Convert form responses to a dictionary format for easier access
        const formResponses = {};
        result.forEach(row => {
          const formData = JSON.parse(row.FormData);
          formData.forEach((question, index) => {
            formResponses[`question${index + 1}`] = question;
          });
        });
        res.status(200).json({ formResponses });
      }
    });
  } catch (error) {
    console.error(`Error fetching responses for form ${formName}:`, error);
    res.status(500).json({ error: `Error fetching responses for form ${formName}` });
  }
});



app.post('/submit-form', async (req, res) => {
  const { formName, responses } = req.body;
  try {
    // Get the FormID based on the formName
    const formIDQuery = 'SELECT FormID FROM FormData WHERE FormName = ?';
    db.query(formIDQuery, [formName], (err, result) => {
      if (err) {
        console.error('Error getting FormID:', err);
        res.status(500).json({ error: 'Error submitting form' });
      } else {
        const formID = result[0].FormID;
        // Insert form responses into the database
        const insertQuery = 'INSERT INTO FormResponse (FormID, TenantID, Responses) VALUES (?, ?, ?)';
        db.query(insertQuery, [formID, 1, JSON.stringify(responses)], (err, result) => {
          if (err) {
            console.error('Error submitting form:', err);
            res.status(500).json({ error: 'Error submitting form' });
          } else {
            console.log('Form submitted successfully');
            res.status(200).json({ message: 'Form submitted successfully' });
          }
        });
      }
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Error submitting form' });
  }
});


app.get('/formresponses/:formName', async (req, res) => {
  const formName = req.params.formName;
  try {
    db.query('SELECT FormID FROM FormData WHERE formName = ?', [formName], (err, results) => {
      if (err) {
        console.error('Error fetching FormID:', err);
        res.status(500).json({ error: 'Error fetching FormID' });
      } else {
        if (results.length > 0) {
          const formID = results[0].FormID;
          db.query('SELECT ResponseID, Responses FROM formresponse WHERE FormID = ?', [formID], (err, responses) => {
            if (err) {
              console.error(`Error fetching responses for form ${formName}:`, err);
              res.status(500).json({ error: `Error fetching responses for form ${formName}` });
            } else {
              const parsedResponses = responses.map(response => {
                return {
                  ResponseID: response.ResponseID,
                  ...JSON.parse(response.Responses)
                };
              });
              res.status(200).json({ responses: parsedResponses });
            }
          });
        } else {
          res.status(404).json({ error: 'Form not found' });
        }
      }
    });
  } catch (error) {
    console.error(`Error fetching form data for form ${formName}:`, error);
    res.status(500).json({ error: `Error fetching form data for form ${formName}` });
  }
});

app.delete('/formresponses/:responseId', async (req, res) => {
  const responseId = req.params.responseId;
  try {
    db.query('DELETE FROM formresponse WHERE ResponseID = ?', [responseId], (err, result) => {
      if (err) {
        console.error('Error deleting response:', err);
        res.status(500).json({ error: 'Error deleting response' });
      } else {
        res.status(200).json({ message: 'Response deleted successfully' });
      }
    });
  } catch (error) {
    console.error('Error deleting response:', error);
    res.status(500).json({ error: 'Error deleting response' });
  }
});



app.listen(8081, () => {
  console.log("Server is running on port 8081");
});
