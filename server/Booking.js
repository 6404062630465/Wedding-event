const express = require('express');
const db = require("./database.js");
const bodyParser = require('body-parser');
const Booking = express();
const jsonParser = bodyParser.json();

Booking.post('/createbooking', jsonParser, (req, res) => {
    const BrideName = req.body.BrideName;
    const GroomName = req.body.GroomName;
    const EventDate = req.body.EventDate;
    const EventStartTime = req.body.EventStartTime;
    const EventEndTime = req.body.EventEndTime;
    const NumofGuest = req.body.NumofGuest;
    const VenueID = req.body.VenueID;
    const MusicID = req.body.MusicID;
    const PhotographerID = req.body.PhotographerID;
    const Email = req.body.Email;

    db.query(
        'SELECT CustomerID FROM customer WHERE Email = ?',
        [Email], // Replace with the actual customer's email
        function (err, results, fields) {
            if (err) {
                console.log(err);
                console.log(Email);
                res.status(500).send('Error selecting CustomerID');
            } else if (results.length === 0) {
                res.status(404).send('Customer not found'); // Handle the case where the email doesn't match any customer
            } else {
                // Assuming you have a single customer with the provided email, results[0].CustomerID contains the CustomerID
                const CustomerID = results[0].CustomerID;

                // Now you can insert CustomerID into the booking table
                db.query(
                    'INSERT INTO booking (BrideName, GroomName, EventDate, EventStartTime, EventEndTime, NumofGuest, CustomerID, VenueID, MusicID, PhotographerID) VALUES (?,?,?,?,?,?,?,?,?,?)',
                    [BrideName, GroomName, EventDate, EventStartTime, EventEndTime, NumofGuest, CustomerID, VenueID, MusicID, PhotographerID],
                    function (err, results, fields) {
                        if (err) {
                            console.log(err);
                            res.status(500).send('Error inserting booking');
                        } else {
                            // Inserted successfully
                            const BookingID = results.insertId
                            res.json({BookingID: BookingID});
                        }
                    }
                );
            }
        }
    );
})

Booking.post("/getCustomerID", jsonParser, (req, res) => {
    const Email = req.body.Email;
    db.query('SELECT CustomerID FROM customer WHERE Email = ?',
    [Email],
    function (err, results, fields) {
        if (err) {
            console.log(err);
        }
        else {
            res.send(results);
        }
    })
})

Booking.post('/updatebooking', jsonParser, (req, res) => {
    const BrideName = req.body.BrideName;
    const GroomName = req.body.GroomName;
    const BookingDateandTime = req.body.BookingDateandTime;
    const EventDate = req.body.EventDate;
    const EventStartTime = req.body.EventStartTime;
    const EventEndTime = req.body.EventEndTime;
    const NumofGuest = req.body.NumofGuest;
    const CustomerID = req.body.CustomerID;
    const VenueID = req.body.VenueID;
    const MusicID = req.body.MusicID;
    const PhotographerID = req.body.PhotographerID;
    const BookingID = req.body.BookingID

    db.query('UPDATE booking SET BrideName = ?, GroomName = ?, BookingDateandTime = ?, EventDate = ?, EventStartTime = ?, EventEndTime = ?, NumofGuest = ?, VenueID = ?, MusicID = ?, PhotographerID = ? WHERE BookingID = ?',
        [BrideName, GroomName, BookingDateandTime, EventDate, EventStartTime, EventEndTime, NumofGuest, CustomerID, VenueID, MusicID, PhotographerID, BookingID],
        function (err, results, fields) {
            if (err) {
                console.log(err);
            }
            else {
                res.send(result);
            }
        })
})

module.exports = Booking;