import React, { useState, useEffect } from "react";
import CourseDetails from "./CourseDetails";

const RegisteredCourses = () => {
    const [semCourseArr, setSemCourseArr] = useState([]);

    useEffect(() => {
        // axios.get("your_api_endpoint_here")
        //     .then((res) => {
        //         setSemCourseArr(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        const r1 = { courseName: "Deep Learning", courseCode: "AI1100", electiveType: "Departmental" };
        const r2 = { courseName: "Machine Learning", courseCode: "AI1000", electiveType: "Additional" };
        const s1 = { sem: "1", year: "2021", courses: [r1, r2]}
        const s2 = { sem: "2", year: "2021", courses: [r1, r2]}
        const arr = [s1, s2];
        setSemCourseArr(arr);
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
