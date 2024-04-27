import React, { useState, useEffect } from "react";
import CourseDetails from "./CourseDetails";
import axios from "axios";

const RegisteredCourses = () => {
    const [semCourseArr, setSemCourseArr] = useState([]);

    useEffect(() => {

        var token = sessionStorage.getItem("token");
        axios.get(import.meta.env.VITE_STUDENT+"past-and-present-courses/",
        {
        headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
        }
        }).then( (res) =>{

            const temp = [];
            const keymap = {};

            res.data.courses.forEach(obj => {
                const key = obj.year + '_' + obj.semester;
                if (!keymap[key]) {
                    keymap[key] = { year: obj.year, sem: obj.semester, courses: [] };
                    temp.push(keymap[key]);
                }
                keymap[key].courses.push({ courseName: obj.name , courseCode: obj.course_id, electiveType: obj.elective, instructor: obj.instructor_name, grade: obj.grade, credits: obj.credits});
            });

            setSemCourseArr(temp)            
        
        }).catch((err) => {

        console.log(err);
        setErrMsg("There is some problem with the server or your internet, try again after some time")
        })
        
    }, []);

    // Use an object to store open courses for each semester
    const [openCourses, setOpenCourses] = useState({});

    const toggleDetails = (semester, courseCode) => {
        setOpenCourses(prevOpenCourses => ({
            ...prevOpenCourses,
            [semester]: prevOpenCourses[semester] === courseCode ? null : courseCode
        }));
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-semibold mb-6 text-center">Registered Courses</h1>
            {semCourseArr.map((semeach) => (
                <div key={`${semeach.sem}-${semeach.year}`} className="bg-white rounded-lg shadow-md mb-8">
                    <h1 className="text-xl font-bold mb-4 py-2 px-4 border-b-2 border-green-500 bg-gray-200">{`Semester: ${semeach.sem}, Year: ${semeach.year}`}</h1>
                    <div className="grid grid-cols-3 gap-4 p-3 my-3 bg-gray-100">
                        <div className="font-semibold">Course Name</div>
                        <div className="font-semibold">Course Code</div>
                        <div className="font-semibold">Elective Type</div>
                    </div>

                    {semeach.courses.map((course) => (
                        <div key={course.courseCode}>
                            <div className={`grid grid-cols-3 gap-4 p-4 items-center ${openCourses[semeach.sem] === course.courseCode ? 'bg-gray-200' : 'hover:bg-gray-50'} cursor-pointer border-b border-gray-200`} onClick={() => toggleDetails(semeach.sem, course.courseCode)}>
                                <div>{course.courseName}</div>
                                <div>{course.courseCode}</div>
                                <div>{course.electiveType}</div>
                            </div>
                            <div style={{
                                maxHeight: openCourses[semeach.sem] === course.courseCode ? '500px' : '0',
                                overflow: 'hidden',
                                transition: 'max-height 0.5s ease-in-out'
                            }}>
                                {openCourses[semeach.sem] === course.courseCode && (
                                    <div className="p-4 mt-2 bg-white border-l-4 border-green-500">
                                        <CourseDetails course={course} />
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default RegisteredCourses;
