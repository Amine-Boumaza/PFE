import jwk from "jsonwebtoken";
import { db } from "../Connect.js";

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
  const q = "SELECT * FROM `team` WHERE CoachID = ?";

  db.query(q, [req.body.CoachID], (error, TeamsInfo) => {
    if (error) return res.status(500).json(error);
    res.json(TeamsInfo);
  });
};
export const GetTrainingSessions = (req, res) => {
  const q = "SELECT * FROM `trainingsession` WHERE TeamID = ?";
  db.query(q, [req.body.TeamID], (error, TrainingSessions) => {
    if (error) return res.status(500).json(error);
    res.json(TrainingSessions);
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
