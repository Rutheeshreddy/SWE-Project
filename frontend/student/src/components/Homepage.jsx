import SemRegisteredCourses from "./SemRegisteredCourses"
import StudentInfo from "./StudentInfo"
import CourseFeedbackPage from "./CourseFeedbackPage"
import { useEffect } from "react"
import SubmissionButtons from "./SubmissionButtons"
const Homepage = () => 
{   // let studinfo;
//     let regcourses; let token;
//     useEffect(()=>
//     {    
//          token = sessionStorage.getItem("token") 
//          //verify token
//          axios.post(import.meta.env.VITE_STUDENT, {
//             headers: {
//                 'Content-Type': "application/json",
//                 'Authorization': `Bearer ${token}`,
//             }
//         }).then((res) => {
            
//             if (res.data.tokenStatus != 1) {
//                 window.location.href = import.meta.env.VITE_LOGIN
//             }

//             }).catch((err) => {
            
//             console.log(err);
//             setErrMsg("There is some problem with the server or your internet, try again after some time")
//             })
        
    
//     },[])

       const details = {"name": "Raja", "id": "CS21BTECH11000", "department": "Computer Science and Engineering", "batch": "2021", "semester": "6"}

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