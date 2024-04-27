import React, {useState, useEffect} from "react";
import axios from 'axios';

const   OngoingTimelines = () => {
    const [isGradeOn, setIsGradeOn] = useState(false);
    const [isFeedback, setIsFeedback] = useState(false);

    useEffect(() => { 

        var token = sessionStorage.getItem('token');
        axios.get(import.meta.env.VITE_TEACHER + 'get-timelines',{
            headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
        }
        })
            .then((res) => {

                if(res.data.status == 1) {
                    setIsGradeOn(res.data.grade == 1);
                    if(res.data.prev_period == 3) setIsFeedback(true);
                    else setIsFeedback(false);
                }
            })
            .catch((err) => {
                console.log(err);
            });
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
