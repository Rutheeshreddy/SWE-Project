import { useState,useEffect } from "react";

const SelCoursePopup = (props) => {
    const [start,setStart] = useState(false)

    useEffect(()=>
    {
    // fetch if it after the start of selection period
    axios.get(import.meta.env.VITE_ADMIN+"/added-course-details/"+props.course.course_id,
    {
            headers: {
              'Content-Type': "application/json",
              'Authorization': `Bearer ${token}`,
          }
    }
    ).then((res)=>
    {
             setStart(res.data.period)
             if(res.data.period)
             {
                setSlot(res.data.slot)
                setTeacherList(res.data.teachers)
                setTeacher(res.data.selected_teacher)
             }
    }).catch((err) => {
          
        console.log(err);
        setErrMsg("There is some problem with the server or your internet, try again after some time")
        })
    
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
        setTeacher(e.target.id)
    }
    const handleCancel = () => {
        props.setCoursemod(false)
    }
    const handleSubmit = (e) => {
          e.preventDefault()
          
          
          props.setCoursemod(false)
          props.setReload(props.reload+1)
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
                    <button type="submit" onClick={handleSubmit}>Modify</button>
                </form>
        </div>
        );

}

export default SelCoursePopup;