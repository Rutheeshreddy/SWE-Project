import React from "react";

const Writtencfb = ({ fb, onClosec }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full overflow-y-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Course Feedback</h2>
                <div className="mb-4">
                    {fb.map((comment, index) => (
                        <div key={index} className="mb-2">
                            <span className="font-semibold">{index + 1}:</span> {comment}
                        </div>
                    ))}
                </div>
                <button onClick={onClosec} className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm mt-4">Close</button>
            </div>
        </div>
    );
};

export default Writtencfb;
