import React, { useEffect, useState } from 'react'

const StudentTr = ({student, currentBatchAttendanceList, setTodaysAttList, todaysAttList, index}) => {
  
  useEffect(() => {
    // console.log(todaysAttList)
  }, [todaysAttList])



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
        <th>{student.username}</th>
        {currentBatchAttendanceList.map((att, i) => {
            if(att.students.find(id => id == student.college_id)) {
                return (<th key={att._id}>{i === currentBatchAttendanceList.length - 1 ? <input style={{width: "20px", border: "none"}} type="text" value={todaysAttList[index]} onChange={(e) => handleChange(e)} /> : <span>P</span>}</th>)
            } else {
                return (<th key={att._id}>{i === currentBatchAttendanceList.length - 1 ? <input style={{width: "20px", border: "none"}} type="text" value={todaysAttList[index]} onChange={(e) => handleChange(e)} /> : <span>A</span>}</th>)
            }
        })}
    </tr>
  )
}

export default StudentTr