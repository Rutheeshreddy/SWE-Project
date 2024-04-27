import { useEffect, useState } from "react";
import axios from "axios";

const CourseDetails = (props) => {
    let token;
    const { course } = props;

    return (
        <div>
            <p>Grade : {course.grade}</p>
            <p>Credits : {course.credits}</p>
            <p>Instructor : {course.instructor}</p>
        </div>
    );
};

export default CourseDetails;
