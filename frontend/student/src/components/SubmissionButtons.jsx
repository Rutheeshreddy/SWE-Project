import React, { useState, useEffect } from "react";
import axios from "axios";

const SubmissionButtons = () => {
    const [isRegistrationOn, setIsRegistrationOn] = useState(false);
    const [isFeedbackOn, setIsFeedbackOn] = useState(false);

    useEffect(() => {
        axios.get()
            .then(response => {
                data = response.data
                setIsRegistrationOn(data.registration);
                setIsFeedbackOn(response.feedback);
            })
            .catch(error => {
                console.error("Error fetching status:", error);
            });
    }, []);

    return (
        <div className="flex flex-row items-center">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2">
                Registered Courses
            </button>
            {isRegistrationOn && (
                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">
                    Course Registration
                </button>
            )}
            {isFeedbackOn && (
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded">
                    Course Feedback
                </button>
            )}
        </div>
    );
};

export default SubmissionButtons;
