const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const db = require("./database");
// import EditProflie from '../client/src/components/EditProflie/EditProflie';
// import Home from './'

const login = require("./login.js");
const Venue = require("./Venue.js");
const editUser = require("./editUser.js");
const Payment = require("./Payment.js");
const AdminHome = require("./AdminHome.js");
const Review = require("./Review.js");
const ShowReview = require("./ShowReview.js");
const Filter = require("./Filter.js");
const UserProfile = require('./UserProfile');
const Booking = require("./Booking.js");
const bookingList = require("./BookingList.js")
const EditBooking = require("./EditBooking");
const adminlogin = require("./adminlogin.js")

// const { default: EditProflie } = require('../client/src/components/EditProflie/EditProflie');

const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST","DELETE"],
    credentials: true
}));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// app.get("/Venue", (req, res) => {
//     res.send()
// })

app.listen(5000, ()=>{
    console.log(`Server is running on port 5000`)
});

//test
// app.get("/api", (req, res) => {
//     res.json({"user": ["userone","usertwo"]});
// })

// app.get("/admin",(req, res)=>{
//     db.query("SELECT * FROM admin", (err, result)=> {
//         if(err){
//             console.log(err)
//         }else{
//             res.send(result)
//         }
//     })
// })
app.use("/", Booking);
app.use("/", login);
app.use("/", Venue);
app.use("/", editUser);
app.use("/", Payment);
app.use("/", AdminHome);
app.use("/", Review);
app.use("/", ShowReview);
app.use("/", bookingList)
app.use("/", Filter);
app.use("/", UserProfile);
app.use("/", EditBooking)
app.use("/", adminlogin)

app.get("/customer/:id", (req, res) => {
    const { id } = req.params;
    db.query("SELECT * FROM customer WHERE CustomerID = ?", [id], (err, results) => {
      if (err) {
        console.error("Error fetching user: ", err);
        res.status(500).json({ error: "Internal server error." });
        return;
      }
      if (results.length === 0) {
        res.status(404).json({ error: "User not found." });
        return;
      }
      res.status(200).json(results[0]);
    });
  });
// app.get('/', editUser ,(req, res) => {
//     res.send(EditProflie.EditProflie());
// })