import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import StudentsList from "./StudentsList";
import ViewFeedback from "./ViewFeedback";
import axios from "axios";

const CourseDetailsPage = () => {
    const [students, setStudents] = useState([]);
    const [totPageNum,setTotPageNum] = useState(0);
    const [pageNum,setPageNum] = useState(1);
    const [temp,setTemp] = useState(1);
    const [isFeedbackDone, setIsFeedbackDone] = useState(false);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const location = useLocation();
    const course = location.state;
    const {coursecode} = useParams();

    useEffect(() => {
        setTemp(pageNum);
        // console.log(pageNum,coursecode);
        var token = sessionStorage.getItem("token");
        axios.get(import.meta.env.VITE_ADMIN+"present-course-details/" + coursecode 
                                                    + "/" + pageNum ,{
            headers: {
              'Content-Type': "application/json",
              'Authorization': `Bearer ${token}`,
          }
           }).then( (res) => {
    
            if(res.data.status == -2)
            {
                setTotPageNum(1);
                setStudents([]);
            }
            else if (res.data.status == 1)
            {
                setTotPageNum(res.data.totPages);
                setStudents(res.data.students);
            }
    
           }).catch((err) => {
            
            console.log(err);
            setErrMsg("There is some problem with the server or your internet, try again after some time")
            })
      }, [pageNum]);
    
      useEffect(() => {
        var token = sessionStorage.getItem('token');
        axios.get(import.meta.env.VITE_ADMIN + 'get-timelines',{
            headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
        }
        })
            .then((res) => {

                if(res.data.status == 1) {
                    if(res.data.prev_period == 3) setIsFeedbackDone(true);
                    else setIsFeedbackDone(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
      }, [])

  const handleprev = ()=> {
    if(pageNum > 1) setPageNum(pageNum-1);
    setTemp(pageNum)
  }

  const handlenext = ()=>{
    if(pageNum < totPageNum) setPageNum(pageNum+1);
    setTemp(pageNum)
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if(temp >= 1 && temp <= totPageNum)
        setPageNum(temp); 
      else {
        setPageNum(totPageNum);
        setTemp(totPageNum);
      }
    }
  };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 m-4">
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Course Details</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Detail label="Course Code" value={course?.courseCode} />
                <Detail label="Course Name" value={course?.courseName} />
                <Detail label="Slot" value={course?.slot} />
            </div>
            <StudentsList students={students} courseCode={course.courseCode} />
            <div className="flex gap-2 justify-center font-semibold mb-6">
                <div><button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handleprev()}>prev</button></div>
                <div>
                    <input
                    type="text" 
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    onKeyDown={handleKeyDown}
                        />
                </div>
                <div>of</div>
                <div>{totPageNum}</div>
                <div><button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handlenext()}>next</button></div>
            </div>
            {isFeedbackDone && (
                <button onClick={() => setIsFeedbackVisible(true)} className="bg-green-500 text-white px-4 py-2 rounded-md text-sm">View Feedback</button>
            )}
            {isFeedbackVisible && 
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-auto my-4 overflow-auto" style={{ maxHeight: "80vh", maxWidth: "80vw" }}>
                        <ViewFeedback
                            courseCode={course.courseCode}
                            onClose={() => setIsFeedbackVisible(false)}
                        />
                    </div>
                </div>
            }
        </div>
    );
};

const Detail = ({ label, value }) => (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg p-4 shadow">
        <h3 className="text-lg font-semibold text-white">{label}</h3>
        <p className="text-md text-white mt-1">{value || "N/A"}</p>
    </div>
);

export default CourseDetailsPage;
