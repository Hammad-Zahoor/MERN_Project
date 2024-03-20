import React from 'react'
import "../components/navbar.css"
import {
    Link
  } from "react-router-dom";

export default function navbar() {
    return (
        <>
            <div className='navbar-css'>
                <h3 className='logo'>TUTOR</h3>
                <div className='navbar-selectors'>
                    <Link className="navbar-pages" to="/">Home</Link>
                    <Link className="navbar-pages" to="/Profile">Profile</Link>
                    <Link className="navbar-pages" to="/Sign_in">Log-out</Link>
                </div>
            </div>
        </>
    )
}
