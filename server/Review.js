const express = require('express');
const db = require("./database.js");
const bodyParser = require('body-parser');
const Review = express();
const jsonParser = bodyParser.json();

// Review.post("/Review", (req, res) => {
//     db.query("INSERT INTO `review` (ReviewNo, ReviewDateandTime, BookingID, Score, Description) VALUES (?, ?, ?, ?, ?)",[req.body.ReviewNo, req.body.ReviewDateandTime, req.body.BookingID, req.body.Score, req.body.Description], (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result); // แสดงผลลัพธ์ใน console
//             res.send(result);
//         }
//     });
// });

// Review.post("/Review/:Email", (req, res) => {
//     // console.log("ราคาที่ส่งมา:", CustomerID);
//     db.query("INSERT INTO review (Score, Description,BookingID) VALUES (?, ?, ?);",[req.body.Score, req.body.Description,req.body.BookingID], (err, result) => {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log(result); // แสดงผลลัพธ์ใน console
//             res.send(result);
//         }
//     });
// });

Review.post("/Review", (req, res) => {
    const BookingID = req.body.BookingID;
        console.log("ค่าที่ส่งมา:", BookingID);
    db.query("INSERT INTO review (Score, Description,BookingID) VALUES (?, ?, ?);",[req.body.Score, req.body.Description,req.body.BookingID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            // แสดงผลลัพธ์ใน console
            res.send(result);
        }
    });
});

module.exports = Review;
