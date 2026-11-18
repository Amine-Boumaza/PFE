import { db } from "../Connect.js";

export const GetAttendence = (req, res) => {
  const { SessionID } = req.query;
  console.log("Request received to fetch attendance data");

  const sql = `SELECT A.AttendanceID,TS.Date AS SessionDate,P.Name AS PlayerName,A.status  FROM attendance AS A,player AS P, trainingsession AS TS WHERE A.PlayerID = P.PlayerID AND TS.SessionID = A.SessionID AND A.SessionID = ?`;

  console.log("Executing SQL query:", sql);

  db.query(sql, [SessionID], (err, results) => {
    if (err) {
      console.error("Error fetching attendance data:", err);
      res.status(500).send("Error fetching attendance data");
    } else {
      console.log("Attendance data retrieved successfully:", results);
      res.json(results);
    }
  });
};

export const GetAllTeams = (req, res) => {
  const { TenantID } = req.query;
  const q = `
    SELECT T.TeamID, T.Name, C.Name AS CoachName 
    FROM team AS T 
    JOIN coach AS C ON T.CoachID = C.CoachID 
    WHERE T.TenantID = ?`;

  db.query(q, [TenantID], (error, AllUsers) => {
    if (error) return res.status(500).json(error);
    res.json(AllUsers);
  });
};
export const GetRapports = (req, res) => {
  const { SessionID } = req.query;
  console.log(SessionID);
  const q = `SELECT * FROM sessionreport WHERE SessionID = ?`;

  db.query(q, [SessionID], (error, AllUsers) => {
    if (error) return res.status(500).json(error);
    res.json(AllUsers);
  });
};
export const GetAllSessions = (req, res) => {
  const { TenantID } = req.query;
  const q = `SELECT TS.SessionID, TS.Date, TS.Time , T.Name  FROM trainingsession AS TS, team AS T WHERE TS.TenantID = ? AND TS.TeamID = T.TeamID`;

  db.query(q, [TenantID], (error, AllUsers) => {
    if (error) return res.status(500).json(error);
    res.json(AllUsers);
  });
};

export const DeleteTeam = (req, res) => {
  const { TeamID } = req.query;
  if (!TeamID) {
    return res.status(400).json({ error: "TeamID is required" });
  }

  // First, delete related rows in the sessionreport table
  const deleteSessionReportsQuery = `DELETE FROM sessionreport WHERE SessionID IN (SELECT SessionID FROM trainingsession WHERE TeamID = ?)`;

  db.query(deleteSessionReportsQuery, [TeamID], (sessionReportsError) => {
    if (sessionReportsError) {
      console.error("Error deleting session reports:", sessionReportsError);
      return res.status(500).json({
        error: "Error deleting session reports",
        details: sessionReportsError,
      });
    }

    // Then, delete related rows in the trainingsession table
    const deleteTrainingSessionsQuery = `DELETE FROM trainingsession WHERE TeamID = ?`;

    db.query(deleteTrainingSessionsQuery, [TeamID], (trainingSessionsError) => {
      if (trainingSessionsError) {
        console.error(
          "Error deleting training sessions:",
          trainingSessionsError
        );
        return res.status(500).json({
          error: "Error deleting training sessions",
          details: trainingSessionsError,
        });
      }

      // Finally, delete the team
      const deleteTeamQuery = `DELETE FROM team WHERE TeamID = ?`;

      db.query(deleteTeamQuery, [TeamID], (teamError) => {
        if (teamError) {
          console.error("Error deleting team:", teamError);
          return res
            .status(500)
            .json({ error: "Error deleting team", details: teamError });
        }

        res.json("Delete success");
      });
    });
  });
};

export const DeleteSession = (req, res) => {
  const { SessionID } = req.query;
  console.log(SessionID);

  const deleteAttendanceRelated = `DELETE FROM attendance WHERE SessionID = ?`;
  db.query(deleteAttendanceRelated, [SessionID], (attendanceError) => {
    if (attendanceError) {
      console.error("Error deleting attendance:", attendanceError);
      return res.status(500).json({
        error: "Error deleting attendance",
        details: attendanceError,
      });
    }

    const deleteSessionReportsQuery = `DELETE FROM sessionreport WHERE SessionID = ?`;
    db.query(deleteSessionReportsQuery, [SessionID], (sessionReportsError) => {
      if (sessionReportsError) {
        console.error("Error deleting session reports:", sessionReportsError);
        return res.status(500).json({
          error: "Error deleting session reports",
          details: sessionReportsError,
        });
      }

      const deleteTrainingSessionsQuery = `DELETE FROM trainingsession WHERE SessionID = ?`;
      db.query(
        deleteTrainingSessionsQuery,
        [SessionID],
        (trainingSessionsError) => {
          if (trainingSessionsError) {
            console.error(
              "Error deleting training sessions:",
              trainingSessionsError
            );
            return res.status(500).json({
              error: "Error deleting training sessions",
              details: trainingSessionsError,
            });
          }

          // Success response
          res.status(200).json({
            message: "Session deleted successfully",
          });
        }
      );
    });
  });
};

export const DeletePlayer = (req, res) => {
  const { TeamID } = req.query;
  if (!TeamID) {
    return res.status(400).json({ error: "TeamID is required" });
  }
  const DeleteInjuryRapport = `DELETE FROM injuryreport WHERE PlayerID IN (SELECT PlayerID FROM player WHERE TeamID =?)`;
  // First, delete related rows in the attendance table

  const deleteAttendanceQuery = `DELETE FROM attendance WHERE PlayerID IN (SELECT PlayerID FROM player WHERE TeamID = ?)`;
  db.query(DeleteInjuryRapport, [TeamID], (attendanceError) => {
    if (attendanceError) {
      console.error("Error deleting attendance records:", attendanceError);
      return res.status(500).json({ error: "Internal Server Error" });
    }
    db.query(deleteAttendanceQuery, [TeamID], (attendanceError) => {
      if (attendanceError) {
        console.error("Error deleting attendance records:", attendanceError);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      // Then, delete the players
      const deletePlayerQuery = `DELETE FROM player WHERE TeamID = ?`;

      db.query(deletePlayerQuery, [TeamID], (playerError) => {
        if (playerError) {
          console.error("Error deleting players:", playerError);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.json("Delete success");
      });
    });
  });
};

export const GetCoaches = (req, res) => {
  const { TenantID } = req.query;
  const q = `SELECT *  FROM coach WHERE TenantID = ?`;

  db.query(q, [TenantID], (error, AllUsers) => {
    if (error) return res.status(500).json(error);
    res.json(AllUsers);
  });
};
export const AddTeam = (req, res) => {
  const { TenantID } = req.query;
  const { Name, CoachID } = req.body;
  const insertQuery = `INSERT INTO team (TenantID, Name, CoachID) VALUES (?, ?, ?)`;

  db.query(
    insertQuery,
    [TenantID, Name, CoachID],
    (insertError, insertResult) => {
      if (insertError) return res.status(500).json(insertError);

      const getNewTeamQuery = `SELECT T.TeamID ,T.TenantID,T.Name,C.Name AS CoachName FROM team AS T, coach AS C WHERE TeamID = ? AND T.CoachID = C.CoachID`;
      db.query(
        getNewTeamQuery,
        [insertResult.insertId],
        (selectError, newTeamData) => {
          if (selectError) return res.status(500).json(selectError);
          res.json(newTeamData[0]); // Return the newly created team data
        }
      );
    }
  );
};

export const AddSession = (req, res) => {
  const { TenantID } = req.query;
  const { Date, Time, TeamID } = req.body;
  const insertQuery = `INSERT INTO trainingsession(TenantID, Date, Time, TeamID) VALUES (?,?,?,?)`;

  db.query(
    insertQuery,
    [TenantID, Date, Time, TeamID],
    (insertError, insertResult) => {
      if (insertError) return res.status(500).json(insertError);

      const getNewSessionQuery = `SELECT TS.SessionID, TS.Date, TS.Time, T.Name FROM trainingsession AS TS JOIN team AS T ON TS.TeamID = T.TeamID WHERE TS.SessionID = ?`;
      db.query(
        getNewSessionQuery,
        [insertResult.insertId],
        (selectError, newSessionData) => {
          if (selectError) return res.status(500).json(selectError);
          res.json(newSessionData[0]); // Return the newly created session data
        }
      );
    }
  );
};

export const AddPlayer = (req, res) => {
  const { TeamID } = req.query;
  const {
    TenantID,
    Name,
    Date_of_Birth,
    Place_of_birth,
    Blood_type,
    Height,
    weight,
    ph_Number,
    Parent_Number,
    Sex,
  } = req.body;
  const insertQuery = `INSERT INTO player(TenantID, Name, TeamID, Date_of_Birth, Place_of_birth, Blood_type, Height, weight, ph_Number, Parent_Number, Sex) VALUES (?,?,?,?,?,?,?,?,?,?,?)`;

  db.query(
    insertQuery,
    [
      TenantID,
      Name,
      TeamID,
      Date_of_Birth,
      Place_of_birth,
      Blood_type,
      Height,
      weight,
      ph_Number,
      Parent_Number,
      Sex,
    ],
    (insertError, insertResult) => {
      if (insertError) return res.status(500).json(insertError);

      const getNewTeamQuery = `SELECT * FROM player WHERE PlayerID = ?`;
      db.query(
        getNewTeamQuery,
        [insertResult.insertId],
        (selectError, newTeamData) => {
          if (selectError) return res.status(500).json(selectError);
          res.json(newTeamData[0]); // Return the newly created team data
        }
      );
    }
  );
};
export const UpdatePlayer = (req, res) => {
  const { id } = req.params;
  const {
    Name,
    Date_of_Birth,
    Place_of_birth,
    Blood_type,
    Height,
    weight,
    ph_Number,
    Parent_Number,
    Sex,
  } = req.body;

  const updateQuery = `
    UPDATE player
    SET 
      Name = ?,
      Date_of_Birth = ?,
      Place_of_birth = ?,
      Blood_type = ?,
      Height = ?,
      weight = ?,
      ph_Number = ?,
      Parent_Number = ?,
      Sex = ?
    WHERE PlayerID = ?`;

  db.query(
    updateQuery,
    [
      Name,
      Date_of_Birth,
      Place_of_birth,
      Blood_type,
      Height,
      weight,
      ph_Number,
      Parent_Number,
      Sex,
      id,
    ],
    (updateError, updateResult) => {
      if (updateError) return res.status(500).json(updateError);

      if (updateResult.affectedRows === 0) {
        return res.status(404).json({ message: "Player not found" });
      }

      const getUpdatedPlayerQuery = `SELECT * FROM player WHERE PlayerID = ?`;
      db.query(getUpdatedPlayerQuery, [id], (selectError, updatedPlayer) => {
        if (selectError) return res.status(500).json(selectError);
        res.json({
          message: "Player updated successfully",
          player: updatedPlayer[0],
        });
      });
    }
  );
};

export const EditRapport = (req, res) => {
  const {
    ReportID,
    ReportText,
    CreatedAt,
    InitialStage,
    InitialStageTime,
    InitialStageContent,
    InitialStageNotes,
    MainStage,
    MainStagetime,
    MainStageContent,
    MainStageNotes,
    FinalStage,
    FinalStageTime,
    FinalStageContent,
    FinalStageNotes,
  } = req.body;
  console.log(
    ReportID,
    ReportText,
    CreatedAt,
    InitialStage,
    InitialStageTime,
    InitialStageContent,
    InitialStageNotes,
    MainStage,
    MainStagetime,
    MainStageContent,
    MainStageNotes,
    FinalStage,
    FinalStageTime,
    FinalStageContent,
    FinalStageNotes
  );

  // Correct the update query and make sure the response data is properly structured
  const updateQuery = `UPDATE sessionreport SET ReportText=?,CreatedAt=?,InitialStage=?,InitialStageTime=?,InitialStageContent=?,InitialStageNotes=?,MainStage=?,MainStagetime=?,MainStageContent=?,MainStageNotes=?,FinalStage=?,FinalStageTime=?,FinalStageContent=?,FinalStageNotes=? WHERE ReportID = ?`;
  db.query(
    updateQuery,
    [
      ReportText,
      CreatedAt,
      InitialStage,
      InitialStageTime,
      InitialStageContent,
      InitialStageNotes,
      MainStage,
      MainStagetime,
      MainStageContent,
      MainStageNotes,
      FinalStage,
      FinalStageTime,
      FinalStageContent,
      FinalStageNotes,
      ReportID,
    ],
    (updateError, updateResult) => {
      if (updateError) return res.status(500).json(updateError);

      // After updating, fetch the updated team data to send back to the client
      const getNewTeamQuery = `SELECT * FROM sessionreport WHERE ReportID = ?`;
      db.query(getNewTeamQuery, [ReportID], (selectError, newTeamData) => {
        if (selectError) return res.status(500).json(selectError);

        res.json(newTeamData[0]); // Return the updated team data
      });
    }
  );
};
export const EditTeam = (req, res) => {
  const { TeamID } = req.query;
  const { Name, CoachID } = req.body;

  // Correct the update query and make sure the response data is properly structured
  const updateQuery = `UPDATE team SET Name=?, CoachID=? WHERE TeamID=?`;
  db.query(
    updateQuery,
    [Name, CoachID, TeamID],
    (updateError, updateResult) => {
      if (updateError) return res.status(500).json(updateError);

      // After updating, fetch the updated team data to send back to the client
      const getNewTeamQuery = `SELECT T.TeamID ,T.TenantID,T.Name,C.Name AS CoachName FROM team AS T, coach AS C WHERE TeamID = ? AND T.CoachID = C.CoachID`;
      db.query(getNewTeamQuery, [TeamID], (selectError, newTeamData) => {
        if (selectError) return res.status(500).json(selectError);

        res.json(newTeamData[0]); // Return the updated team data
      });
    }
  );
};
export const EditSession = (req, res) => {
  const { SessionID } = req.query;
  const { Date, Time, TeamID } = req.body; // Changed TeamsID to TeamID

  // Correct the update query and make sure the response data is properly structured
  const updateQuery = `UPDATE trainingsession SET Date=?, Time=?, TeamID=? WHERE SessionID=?`;
  db.query(
    updateQuery,
    [Date, Time, TeamID, SessionID], // Changed TeamsID to TeamID
    (updateError, updateResult) => {
      if (updateError) return res.status(500).json(updateError);

      // After updating, fetch the updated session data to send back to the client
      const getUpdatedSessionQuery = `SELECT S.SessionID, S.Date, S.Time, T.Name 
                                      FROM trainingsession AS S 
                                      JOIN team AS T ON S.TeamID = T.TeamID 
                                      WHERE S.SessionID = ?`;
      db.query(
        getUpdatedSessionQuery,
        [SessionID],
        (selectError, updatedSessionData) => {
          if (selectError) return res.status(500).json(selectError);

          res.json({ session: updatedSessionData[0] }); // Return the updated session data
        }
      );
    }
  );
};

export const GetTeamsPlayers = (req, res) => {
  const { TeamID } = req.query;
  const q = `SELECT * FROM player WHERE TeamID = ?`;

  db.query(q, [TeamID], (error, AllUsers) => {
    if (error) return res.status(500).json(error);
    res.json(AllUsers);
  });
};

export const GetUsersN = (req, res) => {
  const { TenantID } = req.query;
  const q = "SELECT COUNT(*) AS Usersnb FROM `user` WHERE TenantID = ?";
  db.query(q, [TenantID], (error, nbUsers) => {
    if (error) return res.status(500).json(error);
    res.json(nbUsers.map((nbUsers) => nbUsers.Usersnb));
  });
};
export const GetTeamsN = (req, res) => {
  const { TenantID } = req.query;
  const q = "SELECT COUNT(*) AS TeamsNb FROM `team` WHERE TenantID = ?";
  db.query(q, [TenantID], (error, nbTeams) => {
    if (error) return res.status(500).json(error);
    res.json(nbUsers.map((nbTeams) => nbTeams.TeamsNb));
  });
};
export const GetRevenueImport = (req, res) => {
  const { TenantID } = req.query;
  const q =
    "SELECT SUM(Amount) AS IMP FROM `financialtransaction` WHERE TenantID = 2 AND Type = 'Import'";
  db.query(q, [TenantID], (error, impRes) => {
    if (error) return res.status(500).json(error);
    res.json(impRes.map((impRes) => impRes.IMP));
  });
};
export const GetRevenueExports = (req, res) => {
  const { TenantID } = req.query;
  const q =
    "SELECT SUM(Amount) AS EXP FROM `financialtransaction` WHERE TenantID = ? AND Type = 'Export'";
  db.query(q, [TenantID], (error, expRes) => {
    if (error) return res.status(500).json(error);
    res.json(expRes.map((expRes) => expRes.EXP));
  });
};
export const GetAllRapports = (req, res) => {
  const { TenantID } = req.query;
  console.log(TenantID);
  const q =
    "SELECT S.ReportID,S.CreatedAt,TR.Date,T.Name ,C.Name AS CoachName, S.ReportText AS Summary FROM `sessionreport` AS S , trainingsession AS TR, team AS T, coach AS C WHERE S.TenantID = ? AND S.SessionID = TR.SessionID AND TR.TeamID = T.TeamID AND C.CoachID = T.CoachID";

  db.query(q, [TenantID], (error, AllRapports) => {
    if (error) return res.status(500).json(error);
    res.json(AllRapports);
  });
};
