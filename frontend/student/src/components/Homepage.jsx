import SemRegisteredCourses from "./SemRegisteredCourses"
import StudentInfo from "./StudentInfo"
import CourseFeedbackPage from "./CourseFeedbackPage"
import { useEffect,useState } from "react"
import SubmissionButtons from "./SubmissionButtons"
import axios from "axios"

const Homepage = () => 
{   //let studinfo;
    let token;
    const [regcourses, setregcourses] = useState([])
    const [details, setdetails] = useState([])

    const calcsem = (sem, year) =>{
       var temp = 0
       if(sem.semester == 'Odd'){

              temp = -1
       }
       return ((sem.year - year)*2 + temp)
    }



    useEffect(()=>
    {    
         token = sessionStorage.getItem("token") 
         //verify token
         axios.get(import.meta.env.VITE_STUDENT+"verify", {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {
            
            if (res.data.tokenStatus != 1) {
                window.location.href = import.meta.env.VITE_LOGIN
            }
            console.log("Ok, verify is working")

            if(res.data.status === 1){

              const detailstemp = {name: res.data.details.name, id: res.data.details.id, department: res.data.details.department, batch : res.data.details.joining_year, semester: calcsem(res.data.sem, res.data.details.joining_year)}
              setdetails(detailstemp)

              const regcoursestemp = res.data.courses.map(course => ({

                     courseName : course.name,
                     courseCode : course.course_id,
                     electiveType : course.elective,
                     credits : course.credits
              }))

              setregcourses(regcoursestemp);
            }
            
            }).catch((err) => {
            
            console.log(err);
            console.log("There is some problem with the server or your internet, try again after some time")
            })
       },[])

       return (
              <div className="grid grid-cols-1 gap-6">
                     <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                     <StudentInfo info={details} />
                     </div>
                     <SubmissionButtons />
                     <div className="bg-white p-6 rounded-lg shadow-md">
                     <SemRegisteredCourses courses={regcourses} />
                     </div>
               </div>
       );

       // return (
       //        <CourseFeedbackPage />
       // )

}

export default Homepage;