import React, { useEffect, useState, useRef } from "react";
import SelCoursePopup from "./SelCoursePopup";
import axios from "axios"

function PropCourseList(props) {
  const [Courses, setCourses] = useState([]);
  const [totPageNum,setTotPageNum] = useState(0);
  const [pageNum,setPageNum] = useState(1);
  const [temp,setTemp] = useState(1);
  const [coursemod,setCoursemod] = useState("");
  const [courseId,setCourseId] = useState("");

  useEffect(() => {
    setTemp(pageNum);
    var token = sessionStorage.getItem("token");
    axios.get(import.meta.env.VITE_ADMIN+"proposed-courses/" + pageNum ,{
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${token}`,
      }
       }).then( (res) => {

        setTotPageNum(res.data.totPages);
        if(res.data.message == -1) setCourses([]);
        if(res.data.message == 1) setCourses(res.data.courses);

       }).catch((err) => {
        
        console.log(err);
        setErrMsg("There is some problem with the server or your internet, try again after some time")
        })
    
  }, [pageNum,props.reload]);

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

  const handleCourseClick = (e)=> 
  {
    setCoursemod(true)
    setCourseId(e.target.id)
}

  const handleRemoveCourse = (courseId) => {
    var answer = window.confirm('Are you sure');
    if(answer)
    {
      var token = sessionStorage.getItem("token");
      axios.post(import.meta.env.VITE_ADMIN+"remove-course", {
        course_id:courseId
         },{
          headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
        }
         }).then( (res) => {
            props.setReload((props.reload + 1) % 2) ;
         }).catch((err) => {
          
          console.log(err);
          setErrMsg("There is some problem with the server or your internet, try again after some time")
          })

    }
  };

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="w-full max-w-5xl">

        <div className="grid gap-4 mb-3">

          <div className="col-span-3 overflow-y-auto rounded-lg shadow-xs">

            <div className="text-lg font-semibold text-center mb-2">Proposed Courses List</div>

            <div className="bg-blue-50 p-5">

              <div className="grid grid-cols-4 justify-between font-semibold items-center mb-2">

                <div>Course ID</div>
                <div>Course Name</div>
                <div>Credits</div>

              </div>

              {Courses.map((course) => (

                <div key={course.course_id} className="grid grid-cols-4 justify-between items-center mb-2" >
                  <div id={course.course_id} className="cursor-pointer" onClick={handleCourseClick} >{course.course_id}</div>

                  <div>{course.name}</div>

                  <div>{course.credits}</div>

                  <div><button className="bg-red-500 text-white px-2 py-1 rounded-md text-sm" onClick={() => handleRemoveCourse(course.course_id)}>-</button></div>
                </div>
              ))}
            </div>
          </div>
                {coursemod && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10">
                            <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-auto my-4 overflow-auto" style={{ maxHeight: "80vh", maxWidth: "80vw" }}>
                                <SelCoursePopup course={Courses.filter((course)=>{return course.course_id==courseId})[0]} 
                                setCoursemod={setCoursemod} reload={props.reload} setReload={props.setReload}/>
                            </div>
                        </div>
                )}
        </div>

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

      </div>
    </div>
  );
}

export default PropCourseList;
