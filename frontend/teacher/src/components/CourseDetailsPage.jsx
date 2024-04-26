import React, {useState, useEffect} from "react";
import { useLocation, useParams } from "react-router-dom";
import ViewFeedback from "./ViewFeedback";

const CourseDetailsPage = () => {
    // const location = useLocation();
    // console.log(location.state)
    // const courseinfo = location.state?.course;

    // if (!courseinfo) {
    //     return <div>Error: Course not found</div>;
    // }

    const [course, setCourse] = useState({});
    const [isFeedback, setIsFeedback] = useState(false);

    const { courseCode } = useParams();

    useEffect(() => {
    // axios.get("your_api_endpoint_here")
    //     .then((res) => {
    //         setCourse(res.data.course);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    }, []);

    return (
        <div>
            <h1 className="text-3xl font-semibold mb-6 flex justify-center items-center h-full">Course Details</h1>
            <div className="flex flex-col md:flex-row md:space-x-8 justify-center items-center h-full">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium mb-1">Course Code</h3>
                    <p className="text-md">{course.courseCode}</p>
                </div>
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium mb-1">Course Name</h3>
                    <p className="text-md">{course.courseName}</p>
                </div>
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium mb-1">Slot</h3>
                    <p className="text-md">{course.slot}</p>
                </div>
            </div>
            <div>
                <h1 className="text-2xl font-semibold mt-4 mb-2 flex">Students</h1>
                <div className="bg-gray-200 text-gray-700 grid grid-cols-3 gap-4 p-3 my-3 rounded-md">
                    <div className="font-semibold">Name</div>
                    <div className="font-semibold">ID</div>
                    <div className="font-semibold">Slot</div>
                </div>
                {course.students && course.students.length > 0 && course.students.map((student) => (
                    <div key={student.id}>
                        <div className={`grid grid-cols-3 gap-4 p-2 items-center 'bg-gray-100' 'hover:bg-gray-50'`} style={{ borderBottom: '1px solid #ddd' }}>
                            <div>{student.name}</div>
                            <div>{student.id}</div>
                            <div></div>
                        </div>
                    </div>
                ))}
                {course.students && (course.students.length == 0) && (
                    <div>
                        <p className="text-1xl font-semibold m-6 flex justify-center items-center h-full">No registered students</p>
                    </div>
                )}
                
            </div>
        </div>
    );
};

export default CourseDetailsPage;
