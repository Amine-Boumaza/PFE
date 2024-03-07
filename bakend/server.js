import express from "express";
import mysql from "mysql";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        methods: ["POST", "GET"],
        credentials: true,
    })
);
app.use(cookieParser());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "noudjoum",
});

app.post("/register", (req, res) => {
    const sql = "INSERT INTO admin (name, mail, Password) VALUES ?";
    bcrypt.hash(req.body.password.toString(), 12, (err, hash) => {
        if (err) {
            console.error("Error hashing password:", err);
            return res
                .status(500)
                .json({ status: "error", message: "Error hashing password" });
        }
        const values = [[req.body.username, req.body.email, hash]];
        db.query(sql, [values], (err, response) => {
            if (err) {
                console.error("Error registering user:", err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Error registering user" });
            }
            console.log("User registered successfully:", response);
            return res.json({ status: "success" });
        });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;
    const sql = "SELECT * FROM admin WHERE mail = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            console.error("Error querying user:", err);
            return res.status(500).json({
                status: "error",
                message: "An error occurred while logging in. Please try again later.",
            });
        }
        if (results.length === 0) {
            return res
                .status(401)
                .json({ status: "error", message: "Login failed. Email not found." });
        }
        const user = results[0];
        bcrypt.compare(password, user.Password, (err, isMatch) => {
            if (err) {
                console.error("Error comparing passwords:", err);
                return res.status(500).json({
                    status: "error",
                    message:
                        "An error occurred while logging in. Please try again later.",
                });
            }
            console.log("Password comparison result:", isMatch);
            if (isMatch) {
                const name = results[0].name;
                const token = jwt.sign(
                    {
                        name,
                    },
                    "jwt-token",
                    { expiresIn: "1d" }
                );

                res.cookie('token', token);

                return res.json({ status: "success" });
            } else {
                return res.status(401).json({
                    status: "error",
                    message: "Login failed. Invalid password.",
                });
            }
        });
    });
});

app.listen(8081, () => {
    console.log("server is running on port 8081");
});
