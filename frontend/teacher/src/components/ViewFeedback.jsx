import React, { useEffect, useState } from "react";
import axios from "axios";
import Writtencfb from "./Writtencfb.jsx"
import Writtentfb from "./Writtentfb.jsx"

const ViewFeedback = ({ courseCode, onClose }) => {
    const [iqscores, setiqscores] = useState([]);
    const [cqscores, setcqscores] = useState([]);
    const [irscores, setirscores] = useState([]);
    const [crscores, setcrscores] = useState([]);
    const [cf, setcf] = useState([]);
    const [tf, settf] = useState([]);
    const [cfb, setcfb] = useState(false)
    const [tfb, settfb] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        axios.get(import.meta.env.VITE_TEACHER+"view-feedback/" + courseCode, {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        }).then(res => {
            if(res.data.status === 1) {
                const myArray = res.data.feedback.avgs.map(obj => Object.values(obj).map(Number)).flat();
                const index1 = 4; // End of the first segment and start of the second
                const index2 = 8; // End of the second segment and start of the third
                const index3 = 11; // End of the third segment and start of the fourth

                setiqscores(myArray.slice(0, index1));
                setcqscores(myArray.slice(index1, index2));
                setirscores(myArray.slice(index2, index3));
                setcrscores(myArray.slice(index3));

                setcf(res.data.feedback.cftf.map(item => item.cf));
                settf(res.data.feedback.cftf.map(item => item.tf));
            }
        }).catch(err => {
            console.log(err);
            alert("There is some problem with the server or your internet, try again after some time");
        });
    }, [courseCode]);

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">

    <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">

        <div className = "grid grid-cols-2">
            <div><h1 className="text-xl font-semibold text-gray-800 mb-4">Instructor Feedback</h1></div>
            <div><button onClick={() => settfb(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm mb-4">see Feedback</button></div>
        </div>

        <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>Questions</div>
                    <div>Average Opinion Score</div>
                    {iqscores.map((score, index) => (
                        <React.Fragment key={index}>
                            <div>Question {index + 1}</div>
                            <div>{score}</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Rating</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>Ratings</div>
                    <div>Average Rating</div>
                    {irscores.map((score, index) => (
                        <React.Fragment key={index}>
                            <div>Rating {index + 1}</div>
                            <div>{score}</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
        
        <div className = "grid grid-cols-2">
            <div><h1 className="text-xl font-semibold text-gray-800 mb-4 mt-4">Course Feedback</h1></div>
            <div><button onClick={() => setcfb(true)} className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm mb-4 mt-4">see Feedback</button></div>
        </div>

        <div className="flex flex-wrap">
            <div className="w-full md:w-1/2 px-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Questions</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>Questions</div>
                    <div>Average Opinion Score</div>
                    {cqscores.map((score, index) => (
                        <React.Fragment key={index}>
                            <div>Question {index + 1}</div>
                            <div>{score}</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Rating</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>Ratings</div>
                    <div>Average Rating</div>
                    {crscores.map((score, index) => (
                        <React.Fragment key={index}>
                            <div>Rating {index + 1}</div>
                            <div>{score}</div>
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
        
        <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm mt-8">Close</button>
    </div>

    {cfb && 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-auto my-4 overflow-auto" style={{ maxHeight: "80vh", maxWidth: "80vw" }}>
                <Writtencfb
                    fb={cf}
                    onClosec={() => setcfb(false)}
                />
            </div>
        </div>
    }

    {tfb && 
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-10">
            <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-auto my-4 overflow-auto" style={{ maxHeight: "80vh", maxWidth: "80vw" }}>
                <Writtentfb
                    fb={tf}
                    onCloset={() => settfb(false)}
                />
            </div>
        </div>
        }
</div>

    );
};

export default ViewFeedback;
