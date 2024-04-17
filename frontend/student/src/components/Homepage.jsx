//import StudentInfo from "./StudentInfo"
import { useEffect } from "react"
const Homepage = () => 
{   let studinfo;
    let regcourses;
    useEffect(()=>
    {
        let token = sessionStorage.getItem("token") 
        // send the the token to backend and verify it
        console.log(token)
    },[])


    return (<>
    Andhra Bhoja!
    </>

    )
}

export default Homepage