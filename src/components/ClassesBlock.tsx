import React from 'react'

const ClassesBlock = ({teacher, currBatch, setCurrBatch, leaveRoom, startConnection, updateGraph, attendance}) => {
  return (
    <div className="classes-block">
            <h2 style={{color: "black"}}>Classes</h2>
            <ul id="classes-list">
                {teacher && teacher.batches.map(b => (
                    <li key={b} className={currBatch == b ? "active" : "inactive"}><button onClick={() => {
                        setCurrBatch(b)
                        leaveRoom()
                        startConnection(b, teacher.subjects[0])
                        updateGraph(attendance, b);
                    }} className='button-none' 
                    >{b}</button></li>
                ))}
            </ul> 
        </div>
  )
}

export default ClassesBlock