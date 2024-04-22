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
    
        return (
        <div>
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
                                    <button type="submit">Modify</button>
                                </form>
        </div>
        );

}

export default SelCoursePopup;