//import StudentInfo from "./StudentInfo"
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


    return (<>
    Andhra Bhoja!
    <button onClick = {()=>{console.log(localStorage.getItem("token"))}}>raja</button>
    </>

    )
}

export default Homepage