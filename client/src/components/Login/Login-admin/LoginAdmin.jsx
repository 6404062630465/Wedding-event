import { useState, useEffect } from 'react';
import './loginAdmin.css';
import userIcon from '../../../assets/person.png';
import emailIcon from '../../../assets/email.png';
import passwordIcon from '../../../assets/password.png';
import { BsFillTelephoneFill } from "react-icons/bs";
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [phoneno, setPhoneNo] = useState("");
    const [password, setPassword] = useState("");
    const [action, setAction] = useState("Login");

    axios.defaults.withCredentials = true;

    const AdminRegister = () => {
        axios.post("http://localhost:5000/adminregister", {
            username: username,
            email: email,
            password: password,
            phoneno: phoneno,
        }).then((response) => {
            if (response.data.status == 'ok') {
                alert('register successful');
                window.location = 'login-admin';
            }
            console.log(response);
        });
    }

    const AdminLogin = () => {

        axios.post("http://localhost:5000/adminlogin", {
            email: email,
            password: password,
        }).then((response) => {
            if (response.data.status == 'ok') {
                window.location = '/Admin';
                alert('Login successful');
                // setLoginStatus(response.data.message);
            } else {
                alert('Login failed')
                // setLoginStatus(response.data[0].username);
            }
        })


    }


    return (
        <div className="Container">
            <div className="submitContainer">
                <div className={action === "Login Admin" ? "submit" : "submit white"} onClick={() => { setAction("Login Admin") }}>Log in</div>
                <div className={action === "Login Admin" ? "submit white" : "submit"} onClick={() => { setAction("Sign up Admin") }}>Sign up</div>
            </div>
            <div className="Header">
                <div className="text">{action}</div>
                <div className="underline"></div>
            </div>
            <div className="Inputs">
                {action === "Login Admin" ? <div></div> :
                    <div className="Input">
                        <img src={userIcon} alt="" />
                        <input className='input' type="text" placeholder='Username' pattern='^[a-z0-9_-+' onChange={(e) => { setUsername(e.target.value); }} />
                    </div>}

                <div className="Input">
                    <img src={emailIcon} alt="" />
                    <input className='input' type="email" placeholder='Email' onChange={(e) => { setEmail(e.target.value); }} />
                </div>

                <div className="Input">
                    <img src={passwordIcon} alt="" />
                    <input className='input' type="password" placeholder='Password' onChange={(e) => { setPassword(e.target.value); }} />
                </div>

                {action === "Login Admin" ? <div></div> :
                    <div className="Input">
                        <div className='phone'><BsFillTelephoneFill /></div>
                        <input className='input' type="text" placeholder='Phone' pattern='^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$' onChange={(e) => { setPhoneNo(e.target.value); }} />
                    </div>}
            </div>

            {action === "Login Admin" ? (
                <button className="BottomButton" onClick={AdminLogin}>Login</button>
            ) : (
                <button className="BottomButton" onClick={AdminRegister}>Sign up</button>
            )}

        </div>

    );
}

export default Login;
