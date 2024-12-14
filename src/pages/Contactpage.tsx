import React from 'react'
import { Link } from 'react-router'

const Contactpage = () => {
  return (
<div style={{width: "100vw"}}>
      {/* Navbar Section */}
      <div className="navbarBox">
        <div className="logoBox">MyAttendance</div>
        <div className="optionsBox">
        <Link to="/">Home</Link>
          <Link to="/" id="feat">Features</Link>
          <a href="#" id="pric">Usage</a>
          <Link to="/contact">Contact</Link>
        </div>
      </div>

      {/* Team Section */}
      <div
        className="sect two"
        style={{}}
      >
        <div
          className="heading"
          style={{
            color: "white",
            marginLeft: "22vh",
            fontSize: "larger",
          }}
        >
          <h1>Meet Our Team</h1>
        </div>
        <div
          className="secBox"
          style={{
            marginLeft: "10rem",
          }}
        >
          <div className="tec">
            <h3>Aman Agrahari</h3>
            <p>Frontend Developer</p>
            <p>aman8cse@gmail.com</p>
          </div>
          <div className="tec">
            <h3>Shreyansh Pandey</h3>
            <p>Leader and Management</p>
          </div>
          <div className="tec">
            <h3>Prateek Yadav</h3>
            <p>Project Manager</p>
          </div>
          <div className="tec">
            <h3>Shreyansh Srivastava</h3>
            <p>Backend Developer</p>
            <p>github.com/shreyanshShri</p>
            <p>linkedin.com/in/shreyansh-shrivastva-416956300/</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contactpage