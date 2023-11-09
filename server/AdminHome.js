const express = require('express');
const db = require("./database.js");
const bodyParser = require('body-parser');
const AdminHome = express();
const jsonParser = bodyParser.json();
const cors = require("cors");


AdminHome.get("/Bookingdata", (req, res) => {
    db.query("SELECT booking.BookingID, booking.BrideName, booking.GroomName,venue.VenueName ,booking.BookingDateandTime, booking.EventDate, booking.EventStartTime, booking.EventEndTime, booking.NumofGuest, photographer.NumberofPH, music.Genre, status.Title FROM booking INNER JOIN venue ON booking.VenueID= venue.VenueID INNER JOIN photographer ON booking.PhotographerID = photographer.PhotographerID INNER JOIN music ON booking.MusicID = music.MusicID INNER JOIN status ON booking.StatusID = status.StatusID  ORDER BY booking.BookingID ASC", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result); // แสดงผลลัพธ์ใน console
            res.send(result);
        }
    });
});


AdminHome.get("/getstatus", (req, res) => {
    db.query("SELECT * FROM status", (err, result) => {

        if (err) {
            console.log(err);
        } else {
            //console.log(result); // แสดงผลลัพธ์ใน console
            res.send(result);
        }
    });
})

AdminHome.post("/updatestatus", (req, res) => {
    db.query("SELECT * FROM status", (err, result) => {

        if (err) {
            console.log(err);
        } else {
            //console.log(result); // แสดงผลลัพธ์ใน console
            res.send(result);
        }
    });
})


// AdminHome.post("/Bookingdata/:BookingID", (req, res) => {
//     const BookingID = req.params.BookingID;
//     db.query("DELETE FROM booking WHERE BookingID = ?;",[req.body.BookingID], (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result); // แสดงผลลัพธ์ใน console
//             res.send(result);
//         }
//     });
// });

AdminHome.get("/Venuedata", (req, res) => {
    db.query("SELECT * FROM venue", (err, result) => {
        if (err) {
            // console.log(err);
        } else {
             // แสดงผลลัพธ์ใน console
            res.send(result);
        }
    });
});

AdminHome.get("/Userdata", (req, res) => {
    db.query("SELECT * FROM customer", (err, result) => {
        if (err) {
            // console.log(err);
        } else {
             // แสดงผลลัพธ์ใน console
            res.send(result);
        }
    });
});

AdminHome.get("/Musicdata", (req, res) => {
    db.query("SELECT * FROM music", (err, result) => {
        if (err) {
            // console.log(err);
        } else {
            // แสดงผลลัพธ์ใน console
            res.send(result);
        }
    });
});

AdminHome.get("/photographerdata", (req, res) => {
    db.query("SELECT * FROM photographer", (err, result) => {
        if (err) {
            // console.log(err);
        } else {
            // แสดงผลลัพธ์ใน console
            res.send(result);
        }
    });
});

AdminHome.get("/Review", (req, res) => {
    db.query("SELECT * FROM review", (err, result) => {
        if (err) {
            // console.log(err);
        } else {
           // แสดงผลลัพธ์ใน console
            res.send(result);
        }
    });
});

AdminHome.delete("/DeleteReview/:ReviewNo", (req, res) => {
    db.query("DELETE FROM review WHERE ReviewNo = ?;", [req.params.ReviewNo], (err, result) => {
        if (err) {
            console.log(err);
        } else {
           // แสดงผลลัพธ์ใน console
            res.send(result);
        }
    });
});

AdminHome.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    next();
});

// AdminHome.get("/AdminUser", (req, res) => {
//     db.query("SELECT * FROM admin", (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result); // แสดงผลลัพธ์ใน console
//             res.send(result);
//         }
//     });
// });

// AdminHome.post("/DeleteAdmin/:AdminID", (req, res) => {
//     const AdminID = req.params.AdminID;
//     db.query("DELETE FROM admin WHERE AdminID = ?;",[req.body.AdminID], (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result); // แสดงผลลัพธ์ใน console
//             res.send(result);
//         }
//     });
// });

// AdminHome.get("/Search/:BookingID", async (req, res) => {
//     db.query("SELECT BookingID, BrideName, GroomName, BookingDateandTime, EventDate, EventStartTime, EventEndTime, NumofGuest FROM booking WHERE BookingID = ?",[req.body.BookingID], (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result); // แสดงผลลัพธ์ใน console
//             res.send(result);
//         }
//     });
// });

module.exports = AdminHome;
