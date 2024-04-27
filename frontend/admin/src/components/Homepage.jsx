import AdminInfo from "./AdminInfo"
import { useEffect,useState } from "react"
import axios from "axios"
import {Link} from "react-router-dom"
import CourseListReg from "./CourseListReg"

const Homepage = () => 
{   let studinfo;
    let regcourses; let token; 
    const [details,setDetails] = useState({}); 
    const [period,setPeriod] = useState("");
    const [prevPeriod,setPrevPeriod] = useState(1)
    useEffect(()=>
    {    
         token = sessionStorage.getItem("token") 
         //verify token
         axios.get(import.meta.env.VITE_ADMIN+"verify", {
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {
            
            if (res.data.tokenStatus != 1) {
                window.location.href = import.meta.env.VITE_LOGIN
            }
            console.log("Ok, verify is working")
            //admin info
            setDetails({name:res.data.name,sem:res.data.sem,year:res.data.year})
            setPeriod(res.data.current_period) ; setPrevPeriod(res.data.prev_period)
            }).catch((err) => {
            
            console.log(err);
            console.log("There is some problem with the server or your internet, try again after some time")
            })
        
    
    },[])

    function handleClick(e)
    { 
       if(e.target.id=="CS") 
       { // write condition for checking period
          if(period != "course_selection" && prevPeriod != 4) {e.preventDefault()}
       }
       else if(e.target.id=="CR") 
       {
          if(period != "course_reg" || prevPeriod != 4) {e.preventDefault()}
       }
       else if(e.target.id=="CF") 
       { 
          if(period != "course_feedback" && prevPeriod != 2) {e.preventDefault()}
       }
       else (e.target.id=="GP") 
       { 
          if(period != "course_grading" && prevPeriod != 3) {e.preventDefault()}
       }
    
    }


    return (
              <div className="grid grid-cols-1 gap-6">
                     <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                     <AdminInfo info={details} />
                     </div>
                         
                    <div className="flex flex-row items-center">
                    <Link to="/selection"  > <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2" id="CS">
                            Course Selection Period
                        </button> </Link>
                    <Link to="/registration"> <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2" id="CR">
                                Course Registration Period
                            </button></Link> 
                    </div>
                    <div className="flex flex-row items-center">
                    <Link to="">  <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2" id="CF">
                                Course Feedback Period
                            </button></Link>
                    <Link to=""> <button className="bg-pink-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2" id="GP">
                                 Grading Period
                            </button></Link>
                   </div>
                   {/* <div>
                        <CourseListReg />
                   </div> */}
              </div>
       );


    

}

export default Homepage;