import React, { useRef, useState, useEffect } from "react";


const Login = () => {
        const userRef = useRef();
        const errRef = useRef();

        const [user, setUser] = useState("");
        const [pwd, setPwd] = useState("");
        const [errMsg, setErrMsg] = useState("");
        const [success, setSucess] = useState(false);

        useEffect(() => {
            userRef.current.focus();
        }, [])

        useEffect(() => {
            setErrMsg('');
        }, [user, pwd])

        const handleSubmit = async (e) => {
            e.preventDefault();
            console.log(user, pwd);
            setUser('');
            setPwd('');
            setSucess(true);
        }
    
        return (
            <>
                {success ?(
                    <div>
                        <h1> You are logged in</h1>
                    </div>
                ):(
                <div>
                    <p ref={errRef} className={errMsg?"errmsg":"offscreen"} aria-live="asertive">{errMsg}</p>
                    <h1>'CRGM'</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                </div>)}
            </>
        );
  };
  
  export default Login;



   

   
       