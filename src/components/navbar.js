import React from 'react';
import "../components/navbar.css";
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar() {
    const navigate = useNavigate();

    const logOut = () => {
        localStorage.removeItem("auth_token");
        navigate("/Sign_in");
    }

    return (
        <>
            <div className='navbar-css'>
                <h3 className='logo'>TUTOR</h3>
                <div className='navbar-selectors'>
                    <Link className="navbar-pages" to="/">Home</Link>
                    <Link className="navbar-pages" to="/Profile">Profile</Link>
                    <button className="navbar-pages-button" onClick={logOut}>Log-out</button>
                </div>
            </div>
        </>
    );
}
