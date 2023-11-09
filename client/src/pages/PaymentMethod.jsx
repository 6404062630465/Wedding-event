import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PaymentMethod.css'; // Import your CSS file for styling
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
function PaymentMethod() {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [bookingSUM, setBookingSUM] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBookingID = localStorage.getItem("BookingID");
    axios.get(`http://localhost:5000/getbookingdetail?getBookingID=${getBookingID}`)
      .then(response => {
        setBookingDetails(response.data);
      })
      .catch(error => {
        setError(error);
      });
      axios.get(`http://localhost:5000/getbookingSUM?getBookingID=${getBookingID}`)
      .then(response => {
        setBookingSUM(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (

    <div className="payment-container">
      <h1>Booking Details</h1>
      {error && <p>Error: {error.message}</p>}
      <div className="details-container">
        {bookingDetails.map((detail, index) => (
          <div key={index} className="booking-detail">
            <p><span className="detail-heading">Venue Name:</span> {detail.VenueName}</p>
            <p><span className="detail-heading">Event Date:</span> {detail.EventDate}</p>
            <p><span className="detail-heading">Event Start Time:</span> {detail.EventStartTime}</p>
            <p><span className="detail-heading">Number of Guests:</span> {detail.NumofGuest}</p>
            <p><span className="detail-heading">Number of Photographers:</span> {detail.NumberofPH}</p>
            <p><span className="detail-heading">Music Genre:</span> {detail.Genre}</p>
            {/* Show the price for each item */}
          </div>
        ))}
      </div>
      <div className="total-price">
        {bookingSUM.map((detail, index) => (
          <div key={index}>
            <p><span className="total-heading">Total Price:</span> {detail.GrandTotal}</p>
          </div>
        ))} <Link to="/thankyou"><Button>ชำระเงิน</Button></Link>
      </div>
    </div>

  );
}

export default PaymentMethod;