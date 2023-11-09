const express = require('express');
const db = require("./database.js");
const bodyParser = require('body-parser');
const bookingList = express();
const jsonParser = bodyParser.json();

bookingList.post('/getbookingList', (req, res) => {
    const Email = req.body.Email;
    db.query('SELECT CustomerID FROM customer WHERE Email = ?',
        [Email],
        (err, customerResults, customerFields) => {
            if (err) {
                console.log(err);
                return res.status(500).send('Error fetching customer data.');
            }
            if (customerResults.length === 0) {
                return res.status(404).send('Customer not found.');
            }
            const CustomerID = customerResults[0].CustomerID;
            db.query(
                'SELECT BookingID, BrideName, EventDate, venue.VenueName, status.Title FROM booking INNER JOIN venue ON booking.VenueID = venue.VenueID INNER JOIN status ON booking.StatusID = status.StatusID WHERE booking.CustomerID = ? ORDER BY booking.BookingID ASC',
                [CustomerID],
                (err, results, fields) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send('Error fetching booking data.');
                    }
                    res.send(results);
                }
            );
        });
});


bookingList.post('/cancelbooking', jsonParser, (req, res) => {
    const CustomerID = req.body.CustomerID;
    const BookingID = req.body.BookingID;
    db.query(
        'UPDATE booking SET StatusID = 4 WHERE CustomerID = ? AND BookingID = ?',
        [CustomerID, BookingID],
        function (err, results, fields) {

            if (err) {
                console.log(err);
                res.status(500).send('Error canceling booking');
            } else {

                res.send(results);
            }
        }
    );
})


module.exports = bookingList;