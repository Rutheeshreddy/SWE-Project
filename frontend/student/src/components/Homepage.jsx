//import StudentInfo from "./StudentInfo"
import { useEffect } from "react"
const Homepage = () => 
{   let studinfo;
    let regcourses; let token
    useEffect(()=>
    {
         token = sessionStorage.getItem("token") 
        // send the the token to backend and verify it
        console.log(token)
    },[])


    return (<>
    Andhra Bhoja!
    <button onClick = {()=>{console.log(localStorage.getItem("token"))}}>raja</button>
    </>

    )
}

export default Homepage