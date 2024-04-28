// import React, {useState, useEffect} from "react";
// import {Link} from "react-router-dom";
// import ViewPastCourseDetails from "./ViewPastCourseDetails";

// const TaughtCoursesPage = () => {
//     const [semCourseArr, setSemCourseArr] = useState([]);
//     const [isDetailsVisible, setIsDetailsVisible] = useState(false);

//     useEffect(() => {
//         // axios.get("your_api_endpoint_here")
//         //     .then((res) => {
//         //         setSemCourseArr(res.data);
//         //     })
//         //     .catch((err) => {
//         //         console.log(err);
//         //     });

//         const r1 = { courseName: "Deep Learning", courseCode: "AI1100", sem: "1", year: "2021", slot: "P", gpa: "9.5", rating1: "3.5", rating2: "4", rating3: "4.5"};
//         const r2 = { courseName: "Machine Learning", courseCode: "AI1000", sem: "1", year: "2021", slot: "Q", gpa: "9.5", rating1: "3.5", rating2: "4", rating3: "4.5"};
//         const s1 = { sem: "1", year: "2021", courses: [r1, r2]}
//         const s2 = { sem: "2", year: "2021", courses: [r1, r2]}
//         const arr = [s1, s2];
//         setSemCourseArr(arr);
//     }, []);

//     return (
//         <div className="max-w-4xl mx-auto px-4">
//             <h1 className="text-3xl font-semibold mb-6 text-center">Past Courses</h1>
//             {semCourseArr.map((semeach) => (
//                 <div key={`${semeach.sem}-${semeach.year}`} className="bg-white rounded-lg shadow-md mb-8">
//                     <h1 className="text-xl font-bold mb-4 py-2 px-4 border-b-2 border-green-500 bg-gray-200">{`Semester: ${semeach.sem}, Year: ${semeach.year}`}</h1>
//                     <div className="grid grid-cols-3 gap-4 p-3 my-3 bg-gray-100">
//                         <div className="font-semibold">Course Name</div>
//                         <div className="font-semibold">Course Code</div>
//                         <div className="font-semibold">Slot</div>
//                     </div>

//                     {semeach.courses.map((course) => (
//                         <div key={course.courseCode}>
//                             {/* <Link
//                                 to={{
//                                     pathname: "/past-course-details",
//                                     state: { course: course }
//                                 }}
//                                 className="grid grid-cols-3 gap-4 p-2 items-center hover:bg-gray-50 cursor-pointer"
//                             >
//                                 <div>{course.courseName}</div>
//                                 <div>{course.courseCode}</div>
//                                 <div>{course.slot}</div>
//                             </Link> */}
//                             <div
//                                 className="grid grid-cols-3 gap-4 p-2 items-center hover:bg-gray-50 cursor-pointer" 
//                                 onClick={() => setIsDetailsVisible(true)}
//                             >
//                                 <div>{course.courseName}</div>
//                                 <div>{course.courseCode}</div>
//                                 <div>{course.slot}</div>
//                             </div>
//                             {isDetailsVisible && 
//                                 <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start pt-10">
//                                     <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-auto my-4 overflow-auto" style={{ maxHeight: "80vh", maxWidth: "80vw" }}>
//                                         <ViewPastCourseDetails
//                                             course={course}
//                                             onClose={() => setIsDetailsVisible(false)}
//                                         />
//                                     </div>
//                                 </div>
//                             }
//                         </div>
//                     ))}
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default TaughtCoursesPage;

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ViewPastCourseDetails from "./ViewPastCourseDetails";
import axios from "axios";

const TaughtCoursesPage = () => {
    const { id } = useParams();
    // console.log(id);
    const [semCourseArr, setSemCourseArr] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    useEffect(() => {
        var token = sessionStorage.getItem('token');
        axios.get(import.meta.env.VITE_TEACHER+"taught-courses/" + id, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {

            if (res.data.tokenStatus === 0) {
                window.location.href = import.meta.env.VITE_LOGIN
            }
            
            console.log("Ok, verify is working")

            if(res.data.status === 1){

                setSemCourseArr(res.data.courses);
            }
            
            }).catch((err) => {
            
            console.log(err);
            console.log("There is some problem with the server or your internet, try again after some time")
            })
    }, []);

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
    };

    const handleClose = () => {
        setSelectedCourse(null);
    };

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-semibold mb-6 text-center">Past Courses</h1>
            {semCourseArr.map((semeach) => (
                <div key={`${semeach.sem}-${semeach.year}`} className="bg-white rounded-lg shadow-md mb-8">
                    <h1 className="text-xl font-bold mb-4 py-2 px-4 border-b-2 border-green-500 bg-gray-200">{`Semester: ${semeach.sem}, Year: ${semeach.year}`}</h1>
                    <div className="grid grid-cols-2 gap-4 p-3 my-3 bg-gray-100">
                        <div className="font-semibold">Course Name</div>
                        <div className="font-semibold">Course Code</div>
                    </div>

                    {semeach.courses.map((course) => (
                        <div key={course.course_id}>
                            <div
                                className="grid grid-cols-2 gap-4 p-2 items-center hover:bg-gray-50 cursor-pointer"
                                onClick={() => handleCourseClick(course)}
                            >
                                <div>{course.name}</div>
                                <div>{course.course_id}</div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
            {selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full mx-auto overflow-auto">
                        <ViewPastCourseDetails course={selectedCourse} onClose={handleClose} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default TaughtCoursesPage;

