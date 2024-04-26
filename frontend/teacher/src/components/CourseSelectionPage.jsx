import React, { useEffect, useState, useRef } from "react";
import SelectionFilters from "./SelectionFilters";
import axios from "axios"


function Courseregpage() {

  const [selCourses, setSelCourses] = useState([]);
  const [avalCourses, setAvalCourses] = useState([]);

  const [totPageNumsel, setTotPageNumsel] = useState(0)
  const [displayNumsel, setDisplayNumsel] = useState(1)
  const [pageNumsel, setPageNumsel] = useState(1)

  const [totPageNumaval, setTotPageNumaval] = useState(0)
  const [displayNumAval, setDisplayNumAval] = useState(1)
  const [pageNumaval, setPageNumaval] = useState(1)

  useEffect(() => {

    // setDisplayNumAval(pageNumaval)

    // var token = sessionStorage.getItem("token");
    // axios.get(import.meta.env.VITE_ADMIN+"//" + pageNumaval,{
    //   headers: {
    //     'Content-Type': "application/json",
    //     'Authorization': `Bearer ${token}`,
    //   }
    // }).then( (res) =>{

    //   setTotPageNumaval(res.data.totPageNumaval)
    //   setAvalCourses(res.data.courses)
    // }).catch((err) => {

    //   console.log(err);
    //   setErrMsg("There is some problem with the server or your internet, try again after some time")
    // })
  }, [pageNumaval]);

  useEffect(() => {

    // setDisplayNumSel(pageNumsel)
    // var token = sessionStorage.getItem("token");
    // axios.get(import.meta.env.VITE_ADMIN+"//" + pageNumsel,{
    //   headers: {
    //     'Content-Type': "application/json",
    //     'Authorization': `Bearer ${token}`,
    //   }
    // }).then( (res) =>{

    //   setTotPageNumsel(res.data.totPageNumsel)
    //   setSelCourses(res.data.courses)
    // }).catch((err) => {

    //   console.log(err);
    //   setErrMsg("There is some problem with the server or your internet, try again after some time")
    // })
  }, [pageNumsel]);



  const handleRemoveCourse = (courseId) => {

    const updatedselCourses = selCourses.filter(course => course.course_id !== courseId);
    setSelCourses(updatedselCourses);
  };

  const handleAddCourse = (courseId) => {

    const addedCourse = avalCourses.find(course => course.course_id === CourseId);
    const courseclashing = (selCourses.filter(course =>course.course_id === CourseId)).length

    if(!courseclashing){

        updateReg([...selCourses, addedCourse]);           
    }

    
  };

  const [filters, setFilters] = useState({
    courseId: "",
    courseName: "",
    department: "",
    semester: "",
    credits: ""
  });

  const updatefilters = (filters) =>{
    setFilters(filters)
  }

  const handleprevsel = ()=>{

    if(pageNumsel > 1) setPageNumsel(pageNumsel - 1);
  }

  const handleprevaval = ()=>{

    if(pageNumaval > 1) setPageNumaval(pageNumaval - 1);
  }

  const handlepgnosel = ()=>{

    if(displayNumsel >= 1 && displayNumSel <= totPageNumsel)
      setPageNumsel(displayNumSel);

    else {
      setPageNumsel(totPageNumsel);
      setDisplayNumSel(totPageNumsel);
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

  const handlenextsel = ()=>{

    if(pageNumsel < totPageNumsel) setPageNumsel(pageNumsel + 1);
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

              <SelectionFilters filters = {filters} updatefilters = {updatefilters} Courselist = {avalCourses} updatecourselist = {setAvalCourses}/>

              <div className="grid grid-cols-6 justify-between font-semibold items-center mb-1">

                <div>Course ID</div>
                <div>Course Name</div>
                <div>Department</div>
                <div>Semester</div>
                <div>Credits</div>
                <div>Add</div>

              </div>

              {avalCourses.map((course) => (

                <div key={course.course_id} className="grid grid-cols-6 justify-between items-center mb-2">
                  <div onClick={() => handleCourseIdClick(course.course_id)} className="cursor-pointer">{course.course_id}</div>

                  <div>{course.coursename}</div>
                  <div>{course.department}</div>
                  <div>{course.semester}</div>
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

              <div className="grid grid-cols-6 justify-between items-center font-semibold mb-2">

                <div>Course ID</div>
                <div>Course Name</div>
                <div>Department</div>
                <div>Semester</div>
                <div>Credits</div>
                <div>Remove</div>

              </div>
              {selCourses.map((course) => (
                <div key={course.course_id} className="grid grid-cols-6 justify-between items-center mb-2">

                  <div onClick={() => handleCourseIdClick(course.course_id)} className="cursor-pointer">{course.course_id}</div>

                  <div>{course.coursename}</div>
                  <div>{course.department}</div>
                  <div>{course.semester}</div>
                  <div>{course.credits}</div>

                  <div><button className="bg-red-500 text-white px-2 py-1 rounded-md text-sm" onClick={() => handleRemoveCourse(course.course_id)}>-</button></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 justify-center font-semibold mb-6">
          <div> <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handleprevsel()}>prev</button> </div>

          <div className="flex flex-row items-center">
            
            <input className="w-8 border-2" type="text" placeholder={pageNumsel}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
              handlepgnosel();
            }
            }}/>

          <div className="mx-2">of</div>
          <div>{totPageNumsel}</div>
          </div>

          <div> <button className="bg-blue-500 text-white px-2 py-1 rounded-md text-sm" onClick={()=>handlenextsel()}>next</button> </div>
        </div>

      </div>

    </div>
  );
}

export default Courseregpage;
