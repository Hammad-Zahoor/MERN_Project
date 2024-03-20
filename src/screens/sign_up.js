import React, { useState } from 'react';
import "../screens/sign_up.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


export default function Sign_up() {
    const [details, setDetails] = useState({ name: "", email: "", password: "", education: "", major: "", role: "student" });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/create_user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(details)
        });
        try {
            const json = await response.json();
            console.log(json);
            if (!json.success) {
                alert("Enter valid credentials");
            }
            else {
                navigate("/Sign_in");
            }
        } catch (error) {
            console.error("Error parsing JSON:", error);
            alert("Error parsing JSON response");
        }
    };

    const onChange = (event) => {
        const { name, value } = event.target;
        setDetails({ ...details, [name]: value });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='signup-page'>
                    <h1>TUTOR</h1>
                    <div className='signup-box'>
                        <input className='signup-input' type="text" placeholder='Enter Name' name='name' value={details.name} onChange={onChange}></input>
                        <input className='signup-input' type='text' placeholder='Enter Email' name='email' value={details.email} onChange={onChange}></input>
                        <input className='signup-input' type='password' placeholder='Enter Password' name='password' value={details.password} onChange={onChange}></input>
                        <input className='signup-input' type='text' placeholder='Enter Education Center Name' name='education' value={details.education} onChange={onChange}></input>
                        <input className='signup-input' type='text' placeholder='Enter Major' name='major' value={details.major} onChange={onChange}></input>
                        <div className="toggle-list">
                            <h4>Do you want to Sign-up as Student or Tutor</h4>
                            <label className="toggle-item">
                                <input type="radio" name="role" onChange={onChange} className="toggle-input" checked={details.role === "student"} value="student"></input>
                                <span className="toggle-label">Student</span>
                            </label>
                            <label className="toggle-item">
                                <input type="radio" name="role" onChange={onChange} className="toggle-input" checked={details.role === "tutor"} value="tutor"></input>
                                <span className="toggle-label">Tutor</span>
                            </label>
                        </div>
                    </div>
                    <button className='signup-button'>Submit</button>
                    <div className='signup-account'>
                        <h4>If you already have an account?</h4>
                        <Link className="sign-in" to="/Sign_in">Sign-In</Link>
                    </div>
                </div>
            </form>
        </>
    );
}
