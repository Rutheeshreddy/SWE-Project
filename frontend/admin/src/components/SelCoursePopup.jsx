import { useState,useEffect } from "react";

const SelCoursePopup = (props) => {
    const [start,setStart] = useState(false)

    useEffect(()=>
    {
    // fetch if it after the start of selection period
    
    
    },[]);

    const [courseId,setCourseId] = useState(props.course.course_id)
    const [courseName,setCourseName] = useState(props.course.coursename)
    const [credits,setCredits] = useState(props.course.credits)
    const [prereq,setPrereq] = useState(props.course.prereq)
    const [slot,setSlot] = useState("")
    const [teacherList,setTeacherList] = useState([])
    const [teacher,setTeacher] = useState("")
    const handleTeacherClick = (e) => 
    {

    }
        return (
        <div>
        <form  className="feedback-form p-4 bg-white rounded-lg shadow-md">
                    <div>Course Code</div> 
                    <input  type="text"  autoComplete="off"  onChange={(e) => setCourseId(e.target.value)}  value={courseId}
                    required className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <div>Course Name</div> 
                    <input  type="text"  autoComplete="off"  onChange={(e) => setCourseName(e.target.value)} value={courseName}
                    required  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <div>Course Credits</div> 
                    <input  type="text"  autoComplete="off"  onChange={(e) => setCredits(e.target.value)}  value={credits}
                    required  className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <div>Course Prerequisites</div> 
                    <input   type="text"   autoComplete="off"   onChange={(e) => setPrereq(e.target.value)} value={prereq}
                    required   className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
       {start && (
        <>
        <div>Selected Teacher</div>
        <div>{teacher.id}</div> <div>{teacher.name}</div>
        <div>
            <div className="grid grid-cols-3 justify-between font-semibold items-center mb-2">
            <div>Teacher ID</div>    <div> Name</div>   
            </div>
        {teacherList.map((teacher) => (

            <div key={teacher.id} className="grid grid-cols-4 justify-between items-center mb-2" >
            <div id={teacher.id} className="cursor-pointer">{teacher.id}</div>

            <div>{teacher.name}</div>

            <div><button className="bg-green-500 text-white px-2 py-1 rounded-md text-sm"  onClick={handleTeacherClick}>+</button></div>
            </div>
            ))}
        </div>
        <div>Slot</div> 
                    <input   type="text"   autoComplete="off"   onChange={(e) => setSlot(e.target.value)} value={slot}
                    required   className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                    />
        </>
       )}

                    <button type="button" onClick={handleCancel}>Cancel</button>
                    <button type="submit">Modify</button>
                </form>
        </div>
        );

}

export default SelCoursePopup;