import { db } from "../Connect.js";

export const GetAllTeams = (req, res) => {
  const { TenantID } = req.query;
  const q = `
    SELECT T.Name, C.Name AS CoachName 
    FROM team AS T 
    JOIN coach AS C ON T.CoachID = C.CoachID 
    WHERE T.TenantID = ?`;

  db.query(q, [TenantID], (error, AllUsers) => {
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
  const q =
    "SELECT S.ReportID ,S.CreatedAt,TR.Date,T.Name ,C.Name AS CoachName, S.ReportText AS Summary FROM `sessionreport` AS S , trainingsession AS TR, team AS T, coach AS C WHERE S.TenantID = 1 AND S.SessionID = TR.SessionID AND TR.TeamID = T.TeamID AND C.CoachID = T.CoachID";

  db.query(q, [req.body.TenantID], (error, AllRapports) => {
    if (error) return res.status(500).json(error);
    res.json(AllRapports);
  });
};
