import SemRegisteredCourses from "./SemRegisteredCourses"
import StudentInfo from "./StudentInfo"
import CourseFeedbackPage from "./CourseFeedbackPage"
import { useEffect,useState } from "react"
import SubmissionButtons from "./SubmissionButtons"
import axios from "axios"

const Homepage = () => 
{   //let studinfo;
    let regcourses; let token;
    const [details, setdetails] = useState([])
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

              console.log(res.data)
            
            if (res.data.tokenStatus != 1) {
                window.location.href = import.meta.env.VITE_LOGIN
            }
            console.log("Ok, verify is working")

            if(res.data.status === 1){

              detailstemp = {name: res.data.student.name, id: res.data.student.id, department: res.data.student.department, batch : res.data.student.joining_year, semester: res.data.sem.semester}
              setdetails(detailstemp)

            }
            
            }).catch((err) => {
            
            console.log(err);
            console.log("There is some problem with the server or your internet, try again after some time")
            })
           },[])

       useEffect(()=>{

              console.log(details)
       },[details])

       // const details = {"name": "Raja", "id": "CS21BTECH11000", "department": "Computer Science and Engineering", "batch": "2021", "semester": "6"}

       const r1 = {"courseName":"Deep Learning", "courseCode":"AI1100", "electiveType":"Departmental"}
       const r2 = {"courseName":"Machine Learning", "courseCode":"AI1000", "electiveType":"Additional"}
       const props_arr = [r1, r2]
       return (
              <div className="grid grid-cols-1 gap-6">
                     <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                     <StudentInfo info={details} />
                     </div>
                     <SubmissionButtons />
                     <div className="bg-white p-6 rounded-lg shadow-md">
                     <SemRegisteredCourses courses={props_arr} />
                     </div>
               </div>
       );

       // return (
       //        <CourseFeedbackPage />
       // )

}

export default Homepage;