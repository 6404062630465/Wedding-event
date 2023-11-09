const express = require('express');
const db = require("./database.js");
const bodyParser = require('body-parser');
const EditBooking = express();
const jsonParser = bodyParser.json();

EditBooking.get('/getbookingdetail', jsonParser , (req, res) => {
    // const BookingID = req.body.getBookingID;
    // console.log("ค่าที่ส่งมา:", BookingID);
    console.log("Request object:", req);
  const getBookingID = req.query.getBookingID;
  console.log("ค่าที่ส่งมา:", getBookingID);
    db.query('SELECT venue.VenueName, venue.VenuePrice,PhotographerPrice, booking.EventDate, booking.EventStartTime, booking.NumofGuest, photographer.NumberofPH, music.Genre FROM booking INNER JOIN venue ON booking.VenueID = venue.VenueID INNER JOIN status ON booking.StatusID = status.StatusID INNER JOIN photographer ON photographer.PhotographerID = booking.PhotographerID INNER JOIN music ON music.MusicID =booking.MusicID WHERE BookingID = ?',
        [getBookingID],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(results);
                console.log(results)
            }
        })
})

EditBooking.get('/getbookingSUM', jsonParser , (req, res) => {
    // const BookingID = req.body.getBookingID;
    // console.log("ค่าที่ส่งมา:", BookingID);
    console.log("Request object:", req);
  const getBookingID = req.query.getBookingID;
  console.log("ค่าที่ส่งมา:", getBookingID);
    db.query("SELECT SUM(venue.VenuePrice) + SUM(photographer.PhotographerPrice) + SUM(music.MusicPrice) AS GrandTotal FROM booking INNER JOIN venue ON booking.VenueID = venue.VenueID INNER JOIN photographer ON photographer.PhotographerID = booking.PhotographerID INNER JOIN music ON music.MusicID = booking.MusicID WHERE BookingID = ?",
        [getBookingID],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(results);
                console.log(results)
            }
        })
})

module.exports = EditBooking;
