const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database.js");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const login = express();
const jsonParser = bodyParser.json();
login.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true
}));

login.use(cookieParser());
login.use(bodyParser.urlencoded({ extended: true }));

login.use(session(
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


login.post("/customerregister", jsonParser, (req, res, next) => {
    const username = req.body.Username;
    const email = req.body.Email;
    const password = req.body.Password;
    const phoneNo = req.body.PhoneNo;

    bcrypt.hash(password, saltRounds, function (err, hash) {
        db.execute(
            "INSERT INTO customer (Username, Email, Password, PhoneNo) VALUE (?,?,?,?)",
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

login.post("/customerlogin", jsonParser, function (req, res, next) {
    const email = req.body.Email;
    const password = req.body.Password;

    db.execute(
        "SELECT * FROM customer WHERE Email = ?",
        [email],
        function (err, customer, fields) {
            if (err) {
                res.json({ status: "error", message: "failed" });
                return;
            }
            if (customer.length == 0) {
                res.json({ status: "error", message: "no user found" });
                return;
            }
            bcrypt.compare(password, customer[0].Password, function (err, isLogin) {
                if (isLogin) {
                    const customerID = customer[0].CustomerID
                    req.session.userID = customerID;
                    // console.log(req.session.userID);
                    req.session.isAuth = true;
                    res.json({ status: "ok", customerID});
                } else {
                    res.json({ status: "error", message: "login failed" });
                }
            });
        }
    );
});

login.get("/customerlogout", (req, res) => {
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


//middleware
const isAuth = (req, res, next) => {
    if (req.session.isAuth) {
        next();
    } else {
        res.status(401).json({ status: 'error' })
    }

}
login.get("/authen", isAuth, (req, res) => {
    res.json({ status: "ok" })
})

//Admin
// login.post("/adminregister", jsonParser, (req, res, next) => {
//     const username = req.body.username;
//     const email = req.body.email;
//     const password = req.body.password;
//     const phoneNo = req.body.phoneno;

//     bcrypt.hash(password, saltRounds, function (err, hash) {
//         db.execute(
//             "INSERT INTO admin (AdminName, AdminEmail, AdminPassword, AdminPhoneNo) VALUE (?,?,?,?)",
//             [username, email, hash, phoneNo],
//             function (err, results, fields) {
//                 if (err) {
//                     res.json({ status: "error", message: err });
//                     return;
//                 }
//                 res.json({ status: "ok" });
//             }
//         );
//     });
// });

// login.post("/adminlogin", jsonParser, function (req, res, next) {
//     const email = req.body.email;
//     const password = req.body.password;

//     db.execute(
//         "SELECT * FROM admin WHERE AdminEmail = ?",
//         [email],
//         function (err, admin, fields) {
//             if (err) {
//                 res.json({ status: "error", message: "failed" });
//                 return;
//             }
//             if (admin.length == 0) {
//                 res.json({ status: "error", message: "no user found" });
//                 return;
//             }
//             bcrypt.compare(password, admin[0].AdminPassword, function (err, isLogin) {
//                 if (isLogin) {
//                     req.session.userID = admin;
//                     console.log(req.session.userID);
//                     req.session.isAuth = true;
//                     res.json({ status: "ok" });
//                 } else {
//                     res.json({ status: "error", message: "login failed" });
//                     console.log('Stored Hashed Password:', admin[0].AdminPassword);
//                     console.log('bcrypt.compare Result:', isLogin);

//                 }
//             });
//         }
//     );
// });

// login.get("/adminlogout", (req, res) => {
//     if (req.session.userID) {
//         req.session.destroy
//             ((err) => {
//                 if (err) {
//                     console.error("Error destroying session:", err);
//                     res.json({ status: "error", message: "Logout failed" });
//                 } else {
//                     res.clearCookie("userID");
//                     res.json({ status: "ok", message: "Logout success" });
//                 }
//             });

//     } else {
//         res.json({ status: "error", message: "User is not logged in" });
//     }
// });


module.exports = login;
