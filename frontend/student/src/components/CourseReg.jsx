import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

function Courseregpage(props) {

  const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    { id: 1, label: 'Department Elective', value: 'Departmental' },
    { id: 2, label: 'Free Elective', value: 'Free' },
    { id: 3, label: 'Additional', value: 'Additional' },
  ];

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const [regCourses, setRegCourses] = useState([]);
  const [avalCourses, setAvalCourses] = useState([]);
  
  const [showModal, setShowModal] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const modalRef = useRef(null);

  const [showChoice, setShowChoice] = useState(false)
  const radioRef = useRef(null)

  useEffect(() => {

    setRegCourses(props.regCourses);
    setAvalCourses(props.avalCourses);
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

  useEffect(() => {

    const handleOutsideClick = (event) => {
      if (radioRef.current && !radioRef.current.contains(event.target)) {
        setShowChoice(false);
      }
    };

    if (showChoice) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showChoice]);

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

  const handleDone = () =>{

    if(selectedOption !== null){

      console.log(selectedOption)

      const addedCourse = avalCourses.find(course => course.course_id === selectedCourseId);
      const updatedAvalCourses = avalCourses.filter(course => course.course_id !== selectedCourseId);
      setRegCourses([...regCourses, addedCourse]);
      setAvalCourses(updatedAvalCourses);
      setSelectedCourseId(null)
      setShowChoice(false)

      addedCourse.elective = selectedOption
    }    
  }

  const handleCancel = () =>{

    setSelectedCourseId(null)
    setShowChoice(false)  
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="w-full max-w-7xl">

        <div className="grid gap-4 mb-8">

          <div className="col-span-3 overflow-y-auto rounded-lg shadow-xs">

            <div className="text-lg font-semibold text-center mb-2">Available Courses</div>

            <div className="bg-blue-50 p-5">

              <div className="grid grid-cols-8 justify-between font-semibold items-center mb-2">

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
      </div>


      {showModal && (
        <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">

          <div ref={modalRef} className="bg-white p-4 rounded-md max-w-md overflow-y-auto">

            <h2 className="text-lg font-semibold mb-2">Course ID: {selectedCourseId}</h2>

            <div className="max-h-48 overflow-y-auto"><p>Course Information Course Information Course Information Course Information Course Information Course Information Course Information Course Information</p></div>

            <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {showChoice && (
              <div className="fixed inset-0 z-10 flex items-center justify-center bg-gray-500 bg-opacity-50">

              <div className="bg-white p-4 rounded-md max-w-md overflow-y-auto">

                <h2 className="text-lg font-semibold mb-2">{selectedCourseId} : Choose Elective Type</h2>

                <div className="flex justify-between items-center mb-4">

                  <select className="border rounded-md p-2" onChange={(e) => handleOptionChange(e.target.value)}>

                    <option value="">Select an option</option>
                    {options.map(option => (
                      <option key={option.id} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                  <div className="space-x-2">

                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => handleDone()}>Done</button>
                    <button className="bg-violet-500 text-white px-4 py-2 rounded-md" onClick={() => handleCancel()}>Cancel</button>

                  </div>
                </div>
              </div>
            </div>
            
            )}
    </div>
  );
}

export default Courseregpage;
