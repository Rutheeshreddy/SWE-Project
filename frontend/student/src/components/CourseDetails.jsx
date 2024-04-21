import { useEffect } from "react";

const CourseDetails = (props) => {
    const { course } = props;

    return (
        <div>
            <p>Details about {course.courseName}</p>
            <p>Details about {course.courseCode}</p>
            <p>Details about {course.electiveType}</p>
        </div>
    );
};

export default CourseDetails;
