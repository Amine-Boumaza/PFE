import { db } from "../Connect.js";
import bcrypt from "bcrypt";
import jwk from "jsonwebtoken";

export const register = (req, res) => {
  const q = "SELECT * FROM `user` WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(401).json("User Already exists");

    const salt = bcrypt.genSaltSync(10);
    const HashedPass = bcrypt.hashSync(req.body.PasswordHash, salt);
    const q = "INSERT INTO `user`(`role`, `email`, `PasswordHash`) VALUES (?)";

    const values = [req.body.role, req.body.email, HashedPass];
    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      res.status(200).json("User has been Created !");
    });
  });
};
export const login = (req, res) => {
  const q = "SELECT * FROM `user` WHERE email = ?";
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.status(404).json(err);
    if (data.length === 0) return res.status(404).json("User Not Found");

    const CheckPassword = bcrypt.compareSync(
      req.body.PasswordHash,
      data[0].PasswordHash
    );

    if (!CheckPassword) return res.status(400).json("Wrong Password or Email");

    const token = jwk.sign({ id: data[0].UserID }, "SecretKey");

    const { PasswordHash, ...other } = data[0];

    res
      .cookie("AccessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .json(other);
  });
};
export const logout = (req, res) => {
  res
    .clearCookie("AccessToken", {
      secure: true,
      sameSite: "none",
    })
    .status(200)
    .json("User has been loged out");
};
