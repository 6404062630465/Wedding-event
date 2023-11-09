const express = require('express');
const db = require("./database.js");
const bodyParser = require('body-parser');
const editUser = express();
const jsonParser = bodyParser.json();

editUser.post("/editUser/:customerID", jsonParser, (req, res) => {
    const CustomerID = req.params.CustomerID; // ID ของผู้ใช้ที่จะแก้ไข
    // const { username, email, phoneNO, password } = req.body; // ข้อมูลที่ต้องการแก้ไข
    // const hash = bcrypt.hashSync(Password, 10);

    // ทำการอัปเดตข้อมูลในฐานข้อมูลด้วย db.query
    db.query("UPDATE customer SET Username = ?,Email = ?, PhoneNO = ? WHERE CustomerID = ?;", [req.body.Username,req.body.Email, req.body.PhoneNO, req.body.CustomerID], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("เกิดข้อผิดพลาดในการแก้ไขข้อมูลผู้ใช้");
        } else {
            res.send("แก้ไขข้อมูลผู้ใช้เรียบร้อยแล้ว");
        }
    });
});

// editUser.get('/', editUser ,(req, res) => {
//     res.send(EditProflie.EditProflie());
// })

editUser.post("/getUser", (req, res) => {
    db.query("SELECT * FROM customer", (err, result) => {
        if (err) {
            console.log(err);
        } else {
             // แสดงผลลัพธ์ใน console
            res.send(result);
        }
    });
});

module.exports = editUser;
