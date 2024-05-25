import jwk from "jsonwebtoken";
import { db } from "../Connect.js";

export const player = (req, res) => {
  const token = req.cookies.AccessToken;
  if (!token) return res.status(401).json("you're not logged in");
  jwk.verify(token, "SecretKey", (err, UserData) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "SELECT * FROM `player` WHERE UserID = ?";
    db.query(q, [UserData.id], (error, Playerinfo) => {
      if (error) return res.status(500).json(error);
      res.json(Playerinfo);
    });
  });
};
