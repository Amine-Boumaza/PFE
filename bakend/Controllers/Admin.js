import { db } from "../Connect.js";

export const GetTenents = (req, res) => {
  const q = "SELECT * FROM `tenant`";
  db.query(q, (error, Tenents) => {
    if (error) return res.status(500).json(error);
    res.json(Tenents);
  });
};
export const NmbrAdmins = (req, res) => {
  const q = "SELECT COUNT(*) AS NmbrAdmins FROM `user` WHERE Role = 'admin'";
  db.query(q, (error, nbAdmins) => {
    if (error) return res.status(500).json(error);
    res.json(nbAdmins.map((nbAdmins) => nbAdmins.NmbrAdmins));
  });
};
export const NmbrTenants = (req, res) => {
  const q = "SELECT COUNT(*) AS Tenb FROM `tenant`";
  db.query(q, (error, nbTenants) => {
    if (error) return res.status(500).json(error);
    res.json(nbTenants.map((nbTenants) => nbTenants.Tenb));
  });
};
export const GetAllUsers = (req, res) => {
  const { TenantID } = req.query; // Getting TenantID from query parameters
  const q = "SELECT UserID, Email, Role FROM `user` WHERE TenantID = ?";
  db.query(q, [TenantID], (error, AllUsers) => {
    if (error) return res.status(500).json(error);
    res.json(AllUsers);
  });
};
export const NmbrUsers = (req, res) => {
  const q = "SELECT COUNT(*) AS Usersnb FROM `user`";
  db.query(q, (error, nbUsers) => {
    if (error) return res.status(500).json(error);
    res.json(nbUsers.map((nbUsers) => nbUsers.Usersnb));
  });
};
export const GetTenentTeams = (req, res) => {
  const q = "SELECT * FROM `team` WHERE TenantID = ?";
  db.query(q, [req.body.TenantID], (error, TenantTeams) => {
    if (error) return res.status(500).json(error);
    res.json(TenantTeams);
  });
};
