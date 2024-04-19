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
            headers: {
                'Content-Type': "application/json",
                'Authorization': `Bearer ${token}`,
            }
        }).then((res) => {
            
            if (res.data.tokenStatus != 1) {
                window.location.href = import.meta.env.VITE_LOGIN
            }

            }).catch((err) => {
            
            console.log(err);
            setErrMsg("There is some problem with the server or your internet, try again after some time")
            })
        
    
    },[])


    return (<>
               <StudentInfo/>

    </>

    )
}

export default Homepage