import StudentInfo from "./StudentInfo"
import { useEffect,useState } from "react"
import axios from "axios"

const Homepage = () => 
{   let studinfo;
    let regcourses; let token;
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
            //student info, reg courses
            
            }).catch((err) => {
            
            console.log(err);
            console.log("There is some problem with the server or your internet, try again after some time")
            })
        
    
    },[])


    return (<>
               <StudentInfo/>

    </>

    )
}

export default Homepage