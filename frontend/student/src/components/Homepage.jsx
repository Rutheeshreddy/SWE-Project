import SemRegisteredCourses from "./SemRegisteredCourses"
import StudentInfo from "./StudentInfo"
import { useEffect } from "react"
const Homepage = () => 
{   let studinfo;
    let regcourses; let token;
    useEffect(()=>
    {    
         token = sessionStorage.getItem("token") 
         //verify token
         axios.post(import.meta.env.VITE_STUDENT, {
            userName: user,
            password: pwd,
            }).then((res) => {
            
            if (res.data.logRes == 1) {
          
                //sessionStorage.setItem('token', res.data.token);
                //localStorage.setItem('token', res.data.token);
                //console.log('token:',res.data.token)
             setSucc(true) 
            setTimeout(() => {

                // navigate  
                window.location.href = import.meta.env.VITE_STUDENT + "redirect/"+res.data.token // temporary workaround, shall fix later
                //setSucc(false)
            }, 1000);


            }
            
            else if (res.data.logRes == -1) // invalid userame
            {
              userRef.current.focus();  setPwd(""); setErrMsg("This username doesn't exist")
            }

            else //wrong password
            {
              setPwd(""); setErrMsg("The password is wrong, try again")
            }

            }).catch((err) => {
            
            console.log(err);
            setErrMsg("There is some problem with the server or your internet, try again after some time")
            })
        
    
    },[])


    return (
              <div className="grid grid-cols-1 gap-6">
                     <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                     <StudentInfo info={details} />
                     </div>
                     
                     <div className="bg-white p-6 rounded-lg shadow-md">
                     <SemRegisteredCourses courses={props_arr} />
                     </div>
              </div>
       );

       // const details = {"name": "Raja", "id": "CS21BTECH11000", "department": "Computer Science and Engineering", "batch": "2021", "semester": "6"}

       // const r1 = {"courseName":"Deep Learning", "courseCode":"AI1100", "electiveType":"Departmental"}
       // const r2 = {"courseName":"Machine Learning", "courseCode":"AI1000", "electiveType":"Additional"}
       // const props_arr = [r1, r2]
       // return (
       //        <div className="grid grid-cols-1 gap-6">
       //               <div className="bg-gray-100 p-6 rounded-lg shadow-md">
       //               <StudentInfo info={details} />
       //               </div>
                     
       //               <div className="bg-white p-6 rounded-lg shadow-md">
       //               <SemRegisteredCourses courses={props_arr} />
       //               </div>
       //         </div>
       // );

}

export default Homepage;