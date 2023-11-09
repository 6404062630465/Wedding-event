const express = require('express');
const db = require("./database.js");
const bodyParser = require('body-parser');
const ShowReview = express();
const jsonParser = bodyParser.json();

ShowReview.get("/ShowReview", (req, res) => {
    db.query("SELECT * FROM review", [req.body.BookingID] ,(err, result) => {
        if (err) {
            // console.log(err);
        } else {
            // แสดงผลลัพธ์ใน console
            res.send(result);
        }
    });
});

module.exports = ShowReview;
