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
    database: "association_v1",
});

app.post("/register", (req, res) => {
    const sql = "INSERT INTO user ( TenantID, Email, PasswordHash) VALUES ?";
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
    const sql = "SELECT * FROM user WHERE Email = ?";
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
        bcrypt.compare(password, user.PasswordHash, (err, isMatch) => {
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
                const Email = results[0].Email;
                const token = jwt.sign(
                    {
                        Email,
                    },
                    "jwt-token",
                    { expiresIn: "1d" }
                );

                res.cookie("token", token);

                return res.status(200).json({ status: "success" });
            } else {
                return res.status(401).json({
                    status: "error",
                    message: "Login failed. Invalid password.",
                });
            }
        });
    });
});

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Error: "you are not authenticated" });
    } else {
        jwt.verify(token, "jwt-token", (err, decoded) => {
            if (err) {
                return res.json({ Error: "token not correct" });
            } else {
                req.Email = decoded.Email;
                next();
            }
        });
    }
};

app.get("/management", (req, res) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(400).json({ Error: "you are not authenticated" });
    }
    jwt.verify(token, "jwt-token", (err, decoded) => {
        if (err) {
            return res.json({ Error: "token not correct" });
        } else {
            const email = decoded.Email;

            // Define all SQL queries
            const sqlAdminCount = `SELECT COUNT(*) AS adminCount FROM user`;
            const sqlPlayerCount = `SELECT COUNT(*) AS playerCount FROM player`;
            const sqlMonthlyRevenue = `SELECT SUM(Amount) AS monthlyRevenue FROM financialtransaction WHERE MONTH(date) = MONTH(NOW())`;
            const next7DaysSessionsSql = `
                SELECT * FROM trainingsession
                WHERE date BETWEEN CURDATE() AND DATE_ADD(CURDATE(), INTERVAL 7 DAY)
            `;
            const usersSql = `SELECT * FROM user`;

            // Execute all SQL queries in parallel
            db.query(sqlAdminCount, (err, adminCountResult) => {
                if (err) {
                    console.error("Error fetching admin count:", err);
                    return res.status(500).json({ status: "error", message: "Error fetching admin count" });
                }
                const adminCount = adminCountResult[0].adminCount;

                db.query(sqlPlayerCount, (err, playerCountResult) => {
                    if (err) {
                        console.error("Error fetching player count:", err);
                        return res.status(500).json({ status: "error", message: "Error fetching player count" });
                    }
                    const playerCount = playerCountResult[0].playerCount;

                    db.query(sqlMonthlyRevenue, (err, monthlyRevenueResult) => {
                        if (err) {
                            console.error("Error fetching monthly revenue:", err);
                            return res.status(500).json({ status: "error", message: "Error fetching monthly revenue" });
                        }
                        const monthlyRevenue = monthlyRevenueResult[0].monthlyRevenue;

                        db.query(next7DaysSessionsSql, (err, sessionsResult) => {
                            if (err) {
                                console.error("Error fetching session data:", err);
                                return res.status(500).json({ status: "error", message: "Error fetching session data" });
                            }
                            const sessions = sessionsResult;

                            db.query(usersSql, (err, usersResult) => {
                                if (err) {
                                    console.error("Error fetching users data:", err);
                                    return res.status(500).json({ status: "error", message: "Error fetching users data" });
                                }
                                const users = usersResult;

                                return res.json({ adminCount, playerCount, monthlyRevenue, sessions, users });
                            });
                        });
                    });
                });
            });
        }
    });
});





// app.get("/management", verifyUser, (req, res) => {
//     return res.json({ stats: "success", Email: req.Email });
// });

app.listen(8081, () => {
    console.log("server is running on port 8081");
});
