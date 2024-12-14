import React, {useState} from 'react'
import {Navigate} from "react-router-dom"
import axios from 'axios'
import { Link } from 'react-router-dom';

import stu1 from "../assets/images/stu1.jpg";
import tea1 from "../assets/images/tea1.jpg";

const Loginpage = () => {

    const [college_id, setcollegeId] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [
        selectedValue,
        setSelectedValue,
    ] = useState("student");
    
    const handleRadioChange = (value) => {
        setSelectedValue(value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post(import.meta.env.VITE_SERVER_URL+"auth/login", {
                college_id,
                password
            });
            localStorage.setItem("token", res.data.token);
            setRedirect(true);
        } catch (err) {
            console.log(err.response.data);
            alert(err.response.data.message);
        }
    }

  return (
    <div className='login'>
        { (redirect && (selectedValue == "student")) ? <Navigate to='/student-dashboard'/> : null }
        { (redirect && (selectedValue == "teacher")) ? <Navigate to='/teacher-dashboard'/> : null }
      <div className="navbarBox login-navbar">
        <div className="logoBox">MyAttendance</div>
        <div className="optionsBox">
          <Link to="/">Home</Link>
          <Link to="/" id="feat">Features</Link>
          <a href="#" id="pric">Usage</a>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <div className="board">
        <div className="loginBox">
          <h1 style={{ fontSize: "64px", marginBottom: "0px", marginTop: "0px" }}>
            Welcome
          </h1>
          <p style={{ marginTop: "0px", marginLeft: "7px" }}>
            We are glad to see you back with us
          </p>
          <div className="user-type">
            <label>
              <input
                className="option"
                type="radio"
                name="user-type"
                value="student"
                checked={selectedValue ==="student"}
                onChange={() => handleRadioChange("student")}
              />{" "}
              Student
            </label>
            <label>
              <input
                className="option"
                type="radio"
                name="user-type"
                value="teacher"
                checked={selectedValue ==="teacher"}
                onChange={() => handleRadioChange("teacher")}
              />{" "}
              Teacher
            </label>
          </div>
          <div className="login-form">
            <form onSubmit={handleSubmit}>
              <input
                className="inputs"
                type="text"
                id="college_id"
                placeholder="College ID"
                onChange={(e) => setcollegeId(e.target.value)}
              />
              <input
                className="inputs"
                type="password"
                id="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="login_button" type="submit">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="logimg">
          <img className="log-img" src={selectedValue == "student" ? stu1 : tea1} alt="Login illustration" />
        </div>
      </div>
    </div>
  )
}

export default Loginpage;