import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const EditProflie = () => {
  const [CustomerID, setCustomerID] = useState("");
  const [Username, setUsername] = useState("");
  const [PhoneNO, setPhoneNO] = useState("");
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `http://localhost:5000/editUser/${CustomerID}`,
        {
            CustomerID: CustomerID,
          Username: Username,
          Email: Email,
          PhoneNO: PhoneNO,
        }
      );

      console.log(response.data); // รับข้อมูลที่ส่งกลับจากฐานข้อมูล
    } catch (error) {
      console.error("Error updating the user: ", error);
    }
  };

  return (
    <div className="container">
      <h1>Edit Profile</h1>
      <hr />
      <div className="row">
        {/* <div className="col-md-3">
          <div className="text-center">
            <img src="//placehold.it/150" className="avatar img-circle" />
            <br />
            <br />
            <input type="file" className="form-control" />
          </div>
        </div> */}
        <div className="col-md-9 personal-info">
          <h3>Personal info</h3>
          <form className="form-horizontal" role="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="col-md-3 control-label">Customer ID:</label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="text"
                  value={CustomerID}
                  onChange={(e) => setCustomerID(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Username :</label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="text"
                  value={Username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Email :</label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="text"
                  value={Email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">PhoneNO :</label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="text"
                  value={PhoneNO}
                  onChange={(e) => setPhoneNO(e.target.value)}
                />
              </div>
            </div>
            {/* <div className="form-group">
              <label className="col-md-3 control-label">Password:</label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="password"
                  value={Password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <div className="form-group">
              <label className="col-md-3 control-label">Confirm password:</label>
              <div className="col-md-8">
                <input
                  className="form-control"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setconfirmPassword(e.target.value)}
                />
              </div>
            </div> */}
            <div className="form-group">
              <label className="col-md-3 control-label"></label>
              <div className="col-md-8">
                <input
                  type="submit" // เปลี่ยนจาก type="button" เป็น type="submit"
                  className="btn btn-primary"
                  value="Save Changes"
                />
                <span></span>
                <input
                  type="reset"
                  className="btn btn-default"
                  value="Cancel"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProflie;
