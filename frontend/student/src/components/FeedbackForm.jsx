import React, { useState } from "react";
import Rating from "./Rating";
import OpinionButtons from "./OpinionButtons";
import axios from "axios";

const FeedbackForm = ({ course, onClose, removeFromCourseArr }) => {
    const [selectedOptions, setSelectedOptions] = useState({
        cq1: "",
        cq2: "",
        cq3: "",
        cq4: "",
        iq1: "",
        iq2: "",
        iq3: "",
        iq4: ""
    });

    const [ratingStatus, setRatingStatus] = useState({
        "cr1": false,
        "cr2": false,
        "cr3": false,
        "ir1": false,
        "ir2": false,
        "ir3": false
    });

    const [courseRemarks, setCourseRemarks] = useState("");
    const [instructorRemarks, setInstructorRemarks] = useState("");

    const handleOptionChange = (question, value) => {
        setSelectedOptions(prevState => ({
            ...prevState,
            [question]: value
        }));
    };

    const handleRatingChange = (category, value) => {
        setRatingStatus(prevState => ({
            ...prevState,
            [category]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const allOptionsFilled = Object.values(selectedOptions).every(option => option);
        const allRatingsFilled = Object.values(ratingStatus).every(status => status);

        console.log(selectedOptions);
        console.log(ratingStatus);
        console.log(courseRemarks);
        console.log(instructorRemarks);

        if (!allOptionsFilled || !allRatingsFilled) {
            alert("Please fill all options and ratings.");
            return;
        }

        const feedback = [selectedOptions, ratingStatus, courseRemarks, instructorRemarks]

        var token = sessionStorage.getItem("token");
        axios.post(import.meta.env.VITE_STUDENT+"give-feedback/",
        {
          feedback: feedback,
          course_id : course.courseCode,
          instructor_id : course.courseInstructorId
        },{
          headers: {
            'Content-Type': "application/json",
            'Authorization': `Bearer ${token}`,
          }
        }).then( (res) =>{
    
          if(res.data.status !== 1){
    
            alert("registration unsuccessful!");
          }
          else{
            alert("registration successful")
          }
    
        
        }).catch((err) => {
    
          console.log(err);
          setErrMsg("There is some problem with the server or your internet, try again after some time")
        })
        onClose();
        // window.location.reload();
        removeFromCourseArr(course);
    };

    return (
        <form onSubmit={handleSubmit} className="feedback-form p-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">Feedback Form</h2>
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="font-semibold">Course Name</div>
                <div className="font-semibold">Course Code</div>
                <div className="font-semibold">Instructor</div>
                <div>{course.courseName}</div>
                <div>{course.courseCode}</div>
                <div>{course.courseInstructor}</div>
            </div>
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Course</h3>
                <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 1</p>
                        <OpinionButtons question="cq1" onChange={(value) => handleOptionChange("cq1", value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 2</p>
                        <OpinionButtons question="cq2" onChange={(value) => handleOptionChange("cq2", value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 3</p>
                        <OpinionButtons question="cq3" onChange={(value) => handleOptionChange("cq3", value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 4</p>
                        <OpinionButtons question="cq4" onChange={(value) => handleOptionChange("cq4", value)} />
                    </div>
                </div>
                <div className="space-y-4 mb-6">
                    <h4 className="text-lg font-semibold mb-2">Rating</h4>
                    <Rating category="cr1" onChange={handleRatingChange} />
                    <Rating category="cr2" onChange={handleRatingChange} />
                    <Rating category="cr3" onChange={handleRatingChange} />
                </div>
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold mb-2">Remarks for Course</h4>
                    <textarea
                        value={courseRemarks}
                        onChange={(e) => setCourseRemarks(e.target.value)}
                        placeholder="Write your remarks here (max 100 words)..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
                        maxLength={500}
                        required
                    />
                </div>
            </div>
            <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4">Instructor</h3>
                <div className="space-y-4 mb-6">
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 1</p>
                        <OpinionButtons question="iq1" onChange={(value) => handleOptionChange("iq1", value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 2</p>
                        <OpinionButtons question="iq2" onChange={(value) => handleOptionChange("iq2", value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 3</p>
                        <OpinionButtons question="iq3" onChange={(value) => handleOptionChange("iq3", value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 4</p>
                        <OpinionButtons question="iq4" onChange={(value) => handleOptionChange("iq4", value)} />
                    </div>
                </div>
                <div className="space-y-4 mb-6">
                    <h4 className="text-lg font-semibold mb-2">Rating</h4>
                    <Rating category="ir1" onChange={handleRatingChange} />
                    <Rating category="ir2" onChange={handleRatingChange} />
                    <Rating category="ir3" onChange={handleRatingChange} />
                </div>
                <div className="space-y-4">
                    <h4 className="text-lg font-semibold mb-2">Remarks for Instructor</h4>
                    <textarea
                        value={instructorRemarks}
                        onChange={(e) => setInstructorRemarks(e.target.value)}
                        placeholder="Write your remarks here (max 100 words)..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:border-blue-500"
                        maxLength={500}
                        required
                    />
                </div>
            </div>
            <div className="flex justify-end mt-6">
                <button type="button" onClick={onClose} className="mr-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:bg-gray-300">Cancel</button>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">Submit</button>
            </div>
        </form>
    );    
};

export default FeedbackForm;