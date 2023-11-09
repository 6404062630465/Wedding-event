import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';
import NavbarUser from '../Navbar-user/NavbarUser';
import { Link } from 'react-router-dom';

const Profile = () => {
    const getEmail = localStorage.getItem("Email");
    const [Username, setUsername] = useState('');
    const [PhoneNO, setPhoneNO] = useState('');
    const [Email, setEmail] = useState(getEmail);
    // const [CustomerID, setCustomerID] = useState(''); // Assuming 1 is the default ID

    useEffect(() => {
        axios.get(`http://localhost:5000/UserProfile/${Email}`)
            .then(response => {
                setUsername(response.data[0].Username); // ตรงนี้เลือกข้อมูลที่จะแสดง
                    setPhoneNO(response.data[0].PhoneNo); // ตรงนี้เลือกข้อมูลที่จะแสดง
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, [Email]);

    return (
        <>
            <NavbarUser />
            <br />
            <br />
            <br />
            <br />
            <div className="container profile">
                <form>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                            <div className="profile-head">
                                <h2>{Username}</h2>
                                <hr></hr>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3"></div>
                        <div className="col-md-4">
                            <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Username</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{Username}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Phone</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{PhoneNO}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Email</label>
                                    </div>
                                    <div className="col-md-6">
                                        <p>{Email}</p>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <Link to="/editprofile">
                                            <input type="submit" className="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
};

export default Profile;
