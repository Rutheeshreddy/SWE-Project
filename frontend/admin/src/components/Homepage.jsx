import AdminInfo from "./AdminInfo"
import { useEffect,useState } from "react"
import axios from "axios"
import {Link} from "react-router-dom"

const Homepage = () => 
{   let studinfo;
    let regcourses; let token; 
    const [details,setDetails] = useState({}) 
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
            }).catch((err) => {
            
            console.log(err);
            console.log("There is some problem with the server or your internet, try again after some time")
            })
        
    
    },[])

    function handleClick(e)
    { 
       if(e.target.id=="CS") 
       { // write condition for checking period
       // e.preventDefault()
       }
    }


    return (
              <div className="grid grid-cols-1 gap-6">
                     <div className="bg-gray-100 p-6 rounded-lg shadow-md">
                     <AdminInfo info={details} />
                     </div>
                         
                    <div className="flex flex-row items-center">
                    <Link to="/selection" onClick={handleClick} > <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-2" id="CS">
                            Course Selection Period
                        </button> </Link>
                    <Link to=""> <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2">
                                Course Registration Period
                            </button></Link> 
                    </div>
                    <div className="flex flex-row items-center">
                    <Link to="">  <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2">
                                Course Feedback Period
                            </button></Link>
                    <Link to=""> <button className="bg-pink-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded mr-2">
                                 Grading Period
                            </button></Link>
                   </div>
                    

              </div>
       );


    

}

export default Homepage;