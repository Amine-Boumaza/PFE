export const GetTenents = (req, res) => {
  const q = "SELECT * FROM `tenant`";
  db.query(q, (error, Tenents) => {
    if (error) return res.status(500).json(error);
    res.json(Tenents);
  });
};
export const NmbrAdmins = (req, res) => {
  const q = "SELECT * FROM `user` WHERE Role = 'admin'";
  db.query(q, [req.body.TenantID], (error, nbAdmins) => {
    if (error) return res.status(500).json(error);
    res.json(nbAdmins);
  });
};
export const GetAllUsers = (req, res) => {
  const q = "SELECT * FROM `user` WHERE TenantID = ?";
  db.query(q, (error, AllUsers) => {
    if (error) return res.status(500).json(error);
    res.json(AllUsers);
  });
};
export const GetTenentTeams = (req, res) => {
  const q = "SELECT * FROM `team` WHERE TenantID = ?";
  db.query(q, [req.body.TenantID], (error, TenantTeams) => {
    if (error) return res.status(500).json(error);
    res.json(TenantTeams);
  });
};
