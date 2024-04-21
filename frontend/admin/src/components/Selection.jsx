import PropCourseList from "./PropCourseList"
import { useState } from "react";

const Selection = () => 
{
const [addCourse,setAddCourse] = useState(false)

const handleSubmit = (e)=>
{

}
const handleCancel = (e)=>
{
   setAddCourse(false)
}

return (
<div className="grid grid-cols-1">

  <div className="flex flex-row">
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Start
    </button>
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
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
                            <div>Course Code</div> <input type="text"></input><div>Course Name</div> <input type="text"></input>
                            <div>Course Credits</div> <input type="text"></input><div>Course Prerequisites</div> <input type="text"></input>
                            <button type="button" onClick={handleCancel}>Cancel</button>
                            <button type="submit">Submit</button>
                         </form>
                    </div>
                </div>
    )}
    
  </div>
  <div className="mt-4 md:mt-0">
    <PropCourseList />
  </div>

</div>
);
}

export default Selection;