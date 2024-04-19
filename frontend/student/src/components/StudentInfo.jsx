import React from "react";

const StudentInfo = (props) => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">{props.info.name}</h1>
            <div className="flex flex-col md:flex-row md:space-x-8">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium mb-1">ID</h3>
                    <p className="text-md">{props.info.id}</p>
                </div>
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium mb-1">Department</h3>
                    <p className="text-md">{props.info.department}</p>
                </div>
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-medium mb-1">Batch</h3>
                    <p className="text-md">{props.info.batch}</p>
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-1">Semester</h3>
                    <p className="text-md">{props.info.semester}</p>
                </div>
            </div>
        </div>
    );
};

export default StudentInfo;
