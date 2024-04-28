import React, { useEffect, useState } from "react";
import FeedbackForm from "./FeedbackForm"; 
import axios from "axios";

const CourseFeedbackPage = () => {
    const [courseArr, setCourseArr] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showFeedbackForm, setShowFeedbackForm] = useState(false);

    useEffect(() => {

        var token = sessionStorage.getItem("token") 
        axios.get(import.meta.env.VITE_STUDENT+"pending-feedback", {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {

            if (res.data.tokenStatus === 0) {
                window.location.href = import.meta.env.VITE_LOGIN
            }

            if(res.data.status == 1){

                var temp = res.data.courses.map(course =>({

                    courseName : course.name,
                    courseCode : course.course_id,
                    courseInstructor : course.instructor_name,
                    courseInstructorId : course.instructor_id
                }))

                setCourseArr(temp)
            }           
    
            
        }).catch((err) => {
        
        console.log(err);
        console.log("There is some problem with the server or your internet, try again after some time")
        })
    }, []);

    const removeFromCourseArr = (courseToRemove) => {
        setCourseArr((prevCourseArr) =>
            prevCourseArr.filter((course) => course.courseCode !== courseToRemove.courseCode)
        );
    };

    const handleCourseClick = (course) => {
        setSelectedCourse(course);
        setShowFeedbackForm(true);
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold mb-6 flex justify-center items-center h-full">Course Feedback Submission</h1>
                <h3 className="text-2xl font-semibold mb-2 text-gray-800">Pending Submissions</h3>
                <div className="grid grid-cols-3 gap-4 mb-2 bg-white p-3 rounded-md">
                    <div className="font-semibold">Course Name</div>
                    <div className="font-semibold">Course Code</div>
                    <div className="font-semibold">Instructor</div>
                </div>
                <div>
                    {courseArr.map((course) => (
                        <div
                            key={course.courseCode}
                            className="grid grid-cols-3 gap-4 p-4 bg-white rounded-md cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => handleCourseClick(course)}
                        >
                            <div>{course.courseName}</div>
                            <div>{course.courseCode}</div>
                            <div>{course.courseInstructor}</div>
                        </div>
                    ))}
                </div>
            </div>
            {showFeedbackForm && selectedCourse && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10">
                    <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-auto my-4 overflow-auto" style={{ maxHeight: "80vh", maxWidth: "80vw" }}>
                        <FeedbackForm
                            course={selectedCourse}
                            onClose={() => setShowFeedbackForm(false)}
                            removeFromCourseArr={removeFromCourseArr}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

export default CourseFeedbackPage;
