import React, {useState, useEffect} from "react";

const   OngoingTimelines = () => {
    const [isGradeOn, setIsGradeOn] = useState(false);
    const [isFeedback, setIsFeedback] = useState(false);

    useEffect(() => {
    // axios.get("your_api_endpoint_here")
    //     .then((res) => {
    //         setIsGradeOn(res.data.grade);
    //         setIsFeedbackn(res.data.feedback);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //     });
        setIsGradeOn(true);
        setIsFeedback(true);
    }, [])

    return (
        <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-xl font-bold mb-4">Recent Updates</h1>
            {!isGradeOn && !isFeedback && <p className="text-gray-500 italic">No updates</p>}
            {isGradeOn && <p className="text-green-600 font-semibold">Grade Submission Period</p>}
            {isFeedback && <p className="text-blue-600 font-semibold">Feedback is done</p>}
        </div>
    )
};

export default OngoingTimelines;
