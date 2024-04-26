import PropCourseList from "./PropCourseList"
import { useState,useEffect } from "react";
import axios from 'axios'

const Selection = () => 
{
const [addCourse,setAddCourse] = useState(false)
const [courseId,setCourseId] = useState("")
const [courseName,setCourseName] = useState("")
const [credits,setCredits] = useState('')
const [prereq,setPrereq] = useState("")
const [token,setToken] = useState("")
const [reload,setReload] = useState(1);

const handleSubmit = (e)=>
{
  e.preventDefault();
  setAddCourse(false) ;
  var token = sessionStorage.getItem('token');
  axios.post(import.meta.env.VITE_ADMIN+"add-course", {
              course_id:courseId,  name:courseName,
              credits:credits,  prereq: prereq
               },{
                headers: {
                  'Content-Type': "application/json",
                  'Authorization': `Bearer ${token}`,
              }
               }).then( (res) => {
                  if(res.data.message == 1)
                  {
                    alert('Success');
                  }
                  else 
                  {
                    alert('Failure');
                  }
                  setReload( (reload+1) % 2);
                  setCourseId('');
                  setCourseName('');
                  setCredits('');
                  setPrereq('');
               }).catch((err) => {
                
                console.log(err);
                setErrMsg("There is some problem with the server or your internet, try again after some time")
                })
}
const handleCancel = (e)=>
{
   setAddCourse(false)
   setCourseId('');
   setCourseName('');
   setCredits('');
   setPrereq('');
}

const handleStart = ()=>
{
  var token = sessionStorage.getItem('token');
  axios.post(import.meta.env.VITE_ADMIN+"course-selection/start",{},{
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
    }
     }).then( (res) => {
      if(res.data.message == 1)
      {
          alert('Course-selection started');
      }
      else if (res.data.message == -1)
      {
          alert('Course-selection period is already active');
      }
      else if (res.data.message == -2)
      {
        alert('Course-selection period can not be started because course-registration is active');
      }
     }).catch((err) => {
      
      console.log(err);
      setErrMsg("There is some problem with the server or your internet, try again after some time")
      })
}

const handleStop = ()=>
{
  var token = sessionStorage.getItem('token');
  axios.post(import.meta.env.VITE_ADMIN+"course-selection/stop",{},{
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
    }
     }).then( (res) => {
      if(res.data.message == 1)
      {
          alert('Course-selection stopped');
      }
      else if (res.data.message == -1)
      {
          alert('Some courses are pending');
          console.log(res.data.courses);
      }
      else if (res.data.message == -2)
      {
        alert('course-selection did not start');
      }
     }).catch((err) => {
      
      console.log(err);
      setErrMsg("There is some problem with the server or your internet, try again after some time")
      })
}

useEffect(()=>
{
    var token = sessionStorage.getItem("token");
    setToken(token);
    
},[])

return (
<div className="grid grid-cols-1">

  <div className="flex flex-row">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
    onClick={handleStart} >
      Start
    </button>
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
     onClick={handleStop} >
      Stop
    </button>
  </div>
  <div className="flex flex-col mt-4 md:mt-0">
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{setAddCourse(true)}}>
      Add a course +
    </button>
    {addCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-auto my-4 overflow-auto" style={{ maxHeight: "80vh", maxWidth: "80vw" }}>
                        
                         <form onSubmit={handleSubmit} className="feedback-form p-4 bg-white rounded-lg shadow-md">
                            <div>Course Code</div> <input
                            type="text"
                            autoComplete="off"
                            onChange={(e) => setCourseId(e.target.value)}
                            value={courseId}
                            required
                            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                          /><div>Course Name</div> <input
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setCourseName(e.target.value)}
                          value={courseName}
                          required
                          className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                            <div>Course Credits</div> <input
                            type="text"
                            autoComplete="off"
                            onChange={(e) => setCredits(e.target.value)}
                            value={credits}
                            required
                            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                          /><div>Course Prerequisites</div> <input
                          type="text"
                          autoComplete="off"
                          onChange={(e) => setPrereq(e.target.value)}
                          value={prereq}
                          required
                          className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                        />
                            <button type="button" onClick={handleCancel}>Cancel</button>
                            <button type="submit">Submit</button>
                         </form>
                    </div>
                </div>
    )}
    
  </div>
  <div className="mt-4 md:mt-0">
    <PropCourseList reload = {reload} setReload = {setReload} />
  </div>

</div>
);
}

export default Selection;