import React, { useEffect } from "react";

const ViewFeedback = ({ courseCode, onClose }) => {
    useEffect(() => {
        //axios request to get feedback based on courseCode
    }, [])
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Feedback</h2>
                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec ultricies purus. Nullam vel lectus justo.</p>
                <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm">Close</button>
            </div>
        </div>
    );
};

export default ViewFeedback;
