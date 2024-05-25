import jwk from "jsonwebtoken";
import { db } from "../Connect.js";

export const GetDoctorData = (req, res) => {
  const token = req.cookies.AccessToken;
  if (!token) return res.status(401).json("you're not logged in");
  jwk.verify(token, "SecretKey", (err, UserData) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM `doctor` WHERE UserID = ?";

    db.query(q, [UserData.id], (error, DoctorData) => {
      if (error) return res.status(500).json(error);
      res.json(DoctorData);
    });
  });
};

export const GetInjuryRapports = (req, res) => {
  const q = "SELECT * FROM `injuryreport` WHERE TenantID = ?";
  db.query(q, [req.body.TenantID], (error, injuryrapports) => {
    if (error) return res.status(500).json(error);
    res.json(injuryrapports);
  });
};
export const AddMedicalForm = (req, res) => {
  // a changer
};
