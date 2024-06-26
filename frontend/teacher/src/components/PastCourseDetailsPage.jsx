import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import GradeSubmissionButtons from "./GradeSubmissionButtons";
import StudentsList from "./StudentsList";
import ViewFeedback from "./ViewFeedback";

const PastCourseDetailsPage = () => {
    const [students, setStudents] = useState([]);
    const [totPageNum,setTotPageNum] = useState(0);
    const [pageNum,setPageNum] = useState(1);
    const [temp,setTemp] = useState(1);
    const [isGradeOn, setIsGradeOn] = useState(false);
    const [isFeedbackDone, setIsFeedbackDone] = useState(false);
    const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
    const [isManualEntry, setIsManualEntry] = useState(false);
    const location = useLocation();
    const course = location.state;

    const validGrades = ["A+", "A", "A-", "B", "B-", "C", "C-", "D", "F"];

    // var token = sessionStorage.getItem("token");
    // axios.get(import.meta.env.VITE_ADMIN+"/proposed-courses/" + pageNum ,{
    //     headers: {
    //       'Content-Type': "application/json",
    //       'Authorization': `Bearer ${token}`,
    //   }
    //    }).then( (res) => {

    //     setTotPageNum(res.data.totPages);
    //     if(res.data.message == -1) setCourses([]);
    //     if(res.data.message == 1) setCourses(res.data.courses);

    //    }).catch((err) => {
        
    //     console.log(err);
    //     setErrMsg("There is some problem with the server or your internet, try again after some time")
    //     })
    

    useEffect(() => {
            // axios.get("your_api_endpoint_here")
            //     .then((res) => {
            //         setCourse(res.data.course);
            //     })
            //     .catch((err) => {
            //         console.log(err);
            //     });

        const s1 = {name: "John Doe", id: "123", grade:'A'};
        const s2 = {name: "Jane Smith", id: "124", grade:'A+'};
        setStudents([s1, s2]);
    }, []);

    useEffect(() => {
        setTemp(pageNum);
        // var token = sessionStorage.getItem("token");
        // axios.get(import.meta.env.VITE_ADMIN+"/proposed-courses/" + pageNum ,{
        //     headers: {
        //       'Content-Type': "application/json",
        //       'Authorization': `Bearer ${token}`,
        //   }
        //    }).then( (res) => {
    
        //     setTotPageNum(res.data.totPages);
        //     if(res.data.message == -1) setCourses([]);
        //     if(res.data.message == 1) setCourses(res.data.courses);
    
        //    }).catch((err) => {
            
        //     console.log(err);
        //     setErrMsg("There is some problem with the server or your internet, try again after some time")
        //     })
        setTotPageNum(5);
      }, [pageNum]);
    
      useEffect(() => {
        //axios request
        setIsGradeOn(true);
        setIsFeedbackDone(true);
      }, [])

  const handleprev = ()=> {
    if(pageNum > 1) setPageNum(pageNum-1);
  }

  const handlenext = ()=>{
    if(pageNum < totPageNum) setPageNum(pageNum+1);
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
            <StudentsList students={students} isManualEntry={isManualEntry} onGradeChange={handleGradeChange} onGradeKeyDown={handleGradeKeyDown} />
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
            <button onClick={() => setIsFeedbackVisible(true)} className="bg-green-500 text-white px-4 py-2 rounded-md text-sm">View Feedback</button>
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

export default PastCourseDetailsPage;
