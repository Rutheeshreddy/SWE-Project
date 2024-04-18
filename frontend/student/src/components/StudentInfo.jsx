import React from "react";

const StudentInfo = (props) => {
    return (
        <div className="bg-gray-100 p-4 rounded-lg">
            <h1 className="text-xl font-bold mb-2">{props.name}</h1>
            <h2 className="text-lg font-semibold mb-1">{props.id}</h2>
            <h2 className="text-lg font-semibold mb-1">{props.department}</h2>
            <div className="flex">
                <h3 className="text-md font-semibold mr-4">{props.batch}</h3>
                <h3 className="text-md font-semibold">{props.semester}</h3>
            </div>
        </div>
    )
};

export default StudentInfo;
