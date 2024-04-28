import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SubmissionButtons = () => {
    const [isRegistrationOn, setIsRegistrationOn] = useState(false);
    const [isFeedbackOn, setIsFeedbackOn] = useState(false);

    useEffect(() => { 

        var token = sessionStorage.getItem('token');
        axios.get(import.meta.env.VITE_STUDENT + 'get-timelines',{
            headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
        }
        })
            .then((res) => {

                if (res.data.tokenStatus === 0) {
                    window.location.href = import.meta.env.VITE_LOGIN
                }

                if(res.data.status == 1) {
                    setIsRegistrationOn(res.data.registration == 1);
                    setIsFeedbackOn(res.data.feedback == 1);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])

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

