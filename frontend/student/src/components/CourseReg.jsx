import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import CourseInfo from "./CourseInfo.jsx"
import ElectiveSelect from "./ElectiveSelect.jsx"
import Filters from "./Filters.jsx"
import axios from "axios"
import { useNavigate } from "react-router-dom";

function Courseregpage() {

  const [regCourses, setRegCourses] = useState([]);
  const [avalCourses, setAvalCourses] = useState([]);

  const [TotPageNum, setTotPageNum] = useState(0)
  const [displayNum, setDisplayNum] = useState(1)
  const [pageNum, setPageNum] = useState(1)

  const [filters, setFilters] = useState({
    courseId: "",
    courseName: "",
    instructor: "",
    slot: "",
  });

  const updatefilters = (filters) =>{
    setFilters(filters)
  }

  const updateReg = (updatedlist) => {

    setRegCourses(updatedlist)
  }
  
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const modalRef = useRef(null);

  const updatecourseid = (courseid) => {

    setSelectedCourseId(courseid)

  }

  const [showChoice, setShowChoice] = useState(false)

  const updateshowchoice = (choice) =>{

    setShowChoice(choice)

  }

  useEffect(() => {

    setDisplayNum(pageNum)
    
    var token = sessionStorage.getItem("token");
    axios.post(import.meta.env.VITE_STUDENT+"available-courses/" + pageNum,
    {
      filters:filters
    },{
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
      }
    }).then( (res) =>{

      setTotPageNum(res.data.totPages)
      setAvalCourses(res.data.courses)

    }).catch((err) => {

      console.log(err);
      setErrMsg("There is some problem with the server or your internet, try again after some time")

    })
  }, [pageNum]);

  useEffect(() => {

    var token = sessionStorage.getItem("token");
    axios.get(import.meta.env.VITE_STUDENT+"registered-courses/",
    {
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
      }
    }).then( (res) =>{

      if(res.data.status == 1) setRegCourses(res.data.courses)

      
    }).catch((err) => {

      console.log(err);
      setErrMsg("There is some problem with the server or your internet, try again after some time")
    })
  }, []);

  useEffect(() => {

    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };

    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal]);



  const handleRemoveCourse = (courseId) => {

    const updatedRegCourses = regCourses.filter(course => course.course_id !== courseId);
    setRegCourses(updatedRegCourses);
  };

  const handleAddCourse = (courseId) => {

    setSelectedCourseId(courseId)
    setShowChoice(true)
    
  };

  const handleCourseIdClick = (courseId) => {
    setSelectedCourseId(courseId);
    setShowModal(true);
  };

  const handleprevaval = ()=>{

    if(pageNum > 1) setPageNum(pageNum - 1);
  }

  const handlepgnoaval = ()=>{

    if(displayNum >= 1 && displayNum <= TotPageNum)
      setPageNum(displayNum);

    else {
      setPageNum(TotPageNum);
      setDisplayNum(TotPageNum);
    }   
  }

  const handlenextaval = ()=>{

    if(pageNum < TotPageNum) setPageNum(pageNum + 1);

  }

  const handleRegister = () =>{

    var token = sessionStorage.getItem("token");
    axios.post(import.meta.env.VITE_STUDENT+"register-courses/",
    {
      regCourses: regCourses
    },{
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
      }
    }).then( (res) =>{

      if(res.data.status !== 1){

        alert("registration unsuccessful!");
      }
      else{
        alert("registration successful")
      }

    
    }).catch((err) => {

      console.log(err);
      setErrMsg("There is some problem with the server or your internet, try again after some time")
    })
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="w-full max-w-7xl">

        <div className="grid gap-4 mb-2">

          <div className="col-span-3 overflow-y-auto rounded-lg shadow-xs">

            <div className="text-lg font-semibold text-center mb-2">Available Courses</div>

            <div className="bg-blue-50 p-5">

              <Filters filters = {filters} updatefilters = {updatefilters} Courselist = {avalCourses} updatecourselist = {setAvalCourses} settotpagenum = {setTotPageNum}/>

              <div className="grid grid-cols-7 justify-between font-semibold items-center mb-1">

                <div>Course ID</div>
                <div>Course Name</div>
                <div>Instructor</div>
                <div>Slot</div>
                <div>Credits</div>
                <div>Current Students</div>
                <div>Add</div>

              </div>

              {avalCourses.map((course) => (

                <div key={course.course_id} className="grid grid-cols-7 justify-between items-center mb-2">
                  <div onClick={() => handleCourseIdClick(course.course_id)} className="cursor-pointer">{course.course_id}</div>

                  <div>{course.name}</div>
                  <div>{course.instructor_name}</div>
                  <div>{course.slot}</div>
                  <div>{course.credits}</div>
                  <div>{course.count}</div>

                  <div><button className="bg-green-500 text-white px-2 py-1 rounded-md text-sm" onClick={() => handleAddCourse(course.course_id)}>+</button></div>
                </div>
              ))}

            </div>
          </div>

        </div>

        <div className="flex gap-3 justify-center font-semibold mb-6">
          <div> <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handleprevaval()}>prev</button> </div>

          <div className="flex flex-row items-center">
            
            <input className="w-8 border-2" type="text" placeholder={pageNum}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
              handlepgnoaval();
            }
            }}/>

          <div className="mx-2">of</div>
          <div>{TotPageNum}</div>
          </div>

          <div> <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handlenextaval()}>next</button> </div>
        </div>          

        <div className="grid gap-4 mb-2">
          
          <div className="col-span-3 overflow-y-auto rounded-lg shadow-xs">

            <div className="text-lg font-semibold text-center mb-2">Registered Courses</div>

            <div className="bg-blue-50 p-4">

              <div className="grid grid-cols-8 justify-between items-center font-semibold mb-2">

                <div>Course ID</div>
                <div>Course Name</div>
                <div>Instructor</div>
                <div>Slot</div>
                <div>Credits</div>
                <div>Elective</div>
                <div>Current Students</div>
                <div>Remove</div>

              </div>
              {regCourses.map((course) => (
                <div key={course.course_id} className="grid grid-cols-8 justify-between items-center mb-2">

                  <div onClick={() => handleCourseIdClick(course.course_id)} className="cursor-pointer">{course.course_id}</div>

                  <div>{course.name}</div>
                  <div>{course.instructor}</div>
                  <div>{course.slot}</div>
                  <div>{course.credits}</div>
                  <div>{course.elective}</div>
                  <div>{course.count}</div>

                  <div><button className="bg-red-500 text-white px-2 py-1 rounded-md text-sm" onClick={() => handleRemoveCourse(course.course_id)}>-</button></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className = "flex justify-center mt-6"><button className="bg-red-500 text-white px-2 py-1 rounded-md text-sm" onClick = {() => handleRegister()}> Register</button></div>

      </div>


      {showModal && (
        <CourseInfo courseid = {selectedCourseId} showModal = {[showModal, setShowModal]} modalRef = {modalRef}/>
      )}

      {showChoice && (

        <ElectiveSelect updateshowchoice = {updateshowchoice} courseid = {selectedCourseId} regCourses = {regCourses} updateReg = {updateReg} avalCourses = {avalCourses} updatecourseid = {updatecourseid}/>
            
      )}
    </div>
  );
}

export default Courseregpage;
