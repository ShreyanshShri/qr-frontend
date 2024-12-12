import React, { useEffect, useState } from 'react'

const StudentTr = ({student, currentBatchAttendanceList, setTodaysAttList, todaysAttList, index}) => {
  
  const [daysPresent, setDaysPresent] = useState<number>(0);

  useEffect(() => {
    let counter = 0;
    currentBatchAttendanceList.map((att, i) => {
      if(att.students.find(id => id == student.college_id)) {
          counter++;
      }
    })
    setDaysPresent(counter);
  }, [currentBatchAttendanceList])



  // const [elRefs, setElRefs] = useState([]);
  
  // useEffect(() => {
  //   // add or remove refs
  //   setElRefs((elRefs) =>
  //     Array(currentBatchAttendanceList.length)
  //       .fill()
  //       .map((_, i) => elRefs[i] || useRef()),
  //   );
  // }, [currentBatchAttendanceList]);
  

  const handleChange = (e) => {
    const input = e.target.value.split("")[1]
    if(input == "A" || input == "a") {
      let temp = todaysAttList;
      temp[index] = "A"
      setTodaysAttList(temp)
    } else if(input == "P" || input == "p") {
      e.target.value = "P";
      let temp = todaysAttList;
      temp[index] = "P"
      setTodaysAttList(temp)
    }
  }


  return (
    <tr>
        <th className={daysPresent/currentBatchAttendanceList.length <= 0.50 ? "col-1 red"
           : daysPresent/currentBatchAttendanceList.length <= 0.75 ? "col-1 yellow"
           : "col-1 green"}>{daysPresent}/{currentBatchAttendanceList.length}</th>
        <th className='col-2'>{student.username}</th>
        {currentBatchAttendanceList.map((att, i) => {
            if(att.students.find(id => id == student.college_id)) {
                return (<td key={att._id}>{i === currentBatchAttendanceList.length - 1 ? <input style={{width: "20px", border: "none"}} type="text" value={todaysAttList[index]} onChange={(e) => handleChange(e)} /> : <span>P</span>}</td>)
            } else {
                return (<td key={att._id}>{i === currentBatchAttendanceList.length - 1 ? <input style={{width: "20px", border: "none"}} type="text" value={todaysAttList[index]} onChange={(e) => handleChange(e)} /> : <span>A</span>}</td>)
            }
        })}
    </tr>
  )
}

export default StudentTr