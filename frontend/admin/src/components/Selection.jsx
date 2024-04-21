import PropCourseList from "./PropCourseList"
import { useState } from "react";

const Selection = () => 
{
const [addCourse,setAddCourse] = useState(false)

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
  <div className="flex flex-row mt-4 md:mt-0">
    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
      Add a course +
    </button>
  </div>
  <div className="mt-4 md:mt-0">
    <PropCourseList />
  </div>

</div>
);
}

export default Selection;