import React from "react";

const AdminInfo = (props) => {
    return (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold mb-4">Hi Admin {props.name}</h1>
            <div className="flex flex-col md:flex-row md:space-x-8">
                <div>
                    <h3 className="text-lg font-medium mb-1">Year</h3>
                    <p className="text-md">{props.year}</p>
                </div>
                <div>
                    <h3 className="text-lg font-medium mb-1">Semester</h3>
                    <p className="text-md">{props.sem}</p>
                </div>
            </div>
        </div>
    );
};

export default AdminInfo;
