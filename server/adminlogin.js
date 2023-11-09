const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const adminlogin = express();
const jsonParser = bodyParser.json();
adminlogin.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));

adminlogin.use(cookieParser());
adminlogin.use(bodyParser.urlencoded({ extended: true }));

adminlogin.use(session(
    {
        key: "userID",
        secret: "wedding-event",
        resave: false,
        saveUninitialized: false,
        cookie: {
            expires: 3600 * 1000 * 24,
        }
    }
))

//middleware
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.status(401).json({ status: 'error' })
    }

}
adminlogin.get("/authen", isAuth, (req, res) => {
    res.json({ status: "ok" })
})

//Admin
adminlogin.post("/adminregister", jsonParser, (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const phoneNo = req.body.phoneno;

    bcrypt.hash(password, saltRounds, function (err, hash) {
        db.execute(
            "INSERT INTO admin (AdminName, AdminEmail, AdminPassword, AdminPhoneNo) VALUE (?,?,?,?)",
            [username, email, hash, phoneNo],
            function (err, results, fields) {
                if (err) {
                    res.json({ status: "error", message: err });
                    return;
                }
                res.json({ status: "ok" });
            }
        );
    });
});

adminlogin.post("/adminlogin", jsonParser, function (req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    db.execute(
        "SELECT * FROM admin WHERE AdminEmail = ?",
        [email],
        function (err, admin, fields) {
            if (err) {
                res.json({ status: "error", message: "failed" });
                return;
            }
            if (admin.length == 0) {
                res.json({ status: "error", message: "no user found" });
                return;
            }
            bcrypt.compare(password, admin[0].AdminPassword, function (err, isLogin) {
                if (isLogin) {
                    req.session.userID = admin;
                    console.log(req.session.userID);
                    req.session.isAuth = true;
                    res.json({ status: "ok" });
                } else {
                    res.json({ status: "error", message: "login failed" });
                    // console.log('Stored Hashed Password:', admin[0].AdminPassword);
                    // console.log('bcrypt.compare Result:', isLogin);

                }
            });
        }
    );
});

adminlogin.get("/adminlogout", (req, res) => {
    if (req.session.userID) {
        req.session.destroy
            ((err) => {
                if (err) {
                    console.error("Error destroying session:", err);
                    res.json({ status: "error", message: "Logout failed" });
                } else {
                    res.clearCookie("userID");
                    res.json({ status: "ok", message: "Logout success" });
                }
            });

    } else {
        res.json({ status: "error", message: "User is not logged in" });
    }
});


module.exports = adminlogin;
