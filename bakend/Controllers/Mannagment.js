import { db } from "../Connect.js";

export const GetAllTeams = (req, res) => {
  const q =
    "SELECT T.TeamID,T.TenantID,T.Name,C.Name FROM `team` AS T, coach AS C WHERE T.TenantID = ? AND T.CoachID = C.CoachID";

  db.query(q, [req.body.TenantID], (error, AllTeams) => {
    if (error) return res.status(500).json(error);
    res.json(AllTeams);
  });
};
export const GetAllRapports = (req, res) => {
  const q =
    "SELECT S.ReportID,S.ReportText,S.CreatedAt,TR.Date,T.Name FROM `sessionreport` AS S , trainingsession AS TR, team AS T WHERE S.TenantID = ? AND S.SessionID = TR.SessionID AND TR.TeamID = T.TeamID ";

  db.query(q, [req.body.TenantID], (error, AllRapports) => {
    if (error) return res.status(500).json(error);
    res.json(AllRapports);
  });
};
