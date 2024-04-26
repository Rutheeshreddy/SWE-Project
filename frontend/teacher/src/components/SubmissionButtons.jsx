import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";

const SubmissionButtons = () => {
    const [isSelectionOn, setIsSelectionOn] = useState(false);

    useEffect(() => {

        // axios.get()
         //     .then(response => {
         //         data = response.data
         //         setIsSelectionOn(data.selection);
         //     })
         //     .catch(error => {
         //         console.error("Error fetching status:", error);
         //     });

        setIsSelectionOn(true);
    }, []);

    return (
        <div className="flex flex-row items-center">
            <Link 
                to="/taught-courses" 
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
                Taught Courses
            </Link>
            {isSelectionOn && (
                <Link 
                    to="/course-selection" 
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2"
                >
                    Course Selection
                </Link>
            )}
        </div>
    );
};

export default SubmissionButtons;