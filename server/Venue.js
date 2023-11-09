const express = require("express");
const db = require("./database.js");
const Venue = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jsonParser = bodyParser.json();
Venue.use(cors());

// Venue.post("/Filter", jsonParser, (req, res) => {
//   const Price = req.query.Price;
//   const Capacity = req.query.Capacity;
//   console.log("ราคาที่ส่งมา:", Price);
//   console.log("จำนวนคนที่ส่งมา:", Capacity);
//   function searchAndFilterData(Price, Capacity, data) {
//     const filteredData = data.filter((item) => {
//       // กรองตามราคา
//       const filterByPrice = !Price || item.VenuePrice === Price;

//       // กรองตามจำนวนคน
//       const filterByCapacity = !Capacity || item.MaxCapacity === Capacity;

//       return filterByPrice && filterByCapacity;
//     });
//     return filteredData;
//   }
// });

  Venue.get("/Venue", jsonParser, (req, res) => {
  db.query("SELECT * FROM venue", (err, result) => {
    if (err) {
      // console.log(err);
  } else {
      console.log(result); // แสดงผลลัพธ์ใน console
      res.send(result);
  }
});
});

module.exports = Venue;
