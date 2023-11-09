import { useState, useEffect } from 'react';
import './login.css';
import userIcon from '../../assets/person.png';
import emailIcon from '../../assets/email.png';
import passwordIcon from '../../assets/password.png';
import { BsFillTelephoneFill } from "react-icons/bs";
import axios from "axios";

const Login = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phoneno, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");
    const [getCustomerID, setCustomerID] = useState("");
    const [action, setAction] = useState("Login");

    axios.defaults.withCredentials = true;

    const customerRegister = () => {
        axios.post("http://localhost:5000/customerregister", {
            Username: username,
            Email: email,
            Password: password,
            PhoneNo: phoneno,
        }).then((response) => {
            if (response.data.status == 'ok') {
                alert('register successful');
                window.location = 'login';
            }
            console.log(response);
        });
    }

    const customerLogin = () => {
        axios.post("http://localhost:5000/customerlogin", {
            Email: email,
            Password: password,
        }).then((response) => {
            if (response.data.status == 'ok') {
                window.location = '/Home';
                alert('Login successful');

                const CustomerID = response.data.customerID;
                localStorage.setItem("CustomerID", CustomerID);
                console.log(CustomerID);
                localStorage.setItem('Email', email);
                // setLoginStatus(response.data.message);
            } else {
                alert('Login failed')
            }
        })
    }

    return (
        <div className="Container">
            <div className="submitContainer">
                <div className={action === "Login" ? "submit" : "submit white"} onClick={() => { setAction("Login") }}>Log in</div>
                <div className={action === "Login" ? "submit white" : "submit"} onClick={() => { setAction("Sign up") }}>Sign up</div>
            </div>
            <div className="Header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="Inputs">
                {action === "Login" ? <div></div> :
                    <div className="Input">
                        <img src={userIcon} alt="" />
                        <input className='input' id='Username' type="text" placeholder='Username' pattern='^[a-z0-9_-+' onChange={(e) => { setUsername(e.target.value); }} />
                    </div>}

                <div className="Input">
                    <img src={emailIcon} alt="" />
                    <input className='input' id='email' type="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value); }} />
                </div>

                <div className="Input">
                    <img src={passwordIcon} alt="" />
                    <input className='input' id='password' type="password" placeholder='Password' pattern='^(?=.[A-Z])(?=.\d)(?=.[\W_]).$' onChange={(e) => { setPassword(e.target.value); }} />
                </div>

                {action === "Login" ? <div></div> :
                    <div className="Input">
                        <div className='phone'><BsFillTelephoneFill /></div>
                        <input className='input' type="text" placeholder='Phone' pattern='^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$' onChange={(e) => { setPhoneNo(e.target.value); }} />
                    </div>}
            </div>

            {action === "Login" ? (
                <button className="BottomButton" onClick={customerLogin}>Login</button>
            ) : (
                <button className="BottomButton" onClick={customerRegister}>Sign up</button>
            )}
        </div>
    );
}

export default Login;
