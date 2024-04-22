import React, { useEffect, useState, useRef } from "react";
import SelCoursePopup from "./SelCoursePopup";

function PropCourseList() {

    const courseList = [
        {  course_id: 'CS101', coursename:'Intro to Computers',  credits: 3, prereq:"CS21231,CS323423"},
        {  course_id: 'ENG201', coursename: 'English Grammar',  credits: 4, prereq:"CS45454,CS55656"}
      ]

 

  const [Courses, setCourses] = useState([]);
  const [totPageNum,setTotPageNum] = useState(0);
  const [pageNum,setPageNum] = useState(1);
  const [coursemod,setCoursemod] = useState(false);
  const [courseId,setCourseId] = useState("")
  useEffect(() => {

    setCourses(courseList);
  }, []);


  const handleRemoveCourse = (courseId) => {
    const updatedRegCourses = Courses.filter(course => course.course_id !== courseId);
    setCourses(updatedRegCourses);
  };

  const handleprev = ()=>{


  }

  const handlepgno = ()=>{

    
  }

  const handlenext = ()=>{

    
  }

  const handleCourseClick = (e)=> 
  {
    setCoursemod(true)  
    setCourseId(e.target.id);
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="w-full max-w-5xl">

        <div className="grid gap-4 mb-3">

          <div className="col-span-3 overflow-y-auto rounded-lg shadow-xs">

            <div className="text-lg font-semibold text-center mb-2">Proposed Courses List</div>

            <div className="bg-blue-50 p-5">

              <div className="grid grid-cols-5 justify-between font-semibold items-center mb-2">

                <div>Course ID</div>
                <div>Course Name</div>
                <div>Credits</div>

              </div>

              {Courses.map((course) => (

                <div key={course.course_id} className="grid grid-cols-4 justify-between items-center mb-2" onClick={handleCourseClick}>
                  <div id={course.course_id} className="cursor-pointer">{course.course_id}</div>

                  <div>{course.coursename}</div>

                  <div>{course.credits}</div>

                  <div><button className="bg-red-500 text-white px-2 py-1 rounded-md text-sm" onClick={() => handleRemoveCourse(course.course_id)}>-</button></div>
                </div>
              ))}
            </div>
          </div>
                {coursemod && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10">
                            <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-auto my-4 overflow-auto" style={{ maxHeight: "80vh", maxWidth: "80vw" }}>
                                <SelCoursePopup course={Courses.filter((course)=>{return course.course_id==courseId})} 
                                setCoursemod={setCourseId} courses={Courses} setCourses={setCourses}/>
                            </div>
                        </div>
                )}
        </div>

        <div className="flex gap-2 justify-center font-semibold mb-6">
            <div><button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handleprev()}>prev</button></div>
            <div><input type="text" onChange={()=>handlepgno()} placeholder={pageNum}></input></div>
             <div>of</div>
             <div>{totPageNum}</div>
            <div><button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handlenext()}>next</button></div>
          </div>

      </div>
    </div>
  );
}

export default PropCourseList;
