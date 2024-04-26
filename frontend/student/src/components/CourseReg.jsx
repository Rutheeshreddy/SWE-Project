import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import CourseInfo from "./CourseInfo.jsx"
import ElectiveSelect from "./ElectiveSelect.jsx"
import Filters from "./Filters.jsx"
import axios from "axios"


function Courseregpage() {

  const reg = [
    { id: 1, course_id: 'CS101', coursename:'Intro to Computers', department: "CSE", instructor: 'John Doe', credits: 3, semester: 'Spring 2024', slot: 'N', current : [150, 200], elective: 'Free'},
    { id: 2, course_id: 'ENG201', coursename: 'English Grammar', department: "Languages", instructor: 'Jane Smith', credits: 4, semester: 'Fall 2024', slot: 'L', current: [31, 49], elective: 'Departmental'},
    { id: 3, course_id: 'ENG291', coursename: 'Grammar PROMAX', department: "Languages", instructor: 'Jolie', credits: 2, semester: 'Fall 2023', slot: 'Z', current: [13, 49], elective: null}  ]
  
  const aval = [
    { id: 1, course_id: 'CS111', coursename: 'Comp Sci 4', department: "CSE", instructor: 'John Villa', credits: 3, semester: 'Spring 2024', slot: 'Z', current: [16, 100], elective: null},
    { id: 2, course_id: 'ENG281', coursename: 'English Intro', department: "Languages", instructor: 'Jane Smith', credits: 4, semester: 'Fall 2024', slot: 'K', current: [25, 50], elective: null},
    { id: 3, course_id: 'ENG291', coursename: 'Grammar PROMAX', department: "Languages", instructor: 'Jolie', credits: 2, semester: 'Fall 2023', slot: 'Z', current: [13, 49], elective: null}

  ]

  const [regCourses, setRegCourses] = useState([]);
  const [avalCourses, setAvalCourses] = useState([]);

  const [totPageNumreg, setTotPageNumreg] = useState(0)
  const [displayNumReg, setDisplayNumReg] = useState(1)
  const [pageNumreg, setPageNumreg] = useState(1)

  const [totPageNumaval, setTotPageNumaval] = useState(0)
  const [displayNumAval, setDisplayNumAval] = useState(1)
  const [pageNumaval, setPageNumaval] = useState(1)

  const updateReg = (updatedlist) => {

    setRegCourses(updatedlist)
  }

  const updateAval = (updatedlist) => {

    setAvalCourses(updatedlist)
  }
  
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const modalRef = useRef(null);

  const updatecourseid = (courseid) =>{

    setSelectedCourseId(courseid)
  }

  const [showChoice, setShowChoice] = useState(false)

  const updateshowchoice = (choice) =>{

    setShowChoice(choice)

  }

  useEffect(() => {
    setDisplayNumAval(pageNumaval)
    var token = sessionStorage.getItem("token");
    axios.get(import.meta.env.VITE_ADMIN+"//" + pageNumaval,{
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
      }
    }).then( (res) =>{

      setTotPageNumaval(res.data.totPageNumaval)
      setAvalCourses(res.data.courses)
    }).catch((err) => {

      console.log(err);
      setErrMsg("There is some problem with the server or your internet, try again after some time")
    })
  }, [pageNumaval]);

  useEffect(() => {
    setDisplayNumReg(pageNumreg)
    var token = sessionStorage.getItem("token");
    axios.get(import.meta.env.VITE_ADMIN+"//" + pageNumreg,{
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
      }
    }).then( (res) =>{

      setTotPageNumreg(res.data.totPageNumreg)
      setRegCourses(res.data.courses)
    }).catch((err) => {

      console.log(err);
      setErrMsg("There is some problem with the server or your internet, try again after some time")
    })
  }, [pageNumreg]);

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

  const [filters, setFilters] = useState({
    courseId: "",
    courseName: "",
    department: "",
    instructor: "",
    semester: "",
    slot: "",
    credits: ""
  });

  const updatefilters = (filters) =>{
    setFilters(filters)
  }

  const handleprevreg = ()=>{

    if(pageNumreg > 1) setPageNumreg(pageNumreg - 1);
  }

  const handleprevaval = ()=>{

    if(pageNumaval > 1) setPageNumaval(pageNumaval - 1);
  }

  const handlepgnoreg = ()=>{

    if(displayNumReg >= 1 && displayNumReg <= totPageNumreg)
      setPageNumreg(displayNumReg);

    else {
      setPageNumreg(totPageNumreg);
      setDisplayNumReg(totPageNumreg);
    }  
  }

  const handlepgnoaval = ()=>{

    if(displayNumAval >= 1 && displayNumAval <= totPageNumaval)
      setPageNumaval(displayNumAval);

    else {
      setPageNumaval(totPageNumaval);
      setDisplayNumReg(totPageNumaval);
    }   
  }

  const handlenextreg = ()=>{

    if(pageNumreg < totPageNumreg) setPageNumreg(pageNumreg + 1);
  }

  const handlenextaval = ()=>{

    if(pageNumaval < totPageNumaval) setPageNumaval(pageNumaval + 1);
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="w-full max-w-7xl">

        <div className="grid gap-4 mb-2">

          <div className="col-span-3 overflow-y-auto rounded-lg shadow-xs">

            <div className="text-lg font-semibold text-center mb-2">Available Courses</div>

            <div className="bg-blue-50 p-5">

              <Filters filters = {filters} updatefilters = {updatefilters} Courselist = {avalCourses} updatecourselist = {setAvalCourses}/>

              <div className="grid grid-cols-9 justify-between font-semibold items-center mb-1">

                <div>Course ID</div>
                <div>Course Name</div>
                <div>Department</div>
                <div>Instructor</div>
                <div>Semester</div>
                <div>Slot</div>
                <div>Credits</div>
                <div>Current Students</div>
                <div>Add</div>

              </div>

              {avalCourses.map((course) => (

                <div key={course.course_id} className="grid grid-cols-9 justify-between items-center mb-2">
                  <div onClick={() => handleCourseIdClick(course.course_id)} className="cursor-pointer">{course.course_id}</div>

                  <div>{course.coursename}</div>
                  <div>{course.department}</div>
                  <div>{course.instructor}</div>
                  <div>{course.semester}</div>
                  <div>{course.slot}</div>
                  <div>{course.credits}</div>
                  <div>{course.current[0]}</div>

                  <div><button className="bg-green-500 text-white px-2 py-1 rounded-md text-sm" onClick={() => handleAddCourse(course.course_id)}>+</button></div>
                </div>
              ))}

            </div>
          </div>

        </div>

        <div className="flex gap-3 justify-center font-semibold mb-6">
          <div> <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handleprevaval()}>prev</button> </div>

          <div className="flex flex-row items-center">
            
            <input className="w-8 border-2" type="text" placeholder={pageNumaval}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
              handlepgnoaval();
            }
            }}/>

          <div className="mx-2">of</div>
          <div>{totPageNumaval}</div>
          </div>

          <div> <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handlenextaval()}>next</button> </div>
        </div>


          

        <div className="grid gap-4 mb-2">
          
          <div className="col-span-3 overflow-y-auto rounded-lg shadow-xs">

            <div className="text-lg font-semibold text-center mb-2">Registered Courses</div>

            <div className="bg-blue-50 p-4">

              <div className="grid grid-cols-10 justify-between items-center font-semibold mb-2">

                <div>Course ID</div>
                <div>Course Name</div>
                <div>Department</div>
                <div>Instructor</div>
                <div>Semester</div>
                <div>Slot</div>
                <div>Credits</div>
                <div>Elective</div>
                <div>Current Students</div>
                <div>Remove</div>

              </div>
              {regCourses.map((course) => (
                <div key={course.course_id} className="grid grid-cols-10 justify-between items-center mb-2">

                  <div onClick={() => handleCourseIdClick(course.course_id)} className="cursor-pointer">{course.course_id}</div>

                  <div>{course.coursename}</div>
                  <div>{course.department}</div>
                  <div>{course.instructor}</div>
                  <div>{course.semester}</div>
                  <div>{course.slot}</div>
                  <div>{course.credits}</div>
                  <div>{course.elective}</div>
                  <div>{course.current[0]}</div>

                  <div><button className="bg-red-500 text-white px-2 py-1 rounded-md text-sm" onClick={() => handleRemoveCourse(course.course_id)}>-</button></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center font-semibold mb-6">
          <div> <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handleprevreg()}>prev</button> </div>

          <div className="flex flex-row items-center">
            
            <input className="w-8 border-2" type="text" placeholder={pageNumreg}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
              handlepgnoreg();
            }
            }}/>

          <div className="mx-2">of</div>
          <div>{totPageNumreg}</div>
          </div>

          <div> <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handlenextreg()}>next</button> </div>
        </div>

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
