import React, { useEffect, useState, useRef } from "react";
import Filters from "./Filters.jsx"

function CourseListReg(){

    const [filters, setFilters] = useState({
        courseId: "",
        courseName: "",
        department: "",
        instructor: "",
        semester: "",
        slot: "",
        credits: ""
    });
    
    const updatefilters = (filters) =>{
        setFilters(filters)
    }


    return(

        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-7xl">
                <div className="grid gap-4 mb-2">
                    <div className="col-span-3 overflow-y-auto rounded-lg shadow-xs">
                        <div className="text-lg font-semibold text-center mb-2">List of all Courses</div>
                        <div className="bg-blue-50 p-5">
                            <Filters filters = {filters} updatefilters = {updatefilters} Courselist = {avalCourses} updatecourselist = {setAvalCourses}/>
                            <div className="grid grid-cols-9 justify-between font-semibold items-center mb-1">

                                <div>Course ID</div>
                                <div>Course Name</div>
                                <div>Department</div>
                                <div>Instructor</div>
                                <div>Semester</div>
                                <div>Slot</div>
                                <div>Credits</div>
                                <div>Current Students</div>
                                <div>Remove</div>

                            </div>

                            {avalCourses.map((course) => (

                                <div key={course.course_id} className="grid grid-cols-9 justify-between items-center mb-2">
                                <div onClick={() => handleCourseIdClick(course.course_id)} className="cursor-pointer">{course.course_id}</div>

                                <div>{course.coursename}</div>
                                <div>{course.department}</div>
                                <div>{course.instructor}</div>
                                <div>{course.semester}</div>
                                <div>{course.slot}</div>
                                <div>{course.credits}</div>
                                <div>{course.current[0]}</div>

                                <div><button className="bg-green-500 text-white px-2 py-1 rounded-md text-sm" onClick={() => handleAddCourse(course.course_id)}>+</button></div>
                                </div>
                            ))}

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

    
}

export default CourseListReg;