import React from "react";

const ViewPastCourseDetails = ({ course, onClose }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Course Details</h2>
                <div className="mb-4">
                    <p className="text-lg font-semibold">Course Name:</p>
                    <p>{course.courseName}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg font-semibold">Course Code:</p>
                    <p>{course.courseCode}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg font-semibold">Semester:</p>
                    <p>{course.semester}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg font-semibold">Slot:</p>
                    <p>{course.slot}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg font-semibold">GPA:</p>
                    <p>{course.gpa}</p>
                </div>
                <div className="mb-4">
                    <p className="text-lg font-semibold">Ratings:</p>
                    <p>Rating 1: {course.rating1}</p>
                    <p>Rating 2: {course.rating2}</p>
                    <p>Rating 3: {course.rating3}</p>
                </div>
                <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">Close</button>
            </div>
        </div>
    );
};

export default ViewPastCourseDetails;
