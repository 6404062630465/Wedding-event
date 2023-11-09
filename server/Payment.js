const express = require('express');
const db = require("./database.js");
const bodyParser = require('body-parser');
const Payment = express();
const jsonParser = bodyParser.json();

Payment.get("/Payment", (req, res) => {
    const BookingID = req.body.getBookingID;
        console.log("ค่าที่ส่งมา:", BookingID);
    db.query("SELECT booking.VenueID, venue.VenuePrice, booking.NumofGuest, photographer.NumberofPH,photographer.PhotographerPrice FROM booking INNER JOIN venue ON booking.VenueID = venue.VenueID INNER JOIN photographer ON booking.PhotographerID = photographer.PhotographerID WHERE BookingID = ?", [req.body.BookingID], (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result); // แสดงผลลัพธ์ใน console
            res.send(result);
        }
    });
});

Payment.get("/PaymentMethod", (req, res) => {
    db.query("SELECT * FROM paymentmethod",
    (err, result) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result); // แสดงผลลัพธ์ใน console
            res.send(result);
            }
        });
})
module.exports = Payment;
