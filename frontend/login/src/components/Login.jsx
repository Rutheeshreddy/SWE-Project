import React, { useRef, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'


const Login = () => {
  

        const userRef = useRef();

        const [user, setUser] = useState("");
        const [pwd, setPwd] = useState("");
        const [errMsg, setErrMsg] = useState("");
  
        const navigate = useNavigate();

        useEffect(() => {
            userRef.current.focus();
        }, [])


        const handleSubmit = async (e) => {
            e.preventDefault();
            
            axios.post(import.meta.env.VITE_LOGIN, { // shall use environment variable instead of this hardcode
                userName: user,
                password: pwd,
                }).then((res) => {
                setLogRes(res.data.logRes);
                if (res.data.logRes == 1) {

                    sessionStorage.setItem('token', authToken);

                setTimeout(() => {

                    <Success/>

                }, 2000);

                if () navigate(import.meta.env.VITE)
                else if
                
                }
                
                }).catch((err) => {
                
                console.log(err);
                })
            
        }
    
        return (
            <>
               <div className="flex justify-center items-center h-screen">
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
                  </div>
            </>
        );
  };
  
  export default Login;



   

   
       