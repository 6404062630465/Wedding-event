const express = require("express");
const db = require("./database.js");
const Filter = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const jsonParser = bodyParser.json();
// Filter.use(cors());

Filter.post("/Filter/:VenuePrice/:MaxCapacity", jsonParser, (req, res) => {
  const VenuePrice = req.params.VenuePrice;
  const MaxCapacity = req.params.MaxCapacity;
  console.log("ราคาที่ส่งมา:", VenuePrice);
  console.log("จำนวนคนที่ส่งมา:", MaxCapacity);

  db.query(
    "SELECT * FROM venue WHERE VenuePrice = ? AND MaxCapacity = ?",
    [VenuePrice, MaxCapacity],
    (err, result) => {
      if (err) {
        res.status(500).send("Failed to filter data");
      } else {
        const filteredResults = searchAndFilterData(VenuePrice, MaxCapacity, result);
        
        res.json(filteredResults);
        // res.json({ status: "OK" });
      }
    }
  );
});

function searchAndFilterData(Price, Capacity, data) {
    const filteredData = data.filter((item) => {
      // กรองตามราคา
      const filterByPrice = item.VenuePrice === Price;

      // กรองตามจำนวนคน
      const filterByCapacity = item.MaxCapacity === Capacity;

      return filterByPrice && filterByCapacity;
    });
    return filteredData;
  }

  Filter.get("/Venue", jsonParser, (req, res) => {
    db.query("SELECT * FROM venue", (err, result) => {
      if (err) {
        console.log(err);
    } else {
        // console.log(result); // แสดงผลลัพธ์ใน console
        res.send(result);
    }
  });
  });

module.exports = Filter;
