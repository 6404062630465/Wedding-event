import { useState } from "react";
import "./navbar-user.css";
import { BsHeartPulseFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { PiArticleBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import axios from "axios";

const NavbarUser = () => {
  //toggle show navbar
  const [active, setActive] = useState("navBar");
  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  //remove navbar
  const removeNav = () => {
    setActive("navBar");
  };

  const customerLogout = () => {

    axios.get("http://localhost:5000/customerlogout", {
      withCredentials: true, 
    })
    .then((response) => {
      if (response.data.status == 'ok') {
        alert('Logout successful');
        window.location = "/";
      } else {
        alert('Logout failed')
      }
    })
  }


  //add background color to header
  const [transparent, setTransparent] = useState("header");
  const addBg = () => {
    if (window.scrollY >= 10) {
      setTransparent("header activeHeader");
    } else {
      setTransparent("header");
    }
  };

  window.addEventListener("scroll", addBg);

  return (
    <section className="navBarSection">
      {/* header */}
      <div className={transparent}>
        <div className="logoDiv">
          <a href="#" className="logo">
            <h1>
              <BsHeartPulseFill className="icon" />
              Wedding Event
            </h1>
          </a>
        </div>

        {/* navBar */}
        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <Link to="/Home">
                <a className="navLink">หน้าหลัก</a>
              </Link>
            </li>
            <li className="navItem">
              <Link to="/venue">
                <a className="navLink">สถานที่จัดงาน</a>
              </Link>
            </li>
            <li className="navItem">
              <Link to="/status">
                <a className="navLink">ตรวจสอบสถานะ</a>
              </Link>
            </li>

            <li className="navItem">
              <Link to="/profile">
                <a className="navLink">โปรไฟล์</a>
              </Link>
            </li>
            <li className="navItem">
              <Link to="#" onClick={customerLogout}>
                <a className="navLink">ออกจากระบบ</a>
              </Link>
            </li>
          </ul>

          <div onClick={removeNav} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>

        <div onClick={showNav} className="toggleNavbar">
          <PiArticleBold className="icon" />
        </div>
      </div>
    </section>
  );
};

export default NavbarUser;
