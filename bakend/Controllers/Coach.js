import jwk from "jsonwebtoken";
import { db } from "../Connect.js";

export const PlayersNB = (req, res) => {
  const { TenantID, UserID } = req.query; // Extract TenantID and UserID from query parameters
  const q = `SELECT COUNT(P.PlayerID) AS PlayersNb 
             FROM team AS T, player AS P 
             WHERE P.TenantID = ? AND T.TeamID = P.TeamID AND T.CoachID = (SELECT CoachID FROM coach WHERE UserID = ?)`;

  db.query(q, [TenantID, UserID], (error, result) => {
    if (error) return res.status(500).json(error);
    res.json(result[0].PlayersNb); // Directly returning the count
  });
};
export const AddSessionRapport = (req, res) => {
  const { SessionID, TennatID } = req.query;
  const {
    ReportText,
    CreatedAt,
    InitialStage,
    InitialStageTime,
    InitialStageContent,
    InitialStageNotes,
    MainStage,
    MainStageTime,
    MainStageContent,
    MainStageNotes,
    FinalStage,
    FinalStageTime,
    FinalStageContent,
    FinalStageNotes,
  } = req.body;
  console.log(
    SessionID,
    TennatID,
    ReportText,
    CreatedAt,
    InitialStage,
    InitialStageTime,
    InitialStageContent,
    InitialStageNotes,
    MainStage,
    MainStageTime,
    MainStageContent,
    MainStageNotes,
    FinalStage,
    FinalStageTime,
    FinalStageContent,
    FinalStageNotes
  );
  const insertQuery = `INSERT INTO sessionreport( SessionID, TenantID, ReportText, CreatedAt, InitialStage, InitialStageTime, InitialStageContent, InitialStageNotes, MainStage, MainStagetime, MainStageContent, MainStageNotes, FinalStage, FinalStageTime, FinalStageContent, FinalStageNotes) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

  db.query(
    insertQuery,
    [
      SessionID,
      TennatID,
      ReportText,
      CreatedAt,
      InitialStage,
      InitialStageTime,
      InitialStageContent,
      InitialStageNotes,
      MainStage,
      MainStageTime,
      MainStageContent,
      MainStageNotes,
      FinalStage,
      FinalStageTime,
      FinalStageContent,
      FinalStageNotes,
    ],
    (insertError, insertResult) => {
      if (insertError) return res.status(500).json(insertError);

      const getNewTeamQuery =
        "SELECT * FROM `sessionreport` WHERE SessionID = ?";
      db.query(getNewTeamQuery, [SessionID], (selectError, newTeamData) => {
        if (selectError) return res.status(500).json(selectError);
        res.json(newTeamData[0]); // Return the newly created team data
      });
    }
  );
};

export const GetCoachTeamsN = (req, res) => {
  const { TenantID, UserID } = req.query;
  const q = `
    SELECT COUNT(*) AS TeamsNb 
    FROM team 
    WHERE TenantID = ? 
    AND CoachID = (SELECT CoachID FROM coach WHERE UserID = ?)`;

  db.query(q, [TenantID, UserID], (error, nbTeams) => {
    if (error) return res.status(500).json(error);
    res.json(nbTeams[0].TeamsNb);
  });
};

export const GetCoachData = (req, res) => {
  const token = req.cookies.AccessToken;
  if (!token) return res.status(401).json("you're not logged in");
  jwk.verify(token, "SecretKey", (err, UserData) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM `coach` WHERE UserID = ?";

    db.query(q, [UserData.id], (error, CoachData) => {
      if (error) return res.status(500).json(error);
      res.json(CoachData);
    });
  });
};

export const PlayersList = (req, res) => {
  const q = "SELECT * FROM `player` WHERE TeamID = ?";
  db.query(q, [req.body.TeamID], (error, Playersliste) => {
    if (error) return res.status(500).json(error);
    res.json(Playersliste);
  });
};
export const AddRapport = (req, res) => {
  // a changer
  const token = req.cookies.AccessToken;
  if (!token) return res.status(401).json("you're not logged in");
  jwk.verify(token, "SecretKey", (err, UserData) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "";
    if (error) return res.status(500).json(error);
  });
};
export const GetTeams = (req, res) => {
  const { TenantID, UserID } = req.query;
  const q = `
    SELECT T.TeamID AS Number, T.Name AS Name 
    FROM team AS T
    JOIN coach AS C ON T.CoachID = C.CoachID
    WHERE T.TenantID = ? AND C.UserID = ?`;

  db.query(q, [TenantID, UserID], (error, results) => {
    if (error)
      return res
        .status(500)
        .json({ error: "Database query failed", details: error });
    res.json(results);
  });
};
export const GetTeamBySID = (req, res) => {
  const { SessionID } = req.query;
  console.log("SessionID", SessionID);
  const q = `
    SELECT P.PlayerID, P.Name, TS.Date ,TS.SessionID
    FROM trainingsession AS TS 
    JOIN team AS T ON TS.TeamID = T.TeamID 
    JOIN player AS P ON P.TeamID = T.TeamID 
    WHERE TS.SessionID = ?`;

  db.query(q, [SessionID], (error, results) => {
    if (error)
      return res
        .status(500)
        .json({ error: "Database query failed", details: error });
    res.json({ players: results });
  });
};

export const GetCoachSessions = (req, res) => {
  const { CoachID } = req.query;
  const q = `SELECT TS.SessionID, TS.Date, TS.Time , T.Name  FROM trainingsession AS TS, team AS T,coach AS C WHERE  TS.TeamID = T.TeamID AND T.CoachID = C.CoachID AND C.UserID = ?`;

  db.query(q, [CoachID], (error, AllUsers) => {
    if (error) return res.status(500).json(error);
    res.json(AllUsers);
  });
};

export const GetTrainingSessions = (req, res) => {
  const { TenantID, UserID } = req.query;
  const q = `
  SELECT TS.SessionID,T.Name AS NAME,TS.Date,TS.Time FROM trainingsession AS TS, coach AS C, team AS T WHERE T.TenantID = ? AND TS.TeamID = T.TeamID AND T.CoachID = C.CoachID AND C.CoachID = (SELECT CoachID FROM coach WHERE UserID =?)`;

  db.query(q, [TenantID, UserID], (error, results) => {
    if (error)
      return res
        .status(500)
        .json({ error: "Database query failed", details: error });
    res.json(results);
  });
};
export const GetTrainingSessionsWeakly = (req, res) => {
  const token = req.cookies.AccessToken;
  if (!token) return res.status(401).json("you're not logged in");
  jwk.verify(token, "SecretKey", (err, UserData) => {
    if (err) return res.status(403).json("Token is not valid!");
    const q = "";
  });
};
export const AddInjuryRapport = (req, res) => {}; // a changer
