import React, { useRef, useState, useEffect } from "react";
import axios from 'axios'
import Success from "./Success"

const Login = () => {
  

        const userRef = useRef();

        const [user, setUser] = useState("");
        const [pwd, setPwd] = useState("");
        const [errMsg, setErrMsg] = useState("");
        const [succ,setSucc] = useState(false)

  

        useEffect(() => {
            userRef.current.focus();
        }, [])


        const handleSubmit =  (e) => {
            e.preventDefault();
            setErrMsg("");
            axios.post(import.meta.env.VITE_LOGIN, {
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
            
        }
    
        return (
            <>
             {succ ?  (<Success/>)
             
              :(<div className="flex justify-center items-center h-screen">
                    <div className="w-full max-w-md px-4">

                      <h1 className="text-3xl font-bold mb-4 text-center">CRGM</h1>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                          <label htmlFor="username" className="block mb-1">Username:</label>
                          <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                          />
                        </div>
                        <div>
                          <label htmlFor="password" className="block mb-1">Password:</label>
                          <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
                          />
                        </div>
                        <p  className={`text-red-600 ${errMsg ? 'block' : 'hidden'}`} aria-live="assertive">
                        {errMsg}
                        </p>

                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md transition duration-300 hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-600">Sign In</button>
                      </form>
                    </div>
                  </div>)}
            </>
        );
  };
  
  export default Login;



   

   
       