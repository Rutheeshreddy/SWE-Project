import React, { useState } from "react";
import CourseDetails from "./CourseDetails";

const SemRegisteredCourses = (props) => {
    const [openCourse, setOpenCourse] = useState(null);

    const toggleDetails = (courseCode) => {
        if (openCourse === courseCode) {
            setOpenCourse(null);
        } else {
            setOpenCourse(courseCode);
        }
    };

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4 py-2" style={{ borderBottom: '2px solid #4CAF50' }}>Current Semester Curriculum</h1>
            <div className="bg-gray-200 text-gray-700 grid grid-cols-3 gap-4 p-3 my-3 rounded-md">
                <div className="font-semibold">Course Name</div>
                <div className="font-semibold">Course Code</div>
                <div className="font-semibold">Elective Type</div>
            </div>

            {props.courses.map((course) => (
                <div key={course.courseCode}>
                    <div className={`grid grid-cols-3 gap-4 p-2 items-center ${openCourse === course.courseCode ? 'bg-gray-100' : 'hover:bg-gray-50'} cursor-pointer`} onClick={() => toggleDetails(course.courseCode)} style={{ borderBottom: '1px solid #ddd' }}>
                        <div>{course.courseName}</div>
                        <div>{course.courseCode}</div>
                        <div>{course.electiveType}</div>
                    </div>
                    <div style={{
                        maxHeight: openCourse === course.courseCode ? '500px' : '0',
                        overflow: 'hidden',
                        transition: 'max-height 0.5s ease-in-out'
                    }}>
                        {openCourse === course.courseCode && (
                            <div className="p-4 mt-2 bg-white border-l-4 border-green-500">
                                {/* <p>Details about {course.courseName}</p>
                                <p>Details about {course.courseName}</p>
                                <p>Details about {course.courseName}</p>
                                <p>Details about {course.courseName}</p>
                                <p>Details about {course.courseName}</p> */}
                                <CourseDetails course = {course} />
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SemRegisteredCourses;
