import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'

import "../css/homepage.css"

import Carousel from "../components/Carousel";

import pic from "../assets/images/pic.jpg";
import pic1 from "../assets/images/pic1.png";
import pic2 from "../assets/images/pic2.png";
import pic3 from "../assets/images/pic3.png";
import pic4 from "../assets/images/pic4.png";
import img8 from "../assets/images/img8.png";

const Homepage = () => {

  return (
<div>
      <div className="navbarBox">
        <div className="logoBox">MyAttendance</div>
        <div className="optionsBox">
          <Link to="/">Home</Link>
          <Link to="/" id="feat">Features</Link>
          <a href="#" id="pric">Usage</a>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      <div className="contentBox">
        <div className="content">
          <h3 id="liner">Manage Attendance with Ease</h3>
          <p id="para">Efficiency, Discipline, and Punctuality at your fingertips.</p>
          <Link to="/login"><button className="primeButton">Get Started</button></Link>
        </div>

        <Carousel />
      </div>

      <div className="features">
        <div className="orange-left">
          <img src={img8} style={{ width: "30vw", marginLeft: "8vh" }} alt="Feature illustration" />
        </div>
        <div className="featuresBox">
          <div className="feature1">
            <h1>Teacher</h1>
            <ul>
              <li className='bg-none'>Dashboard with Separate Classes Lists</li>
              <li className='bg-none'>Attendance details and analytics</li>
              <li className='bg-none'>Export to Excel in a Click!</li>
              <li className='bg-none'>Dynamic QR restricts proxy</li>
            </ul>
          </div>
          <div className="feature2">
            <h1>Student</h1>
            <ul>
              <li className='bg-none'>Automatic Attendance Marking</li>
              <li className='bg-none'>See Attendance Details Classwise</li>
              <li className='bg-none'>Get Notified for Low Attendance</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="sect">
        <div className="heading" style={{ color: "white", margin: "auto", fontSize: "larger", width: "fit-content" }}>
          <h1 style={{ marginTop: "40px"}}>Join the Effortless Attendance Revolution with MyAttendance</h1>
        </div>
        <div className="board card">
          <div className="loginBox">
            <h1 style={{ fontSize: "36px", marginLeft: "0px", marginTop: "0px" }}>Anywhere Attendance made Easy</h1>
            <p style={{ marginTop: "0px", marginLeft: "7px" }}>
              Let your employees mark attendance from anywhere with this
            </p>
          </div>
          <div className="logimg">
            <img className="log-img" src={pic1} style={{ marginLeft: "-20px" }} alt="Anywhere Attendance" />
          </div>
        </div>

        <div className="board card">
          <div className="loginBox">
            <h1 style={{ fontSize: "36px", marginBottom: "0px", marginTop: "0px" }}>Effective Time-Tracking</h1>
            <p style={{ marginTop: "0px", marginLeft: "7px" }}>
              Let your HR easily monitor and manage your attendance records with real-time updates
            </p>
          </div>
          <div className="logimg">
            <img className="log-img" src={pic2} style={{ marginLeft: "-20px" }} alt="Time-Tracking" />
          </div>
        </div>

        <div className="board card">
          <div className="loginBox">
            <h1 style={{ fontSize: "36px", marginBottom: "0px", marginTop: "0px" }}>Streamlined Process with Automation</h1>
            <p style={{ marginTop: "0px", marginLeft: "7px" }}>
              Let automated attendance system save hours and efforts needed in manual tracking
            </p>
          </div>
          <div className="logimg">
            <img className="log-img" src={pic3} style={{ marginLeft: "-20px" }} alt="Automated Attendance" />
          </div>
        </div>

        <div className="board card">
          <div className="loginBox">
            <h1 style={{ fontSize: "36px", marginBottom: "0px", marginTop: "0px" }}>Enhance Employee Experience</h1>
            <p style={{ marginTop: "0px", marginLeft: "7px" }}>
              Let your people enjoy flexible work arrangements and a convenient way to punch
            </p>
          </div>
          <div className="logimg">
            <img className="log-img" src={pic4} style={{ marginLeft: "-20px" }} alt="Employee Experience" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage