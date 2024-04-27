import { useState } from "react";
import axios from "axios";

const handleStart = ()=>
{
    var token = sessionStorage.getItem('token');
    axios.post(import.meta.env.VITE_ADMIN+"feedback/start",{},{
        headers: {
          'Content-Type': "application/json",
          'Authorization': `Bearer ${token}`,
      }
       }).then( (res) => {
        if(res.data.message == 1)
        {
            alert('Course-Feedback started');
        }
        else if (res.data.message == -1)
        {
            alert('Course-Feedback period is already active');
        }
        else if (res.data.message == -2)
        {
          alert('Course-Feedback can not be started');
        }
       }).catch((err) => {
        
        console.log(err);
        setErrMsg("There is some problem with the server or your internet, try again after some time")
        })

}

const handleStop = ()=>
{
    var token = sessionStorage.getItem('token');
  axios.post(import.meta.env.VITE_ADMIN+"feedback/stop",{},{
      headers: {
        'Content-Type': "application/json",
        'Authorization': `Bearer ${token}`,
    }
     }).then( (res) => {
      if(res.data.message == 1)
      {
          alert('Course-Feedback stopped');
      }
      else if (res.data.message == -1)
      {
        alert('course-feedback did not start');
      }
     }).catch((err) => {
      
      console.log(err);
      setErrMsg("There is some problem with the server or your internet, try again after some time")
      })
    
}

const Feedback = ()=>
{

   return (
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
   )
}

export default Feedback;