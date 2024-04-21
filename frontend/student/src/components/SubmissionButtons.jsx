import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const SubmissionButtons = () => {
    const [isRegistrationOn, setIsRegistrationOn] = useState(false);
    const [isFeedbackOn, setIsFeedbackOn] = useState(false);

    useEffect(() => {

        // axios.get()
         //     .then(response => {
         //         data = response.data
         //         setIsRegistrationOn(data.registration);
         //         setIsFeedbackOn(response.feedback);
         //     })
         //     .catch(error => {
         //         console.error("Error fetching status:", error);
         //     });

        setIsRegistrationOn(true);
        setIsFeedbackOn(true);
    }, []);

    return (
        <div className="flex flex-row items-center">
            <Link 
                to="/registered-courses" 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
                Registered Courses
            </Link>
            {isRegistrationOn && (
                <Link 
                    to="/course-registration" 
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Course Registration
                </Link>
            )}
            {isFeedbackOn && (
                <Link 
                    to="/course-feedback" 
                    className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                    Course Feedback
                </Link>
            )}
        </div>
    );
};

export default SubmissionButtons;

