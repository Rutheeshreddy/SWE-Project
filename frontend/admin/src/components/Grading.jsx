import { useState } from "react";
import axios from "axios";

const handleStart = ()=>
{      
    let token = sessionStorage.getItem("token") 
       axios.get(import.meta.env.VITE_ADMIN+'grading/start',{
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
        }
    }).then((res)=>{
          if(res.data.status == 0) alert("Already started grading period")
          else alert("Succesfully started grading period")     
    }).catch((err)=>
    {
        console.log(err);
        console.log("There is some problem with the server or your internet, try again after some time")
    })

}

const handleStop = ()=>
{
    let token = sessionStorage.getItem("token") 
       axios.get(import.meta.env.VITE_ADMIN+'grading/stop',{
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
        }
    }).then((res)=>{
          if(res.data.status == 0) alert("Already stopped grading period")
          else alert("Succesfully stopped grading period")     
    }).catch((err)=>
    {
        console.log(err);
        console.log("There is some problem with the server or your internet, try again after some time")
    })
    
}

const Grading = ()=>
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

export default Grading;