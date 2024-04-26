import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

const TaughtCoursesPage = () => {
    const [semCourseArr, setSemCourseArr] = useState([]);

    useEffect(() => {
        // axios.get("your_api_endpoint_here")
        //     .then((res) => {
        //         setSemCourseArr(res.data);
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        const r1 = { courseName: "Deep Learning", courseCode: "AI1100", slot: "P" };
        const r2 = { courseName: "Machine Learning", courseCode: "AI1000", slot: "Q" };
        const s1 = { sem: "1", year: "2021", courses: [r1, r2]}
        const s2 = { sem: "2", year: "2021", courses: [r1, r2]}
        const arr = [s1, s2];
        setSemCourseArr(arr);
    }, []);

    return (
        <div className="max-w-4xl mx-auto px-4">
            <h1 className="text-3xl font-semibold mb-6 text-center">Past Courses</h1>
            {semCourseArr.map((semeach) => (
                <div key={`${semeach.sem}-${semeach.year}`} className="bg-white rounded-lg shadow-md mb-8">
                    <h1 className="text-xl font-bold mb-4 py-2 px-4 border-b-2 border-green-500 bg-gray-200">{`Semester: ${semeach.sem}, Year: ${semeach.year}`}</h1>
                    <div className="grid grid-cols-3 gap-4 p-3 my-3 bg-gray-100">
                        <div className="font-semibold">Course Name</div>
                        <div className="font-semibold">Course Code</div>
                        <div className="font-semibold">Slot</div>
                    </div>

                    {semeach.courses.map((course) => (
                        <div key={course.courseCode}>
                            <Link
                                to={{
                                    pathname: "/past-course-details",
                                    state: { course: course }
                                }}
                                className="grid grid-cols-3 gap-4 p-2 items-center hover:bg-gray-50 cursor-pointer"
                            >
                                <div>{course.courseName}</div>
                                <div>{course.courseCode}</div>
                                <div>{course.slot}</div>
                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default TaughtCoursesPage;
