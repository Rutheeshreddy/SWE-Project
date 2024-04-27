import { useEffect, useState } from "react";
import axios from "axios";

const CourseDetails = (props) => {
    let token;
    const { course } = props;
    const [slot, setslot] = useState("")
    const [instructor, setinstructor] = useState("")

    useEffect(()=>
    {    
         token = sessionStorage.getItem("token") 
         //verify token
         axios.get(import.meta.env.VITE_STUDENT+"course-info/"+course.courseCode,{
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {

            if(res.data.status == 1){

                setinstructor(res.data.course.instructor_name)
                setslot(res.data.course.slot)
            }
            
            
            
            }).catch((err) => {
            
            console.log(err);
            console.log("There is some problem with the server or your internet, try again after some time")
            })
       },[])

    return (
        <div>
            <p>Slot : {slot}</p>
            <p>Credits : {course.credits}</p>
            <p>Instructor : {instructor}</p>
        </div>
    );
};

export default CourseDetails;
