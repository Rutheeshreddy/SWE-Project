import React from "react";

const StudentsList = ({ students, isManualEntry, onGradeChange, onGradeKeyDown }) => (
    <>
        <h2 className="text-2xl font-bold text-gray-800 mt-10 mb-4">Students</h2>
        <div className="bg-gray-200 text-gray-700 p-3 rounded-lg">
            <div className="grid grid-cols-3 gap-4">
                <div className="font-bold text-center">Name</div>
                <div className="font-bold text-center">ID</div>
                <div className="font-bold text-center">Grade</div>
            </div>
        </div>
        {students.length > 0 ? (
            students.map(student => (
                <div key={student.id} className="bg-white mt-2 p-3 rounded-lg shadow grid grid-cols-3 gap-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                    <div className="text-center">{student.name}</div>
                    <div className="text-center">{student.id}</div>
                    <div className="flex justify-center items-center">
                            <input 
                            type="text" 
                            value={student.grade}
                            onChange={(e) => onGradeChange(student.id, e.target.value)}
                            onKeyDown={(e) => onGradeKeyDown(student.id, e)}
                            className="text-center border-2 border-gray-300 rounded w-16 h-8 text-sm focus:border-blue-500 focus:outline-none"
                            disabled={!isManualEntry}
                            />
                    </div>                                       
                </div>
            ))
        ) : (
            <p className="text-xl font-semibold mt-6 text-center text-gray-800">No registered students</p>
        )}
    </>
);

export default StudentsList;
