import { useEffect } from "react";

const CourseDetails = (props) => {
    const { course } = props;

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
            
            
            
            }).catch((err) => {
            
            console.log(err);
            console.log("There is some problem with the server or your internet, try again after some time")
            })
       },[])

    return (
        <div>
            <p>Details about {course.courseName}</p>
            <p>Details about {course.courseCode}</p>
            <p>Details about {course.electiveType}</p>
        </div>
    );
};

export default CourseDetails;
