import React from "react";

const SemRegisteredCourses = (props) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            <h1 className="text-xl font-bold mb-4">Current Semester Curriculum</h1>
            <div className="grid grid-cols-3 gap-4">
                <div className="font-semibold">Course Name</div>
                <div className="font-semibold">Course Code</div>
                <div className="font-semibold">Elective Type</div>

                {props.courses.map(course => (
                    <React.Fragment key={course.courseCode}>
                        <div>{course.courseName}</div>
                        <div>{course.courseCode}</div>
                        <div>{course.electiveType}</div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
};

export default SemRegisteredCourses;
