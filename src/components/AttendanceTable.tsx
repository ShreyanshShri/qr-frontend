import React, {useEffect, useRef, useState} from 'react';
import { DownloadTableExcel } from 'react-export-table-to-excel';

import StudentTr from './StudentTr';

const AttendanceTable = ({currBatch, attendance, students, currentBatchAttendanceList, todaysAttList, setTodaysAttList, saveAttendance}) => {

    const tableRef = useRef<any>(null);

    useEffect(() => {

    }, [])

  return (
    <div className="attendance-block">
            <h2>Student Attendance</h2>
            
            <DownloadTableExcel
                    filename="attendance table"
                    sheet={currBatch}
                    currentTableRef={tableRef.current}
                >

                   <button> Export excel </button>
            </DownloadTableExcel>

            <table id="attendance-table" ref={tableRef}>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        {attendance.map(at => {
                            const yymmdd = at.date.split("T")[0];
                            const month = yymmdd.split("-")[1];
                            const date = yymmdd.split("-")[2];
                            if(at.batch !== currBatch) return;
                            return <th key={at._id}>{date}/{month}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {students.map((st, index) => {
                        if(st.batches[0] == currBatch) {
                            return (
                                <StudentTr key={st.college_id} 
                                    student={st}
                                    currentBatchAttendanceList={currentBatchAttendanceList}
                                    setTodaysAttList={setTodaysAttList}
                                    todaysAttList={todaysAttList}
                                    index={Math.round(((index / 10) % 1) * 10)}
                                    />
                            )

                        }
                    })}
                </tbody>
            </table>
            <button onClick={saveAttendance}>Save Attendance</button>
        </div>
  )
}

export default AttendanceTable