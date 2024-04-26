import { useParams } from "react-router-dom";
import { useEffect } from "react";

const Redirect = () => 
{   const {token} = useParams();
    useEffect(()=> {
        
        sessionStorage.setItem("token",token);
        window.location.href = "http://localhost:3002/"
        }         
            ,[])
}

export default Redirect;