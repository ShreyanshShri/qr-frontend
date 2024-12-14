import React, {useState, useEffect, useRef} from 'react'
import axios from "axios"
import { socket } from '../socket';

import QRSection from '../components/QRSection';
import ClassesBlock from '../components/ClassesBlock';
import Statistics from '../components/Statistics';
import AttendanceTable from '../components/AttendanceTable';

const Teacherdashboard = () => {
    
    const [token, setToken] = useState("");
    const [teacher, setTeacher] = useState<any>(null);
    const [students, setStudents] = useState<any>([]);
    const [attendance, setAttendance] = useState<any>([]);
    const [currBatch, setCurrBatch] = useState("")
    const [currentBatchAttendanceList, setCurrentBatchAttendanceList] = useState([]);
    const [todaysAttList, setTodaysAttList] = useState<string[]>([]);
    const [classAnalyticsData, setClassAnalyticsData] = useState<any>([]);
    const [rygStudentData, setRygStudentData] = useState([
        {name: "red", value: 0, fill: "red"},
        {name: "yellow", value: 0, fill: "#f2ae00"},
        {name: "green", value: 0, fill: "#58d612"},
    ]);
    const [showQR, setShowQR] = useState(false);
    const [timer, setTimer] = useState(0);
    
    const timerId = useRef<any>(null);
    
    // get attendance data
    const getData = async () => {
        try {
            const res = await axios.post(import.meta.env.VITE_SERVER_URL+"attendance/get", {
                token: localStorage.getItem("token")
            })
            setTeacher(res.data.user);
            setStudents(res.data.student_list);
            setCurrBatch(res.data.user.batches[0]);
            setAttendance(res.data.attendance_data);
            updateGraph(res.data.attendance_data, res.data.user.batches[0]);
            startConnection(res.data.user.batches[0], res.data.user.subjects[0]);
            
        } catch (err) {
            alert(err.response.data.message)
            console.log(err.response.data);
        }
    }

    // plot attendance data
    const updateGraph = (attendance_data, batch) => {
        const temp : any= []
        attendance_data.map(at => {
            
            let a1 : any = [];

            at.students.map(st => {
                if(st == null || st == undefined) return;
                if(st.split("")[0] == "4") return;
                if(a1.find(x => x === st)) return;
                a1.push(st);
            })

            const yymmdd = at.date.split("T")[0];
            const month = yymmdd.split("-")[1];
            const date = yymmdd.split("-")[2];
            if(at.batch == batch) {
                temp.push({date: `${date}-${month}`, attendance: a1.length})
            }
        })
        setClassAnalyticsData(temp)
    }
    
    // start session
    const startConnection = async (__batch, __subject) => {
        socket.emit("start-session", { 
            _batch: __batch,
            _subject: __subject
         })
    }
    // leave room
    const leaveRoom = async () => {
        socket.emit("leave");
    }


    const saveAttendance = async () => {
        let currBatchStudents :any[] = [];
        students.map(st => {
            if(st.batches[0] == currBatch) currBatchStudents.push(st);
        })

        let list :any = []
        todaysAttList.map((att, index) => {
            if(att == "P" || att == "p") {
                list.push(currBatchStudents[index].college_id)
            }
        })

        const attendance_data = {
            subject: teacher.subjects[0],
            batch: currBatch,
            teacher: teacher.college_id,
            students: list
        }
        console.log(attendance_data)

        try {
            const res = await axios.post(import.meta.env.VITE_SERVER_URL+"attendance/save-attendance", {
                user_token: localStorage.getItem("token"),
                attendance_data
            })
            alert(res.data.message);
        } catch (err) {
            alert(err.response.data.message)
            console.log(err.response.data);
        }
    }

    useEffect(() => {
        getData();
        
        // QR Logic
        function onToken(_token) {
            console.log(_token);
            if(_token.timer) setTimer(_token.timer);
            setToken(_token.token);
        }
        
        socket.on('connect', () => console.log("connection established"));
        socket.on('disconnect', () => console.log("connection ended"));
        socket.on('token', onToken);
        
        // QR Timer Logic
        timerId.current = setTimeout(() => {
            setShowQR(true);
        }, 2000);

        return () => {
            clearTimeout(timerId.current);

            socket.off('connect', () => console.log("connection established"));
            socket.off('disconnect', () => console.log("connection ended"));
            socket.off('token', onToken);
            // socket.off('start-session');
        };
    }, [])
    
    useEffect(() => {
        const interval = setInterval(() => {
            if(showQR) {
                setTimer(prevInt => {
                    if(prevInt == 0) {
                        return 20
                    } else {
                        return  prevInt - 1
                    }
                });
            }
        }, 1000)
        
        return () => {
            clearInterval(interval);
        }
    }, [showQR])

    useEffect(() => {
        let list: any = [];
            attendance.map(att => {
            if(att.batch == currBatch) {
                list.push(att);
            }
            })
            setCurrentBatchAttendanceList(list)

        let temp: string[] = [];
        students.map(st => {
            if(st.batches[0] != currBatch) return
            if(list[list.length - 1].students.find(s => s === st.college_id)){
                temp.push("P")
            } else {
                temp.push("A")
            }
        })
        setTodaysAttList(temp);
        // console.log(temp)

        let greenStudents = 0;
        let redStudents = 0; 
        let yellowStudents = 0;
        students.map(st => {
            let x = 0;
            if(st.batches[0] != currBatch) return;
            list.map(l => {
                if(l.students.find(s => s === st.college_id)) x++;
            })
            const percentage = x/list.length;
            if(percentage >= 0.75) {
                greenStudents++;
            } else if(percentage >= 0.50) {
                yellowStudents++;
            } else {
                redStudents++;
            }
        })
        setRygStudentData([
            {name: "red", value: redStudents, fill: "red"},
            {name: "yellow", value: yellowStudents, fill: "#f2ae00"},
            {name: "green", value: greenStudents, fill: "#58d612"},
        ]);
        

    }, [attendance, currBatch])



  return (
    <>
    <div className="navbarBox login-navbar">
        <div className="logoBox" style={{fontSize: "36px"}}>MyAttendance</div>
    </div>
    <div className="dashboard-container">
    <QRSection teacher={teacher} token={token} showQR={showQR} timer={timer} />
    
    <div className="details">
    
        <ClassesBlock teacher={teacher} currBatch={currBatch} setCurrBatch={setCurrBatch} leaveRoom={leaveRoom} startConnection={startConnection} updateGraph={updateGraph} attendance={attendance} />
        <AttendanceTable 
            currBatch={currBatch} 
            attendance={attendance} 
            currentBatchAttendanceList={currentBatchAttendanceList} 
            students={students} 
            todaysAttList={todaysAttList} 
            setTodaysAttList={setTodaysAttList} 
            saveAttendance={saveAttendance}    
        />

    </div>

    <Statistics classAnalyticsData={classAnalyticsData} rygStudentData={rygStudentData} />
    
</div>
</>
  )
}

export default Teacherdashboard
