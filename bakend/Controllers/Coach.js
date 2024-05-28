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
