import React from 'react'
import QRCode from 'react-qr-code'

const QRSection = ({teacher, token, showQR, timer}) => {
  return (
    <div>
        <h1 id="teacher-name">Welcome, <span id="userDisplay">{teacher && teacher.username}</span></h1>
    <h2>{teacher && teacher.subjects[0]}</h2>
    <div className="qr-wrapper">
      {token != "" && showQR && <QRCode value={token} />}
    </div>
    {showQR && <p>Valid For: {timer}s</p>}
    </div>
  )
}

export default QRSection