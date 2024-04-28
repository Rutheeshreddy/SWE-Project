import React from "react";
import axios from "axios";


const StudentsList = ({ students, courseCode}) => {

    const handleAdminClick = (e) => 
    {
        e.preventDefault();
        var answer = window.confirm('Are you sure?');
        if(answer) {
            var token = sessionStorage.getItem("token");
            axios.post(import.meta.env.VITE_ADMIN+"remove-student", {
                course_id:courseCode, 
                student_id: e.target.id
                },{
                headers: {
                    'Content-Type': "application/json",
                    'Authorization': `Bearer ${token}`,
                }
                }).then( (res) => {
                     if(res.data.status == 1) {
                        alert("Student got deregistered from the course successfully");
                        window.location.reload();
                     }
                }).catch((err) => {
                
                    console.log(err);
                    alert("There is some problem with the server or your internet, try again after some time")
                })

        }
    }


    return (
    <div>
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
                <div key={student.id} className="bg-white mt-2 p-3 rounded-lg shadow grid grid-cols-4 gap-4 hover:bg-gray-50 transition duration-150 ease-in-out">
                    <div className="text-center">{student.name}</div>
                    <div className="text-center">{student.id}</div>
                    <div className="flex justify-center items-center">
                            <input 
                            type="text" 
                            value={student.grade !== null ? student.grade : ""}
                            className="text-center border-2 border-gray-300 rounded w-16 h-8 text-sm focus:border-blue-500 focus:outline-none"
                            disabled={true}
                            />
                    </div>
                    <div><button className="bg-red-500 text-white px-2 py-1 rounded-md text-sm" id={student.id}  onClick={handleAdminClick}>-</button></div>                                       
                </div>
            ))
        ) : (
            <p className="text-xl font-semibold mt-6 text-center text-gray-800">No registered students</p>
        )}
    </div>)
};

export default StudentsList;
