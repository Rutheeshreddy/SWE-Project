import React from "react";
import { Link } from "react-router-dom";

const TeachingCourses = (props) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h1 className="text-xl font-bold mb-4 py-2" style={{ borderBottom: '2px solid #4CAF50' }}>Current Semester Curriculum</h1>
            <div className="bg-gray-200 text-gray-700 grid grid-cols-3 gap-4 p-3 my-3 rounded-md">
                <div className="font-semibold">Course Name</div>
                <div className="font-semibold">Course Code</div>
                <div className="font-semibold">Slot</div>
            </div>

            {props.courses.length === 0 ? (
                <div className="text-gray-500 text-center">Data not available</div>
            ) : (
                props.courses.map((course) => (
                    <div key={course.courseCode}>
                        <Link to={`/course-details/${course.courseCode}`}>
                            <div className={`grid grid-cols-3 gap-4 p-2 items-center 'bg-gray-100' 'hover:bg-gray-50' cursor-pointer`} style={{ borderBottom: '1px solid #ddd' }}>
                                <div>{course.courseName}</div>
                                <div>{course.courseCode}</div>
                                <div>{course.slot}</div>
                            </div>
                        </Link>
                    </div>
                ))
            )}
        </div>
    );
};

export default TeachingCourses;
