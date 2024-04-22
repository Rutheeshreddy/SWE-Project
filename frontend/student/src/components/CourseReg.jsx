import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import CourseInfo from "./CourseInfo.jsx"
import ElectiveSelect from "./ElectiveSelect.jsx"
import Filters from "./Filters.jsx"


function Courseregpage() {

  const reg = [
    { id: 1, course_id: 'CS101', coursename:'Intro to Computers', instructor: 'John Doe', credits: 3, semester: 'Spring 2024', slot: 'N', current : [150, 200], elective: 'Free'},
    { id: 2, course_id: 'ENG201', coursename: 'English Grammar', instructor: 'Jane Smith', credits: 4, semester: 'Fall 2024', slot: 'Z', current: [31, 49], elective: 'Departmental'}
  ]
  
  const aval = [
    { id: 1, course_id: 'CS111', coursename: 'Comp Sci 4', instructor: 'John Villa', credits: 3, semester: 'Spring 2024', slot: 'J', current: [16, 100], elective: null},
    { id: 2, course_id: 'ENG281', coursename: 'English Intro', instructor: 'Jane Smith', credits: 4, semester: 'Fall 2024', slot: 'K', current: [25, 50], elective: null}
  ]

  const [regCourses, setRegCourses] = useState([]);
  const [avalCourses, setAvalCourses] = useState([]);

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

    setRegCourses(reg);
    setAvalCourses(aval);
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

    const removedCourse = regCourses.find(course => course.course_id === courseId);
    const updatedRegCourses = regCourses.filter(course => course.course_id !== courseId);
    setRegCourses(updatedRegCourses);
    setAvalCourses([...avalCourses, removedCourse])

  };

  const handleAddCourse = (courseId) => {

    setSelectedCourseId(courseId)
    setShowChoice(true)
  };

  const handleCourseIdClick = (courseId) => {
    setSelectedCourseId(courseId);
    setShowModal(true);
  };

  const handleprev = ()=>{


  }

  const handlepgno = ()=>{

    
  }

  const handlenext = ()=>{

    
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="w-full max-w-7xl">

        <div className="grid gap-4 mb-2">

          <div className="col-span-3 overflow-y-auto rounded-lg shadow-xs">

            <div className="text-lg font-semibold text-center mb-2">Available Courses</div>

            <div className="bg-blue-50 p-5">

              <Filters/>

              <div className="grid grid-cols-8 justify-between font-semibold items-center mb-1">

                <div>Course ID</div>
                <div>Course Name</div>
                <div>Instructor</div>
                <div>Semester</div>
                <div>Slot</div>
                <div>Credits</div>
                <div>Current Students</div>
                <div>Add</div>

              </div>

              {avalCourses.map((course) => (

                <div key={course.course_id} className="grid grid-cols-8 justify-between items-center mb-2">
                  <div onClick={() => handleCourseIdClick(course.course_id)} className="cursor-pointer">{course.course_id}</div>

                  <div>{course.coursename}</div>
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

          <div className="flex gap-2 justify-center font-semibold mb-6">
            <div><button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handleprev()}>prev</button></div>
            <div><button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handlepgno()}>1/6</button></div>
            <div><button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handlenext()}>next</button></div>
          </div>

        <div className="grid gap-4 mb-2">
          
          <div className="col-span-3 overflow-y-auto rounded-lg shadow-xs">

            <div className="text-lg font-semibold text-center mb-2">Registered Courses</div>

            <div className="bg-blue-50 p-4">

              <div className="grid grid-cols-9 justify-between items-center font-semibold mb-2">

                <div>Course ID</div>
                <div>Course Name</div>
                <div>Instructor</div>
                <div>Semester</div>
                <div>Slot</div>
                <div>Credits</div>
                <div>Elective</div>
                <div>Current Students</div>
                <div>Remove</div>

              </div>
              {regCourses.map((course) => (
                <div key={course.course_id} className="grid grid-cols-9 justify-between items-center mb-2">

                  <div onClick={() => handleCourseIdClick(course.course_id)} className="cursor-pointer">{course.course_id}</div>

                  <div>{course.coursename}</div>
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

        <div className="flex gap-2 justify-center font-semibold mb-2">
            <div><button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handleprev()}>prev</button></div>
            <div><button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handlepgno()}>1/6</button></div>
            <div><button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handlenext()}>next</button></div>
          </div>
      </div>


      {showModal && (
        <CourseInfo courseid = {selectedCourseId} showModal = {[showModal, setShowModal]} modalRef = {modalRef}/>
      )}

      {showChoice && (

        <ElectiveSelect updateshowchoice = {updateshowchoice} courseid = {selectedCourseId} regCourses = {regCourses} updateReg = {updateReg} avalCourses = {avalCourses} updatecourseid = {updatecourseid} updateAval = {updateAval}/>
            
      )}
    </div>
  );
}

export default Courseregpage;
