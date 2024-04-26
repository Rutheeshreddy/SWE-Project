import React from "react";
import { useLocation } from "react-router-dom";
import ViewFeedback from "./ViewFeedback";

const CourseDetailsPage = () => {
    const location = useLocation();
    const { course } = location.state;

    // axios.get("your_api_endpoint_here")
    //     .then((res) => {
    //         setSemCourseArr(res.data);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });

    useEffect(() => {

    }, []);

    return (
        <div>
            
        </div>
    );
};

export default CourseDetailsPage;
