import { useEffect,useState } from "react";
import axios from "axios";
import InstructorInfo from "./InstructorInfo";
import SubmissionButtons from "./SubmissionButtons";
import TeachingCourses from "./TeachingCourses";
import OngoingTimelines from "./OngoingTimelines";


const Homepage = () => 
{   let token;
    const [teachingcourses, setteachingcourses] = useState([])
    const [details, setdetails] = useState([])

    useEffect(()=>
    {    
         token = sessionStorage.getItem("token") 
         //verify token
         axios.get(import.meta.env.VITE_TEACHER+"verify", {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {
            // console.log(res.data);
            
            if (res.data.tokenStatus != 1) {
                window.location.href = import.meta.env.VITE_LOGIN
            }
            console.log("Ok, verify is working")

            if(res.data.status === 1){

            //   const detailstemp = {name: res.data.details.name, id: res.data.details.id, department: res.data.details.department}
              setdetails(res.data.details)

              const teachingcoursestemp = res.data.courses.map(course => ({

                     courseName : course.name,
                     courseCode : course.course_id,
                     slot : course.slot
              }))

              setteachingcourses(teachingcoursestemp);
            }
            
            }).catch((err) => {
            
            console.log(err);
            console.log("There is some problem with the server or your internet, try again after some time")
            })
       },[])

    // const r1 = {"courseName":"Deep Learning", "courseCode":"AI1100", "slot":"P"}
    // const r2 = {"courseName":"Machine Learning", "courseCode":"AI1000", "slot":"Q"}
    // const props_arr = [r1, r2]

    return (
            <div className="grid grid-cols-1 gap-6">
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                    <InstructorInfo info={details} />
                    </div>
                    <OngoingTimelines />
                    <SubmissionButtons instructor_id={details.id} />
                    <div className="bg-white p-6 rounded-lg shadow-md">
                    <TeachingCourses courses={teachingcourses} />
                    </div>
            </div>
    );
}

export default Homepage;