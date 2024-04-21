import React, { useState } from "react";
import Rating from "./Rating";
import OpinionButtons from "./OpinionButtons";

const FeedbackForm = ({ course, onClose, removeFromCourseArr }) => {
    const [selectedOptions, setSelectedOptions] = useState({
        question1: "",
        question2: "",
        question3: "",
        question4: "",
        question5: "",
        question6: "",
        question7: "",
        question8: ""
    });

    const [ratingStatus, setRatingStatus] = useState({
        "Course Rating 1": false,
        "Course Rating 2": false,
        "Course Rating 3": false,
        "Instructor Rating 1": false,
        "Instructor Rating 2": false,
        "Instructor Rating 3": false
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

        // axios.post("your_backend_api_endpoint_here", { feedback: selectedOptions, course })
          //     .then(() => {
          //         removeFromCourseArr(course);
          //         onClose();
          //     })
          //     .catch((error) => {
          //         console.error("Error submitting feedback:", error);
          //     });

        removeFromCourseArr(course);
        onClose();
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
                        <OpinionButtons question="question1" onChange={(value) => handleOptionChange("question1", value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 2</p>
                        <OpinionButtons question="question2" onChange={(value) => handleOptionChange("question2", value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 3</p>
                        <OpinionButtons question="question3" onChange={(value) => handleOptionChange("question3", value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 4</p>
                        <OpinionButtons question="question4" onChange={(value) => handleOptionChange("question4", value)} />
                    </div>
                </div>
                <div className="space-y-4 mb-6">
                    <h4 className="text-lg font-semibold mb-2">Rating</h4>
                    <Rating category="Course Rating 1" onChange={handleRatingChange} />
                    <Rating category="Course Rating 2" onChange={handleRatingChange} />
                    <Rating category="Course Rating 3" onChange={handleRatingChange} />
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
                        <OpinionButtons question="question5" onChange={(value) => handleOptionChange("question5", value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 2</p>
                        <OpinionButtons question="question6" onChange={(value) => handleOptionChange("question6", value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 3</p>
                        <OpinionButtons question="question7" onChange={(value) => handleOptionChange("question7", value)} />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <p>Question 4</p>
                        <OpinionButtons question="question8" onChange={(value) => handleOptionChange("question8", value)} />
                    </div>
                </div>
                <div className="space-y-4 mb-6">
                    <h4 className="text-lg font-semibold mb-2">Rating</h4>
                    <Rating category="Instructor Rating 1" onChange={handleRatingChange} />
                    <Rating category="Instructor Rating 2" onChange={handleRatingChange} />
                    <Rating category="Instructor Rating 3" onChange={handleRatingChange} />
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
