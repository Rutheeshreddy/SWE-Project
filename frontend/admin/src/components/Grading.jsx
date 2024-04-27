import { useState } from "react";
import axios from "axios";

const handleStart = ()=>
{


}

const handleStop = ()=>
{

    
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