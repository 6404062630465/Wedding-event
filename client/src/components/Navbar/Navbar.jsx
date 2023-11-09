import {useState} from 'react'
import './navbar.css'
import { BsHeartPulseFill } from "react-icons/bs";
import {AiFillCloseCircle} from "react-icons/ai"
import {PiArticleBold} from "react-icons/pi"
import { Link } from 'react-router-dom';

const Navbar = () => {
    //toggle show navbar
    const[active, setActive] = useState('navBar')
    const showNav = () =>{
        setActive('navBar activeNavbar')
    }

    //remove navbar
    const removeNav = () =>{
        setActive('navBar')
    }

    //add background color to header
    const [transparent,setTransparent] = useState('header')
    const addBg = () =>{
        if(window.scrollY >= 10){
            setTransparent('header activeHeader')
        }
        else{
            setTransparent('header')
        }
    }

    window.addEventListener('scroll',addBg)

    return(     
        <section className='navBarSection'>
            {/* header */}
            <div className={transparent}>
                <div className='logoDiv'>
                    <a href='#' className='logo'>
                        <h1><BsHeartPulseFill className='icon'/>Wedding Event</h1>
                    </a> 
                </div>

                {/* navBar */}
                <div className={active}>
                    <ul className="navLists flex">
                        <li className="navItem">
                            <a href="#" className="navLink">หน้าหลัก</a>
                        </li>

                        <div className="headerBtns flex">
                            <button className='btn loginBtn'>
                                {/* <a href='/login'>เข้าสู่ระบบ / สมัครสมาชิก</a> */}
                                <Link to='/login'>เข้าสู่ระบบ / สมัครสมาชิก</Link>
                            </button>
     
                        </div>       
                        <div className="headerBtns flex" style={{padding:5}}>
                            <button className='btn loginBtn'>
                                <Link to='/login-admin'>เข้าสู่ระบบพนักงาน</Link>
                            </button>
     
                        </div>          
                    </ul>

                    <div onClick={removeNav} className="closeNavbar">
                        <AiFillCloseCircle className='icon'/>
                    </div>
                </div>

                <div onClick={showNav} className="toggleNavbar">
                    <PiArticleBold className='icon'/>
                </div>
            </div>
        </section>    
    )
}

export default Navbar