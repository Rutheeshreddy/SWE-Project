import { useEffect,useState } from "react";
import axios from "axios";
import InstructorInfo from "./InstructorInfo";
import SubmissionButtons from "./SubmissionButtons";
import TeachingCourses from "./TeachingCourses";
import OngoingTimelines from "./OngoingTimelines";


const Homepage = () => 
{   // let studinfo;
    // let regcourses; let token;
    // useEffect(()=>
    // {    
    //      token = sessionStorage.getItem("token") 
    //      //verify token
    //      axios.get(import.meta.env.VITE_STUDENT+"verify", {
    //         headers: {
    //             'Content-Type': "application/json",
    //             'Authorization': `Bearer ${token}`,
    //         }
    //     }).then((res) => {
            
    //         if (res.data.tokenStatus != 1) {
    //             window.location.href = import.meta.env.VITE_LOGIN
    //         }
    //         console.log("Ok, verify is working")
    //         //student info, reg courses
            
    //         }).catch((err) => {
            
    //         console.log(err);
    //         console.log("There is some problem with the server or your internet, try again after some time")
    //         })
        
    
    // },[])


    const details = {"name": "Raja", "id": "CS21BTECH11000", "department": "Computer Science and Engineering"}

    const r1 = {"courseName":"Deep Learning", "courseCode":"AI1100", "slot":"P"}
    const r2 = {"courseName":"Machine Learning", "courseCode":"AI1000", "slot":"Q"}
    const props_arr = [r1, r2]
//     const props_arr = []
    return (
            <div className="grid grid-cols-1 gap-6">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <InstructorInfo info={details} />
                    </div>
                    <OngoingTimelines />
                    <SubmissionButtons />
                    <div className="bg-white p-6 rounded-lg shadow-md">
                    <TeachingCourses courses={props_arr} />
                    </div>
            </div>
    );
}

export default Homepage;