import { useState, useEffect } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

const handleStart = ()=>
{
    var token = sessionStorage.getItem('token');
    axios.post(import.meta.env.VITE_ADMIN+"registration/start",{},{
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${token}`,
      }
       }).then( (res) => {
        if(res.data.message == 1)
        {
            alert('Course-registration started');
        }
        else if (res.data.message == -1)
        {
            alert('Course-registration period is already active');
        }
        else if (res.data.message == -2)
        {
          alert('Course-registration can not be started');
        }
       }).catch((err) => {
        
        console.log(err);
        setErrMsg("There is some problem with the server or your internet, try again after some time")
        })

}

const handleStop = ()=>
{
    var token = sessionStorage.getItem('token');
  axios.post(import.meta.env.VITE_ADMIN+"registration/stop",{},{
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
    }
     }).then( (res) => {
      if (res.data.tokenStatus === 0) {
        window.location.href = import.meta.env.VITE_LOGIN
      }
      if(res.data.message == 1)
      {
          alert('Course-registration stopped');
      }
      else if (res.data.message == -1)
      {
        alert('course-registration did not start');
      }
     }).catch((err) => {
      
      console.log(err);
      setErrMsg("There is some problem with the server or your internet, try again after some time")
      })
    
}

const Registration = ()=>
{

  let token;
    const [regcourses, setregcourses] = useState([])

    useEffect(()=>
    {    
         token = sessionStorage.getItem("token") 
         //verify token
         axios.get(import.meta.env.VITE_ADMIN+"present-courses", {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {
            // console.log(res.data);
            
            if (res.data.tokenStatus == 0) {
                window.location.href = import.meta.env.VITE_LOGIN
            }

            if(res.data.status === 1){

              const regcoursestemp = res.data.courses.map(course => ({

                     courseName : course.name,
                     courseCode : course.course_id,
                     courseInstructor: course.instructor_id, 
                     slot : course.slot
              }))
              setregcourses(regcoursestemp);
            }
            
            }).catch((err) => {
            
            console.log(err);
            console.log("There is some problem with the server or your internet, try again after some time")
            })
       },[])
  
   return (
    <div>
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
      <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4 py-2" style={{ borderBottom: '2px solid #4CAF50' }}>Current Semester Curriculum</h1>
            <div className="bg-gray-200 text-gray-700 grid grid-cols-4 gap-4 p-3 my-3 rounded-md">
                <div className="font-semibold">Course Name</div>
                <div className="font-semibold">Course Code</div>
                <div className="font-semibold">Instructor</div>
                <div className="font-semibold">Slot</div>
            </div>
            {regcourses.length === 0 ? (
                <div className="text-gray-500 text-center">Data not available</div>
            ) : (
                regcourses.map((course) => (
                    <div key={course.courseCode}>
                        <Link to={`/course-details/${course.courseCode}`}
                            state={course}>
                            <div className={`grid grid-cols-4 gap-4 p-2 items-center 'bg-gray-100' 'hover:bg-gray-50' cursor-pointer`} style={{ borderBottom: '1px solid #ddd' }}>
                                <div>{course.courseName}</div>
                                <div>{course.courseCode}</div>
                                <div>{course.courseInstructor}</div>
                                <div>{course.slot}</div>
                            </div>
                        </Link>
                    </div>
                ))
            )}
        </div>
    </div>
   )
}

export default Registration;