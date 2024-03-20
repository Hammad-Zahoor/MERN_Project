import React , { useState } from 'react'
import "../screens/sign_in.css"
import {
  Link, useNavigate
} from "react-router-dom";

export default function Sign_in() {

  const navigate = useNavigate();
  const [details_in, setdetails_in] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/signin_user", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(details_in)
    });
    try {
      const json = await response.json();
      console.log(json);
      if (!json.success) {
        alert("Enter valid credentials");
      }
      else {
        localStorage.setItem("auth_token",json.authtoken);
        console.log(localStorage.getItem("auth_token"))
        navigate("/");
      }
    } catch (error) {
      console.error("Error parsing JSON:", error);
      alert("Error parsing JSON response");
    }
  };

  const onChange = (event) => {
    const { name, value } = event.target;
    setdetails_in({ ...details_in, [name]: value });
  };


  return (
    <>
    <form onSubmit={handleSubmit}>
      <div className='signin-page'>
        <h2>TUTOR</h2>
        <div className='signin-box'>
          <input type='text' placeholder='Enter Username' name='email' value={details_in.email} onChange={onChange}></input>
          <input type='password' placeholder='Enter Password' name='password' value={details_in.password} onChange={onChange}></input>
        </div>
        <button className='signin-button'>Submit</button>
        <div className='signin-account'>
          <h4>If you do not have account?</h4>
          <Link className='sign-up' to="/Sign_up">Sign-up</Link>
        </div>
      </div>
      </form>
    </>
  )
}
