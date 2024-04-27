import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";

const SubmissionButtons = (props) => {
    const [isSelectionOn, setIsSelectionOn] = useState(false);

    useEffect(() => { 

        var token = sessionStorage.getItem('token');
        axios.get(import.meta.env.VITE_TEACHER + 'get-timelines',{
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
                    setIsSelectionOn(res.data.selection == 1);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, [])


    return (
        <div className="flex flex-row items-center">
            <Link 
                to= {"/taught-courses/" + props.instructor_id} 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
                Taught Courses
            </Link>
            {isSelectionOn && (
                <Link 
                    to= {"/course-selection/" + props.instructor_id}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Course Selection
                </Link>
            )}
        </div>
    );
};

export default SubmissionButtons;