import React, { useEffect, useState, useRef } from "react";
import SelectionFilters from "./SelectionFilters";
import axios from "axios"
import { useParams } from "react-router-dom";

const  CourseSelectionPage = () => {

  const [selCourses, setSelCourses] = useState([]);
  const [avalCourses, setAvalCourses] = useState([]);

  const [totPageNumaval, setTotPageNumaval] = useState(0)
  const [displayNumAval, setDisplayNumAval] = useState(1)
  const [pageNumaval, setPageNumaval] = useState(1)

  const [filters, setFilters] = useState({
    courseId: "",
    courseName: "",
  });

  const { id } = useParams();

  useEffect(() => {


    setDisplayNumAval(pageNumaval);

    var token = sessionStorage.getItem("token");
    axios.post(import.meta.env.VITE_TEACHER+"available-courses/" + pageNumaval, {
        filters : filters 
    },{
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
      }
    }).then( (res) =>{

      if (res.data.tokenStatus === 0) {
        window.location.href = import.meta.env.VITE_LOGIN
      }
      
      if(res.data.status == 1) {
        setTotPageNumaval(res.data.totPages)
        setAvalCourses(res.data.courses)
      }

    }).catch((err) => {

      console.log(err);
      setErrMsg("There is some problem with the server or your internet, try again after some time")
    })
  }, [pageNumaval]);

  useEffect(() => {

    var token = sessionStorage.getItem("token");
    axios.get(import.meta.env.VITE_TEACHER+"selected-courses",
    {
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
      }
    }).then( (res) =>{

      if (res.data.tokenStatus === 0) {
        window.location.href = import.meta.env.VITE_LOGIN
      }

      if(res.data.status == 1) setSelCourses(res.data.courses)

      
    }).catch((err) => {

      console.log(err);
      setErrMsg("There is some problem with the server or your internet, try again after some time")
    })
  }, []);

  const handleRemoveCourse = (courseId) => {

    const updatedselCourses = selCourses.filter(course => course.course_id !== courseId);
    setSelCourses(updatedselCourses);
  };
  const updateReg = (updatedlist) => {

    setSelCourses(updatedlist)
  }

  const handleAddCourse = (courseId) => {

    const addedCourse = avalCourses.find(course => course.course_id === courseId);
    const courseclashing = (selCourses.filter(course =>course.course_id === courseId)).length

    if(!courseclashing){

        updateReg([...selCourses, addedCourse]);           
    }

    else {
      alert('You already selected the course');
    }

    
  };

  const handleRegister = () =>{

    var token = sessionStorage.getItem("token");
    axios.post(import.meta.env.VITE_TEACHER+"register-courses/",
    {
      regCourses: selCourses
    },{
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
      }
    }).then( (res) =>{

      if (res.data.tokenStatus === 0) {
        window.location.href = import.meta.env.VITE_LOGIN
      }

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

  const updatefilters = (filters) =>{
    setFilters(filters)
    // console.log(filters);
  }


  const handleprevaval = ()=>{

    if(pageNumaval > 1) setPageNumaval(pageNumaval - 1);
    setDisplayNumAval(pageNumaval);
  }


  const handlepgnoaval = ()=>{

    if(displayNumAval >= 1 && displayNumAval <= totPageNumaval)
      setPageNumaval(displayNumAval);

    else {
      setPageNumaval(totPageNumaval);
      setDisplayNumAval(totPageNumaval);
    }   
  }


  const handlenextaval = ()=>{

    if(pageNumaval < totPageNumaval) setPageNumaval(pageNumaval + 1);
    setDisplayNumAval(pageNumaval);
  }

  return (
    <div className="flex justify-center items-center h-screen">

      <div className="w-full max-w-7xl">

        <div className="grid gap-4 mb-2">

          <div className="col-span-3 overflow-y-auto rounded-lg shadow-xs">

            <div className="text-lg font-semibold text-center mb-2">Available Courses</div>

            <div className="bg-blue-50 p-5">

              <SelectionFilters filters = {filters} updatefilters = {updatefilters} setTotPageNumaval = {setTotPageNumaval} updatecourselist = {setAvalCourses}/>

              <div className="grid grid-cols-4 justify-between font-semibold items-center mb-1">

                <div>Course ID</div>
                <div>Course Name</div>
                <div>Credits</div>
                <div>Add</div>

              </div>

              {avalCourses.map((course) => (

                <div key={course.course_id} className="grid grid-cols-4 justify-between items-center mb-2">
                  <div onClick={() => handleCourseIdClick(course.course_id)} className="cursor-pointer">{course.course_id}</div>

                  <div>{course.name}</div>
                  <div>{course.credits}</div>

                  <div><button className="bg-green-500 text-white px-2 py-1 rounded-md text-sm" onClick={() => handleAddCourse(course.course_id)}>+</button></div>
                </div>
              ))}

            </div>
          </div>

        </div>

        <div className="flex gap-3 justify-center font-semibold mb-6">
          <div> <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handleprevaval()}>prev</button> </div>

          <div className="flex flex-row items-center">
            
            <input className="w-8 border-2" type="text" value={displayNumAval}
            onChange={(e) => setDisplayNumAval(e.target.value)} 
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

            <div className="text-lg font-semibold text-center mb-2">Selected Courses</div>

            <div className="bg-blue-50 p-4">

              <div className="grid grid-cols-4 justify-between items-center font-semibold mb-2">

                <div>Course ID</div>
                <div>Course Name</div>
                <div>Credits</div>
                <div>Remove</div>

              </div>
              {selCourses.map((course) => (
                <div key={course.course_id} className="grid grid-cols-4 justify-between items-center mb-2">

                  <div onClick={() => handleCourseIdClick(course.course_id)} className="cursor-pointer">{course.course_id}</div>

                  <div>{course.name}</div>
                  <div>{course.credits}</div>

                  <div><button className="bg-red-500 text-white px-2 py-1 rounded-md text-sm" onClick={() => handleRemoveCourse(course.course_id)}>-</button></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className = "flex justify-center mt-6"><button className="bg-red-500 text-white px-2 py-1 rounded-md text-sm" onClick = {() => handleRegister()}> Register</button></div>

      </div>

    </div>
  );
}

export default CourseSelectionPage;
